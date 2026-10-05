import { Award, CalendarCheck, CalendarX, ExternalLink, Hash } from "lucide-react";
import type { TeacherTraining } from "../../types/teacher.types";
import { formatDate } from "../../utils/formatDate";
import { isExpired } from "../../utils/teacherCabinet";

interface CabinetTrainingCardProps {
  training: TeacherTraining;
}

/** A teacher's own training/certificate record (not the public Training entity — see TrainingCard). */
export function CabinetTrainingCard({ training }: CabinetTrainingCardProps) {
  const expired = isExpired(training.expiry_date);

  return (
    <article className="flex min-w-0 flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300">
          <Award className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold break-words">{training.title}</h3>
          {training.organizer && (
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{training.organizer}</p>
          )}
        </div>
      </div>

      {training.description && (
        <p className="mt-4 text-sm leading-relaxed text-slate-600 line-clamp-3 dark:text-slate-400">
          {training.description}
        </p>
      )}

      <dl className="mt-4 grid gap-2 rounded-xl bg-slate-50 p-3 text-sm dark:bg-slate-800/50">
        <div className="flex items-center justify-between gap-3">
          <dt className="flex shrink-0 items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <Hash className="size-3.5" aria-hidden="true" />
            სერტიფიკატის №
          </dt>
          <dd className="min-w-0 truncate text-right font-medium text-slate-700 dark:text-slate-200">{training.certificate_number || "—"}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="flex shrink-0 items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <CalendarCheck className="size-3.5" aria-hidden="true" />
            გაცემის თარიღი
          </dt>
          <dd className="text-right font-medium text-slate-700 dark:text-slate-200">{formatDate(training.issue_date ?? undefined)}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="flex shrink-0 items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <CalendarX className="size-3.5" aria-hidden="true" />
            ვადა
          </dt>
          <dd
            className={`text-right font-medium ${expired ? "text-rose-600 dark:text-rose-400" : "text-slate-700 dark:text-slate-200"}`}
          >
            {training.expiry_date ? formatDate(training.expiry_date) : "უვადო"}
            {expired && " (ვადაგასული)"}
          </dd>
        </div>
      </dl>

      <div className="mt-auto pt-4">
        {training.certificate_url ? (
          <a
            href={training.certificate_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600"
          >
            სერტიფიკატის ნახვა
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        ) : (
          <p className="rounded-xl border border-dashed border-slate-200 px-4 py-2.5 text-center text-sm text-slate-400 dark:border-slate-700 dark:text-slate-500">
            სერტიფიკატის ბმული არ არის
          </p>
        )}
      </div>
    </article>
  );
}
