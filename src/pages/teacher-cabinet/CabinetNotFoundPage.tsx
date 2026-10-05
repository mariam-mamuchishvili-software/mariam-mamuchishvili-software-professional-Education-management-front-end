import { CompassIcon } from "lucide-react";
import { Link } from "react-router";
import { TEACHER_CABINET_BASE } from "../../constants/teacherCabinet";

export function CabinetNotFoundPage() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center py-16 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
        <CompassIcon className="size-8" aria-hidden="true" />
      </span>
      <p className="mt-6 text-sm font-semibold text-brand-600 dark:text-brand-400">404</p>
      <h2 className="mt-2 text-2xl font-bold">გვერდი ვერ მოიძებნა</h2>
      <p className="mt-3 text-slate-500 dark:text-slate-400">კაბინეტში ასეთი განყოფილება არ არსებობს.</p>
      <Link
        to={TEACHER_CABINET_BASE}
        className="mt-8 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        დაფაზე დაბრუნება
      </Link>
    </div>
  );
}
