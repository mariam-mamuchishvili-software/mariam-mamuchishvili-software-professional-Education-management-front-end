import { Building2, Mail, MapPin, Pencil, Phone } from "lucide-react";
import type { ComponentType } from "react";
import { Link } from "react-router";
import { TEACHER_CABINET_BASE } from "../../constants/teacherCabinet";
import type { CabinetTeacher } from "../../types/teacherCabinet.types";
import { TeacherAvatar } from "./TeacherAvatar";

interface TeacherProfileCardProps {
  teacher: CabinetTeacher;
  /** Current job title from the work-experience records, shown above the specialization. */
  position?: string;
}

function ContactRow({
  icon: Icon,
  children,
}: {
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  children: string;
}) {
  return (
    <li className="flex min-w-0 items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        <Icon className="size-4" aria-hidden={true} />
      </span>
      <span className="truncate" title={children}>
        {children}
      </span>
    </li>
  );
}

export function TeacherProfileCard({ teacher, position }: TeacherProfileCardProps) {
  const fullName = `${teacher.first_name} ${teacher.last_name}`;
  const college = teacher.colleges?.[0];
  // The teacher has no location of their own, so use the city line of their college's address.
  const location = college?.address?.split("\n").at(-1)?.trim();
  const biography = teacher.detail?.biography;

  return (
    <section className="relative min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card dark:border-slate-800 dark:bg-slate-900">
      <div className="relative h-24 bg-gradient-to-r from-brand-600 via-violet-600 to-purple-600 sm:h-28 dark:from-brand-700 dark:via-violet-800 dark:to-purple-900">
        <div className="absolute -top-10 right-10 size-40 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
      </div>

      <div className="px-5 pb-6 sm:px-6">
        <div className="relative -mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
          <TeacherAvatar
            teacher={teacher}
            size="xl"
            className="ring-4 ring-white shadow-card dark:ring-slate-900"
          />
          <Link
            to={`${TEACHER_CABINET_BASE}/settings`}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-brand-500/50 dark:hover:bg-brand-500/10 dark:hover:text-brand-300"
          >
            <Pencil className="size-4" aria-hidden="true" />
            პროფილის რედაქტირება
          </Link>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-bold sm:text-2xl">{fullName}</h2>
          <p className="mt-1 text-sm font-medium text-brand-600 dark:text-brand-400">
            {[position, teacher.specialization].filter(Boolean).join(" · ") || "—"}
          </p>
        </div>

        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {teacher.email && <ContactRow icon={Mail}>{teacher.email}</ContactRow>}
          {teacher.phone && <ContactRow icon={Phone}>{teacher.phone}</ContactRow>}
          {college && <ContactRow icon={Building2}>{college.name}</ContactRow>}
          {location && <ContactRow icon={MapPin}>{location}</ContactRow>}
        </ul>

        {biography && (
          <p className="mt-5 border-t border-slate-100 pt-5 text-sm leading-relaxed text-slate-600 line-clamp-3 dark:border-slate-800 dark:text-slate-400">
            {biography}
          </p>
        )}
      </div>
    </section>
  );
}
