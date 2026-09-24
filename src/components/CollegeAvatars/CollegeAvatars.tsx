import { useId } from "react";
import type { College } from "../../types/college.types";

const MAX_VISIBLE_COLLEGES = 3;

/**
 * Compact, overlapping row of college logos (or initials) for entity cards.
 * Colors follow the parent card's --accent variable.
 */
export function CollegeAvatars({ colleges }: { colleges: College[] }) {
  const visible = colleges.slice(0, MAX_VISIBLE_COLLEGES);
  const hidden = colleges.slice(MAX_VISIBLE_COLLEGES);
  const tooltipId = useId();

  return (
    <div className="relative mt-4 flex items-center gap-2">
      <ul className="flex -space-x-2" aria-label="კოლეჯები">
        {visible.map((college) => (
          <li
            key={college.id}
            title={college.name}
            className="relative transition-transform duration-150 hover:z-10 hover:-translate-y-0.5 hover:scale-110"
          >
            <CollegeAvatar college={college} />
          </li>
        ))}
      </ul>

      {hidden.length > 0 && (
        <div className="group/more">
          <span
            tabIndex={0}
            aria-describedby={tooltipId}
            className="flex h-8 min-w-8 cursor-default items-center justify-center rounded-full bg-slate-100 px-2 text-xs font-semibold text-slate-600 ring-2 ring-white outline-none focus-visible:ring-[var(--accent)] dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-900"
          >
            +{hidden.length}
          </span>

          <div
            id={tooltipId}
            role="tooltip"
            className="pointer-events-none invisible absolute bottom-full left-0 z-10 mb-2 w-max max-w-full rounded-lg bg-slate-900 px-3 py-2 text-xs text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover/more:visible group-hover/more:opacity-100 group-focus-within/more:visible group-focus-within/more:opacity-100 dark:bg-slate-700"
          >
            <ul className="space-y-0.5">
              {hidden.map((college) => (
                <li key={college.id}>{college.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function CollegeAvatar({ college }: { college: College }) {
  const base =
    "flex size-8 items-center justify-center overflow-hidden rounded-full ring-2 ring-white transition-shadow duration-150 hover:ring-[var(--accent)] dark:ring-slate-900 dark:hover:ring-[var(--accent)]";

  if (college.logo) {
    return (
      <span className={`${base} bg-white`}>
        <img src={college.logo} alt={college.name} className="size-full object-contain p-0.5" loading="lazy" />
      </span>
    );
  }

  return (
    <span
      className={`${base} bg-[var(--accent)] text-xs font-bold text-white uppercase dark:text-slate-900`}
      role="img"
      aria-label={college.name}
    >
      {college.name.trim().charAt(0)}
    </span>
  );
}
