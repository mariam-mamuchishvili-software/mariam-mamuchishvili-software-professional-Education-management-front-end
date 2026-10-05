import type {
  CabinetGroup,
  CabinetModule,
  CabinetStudent,
  ProfileCompletionItem,
  TeacherCabinetData,
} from "../types/teacherCabinet.types";

/** Groups reachable through module → profession → group, de-duplicated by id. */
export function collectTeacherGroups(modules: CabinetModule[]): CabinetGroup[] {
  const groups = new Map<number, CabinetGroup>();

  for (const module of modules) {
    for (const profession of module.professions ?? []) {
      for (const group of profession.groups ?? []) {
        const existing = groups.get(group.id);
        if (existing) {
          if (!existing.moduleNames.includes(module.name)) existing.moduleNames.push(module.name);
        } else {
          groups.set(group.id, { ...group, professionName: profession.name, moduleNames: [module.name] });
        }
      }
    }
  }

  return [...groups.values()].sort((a, b) => a.name.localeCompare(b.name));
}

/** Students enrolled in any of the teacher's modules, de-duplicated by id. */
export function collectTeacherStudents(modules: CabinetModule[]): CabinetStudent[] {
  const students = new Map<number, CabinetStudent>();

  for (const module of modules) {
    for (const student of module.students ?? []) {
      const existing = students.get(student.id);
      if (existing) {
        if (!existing.moduleNames.includes(module.name)) existing.moduleNames.push(module.name);
      } else {
        students.set(student.id, { ...student, moduleNames: [module.name] });
      }
    }
  }

  return [...students.values()].sort((a, b) =>
    `${a.last_name} ${a.first_name}`.localeCompare(`${b.last_name} ${b.first_name}`),
  );
}

export function getProfileCompletionItems({
  teacher,
  workExperiences,
  educations,
  trainings,
}: TeacherCabinetData): ProfileCompletionItem[] {
  return [
    { label: "პროფილის ფოტო", done: Boolean(teacher.image) },
    { label: "საკონტაქტო ინფორმაცია", done: Boolean(teacher.email && teacher.phone) },
    { label: "სპეციალიზაცია", done: Boolean(teacher.specialization) },
    { label: "ბიოგრაფია", done: Boolean(teacher.detail?.biography) },
    { label: "სოციალური ქსელები", done: (teacher.detail?.social_links?.length ?? 0) > 0 },
    { label: "სამუშაო გამოცდილება", done: workExperiences.length > 0 },
    { label: "განათლება", done: educations.length > 0 },
    { label: "ტრენინგები და სერტიფიკატები", done: trainings.length > 0 },
    { label: "დამატებითი ინფორმაცია", done: Boolean(teacher.detail?.additional_information) },
  ];
}

const monthYearFormatter = new Intl.DateTimeFormat("ka-GE", { year: "numeric", month: "short" });

/** "2023-02-01" → "თებ. 2023"; falls back to the raw value when it can't be parsed. */
export function formatMonthYear(value?: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return monthYearFormatter.format(date);
}

/** "თებ. 2023 — დღემდე" style range for timeline entries. */
export function formatPeriod(start: string, end?: string | null, isCurrent = false): string {
  const endLabel = isCurrent || !end ? "დღემდე" : formatMonthYear(end);
  return `${formatMonthYear(start)} — ${endLabel}`;
}

/** Whole years and months between two dates, e.g. "2 წ. 4 თვე". */
export function formatDuration(start: string, end?: string | null): string {
  const from = new Date(start);
  const to = end ? new Date(end) : new Date();
  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) return "";

  const totalMonths = Math.max(
    (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth()),
    0,
  );
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const parts = [];
  if (years > 0) parts.push(`${years} წ.`);
  if (months > 0) parts.push(`${months} თვე`);
  return parts.length > 0 ? parts.join(" ") : "1 თვეზე ნაკლები";
}

/** True when an ISO date is in the past. */
export function isExpired(value?: string | null): boolean {
  if (!value) return false;
  const date = new Date(value);
  return !Number.isNaN(date.getTime()) && date.getTime() < Date.now();
}
