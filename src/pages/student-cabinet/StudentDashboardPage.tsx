import { ArrowRight, Award, BookOpen, Building2, GraduationCap, UsersRound } from "lucide-react";
import { Link } from "react-router";
import { EducationHistoryTimeline } from "../../components/StudentCabinet/EducationHistoryTimeline";
import { StudentProfileCard } from "../../components/StudentCabinet/StudentProfileCard";
import { CabinetCard } from "../../components/TeacherCabinet/CabinetCard";
import { CabinetStatCard } from "../../components/TeacherCabinet/CabinetStatCard";
import { ProfileCompletionCard } from "../../components/TeacherCabinet/ProfileCompletionCard";
import { STUDENT_CABINET_BASE } from "../../constants/studentCabinet";
import { useStudentCabinet } from "../../hooks/useStudentCabinet";
import { getStudentProfileCompletionItems } from "../../utils/studentCabinet";
import { formatMonthYear, isExpired } from "../../utils/teacherCabinet";

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

export function StudentDashboardPage() {
  const { data } = useStudentCabinet();
  const { profile, current_studies, education_history, certificates } = data;
  const { colleges, groups, modules } = current_studies;
  const totalCredits = modules.reduce((sum, module) => sum + (module.credits ?? 0), 0);
  const validCertificates = certificates.filter((item) => !isExpired(item.expires_at)).length;
  const recentCertificates = [...certificates]
    .sort((a, b) => (b.issued_at ?? "").localeCompare(a.issued_at ?? ""))
    .slice(0, 3);
  const recentEducation = [...education_history]
    .sort((a, b) => (b.started_at ?? "").localeCompare(a.started_at ?? ""))
    .slice(0, 2);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">კეთილი იყოს დაბრუნება 👋</p>
        <h2 className="mt-1 text-xl font-bold sm:text-2xl">გამარჯობა, {profile.first_name}!</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <CabinetStatCard
          label="კოლეჯები"
          value={colleges.length}
          hint={colleges[0]?.name}
          href={`${STUDENT_CABINET_BASE}/colleges`}
          icon={Building2}
          accent="indigo"
        />
        <CabinetStatCard
          label="ჯგუფები"
          value={groups.length}
          hint={groups[0]?.name}
          href={`${STUDENT_CABINET_BASE}/groups`}
          icon={UsersRound}
          accent="rose"
        />
        <CabinetStatCard
          label="მოდულები"
          value={modules.length}
          hint={`ჯამში ${totalCredits} კრედიტი`}
          href={`${STUDENT_CABINET_BASE}/modules`}
          icon={BookOpen}
          accent="emerald"
        />
        <CabinetStatCard
          label="სერტიფიკატები"
          value={certificates.length}
          hint={`${validCertificates} მოქმედი`}
          href={`${STUDENT_CABINET_BASE}/certificates`}
          icon={Award}
          accent="amber"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <StudentProfileCard data={data} />
        </div>
        <ProfileCompletionCard items={getStudentProfileCompletionItems(data)} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CabinetCard
          title="მოდულები"
          description={`${modules.length} მოდული`}
          icon={BookOpen}
          action={<ViewAllLink to={`${STUDENT_CABINET_BASE}/modules`} />}
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
                      {module.code ?? "—"}
                      {module.duration && ` · ${module.duration} სთ`}
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
          title="ბოლო სერტიფიკატები"
          description="უახლესი სერტიფიკატები და კურსები"
          icon={Award}
          action={<ViewAllLink to={`${STUDENT_CABINET_BASE}/certificates`} />}
        >
          {recentCertificates.length > 0 ? (
            <ul className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
              {recentCertificates.map((certificate) => (
                <li key={certificate.id} className="py-3 first:pt-0 last:pb-0">
                  <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">{certificate.title}</p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {certificate.issuer_name ?? certificate.college_name ?? "—"}
                    {certificate.issued_at && ` · ${formatMonthYear(certificate.issued_at)}`}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">სერტიფიკატები ჯერ არ არის დამატებული.</p>
          )}
        </CabinetCard>
      </div>

      <CabinetCard
        title="განათლების ისტორია"
        description={`${education_history.length} ჩანაწერი`}
        icon={GraduationCap}
        action={<ViewAllLink to={`${STUDENT_CABINET_BASE}/education`} />}
      >
        {recentEducation.length > 0 ? (
          <EducationHistoryTimeline items={recentEducation} />
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400">განათლების ისტორია ჯერ არ არის დამატებული.</p>
        )}
      </CabinetCard>
    </div>
  );
}
