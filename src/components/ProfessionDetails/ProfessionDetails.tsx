import { Badge } from "../Badge/Badge";
import { DetailsHeader } from "../DetailsHeader/DetailsHeader";
import { InfoItem } from "../InfoItem/InfoItem";
import { RelationSection } from "../RelationSection/RelationSection";
import type { ProfessionDetailsProps } from "../../types/profession.types";

export function ProfessionDetails({ profession, backHref }: ProfessionDetailsProps) {
  return (
    <div className="space-y-8">
      <DetailsHeader
        title={profession.name}
        subtitle="პროფესიის სრული ინფორმაცია"
        backHref={backHref}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InfoItem label="კოდი" value={profession.code} />
        <InfoItem label="ხანგრძლივობა" value={profession.duration} />
        <InfoItem label="კვალიფიკაცია" value={profession.qualification} wide />
        {profession.description && (
          <InfoItem label="აღწერა" value={profession.description} wide />
        )}
      </div>

      <RelationSection
        title="მოდულები"
        count={profession.modules?.length ?? 0}
        emptyText="მოდულები არ არის მითითებული."
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {profession.modules?.map((module) => (
            <div key={module.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="font-medium text-slate-800">{module.name}</p>
              {module.code && <p className="mt-0.5 text-sm text-slate-500">{module.code}</p>}
            </div>
          ))}
        </div>
      </RelationSection>

      <RelationSection
        title="ჯგუფები"
        count={profession.groups?.length ?? 0}
        emptyText="ჯგუფები არ არის მითითებული."
      >
        <div className="flex flex-wrap gap-2">
          {profession.groups?.map((group) => <Badge key={group.id}>{group.name}</Badge>)}
        </div>
      </RelationSection>
    </div>
  );
}
