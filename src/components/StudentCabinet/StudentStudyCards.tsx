import { ArrowRight, BookOpen, Building2, Clock, Globe, Mail, MapPin, Phone, Star, UsersRound } from "lucide-react";
import { Link } from "react-router";
import type { College } from "../../types/college.types";
import type { Group } from "../../types/group.types";
import type { Module } from "../../types/module.types";

/*
 * Cards for what the student studies now (`current_studies` of the cabinet): the same visual
 * language as the teacher cabinet's group and module cards.
 */

const CARD =
  "flex min-w-0 flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900";

function MoreLink({ to }: { to: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-all hover:gap-2 dark:text-brand-400"
    >
      ვრცლად
      <ArrowRight className="size-4" aria-hidden="true" />
    </Link>
  );
}

function CodeBadge({ code }: { code?: string }) {
  return code ? (
    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
      {code}
    </span>
  ) : null;
}

export function StudentGroupCard({ group, professionName }: { group: Group; professionName?: string }) {
  return (
    <article className={CARD}>
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300">
          <UsersRound className="size-5" aria-hidden="true" />
        </span>
        <CodeBadge code={group.code} />
      </div>

      <h3 className="mt-4 text-base font-semibold break-words">{group.name}</h3>

      <ul className="mt-3 flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-400">
        {professionName && (
          <li className="flex items-center gap-2">
            <BookOpen className="size-4 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden="true" />
            <span className="truncate">{professionName}</span>
          </li>
        )}
        {group.study_shift && (
          <li className="flex items-center gap-2">
            <Clock className="size-4 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden="true" />
            <span className="truncate">{group.study_shift}</span>
          </li>
        )}
      </ul>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          ტევადობა: <span className="font-semibold text-slate-700 dark:text-slate-200">{group.capacity ?? "—"}</span>
        </span>
        <MoreLink to={`/groups/${group.id}`} />
      </div>
    </article>
  );
}

export function StudentModuleCard({ module }: { module: Module }) {
  return (
    <article className={CARD}>
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
          <BookOpen className="size-5" aria-hidden="true" />
        </span>
        <CodeBadge code={module.code} />
      </div>

      <h3 className="mt-4 text-base font-semibold break-words first-letter:uppercase">{module.name}</h3>
      {module.description && (
        <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-3 dark:text-slate-400">
          {module.description}
        </p>
      )}

      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          { icon: Star, label: "კრედიტი", value: module.credits ?? "—" },
          { icon: Clock, label: "საათი", value: module.duration ?? "—" },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-xl bg-slate-50 px-2 py-2.5 text-center dark:bg-slate-800/50">
            <Icon className="mx-auto size-4 text-slate-400 dark:text-slate-500" aria-hidden="true" />
            <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">{value}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4">
        <MoreLink to={`/modules/${module.id}`} />
      </div>
    </article>
  );
}

function ContactLine({ icon: Icon, children }: { icon: typeof Mail; children: string }) {
  return (
    <li className="flex min-w-0 items-start gap-2">
      <Icon className="mt-0.5 size-4 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden="true" />
      <span className="min-w-0 break-words">{children}</span>
    </li>
  );
}

export function StudentCollegeCard({ college }: { college: College }) {
  return (
    <article className={CARD}>
      <div className="flex items-center gap-3">
        {college.logo ? (
          <img
            src={college.logo}
            alt=""
            className="size-12 shrink-0 rounded-xl bg-white object-contain p-1 ring-1 ring-slate-200 dark:ring-slate-700"
          />
        ) : (
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
            <Building2 className="size-5" aria-hidden="true" />
          </span>
        )}
        <h3 className="min-w-0 text-base font-semibold break-words">{college.name}</h3>
      </div>

      <ul className="mt-4 flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-400">
        {college.address && <ContactLine icon={MapPin}>{college.address}</ContactLine>}
        {college.phone && <ContactLine icon={Phone}>{college.phone}</ContactLine>}
        {college.email && <ContactLine icon={Mail}>{college.email}</ContactLine>}
        {college.website && <ContactLine icon={Globe}>{college.website}</ContactLine>}
      </ul>

      <div className="mt-auto pt-4">
        <MoreLink to={`/colleges/${college.id}`} />
      </div>
    </article>
  );
}
