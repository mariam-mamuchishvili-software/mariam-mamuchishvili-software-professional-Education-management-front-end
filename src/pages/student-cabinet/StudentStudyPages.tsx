import { BookOpen, Building2, CompassIcon, UsersRound } from "lucide-react";
import { Link } from "react-router";
import { StudentCollegeCard, StudentGroupCard, StudentModuleCard } from "../../components/StudentCabinet/StudentStudyCards";
import { CabinetPageHeader } from "../../components/TeacherCabinet/CabinetPageHeader";
import { STUDENT_CABINET_BASE } from "../../constants/studentCabinet";
import { useStudentCabinet } from "../../hooks/useStudentCabinet";
import { EmptyState } from "../../partials/EmptyState";

const GRID = "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3";

export function StudentCollegesPage() {
  const { colleges } = useStudentCabinet().data.current_studies;

  return (
    <div>
      <CabinetPageHeader title="კოლეჯები" description="კოლეჯები, სადაც ჩარიცხული ხართ." />

      {colleges.length > 0 ? (
        <div className={GRID}>
          {colleges.map((college) => (
            <StudentCollegeCard key={college.id} college={college} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="კოლეჯი არ არის მიბმული"
          description="კოლეჯი გამოჩნდება, როცა ადმინისტრაცია ჩაგრიცხავთ."
          icon={<Building2 className="size-6" aria-hidden="true" />}
        />
      )}
    </div>
  );
}

export function StudentGroupsPage() {
  const { current_studies, education_history } = useStudentCabinet().data;
  const { groups } = current_studies;
  // The group resource carries only profession_id; the name comes from the education records.
  const professionByGroup = new Map(
    education_history
      .filter((item) => item.group_id && item.profession_name)
      .map((item) => [item.group_id, item.profession_name ?? undefined]),
  );

  return (
    <div>
      <CabinetPageHeader title="ჯგუფები" description="ჯგუფები, რომლებშიც სწავლობთ." />

      {groups.length > 0 ? (
        <div className={GRID}>
          {groups.map((group) => (
            <StudentGroupCard key={group.id} group={group} professionName={professionByGroup.get(group.id)} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="ჯგუფი არ არის მიბმული"
          description="ჯგუფი გამოჩნდება, როცა ადმინისტრაცია ჯგუფში ჩაგრიცხავთ."
          icon={<UsersRound className="size-6" aria-hidden="true" />}
        />
      )}
    </div>
  );
}

export function StudentModulesPage() {
  const { modules } = useStudentCabinet().data.current_studies;
  const totalCredits = modules.reduce((sum, module) => sum + (module.credits ?? 0), 0);

  return (
    <div>
      <CabinetPageHeader title="მოდულები" description={`${modules.length} მოდული · ჯამში ${totalCredits} კრედიტი`} />

      {modules.length > 0 ? (
        <div className={GRID}>
          {modules.map((module) => (
            <StudentModuleCard key={module.id} module={module} />
          ))}
        </div>
      ) : (
        <EmptyState title="მოდულები არ არის მიბმული" icon={<BookOpen className="size-6" aria-hidden="true" />} />
      )}
    </div>
  );
}

export function StudentCabinetNotFoundPage() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center py-16 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
        <CompassIcon className="size-8" aria-hidden="true" />
      </span>
      <p className="mt-6 text-sm font-semibold text-brand-600 dark:text-brand-400">404</p>
      <h2 className="mt-2 text-2xl font-bold">გვერდი ვერ მოიძებნა</h2>
      <p className="mt-3 text-slate-500 dark:text-slate-400">კაბინეტში ასეთი განყოფილება არ არსებობს.</p>
      <Link
        to={STUDENT_CABINET_BASE}
        className="mt-8 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        დაფაზე დაბრუნება
      </Link>
    </div>
  );
}
