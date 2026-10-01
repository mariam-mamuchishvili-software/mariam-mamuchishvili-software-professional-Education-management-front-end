import type { Teacher } from "../types/teacher.types";

/** "Nino Beridze" → "NB"; used as the avatar placeholder when a teacher has no photo. */
export function getTeacherInitials(teacher: Pick<Teacher, "first_name" | "last_name">) {
  return `${teacher.first_name.trim().charAt(0)}${teacher.last_name.trim().charAt(0)}`.toUpperCase();
}
