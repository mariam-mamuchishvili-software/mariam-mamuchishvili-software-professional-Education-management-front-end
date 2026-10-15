import { useState, type FormEvent } from "react";
import { ApiError } from "../../api/client";
import { getColleges } from "../../api/colleges.api";
import { getGroups } from "../../api/groups.api";
import { getProfessions } from "../../api/professions.api";
import { createStudentEducation, fetchAllPages, updateStudentEducation } from "../../api/studentCabinet.api";
import { EDUCATION_STATUS_LABELS } from "../../constants/studentCabinet";
import { useAsync } from "../../hooks/useAsync";
import type {
  StudentEducation,
  StudentEducationInput,
  StudentEducationStatus,
} from "../../types/studentCabinet.types";
import { fieldErrors, toDateInput, invalidProps } from "../../utils/studentCabinet";
import { Field, FormDialog, INPUT } from "./CabinetForm";

interface EducationFormDialogProps {
  token: string | null;
  /** Record being edited; omitted when adding a new one. */
  education?: StudentEducation;
  onSaved: (education: StudentEducation) => void;
  onClose: () => void;
}

/** Select options for the system's colleges, professions and groups, loaded once per open dialog. */
function useEducationOptions() {
  return useAsync(
    (signal) =>
      Promise.all([
        fetchAllPages((params, s) => getColleges(params, s), signal),
        fetchAllPages((params, s) => getProfessions(params, undefined, s), signal),
        fetchAllPages((params, s) => getGroups(params, s), signal),
      ]).then(([colleges, professions, groups]) => ({ colleges, professions, groups })),
    [],
  );
}

const toId = (value: string) => (value ? Number(value) : null);
const toText = (value: string) => value.trim() || null;

export function EducationFormDialog({ token, education, onSaved, onClose }: EducationFormDialogProps) {
  const options = useEducationOptions();
  const [form, setForm] = useState({
    college_id: education?.college_id ? String(education.college_id) : "",
    institution_name: education?.institution_name ?? "",
    profession_id: education?.profession_id ? String(education.profession_id) : "",
    group_id: education?.group_id ? String(education.group_id) : "",
    program_name: education?.program_name ?? "",
    started_at: toDateInput(education?.started_at),
    completed_at: toDateInput(education?.completed_at),
    status: education?.status ?? ("active" as StudentEducationStatus),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string>();
  const [isPending, setIsPending] = useState(false);

  const set = (field: keyof typeof form) => (value: string) => setForm((prev) => ({ ...prev, [field]: value }));
  const optionsData = options.status === "success" ? options.data : undefined;
  // Groups belong to one profession, so once a profession is picked only its groups are offered.
  const groups = (optionsData?.groups ?? []).filter(
    (group) => !form.profession_id || group.profession_id === Number(form.profession_id),
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.college_id && !form.institution_name.trim()) {
      setErrors({ institution_name: "აირჩიეთ კოლეჯი ან მიუთითეთ სასწავლებლის დასახელება." });
      return;
    }

    const input: StudentEducationInput = {
      college_id: toId(form.college_id),
      institution_name: toText(form.institution_name),
      profession_id: toId(form.profession_id),
      group_id: toId(form.group_id),
      program_name: toText(form.program_name),
      started_at: form.started_at || null,
      completed_at: form.completed_at || null,
      status: form.status,
    };

    setIsPending(true);
    setErrors({});
    setFormError(undefined);
    try {
      const saved = education
        ? await updateStudentEducation(token, education.id, input)
        : await createStudentEducation(token, input);
      onSaved(saved);
    } catch (error) {
      if (error instanceof ApiError && error.status === 422) setErrors(fieldErrors(error));
      else setFormError(error instanceof ApiError ? error.message : "შენახვა ვერ მოხერხდა.");
      setIsPending(false);
    }
  }

  return (
    <FormDialog
      title={education ? "განათლების რედაქტირება" : "განათლების დამატება"}
      description="კოლეჯი სისტემიდან ან სხვა სასწავლებელი."
      submitLabel={education ? "შენახვა" : "დამატება"}
      isPending={isPending}
      error={formError ?? (options.status === "error" ? `სიების ჩატვირთვა ვერ მოხერხდა: ${options.error}` : undefined)}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="კოლეჯი" htmlFor="education-college" error={errors.college_id}>
          <select
            id="education-college"
            className={INPUT}
            value={form.college_id}
            onChange={(event) => set("college_id")(event.target.value)}
            disabled={!optionsData}
            {...invalidProps("education-college", errors.college_id)}
          >
            <option value="">{optionsData ? "სხვა სასწავლებელი" : "იტვირთება..."}</option>
            {optionsData?.colleges.map((college) => (
              <option key={college.id} value={college.id}>
                {college.name}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="სასწავლებლის დასახელება"
          htmlFor="education-institution"
          required={!form.college_id}
          hint="თუ კოლეჯი სიაში არ არის."
          error={errors.institution_name}
        >
          <input
            id="education-institution"
            className={INPUT}
            value={form.institution_name}
            onChange={(event) => set("institution_name")(event.target.value)}
            maxLength={255}
            {...invalidProps("education-institution", errors.institution_name)}
          />
        </Field>

        <Field label="პროფესია" htmlFor="education-profession" error={errors.profession_id}>
          <select
            id="education-profession"
            className={INPUT}
            value={form.profession_id}
            onChange={(event) => setForm((prev) => ({ ...prev, profession_id: event.target.value, group_id: "" }))}
            disabled={!optionsData}
            {...invalidProps("education-profession", errors.profession_id)}
          >
            <option value="">—</option>
            {optionsData?.professions.map((profession) => (
              <option key={profession.id} value={profession.id}>
                {profession.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="ჯგუფი" htmlFor="education-group" error={errors.group_id}>
          <select
            id="education-group"
            className={INPUT}
            value={form.group_id}
            onChange={(event) => set("group_id")(event.target.value)}
            disabled={!optionsData}
            {...invalidProps("education-group", errors.group_id)}
          >
            <option value="">—</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.code ? `${group.name} (${group.code})` : group.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="პროგრამის დასახელება" htmlFor="education-program" wide error={errors.program_name}>
          <input
            id="education-program"
            className={INPUT}
            value={form.program_name}
            onChange={(event) => set("program_name")(event.target.value)}
            maxLength={255}
            {...invalidProps("education-program", errors.program_name)}
          />
        </Field>

        <Field label="დაწყების თარიღი" htmlFor="education-started" error={errors.started_at}>
          <input
            id="education-started"
            type="date"
            className={INPUT}
            value={form.started_at}
            onChange={(event) => set("started_at")(event.target.value)}
            {...invalidProps("education-started", errors.started_at)}
          />
        </Field>
        <Field label="დასრულების თარიღი" htmlFor="education-completed" error={errors.completed_at}>
          <input
            id="education-completed"
            type="date"
            className={INPUT}
            value={form.completed_at}
            min={form.started_at || undefined}
            onChange={(event) => set("completed_at")(event.target.value)}
            {...invalidProps("education-completed", errors.completed_at)}
          />
        </Field>

        <Field label="სტატუსი" htmlFor="education-status" error={errors.status}>
          <select
            id="education-status"
            className={INPUT}
            value={form.status}
            onChange={(event) => set("status")(event.target.value)}
            {...invalidProps("education-status", errors.status)}
          >
            {Object.entries(EDUCATION_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>
      </div>
    </FormDialog>
  );
}
