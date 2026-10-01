import type { Training } from "../types/training.types";
import { apiGet, buildListQuery, type ListParams } from "./client";
import type { ApiListResponse } from "./types";

export function getTrainings(params?: ListParams, signal?: AbortSignal) {
  return apiGet<ApiListResponse<Training>>(`/trainings${buildListQuery(params)}`, signal);
}
