const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

/** Laravel's 422 payload: field name → messages. */
export type ValidationErrors = Record<string, string[]>;

export class ApiError extends Error {
  status: number;
  errors: ValidationErrors;

  constructor(message: string, status: number, errors: ValidationErrors = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

export interface ListParams {
  skip?: number;
  limit?: number;
}

export function buildListQuery(params?: ListParams): string {
  if (!params) return "";

  const searchParams = new URLSearchParams();
  if (params.skip !== undefined) searchParams.set("skip", String(params.skip));
  if (params.limit !== undefined) searchParams.set("limit", String(params.limit));

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

export function buildIncludeQuery(include?: string[]): string {
  return include && include.length > 0 ? `?include=${include.join(",")}` : "";
}

/** Sanctum personal access token; sent as a Bearer header on `/api/me/*` requests. */
export type AuthToken = string | null | undefined;

async function request<T>(path: string, init: RequestInit, token?: AuthToken): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...init.headers,
      },
    });
  } catch {
    throw new ApiError("სერვერთან დაკავშირება ვერ მოხერხდა.", 0);
  }

  if (!response.ok) {
    let message = `მოთხოვნა ვერ შესრულდა (${response.status}).`;
    let errors: ValidationErrors = {};
    try {
      const body = (await response.json()) as { message?: string; errors?: ValidationErrors };
      if (body?.message) message = body.message;
      if (body?.errors) errors = body.errors;
    } catch {
      // response body wasn't JSON — keep the default message
    }
    throw new ApiError(message, response.status, errors);
  }

  return (await response.json()) as T;
}

export function apiGet<T>(path: string, signal?: AbortSignal, token?: AuthToken): Promise<T> {
  return request<T>(path, { signal }, token);
}

/** Sends a JSON body (or none, e.g. DELETE). */
export function apiSend<T>(
  path: string,
  method: "POST" | "PUT" | "PATCH" | "DELETE",
  body?: unknown,
  token?: AuthToken,
): Promise<T> {
  return request<T>(
    path,
    {
      method,
      body: body === undefined ? undefined : JSON.stringify(body),
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    },
    token,
  );
}

/**
 * Sends multipart form data (file uploads). PHP only parses multipart bodies on POST, so
 * PUT/PATCH are sent as POST with Laravel's `_method` override.
 */
export function apiSendForm<T>(
  path: string,
  body: FormData,
  method: "POST" | "PUT" | "PATCH" = "POST",
  signal?: AbortSignal,
  token?: AuthToken,
): Promise<T> {
  if (method !== "POST") body.set("_method", method);
  return request<T>(path, { method: "POST", body, signal }, token);
}
