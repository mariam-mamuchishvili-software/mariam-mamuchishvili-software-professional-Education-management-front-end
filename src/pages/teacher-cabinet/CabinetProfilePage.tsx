import { Building2, Info, Mail, Phone, Sparkles, UserRound } from "lucide-react";
import { Link } from "react-router";
import { InfoItem } from "../../components/InfoItem/InfoItem";
import { SocialLinks } from "../../components/SocialLinks/SocialLinks";
import { CabinetCard } from "../../components/TeacherCabinet/CabinetCard";
import { CabinetPageHeader } from "../../components/TeacherCabinet/CabinetPageHeader";
import { TeacherProfileCard } from "../../components/TeacherCabinet/TeacherProfileCard";
import { useTeacherCabinet } from "../../hooks/useTeacherCabinet";

export function CabinetProfilePage() {
  const { data } = useTeacherCabinet();
  const { teacher, workExperiences } = data;
  const colleges = teacher.colleges ?? [];

  return (
    <div>
      <CabinetPageHeader title="პროფილი" description="თქვენი პირადი და საკონტაქტო ინფორმაცია." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-2">
          <TeacherProfileCard teacher={teacher} position={workExperiences.find((item) => item.is_current)?.position} />

          <CabinetCard title="ძირითადი ინფორმაცია" icon={UserRound}>
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoItem label="სახელი" value={teacher.first_name} />
              <InfoItem label="გვარი" value={teacher.last_name} />
              <InfoItem label="ელ-ფოსტა" value={teacher.email} icon={Mail} />
              <InfoItem label="ტელეფონი" value={teacher.phone} icon={Phone} />
              <InfoItem label="სპეციალიზაცია" value={teacher.specialization} icon={Sparkles} wide />
            </div>
          </CabinetCard>

          <CabinetCard title="ბიოგრაფია" icon={Info}>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {teacher.detail?.biography || "ბიოგრაფია ჯერ არ არის დამატებული."}
            </p>
            {teacher.detail?.additional_information && (
              <div className="mt-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase dark:text-slate-500">
                  დამატებითი ინფორმაცია
                </p>
                <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{teacher.detail.additional_information}</p>
              </div>
            )}
          </CabinetCard>
        </div>

        <div className="flex min-w-0 flex-col gap-6">
          <CabinetCard title="კოლეჯები" description={`${colleges.length} დაწესებულება`} icon={Building2}>
            {colleges.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {colleges.map((college) => (
                  <li key={college.id}>
                    <Link
                      to={`/colleges/${college.id}`}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition-colors hover:border-brand-300 hover:bg-brand-50/50 dark:border-slate-800 dark:hover:border-brand-500/40 dark:hover:bg-brand-500/5"
                    >
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

          <SocialLinks links={teacher.detail?.social_links} />
        </div>
      </div>
    </div>
  );
}
