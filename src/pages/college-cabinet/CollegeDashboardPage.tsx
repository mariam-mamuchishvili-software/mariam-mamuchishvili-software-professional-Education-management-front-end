import { ArrowRight, BookOpen, Briefcase, GraduationCap, Megaphone, Presentation, UsersRound } from "lucide-react";
import { Link } from "react-router";
import { AnnouncementCard } from "../../components/CollegeCabinet/CollegeCabinetCards";
import { CollegeProfileCard } from "../../components/CollegeCabinet/CollegeProfileCard";
import { StudentAvatar } from "../../components/StudentCabinet/StudentAvatar";
import { CabinetCard } from "../../components/TeacherCabinet/CabinetCard";
import { CabinetStatCard } from "../../components/TeacherCabinet/CabinetStatCard";
import { ProfileCompletionCard } from "../../components/TeacherCabinet/ProfileCompletionCard";
import { COLLEGE_CABINET_BASE } from "../../constants/collegeCabinet";
import { useCollegeCabinet } from "../../hooks/useCollegeCabinet";
import { getCollegeProfileCompletionItems } from "../../utils/collegeCabinet";
import { formatDate } from "../../utils/formatDate";

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

export function CollegeDashboardPage() {
  const { college, statistics, latest_students, latest_announcements } = useCollegeCabinet().data;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">კეთილი იყოს დაბრუნება 👋</p>
        <h2 className="mt-1 text-xl font-bold sm:text-2xl">{college.name}</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-5">
        <CabinetStatCard
          label="სტუდენტები"
          value={statistics.students}
          href={`${COLLEGE_CABINET_BASE}/students`}
          icon={GraduationCap}
          accent="rose"
        />
        <CabinetStatCard
          label="პედაგოგები"
          value={statistics.teachers}
          href={`${COLLEGE_CABINET_BASE}/teachers`}
          icon={Presentation}
          accent="indigo"
        />
        <CabinetStatCard
          label="ჯგუფები"
          value={statistics.groups}
          href={`${COLLEGE_CABINET_BASE}/groups`}
          icon={UsersRound}
          accent="sky"
        />
        <CabinetStatCard
          label="პროფესიები"
          value={statistics.professions}
          href={`${COLLEGE_CABINET_BASE}/professions`}
          icon={Briefcase}
          accent="emerald"
        />
        <CabinetStatCard
          label="მოდულები"
          value={statistics.modules}
          href={`${COLLEGE_CABINET_BASE}/modules`}
          icon={BookOpen}
          accent="amber"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <CollegeProfileCard college={college} />
        </div>
        <ProfileCompletionCard items={getCollegeProfileCompletionItems(college)} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CabinetCard
          title="ახალი სტუდენტები"
          description="ბოლოს ჩარიცხული სტუდენტები"
          icon={GraduationCap}
          action={<ViewAllLink to={`${COLLEGE_CABINET_BASE}/students`} />}
        >
          {latest_students.length > 0 ? (
            <ul className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
              {latest_students.map((student) => (
                <li key={student.id} className="py-3 first:pt-0 last:pb-0">
                  <Link to={`${COLLEGE_CABINET_BASE}/students/${student.id}`} className="group flex items-center gap-3">
                    <StudentAvatar student={student} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-800 transition-colors group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400">
                        {student.first_name} {student.last_name}
                      </p>
                      <p className="truncate text-xs text-slate-500 dark:text-slate-400">{student.email}</p>
                    </div>
                    <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500">
                      {formatDate(student.created_at)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">სტუდენტები ჯერ არ არის ჩარიცხული.</p>
          )}
        </CabinetCard>

        <CabinetCard
          title="განცხადებები"
          description="უახლესი განცხადებები"
          icon={Megaphone}
          action={<ViewAllLink to={`${COLLEGE_CABINET_BASE}/announcements`} />}
        >
          {latest_announcements.length > 0 ? (
            <ul className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
              {latest_announcements.map((announcement) => (
                <li key={announcement.id} className="py-3 first:pt-0 last:pb-0">
                  <AnnouncementCard announcement={announcement} compact />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">განცხადებები ჯერ არ არის.</p>
          )}
        </CabinetCard>
      </div>
    </div>
  );
}
