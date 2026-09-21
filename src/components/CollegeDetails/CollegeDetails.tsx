import { Calendar, Globe, Mail, MapPin, Phone } from "lucide-react";
import { CollegeLocationMap } from "../CollegeLocationMap/CollegeLocationMap";
import { CollegePoster } from "../CollegePoster/CollegePoster";
import { DetailsHeader } from "../DetailsHeader/DetailsHeader";
import { GroupCard } from "../GroupCard/GroupCard";
import { InfoItem } from "../InfoItem/InfoItem";
import { ProfessionCard } from "../ProfessionCard/ProfessionCard";
import { RelatedDataToggles } from "../RelatedDataToggles/RelatedDataToggles";
import { RelationSection } from "../RelationSection/RelationSection";
import { SocialLinks } from "../SocialLinks/SocialLinks";
import { formatDate } from "../../utils/formatDate";
import type { CollegeDetailsProps, CollegeInclude } from "../../types/college.types";

const INCLUDE_OPTIONS: { key: CollegeInclude; label: string }[] = [
  { key: "teachers", label: "მასწავლებლები" },
  { key: "groups", label: "ჯგუფები" },
  { key: "professions", label: "პროფესიები" },
];

const PANEL_CLASSES =
  "rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900 sm:p-8";

export function CollegeDetails({ college, backHref, selectedIncludes, onToggleInclude }: CollegeDetailsProps) {
  return (
    <div className="space-y-6">
      <DetailsHeader title={college.name} subtitle="კოლეჯის სრული ინფორმაცია" backHref={backHref} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:items-start">
        {/* Poster — ~40% on desktop */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <CollegePoster posterUrl={college.poster} name={college.name} />
          <SocialLinks links={college.detail?.social_links} />
        </div>

        {/* Info panels — ~60% on desktop */}
        <div className="flex flex-col gap-6 lg:col-span-3">
          <div className={PANEL_CLASSES}>
            <p className="text-xs font-semibold tracking-wide text-brand-600 uppercase dark:text-brand-400">
              ძირითადი ინფორმაცია
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{college.name}</h2>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoItem icon={MapPin} label="მისამართი" value={college.address} wide />
              <InfoItem
                icon={Mail}
                label="ელ-ფოსტა"
                value={
                  <a href={`mailto:${college.email}`} className="text-brand-600 hover:underline dark:text-brand-400">
                    {college.email}
                  </a>
                }
              />
              <InfoItem
                icon={Phone}
                label="ტელეფონი"
                value={
                  <a href={`tel:${college.phone}`} className="text-brand-600 hover:underline dark:text-brand-400">
                    {college.phone}
                  </a>
                }
              />
              <InfoItem
                icon={Globe}
                label="ვებ-საიტი"
                wide
                value={
                  college.website && (
                    <a
                      href={college.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all text-brand-600 hover:underline dark:text-brand-400"
                    >
                      {college.website}
                    </a>
                  )
                }
              />
            </div>
          </div>

          <div className={PANEL_CLASSES}>
            <p className="text-xs font-semibold tracking-wide text-brand-600 uppercase dark:text-brand-400">
              დამატებითი ინფორმაცია
            </p>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoItem icon={Calendar} label="რეგისტრაციის თარიღი" value={formatDate(college.created_at)} />
              <InfoItem icon={Calendar} label="ბოლო განახლება" value={formatDate(college.updated_at)} />
            </div>

            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">მდებარეობა</p>
              <CollegeLocationMap
                name={college.name}
                address={college.address}
                latitude={college.latitude}
                longitude={college.longitude}
              />
            </div>
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

        {selectedIncludes.includes("teachers") && (
          <div className="mt-6">
            <RelationSection
              title="მასწავლებლები"
              count={college.teachers?.length ?? 0}
              emptyText="მასწავლებლები ჯერ არ არიან დამატებული."
            >
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {college.teachers?.map((teacher) => (
                  <div
                    key={teacher.id}
                    className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950/40"
                  >
                    <p className="font-medium text-slate-800 dark:text-slate-200">
                      {teacher.first_name} {teacher.last_name}
                    </p>
                    <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{teacher.email}</p>
                  </div>
                ))}
              </div>
            </RelationSection>
          </div>
        )}

        {selectedIncludes.includes("groups") && (
          <div className="mt-6">
            <RelationSection
              title="ჯგუფები"
              count={college.groups?.length ?? 0}
              emptyText="ჯგუფები ჯერ არ მოიძებნა."
            >
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {college.groups?.map((group) => (
                  <GroupCard key={group.id} group={group} />
                ))}
              </div>
            </RelationSection>
          </div>
        )}

        {selectedIncludes.includes("professions") && (
          <div className="mt-6">
            <RelationSection
              title="პროფესიები"
              count={college.professions?.length ?? 0}
              emptyText="პროფესიები ჯერ არ მოიძებნა."
            >
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {college.professions?.map((profession) => (
                  <ProfessionCard key={profession.id} profession={profession} />
                ))}
              </div>
            </RelationSection>
          </div>
        )}
      </div>
    </div>
  );
}
