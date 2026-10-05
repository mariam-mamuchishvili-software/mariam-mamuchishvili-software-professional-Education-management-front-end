import type { ComponentType, ReactNode } from "react";

export interface TimelineEntry {
  id: number;
  period: string;
  title: string;
  subtitle: string;
  meta?: string;
  badge?: ReactNode;
  description?: string | null;
  highlighted?: boolean;
}

interface TimelineProps {
  entries: TimelineEntry[];
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}

/** Vertical timeline shared by work experience and education. */
export function Timeline({ entries, icon: Icon }: TimelineProps) {
  return (
    <ol className="relative flex flex-col gap-4">
      {entries.map((entry, index) => (
        <li key={entry.id} className="relative flex gap-4">
          <div className="relative flex flex-col items-center">
            <span
              className={`z-10 flex size-10 shrink-0 items-center justify-center rounded-xl border ${
                entry.highlighted
                  ? "border-brand-600 bg-brand-600 text-white shadow-md shadow-brand-600/25 dark:border-brand-500 dark:bg-brand-500"
                  : "border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
              }`}
            >
              <Icon className="size-4.5" aria-hidden={true} />
            </span>
            {index < entries.length - 1 && (
              <span className="absolute top-10 -bottom-4 w-px bg-slate-200 dark:bg-slate-700/80" aria-hidden="true" />
            )}
          </div>

          <article className="min-w-0 flex-1 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-card transition-shadow hover:shadow-card-hover sm:p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
                {entry.period}
              </p>
              {entry.meta && (
                <span className="text-xs text-slate-400 dark:text-slate-500">· {entry.meta}</span>
              )}
              {entry.badge}
            </div>
            <h3 className="mt-2 text-base font-semibold break-words">{entry.title}</h3>
            <p className="mt-0.5 text-sm font-medium break-words text-brand-600 dark:text-brand-400">
              {entry.subtitle}
            </p>
            {entry.description && (
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{entry.description}</p>
            )}
          </article>
        </li>
      ))}
    </ol>
  );
}
