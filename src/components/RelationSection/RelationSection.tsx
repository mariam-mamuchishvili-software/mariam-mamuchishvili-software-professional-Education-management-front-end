import type { ReactNode } from "react";

interface RelationSectionProps {
  title: string;
  count: number;
  emptyText: string;
  children: ReactNode;
}

export function RelationSection({ title, count, emptyText, children }: RelationSectionProps) {
  return (
    <section>
      <h3 className="text-base font-semibold text-slate-900 dark:text-white">
        {title} <span className="font-normal text-slate-400 dark:text-slate-500">({count})</span>
      </h3>
      <div className="mt-4">
        {count > 0 ? children : <p className="text-sm text-slate-500 dark:text-slate-400">{emptyText}</p>}
      </div>
    </section>
  );
}
