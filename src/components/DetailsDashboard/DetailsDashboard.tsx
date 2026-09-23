import { ArrowLeft, Check, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { ACCENTS, type DashboardAccent } from "./accents";

/** Building blocks for the "dashboard" style details pages (profession, module, …). */

export const PANEL_CLASSES =
  "rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900 sm:p-7";

export function DashboardHero({
  accent,
  icon: Icon,
  eyebrow,
  title,
  chips,
  backHref,
}: {
  accent: DashboardAccent;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  chips: { icon: LucideIcon; label: ReactNode }[];
  backHref: string;
}) {
  const colors = ACCENTS[accent];

  return (
    <header
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br p-6 text-white shadow-lg sm:p-8 dark:shadow-none ${colors.hero}`}
    >
      {/* Decorative background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-16 size-72 rounded-full bg-white/15 blur-3xl" />
        <div className={`absolute -bottom-28 -left-10 size-64 rounded-full blur-3xl ${colors.heroGlow}`} />
        <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.12)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/30 backdrop-blur-sm sm:size-16">
            <Icon className="size-7 sm:size-8" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-widest text-white/75 uppercase">{eyebrow}</p>
            <h1 className="mt-1 text-2xl leading-tight font-bold break-words sm:text-3xl">{title}</h1>
            {chips.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {chips.map(({ icon: ChipIcon, label }, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 rounded-full bg-black/15 px-3 py-1 text-xs font-medium ring-1 ring-white/20"
                  >
                    <ChipIcon className="size-3.5" aria-hidden="true" />
                    {label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <Link
          to={backHref}
          className="flex w-fit shrink-0 items-center gap-1.5 self-start rounded-xl bg-white/15 px-4 py-2 text-sm font-semibold ring-1 ring-white/30 backdrop-blur-sm transition-colors hover:bg-white/25"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          უკან
        </Link>
      </div>
    </header>
  );
}

export function PanelHeading({
  accent,
  icon: Icon,
  eyebrow,
  title,
}: {
  accent: DashboardAccent;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
}) {
  const colors = ACCENTS[accent];

  return (
    <div className="flex items-center gap-3">
      <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${colors.iconSoft}`}>
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div>
        <p className={`text-xs font-semibold tracking-wide uppercase ${colors.eyebrow}`}>{eyebrow}</p>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
      </div>
    </div>
  );
}

/** One panel: description on top, key details as small tiles below. */
export function OverviewPanel({
  accent,
  descriptionIcon,
  descriptionTitle,
  description,
  detailsIcon,
  details,
}: {
  accent: DashboardAccent;
  descriptionIcon: LucideIcon;
  descriptionTitle: string;
  description?: string;
  detailsIcon: LucideIcon;
  details: { icon: LucideIcon; label: string; value?: ReactNode }[];
}) {
  const colors = ACCENTS[accent];

  return (
    <div className={PANEL_CLASSES}>
      <PanelHeading accent={accent} icon={descriptionIcon} eyebrow="მიმოხილვა" title={descriptionTitle} />
      {description ? (
        <p className="mt-5 leading-relaxed whitespace-pre-line text-slate-600 dark:text-slate-300">{description}</p>
      ) : (
        <p className="mt-5 text-sm text-slate-400 dark:text-slate-500">აღწერა ჯერ არ არის დამატებული.</p>
      )}

      <div className="mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-950/40">
        <PanelHeading accent={accent} icon={detailsIcon} eyebrow="დეტალები" title="ძირითადი ინფორმაცია" />
        <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {details.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900"
            >
              <span className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${colors.iconSoft}`}>
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <dt className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</dt>
                <dd className="mt-0.5 text-sm font-semibold break-words text-slate-800 dark:text-slate-100">
                  {value === undefined || value === null || value === "" ? "—" : value}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

/** Clickable stat tiles that double as the ?include= toggles. */
export function RelationTiles<T extends string>({
  accent,
  tiles,
  selected,
  onToggle,
}: {
  accent: DashboardAccent;
  tiles: { key: T; label: string; icon: LucideIcon; count?: number }[];
  selected: T[];
  onToggle: (key: T) => void;
}) {
  const colors = ACCENTS[accent];
  const columns = tiles.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3";

  return (
    <section aria-label="დაკავშირებული მონაცემები">
      <div className={`grid grid-cols-1 gap-4 ${columns}`}>
        {tiles.map(({ key, label, icon: Icon, count }) => {
          const active = selected.includes(key);

          return (
            <button
              key={key}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(key)}
              className={`group relative flex items-center gap-4 rounded-2xl border p-5 text-left shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover ${
                active ? colors.tileActive : "border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900"
              }`}
            >
              <span
                className={`flex size-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
                  active
                    ? colors.tileIconActive
                    : `bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 ${colors.tileIconHover}`
                }`}
              >
                <Icon className="size-6" aria-hidden="true" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-slate-500 dark:text-slate-400">{label}</span>
                <span className="mt-0.5 block text-2xl font-bold text-slate-900 tabular-nums dark:text-white">
                  {count ?? <span className={`text-sm font-semibold ${colors.tileCta}`}>ჩვენება</span>}
                </span>
              </span>

              <span
                aria-hidden="true"
                className={`flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  active ? colors.tileCheckActive : "border-slate-300 text-transparent dark:border-slate-600"
                }`}
              >
                <Check className="size-3.5" />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export function RelationPanel({
  accent,
  icon,
  title,
  count,
  emptyText,
  children,
}: {
  accent: DashboardAccent;
  icon: LucideIcon;
  title: string;
  count: number;
  emptyText: string;
  children: ReactNode;
}) {
  return (
    <section className={PANEL_CLASSES}>
      <div className="flex items-center justify-between gap-3">
        <PanelHeading accent={accent} icon={icon} eyebrow="დაკავშირებული" title={title} />
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600 tabular-nums dark:bg-slate-800 dark:text-slate-300">
          {count}
        </span>
      </div>
      <div className="mt-6">
        {count > 0 ? children : <p className="text-sm text-slate-500 dark:text-slate-400">{emptyText}</p>}
      </div>
    </section>
  );
}
