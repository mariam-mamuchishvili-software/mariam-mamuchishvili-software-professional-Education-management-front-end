import { Camera, KeyRound, Loader2, LogOut, Monitor, Moon, Palette, Sun, UserRound } from "lucide-react";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ApiError } from "../../api/client";
import { updateStudentProfile, type StudentProfileInput } from "../../api/studentCabinet.api";
import { Field, FormMessage, INPUT, SubmitButton } from "../../components/StudentCabinet/CabinetForm";
import { StudentAvatar } from "../../components/StudentCabinet/StudentAvatar";
import { CabinetCard } from "../../components/TeacherCabinet/CabinetCard";
import { CabinetPageHeader } from "../../components/TeacherCabinet/CabinetPageHeader";
import { useStudentCabinet } from "../../hooks/useStudentCabinet";
import type { Theme } from "../../hooks/useTheme";
import type { StudentCabinetData } from "../../types/studentCabinet.types";
import { fieldErrors, toDateInput, invalidProps } from "../../utils/studentCabinet";

/** Mirrors UpdateStudentCabinetRequest: `image`, max 4096 KB. */
const MAX_PHOTO_BYTES = 4 * 1024 * 1024;
/** Mirrors UpdateStudentCabinetRequest: `password` min 8. */
const MIN_PASSWORD_LENGTH = 8;

type Status = { kind: "idle" } | { kind: "pending" } | { kind: "success" } | { kind: "error"; message: string };

const THEME_OPTIONS: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "ღია", icon: Sun },
  { value: "dark", label: "მუქი", icon: Moon },
];

function errorMessage(error: unknown, fallback: string) {
  return error instanceof ApiError ? error.message : fallback;
}

/** Saves through `PATCH /api/me/student/cabinet`, which returns the whole refreshed cabinet. */
function useProfileSave() {
  const { token, updateCabinet } = useStudentCabinet();
  return async (input: StudentProfileInput) => {
    const cabinet = await updateStudentProfile(token, input);
    updateCabinet((prev): StudentCabinetData => ({
      ...prev,
      profile: cabinet.profile,
    }));
  };
}

function PhotoSection() {
  const { profile } = useStudentCabinet().data;
  const save = useProfileSave();
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setStatus({ kind: "error", message: "აირჩიეთ სურათის ფაილი." });
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setStatus({
        kind: "error",
        message: "ფოტოს ზომა არ უნდა აღემატებოდეს 4 MB-ს.",
      });
      return;
    }

    setStatus({ kind: "pending" });
    try {
      await save({ image: file });
      setStatus({ kind: "success" });
    } catch (error) {
      setStatus({
        kind: "error",
        message: errorMessage(error, "ფოტოს ატვირთვა ვერ მოხერხდა."),
      });
    }
  }

  return (
    <div className="mb-5 flex flex-wrap items-center gap-4">
      <StudentAvatar student={profile} size="md" />
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={status.kind === "pending"}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 disabled:cursor-wait disabled:opacity-60 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800/60"
      >
        {status.kind === "pending" ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <Camera className="size-4" aria-hidden="true" />
        )}
        {status.kind === "pending" ? "იტვირთება..." : "ფოტოს შეცვლა"}
      </button>
      {status.kind === "success" && <FormMessage kind="success">ფოტო განახლდა.</FormMessage>}
      {status.kind === "error" && <FormMessage kind="error">{status.message}</FormMessage>}
    </div>
  );
}

