import {
  ArrowLeft,
  Award,
  BookOpen,
  Briefcase,
  Cake,
  Calendar,
  CalendarCheck,
  Clock,
  GraduationCap,
  Mail,
  Phone,
  Presentation,
  SearchX,
  Star,
  UserRound,
  UsersRound,
} from "lucide-react";
import { useState, type ComponentType, type ReactNode } from "react";
import { Link, useParams } from "react-router";
import {
  getCollegeGroup,
  getCollegeModule,
  getCollegeProfession,
  getCollegeStudent,
  getCollegeTeacher,
} from "../../api/collegeCabinet.api";
import { AsyncContent } from "../../components/CollegeCabinet/AsyncContent";
import { CodeBadge, GroupStatusBadge, ProgressBar } from "../../components/CollegeCabinet/CollegeCabinetCards";
import { InfoItem } from "../../components/InfoItem/InfoItem";
import { SocialLinks } from "../../components/SocialLinks/SocialLinks";
import { EducationHistoryTimeline } from "../../components/StudentCabinet/EducationHistoryTimeline";
import { StudentAvatar } from "../../components/StudentCabinet/StudentAvatar";
import { StudentCertificateCard } from "../../components/StudentCabinet/StudentCertificateCard";
import { CabinetCard } from "../../components/TeacherCabinet/CabinetCard";
import { CabinetTrainingCard } from "../../components/TeacherCabinet/CabinetTrainingCard";
import { EducationTimeline } from "../../components/TeacherCabinet/EducationTimeline";
import { TeacherAvatar } from "../../components/TeacherCabinet/TeacherAvatar";
import { WorkExperienceTimeline } from "../../components/TeacherCabinet/WorkExperienceTimeline";
import { COLLEGE_CABINET_BASE, STUDY_SHIFT_LABELS } from "../../constants/collegeCabinet";
import { useAsync } from "../../hooks/useAsync";
import { useCollegeCabinet } from "../../hooks/useCollegeCabinet";
import { EmptyState } from "../../partials/EmptyState";
import { formatDate } from "../../utils/formatDate";

type Icon = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

const ICON_TILE: Record<"sky" | "emerald" | "indigo", string> = {
  sky: "bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300",
  emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300",
  indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300",
};

const SECONDARY_BUTTON =
  "inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-brand-500/50 dark:hover:bg-brand-500/10 dark:hover:text-brand-300";

function BackLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
    >
      <ArrowLeft className="size-4" aria-hidden="true" />
      {children}
    </Link>
  );
}

/**
 * Loads one record by the `:id` route param. A record of another college comes back as 404,
 * which is shown as "not found" rather than an error.
 */
function DetailsLoader<T>({
  fetch,
  backTo,
  backLabel,
  children,
}: {
  fetch: (token: string, id: number, signal: AbortSignal) => Promise<T>;
  backTo: string;
  backLabel: string;
  children: (record: T) => ReactNode;
}) {
  const { token } = useCollegeCabinet();
  const id = Number(useParams().id);
  const [reloadKey, setReloadKey] = useState(0);
  const state = useAsync((signal) => fetch(token, id, signal), [token, id, reloadKey]);

  return (
    <div>
      <BackLink to={backTo}>{backLabel}</BackLink>
      {state.status === "error" && state.errorStatus === 404 ? (
        <EmptyState
          title="ჩანაწერი ვერ მოიძებნა"
          description="ის არ არსებობს ან სხვა კოლეჯს ეკუთვნის."
          icon={<SearchX className="size-6" aria-hidden="true" />}
        />
      ) : (
        <AsyncContent state={state} onRetry={() => setReloadKey((key) => key + 1)}>
          {(record) => <div className="flex flex-col gap-6">{children(record)}</div>}
        </AsyncContent>
      )}
    </div>
  );
}

function Hero({
  media,
  title,
  subtitle,
  badges,
  action,
}: {
  media: ReactNode;
  title: string;
  subtitle?: ReactNode;
  badges?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {media}
        <div className="min-w-0 flex-1">
          {badges && <div className="mb-2 flex flex-wrap gap-1.5">{badges}</div>}
          <h2 className="text-xl font-bold break-words first-letter:uppercase sm:text-2xl">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
        </div>
        {action}
      </div>
    </section>
  );
}

