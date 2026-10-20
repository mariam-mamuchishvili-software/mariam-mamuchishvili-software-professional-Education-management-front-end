import { Building2 } from "lucide-react";
import type { College } from "../../types/college.types";

type LogoSize = "sm" | "md" | "xl";

const SIZE_CLASSES: Record<LogoSize, string> = {
  sm: "size-9 rounded-lg",
  md: "size-12 rounded-xl",
  xl: "size-24 rounded-2xl sm:size-28",
};

const ICON_CLASSES: Record<LogoSize, string> = {
  sm: "size-4.5",
  md: "size-5",
  xl: "size-10",
};

interface CollegeLogoProps {
  college: Pick<College, "name" | "logo">;
  size?: LogoSize;
  className?: string;
}

/** College logo on a white tile, with a brand building icon when no logo is set. */
export function CollegeLogo({ college, size = "md", className = "" }: CollegeLogoProps) {
  const base = `${SIZE_CLASSES[size]} shrink-0 ${className}`;

  if (college.logo) {
    return (
      <img
        src={college.logo}
        alt={college.name}
        className={`${base} bg-white object-contain p-1 ring-1 ring-slate-200 dark:ring-slate-700`}
      />
    );
  }

  return (
    <span
      className={`${base} flex items-center justify-center bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300`}
      aria-hidden="true"
    >
      <Building2 className={ICON_CLASSES[size]} />
    </span>
  );
}
