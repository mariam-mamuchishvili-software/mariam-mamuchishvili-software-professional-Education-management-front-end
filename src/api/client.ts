const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
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

async function request<T>(path: string, init: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: { Accept: "application/json", ...init.headers },
    });
  } catch {
    throw new ApiError("სერვერთან დაკავშირება ვერ მოხერხდა.", 0);
  }

  if (!response.ok) {
    let message = `მოთხოვნა ვერ შესრულდა (${response.status}).`;
    try {
      const body = (await response.json()) as { message?: string };
      if (body?.message) message = body.message;
    } catch {
      // response body wasn't JSON — keep the default message
    }
    throw new ApiError(message, response.status);
  }

  return (await response.json()) as T;
}

export function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
  return request<T>(path, { signal });
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
): Promise<T> {
  if (method !== "POST") body.set("_method", method);
  return request<T>(path, { method: "POST", body, signal });
}
