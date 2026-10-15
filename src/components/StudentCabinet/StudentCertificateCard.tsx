import { Award, Building2, CalendarCheck, CalendarX, ExternalLink, Hash } from "lucide-react";
import type { StudentCertificate } from "../../types/studentCabinet.types";
import { formatDate } from "../../utils/formatDate";
import { isExpired } from "../../utils/teacherCabinet";

interface StudentCertificateCardProps {
  certificate: StudentCertificate;
}

/** A certificate issued to the student; read-only, since only the college manages certificates. */
export function StudentCertificateCard({ certificate }: StudentCertificateCardProps) {
  const expired = isExpired(certificate.expires_at);
  const issuedByCollege = certificate.source === "college";

  return (
    <article className="flex min-w-0 flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300">
          <Award className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold break-words">{certificate.title}</h3>
          {certificate.issuer_name && (
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{certificate.issuer_name}</p>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${
            issuedByCollege
              ? "bg-emerald-50 text-emerald-700 ring-emerald-600/15 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20"
              : "bg-slate-100 text-slate-600 ring-slate-500/10 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-400/20"
          }`}
        >
          {issuedByCollege ? "კოლეჯის მიერ გაცემული" : "გარე სერტიფიკატი"}
        </span>
        {certificate.college_name && (
          <span className="inline-flex max-w-full items-center gap-1 truncate rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
            <Building2 className="size-3 shrink-0" aria-hidden="true" />
            <span className="truncate">{certificate.college_name}</span>
          </span>
        )}
      </div>

      <dl className="mt-4 grid gap-2 rounded-xl bg-slate-50 p-3 text-sm dark:bg-slate-800/50">
        <div className="flex items-center justify-between gap-3">
          <dt className="flex shrink-0 items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <Hash className="size-3.5" aria-hidden="true" />
            სერტიფიკატის №
          </dt>
          <dd className="min-w-0 truncate text-right font-medium text-slate-700 dark:text-slate-200">
            {certificate.certificate_number || "—"}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="flex shrink-0 items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <CalendarCheck className="size-3.5" aria-hidden="true" />
            გაცემის თარიღი
          </dt>
          <dd className="text-right font-medium text-slate-700 dark:text-slate-200">
            {formatDate(certificate.issued_at ?? undefined)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="flex shrink-0 items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <CalendarX className="size-3.5" aria-hidden="true" />
            ვადა
          </dt>
          <dd
            className={`text-right font-medium ${expired ? "text-rose-600 dark:text-rose-400" : "text-slate-700 dark:text-slate-200"}`}
          >
            {certificate.expires_at ? formatDate(certificate.expires_at) : "უვადო"}
            {expired && " (ვადაგასული)"}
          </dd>
        </div>
      </dl>

      <div className="mt-auto pt-4">
        {certificate.file_path ? (
          <a
            href={certificate.file_path}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600"
          >
            სერტიფიკატის ნახვა
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        ) : (
          <p className="rounded-xl border border-dashed border-slate-200 px-4 py-2.5 text-center text-sm text-slate-400 dark:border-slate-700 dark:text-slate-500">
            დოკუმენტი არ არის მიმაგრებული
          </p>
        )}
      </div>
    </article>
  );
}
