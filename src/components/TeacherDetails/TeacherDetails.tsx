import { BookOpen, Briefcase, Building2, Calendar, Mail, Phone } from "lucide-react";
import { Link } from "react-router";
import { DetailsHeader } from "../DetailsHeader/DetailsHeader";
import { InfoItem } from "../InfoItem/InfoItem";
import { RelatedDataToggles } from "../RelatedDataToggles/RelatedDataToggles";
import { RelationSection } from "../RelationSection/RelationSection";
import { SocialLinks } from "../SocialLinks/SocialLinks";
import { TeacherPhoto } from "../TeacherPhoto/TeacherPhoto";
import { formatDate } from "../../utils/formatDate";
import type { TeacherDetailsProps, TeacherInclude } from "../../types/teacher.types";

const INCLUDE_OPTIONS: { key: TeacherInclude; label: string }[] = [
  { key: "colleges", label: "კოლეჯები" },
  { key: "modules", label: "მოდულები" },
];

const PANEL_CLASSES =
  "rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900 sm:p-8";

const RELATION_ITEM_CLASSES =
  "flex h-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-brand-200 hover:bg-brand-50/50 dark:border-slate-800 dark:bg-slate-950/40 dark:hover:border-brand-800 dark:hover:bg-brand-500/10";

const RELATION_ICON_CLASSES =
  "flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400";

export function TeacherDetails({ teacher, backHref, selectedIncludes, onToggleInclude }: TeacherDetailsProps) {
  const fullName = `${teacher.first_name} ${teacher.last_name}`;
  const biography = teacher.detail?.biography;
  const additionalInformation = teacher.detail?.additional_information;

  return (
    <div className="space-y-6">
      <DetailsHeader title={fullName} subtitle="მასწავლებლის სრული ინფორმაცია" backHref={backHref} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:items-start">
        {/* Portrait — ~40% on desktop, like the college poster */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <TeacherPhoto teacher={teacher} />
          <SocialLinks links={teacher.detail?.social_links} />
        </div>

        {/* Info panels — ~60% on desktop */}
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-3">
          <div className={PANEL_CLASSES}>
            <p className="text-xs font-semibold tracking-wide text-brand-600 uppercase dark:text-brand-400">
              ძირითადი ინფორმაცია
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{fullName}</h2>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoItem
                icon={Mail}
                label="ელ-ფოსტა"
                wide
                value={
                  teacher.email && (
                    <a href={`mailto:${teacher.email}`} className="break-all text-brand-600 hover:underline dark:text-brand-400">
                      {teacher.email}
                    </a>
                  )
                }
              />
              <InfoItem
                icon={Phone}
                label="ტელეფონი"
                value={
                  teacher.phone && (
                    <a href={`tel:${teacher.phone}`} className="text-brand-600 hover:underline dark:text-brand-400">
                      {teacher.phone}
                    </a>
                  )
                }
              />
              <InfoItem icon={Briefcase} label="სპეციალობა" value={teacher.specialization} />
            </div>
          </div>

          <div className={PANEL_CLASSES}>
            <p className="text-xs font-semibold tracking-wide text-brand-600 uppercase dark:text-brand-400">
              დამატებითი ინფორმაცია
            </p>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoItem icon={Calendar} label="რეგისტრაციის თარიღი" value={formatDate(teacher.created_at)} />
              <InfoItem icon={Calendar} label="ბოლო განახლება" value={formatDate(teacher.updated_at)} />
            </div>

            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">ბიოგრაფია</p>
              {biography ? (
                <p className="leading-relaxed whitespace-pre-line text-slate-600 dark:text-slate-300">{biography}</p>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">ბიოგრაფია ჯერ არ არის დამატებული.</p>
              )}
            </div>

            {additionalInformation && (
              <div className="mt-6">
                <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">დამატებით</p>
                <p className="leading-relaxed whitespace-pre-line text-slate-600 dark:text-slate-300">
                  {additionalInformation}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full-width related information */}
      <div className={PANEL_CLASSES}>
        <p className="text-xs font-semibold tracking-wide text-brand-600 uppercase dark:text-brand-400">
          დაკავშირებული ინფორმაცია
        </p>

        <div className="mt-5">
          <RelatedDataToggles options={INCLUDE_OPTIONS} selected={selectedIncludes} onToggle={onToggleInclude} />
        </div>

        {selectedIncludes.includes("colleges") && (
          <div className="mt-6">
            <RelationSection
              title="კოლეჯები"
              count={teacher.colleges?.length ?? 0}
              emptyText="კოლეჯები არ არის მითითებული."
            >
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {teacher.colleges?.map((college) => (
                  <li key={college.id}>
                    <Link to={`/colleges/${college.id}`} title={college.name} className={RELATION_ITEM_CLASSES}>
                      <span className={RELATION_ICON_CLASSES} aria-hidden="true">
                        <Building2 className="size-5" />
                      </span>
                      <span className="min-w-0 truncate font-medium text-slate-800 dark:text-slate-200">
                        {college.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </RelationSection>
          </div>
        )}

        {selectedIncludes.includes("modules") && (
          <div className="mt-6">
            <RelationSection
              title="მოდულები"
              count={teacher.modules?.length ?? 0}
              emptyText="მოდულები არ არის მითითებული."
            >
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {teacher.modules?.map((module) => (
                  <li key={module.id}>
                    <Link to={`/modules/${module.id}`} title={module.name} className={RELATION_ITEM_CLASSES}>
                      <span className={RELATION_ICON_CLASSES} aria-hidden="true">
                        <BookOpen className="size-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-medium text-slate-800 dark:text-slate-200">
                          {module.name}
                        </span>
                        {module.code && (
                          <span className="mt-0.5 block truncate font-mono text-xs text-slate-500 dark:text-slate-400">
                            {module.code}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </RelationSection>
          </div>
        )}
      </div>
    </div>
  );
}
