import { GraduationCap } from "lucide-react";
import { useState } from "react";
import { ApiError } from "../../api/client";
import { deleteStudentEducation } from "../../api/studentCabinet.api";
import { AddButton, FormMessage } from "../../components/StudentCabinet/CabinetForm";
import { EducationFormDialog } from "../../components/StudentCabinet/EducationFormDialog";
import { EducationHistoryTimeline } from "../../components/StudentCabinet/EducationHistoryTimeline";
import { CabinetPageHeader } from "../../components/TeacherCabinet/CabinetPageHeader";
import { useStudentCabinet } from "../../hooks/useStudentCabinet";
import { EmptyState } from "../../partials/EmptyState";
import type { StudentEducation } from "../../types/studentCabinet.types";

/** `null` = closed, `"new"` = adding, a record = editing it. */
type DialogState = null | "new" | StudentEducation;

export function StudentEducationPage() {
  const { data, token, updateCabinet } = useStudentCabinet();
  const educations = data.education_history;
  const [dialog, setDialog] = useState<DialogState>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<string>();

  function handleSaved(saved: StudentEducation) {
    updateCabinet((prev) => ({
      ...prev,
      education_history: prev.education_history.some((item) => item.id === saved.id)
        ? prev.education_history.map((item) => (item.id === saved.id ? saved : item))
        : [saved, ...prev.education_history],
    }));
    setDialog(null);
  }

  async function handleDelete(education: StudentEducation) {
    const name = education.college_name ?? education.institution_name ?? "ჩანაწერი";
    if (!window.confirm(`წაიშალოს „${name}“?`)) return;

    setDeletingId(education.id);
    setDeleteError(undefined);
    try {
      await deleteStudentEducation(token, education.id);
      updateCabinet((prev) => ({
        ...prev,
        education_history: prev.education_history.filter((item) => item.id !== education.id),
      }));
    } catch (error) {
      setDeleteError(error instanceof ApiError ? error.message : "წაშლა ვერ მოხერხდა.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <CabinetPageHeader
        title="განათლების ისტორია"
        description="სასწავლებლები და პროგრამები, სადაც სწავლობთ ან გისწავლიათ."
        action={<AddButton onClick={() => setDialog("new")}>დამატება</AddButton>}
      />

      {deleteError && (
        <div className="mb-4">
          <FormMessage kind="error">{deleteError}</FormMessage>
        </div>
      )}

      {educations.length > 0 ? (
        <EducationHistoryTimeline
          items={educations}
          onEdit={setDialog}
          onDelete={handleDelete}
          deletingId={deletingId}
        />
      ) : (
        <EmptyState
          title="განათლება არ არის დამატებული"
          description="დაამატეთ კოლეჯი ან სხვა სასწავლებელი, სადაც სწავლობთ ან გისწავლიათ."
          icon={<GraduationCap className="size-6" aria-hidden="true" />}
        />
      )}

      {dialog && (
        <EducationFormDialog
          token={token}
          education={dialog === "new" ? undefined : dialog}
          onSaved={handleSaved}
          onClose={() => setDialog(null)}
        />
      )}
    </div>
  );
}
