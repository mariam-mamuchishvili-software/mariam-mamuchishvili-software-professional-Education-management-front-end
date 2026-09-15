import type { Profession } from "../types/profession.types";
import { apiGet, buildListQuery, type ListParams } from "./client";
import type { ApiItemResponse, ApiListResponse } from "./types";

export function getProfessions(params?: ListParams, signal?: AbortSignal) {
  return apiGet<ApiListResponse<Profession>>(`/professions${buildListQuery(params)}`, signal);
}

export function getProfession(id: number | string, signal?: AbortSignal) {
  return apiGet<ApiItemResponse<Profession>>(`/professions/${id}`, signal);
}
