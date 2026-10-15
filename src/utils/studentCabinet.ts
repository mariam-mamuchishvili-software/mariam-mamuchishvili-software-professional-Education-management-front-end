import type { ApiError } from "../api/client";
import type { ProfileCompletionItem, StudentCabinetData } from "../types/studentCabinet.types";

export function getStudentProfileCompletionItems({
  profile,
  current_studies,
  education_history,
}: StudentCabinetData): ProfileCompletionItem[] {
  return [
    { label: "პროფილის ფოტო", done: Boolean(profile.image) },
    { label: "საკონტაქტო ინფორმაცია", done: Boolean(profile.email && profile.phone) },
    { label: "დაბადების თარიღი", done: Boolean(profile.birth_date) },
    { label: "კოლეჯი", done: current_studies.colleges.length > 0 },
    { label: "განათლების ისტორია", done: education_history.length > 0 },
  ];
}

/** Whole years since a birth date, or null when it can't be parsed. */
export function getAge(birthDate?: string | null): number | null {
  if (!birthDate) return null;
  const birth = new Date(birthDate);
  if (Number.isNaN(birth.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const beforeBirthday =
    today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate());
  if (beforeBirthday) age -= 1;
  return age;
}

/** First validation message per field from a 422 response, e.g. `{ email: "..." }`. */
export function fieldErrors(error: ApiError): Record<string, string> {
  return Object.fromEntries(Object.entries(error.errors).map(([field, messages]) => [field, messages[0] ?? ""]));
}

/** Props that link an input to its Field error (`<id>-error`) for screen readers. */
export function invalidProps(id: string, error?: string) {
  return error ? { "aria-invalid": true, "aria-describedby": `${id}-error` } : {};
}

/** "2024-05-01T..." or "2024-05-01" → "2024-05-01" for <input type="date">. */
export function toDateInput(value?: string | null): string {
  return value ? value.slice(0, 10) : "";
}