function ProfileForm() {
  const { profile } = useStudentCabinet().data;
  const save = useProfileSave();
  const initial = {
    first_name: profile.first_name,
    last_name: profile.last_name,
    email: profile.email,
    phone: profile.phone ?? "",
    birth_date: toDateInput(profile.birth_date),
  };
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const set = (field: keyof typeof form) => (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setStatus({ kind: "idle" });
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Only changed fields are sent; the backend validates each one with `sometimes`.
    const changed = Object.fromEntries(
      Object.entries(form)
        .map(([key, value]) => [key, value.trim()] as const)
        .filter(([key, value]) => value !== initial[key as keyof typeof initial]),
    ) as Partial<typeof form>;

    const required = Object.entries(changed).filter(([, value]) => !value);
    if (required.length > 0) {
      setErrors(Object.fromEntries(required.map(([key]) => [key, "ველი არ შეიძლება იყოს ცარიელი."])));
      return;
    }
    if (Object.keys(changed).length === 0) {
      setStatus({ kind: "success" });
      return;
    }

    setErrors({});
    setStatus({ kind: "pending" });
    try {
      await save(changed);
      setStatus({ kind: "success" });
    } catch (error) {
      if (error instanceof ApiError && error.status === 422) {
        setErrors(fieldErrors(error));
        setStatus({ kind: "idle" });
      } else {
        setStatus({
          kind: "error",
          message: errorMessage(error, "შენახვა ვერ მოხერხდა."),
        });
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="სახელი" htmlFor="settings-first-name" error={errors.first_name}>
          <input
            id="settings-first-name"
            className={INPUT}
            value={form.first_name}
            onChange={set("first_name")}
            autoComplete="given-name"
            maxLength={255}
            {...invalidProps("settings-first-name", errors.first_name)}
          />
        </Field>
        <Field label="გვარი" htmlFor="settings-last-name" error={errors.last_name}>
          <input
            id="settings-last-name"
            className={INPUT}
            value={form.last_name}
            onChange={set("last_name")}
            autoComplete="family-name"
            maxLength={255}
            {...invalidProps("settings-last-name", errors.last_name)}
          />
        </Field>
        <Field label="ელ-ფოსტა" htmlFor="settings-email" hint="გამოიყენება კაბინეტში შესასვლელად." error={errors.email}>
          <input
            id="settings-email"
            type="email"
            className={INPUT}
            value={form.email}
            onChange={set("email")}
            autoComplete="email"
            maxLength={255}
            {...invalidProps("settings-email", errors.email)}
          />
        </Field>
        <Field label="ტელეფონი" htmlFor="settings-phone" error={errors.phone}>
          <input
            id="settings-phone"
            type="tel"
            className={INPUT}
            value={form.phone}
            onChange={set("phone")}
            autoComplete="tel"
            maxLength={20}
            {...invalidProps("settings-phone", errors.phone)}
          />
        </Field>
        <Field label="დაბადების თარიღი" htmlFor="settings-birth-date" error={errors.birth_date}>
          <input
            id="settings-birth-date"
            type="date"
            className={INPUT}
            value={form.birth_date}
            onChange={set("birth_date")}
            max={new Date().toISOString().slice(0, 10)}
            {...invalidProps("settings-birth-date", errors.birth_date)}
          />
        </Field>
      </div>

      <div className="mt-5 flex flex-col-reverse items-stretch gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-end dark:border-slate-800">
        {status.kind === "success" && <FormMessage kind="success">ცვლილებები შენახულია.</FormMessage>}
        {status.kind === "error" && <FormMessage kind="error">{status.message}</FormMessage>}
        <SubmitButton isPending={status.kind === "pending"}>ცვლილებების შენახვა</SubmitButton>
      </div>
    </form>
  );
}

function PasswordForm() {
  const save = useProfileSave();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.length < MIN_PASSWORD_LENGTH) {
      setErrors({
        password: `პაროლი უნდა შეიცავდეს მინიმუმ ${MIN_PASSWORD_LENGTH} სიმბოლოს.`,
      });
      return;
    }
    if (password !== confirmation) {
      setErrors({ password_confirmation: "პაროლები არ ემთხვევა." });
      return;
    }

    setErrors({});
    setStatus({ kind: "pending" });
    try {
      await save({ password, password_confirmation: confirmation });
      setPassword("");
      setConfirmation("");
      setStatus({ kind: "success" });
    } catch (error) {
      if (error instanceof ApiError && error.status === 422) {
        setErrors(fieldErrors(error));
        setStatus({ kind: "idle" });
      } else {
        setStatus({
          kind: "error",
          message: errorMessage(error, "პაროლის შეცვლა ვერ მოხერხდა."),
        });
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="ახალი პაროლი" htmlFor="settings-password" error={errors.password}>
          <input
            id="settings-password"
            type="password"
            className={INPUT}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setStatus({ kind: "idle" });
            }}
            autoComplete="new-password"
            minLength={MIN_PASSWORD_LENGTH}
            {...invalidProps("settings-password", errors.password)}
          />
        </Field>
        <Field label="გაიმეორეთ პაროლი" htmlFor="settings-password-confirmation" error={errors.password_confirmation}>
          <input
            id="settings-password-confirmation"
            type="password"
            className={INPUT}
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            autoComplete="new-password"
            {...invalidProps("settings-password-confirmation", errors.password_confirmation)}
          />
        </Field>
      </div>

      <div className="mt-5 flex flex-col-reverse items-stretch gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-end dark:border-slate-800">
        {status.kind === "success" && <FormMessage kind="success">პაროლი შეიცვალა.</FormMessage>}
        {status.kind === "error" && <FormMessage kind="error">{status.message}</FormMessage>}
        <SubmitButton isPending={status.kind === "pending"}>პაროლის შეცვლა</SubmitButton>
      </div>
    </form>
  );
}

export function StudentSettingsPage() {
  const { token, theme, toggleTheme, signOut } = useStudentCabinet();

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <CabinetPageHeader title="პარამეტრები" description="მართეთ პროფილი, პაროლი და გარეგნობა." />

      <CabinetCard title="პროფილის პარამეტრები" description="ძირითადი ინფორმაცია" icon={UserRound}>
        <PhotoSection />
        <ProfileForm />
      </CabinetCard>

      <CabinetCard title="პაროლი" description="კაბინეტში შესასვლელი პაროლის შეცვლა" icon={KeyRound}>
        <PasswordForm />
      </CabinetCard>

      <CabinetCard title="გარეგნობა" description="აირჩიეთ ინტერფეისის თემა" icon={Palette}>
        <div className="grid grid-cols-2 gap-3 sm:max-w-md" role="radiogroup" aria-label="თემა">
          {THEME_OPTIONS.map(({ value, label, icon: Icon }) => {
            const isActive = theme === value;
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => !isActive && toggleTheme()}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-brand-500 bg-brand-50 text-brand-700 dark:border-brand-400 dark:bg-brand-500/10 dark:text-brand-300"
                    : "border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600"
                }`}
              >
                <Icon className="size-5" aria-hidden="true" />
                {label}
              </button>
            );
          })}
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Monitor className="size-3.5" aria-hidden="true" />
          არჩევანი ინახება ამ ბრაუზერში.
        </p>
      </CabinetCard>

      {token && (
        <CabinetCard title="სესია" description="კაბინეტიდან გასვლა ამ მოწყობილობაზე" icon={LogOut}>
          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-xl border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50 dark:border-rose-500/30 dark:text-rose-400 dark:hover:bg-rose-500/10"
          >
            <LogOut className="size-4" aria-hidden="true" />
            გასვლა
          </button>
        </CabinetCard>
      )}
    </div>
  );
}
