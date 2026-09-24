import { BookOpen, Building2, Cake, Calendar, Mail, MapPin, Phone, UserRound, Users } from "lucide-react";
import { Link } from "react-router";
import {
  DashboardHero,
  OverviewPanel,
  RelationPanel,
  RelationTiles,
} from "../DetailsDashboard/DetailsDashboard";
import { iconSoftClasses, itemHoverClasses } from "../DetailsDashboard/accents";
import { StudentPhoto } from "../StudentPhoto/StudentPhoto";
import { formatDate } from "../../utils/formatDate";
import type { StudentDetailsProps, StudentToggleInclude } from "../../types/student.types";

const ACCENT = "rose";

const LINK_CLASSES = "text-rose-600 hover:underline dark:text-rose-400";

export function StudentDetails({ student, backHref, selectedIncludes, onToggleInclude }: StudentDetailsProps) {
  const chips = [
    ...(student.email ? [{ icon: Mail, label: student.email }] : []),
    ...(student.phone ? [{ icon: Phone, label: student.phone }] : []),
  ];

  return (
    <div className="space-y-6">
      <DashboardHero
        accent={ACCENT}
        icon={UserRound}
        eyebrow="სტუდენტი"
        title={`${student.first_name} ${student.last_name}`}
        chips={chips}
        backHref={backHref}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:items-start">
        {/* Photo — ~40% on desktop, like the college poster */}
        <div className="lg:col-span-2">
          <StudentPhoto student={student} />
        </div>

        <div className="min-w-0 lg:col-span-3">
          <OverviewPanel
            accent={ACCENT}
            detailsIcon={UserRound}
            details={[
              {
                icon: Mail,
                label: "ელ-ფოსტა",
                value: student.email && (
                  <a href={`mailto:${student.email}`} className={LINK_CLASSES}>
                    {student.email}
                  </a>
                ),
              },
              {
                icon: Phone,
                label: "ტელეფონი",
                value: student.phone && (
                  <a href={`tel:${student.phone}`} className={LINK_CLASSES}>
                    {student.phone}
                  </a>
                ),
              },
              { icon: Cake, label: "დაბადების თარიღი", value: formatDate(student.birth_date) },
              { icon: Calendar, label: "დამატების თარიღი", value: formatDate(student.created_at) },
              { icon: Calendar, label: "ბოლო განახლება", value: formatDate(student.updated_at) },
            ]}
          />
        </div>
      </div>

      {/* Colleges are always loaded, so they are shown directly rather than behind a tile toggle. */}
      <RelationPanel
        accent={ACCENT}
        icon={Building2}
        title="კოლეჯები"
        count={student.colleges?.length ?? 0}
        emptyText="სტუდენტი ჯერ არცერთ კოლეჯზე არ არის მიბმული."
      >
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {student.colleges?.map((college) => (
            <li key={college.id}>
              <Link
                to={`/colleges/${college.id}`}
                title={college.name}
                className={`flex h-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/40 dark:hover:shadow-black/40 ${itemHoverClasses(ACCENT)}`}
              >
                <CollegeThumb name={college.name} image={college.logo ?? college.poster} />
                <span className="min-w-0">
                  <span className="block truncate font-medium text-slate-800 dark:text-slate-100">{college.name}</span>
                  {college.address && (
                    <span className="mt-0.5 flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                      <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                      <span className="truncate">{college.address}</span>
                    </span>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </RelationPanel>

      <RelationTiles<StudentToggleInclude>
        accent={ACCENT}
        tiles={[
          { key: "groups", label: "ჯგუფები", icon: Users, count: student.groups?.length },
          { key: "modules", label: "მოდულები", icon: BookOpen, count: student.modules?.length },
        ]}
        selected={selectedIncludes}
        onToggle={onToggleInclude}
      />

      {selectedIncludes.includes("groups") && (
        <RelationPanel
          accent={ACCENT}
          icon={Users}
          title="ჯგუფები"
          count={student.groups?.length ?? 0}
          emptyText="ჯგუფები არ არის მითითებული."
        >
          <ul className="flex flex-wrap gap-2">
            {student.groups?.map((group) => (
              <li key={group.id}>
                <Link
                  to={`/groups/${group.id}`}
                  className={`inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1.5 pr-3.5 pl-1.5 text-sm font-medium text-slate-700 transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 ${itemHoverClasses(ACCENT)}`}
                >
                  <span className={`flex size-6 items-center justify-center rounded-full ${iconSoftClasses(ACCENT)}`}>
                    <Users className="size-3.5" aria-hidden="true" />
                  </span>
                  {group.name}
                  {group.code && <span className="font-mono text-xs text-slate-400 dark:text-slate-500">{group.code}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </RelationPanel>
      )}

      {selectedIncludes.includes("modules") && (
        <RelationPanel
          accent={ACCENT}
          icon={BookOpen}
          title="მოდულები"
          count={student.modules?.length ?? 0}
          emptyText="მოდულები არ არის მითითებული."
        >
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {student.modules?.map((module) => (
              <li key={module.id}>
                <Link
                  to={`/modules/${module.id}`}
                  className={`flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition-colors dark:border-slate-800 dark:bg-slate-950/40 ${itemHoverClasses(ACCENT)}`}
                >
                  <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-full ${iconSoftClasses(ACCENT)}`}
                    aria-hidden="true"
                  >
                    <BookOpen className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-slate-800 dark:text-slate-100">{module.name}</span>
                    {module.code && (
                      <span className="block truncate font-mono text-xs text-slate-500 dark:text-slate-400">
                        {module.code}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </RelationPanel>
      )}
    </div>
  );
}

function CollegeThumb({ name, image }: { name: string; image?: string | null }) {
  if (image) {
    return (
      <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-slate-200 dark:ring-slate-700">
        <img src={image} alt="" className="size-full object-contain p-1" loading="lazy" />
      </span>
    );
  }

  return (
    <span
      className={`flex size-12 shrink-0 items-center justify-center rounded-xl text-base font-bold uppercase ${iconSoftClasses(ACCENT)}`}
      aria-hidden="true"
    >
      {name.trim().charAt(0)}
    </span>
  );
}
