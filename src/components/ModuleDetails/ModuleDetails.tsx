import { Badge } from "../Badge/Badge";
import { DetailsHeader } from "../DetailsHeader/DetailsHeader";
import { InfoItem } from "../InfoItem/InfoItem";
import { RelatedDataToggles } from "../RelatedDataToggles/RelatedDataToggles";
import { RelationSection } from "../RelationSection/RelationSection";
import type { ModuleDetailsProps, ModuleInclude } from "../../types/module.types";

const INCLUDE_OPTIONS: { key: ModuleInclude; label: string }[] = [
  { key: "teachers", label: "მასწავლებლები" },
  { key: "professions", label: "პროფესიები" },
  { key: "students", label: "სტუდენტები" },
];

export function ModuleDetails({ module, backHref, selectedIncludes, onToggleInclude }: ModuleDetailsProps) {
  return (
    <div className="space-y-8">
      <DetailsHeader title={module.name} subtitle="მოდულის სრული ინფორმაცია" backHref={backHref} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InfoItem label="კოდი" value={module.code} />
        <InfoItem label="ხანგრძლივობა" value={module.duration} />
        <InfoItem label="კრედიტები" value={module.credits} wide />
        {module.description && <InfoItem label="აღწერა" value={module.description} wide />}
      </div>

      <RelatedDataToggles options={INCLUDE_OPTIONS} selected={selectedIncludes} onToggle={onToggleInclude} />

      {selectedIncludes.includes("teachers") && (
        <RelationSection
          title="მასწავლებლები"
          count={module.teachers?.length ?? 0}
          emptyText="მასწავლებლები ჯერ არ არიან დამატებული."
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {module.teachers?.map((teacher) => (
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

      {selectedIncludes.includes("professions") && (
        <RelationSection
          title="პროფესიები"
          count={module.professions?.length ?? 0}
          emptyText="პროფესიები არ არის მითითებული."
        >
          <div className="flex flex-wrap gap-2">
            {module.professions?.map((profession) => (
              <Badge key={profession.id}>{profession.name}</Badge>
            ))}
          </div>
        </RelationSection>
      )}

      {selectedIncludes.includes("students") && (
        <RelationSection
          title="სტუდენტები"
          count={module.students?.length ?? 0}
          emptyText="სტუდენტები არ არის მითითებული."
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {module.students?.map((student) => (
              <div
                key={student.id}
                className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
              >
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  {student.first_name} {student.last_name}
                </p>
              </div>
            ))}
          </div>
        </RelationSection>
      )}
    </div>
  );
}
