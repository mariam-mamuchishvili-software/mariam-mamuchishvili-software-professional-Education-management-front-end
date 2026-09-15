import { DetailsHeader } from "../DetailsHeader/DetailsHeader";
import { InfoItem } from "../InfoItem/InfoItem";
import { RelationSection } from "../RelationSection/RelationSection";
import type { CollegeDetailsProps } from "../../types/college.types";

export function CollegeDetails({ college, backHref }: CollegeDetailsProps) {
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
    </div>
  );
}
