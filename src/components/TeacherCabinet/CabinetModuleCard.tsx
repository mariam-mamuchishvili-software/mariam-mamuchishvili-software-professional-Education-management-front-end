import { ArrowRight, BookOpen, Clock, Star, Users } from "lucide-react";
import { Link } from "react-router";
import type { CabinetModule } from "../../types/teacherCabinet.types";

interface CabinetModuleCardProps {
  module: CabinetModule;
}

export function CabinetModuleCard({ module }: CabinetModuleCardProps) {
  const professions = module.professions ?? [];

  return (
    <article className="flex min-w-0 flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
          <BookOpen className="size-5" aria-hidden="true" />
        </span>
        {module.code && (
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {module.code}
          </span>
        )}
      </div>

      <h3 className="mt-4 text-base font-semibold break-words first-letter:uppercase">{module.name}</h3>
      {module.description && (
        <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2 dark:text-slate-400">
          {module.description}
        </p>
      )}

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { icon: Star, label: "კრედიტი", value: module.credits ?? "—" },
          { icon: Clock, label: "საათი", value: module.duration ?? "—" },
          { icon: Users, label: "სტუდენტი", value: module.students?.length ?? 0 },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-xl bg-slate-50 px-2 py-2.5 text-center dark:bg-slate-800/50">
            <Icon className="mx-auto size-4 text-slate-400 dark:text-slate-500" aria-hidden="true" />
            <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">{value}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{label}</p>
          </div>
        ))}
      </div>

      {professions.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {professions.map((profession) => (
            <span
              key={profession.id}
              className="max-w-full truncate rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
            >
              {profession.name}
            </span>
          ))}
        </div>
      )}

      <Link
        to={`/modules/${module.id}`}
        className="mt-auto inline-flex items-center gap-1 self-start pt-4 text-sm font-semibold text-brand-600 transition-all hover:gap-2 dark:text-brand-400"
      >
        ვრცლად
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
