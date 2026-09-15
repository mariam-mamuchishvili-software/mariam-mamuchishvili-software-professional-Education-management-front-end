import { useEffect, useState } from "react";
import { ApiError } from "../api/client";

type AsyncState<T> =
  | { status: "loading"; data?: undefined; error?: undefined; errorStatus?: undefined }
  | { status: "error"; data?: undefined; error: string; errorStatus: number }
  | { status: "success"; data: T; error?: undefined; errorStatus?: undefined };

/**
 * Runs an async fetcher whenever `deps` change, cancelling the previous
 * request in flight so late responses can't overwrite fresher state.
 */
export function useAsync<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  deps: React.DependencyList,
): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    // Reset to loading immediately so pagination/param changes show a
    // spinner right away instead of stale data from the previous request.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ status: "loading" });

    fetcher(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setState({ status: "success", data });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        const message =
          error instanceof ApiError ? error.message : "დაფიქსირდა მოულოდნელი შეცდომა.";
        const errorStatus = error instanceof ApiError ? error.status : 0;
        setState({ status: "error", error: message, errorStatus });
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
