import type { Profession, ProfessionInclude } from "../types/profession.types";
import { apiGet, buildIncludeQuery, buildListQuery, type ListParams } from "./client";
import type { ApiItemResponse, ApiListResponse } from "./types";

export function getProfessions(params?: ListParams, include?: ProfessionInclude[], signal?: AbortSignal) {
  const listQuery = buildListQuery(params);
  const includeQuery = buildIncludeQuery(include);
  const query = listQuery && includeQuery ? `${listQuery}&${includeQuery.slice(1)}` : listQuery || includeQuery;

  return apiGet<ApiListResponse<Profession>>(`/professions${query}`, signal);
}

export function getProfession(id: number | string, include?: ProfessionInclude[], signal?: AbortSignal) {
  return apiGet<ApiItemResponse<Profession>>(`/professions/${id}${buildIncludeQuery(include)}`, signal);
}
