import { ExternalLink, MapPin } from "lucide-react";

interface CollegeLocationMapProps {
  name: string;
  address?: string;
  latitude?: number | null;
  longitude?: number | null;
}

const COORDINATE_DELTA = 0.01;

/**
 * Uses OpenStreetMap's public embed (no API key / library needed) so the college's
 * lat/lng from the API can be shown on a map without pulling in a map dependency.
 */
export function CollegeLocationMap({ name, address, latitude, longitude }: CollegeLocationMapProps) {
  const hasCoordinates = typeof latitude === "number" && typeof longitude === "number";

  if (!hasCoordinates) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900/50">
        <MapPin className="size-6 text-slate-400 dark:text-slate-500" aria-hidden="true" />
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">მდებარეობა ჯერ არ არის მითითებული</p>
        {address && <p className="text-xs text-slate-400 dark:text-slate-500">{address}</p>}
      </div>
    );
  }

  const bbox = [
    longitude - COORDINATE_DELTA,
    latitude - COORDINATE_DELTA,
    longitude + COORDINATE_DELTA,
    latitude + COORDINATE_DELTA,
  ].join(",");
  const embedSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${latitude}%2C${longitude}`;
  const viewHref = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=16/${latitude}/${longitude}`;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
      <iframe
        title={`${name} — მდებარეობა რუკაზე`}
        src={embedSrc}
        className="h-56 w-full sm:h-64"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <a
        href={viewHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 border-t border-slate-200 bg-white py-2.5 text-xs font-medium text-brand-600 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-brand-400 dark:hover:bg-slate-800"
      >
        დიდ რუკაზე ნახვა
        <ExternalLink className="size-3.5" aria-hidden="true" />
      </a>
    </div>
  );
}
