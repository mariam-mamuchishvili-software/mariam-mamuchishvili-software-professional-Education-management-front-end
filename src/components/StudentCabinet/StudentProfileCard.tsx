import { Building2, Cake, Mail, Pencil, Phone } from "lucide-react";
import type { ComponentType } from "react";
import { Link } from "react-router";
import { STUDENT_CABINET_BASE } from "../../constants/studentCabinet";
import type { StudentCabinetData } from "../../types/studentCabinet.types";
import { formatDate } from "../../utils/formatDate";
import { getAge } from "../../utils/studentCabinet";
import { StudentAvatar } from "./StudentAvatar";

interface StudentProfileCardProps {
  data: StudentCabinetData;
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

export function StudentProfileCard({ data }: StudentProfileCardProps) {
  const { profile, current_studies, education_history } = data;
  const college = current_studies.colleges[0];
  const group = current_studies.groups[0];
  // The current program comes from the active education record, if the student added one.
  const activeEducation = education_history.find((item) => item.status === "active");
  const program = activeEducation?.profession_name ?? activeEducation?.program_name;
  const age = getAge(profile.birth_date);

  return (
    <section className="relative min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card dark:border-slate-800 dark:bg-slate-900">
      <div className="relative h-24 bg-gradient-to-r from-brand-600 via-violet-600 to-fuchsia-600 sm:h-28 dark:from-brand-700 dark:via-violet-800 dark:to-fuchsia-900">
        <div className="absolute -top-10 right-10 size-40 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
      </div>

      <div className="px-5 pb-6 sm:px-6">
        <div className="relative -mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
          <StudentAvatar student={profile} size="xl" className="ring-4 ring-white shadow-card dark:ring-slate-900" />
          <Link
            to={`${STUDENT_CABINET_BASE}/settings`}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-brand-500/50 dark:hover:bg-brand-500/10 dark:hover:text-brand-300"
          >
            <Pencil className="size-4" aria-hidden="true" />
            პროფილის რედაქტირება
          </Link>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-bold sm:text-2xl">{profile.full_name}</h2>
          <p className="mt-1 text-sm font-medium text-brand-600 dark:text-brand-400">
            {[group?.name, program].filter(Boolean).join(" · ") || "სტუდენტი"}
          </p>
        </div>

        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {profile.email && <ContactRow icon={Mail}>{profile.email}</ContactRow>}
          {profile.phone && <ContactRow icon={Phone}>{profile.phone}</ContactRow>}
          {college && <ContactRow icon={Building2}>{college.name}</ContactRow>}
          {profile.birth_date && (
            <ContactRow icon={Cake}>
              {age !== null ? `${formatDate(profile.birth_date)} (${age} წ.)` : formatDate(profile.birth_date)}
            </ContactRow>
          )}
        </ul>
      </div>
    </section>
  );
}
