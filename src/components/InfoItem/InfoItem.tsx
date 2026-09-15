import type { ReactNode } from "react";

interface InfoItemProps {
  label: string;
  value: ReactNode;
  wide?: boolean;
}

export function InfoItem({ label, value, wide }: InfoItemProps) {
  return (
    <div className={`rounded-xl border border-slate-200 bg-white p-4 ${wide ? "sm:col-span-2" : ""}`}>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <div className="mt-1 text-sm font-medium break-words text-slate-800">{value || "—"}</div>
    </div>
  );
}
