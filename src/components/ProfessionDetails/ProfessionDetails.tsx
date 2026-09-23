import { Award, BookOpen, Briefcase, Building2, Calendar, Clock, FileText, Hash, Users } from "lucide-react";
import { CollegeCard } from "../CollegeCard/CollegeCard";
import {
  DashboardHero,
  OverviewPanel,
  RelationPanel,
  RelationTiles,
} from "../DetailsDashboard/DetailsDashboard";
import { iconSoftClasses, itemHoverClasses } from "../DetailsDashboard/accents";
import { formatDate } from "../../utils/formatDate";
import type { ProfessionDetailsProps, ProfessionInclude } from "../../types/profession.types";

const ACCENT = "amber";

export function ProfessionDetails({
  profession,
  backHref,
  selectedIncludes,
  onToggleInclude,
}: ProfessionDetailsProps) {
  const chips = [
    ...(profession.code ? [{ icon: Hash, label: profession.code }] : []),
    ...(profession.duration ? [{ icon: Clock, label: profession.duration }] : []),
  ];

  return (
    <div className="space-y-6">
      <DashboardHero
        accent={ACCENT}
        icon={Briefcase}
        eyebrow="პროფესია"
        title={profession.name}
        chips={chips}
        backHref={backHref}
      />

      <OverviewPanel
        accent={ACCENT}
        descriptionIcon={FileText}
        descriptionTitle="პროფესიის აღწერა"
        description={profession.description}
        detailsIcon={Briefcase}
        details={[
          { icon: Hash, label: "კოდი", value: profession.code },
          { icon: Clock, label: "ხანგრძლივობა", value: profession.duration },
          { icon: Award, label: "კვალიფიკაცია", value: profession.qualification },
          { icon: Calendar, label: "დამატების თარიღი", value: formatDate(profession.created_at) },
          { icon: Calendar, label: "ბოლო განახლება", value: formatDate(profession.updated_at) },
        ]}
      />

      <RelationTiles<ProfessionInclude>
        accent={ACCENT}
        tiles={[
          { key: "modules", label: "მოდულები", icon: BookOpen, count: profession.modules?.length },
          { key: "groups", label: "ჯგუფები", icon: Users, count: profession.groups?.length },
          { key: "colleges", label: "კოლეჯები", icon: Building2, count: profession.colleges?.length },
        ]}
        selected={selectedIncludes}
        onToggle={onToggleInclude}
      />

      {selectedIncludes.includes("modules") && (
        <RelationPanel
          accent={ACCENT}
          icon={BookOpen}
          title="მოდულები"
          count={profession.modules?.length ?? 0}
          emptyText="მოდულები არ არის მითითებული."
        >
          <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {profession.modules?.map((module, index) => (
              <li
                key={module.id}
                className={`flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition-colors dark:border-slate-800 dark:bg-slate-950/40 ${itemHoverClasses(ACCENT)}`}
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-bold text-amber-600 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:text-amber-400 dark:ring-slate-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="font-medium text-slate-800 dark:text-slate-100">{module.name}</p>
                  {module.code && (
                    <p className="mt-0.5 font-mono text-xs text-slate-500 dark:text-slate-400">{module.code}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </RelationPanel>
      )}

      {selectedIncludes.includes("groups") && (
        <RelationPanel
          accent={ACCENT}
          icon={Users}
          title="ჯგუფები"
          count={profession.groups?.length ?? 0}
          emptyText="ჯგუფები არ არის მითითებული."
        >
          <ul className="flex flex-wrap gap-2">
            {profession.groups?.map((group) => (
              <li
                key={group.id}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1.5 pr-3.5 pl-1.5 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <span className={`flex size-6 items-center justify-center rounded-full ${iconSoftClasses(ACCENT)}`}>
                  <Users className="size-3.5" aria-hidden="true" />
                </span>
                {group.name}
              </li>
            ))}
          </ul>
        </RelationPanel>
      )}

      {selectedIncludes.includes("colleges") && (
        <RelationPanel
          accent={ACCENT}
          icon={Building2}
          title="კოლეჯები"
          count={profession.colleges?.length ?? 0}
          emptyText="კოლეჯები არ არის მითითებული."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profession.colleges?.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        </RelationPanel>
      )}
    </div>
  );
}
