import type { Student } from "../types/student.types";
import { apiGet, buildListQuery, type ListParams } from "./client";
import type { ApiItemResponse, ApiListResponse } from "./types";

export function getStudents(params?: ListParams, signal?: AbortSignal) {
  return apiGet<ApiListResponse<Student>>(`/students${buildListQuery(params)}`, signal);
}

export function getStudent(id: number | string, signal?: AbortSignal) {
  return apiGet<ApiItemResponse<Student>>(`/students/${id}`, signal);
}
