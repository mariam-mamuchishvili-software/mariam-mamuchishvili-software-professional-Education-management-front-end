import type { Group, GroupInclude } from "../types/group.types";
import { apiGet, buildIncludeQuery, buildListQuery, type ListParams } from "./client";
import type { ApiItemResponse, ApiListResponse } from "./types";

export function getGroups(params?: ListParams, signal?: AbortSignal) {
  return apiGet<ApiListResponse<Group>>(`/groups${buildListQuery(params)}`, signal);
}

export function getGroup(id: number | string, include?: GroupInclude[], signal?: AbortSignal) {
  return apiGet<ApiItemResponse<Group>>(`/groups/${id}${buildIncludeQuery(include)}`, signal);
}
