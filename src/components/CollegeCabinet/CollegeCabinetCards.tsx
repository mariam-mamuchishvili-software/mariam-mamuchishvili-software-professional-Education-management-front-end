import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Calendar,
  ChevronRight,
  Clock,
  GraduationCap,
  Mail,
  Megaphone,
  Phone,
  Star,
  UsersRound,
} from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import {
  AUDIENCE_LABELS,
  COLLEGE_CABINET_BASE,
  GROUP_STATUS_LABELS,
  STUDY_SHIFT_LABELS,
} from "../../constants/collegeCabinet";
import type {
  CollegeAnnouncement,
  CollegeGroup,
  CollegeModule,
  CollegeProfession,
  CollegeStudent,
  GroupStatus,
} from "../../types/collegeCabinet.types";
import type { Teacher } from "../../types/teacher.types";
import { formatDate } from "../../utils/formatDate";
import { StudentAvatar } from "../StudentCabinet/StudentAvatar";
import { TeacherAvatar } from "../TeacherCabinet/TeacherAvatar";

/*
 * Cards for the college cabinet's lists: the same visual language as the teacher and student
 * cabinets, linking to the cabinet's own details pages rather than the public catalog.
 */

const CARD =
  "flex min-w-0 flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900";

const LINK_CARD =
  "group flex min-w-0 flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-card transition-all hover:border-slate-300 hover:shadow-card-hover sm:p-5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700";

const CHIP =
  "max-w-full truncate rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 first-letter:uppercase dark:bg-slate-800 dark:text-slate-300";

function MoreLink({ to }: { to: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-all hover:gap-2 dark:text-brand-400"
    >
      ვრცლად
      <ArrowRight className="size-4" aria-hidden="true" />
    </Link>
  );
}

export function CodeBadge({ code }: { code?: string | null }) {
  return code ? (
    <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
      {code}
    </span>
  ) : null;
}

// Class names are spelled out in full per status so Tailwind can detect them.
const GROUP_STATUS_CLASSES: Record<GroupStatus, string> = {
  planned:
    "bg-amber-50 text-amber-700 ring-amber-600/15 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-400/20",
  active:
    "bg-emerald-50 text-emerald-700 ring-emerald-600/15 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20",
  completed:
    "bg-violet-50 text-violet-700 ring-violet-600/15 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-400/20",
};

