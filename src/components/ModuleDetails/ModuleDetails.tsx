import { Award, BookOpen, Briefcase, Calendar, Clock, FileText, GraduationCap, Hash, Users } from "lucide-react";
import { Link } from "react-router";
import {
  DashboardHero,
  OverviewPanel,
  RelationPanel,
  RelationTiles,
} from "../DetailsDashboard/DetailsDashboard";
import { iconSoftClasses, itemHoverClasses } from "../DetailsDashboard/accents";
import { formatDate } from "../../utils/formatDate";
import type { ModuleDetailsProps, ModuleInclude } from "../../types/module.types";

const ACCENT = "sky";

export function ModuleDetails({ module, backHref, selectedIncludes, onToggleInclude }: ModuleDetailsProps) {
  const chips = [
    ...(module.code ? [{ icon: Hash, label: module.code }] : []),
    ...(module.duration ? [{ icon: Clock, label: module.duration }] : []),
    ...(module.credits != null ? [{ icon: Award, label: `${module.credits} კრედიტი` }] : []),
  ];

  return (
    <div className="space-y-6">
      <DashboardHero
        accent={ACCENT}
        icon={BookOpen}
        eyebrow="მოდული"
        title={module.name}
        chips={chips}
        backHref={backHref}
      />

      <OverviewPanel
        accent={ACCENT}
        descriptionIcon={FileText}
        descriptionTitle="მოდულის აღწერა"
        description={module.description}
        detailsIcon={BookOpen}
        details={[
          { icon: Hash, label: "კოდი", value: module.code },
          { icon: Clock, label: "ხანგრძლივობა", value: module.duration },
          { icon: Award, label: "კრედიტები", value: module.credits },
          { icon: Calendar, label: "დამატების თარიღი", value: formatDate(module.created_at) },
          { icon: Calendar, label: "ბოლო განახლება", value: formatDate(module.updated_at) },
        ]}
      />

      <RelationTiles<ModuleInclude>
        accent={ACCENT}
        tiles={[
          { key: "teachers", label: "მასწავლებლები", icon: GraduationCap, count: module.teachers?.length },
          { key: "professions", label: "პროფესიები", icon: Briefcase, count: module.professions?.length },
        ]}
        selected={selectedIncludes}
        onToggle={onToggleInclude}
      />

      {selectedIncludes.includes("teachers") && (
        <RelationPanel
          accent={ACCENT}
          icon={GraduationCap}
          title="მასწავლებლები"
          count={module.teachers?.length ?? 0}
          emptyText="მასწავლებლები ჯერ არ არიან დამატებული."
        >
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {module.teachers?.map((teacher) => (
              <li key={teacher.id}>
                <Link
                  to={`/teachers/${teacher.id}`}
                  className={`flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition-colors dark:border-slate-800 dark:bg-slate-950/40 ${itemHoverClasses(ACCENT)}`}
                >
                  <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold uppercase ${iconSoftClasses(ACCENT)}`}
                    aria-hidden="true"
                  >
                    {teacher.first_name.charAt(0)}
                    {teacher.last_name.charAt(0)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-slate-800 dark:text-slate-100">
                      {teacher.first_name} {teacher.last_name}
                    </span>
                    <span className="block truncate text-sm text-slate-500 dark:text-slate-400">{teacher.email}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </RelationPanel>
      )}

      {selectedIncludes.includes("professions") && (
        <RelationPanel
          accent={ACCENT}
          icon={Briefcase}
          title="პროფესიები"
          count={module.professions?.length ?? 0}
          emptyText="პროფესიები არ არის მითითებული."
        >
          <ul className="flex flex-wrap gap-2">
            {module.professions?.map((profession) => (
              <li key={profession.id}>
                <Link
                  to={`/professions/${profession.id}`}
                  className={`inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1.5 pr-3.5 pl-1.5 text-sm font-medium text-slate-700 transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 ${itemHoverClasses(ACCENT)}`}
                >
                  <span className={`flex size-6 items-center justify-center rounded-full ${iconSoftClasses(ACCENT)}`}>
                    <Briefcase className="size-3.5" aria-hidden="true" />
                  </span>
                  {profession.name}
                  {profession.code && (
                    <span className="font-mono text-xs text-slate-400 dark:text-slate-500">{profession.code}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </RelationPanel>
      )}

      {/* The students toggle is hidden from the UI; the section stays so it can be re-enabled. */}
      {selectedIncludes.includes("students") && (
        <RelationPanel
          accent={ACCENT}
          icon={Users}
          title="სტუდენტები"
          count={module.students?.length ?? 0}
          emptyText="სტუდენტები არ არის მითითებული."
        >
          <ul className="flex flex-wrap gap-2">
            {module.students?.map((student) => (
              <li
                key={student.id}
                className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {student.first_name} {student.last_name}
              </li>
            ))}
          </ul>
        </RelationPanel>
      )}
    </div>
  );
}
