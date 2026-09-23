import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

/** Matches the accent colors of the entity cards (see e.g. ModuleCard.css). */
export type PageHeaderAccent = "indigo" | "amber" | "violet" | "sky" | "emerald" | "rose";

// Class names are spelled out in full per accent so Tailwind can detect them.
const BACK_BUTTON_ACCENTS: Record<PageHeaderAccent, string> = {
  indigo:
    "border-indigo-600/10 bg-indigo-600/10 text-indigo-600 hover:border-indigo-600 hover:bg-indigo-600 dark:border-indigo-400/15 dark:bg-indigo-400/15 dark:text-indigo-400 dark:hover:border-indigo-400 dark:hover:bg-indigo-400",
  amber:
    "border-amber-600/10 bg-amber-600/10 text-amber-600 hover:border-amber-600 hover:bg-amber-600 dark:border-amber-400/15 dark:bg-amber-400/15 dark:text-amber-400 dark:hover:border-amber-400 dark:hover:bg-amber-400",
  violet:
    "border-violet-600/10 bg-violet-600/10 text-violet-600 hover:border-violet-600 hover:bg-violet-600 dark:border-violet-400/15 dark:bg-violet-400/15 dark:text-violet-400 dark:hover:border-violet-400 dark:hover:bg-violet-400",
  sky: "border-sky-600/10 bg-sky-600/10 text-sky-600 hover:border-sky-600 hover:bg-sky-600 dark:border-sky-400/15 dark:bg-sky-400/15 dark:text-sky-400 dark:hover:border-sky-400 dark:hover:bg-sky-400",
  emerald:
    "border-emerald-600/10 bg-emerald-600/10 text-emerald-600 hover:border-emerald-600 hover:bg-emerald-600 dark:border-emerald-400/15 dark:bg-emerald-400/15 dark:text-emerald-400 dark:hover:border-emerald-400 dark:hover:bg-emerald-400",
  rose: "border-rose-600/10 bg-rose-600/10 text-rose-600 hover:border-rose-600 hover:bg-rose-600 dark:border-rose-400/15 dark:bg-rose-400/15 dark:text-rose-400 dark:hover:border-rose-400 dark:hover:bg-rose-400",
};

interface PageHeaderProps {
  title: string;
  description?: string;
  backHref?: string;
  accent?: PageHeaderAccent;
}

export function PageHeader({ title, description, backHref, accent = "indigo" }: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">{title}</h1>
        {description && <p className="mt-2 text-slate-500 dark:text-slate-400">{description}</p>}
      </div>
      {backHref && (
        <Link
          to={backHref}
          className={`flex w-fit shrink-0 items-center gap-1.5 self-start rounded-xl border px-4 py-2 text-sm font-semibold transition-all hover:gap-2.5 hover:text-white ${BACK_BUTTON_ACCENTS[accent]}`}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          უკან
        </Link>
      )}
    </div>
  );
}