function IconTile({ icon: Icon, tone }: { icon: Icon; tone: keyof typeof ICON_TILE }) {
  return (
    <span className={`flex size-16 shrink-0 items-center justify-center rounded-2xl ${ICON_TILE[tone]}`}>
      <Icon className="size-7" aria-hidden={true} />
    </span>
  );
}

/** One linked row of a related-records list. */
function RowLink({
  to,
  leading,
  title,
  subtitle,
  trailing,
}: {
  to: string;
  leading: ReactNode;
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
}) {
  return (
    <li>
      <Link
        to={to}
        className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition-colors hover:border-brand-300 hover:bg-brand-50/50 dark:border-slate-800 dark:hover:border-brand-500/40 dark:hover:bg-brand-500/5"
      >
        {leading}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-slate-800 first-letter:uppercase dark:text-slate-100">
            {title}
          </p>
          {subtitle && <p className="truncate text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>}
        </div>
        {trailing}
      </Link>
    </li>
  );
}

function SmallIcon({ icon: Icon, tone }: { icon: Icon; tone: keyof typeof ICON_TILE }) {
  return (
    <span className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${ICON_TILE[tone]}`}>
      <Icon className="size-4" aria-hidden={true} />
    </span>
  );
}

function RelatedList({ empty, children }: { empty: string; children: ReactNode[] }) {
  return children.length > 0 ? (
    <ul className="flex flex-col gap-2">{children}</ul>
  ) : (
    <p className="text-sm text-slate-500 dark:text-slate-400">{empty}</p>
  );
}

function attendanceLink(filter: "group_id" | "student_id", id: number) {
  return (
    <Link to={`${COLLEGE_CABINET_BASE}/attendance?${filter}=${id}`} className={SECONDARY_BUTTON}>
      <CalendarCheck className="size-4" aria-hidden="true" />
      დასწრება
    </Link>
  );
}

export function CollegeStudentDetailsPage() {
  return (
    <DetailsLoader fetch={getCollegeStudent} backTo={`${COLLEGE_CABINET_BASE}/students`} backLabel="სტუდენტები">
      {(student) => {
        const groups = student.groups ?? [];
        const educations = student.educations ?? [];
        const certificates = student.certificates ?? [];

        return (
          <>
            <Hero
              media={<StudentAvatar student={student} size="xl" />}
              title={`${student.first_name} ${student.last_name}`}
              subtitle={groups.map((group) => group.name).join(", ") || "ჯგუფის გარეშე"}
              action={attendanceLink("student_id", student.id)}
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <CabinetCard title="ძირითადი ინფორმაცია" icon={UserRound} className="lg:col-span-2">
                <div className="grid gap-3 sm:grid-cols-2">
                  <InfoItem label="ელ-ფოსტა" value={student.email} icon={Mail} />
                  <InfoItem label="ტელეფონი" value={student.phone} icon={Phone} />
                  <InfoItem label="დაბადების თარიღი" value={formatDate(student.birth_date)} icon={Cake} />
                  <InfoItem label="რეგისტრაციის თარიღი" value={formatDate(student.created_at)} icon={Calendar} />
                </div>
              </CabinetCard>

              <CabinetCard title="ჯგუფები" description={`${groups.length} ჯგუფი`} icon={UsersRound}>
                <RelatedList empty="სტუდენტი ჯგუფში არ არის ჩარიცხული.">
                  {groups.map((group) => (
                    <RowLink
                      key={group.id}
                      to={`${COLLEGE_CABINET_BASE}/groups/${group.id}`}
                      leading={<SmallIcon icon={UsersRound} tone="sky" />}
                      title={group.name}
                      subtitle={group.profession?.name}
                    />
                  ))}
                </RelatedList>
              </CabinetCard>
            </div>

            <CabinetCard title="განათლების ისტორია" description={`${educations.length} ჩანაწერი`} icon={GraduationCap}>
              {educations.length > 0 ? (
                <EducationHistoryTimeline items={educations} />
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">განათლების ისტორია არ არის დამატებული.</p>
              )}
            </CabinetCard>

            <CabinetCard title="სერტიფიკატები" description={`${certificates.length} სერტიფიკატი`} icon={Award}>
              {certificates.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {certificates.map((certificate) => (
                    <StudentCertificateCard key={certificate.id} certificate={certificate} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">სერტიფიკატები არ არის გაცემული.</p>
              )}
            </CabinetCard>
          </>
        );
      }}
    </DetailsLoader>
  );
}

export function CollegeTeacherDetailsPage() {
  return (
    <DetailsLoader fetch={getCollegeTeacher} backTo={`${COLLEGE_CABINET_BASE}/teachers`} backLabel="პედაგოგები">
      {(teacher) => {
        const modules = teacher.modules ?? [];
        const workExperiences = teacher.work_experiences ?? [];
        const educations = teacher.educations ?? [];
        const trainings = teacher.trainings ?? [];

        return (
          <>
            <Hero
              media={<TeacherAvatar teacher={teacher} size="xl" />}
              title={`${teacher.first_name} ${teacher.last_name}`}
              subtitle={teacher.specialization}
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="flex min-w-0 flex-col gap-6 lg:col-span-2">
                <CabinetCard title="ძირითადი ინფორმაცია" icon={UserRound}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <InfoItem label="ელ-ფოსტა" value={teacher.email} icon={Mail} />
                    <InfoItem label="ტელეფონი" value={teacher.phone} icon={Phone} />
                    <InfoItem label="სპეციალიზაცია" value={teacher.specialization} icon={Briefcase} wide />
                    {teacher.detail?.biography && (
                      <InfoItem
                        label="ბიოგრაფია"
                        wide
                        value={<span className="font-normal whitespace-pre-line">{teacher.detail.biography}</span>}
                      />
                    )}
                  </div>
                </CabinetCard>

                <CabinetCard title="სამუშაო გამოცდილება" icon={Briefcase}>
                  {workExperiences.length > 0 ? (
                    <WorkExperienceTimeline items={workExperiences} />
                  ) : (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      სამუშაო გამოცდილება არ არის დამატებული.
                    </p>
                  )}
                </CabinetCard>

                <CabinetCard title="განათლება" icon={GraduationCap}>
                  {educations.length > 0 ? (
                    <EducationTimeline items={educations} />
                  ) : (
                    <p className="text-sm text-slate-500 dark:text-slate-400">განათლება არ არის დამატებული.</p>
                  )}
                </CabinetCard>
              </div>

              <div className="flex min-w-0 flex-col gap-6">
                <CabinetCard title="მოდულები" description={`${modules.length} მოდული კოლეჯში`} icon={BookOpen}>
                  <RelatedList empty="პედაგოგს კოლეჯში მოდული არ აქვს.">
                    {modules.map((module) => (
                      <RowLink
                        key={module.id}
                        to={`${COLLEGE_CABINET_BASE}/modules/${module.id}`}
                        leading={<SmallIcon icon={BookOpen} tone="indigo" />}
                        title={module.name}
                        subtitle={module.code}
                      />
                    ))}
                  </RelatedList>
                </CabinetCard>
                {(teacher.detail?.social_links?.length ?? 0) > 0 && (
                  <SocialLinks links={teacher.detail?.social_links} />
                )}
              </div>
            </div>

            {trainings.length > 0 && (
              <CabinetCard title="ტრენინგები და სერტიფიკატები" icon={Award}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {trainings.map((training) => (
                    <CabinetTrainingCard key={training.id} training={training} />
                  ))}
                </div>
              </CabinetCard>
            )}
          </>
        );
      }}
    </DetailsLoader>
  );
}

export function CollegeGroupDetailsPage() {
  return (
    <DetailsLoader fetch={getCollegeGroup} backTo={`${COLLEGE_CABINET_BASE}/groups`} backLabel="ჯგუფები">
      {(group) => {
        const students = group.students ?? [];
        const modules = group.profession?.modules ?? [];
        const count = group.students_count ?? students.length;
        const percent = group.capacity ? (count / group.capacity) * 100 : 0;

        return (
          <>
            <Hero
              media={<IconTile icon={UsersRound} tone="sky" />}
              title={group.name}
              subtitle={group.profession?.name}
              badges={
                <>
                  <GroupStatusBadge status={group.status} />
                  <CodeBadge code={group.code} />
                </>
              }
              action={attendanceLink("group_id", group.id)}
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <CabinetCard title="ძირითადი ინფორმაცია" icon={Clock} className="lg:col-span-2">
                <div className="grid gap-3 sm:grid-cols-2">
                  <InfoItem
                    label="სწავლების ცვლა"
                    value={group.study_shift ? (STUDY_SHIFT_LABELS[group.study_shift] ?? group.study_shift) : null}
                    icon={Clock}
                  />
                  <InfoItem label="ტევადობა" value={group.capacity} icon={UsersRound} />
                  <InfoItem
                    label="დაწყება"
                    value={group.starts_on ? formatDate(group.starts_on) : null}
                    icon={Calendar}
                  />
                  <InfoItem
                    label="დასრულება"
                    value={group.ends_on ? formatDate(group.ends_on) : null}
                    icon={Calendar}
                  />
                  <div className="rounded-xl border border-slate-200 p-4 sm:col-span-2 dark:border-slate-800">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-medium tracking-wide text-slate-400 uppercase dark:text-slate-500">
                        შევსებულობა
                      </span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">
                        {count} / {group.capacity ?? "—"} · {Math.round(percent)}%
                      </span>
                    </div>
                    <ProgressBar percent={percent} label="ჯგუფის შევსებულობა" capacity />
                  </div>
                </div>
              </CabinetCard>

              <CabinetCard title="მოდულები" description="პროფესიის მოდულები" icon={BookOpen}>
                <RelatedList empty="პროფესიას მოდულები არ აქვს.">
                  {modules.map((module) => (
                    <RowLink
                      key={module.id}
                      to={`${COLLEGE_CABINET_BASE}/modules/${module.id}`}
                      leading={<SmallIcon icon={BookOpen} tone="indigo" />}
                      title={module.name}
                      subtitle={module.code}
                      trailing={
                        module.credits != null && (
                          <span className="shrink-0 text-xs font-semibold text-slate-500">{module.credits} კრ.</span>
                        )
                      }
                    />
                  ))}
                </RelatedList>
              </CabinetCard>
            </div>

            <CabinetCard title="სტუდენტები" description={`${students.length} სტუდენტი`} icon={GraduationCap}>
              {students.length > 0 ? (
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
                  {students.map((student) => (
                    <RowLink
                      key={student.id}
                      to={`${COLLEGE_CABINET_BASE}/students/${student.id}`}
                      leading={<StudentAvatar student={student} size="sm" />}
                      title={`${student.first_name} ${student.last_name}`}
                      subtitle={student.email}
                    />
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">ჯგუფში სტუდენტები არ არის.</p>
              )}
            </CabinetCard>
          </>
        );
      }}
    </DetailsLoader>
  );
}

export function CollegeProfessionDetailsPage() {
  return (
    <DetailsLoader fetch={getCollegeProfession} backTo={`${COLLEGE_CABINET_BASE}/professions`} backLabel="პროფესიები">
      {(profession) => {
        const modules = profession.modules ?? [];
        const groups = profession.groups ?? [];
        const credits = modules.reduce((sum, module) => sum + (module.credits ?? 0), 0);

        return (
          <>
            <Hero
              media={<IconTile icon={Briefcase} tone="emerald" />}
              title={profession.name}
              subtitle={profession.qualification}
              badges={<CodeBadge code={profession.code} />}
            />

            <CabinetCard title="ძირითადი ინფორმაცია" icon={Briefcase}>
              <div className="grid gap-3 sm:grid-cols-3">
                <InfoItem label="ხანგრძლივობა" value={profession.duration} icon={Clock} />
                <InfoItem label="მოდულები" value={modules.length} icon={BookOpen} />
                <InfoItem label="კრედიტები" value={credits} icon={Star} />
                {profession.description && (
                  <div className="sm:col-span-3">
                    <InfoItem
                      label="აღწერა"
                      value={<span className="font-normal whitespace-pre-line">{profession.description}</span>}
                    />
                  </div>
                )}
              </div>
            </CabinetCard>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <CabinetCard title="მოდულები" description={`${modules.length} მოდული`} icon={BookOpen}>
                <RelatedList empty="პროფესიას მოდულები არ აქვს.">
                  {modules.map((module) => (
                    <RowLink
                      key={module.id}
                      to={`${COLLEGE_CABINET_BASE}/modules/${module.id}`}
                      leading={<SmallIcon icon={BookOpen} tone="indigo" />}
                      title={module.name}
                      subtitle={module.code}
                      trailing={
                        module.credits != null && (
                          <span className="shrink-0 text-xs font-semibold text-slate-500">{module.credits} კრ.</span>
                        )
                      }
                    />
                  ))}
                </RelatedList>
              </CabinetCard>

              <CabinetCard title="ჯგუფები" description={`${groups.length} ჯგუფი კოლეჯში`} icon={UsersRound}>
                <RelatedList empty="ამ პროფესიაზე ჯგუფი არ არის.">
                  {groups.map((group) => (
                    <RowLink
                      key={group.id}
                      to={`${COLLEGE_CABINET_BASE}/groups/${group.id}`}
                      leading={<SmallIcon icon={UsersRound} tone="sky" />}
                      title={group.name}
                      subtitle={group.code}
                      trailing={<GroupStatusBadge status={group.status} />}
                    />
                  ))}
                </RelatedList>
              </CabinetCard>
            </div>
          </>
        );
      }}
    </DetailsLoader>
  );
}

export function CollegeModuleDetailsPage() {
  return (
    <DetailsLoader fetch={getCollegeModule} backTo={`${COLLEGE_CABINET_BASE}/modules`} backLabel="მოდულები">
      {(module) => {
        const professions = module.professions ?? [];
        const teachers = module.teachers ?? [];

        return (
          <>
            <Hero
              media={<IconTile icon={BookOpen} tone="indigo" />}
              title={module.name}
              badges={<CodeBadge code={module.code} />}
            />

            <CabinetCard title="ძირითადი ინფორმაცია" icon={BookOpen}>
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoItem label="კრედიტი" value={module.credits} icon={Star} />
                <InfoItem label="საათი" value={module.duration} icon={Clock} />
                {module.description && (
                  <InfoItem
                    label="აღწერა"
                    wide
                    value={<span className="font-normal whitespace-pre-line">{module.description}</span>}
                  />
                )}
              </div>
            </CabinetCard>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <CabinetCard title="პედაგოგები" description={`${teachers.length} პედაგოგი`} icon={Presentation}>
                <RelatedList empty="მოდულს კოლეჯში პედაგოგი არ ჰყავს.">
                  {teachers.map((teacher) => (
                    <RowLink
                      key={teacher.id}
                      to={`${COLLEGE_CABINET_BASE}/teachers/${teacher.id}`}
                      leading={<TeacherAvatar teacher={teacher} size="sm" />}
                      title={`${teacher.first_name} ${teacher.last_name}`}
                      subtitle={teacher.specialization}
                    />
                  ))}
                </RelatedList>
              </CabinetCard>

              <CabinetCard title="პროფესიები" description={`${professions.length} პროფესია`} icon={Briefcase}>
                <RelatedList empty="მოდული კოლეჯის პროფესიებში არ შედის.">
                  {professions.map((profession) => (
                    <RowLink
                      key={profession.id}
                      to={`${COLLEGE_CABINET_BASE}/professions/${profession.id}`}
                      leading={<SmallIcon icon={Briefcase} tone="emerald" />}
                      title={profession.name}
                      subtitle={profession.code}
                    />
                  ))}
                </RelatedList>
              </CabinetCard>
            </div>
          </>
        );
      }}
    </DetailsLoader>
  );
}
