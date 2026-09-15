import type { College } from "../types/college.types";
import { apiGet, buildListQuery, type ListParams } from "./client";
import type { ApiItemResponse, ApiListResponse } from "./types";

export function getColleges(params?: ListParams, signal?: AbortSignal) {
  return apiGet<ApiListResponse<College>>(`/colleges${buildListQuery(params)}`, signal);
}

export function getCollege(id: number | string, signal?: AbortSignal) {
  return apiGet<ApiItemResponse<College>>(`/colleges/${id}`, signal);
}
