import { ArrowRight, Award, BookOpen, Briefcase, GraduationCap, UsersRound } from "lucide-react";
import { Link } from "react-router";
import { CabinetCard } from "../../components/TeacherCabinet/CabinetCard";
import { CabinetStatCard } from "../../components/TeacherCabinet/CabinetStatCard";
import { ProfileCompletionCard } from "../../components/TeacherCabinet/ProfileCompletionCard";
import { TeacherProfileCard } from "../../components/TeacherCabinet/TeacherProfileCard";
import { TEACHER_CABINET_BASE } from "../../constants/teacherCabinet";
import { useTeacherCabinet } from "../../hooks/useTeacherCabinet";
import { formatMonthYear, getProfileCompletionItems } from "../../utils/teacherCabinet";

function ViewAllLink({ to }: { to: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-all hover:gap-2 dark:text-brand-400"
    >
      ყველა
      <ArrowRight className="size-4" aria-hidden="true" />
    </Link>
  );
}

export function CabinetDashboardPage() {
  const { data } = useTeacherCabinet();
  const { teacher, workExperiences, educations, trainings, groups, modules, students } = data;
  const currentJob = workExperiences.find((item) => item.is_current);
  const recentTrainings = [...trainings]
    .sort((a, b) => (b.issue_date ?? "").localeCompare(a.issue_date ?? ""))
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">კეთილი იყოს დაბრუნება 👋</p>
        <h2 className="mt-1 text-xl font-bold sm:text-2xl">გამარჯობა, {teacher.first_name}!</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <CabinetStatCard
          label="სამუშაო გამოცდილება"
          value={workExperiences.length}
          hint={currentJob ? currentJob.organization : undefined}
          href={`${TEACHER_CABINET_BASE}/work-experience`}
          icon={Briefcase}
          accent="indigo"
        />
        <CabinetStatCard
          label="განათლება"
          value={educations.length}
          hint={educations[0]?.degree}
          href={`${TEACHER_CABINET_BASE}/education`}
          icon={GraduationCap}
          accent="emerald"
        />
        <CabinetStatCard
          label="ტრენინგები"
          value={trainings.length}
          hint={`${trainings.filter((item) => item.certificate_url).length} სერტიფიკატი`}
          href={`${TEACHER_CABINET_BASE}/training`}
          icon={Award}
          accent="amber"
        />
        <CabinetStatCard
          label="ჯგუფები"
          value={groups.length}
          hint={`${students.length} სტუდენტი`}
          href={`${TEACHER_CABINET_BASE}/groups`}
          icon={UsersRound}
          accent="rose"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <TeacherProfileCard teacher={teacher} position={currentJob?.position} />
        </div>
        <ProfileCompletionCard items={getProfileCompletionItems(data)} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CabinetCard
          title="მოდულები"
          description={`${modules.length} მოდული`}
          icon={BookOpen}
          action={<ViewAllLink to={`${TEACHER_CABINET_BASE}/modules`} />}
        >
          {modules.length > 0 ? (
            <ul className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
              {modules.slice(0, 4).map((module) => (
                <li key={module.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-800 first-letter:uppercase dark:text-slate-100">
                      {module.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {module.code ?? "—"} · {module.students?.length ?? 0} სტუდენტი
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {module.credits ?? "—"} კრ.
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">მოდულები ჯერ არ არის მიბმული.</p>
          )}
        </CabinetCard>

        <CabinetCard
          title="ბოლო ტრენინგები"
          description="უახლესი სერტიფიკატები"
          icon={Award}
          action={<ViewAllLink to={`${TEACHER_CABINET_BASE}/training`} />}
        >
          {recentTrainings.length > 0 ? (
            <ul className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
              {recentTrainings.map((training) => (
                <li key={training.id} className="py-3 first:pt-0 last:pb-0">
                  <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">{training.title}</p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {training.organizer ?? "—"}
                    {training.issue_date && ` · ${formatMonthYear(training.issue_date)}`}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">ტრენინგები ჯერ არ არის დამატებული.</p>
          )}
        </CabinetCard>
      </div>
    </div>
  );
}
