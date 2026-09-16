import type { Statistics } from "../types/statistics.types";
import { apiGet } from "./client";
import type { ApiItemResponse } from "./types";

export function getStatistics(signal?: AbortSignal) {
  return apiGet<ApiItemResponse<Statistics>>("/statistics", signal);
}
