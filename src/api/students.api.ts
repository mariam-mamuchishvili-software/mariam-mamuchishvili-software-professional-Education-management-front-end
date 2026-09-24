import type { Student, StudentInclude } from "../types/student.types";
import { apiGet, buildIncludeQuery, buildListQuery, type ListParams } from "./client";
import type { ApiItemResponse, ApiListResponse } from "./types";

export function getStudents(params?: ListParams, include?: StudentInclude[], signal?: AbortSignal) {
  const listQuery = buildListQuery(params);
  const includeQuery = buildIncludeQuery(include);
  const query = listQuery && includeQuery ? `${listQuery}&${includeQuery.slice(1)}` : listQuery || includeQuery;

  return apiGet<ApiListResponse<Student>>(`/students${query}`, signal);
}

export function getStudent(id: number | string, include?: StudentInclude[], signal?: AbortSignal) {
  return apiGet<ApiItemResponse<Student>>(`/students/${id}${buildIncludeQuery(include)}`, signal);
}
