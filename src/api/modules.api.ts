import type { Module, ModuleInclude } from "../types/module.types";
import { apiGet, buildIncludeQuery, buildListQuery, type ListParams } from "./client";
import type { ApiItemResponse, ApiListResponse } from "./types";

export function getModules(params?: ListParams, signal?: AbortSignal) {
  return apiGet<ApiListResponse<Module>>(`/modules${buildListQuery(params)}`, signal);
}

export function getModule(id: number | string, include?: ModuleInclude[], signal?: AbortSignal) {
  return apiGet<ApiItemResponse<Module>>(`/modules/${id}${buildIncludeQuery(include)}`, signal);
}
