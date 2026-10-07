import { Bell, Camera, Languages, Loader2, Monitor, Moon, Palette, Sun, UserRound } from "lucide-react";
import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { ApiError } from "../../api/client";
import { updateTeacherPhoto } from "../../api/teacherCabinet.api";
import { CabinetCard } from "../../components/TeacherCabinet/CabinetCard";
import { CabinetPageHeader } from "../../components/TeacherCabinet/CabinetPageHeader";
import { TeacherAvatar } from "../../components/TeacherCabinet/TeacherAvatar";
import { useTeacherCabinet } from "../../hooks/useTeacherCabinet";
import type { Theme } from "../../hooks/useTheme";

const INPUT =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100 dark:placeholder:text-slate-500";

function Field({ label, htmlFor, wide, children }: { label: string; htmlFor: string; wide?: boolean; children: ReactNode }) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      {children}
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{label}</p>
        <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
          checked ? "bg-brand-600 dark:bg-brand-500" : "bg-slate-200 dark:bg-slate-700"
        }`}
      >
        <span
          className={`inline-block size-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-5.5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

/** Mirrors UpdateTeacherRequest: `image`, max 4096 KB. */
const MAX_PHOTO_BYTES = 4 * 1024 * 1024;

type PhotoStatus = { kind: "idle" } | { kind: "uploading" } | { kind: "success" } | { kind: "error"; message: string };

const THEME_OPTIONS: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "ღია", icon: Sun },
  { value: "dark", label: "მუქი", icon: Moon },
];

/** Only the photo is persisted for now; the rest is UI until auth exists (theme uses the existing toggle). */
export function CabinetSettingsPage() {
  const { data, updateTeacher, theme, toggleTheme } = useTeacherCabinet();
  const { teacher } = data;
  const [notifications, setNotifications] = useState({ email: true, groups: true, digest: false });
  const [language, setLanguage] = useState("ka");
  const [saved, setSaved] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [photoStatus, setPhotoStatus] = useState<PhotoStatus>({ kind: "idle" });

  async function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    event.stopPropagation();
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setPhotoStatus({ kind: "error", message: "აირჩიეთ სურათის ფაილი." });
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setPhotoStatus({ kind: "error", message: "ფოტოს ზომა არ უნდა აღემატებოდეს 4 MB-ს." });
      return;
    }

    setPhotoStatus({ kind: "uploading" });
    try {
      const { data: updated } = await updateTeacherPhoto(teacher.id, file);
      updateTeacher({ image: updated.image });
      setPhotoStatus({ kind: "success" });
    } catch (error) {
      const message = error instanceof ApiError ? error.message : "ფოტოს ატვირთვა ვერ მოხერხდა.";
      setPhotoStatus({ kind: "error", message });
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <CabinetPageHeader title="პარამეტრები" description="მართეთ პროფილი, გარეგნობა და შეტყობინებები." />

      <CabinetCard title="პროფილის პარამეტრები" description="ძირითადი ინფორმაცია" icon={UserRound}>
        <form onSubmit={handleSubmit} onChange={() => setSaved(false)}>
          <div className="mb-5 flex flex-wrap items-center gap-4">
            <TeacherAvatar teacher={teacher} size="md" />
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
            <button
              type="button"
              onClick={() => photoInputRef.current?.click()}
              disabled={photoStatus.kind === "uploading"}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 disabled:cursor-wait disabled:opacity-60 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800/60"
            >
              {photoStatus.kind === "uploading" ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <Camera className="size-4" aria-hidden="true" />
              )}
              {photoStatus.kind === "uploading" ? "იტვირთება..." : "ფოტოს შეცვლა"}
            </button>
            {photoStatus.kind === "success" && (
              <p role="status" className="text-sm text-emerald-600 dark:text-emerald-400">
                ფოტო განახლდა.
              </p>
            )}
            {photoStatus.kind === "error" && (
              <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                {photoStatus.message}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="სახელი" htmlFor="settings-first-name">
              <input id="settings-first-name" className={INPUT} defaultValue={teacher.first_name} />
            </Field>
            <Field label="გვარი" htmlFor="settings-last-name">
              <input id="settings-last-name" className={INPUT} defaultValue={teacher.last_name} />
            </Field>
            <Field label="ელ-ფოსტა" htmlFor="settings-email">
              <input id="settings-email" type="email" className={INPUT} defaultValue={teacher.email} />
            </Field>
            <Field label="ტელეფონი" htmlFor="settings-phone">
              <input id="settings-phone" type="tel" className={INPUT} defaultValue={teacher.phone} />
            </Field>
            <Field label="სპეციალიზაცია" htmlFor="settings-specialization" wide>
              <input id="settings-specialization" className={INPUT} defaultValue={teacher.specialization} />
            </Field>
            <Field label="ბიოგრაფია" htmlFor="settings-bio" wide>
              <textarea
                id="settings-bio"
                rows={4}
                className={`${INPUT} resize-y`}
                defaultValue={teacher.detail?.biography ?? ""}
              />
            </Field>
          </div>

          <div className="mt-5 flex flex-col-reverse items-stretch gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-end dark:border-slate-800">
            {saved && (
              <p role="status" className="text-sm text-amber-600 dark:text-amber-400">
                შენახვა ავტორიზაციის დამატების შემდეგ იმუშავებს.
              </p>
            )}
            <button
              type="submit"
              className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600"
            >
              ცვლილებების შენახვა
            </button>
          </div>
        </form>
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

      <CabinetCard title="შეტყობინებები" description="რა შემთხვევაში გაცნობოთ" icon={Bell}>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          <ToggleRow
            label="ელ-ფოსტით შეტყობინებები"
            description="მნიშვნელოვანი განახლებები ელ-ფოსტაზე."
            checked={notifications.email}
            onChange={(email) => setNotifications((prev) => ({ ...prev, email }))}
          />
          <ToggleRow
            label="ჯგუფების ცვლილებები"
            description="ახალი სტუდენტი ან ცვლილება ჯგუფის განრიგში."
            checked={notifications.groups}
            onChange={(groups) => setNotifications((prev) => ({ ...prev, groups }))}
          />
          <ToggleRow
            label="კვირის შეჯამება"
            description="ყოველკვირეული მიმოხილვა თქვენი აქტივობის შესახებ."
            checked={notifications.digest}
            onChange={(digest) => setNotifications((prev) => ({ ...prev, digest }))}
          />
        </div>
      </CabinetCard>

      <CabinetCard title="ენა" description="ინტერფეისის ენა" icon={Languages}>
        <label htmlFor="settings-language" className="sr-only">
          ენა
        </label>
        <select
          id="settings-language"
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          className={`${INPUT} sm:max-w-xs`}
        >
          <option value="ka">ქართული</option>
          <option value="en">English</option>
        </select>
        {language !== "ka" && (
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">სხვა ენების მხარდაჭერა მალე დაემატება.</p>
        )}
      </CabinetCard>
    </div>
  );
}
