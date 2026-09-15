import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";

interface MetaRow {
  label: string;
  value: ReactNode;
}

interface EntityCardShellProps {
  title: string;
  to: string;
  meta: MetaRow[];
  eyebrow?: string;
}

export function EntityCardShell({ title, to, meta, eyebrow }: EntityCardShellProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover sm:p-6">
      <div>
        {eyebrow && (
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-brand-600">
            {eyebrow}
          </p>
        )}
        <h3 className="truncate text-lg font-semibold text-slate-900">{title}</h3>

        <dl className="mt-3 flex flex-col gap-1.5 text-sm">
          {meta.map((row) => (
            <div key={row.label} className="flex gap-1.5 truncate">
              <dt className="shrink-0 font-medium text-slate-500">{row.label}:</dt>
              <dd className="truncate text-slate-600">{row.value ?? "—"}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Link
        to={to}
        className="mt-5 flex items-center justify-center gap-1.5 rounded-lg border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-100"
      >
        ვრცლად
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
