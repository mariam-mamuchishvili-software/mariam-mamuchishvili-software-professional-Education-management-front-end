import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

interface DetailsHeaderProps {
  title: string;
  subtitle: string;
  backHref: string;
}

export function DetailsHeader({ title, subtitle, backHref }: DetailsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h1>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
      <Link
        to={backHref}
        className="flex w-fit shrink-0 items-center gap-1.5 self-start rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        უკან
      </Link>
    </div>
  );
}
