import { CheckCircle2, Circle, Gauge } from "lucide-react";
import type { ProfileCompletionItem } from "../../types/teacherCabinet.types";
import { CabinetCard } from "./CabinetCard";

interface ProfileCompletionCardProps {
  items: ProfileCompletionItem[];
}

export function ProfileCompletionCard({ items }: ProfileCompletionCardProps) {
  const completed = items.filter((item) => item.done).length;
  const percent = items.length > 0 ? Math.round((completed / items.length) * 100) : 0;
  const missing = items.filter((item) => !item.done);

  return (
    <CabinetCard title="პროფილის შევსება" icon={Gauge} className="h-full">
      <div className="flex items-end justify-between gap-3">
        <p className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">{percent}%</p>
        <p className="pb-1 text-sm text-slate-500 dark:text-slate-400">
          {completed} / {items.length} ნაბიჯი
        </p>
      </div>

      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="პროფილის შევსების პროცენტი"
        className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-violet-500 transition-[width] duration-700"
          style={{ width: `${percent}%` }}
        />
      </div>

      <ul className="mt-5 flex flex-col gap-2.5">
        {(missing.length > 0 ? missing : items).slice(0, 5).map((item) => (
          <li key={item.label} className="flex items-center gap-2.5 text-sm">
            {item.done ? (
              <CheckCircle2 className="size-4 shrink-0 text-emerald-500" aria-hidden="true" />
            ) : (
              <Circle className="size-4 shrink-0 text-slate-300 dark:text-slate-600" aria-hidden="true" />
            )}
            <span className={item.done ? "text-slate-500 dark:text-slate-400" : "text-slate-700 dark:text-slate-200"}>
              {item.label}
            </span>
            <span className="sr-only">{item.done ? "(შევსებულია)" : "(შესავსებია)"}</span>
          </li>
        ))}
      </ul>
      {missing.length === 0 && (
        <p className="mt-4 text-sm font-medium text-emerald-600 dark:text-emerald-400">პროფილი სრულად შევსებულია 🎉</p>
      )}
    </CabinetCard>
  );
}
