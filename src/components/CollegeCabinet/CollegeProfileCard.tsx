import { ExternalLink, Globe, Mail, MapPin, Phone } from "lucide-react";
import type { ComponentType } from "react";
import type { College } from "../../types/college.types";
import { CollegeLogo } from "./CollegeLogo";

/** The college panel where the records shown read-only in the cabinet are managed. */
export const COLLEGE_PANEL_URL = `${import.meta.env.VITE_API_URL}/college`;

function ContactRow({
  icon: Icon,
  children,
}: {
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  children: string;
}) {
  return (
    <li className="flex min-w-0 items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        <Icon className="size-4" aria-hidden={true} />
      </span>
      <span className="truncate" title={children}>
        {children}
      </span>
    </li>
  );
}

/** Banner card with the college's logo, name and contacts; mirrors TeacherProfileCard. */
export function CollegeProfileCard({ college }: { college: College }) {
  const description = college.detail?.description;

  return (
    <section className="relative min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card dark:border-slate-800 dark:bg-slate-900">
      <div className="relative h-24 bg-gradient-to-r from-brand-600 via-violet-600 to-purple-600 sm:h-28 dark:from-brand-700 dark:via-violet-800 dark:to-purple-900">
        {college.poster && (
          <img src={college.poster} alt="" className="absolute inset-0 size-full object-cover opacity-30" />
        )}
        <div className="absolute -top-10 right-10 size-40 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
      </div>

      <div className="px-5 pb-6 sm:px-6">
        <div className="relative -mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
          <CollegeLogo college={college} size="xl" className="shadow-card ring-4 ring-white dark:ring-slate-900" />
          <a
            href={COLLEGE_PANEL_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-brand-500/50 dark:hover:bg-brand-500/10 dark:hover:text-brand-300"
          >
            <ExternalLink className="size-4" aria-hidden="true" />
            მართვის პანელი
          </a>
        </div>

        <h2 className="mt-4 text-xl font-bold break-words sm:text-2xl">{college.name}</h2>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-3 dark:text-slate-400">{description}</p>
        )}

        <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {college.address && <ContactRow icon={MapPin}>{college.address}</ContactRow>}
          {college.phone && <ContactRow icon={Phone}>{college.phone}</ContactRow>}
          {college.email && <ContactRow icon={Mail}>{college.email}</ContactRow>}
          {college.website && <ContactRow icon={Globe}>{college.website}</ContactRow>}
        </ul>
      </div>
    </section>
  );
}
