import { ArrowRight, BookOpen, Briefcase, Clock, UsersRound } from "lucide-react";
import { Link } from "react-router";
import type { CabinetGroup } from "../../types/teacherCabinet.types";

interface CabinetGroupCardProps {
  group: CabinetGroup;
}

export function CabinetGroupCard({ group }: CabinetGroupCardProps) {
  return (
    <article className="flex min-w-0 flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300">
          <UsersRound className="size-5" aria-hidden="true" />
        </span>
        {group.code && (
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {group.code}
          </span>
        )}
      </div>

      <h3 className="mt-4 text-base font-semibold break-words">{group.name}</h3>

      <ul className="mt-3 flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-400">
        <li className="flex items-center gap-2">
          <Briefcase className="size-4 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden="true" />
          <span className="truncate">{group.professionName}</span>
        </li>
        {group.study_shift && (
          <li className="flex items-center gap-2">
            <Clock className="size-4 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden="true" />
            <span className="truncate">{group.study_shift}</span>
          </li>
        )}
        <li className="flex items-start gap-2">
          <BookOpen className="mt-0.5 size-4 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden="true" />
          <span className="line-clamp-2">{group.moduleNames.join(", ")}</span>
        </li>
      </ul>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          ტევადობა: <span className="font-semibold text-slate-700 dark:text-slate-200">{group.capacity ?? "—"}</span>
        </span>
        <Link
          to={`/groups/${group.id}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-all hover:gap-2 dark:text-brand-400"
        >
          ვრცლად
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
