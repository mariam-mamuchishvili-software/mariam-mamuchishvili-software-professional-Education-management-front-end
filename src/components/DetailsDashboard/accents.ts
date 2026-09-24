/**
 * Accent palettes for the dashboard details pages. Each entity picks an accent; class names are spelled out in full per accent so
 * Tailwind can detect them.
 */
export type DashboardAccent = "amber" | "sky" | "rose";

export const ACCENTS: Record<
  DashboardAccent,
  {
    hero: string;
    heroGlow: string;
    iconSoft: string;
    eyebrow: string;
    tileActive: string;
    tileIconActive: string;
    tileIconHover: string;
    tileCheckActive: string;
    tileCta: string;
    itemHover: string;
  }
> = {
  amber: {
    hero: "from-amber-500 via-orange-500 to-rose-500 shadow-orange-500/20 dark:from-amber-600 dark:via-orange-700 dark:to-rose-800",
    heroGlow: "bg-rose-300/25",
    iconSoft: "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300",
    eyebrow: "text-amber-600 dark:text-amber-400",
    tileActive: "border-amber-400 bg-amber-50 dark:border-amber-500/60 dark:bg-amber-500/10",
    tileIconActive: "bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-900",
    tileIconHover:
      "group-hover:bg-amber-100 group-hover:text-amber-600 dark:group-hover:bg-amber-500/15 dark:group-hover:text-amber-300",
    tileCheckActive: "border-amber-500 bg-amber-500 text-white dark:border-amber-400 dark:bg-amber-400 dark:text-slate-900",
    tileCta: "text-amber-600 dark:text-amber-400",
    itemHover: "hover:border-amber-300 hover:bg-amber-50/60 dark:hover:border-amber-500/40 dark:hover:bg-amber-500/5",
  },
  sky: {
    hero: "from-sky-500 via-blue-500 to-indigo-500 shadow-blue-500/20 dark:from-sky-600 dark:via-blue-700 dark:to-indigo-800",
    heroGlow: "bg-indigo-300/25",
    iconSoft: "bg-sky-100 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300",
    eyebrow: "text-sky-600 dark:text-sky-400",
    tileActive: "border-sky-400 bg-sky-50 dark:border-sky-500/60 dark:bg-sky-500/10",
    tileIconActive: "bg-sky-500 text-white dark:bg-sky-400 dark:text-slate-900",
    tileIconHover:
      "group-hover:bg-sky-100 group-hover:text-sky-600 dark:group-hover:bg-sky-500/15 dark:group-hover:text-sky-300",
    tileCheckActive: "border-sky-500 bg-sky-500 text-white dark:border-sky-400 dark:bg-sky-400 dark:text-slate-900",
    tileCta: "text-sky-600 dark:text-sky-400",
    itemHover: "hover:border-sky-300 hover:bg-sky-50/60 dark:hover:border-sky-500/40 dark:hover:bg-sky-500/5",
  },
  rose: {
    hero: "from-rose-500 via-pink-500 to-fuchsia-500 shadow-pink-500/20 dark:from-rose-600 dark:via-pink-700 dark:to-fuchsia-800",
    heroGlow: "bg-fuchsia-300/25",
    iconSoft: "bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300",
    eyebrow: "text-rose-600 dark:text-rose-400",
    tileActive: "border-rose-400 bg-rose-50 dark:border-rose-500/60 dark:bg-rose-500/10",
    tileIconActive: "bg-rose-500 text-white dark:bg-rose-400 dark:text-slate-900",
    tileIconHover:
      "group-hover:bg-rose-100 group-hover:text-rose-600 dark:group-hover:bg-rose-500/15 dark:group-hover:text-rose-300",
    tileCheckActive: "border-rose-500 bg-rose-500 text-white dark:border-rose-400 dark:bg-rose-400 dark:text-slate-900",
    tileCta: "text-rose-600 dark:text-rose-400",
    itemHover: "hover:border-rose-300 hover:bg-rose-50/60 dark:hover:border-rose-500/40 dark:hover:bg-rose-500/5",
  },
};

/** Hover classes for a relation list item in the given accent. */
export function itemHoverClasses(accent: DashboardAccent) {
  return ACCENTS[accent].itemHover;
}

/** Soft icon-badge classes in the given accent. */
export function iconSoftClasses(accent: DashboardAccent) {
  return ACCENTS[accent].iconSoft;
}
