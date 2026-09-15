import { DetailsHeader } from "../DetailsHeader/DetailsHeader";
import { InfoItem } from "../InfoItem/InfoItem";
import { RelationSection } from "../RelationSection/RelationSection";
import type { GroupDetailsProps } from "../../types/group.types";

export function GroupDetails({ group, backHref }: GroupDetailsProps) {
  return (
    <div className="space-y-8">
      <DetailsHeader title={group.name} subtitle="ჯგუფის სრული ინფორმაცია" backHref={backHref} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InfoItem label="კოდი" value={group.code} />
        <InfoItem label="ცვლა" value={group.study_shift} />
        <InfoItem label="ტევადობა" value={group.capacity} />
        <InfoItem label="პროფესია" value={group.profession?.name} />
      </div>

      <RelationSection
        title="სტუდენტები"
        count={group.students?.length ?? 0}
        emptyText="სტუდენტები არ არის მითითებული."
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {group.students?.map((student) => (
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
    </div>
  );
}
