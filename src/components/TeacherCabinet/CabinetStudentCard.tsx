import { ChevronRight, Mail, Phone } from "lucide-react";
import { Link } from "react-router";
import type { CabinetStudent } from "../../types/teacherCabinet.types";
import { getStudentInitials } from "../StudentPhoto/StudentPhoto";

interface CabinetStudentCardProps {
  student: CabinetStudent;
}

export function CabinetStudentCard({ student }: CabinetStudentCardProps) {
  const fullName = `${student.first_name} ${student.last_name}`;

  return (
    <Link
      to={`/students/${student.id}`}
      className="group flex min-w-0 flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-card transition-all hover:border-slate-300 hover:shadow-card-hover sm:p-5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
    >
      <div className="flex items-center gap-3">
        {student.image ? (
          <img src={student.image} alt="" className="size-12 shrink-0 rounded-full object-cover" loading="lazy" />
        ) : (
          <span
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-600 text-sm font-semibold text-white"
            aria-hidden="true"
          >
            {getStudentInitials(student)}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold">{fullName}</h3>
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">
            {student.moduleNames.length} მოდული
          </p>
        </div>
        <ChevronRight
          className="size-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-500 dark:text-slate-600"
          aria-hidden="true"
        />
      </div>

      <ul className="flex flex-col gap-1.5 text-sm text-slate-600 dark:text-slate-400">
        <li className="flex min-w-0 items-center gap-2">
          <Mail className="size-3.5 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden="true" />
          <span className="truncate">{student.email || "—"}</span>
        </li>
        <li className="flex min-w-0 items-center gap-2">
          <Phone className="size-3.5 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden="true" />
          <span className="truncate">{student.phone || "—"}</span>
        </li>
      </ul>

      <div className="flex flex-wrap gap-1.5">
        {student.moduleNames.map((name) => (
          <span
            key={name}
            className="max-w-full truncate rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 first-letter:uppercase dark:bg-slate-800 dark:text-slate-300"
          >
            {name}
          </span>
        ))}
      </div>
    </Link>
  );
}
