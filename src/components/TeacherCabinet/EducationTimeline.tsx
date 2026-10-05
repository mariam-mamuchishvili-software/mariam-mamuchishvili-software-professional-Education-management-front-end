import { GraduationCap } from "lucide-react";
import type { TeacherEducation } from "../../types/teacher.types";
import { formatPeriod } from "../../utils/teacherCabinet";
import { Timeline } from "./Timeline";

interface EducationTimelineProps {
  items: TeacherEducation[];
}

export function EducationTimeline({ items }: EducationTimelineProps) {
  const sorted = [...items].sort((a, b) => b.start_date.localeCompare(a.start_date));

  return (
    <Timeline
      icon={GraduationCap}
      entries={sorted.map((item) => ({
        id: item.id,
        period: formatPeriod(item.start_date, item.end_date),
        title: item.institution,
        subtitle: [item.degree, item.specialization].filter(Boolean).join(" · "),
        description: item.description,
        badge: (
          <span className="rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-semibold text-violet-700 ring-1 ring-violet-600/15 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-400/20">
            {item.degree}
          </span>
        ),
      }))}
    />
  );
}
