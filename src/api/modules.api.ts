import type { Module } from "../types/module.types";
import { apiGet, buildListQuery, type ListParams } from "./client";
import type { ApiItemResponse, ApiListResponse } from "./types";

export function getModules(params?: ListParams, signal?: AbortSignal) {
  return apiGet<ApiListResponse<Module>>(`/modules${buildListQuery(params)}`, signal);
}

export function getModule(id: number | string, signal?: AbortSignal) {
  return apiGet<ApiItemResponse<Module>>(`/modules/${id}`, signal);
}
