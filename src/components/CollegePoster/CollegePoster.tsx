import { Building2 } from "lucide-react";

interface CollegePosterProps {
  posterUrl?: string | null;
  name: string;
}

/**
 * Reserves the poster space for College.poster (Cloudinary upload lands here later).
 * Falls back to a branded placeholder when no image is set yet.
 */
export function CollegePoster({ posterUrl, name }: CollegePosterProps) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card dark:border-slate-800 dark:bg-slate-900">
      {posterUrl ? (
        <img src={posterUrl} alt={name} className="block h-auto w-full object-contain" />
      ) : (
        <div className="flex aspect-[3/4] w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 px-6 text-center">
          <span className="flex size-16 items-center justify-center rounded-2xl bg-white/15">
            <Building2 className="size-8 text-white" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <p className="text-sm font-medium text-white/90">{name}</p>
        </div>
      )}
    </div>
  );
}
