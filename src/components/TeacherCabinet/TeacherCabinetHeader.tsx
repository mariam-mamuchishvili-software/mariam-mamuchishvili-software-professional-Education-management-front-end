import { Bell, ChevronDown, ChevronRight, Home, Menu, Settings, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { TEACHER_CABINET_BASE } from "../../constants/teacherCabinet";
import type { Theme } from "../../hooks/useTheme";
import type { Teacher } from "../../types/teacher.types";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { TeacherAvatar } from "./TeacherAvatar";

interface TeacherCabinetHeaderProps {
  section: string;
  teacher?: Pick<Teacher, "first_name" | "last_name" | "image" | "specialization">;
  theme: Theme;
  onToggleTheme: () => void;
  onOpenSidebar: () => void;
  isSidebarOpen: boolean;
}

const MENU_ITEM =
  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700/60 dark:hover:text-white";

export function TeacherCabinetHeader({
  section,
  teacher,
  theme,
  onToggleTheme,
  onOpenSidebar,
  isSidebarOpen,
}: TeacherCabinetHeaderProps) {
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

  const fullName = teacher ? `${teacher.first_name} ${teacher.last_name}` : "";

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
          <h1 className="truncate text-base font-semibold sm:text-lg">მასწავლებლის კაბინეტი</h1>
          <nav aria-label="ნავიგაციის ბილიკი" className="hidden sm:block">
            <ol className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <Link
                  to={TEACHER_CABINET_BASE}
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

          <button
            type="button"
            aria-label="შეტყობინებები (3 ახალი)"
            title="შეტყობინებები"
            className="relative flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <Bell className="size-4.5" aria-hidden="true" />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-800" />
          </button>

          {teacher && (
            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={isMenuOpen}
                className="flex items-center gap-2 rounded-xl p-1 pr-1.5 transition-colors hover:bg-slate-100 sm:pr-2 dark:hover:bg-slate-800"
              >
                <TeacherAvatar teacher={teacher} size="sm" />
                <span className="hidden max-w-40 text-left leading-tight md:block">
                  <span className="block truncate text-sm font-semibold text-slate-900 dark:text-white">{fullName}</span>
                  {teacher.specialization && (
                    <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
                      {teacher.specialization}
                    </span>
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
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">დემო მასწავლებელი</p>
                  </div>
                  <div className="pt-1.5">
                    <Link
                      role="menuitem"
                      to={`${TEACHER_CABINET_BASE}/profile`}
                      onClick={() => setIsMenuOpen(false)}
                      className={MENU_ITEM}
                    >
                      <UserRound className="size-4" aria-hidden="true" />
                      პროფილი
                    </Link>
                    <Link
                      role="menuitem"
                      to={`${TEACHER_CABINET_BASE}/settings`}
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
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
