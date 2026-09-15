import { Moon, Sun } from "lucide-react";
import type { Theme } from "../../hooks/useTheme";

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? "ღია რეჟიმზე გადართვა" : "მუქ რეჟიმზე გადართვა"}
      title={isDark ? "ღია რეჟიმი" : "მუქი რეჟიმი"}
      className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
    >
      <Sun
        className={`absolute size-4.5 transition-all duration-300 ${
          isDark ? "-translate-y-6 opacity-0" : "translate-y-0 opacity-100"
        }`}
        aria-hidden="true"
      />
      <Moon
        className={`absolute size-4.5 transition-all duration-300 ${
          isDark ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
        aria-hidden="true"
      />
    </button>
  );
}
