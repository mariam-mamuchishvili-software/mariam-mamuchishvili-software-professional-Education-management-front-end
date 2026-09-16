import { Badge } from "../Badge/Badge";
import { DetailsHeader } from "../DetailsHeader/DetailsHeader";
import { InfoItem } from "../InfoItem/InfoItem";
import { RelatedDataToggles } from "../RelatedDataToggles/RelatedDataToggles";
import { RelationSection } from "../RelationSection/RelationSection";
import type { StudentDetailsProps, StudentInclude } from "../../types/student.types";
import { formatDate } from "../../utils/formatDate";

const INCLUDE_OPTIONS: { key: StudentInclude; label: string }[] = [
  { key: "groups", label: "ჯგუფები" },
  { key: "modules", label: "მოდულები" },
];

export function StudentDetails({ student, backHref, selectedIncludes, onToggleInclude }: StudentDetailsProps) {
  return (
    <div className="space-y-8">
      <DetailsHeader
        title={`${student.first_name} ${student.last_name}`}
        subtitle="სტუდენტის სრული ინფორმაცია"
        backHref={backHref}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InfoItem
          label="ელ-ფოსტა"
          value={
            <a href={`mailto:${student.email}`} className="text-brand-600 hover:underline dark:text-brand-400">
              {student.email}
            </a>
          }
        />
        <InfoItem
          label="ტელეფონი"
          value={
            <a href={`tel:${student.phone}`} className="text-brand-600 hover:underline dark:text-brand-400">
              {student.phone}
            </a>
          }
        />
        <InfoItem label="დაბადების თარიღი" value={formatDate(student.birth_date)} />
      </div>

      <RelatedDataToggles options={INCLUDE_OPTIONS} selected={selectedIncludes} onToggle={onToggleInclude} />

      {selectedIncludes.includes("groups") && (
        <RelationSection
          title="ჯგუფები"
          count={student.groups?.length ?? 0}
          emptyText="ჯგუფები არ არის მითითებული."
        >
          <div className="flex flex-wrap gap-2">
            {student.groups?.map((group) => <Badge key={group.id}>{group.name}</Badge>)}
          </div>
        </RelationSection>
      )}

      {selectedIncludes.includes("modules") && (
        <RelationSection
          title="მოდულები"
          count={student.modules?.length ?? 0}
          emptyText="მოდულები არ არის მითითებული."
        >
          <div className="flex flex-wrap gap-2">
            {student.modules?.map((module) => <Badge key={module.id}>{module.name}</Badge>)}
          </div>
        </RelationSection>
      )}
    </div>
  );
}
