import { Briefcase } from "lucide-react";
import type { TeacherWorkExperience } from "../../types/teacher.types";
import { formatDuration, formatPeriod } from "../../utils/teacherCabinet";
import { Timeline } from "./Timeline";

interface WorkExperienceTimelineProps {
  items: TeacherWorkExperience[];
}

export function WorkExperienceTimeline({ items }: WorkExperienceTimelineProps) {
  const sorted = [...items].sort(
    (a, b) => Number(b.is_current) - Number(a.is_current) || b.start_date.localeCompare(a.start_date),
  );

  return (
    <Timeline
      icon={Briefcase}
      entries={sorted.map((item) => ({
        id: item.id,
        period: formatPeriod(item.start_date, item.end_date, item.is_current),
        meta: formatDuration(item.start_date, item.is_current ? null : item.end_date),
        title: item.position,
        subtitle: item.organization,
        description: item.description,
        highlighted: item.is_current,
        badge: item.is_current && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/15 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20">
            <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            ამჟამინდელი
          </span>
        ),
      }))}
    />
  );
}
