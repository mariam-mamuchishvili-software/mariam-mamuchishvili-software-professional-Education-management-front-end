import { Badge } from "../Badge/Badge";
import { DetailsHeader } from "../DetailsHeader/DetailsHeader";
import { InfoItem } from "../InfoItem/InfoItem";
import { RelationSection } from "../RelationSection/RelationSection";
import type { TeacherDetailsProps } from "../../types/teacher.types";

export function TeacherDetails({ teacher, backHref }: TeacherDetailsProps) {
  return (
    <div className="space-y-8">
      <DetailsHeader
        title={`${teacher.first_name} ${teacher.last_name}`}
        subtitle="მასწავლებლის სრული ინფორმაცია"
        backHref={backHref}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InfoItem
          label="ელ-ფოსტა"
          value={
            <a href={`mailto:${teacher.email}`} className="text-brand-600 hover:underline dark:text-brand-400">
              {teacher.email}
            </a>
          }
        />
        <InfoItem
          label="ტელეფონი"
          value={
            <a href={`tel:${teacher.phone}`} className="text-brand-600 hover:underline dark:text-brand-400">
              {teacher.phone}
            </a>
          }
        />
        <InfoItem label="სპეციალობა" value={teacher.specialization} />
      </div>

      <RelationSection
        title="კოლეჯები"
        count={teacher.colleges?.length ?? 0}
        emptyText="კოლეჯები არ არის მითითებული."
      >
        <div className="flex flex-wrap gap-2">
          {teacher.colleges?.map((college) => <Badge key={college.id}>{college.name}</Badge>)}
        </div>
      </RelationSection>

      <RelationSection
        title="მოდულები"
        count={teacher.modules?.length ?? 0}
        emptyText="მოდულები არ არის მითითებული."
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {teacher.modules?.map((module) => (
            <div
              key={module.id}
              className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
            >
              <p className="font-medium text-slate-800 dark:text-slate-200">{module.name}</p>
              {module.code && (
                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{module.code}</p>
              )}
            </div>
          ))}
        </div>
      </RelationSection>
    </div>
  );
}
