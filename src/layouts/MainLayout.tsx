import { Outlet } from "react-router";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function MainLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-slate-50 dark:bg-slate-950">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
