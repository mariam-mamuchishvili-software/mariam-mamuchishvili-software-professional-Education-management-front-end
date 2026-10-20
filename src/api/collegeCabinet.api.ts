import type { College } from "../types/college.types";
import type {
  AttendanceFilters,
  CollegeAnnouncement,
  CollegeAttendance,
  CollegeCabinetData,
  CollegeGroup,
  CollegeModule,
  CollegeProfession,
  CollegeReport,
  CollegeStudent,
} from "../types/collegeCabinet.types";
import type { Teacher } from "../types/teacher.types";
import { apiGet, apiSend, buildListQuery, type AuthToken, type ListParams } from "./client";
import type { ApiItemResponse, ApiListResponse } from "./types";

/*
 * College cabinet endpoints. Everything under `/me/college` is limited on the backend to the
 * college of the token's administrator or staff member, and is read-only: records are managed
 * in the college panel (/college).
 */

export function loginCollege(email: string, password: string) {
  return apiSend<{ token: string; token_type: string }>("/college/login", "POST", { email, password });
}

export function logoutCollege(token: AuthToken) {
  return apiSend<{ message: string }>("/me/college/logout", "POST", undefined, token);
}

interface CollegeCabinetResponse extends Omit<CollegeCabinetData, "college"> {
  data: College;
}

export function getCollegeCabinet(token: AuthToken, signal?: AbortSignal): Promise<CollegeCabinetData> {
  return apiGet<CollegeCabinetResponse>("/me/college", signal, token).then(({ data, ...rest }) => ({
    college: data,
    ...rest,
  }));
}

export function getCollegeStudents(token: AuthToken, params?: ListParams, signal?: AbortSignal) {
  return apiGet<ApiListResponse<CollegeStudent>>(`/me/college/students${buildListQuery(params)}`, signal, token);
}

export function getCollegeStudent(token: AuthToken, id: number, signal?: AbortSignal) {
  return apiGet<ApiItemResponse<CollegeStudent>>(`/me/college/students/${id}`, signal, token).then((r) => r.data);
}

export function getCollegeTeachers(token: AuthToken, params?: ListParams, signal?: AbortSignal) {
  return apiGet<ApiListResponse<Teacher>>(`/me/college/teachers${buildListQuery(params)}`, signal, token);
}

export function getCollegeTeacher(token: AuthToken, id: number, signal?: AbortSignal) {
  return apiGet<ApiItemResponse<Teacher>>(`/me/college/teachers/${id}`, signal, token).then((r) => r.data);
}

export function getCollegeGroups(token: AuthToken, params?: ListParams, signal?: AbortSignal) {
  return apiGet<ApiListResponse<CollegeGroup>>(`/me/college/groups${buildListQuery(params)}`, signal, token);
}

export function getCollegeGroup(token: AuthToken, id: number, signal?: AbortSignal) {
  return apiGet<ApiItemResponse<CollegeGroup>>(`/me/college/groups/${id}`, signal, token).then((r) => r.data);
}

/** Not paginated: a college teaches a handful of professions. */
export function getCollegeProfessions(token: AuthToken, signal?: AbortSignal) {
  return apiGet<{ data: CollegeProfession[] }>("/me/college/professions", signal, token).then((r) => r.data);
}

export function getCollegeProfession(token: AuthToken, id: number, signal?: AbortSignal) {
  return apiGet<ApiItemResponse<CollegeProfession>>(`/me/college/professions/${id}`, signal, token).then((r) => r.data);
}

/** Not paginated. */
export function getCollegeModules(token: AuthToken, signal?: AbortSignal) {
  return apiGet<{ data: CollegeModule[] }>("/me/college/modules", signal, token).then((r) => r.data);
}

export function getCollegeModule(token: AuthToken, id: number, signal?: AbortSignal) {
  return apiGet<ApiItemResponse<CollegeModule>>(`/me/college/modules/${id}`, signal, token).then((r) => r.data);
}

/** Every announcement of the college, drafts included, newest first. */
export function getCollegeAnnouncements(token: AuthToken, signal?: AbortSignal) {
  return apiGet<{ data: CollegeAnnouncement[] }>("/me/college/announcements", signal, token).then((r) => r.data);
}

export function getCollegeAttendance(token: AuthToken, filters: AttendanceFilters & ListParams, signal?: AbortSignal) {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== "") searchParams.set(key, String(value));
  }
  const query = searchParams.toString();
  return apiGet<ApiListResponse<CollegeAttendance>>(`/me/college/attendance${query ? `?${query}` : ""}`, signal, token);
}

export function getCollegeReport(token: AuthToken, signal?: AbortSignal) {
  return apiGet<ApiItemResponse<CollegeReport>>("/me/college/reports", signal, token).then((r) => r.data);
}
