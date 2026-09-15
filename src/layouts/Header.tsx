import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";
import { ThemeToggle } from "../components/ThemeToggle/ThemeToggle";
import { NAV_LINKS } from "../constants/nav";
import { useTheme } from "../hooks/useTheme";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-brand-600 text-white">
            <GraduationCap className="size-5" aria-hidden="true" />
          </span>
          <span className="text-lg">EduHub</span>
        </NavLink>

        <div className="flex items-center gap-2">
          <nav aria-label="მთავარი ნავიგაცია" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <NavLink
                    to={link.href}
                    end={link.href === "/"}
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <ThemeToggle theme={theme} onToggle={toggleTheme} />

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? "მენიუს დახურვა" : "მენიუს გახსნა"}
            className="flex size-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
          >
            {isMenuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="მობილური ნავიგაცია"
          className="border-t border-slate-200 dark:border-slate-800 lg:hidden"
        >
          <ul className="flex flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  end={link.href === "/"}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
