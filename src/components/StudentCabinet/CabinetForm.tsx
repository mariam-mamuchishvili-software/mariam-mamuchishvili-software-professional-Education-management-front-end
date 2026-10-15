import { Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { useEffect, useRef, type FormEvent, type ReactNode } from "react";

export const INPUT =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 focus:outline-none disabled:opacity-60 aria-[invalid=true]:border-rose-400 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100 dark:placeholder:text-slate-500 dark:aria-[invalid=true]:border-rose-500/70";

interface FieldProps {
  label: string;
  htmlFor: string;
  wide?: boolean;
  required?: boolean;
  hint?: string;
  /** Validation message from the backend (422) or the form itself. */
  error?: string;
  children: ReactNode;
}

export function Field({ label, htmlFor, wide, required, hint, error, children }: FieldProps) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
        {required && <span className="ml-0.5 text-rose-500">*</span>}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">{hint}</p>
      )}
    </div>
  );
}

export function SubmitButton({ isPending, children }: { isPending: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-wait disabled:opacity-70 dark:bg-brand-500 dark:hover:bg-brand-600"
    >
      {isPending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}

export function FormMessage({ kind, children }: { kind: "success" | "error"; children: ReactNode }) {
  return kind === "success" ? (
    <p role="status" className="text-sm text-emerald-600 dark:text-emerald-400">
      {children}
    </p>
  ) : (
    <p role="alert" className="text-sm text-rose-600 dark:text-rose-400">
      {children}
    </p>
  );
}

export function AddButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-fit items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600"
    >
      <Plus className="size-4" aria-hidden="true" />
      {children}
    </button>
  );
}

/** Small square edit/delete button used on record cards. */
export function RecordActionButton({
  kind,
  label,
  onClick,
  disabled,
}: {
  kind: "edit" | "delete";
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  const Icon = kind === "edit" ? Pencil : Trash2;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`flex size-8 items-center justify-center rounded-lg text-slate-400 transition-colors disabled:cursor-wait disabled:opacity-50 dark:text-slate-500 ${
        kind === "edit"
          ? "hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-500/10 dark:hover:text-brand-300"
          : "hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
      }`}
    >
      <Icon className="size-4" aria-hidden="true" />
    </button>
  );
}

interface FormDialogProps {
  title: string;
  description?: string;
  isPending: boolean;
  submitLabel: string;
  /** General error not tied to one field. */
  error?: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  children: ReactNode;
}

/**
 * Modal form built on the native <dialog> (focus trap, Escape and top layer for free).
 * Rendered only while open; closing it unmounts the form, so each open starts fresh.
 */
export function FormDialog({
  title,
  description,
  isPending,
  submitLabel,
  error,
  onSubmit,
  onClose,
  children,
}: FormDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onCancel={(event) => {
        event.preventDefault();
        if (!isPending) onClose();
      }}
      onClick={(event) => {
        // A click on the backdrop lands on the <dialog> element itself.
        if (event.target === event.currentTarget && !isPending) onClose();
      }}
      aria-labelledby="form-dialog-title"
      className="m-auto w-[calc(100%-2rem)] max-w-2xl rounded-2xl border border-slate-200 bg-white p-0 text-slate-900 shadow-popover backdrop:bg-slate-900/50 backdrop:backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
    >
      <form onSubmit={onSubmit} noValidate className="flex max-h-[85svh] flex-col">
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6 dark:border-slate-800">
          <div className="min-w-0">
            <h2 id="form-dialog-title" className="text-base font-semibold">
              {title}
            </h2>
            {description && <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{description}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            aria-label="დახურვა"
            className="-mr-1 flex size-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X className="size-4.5" aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5 sm:px-6">{children}</div>

        <div className="flex flex-col-reverse items-stretch gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-6 dark:border-slate-800">
          {error && (
            <div className="sm:mr-auto">
              <FormMessage kind="error">{error}</FormMessage>
            </div>
          )}
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            გაუქმება
          </button>
          <SubmitButton isPending={isPending}>{submitLabel}</SubmitButton>
        </div>
      </form>
    </dialog>
  );
}
