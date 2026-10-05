import { ArrowLeft, GraduationCap, X } from "lucide-react";
import { Link, NavLink } from "react-router";
import { TEACHER_CABINET_BASE, TEACHER_CABINET_NAV } from "../../constants/teacherCabinet";

interface TeacherCabinetSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Fixed sidebar on desktop (lg+); an off-canvas drawer with a backdrop below that.
 */
export function TeacherCabinetSidebar({ isOpen, onClose }: TeacherCabinetSidebarProps) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        id="cabinet-sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:z-30 lg:translate-x-0 dark:border-slate-800 dark:bg-slate-900 ${
          isOpen ? "translate-x-0 shadow-popover" : "-translate-x-full"
        }`}
        aria-label="კაბინეტის ნავიგაცია"
      >
        <div className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-slate-200 px-5 dark:border-slate-800">
          <Link
            to={TEACHER_CABINET_BASE}
            onClick={onClose}
            className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-brand-600 text-white">
              <GraduationCap className="size-5" aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-lg">EduHub</span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">მასწავლებლის კაბინეტი</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="მენიუს დახურვა"
            className="flex size-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-500">
            მენიუ
          </p>
          <ul className="flex flex-col gap-0.5">
            {TEACHER_CABINET_NAV.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <NavLink
                  to={href}
                  end={href === TEACHER_CABINET_BASE}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`size-4.5 shrink-0 transition-colors ${
                          isActive
                            ? "text-brand-600 dark:text-brand-300"
                            : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"
                        }`}
                        aria-hidden={true}
                      />
                      <span className="truncate">{label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-slate-200 p-3 dark:border-slate-800">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-white"
          >
            <ArrowLeft className="size-4.5 shrink-0" aria-hidden="true" />
            EduHub-ზე დაბრუნება
          </Link>
        </div>
      </aside>
    </>
  );
}
