import { DetailsHeader } from "../DetailsHeader/DetailsHeader";
import { GroupCard } from "../GroupCard/GroupCard";
import { InfoItem } from "../InfoItem/InfoItem";
import { ProfessionCard } from "../ProfessionCard/ProfessionCard";
import { RelatedDataToggles } from "../RelatedDataToggles/RelatedDataToggles";
import { RelationSection } from "../RelationSection/RelationSection";
import type { CollegeDetailsProps, CollegeInclude } from "../../types/college.types";

const INCLUDE_OPTIONS: { key: CollegeInclude; label: string }[] = [
  { key: "teachers", label: "მასწავლებლები" },
  { key: "groups", label: "ჯგუფები" },
  { key: "professions", label: "პროფესიები" },
];

export function CollegeDetails({ college, backHref, selectedIncludes, onToggleInclude }: CollegeDetailsProps) {
  return (
    <div className="space-y-8">
      <DetailsHeader title={college.name} subtitle="კოლეჯის სრული ინფორმაცია" backHref={backHref} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InfoItem label="მისამართი" value={college.address} />
        <InfoItem
          label="ელ-ფოსტა"
          value={
            <a href={`mailto:${college.email}`} className="text-brand-600 hover:underline dark:text-brand-400">
              {college.email}
            </a>
          }
        />
        <InfoItem
          label="ტელეფონი"
          value={
            <a href={`tel:${college.phone}`} className="text-brand-600 hover:underline dark:text-brand-400">
              {college.phone}
            </a>
          }
        />
        <InfoItem
          label="ვებ-საიტი"
          value={
            <a
              href={college.website}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-brand-600 hover:underline dark:text-brand-400"
            >
              {college.website}
            </a>
          }
        />
      </div>

      <RelatedDataToggles options={INCLUDE_OPTIONS} selected={selectedIncludes} onToggle={onToggleInclude} />

      {selectedIncludes.includes("teachers") && (
        <RelationSection
          title="მასწავლებლები"
          count={college.teachers?.length ?? 0}
          emptyText="მასწავლებლები ჯერ არ არიან დამატებული."
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {college.teachers?.map((teacher) => (
              <div
                key={teacher.id}
                className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
              >
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  {teacher.first_name} {teacher.last_name}
                </p>
                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{teacher.email}</p>
              </div>
            ))}
          </div>
        </RelationSection>
      )}

      {selectedIncludes.includes("groups") && (
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
      )}

      {selectedIncludes.includes("professions") && (
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
      )}
    </div>
  );
}