export function GroupStatusBadge({ status }: { status: GroupStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${GROUP_STATUS_CLASSES[status]}`}
    >
      {GROUP_STATUS_LABELS[status] ?? status}
    </span>
  );
}

interface ProgressBarProps {
  percent: number;
  label: string;
  /** A fill level: the colour turns amber near capacity and rose above it. */
  capacity?: boolean;
}

export function ProgressBar({ percent, label, capacity = false }: ProgressBarProps) {
  const width = Math.min(Math.max(percent, 0), 100);
  const color = capacity && percent > 100 ? "bg-rose-500" : capacity && percent >= 90 ? "bg-amber-500" : "bg-brand-500";

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={Math.round(percent)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
    >
      <div className={`h-full rounded-full ${color} transition-[width]`} style={{ width: `${width}%` }} />
    </div>
  );
}

function InfoLine({ icon: Icon, children }: { icon: typeof Mail; children: ReactNode }) {
  return (
    <li className="flex min-w-0 items-center gap-2">
      <Icon className="size-3.5 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden="true" />
      <span className="truncate">{children}</span>
    </li>
  );
}

export function CollegeStudentCard({ student }: { student: CollegeStudent }) {
  const groups = student.groups ?? [];

  return (
    <Link to={`${COLLEGE_CABINET_BASE}/students/${student.id}`} className={LINK_CARD}>
      <div className="flex items-center gap-3">
        <StudentAvatar student={student} size="md" />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold">
            {student.first_name} {student.last_name}
          </h3>
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">
            {groups.length > 0 ? `${groups.length} ჯგუფი` : "ჯგუფის გარეშე"}
          </p>
        </div>
        <ChevronRight
          className="size-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-500 dark:text-slate-600"
          aria-hidden="true"
        />
      </div>

      <ul className="flex flex-col gap-1.5 text-sm text-slate-600 dark:text-slate-400">
        <InfoLine icon={Mail}>{student.email || "—"}</InfoLine>
        <InfoLine icon={Phone}>{student.phone || "—"}</InfoLine>
      </ul>

      {groups.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {groups.map((group) => (
            <span key={group.id} className={CHIP}>
              {group.name}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

export function CollegeTeacherCard({ teacher }: { teacher: Teacher }) {
  const modules = teacher.modules ?? [];

  return (
    <Link to={`${COLLEGE_CABINET_BASE}/teachers/${teacher.id}`} className={LINK_CARD}>
      <div className="flex items-center gap-3">
        <TeacherAvatar teacher={teacher} size="md" />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold">
            {teacher.first_name} {teacher.last_name}
          </h3>
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">{teacher.specialization || "—"}</p>
        </div>
        <ChevronRight
          className="size-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-500 dark:text-slate-600"
          aria-hidden="true"
        />
      </div>

      <ul className="flex flex-col gap-1.5 text-sm text-slate-600 dark:text-slate-400">
        <InfoLine icon={Mail}>{teacher.email || "—"}</InfoLine>
        <InfoLine icon={Phone}>{teacher.phone || "—"}</InfoLine>
      </ul>

      {modules.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {modules.map((module) => (
            <span key={module.id} className={CHIP}>
              {module.name}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

export function CollegeGroupCard({ group }: { group: CollegeGroup }) {
  const students = group.students_count ?? group.students?.length ?? 0;
  const percent = group.capacity ? (students / group.capacity) * 100 : 0;

  return (
    <article className={CARD}>
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300">
          <UsersRound className="size-5" aria-hidden="true" />
        </span>
        <div className="flex flex-wrap justify-end gap-1.5">
          <GroupStatusBadge status={group.status} />
          <CodeBadge code={group.code} />
        </div>
      </div>

      <h3 className="mt-4 text-base font-semibold break-words">{group.name}</h3>

      <ul className="mt-3 flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-400">
        {group.profession && <InfoLine icon={Briefcase}>{group.profession.name}</InfoLine>}
        {group.study_shift && (
          <InfoLine icon={Clock}>{STUDY_SHIFT_LABELS[group.study_shift] ?? group.study_shift} სწავლება</InfoLine>
        )}
        {group.starts_on && (
          <InfoLine icon={Calendar}>
            {formatDate(group.starts_on)}
            {group.ends_on && ` — ${formatDate(group.ends_on)}`}
          </InfoLine>
        )}
      </ul>

      <div className="mt-4 flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>შევსებულობა</span>
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {students} / {group.capacity ?? "—"}
          </span>
        </div>
        <ProgressBar percent={percent} label={`${group.name} — შევსებულობა`} capacity />
      </div>

      <div className="mt-auto pt-4">
        <MoreLink to={`${COLLEGE_CABINET_BASE}/groups/${group.id}`} />
      </div>
    </article>
  );
}

export function CollegeProfessionCard({ profession }: { profession: CollegeProfession }) {
  return (
    <article className={CARD}>
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300">
          <Briefcase className="size-5" aria-hidden="true" />
        </span>
        <CodeBadge code={profession.code} />
      </div>

      <h3 className="mt-4 text-base font-semibold break-words first-letter:uppercase">{profession.name}</h3>
      {profession.description && (
        <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-3 dark:text-slate-400">
          {profession.description}
        </p>
      )}

      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          { icon: BookOpen, label: "მოდული", value: profession.modules_count ?? profession.modules?.length ?? "—" },
          { icon: Clock, label: "ხანგრძლივობა", value: profession.duration ?? "—" },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-xl bg-slate-50 px-2 py-2.5 text-center dark:bg-slate-800/50">
            <Icon className="mx-auto size-4 text-slate-400 dark:text-slate-500" aria-hidden="true" />
            <p className="mt-1 truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{value}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{label}</p>
          </div>
        ))}
      </div>

      {profession.qualification && (
        <p className="mt-3 flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
          <GraduationCap className="mt-0.5 size-4 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden="true" />
          <span className="min-w-0 break-words">{profession.qualification}</span>
        </p>
      )}

      <div className="mt-auto pt-4">
        <MoreLink to={`${COLLEGE_CABINET_BASE}/professions/${profession.id}`} />
      </div>
    </article>
  );
}

export function CollegeModuleCard({ module }: { module: CollegeModule }) {
  return (
    <article className={CARD}>
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
          <BookOpen className="size-5" aria-hidden="true" />
        </span>
        <CodeBadge code={module.code} />
      </div>

      <h3 className="mt-4 text-base font-semibold break-words first-letter:uppercase">{module.name}</h3>
      {module.description && (
        <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-3 dark:text-slate-400">
          {module.description}
        </p>
      )}

      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          { icon: Star, label: "კრედიტი", value: module.credits ?? "—" },
          { icon: Clock, label: "საათი", value: module.duration ?? "—" },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-xl bg-slate-50 px-2 py-2.5 text-center dark:bg-slate-800/50">
            <Icon className="mx-auto size-4 text-slate-400 dark:text-slate-500" aria-hidden="true" />
            <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">{value}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4">
        <MoreLink to={`${COLLEGE_CABINET_BASE}/modules/${module.id}`} />
      </div>
    </article>
  );
}

interface AnnouncementCardProps {
  announcement: CollegeAnnouncement;
  /** Shows only the first lines of the body (dashboard). */
  compact?: boolean;
}

export function AnnouncementCard({ announcement, compact = false }: AnnouncementCardProps) {
  const isDraft = !announcement.published_at;

  return (
    <article className={compact ? "min-w-0" : CARD}>
      <div className="flex items-start gap-3">
        <span
          className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
            announcement.is_important
              ? "bg-rose-50 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300"
              : "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300"
          }`}
        >
          <Megaphone className="size-4.5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <h3 className="min-w-0 text-sm font-semibold break-words sm:text-base">{announcement.title}</h3>
            {announcement.is_important && (
              <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
                მნიშვნელოვანი
              </span>
            )}
            {isDraft && (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                მონახაზი
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            {AUDIENCE_LABELS[announcement.audience] ?? announcement.audience}
            {!isDraft && ` · ${formatDate(announcement.published_at ?? undefined)}`}
          </p>
          <p
            className={`mt-2 text-sm leading-relaxed whitespace-pre-line text-slate-600 dark:text-slate-400 ${
              compact ? "line-clamp-2" : ""
            }`}
          >
            {announcement.body}
          </p>
        </div>
      </div>
    </article>
  );
}
