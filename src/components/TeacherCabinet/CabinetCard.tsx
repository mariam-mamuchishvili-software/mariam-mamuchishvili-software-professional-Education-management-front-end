import type { ComponentType, ReactNode } from "react";

interface CabinetCardProps {
  title?: string;
  description?: string;
  icon?: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** Base surface for every cabinet panel: rounded, subtle border, soft shadow. */
export function CabinetCard({ title, description, icon: Icon, action, className = "", children }: CabinetCardProps) {
  return (
    <section
      className={`min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card sm:p-6 dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      {(title || action) && (
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            {Icon && (
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
                <Icon className="size-4.5" aria-hidden={true} />
              </span>
            )}
            <div className="min-w-0">
              {title && <h2 className="text-base font-semibold">{title}</h2>}
              {description && <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{description}</p>}
            </div>
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
