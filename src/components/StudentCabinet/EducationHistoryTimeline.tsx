import { GraduationCap } from "lucide-react";
import { EDUCATION_STATUS_LABELS } from "../../constants/studentCabinet";
import type { StudentEducation, StudentEducationStatus } from "../../types/studentCabinet.types";
import { formatDuration, formatMonthYear } from "../../utils/teacherCabinet";
import { Timeline } from "../TeacherCabinet/Timeline";
import { RecordActionButton } from "./CabinetForm";

// Class names are spelled out in full per status so Tailwind can detect them.
const STATUS_CLASSES: Record<StudentEducationStatus, string> = {
  active:
    "bg-emerald-50 text-emerald-700 ring-emerald-600/15 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20",
  completed:
    "bg-violet-50 text-violet-700 ring-violet-600/15 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-400/20",
  terminated: "bg-rose-50 text-rose-700 ring-rose-600/15 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-400/20",
};

interface EducationHistoryTimelineProps {
  items: StudentEducation[];
  /** Omit to show the timeline read-only (e.g. on the dashboard). */
  onEdit?: (item: StudentEducation) => void;
  onDelete?: (item: StudentEducation) => void;
  deletingId?: number | null;
}

function period(item: StudentEducation): string {
  if (!item.started_at) return item.completed_at ? `— ${formatMonthYear(item.completed_at)}` : "თარიღი უცნობია";
  const end = item.completed_at ? formatMonthYear(item.completed_at) : item.status === "active" ? "დღემდე" : "—";
  return `${formatMonthYear(item.started_at)} — ${end}`;
}

export function EducationHistoryTimeline({ items, onEdit, onDelete, deletingId }: EducationHistoryTimelineProps) {
  const sorted = [...items].sort(
    (a, b) =>
      Number(b.status === "active") - Number(a.status === "active") ||
      (b.started_at ?? "").localeCompare(a.started_at ?? ""),
  );

  return (
    <Timeline
      icon={GraduationCap}
      entries={sorted.map((item) => ({
        id: item.id,
        period: period(item),
        meta: item.started_at ? formatDuration(item.started_at, item.completed_at) : undefined,
        title: item.college_name ?? item.institution_name ?? "—",
        subtitle:
          [item.profession_name ?? item.program_name, item.group_name && `ჯგუფი ${item.group_name}`]
            .filter(Boolean)
            .join(" · ") || "—",
        // Show the program name separately when the profession already took the subtitle.
        description: item.profession_name && item.program_name ? item.program_name : null,
        highlighted: item.status === "active",
        badge: (
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${STATUS_CLASSES[item.status]}`}>
            {EDUCATION_STATUS_LABELS[item.status]}
          </span>
        ),
        actions: onEdit && onDelete && (
          <>
            <RecordActionButton
              kind="edit"
              label="რედაქტირება"
              onClick={() => onEdit(item)}
              disabled={deletingId === item.id}
            />
            <RecordActionButton
              kind="delete"
              label="წაშლა"
              onClick={() => onDelete(item)}
              disabled={deletingId === item.id}
            />
          </>
        ),
      }))}
    />
  );
}
