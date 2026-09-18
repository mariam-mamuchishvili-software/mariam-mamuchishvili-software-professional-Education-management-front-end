import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
}

type PageToken = number | "ellipsis";

/** Compact page list: first, last, current ±1, "ellipsis" for gaps. */
function getPageTokens(current: number, totalPages: number): PageToken[] {
  const siblings = 1;
  const pages: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= current - siblings && i <= current + siblings)) {
      pages.push(i);
    }
  }

  const tokens: PageToken[] = [];
  let previous: number | undefined;
  for (const i of pages) {
    if (previous !== undefined && i - previous > 1) {
      tokens.push("ellipsis");
    }
    tokens.push(i);
    previous = i;
  }

  return tokens;
}

export function Pagination({ page, limit, total, onPageChange }: PaginationProps) {
  const totalPages = Math.max(Math.ceil(total / limit), 1);
  if (totalPages <= 1) return null;

  const rangeStart = total === 0 ? 0 : (page - 1) * limit + 1;
  const rangeEnd = Math.min(page * limit, total);
  const pageTokens = getPageTokens(page, totalPages);

  return (
    <nav
      aria-label="გვერდები"
      className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-800 sm:flex-row"
    >
      <p className="text-sm text-slate-500 dark:text-slate-400">
        <span className="font-medium text-slate-700 dark:text-slate-200">
          {rangeStart}–{rangeEnd}
        </span>{" "}
        / სულ {total}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="წინა გვერდი"
          className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:pointer-events-none disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:focus-visible:outline-brand-400"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">წინა</span>
        </button>

        <div className="flex items-center gap-1">
          {pageTokens.map((token, index) =>
            token === "ellipsis" ? (
              <span
                key={`ellipsis-${index}`}
                aria-hidden="true"
                className="flex size-9 select-none items-center justify-center text-sm text-slate-400 dark:text-slate-500"
              >
                …
              </span>
            ) : (
              <button
                key={token}
                type="button"
                onClick={() => onPageChange(token)}
                aria-label={`გვერდი ${token}`}
                aria-current={token === page ? "page" : undefined}
                className={
                  token === page
                    ? "flex size-9 items-center justify-center rounded-lg bg-brand-600 text-sm font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:bg-brand-500 dark:focus-visible:outline-brand-400"
                    : "flex size-9 items-center justify-center rounded-lg text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:text-slate-300 dark:hover:bg-slate-800 dark:focus-visible:outline-brand-400"
                }
              >
                {token}
              </button>
            ),
          )}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="შემდეგი გვერდი"
          className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:pointer-events-none disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:focus-visible:outline-brand-400"
        >
          <span className="hidden sm:inline">შემდეგი</span>
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}
