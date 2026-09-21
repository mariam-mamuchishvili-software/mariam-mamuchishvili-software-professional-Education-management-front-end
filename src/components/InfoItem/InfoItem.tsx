import type { ComponentType, ReactNode } from "react";

interface InfoItemProps {
  label: string;
  value: ReactNode;
  wide?: boolean;
  icon?: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}

export function InfoItem({ label, value, wide, icon: Icon }: InfoItemProps) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 ${wide ? "sm:col-span-2" : ""}`}
    >
      <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
        {Icon && <Icon className="size-3.5 shrink-0" aria-hidden={true} />}
        {label}
      </p>
      <div className="mt-1 text-sm font-medium break-words text-slate-800 dark:text-slate-200">{value || "—"}</div>
    </div>
  );
}
