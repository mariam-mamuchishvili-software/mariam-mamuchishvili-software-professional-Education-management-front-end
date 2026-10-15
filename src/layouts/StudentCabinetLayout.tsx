import { useCallback, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { getStudentCabinet, logoutStudent } from "../api/studentCabinet.api";
import { StudentCabinetHeader } from "../components/StudentCabinet/StudentCabinetHeader";
import { StudentCabinetSidebar } from "../components/StudentCabinet/StudentCabinetSidebar";
import { STUDENT_CABINET_BASE, STUDENT_CABINET_NAV, STUDENT_LOGIN_PATH } from "../constants/studentCabinet";
import { useAsync } from "../hooks/useAsync";
import { useTheme } from "../hooks/useTheme";
import { ErrorState } from "../partials/ErrorState";
import { LoadingState } from "../partials/LoadingState";
import type { StudentCabinetContext, StudentCabinetData } from "../types/studentCabinet.types";
import { clearStudentToken, getStudentToken } from "../utils/studentSession";

/**
 * Shell for /student-cabinet/*: sidebar + header + routed page. Loads `/api/me/student/cabinet`
 * once and shares it with every page through the outlet context.
 *
 * Sign-in is temporarily optional: without a token the backend answers as its demo student
 * (STUDENT_CABINET_DEMO_ID). A token from the login page, when present, is still used.
 */
export function StudentCabinetLayout() {
  const [token] = useState(getStudentToken);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const state = useAsync((signal) => getStudentCabinet(token, signal), [token, reloadKey]);
  // Cabinet as changed from its pages since the last load; cleared whenever the data is reloaded.
  const [edited, setEdited] = useState<StudentCabinetData | null>(null);
  const loaded = state.status === "success" ? state.data : undefined;
  const data = edited ?? loaded;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEdited(null);
  }, [reloadKey]);

  const updateCabinet = useCallback(
    (updater: (data: StudentCabinetData) => StudentCabinetData) =>
      setEdited((prev) => {
        const base = prev ?? loaded;
        return base ? updater(base) : prev;
      }),
    [loaded],
  );

  const signOut = useCallback(() => {
    if (!token) return;
    // Revoke the token server-side, but sign out locally even if that request fails.
    logoutStudent(token).catch(() => {});
    clearStudentToken();
    navigate(STUDENT_LOGIN_PATH, { replace: true });
  }, [navigate, token]);

  // An expired/revoked token (401) or a token that isn't a student's (403) means signing in again.
  // Without a token there is nothing to renew, so the error is shown instead.
  const isUnauthorized =
    Boolean(token) && state.status === "error" && (state.errorStatus === 401 || state.errorStatus === 403);
  useEffect(() => {
    if (isUnauthorized) {
      clearStudentToken();
      navigate(STUDENT_LOGIN_PATH, { replace: true, state: { expired: true } });
    }
  }, [isUnauthorized, navigate]);

  const path = pathname.replace(/\/+$/, "") || STUDENT_CABINET_BASE;
  const section = STUDENT_CABINET_NAV.find((item) => item.href === path)?.section ?? "გვერდი ვერ მოიძებნა";

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

  const context = useMemo<StudentCabinetContext | undefined>(
    () => (data ? { data, token, updateCabinet, signOut, theme, toggleTheme } : undefined),
    [data, token, updateCabinet, signOut, theme, toggleTheme],
  );

  return (
    <div className="min-h-svh bg-slate-50 dark:bg-slate-950">
      <StudentCabinetSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex min-h-svh min-w-0 flex-col lg:pl-72">
        <StudentCabinetHeader
          section={section}
          student={data?.profile}
          subtitle={data?.current_studies.groups[0]?.name ?? data?.current_studies.colleges[0]?.name}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onSignOut={token ? signOut : undefined}
          isSidebarOpen={isSidebarOpen}
        />

        <main className="mx-auto w-full max-w-7xl min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {(state.status === "loading" || isUnauthorized) && <LoadingState label="კაბინეტი იტვირთება..." />}
          {state.status === "error" && !isUnauthorized && (
            <ErrorState message={state.error} onRetry={() => setReloadKey((key) => key + 1)} />
          )}
          {context && <Outlet context={context} />}
        </main>
      </div>
    </div>
  );
}
