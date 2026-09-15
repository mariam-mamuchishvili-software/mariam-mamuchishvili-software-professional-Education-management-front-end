import type { Teacher } from "../types/teacher.types";
import { apiGet, buildListQuery, type ListParams } from "./client";
import type { ApiItemResponse, ApiListResponse } from "./types";

export function getTeachers(params?: ListParams, signal?: AbortSignal) {
  return apiGet<ApiListResponse<Teacher>>(`/teachers${buildListQuery(params)}`, signal);
}

export function getTeacher(id: number | string, signal?: AbortSignal) {
  return apiGet<ApiItemResponse<Teacher>>(`/teachers/${id}`, signal);
}
