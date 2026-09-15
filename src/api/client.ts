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

export async function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${BASE_URL}${path}`, {
      headers: { Accept: "application/json" },
      signal,
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
