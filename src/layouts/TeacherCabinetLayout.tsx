import { useCallback, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { getTeacherCabinet } from "../api/teacherCabinet.api";
import { TeacherCabinetHeader } from "../components/TeacherCabinet/TeacherCabinetHeader";
import { TeacherCabinetSidebar } from "../components/TeacherCabinet/TeacherCabinetSidebar";
import { DEMO_TEACHER_ID, TEACHER_CABINET_BASE, TEACHER_CABINET_NAV } from "../constants/teacherCabinet";
import { useAsync } from "../hooks/useAsync";
import { useTheme } from "../hooks/useTheme";
import { ErrorState } from "../partials/ErrorState";
import { LoadingState } from "../partials/LoadingState";
import type { CabinetTeacher, TeacherCabinetContext } from "../types/teacherCabinet.types";

/**
 * Shell for /teacher-cabinet/*: sidebar + header + routed page. Loads the cabinet data once and
 * shares it with every page through the outlet context. No auth yet — it shows DEMO_TEACHER_ID.
 */
export function TeacherCabinetLayout() {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const state = useAsync((signal) => getTeacherCabinet(DEMO_TEACHER_ID, signal), [reloadKey]);
  // Fields saved from the cabinet since the last load; cleared whenever the data is reloaded.
  const [teacherPatch, setTeacherPatch] = useState<Partial<CabinetTeacher>>({});
  const updateTeacher = useCallback(
    (patch: Partial<CabinetTeacher>) => setTeacherPatch((prev) => ({ ...prev, ...patch })),
    [],
  );
  const data = useMemo(
    () => (state.status === "success" ? { ...state.data, teacher: { ...state.data.teacher, ...teacherPatch } } : undefined),
    [state, teacherPatch],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTeacherPatch({});
  }, [reloadKey]);

  const path = pathname.replace(/\/+$/, "") || TEACHER_CABINET_BASE;
  const section = TEACHER_CABINET_NAV.find((item) => item.href === path)?.section ?? "გვერდი ვერ მოიძებნა";

  useEffect(() => {
    if (!isSidebarOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsSidebarOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSidebarOpen]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="min-h-svh bg-slate-50 dark:bg-slate-950">
      <TeacherCabinetSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex min-h-svh min-w-0 flex-col lg:pl-72">
        <TeacherCabinetHeader
          section={section}
          teacher={data?.teacher}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          isSidebarOpen={isSidebarOpen}
        />

        <main className="mx-auto w-full max-w-7xl min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {state.status === "loading" && <LoadingState label="კაბინეტი იტვირთება..." />}
          {state.status === "error" && (
            <ErrorState message={state.error} onRetry={() => setReloadKey((key) => key + 1)} />
          )}
          {data && (
            <Outlet context={{ data, updateTeacher, theme, toggleTheme } satisfies TeacherCabinetContext} />
          )}
        </main>
      </div>
    </div>
  );
}
