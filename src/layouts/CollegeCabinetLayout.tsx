import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import { getCollegeCabinet, logoutCollege } from "../api/collegeCabinet.api";
import { CollegeCabinetHeader } from "../components/CollegeCabinet/CollegeCabinetHeader";
import { CollegeCabinetSidebar } from "../components/CollegeCabinet/CollegeCabinetSidebar";
import { COLLEGE_CABINET_BASE, COLLEGE_CABINET_NAV, COLLEGE_LOGIN_PATH } from "../constants/collegeCabinet";
import { useAsync } from "../hooks/useAsync";
import { useTheme } from "../hooks/useTheme";
import { ErrorState } from "../partials/ErrorState";
import { LoadingState } from "../partials/LoadingState";
import type { CollegeCabinetContext } from "../types/collegeCabinet.types";
import { clearCollegeToken, getCollegeToken } from "../utils/collegeSession";

/** Section of the deepest nav item the path is under, so details pages keep their list's section. */
function findSection(path: string): string {
  const item = COLLEGE_CABINET_NAV.filter(({ href }) =>
    href === COLLEGE_CABINET_BASE ? path === href : path === href || path.startsWith(`${href}/`),
  ).sort((a, b) => b.href.length - a.href.length)[0];
  return item?.section ?? "გვერდი ვერ მოიძებნა";
}

/**
 * Shell for /college-cabinet/*: sidebar + header + routed page. Loads the dashboard
 * (`/api/me/college`) once and shares it, with the token, with every page through the outlet
 * context; the other pages fetch their own lists.
 *
 * Unlike the student cabinet there is no demo fallback: without a token the backend refuses
 * every request, so the layout goes straight to the login page.
 */
export function CollegeCabinetLayout() {
  const [token] = useState(getCollegeToken);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const state = useAsync(
    (signal) => (token ? getCollegeCabinet(token, signal) : Promise.reject(new Error("no token"))),
    [token, reloadKey],
  );

  const signOut = useCallback(() => {
    // Revoke the token server-side, but sign out locally even if that request fails.
    logoutCollege(token).catch(() => {});
    clearCollegeToken();
    navigate(COLLEGE_LOGIN_PATH, { replace: true });
  }, [navigate, token]);

  // An expired/revoked token (401) or a user who is not a college member (403) means signing in again.
  const isUnauthorized = state.status === "error" && (state.errorStatus === 401 || state.errorStatus === 403);
  useEffect(() => {
    if (isUnauthorized) {
      clearCollegeToken();
      navigate(COLLEGE_LOGIN_PATH, { replace: true, state: { expired: true } });
    }
  }, [isUnauthorized, navigate]);

  const path = pathname.replace(/\/+$/, "") || COLLEGE_CABINET_BASE;
  const section = findSection(path);

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

  const data = state.status === "success" ? state.data : undefined;
  const context = useMemo<CollegeCabinetContext | undefined>(
    () => (data && token ? { data, token, signOut, theme, toggleTheme } : undefined),
    [data, token, signOut, theme, toggleTheme],
  );

  if (!token) return <Navigate to={COLLEGE_LOGIN_PATH} replace />;

  return (
    <div className="min-h-svh bg-slate-50 dark:bg-slate-950">
      <CollegeCabinetSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex min-h-svh min-w-0 flex-col lg:pl-72">
        <CollegeCabinetHeader
          section={section}
          college={data?.college}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onSignOut={signOut}
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
