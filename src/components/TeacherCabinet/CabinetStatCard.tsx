import { ArrowUpRight } from "lucide-react";
import type { ComponentType } from "react";
import { Link } from "react-router";

export type StatAccent = "indigo" | "emerald" | "amber" | "rose";

// Class names are spelled out in full per accent so Tailwind can detect them.
const ACCENT_CLASSES: Record<StatAccent, string> = {
  indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300",
  emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300",
  amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300",
  rose: "bg-rose-50 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300",
};

interface CabinetStatCardProps {
  label: string;
  value: number;
  hint?: string;
  href: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  accent: StatAccent;
}

export function CabinetStatCard({ label, value, hint, href, icon: Icon, accent }: CabinetStatCardProps) {
  return (
    <Link
      to={href}
      className="group flex min-w-0 flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 sm:gap-4 sm:p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
    >
      <div className="flex items-start justify-between gap-3">
        <span className={`flex size-10 items-center sm:size-11 justify-center rounded-xl ${ACCENT_CLASSES[accent]}`}>
          <Icon className="size-5" aria-hidden={true} />
        </span>
        <ArrowUpRight
          className="size-4 text-slate-300 transition-colors group-hover:text-brand-600 dark:text-slate-600 dark:group-hover:text-brand-400"
          aria-hidden="true"
        />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold sm:text-3xl tracking-tight text-slate-900 dark:text-white">{value}</p>
        <p className="mt-1 line-clamp-2 text-sm font-medium text-slate-600 dark:text-slate-300">{label}</p>
        {hint && <p className="mt-0.5 truncate text-xs text-slate-400 dark:text-slate-500">{hint}</p>}
      </div>
    </Link>
  );
}
