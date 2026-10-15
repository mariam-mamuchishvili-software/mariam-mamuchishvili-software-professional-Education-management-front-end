import type {
  StudentCabinetData,
  StudentEducation,
  StudentEducationInput,
  StudentProfile,
} from "../types/studentCabinet.types";
import { apiGet, apiSend, apiSendForm, type AuthToken, type ListParams } from "./client";
import type { ApiItemResponse, ApiListResponse } from "./types";

/*
 * Student cabinet endpoints. Everything under `/me/*` is resolved from the token's student
 * on the backend (StudentCabinetController, StudentEducationController, StudentCertificateController).
 */

export function loginStudent(email: string, password: string) {
  return apiSend<{ token: string; token_type: string }>("/student/login", "POST", { email, password });
}

export function logoutStudent(token: AuthToken) {
  return apiSend<{ message: string }>("/me/student/logout", "POST", undefined, token);
}

export function getStudentCabinet(token: AuthToken, signal?: AbortSignal) {
  return apiGet<ApiItemResponse<StudentCabinetData>>("/me/student/cabinet", signal, token).then((r) => r.data);
}

/** Editable profile fields of UpdateStudentCabinetRequest; every one is optional. */
export interface StudentProfileInput extends Partial<Omit<StudentProfile, "id" | "full_name" | "image">> {
  image?: File;
  password?: string;
  password_confirmation?: string;
}

/** Sent as multipart so a new photo can travel with the other fields. Returns the whole cabinet. */
export function updateStudentProfile(token: AuthToken, input: StudentProfileInput) {
  const body = new FormData();
  for (const [key, value] of Object.entries(input)) {
    if (value !== undefined) body.append(key, value);
  }
  return apiSendForm<ApiItemResponse<StudentCabinetData>>("/me/student/cabinet", body, "PATCH", undefined, token).then(
    (r) => r.data,
  );
}

export function createStudentEducation(token: AuthToken, input: StudentEducationInput) {
  return apiSend<ApiItemResponse<StudentEducation>>("/me/student-educations", "POST", input, token).then((r) => r.data);
}

export function updateStudentEducation(token: AuthToken, id: number, input: StudentEducationInput) {
  return apiSend<ApiItemResponse<StudentEducation>>(`/me/student-educations/${id}`, "PATCH", input, token).then(
    (r) => r.data,
  );
}

export function deleteStudentEducation(token: AuthToken, id: number) {
  return apiSend<{ message: string }>(`/me/student-educations/${id}`, "DELETE", undefined, token);
}

/*
 * Certificates are issued by the college through the admin panel; students can only read them
 * (they arrive with the cabinet), so there are no create/update/delete calls here.
 */

const PAGE_SIZE = 100;

/** Every record of a paginated list endpoint, for the select options in cabinet forms. */
export async function fetchAllPages<T>(
  fetchPage: (params: ListParams, signal?: AbortSignal) => Promise<ApiListResponse<T>>,
  signal?: AbortSignal,
): Promise<T[]> {
  const first = await fetchPage({ skip: 0, limit: PAGE_SIZE }, signal);
  const remaining = [];
  for (let skip = PAGE_SIZE; skip < first.total; skip += PAGE_SIZE) {
    remaining.push(fetchPage({ skip, limit: PAGE_SIZE }, signal));
  }
  const pages = await Promise.all(remaining);
  return [first, ...pages].flatMap((page) => page.data);
}
