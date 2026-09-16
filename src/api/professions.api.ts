import type { Profession, ProfessionInclude } from "../types/profession.types";
import { apiGet, buildIncludeQuery, buildListQuery, type ListParams } from "./client";
import type { ApiItemResponse, ApiListResponse } from "./types";

export function getProfessions(params?: ListParams, signal?: AbortSignal) {
  return apiGet<ApiListResponse<Profession>>(`/professions${buildListQuery(params)}`, signal);
}

export function getProfession(id: number | string, include?: ProfessionInclude[], signal?: AbortSignal) {
  return apiGet<ApiItemResponse<Profession>>(`/professions/${id}${buildIncludeQuery(include)}`, signal);
}
