import { Building2, Cake, GraduationCap, Mail, Phone, UserRound, UsersRound } from "lucide-react";
import { Link } from "react-router";
import { InfoItem } from "../../components/InfoItem/InfoItem";
import { StudentProfileCard } from "../../components/StudentCabinet/StudentProfileCard";
import { CabinetCard } from "../../components/TeacherCabinet/CabinetCard";
import { CabinetPageHeader } from "../../components/TeacherCabinet/CabinetPageHeader";
import { EDUCATION_STATUS_LABELS, STUDENT_CABINET_BASE } from "../../constants/studentCabinet";
import { useStudentCabinet } from "../../hooks/useStudentCabinet";
import { formatDate } from "../../utils/formatDate";

const LIST_LINK =
  "flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition-colors hover:border-brand-300 hover:bg-brand-50/50 dark:border-slate-800 dark:hover:border-brand-500/40 dark:hover:bg-brand-500/5";

export function StudentProfilePage() {
  const { data } = useStudentCabinet();
  const { profile, current_studies, education_history } = data;
  const { colleges, groups } = current_studies;
  const activeEducation = education_history.find((item) => item.status === "active");

  return (
    <div>
      <CabinetPageHeader title="პროფილი" description="თქვენი პირადი და საკონტაქტო ინფორმაცია." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-2">
          <StudentProfileCard data={data} />

          <CabinetCard title="ძირითადი ინფორმაცია" icon={UserRound}>
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoItem label="სახელი" value={profile.first_name} />
              <InfoItem label="გვარი" value={profile.last_name} />
              <InfoItem label="ელ-ფოსტა" value={profile.email} icon={Mail} />
              <InfoItem label="ტელეფონი" value={profile.phone} icon={Phone} />
              <InfoItem label="დაბადების თარიღი" value={formatDate(profile.birth_date)} icon={Cake} wide />
            </div>
          </CabinetCard>

          <CabinetCard title="მიმდინარე სწავლება" icon={GraduationCap}>
            {activeEducation ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoItem
                  label="სასწავლებელი"
                  value={activeEducation.college_name ?? activeEducation.institution_name}
                  wide
                />
                <InfoItem label="პროფესია" value={activeEducation.profession_name} />
                <InfoItem label="პროგრამა" value={activeEducation.program_name} />
                <InfoItem label="ჯგუფი" value={activeEducation.group_name} />
                <InfoItem label="სტატუსი" value={EDUCATION_STATUS_LABELS[activeEducation.status]} />
                <InfoItem label="დაწყება" value={formatDate(activeEducation.started_at ?? undefined)} />
                <InfoItem label="დასრულება" value={formatDate(activeEducation.completed_at ?? undefined)} />
              </div>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                მიმდინარე სწავლება არ არის მითითებული — დაამატეთ{" "}
                <Link to={`${STUDENT_CABINET_BASE}/education`} className="font-medium text-brand-600 hover:underline dark:text-brand-400">
                  განათლების ისტორიაში
                </Link>
                .
              </p>
            )}
          </CabinetCard>
        </div>

        <div className="flex min-w-0 flex-col gap-6">
          <CabinetCard title="კოლეჯები" description={`${colleges.length} დაწესებულება`} icon={Building2}>
            {colleges.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {colleges.map((college) => (
                  <li key={college.id}>
                    <Link to={`/colleges/${college.id}`} className={LIST_LINK}>
                      {college.logo ? (
                        <img
                          src={college.logo}
                          alt=""
                          className="size-10 shrink-0 rounded-lg bg-white object-contain p-1 ring-1 ring-slate-200 dark:ring-slate-700"
                        />
                      ) : (
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                          <Building2 className="size-5" aria-hidden="true" />
                        </span>
                      )}
                      <span className="min-w-0 truncate text-sm font-medium text-slate-800 dark:text-slate-100">
                        {college.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">კოლეჯი არ არის მიბმული.</p>
            )}
          </CabinetCard>

          <CabinetCard title="ჯგუფები" description={`${groups.length} ჯგუფი`} icon={UsersRound}>
            {groups.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {groups.map((group) => (
                  <li key={group.id}>
                    <Link to={`/groups/${group.id}`} className={LIST_LINK}>
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300">
                        <UsersRound className="size-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-slate-800 dark:text-slate-100">
                          {group.name}
                        </span>
                        {group.code && (
                          <span className="block truncate text-xs text-slate-500 dark:text-slate-400">{group.code}</span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">ჯგუფი არ არის მიბმული.</p>
            )}
          </CabinetCard>
        </div>
      </div>
    </div>
  );
}
