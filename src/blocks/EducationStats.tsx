import { BookOpen, Briefcase, Building2, GraduationCap, Presentation, Users2 } from "lucide-react";
import type { ComponentType } from "react";
import { Link } from "react-router";
import { getStatistics } from "../api/statistics.api";
import { useAsync } from "../hooks/useAsync";
import { EmptyState } from "../partials/EmptyState";
import { ErrorState } from "../partials/ErrorState";
import { LoadingState } from "../partials/LoadingState";
import type { Statistics } from "../types/statistics.types";
import "./EducationStats.css";

interface StatItem {
  key: keyof Statistics;
  label: string;
  to: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}

const PRIMARY_STATS: StatItem[] = [
  { key: "colleges", label: "კოლეჯი", to: "/colleges", icon: Building2 },
  { key: "professions", label: "პროფესია", to: "/professions", icon: Briefcase },
  { key: "modules", label: "მოდული", to: "/modules", icon: BookOpen },
  { key: "groups", label: "ჯგუფი", to: "/groups", icon: Users2 },
];

const SECONDARY_STATS: StatItem[] = [
  { key: "teachers", label: "მასწავლებელი", to: "/teachers", icon: Presentation },
  { key: "students", label: "სტუდენტი", to: "/students", icon: GraduationCap },
];

function StatLink({ item, value }: { item: StatItem; value: number }) {
  const Icon = item.icon;

  return (
    <Link
      to={item.to}
      className="edu-stats-item group flex flex-col items-center gap-2 rounded-2xl px-4 py-6 text-center hover:bg-slate-50 dark:hover:bg-slate-800/60"
    >
      <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-transform group-hover:scale-110 dark:bg-brand-500/10 dark:text-brand-400">
        <Icon className="size-6" aria-hidden={true} />
      </span>
      <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.label}</p>
    </Link>
  );
}

export function EducationStats() {
  const state = useAsync((signal) => getStatistics(signal), []);

  const isEmpty =
    state.status === "success" && Object.values(state.data.data).every((count) => count === 0);

  return (
    <section className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {state.status === "loading" && <LoadingState label="სტატისტიკა იტვირთება..." />}
        {state.status === "error" && <ErrorState message={state.error} />}

        {state.status === "success" && isEmpty && (
          <EmptyState title="სტატისტიკა არ მოიძებნა" description="პლატფორმაზე მონაცემები ჯერ არ არის დამატებული." />
        )}

        {state.status === "success" && !isEmpty && (
          <div className="edu-stats-card overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card dark:border-slate-800 dark:bg-slate-900">
            <div className="p-6 sm:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">EduHub სტატისტიკა</h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">ჩვენი საგანმანათლებლო პლატფორმა</p>
                </div>
                <span className="shrink-0 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:border-brand-800 dark:bg-brand-500/10 dark:text-brand-300">
                  {new Date().getFullYear()}
                </span>
              </div>

              <div className="edu-stats-divider my-8" />

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {PRIMARY_STATS.map((item) => (
                  <StatLink key={item.key} item={item} value={state.data.data[item.key]} />
                ))}
              </div>

              <div className="edu-stats-divider my-8" />

              <div className="mx-auto grid grid-cols-2 gap-2 sm:max-w-md">
                {SECONDARY_STATS.map((item) => (
                  <StatLink key={item.key} item={item} value={state.data.data[item.key]} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
