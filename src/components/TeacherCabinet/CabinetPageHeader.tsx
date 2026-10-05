import type { ReactNode } from "react";

interface CabinetPageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function CabinetPageHeader({ title, description, action }: CabinetPageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
        {description && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>}
      </div>
      {action}
    </div>
  );
}
