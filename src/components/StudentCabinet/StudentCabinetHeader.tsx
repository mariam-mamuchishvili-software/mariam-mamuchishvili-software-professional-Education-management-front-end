import { ChevronDown, ChevronRight, Home, LogOut, Menu, Settings, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { STUDENT_CABINET_BASE } from "../../constants/studentCabinet";
import type { Theme } from "../../hooks/useTheme";
import type { StudentProfile } from "../../types/studentCabinet.types";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { StudentAvatar } from "./StudentAvatar";

interface StudentCabinetHeaderProps {
  section: string;
  student?: Pick<StudentProfile, "first_name" | "last_name" | "image" | "email">;
  /** Shown under the name, e.g. the student's current group. */
  subtitle?: string;
  theme: Theme;
  onToggleTheme: () => void;
  onOpenSidebar: () => void;
  /** Omitted when there is no session to end (demo student). */
  onSignOut?: () => void;
  isSidebarOpen: boolean;
}

const MENU_ITEM_BASE = "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors";
const MENU_ITEM = `${MENU_ITEM_BASE} text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700/60 dark:hover:text-white`;

export function StudentCabinetHeader({
  section,
  student,
  subtitle,
  theme,
  onToggleTheme,
  onOpenSidebar,
  onSignOut,
  isSidebarOpen,
}: StudentCabinetHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setIsMenuOpen(false);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const fullName = student ? `${student.first_name} ${student.last_name}` : "";

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/85">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onOpenSidebar}
          aria-label="მენიუს გახსნა"
          aria-expanded={isSidebarOpen}
          aria-controls="cabinet-sidebar"
          className="-ml-1 flex size-10 shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-semibold sm:text-lg">სტუდენტის კაბინეტი</h1>
          <nav aria-label="ნავიგაციის ბილიკი" className="hidden sm:block">
            <ol className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <Link
                  to={STUDENT_CABINET_BASE}
                  className="transition-colors hover:text-brand-600 dark:hover:text-brand-400"
                >
                  დაფა
                </Link>
              </li>
              <li className="flex min-w-0 items-center gap-1.5">
                <ChevronRight className="size-3 shrink-0 text-slate-300 dark:text-slate-600" aria-hidden="true" />
                <span className="truncate font-medium text-slate-700 dark:text-slate-200" aria-current="page">
                  {section}
                </span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />

          {student && (
            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={isMenuOpen}
                className="flex items-center gap-2 rounded-xl p-1 pr-1.5 transition-colors hover:bg-slate-100 sm:pr-2 dark:hover:bg-slate-800"
              >
                <StudentAvatar student={student} size="sm" />
                <span className="hidden max-w-40 text-left leading-tight md:block">
                  <span className="block truncate text-sm font-semibold text-slate-900 dark:text-white">{fullName}</span>
                  {subtitle && (
                    <span className="block truncate text-xs text-slate-500 dark:text-slate-400">{subtitle}</span>
                  )}
                </span>
                <ChevronDown
                  className={`size-4 text-slate-400 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>

              {isMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-60 rounded-xl border border-slate-200 bg-white p-1.5 shadow-popover dark:border-slate-700 dark:bg-slate-800"
                >
                  <div className="border-b border-slate-100 px-3 py-2.5 dark:border-slate-700">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{fullName}</p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">{student.email}</p>
                  </div>
                  <div className="pt-1.5">
                    <Link
                      role="menuitem"
                      to={`${STUDENT_CABINET_BASE}/profile`}
                      onClick={() => setIsMenuOpen(false)}
                      className={MENU_ITEM}
                    >
                      <UserRound className="size-4" aria-hidden="true" />
                      პროფილი
                    </Link>
                    <Link
                      role="menuitem"
                      to={`${STUDENT_CABINET_BASE}/settings`}
                      onClick={() => setIsMenuOpen(false)}
                      className={MENU_ITEM}
                    >
                      <Settings className="size-4" aria-hidden="true" />
                      პარამეტრები
                    </Link>
                    <Link role="menuitem" to="/" onClick={() => setIsMenuOpen(false)} className={MENU_ITEM}>
                      <Home className="size-4" aria-hidden="true" />
                      EduHub მთავარი
                    </Link>
                  </div>
                  {onSignOut && (
                    <div className="mt-1.5 border-t border-slate-100 pt-1.5 dark:border-slate-700">
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setIsMenuOpen(false);
                          onSignOut();
                        }}
                        className={`${MENU_ITEM_BASE} text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:text-rose-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-300`}
                      >
                        <LogOut className="size-4" aria-hidden="true" />
                        გასვლა
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
