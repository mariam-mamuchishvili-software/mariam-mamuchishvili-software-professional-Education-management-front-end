import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";

const DEFAULT_LIMIT = 12;

/**
 * Page number lives in the `page` query param so back/forward navigation
 * and shared links land on the right page. Translates to the `skip`/`limit`
 * the Laravel API actually accepts.
 */
export function usePagination(limit: number = DEFAULT_LIMIT) {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = useMemo(() => {
    const raw = Number(searchParams.get("page"));
    return Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 1;
  }, [searchParams]);

  const setPage = useCallback(
    (nextPage: number) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (nextPage <= 1) {
          next.delete("page");
        } else {
          next.set("page", String(nextPage));
        }
        return next;
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [setSearchParams],
  );

  return { page, limit, skip: (page - 1) * limit, setPage };
}
