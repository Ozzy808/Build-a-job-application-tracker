import { Link, Outlet } from "react-router";
import { ThemeToggle } from "./ThemeToggle";

export function Layout() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <header className="flex items-center justify-between gap-2 border-b p-4">
        <Link to="/" className="text-xl font-bold">Applied</Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/new" className="rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white">
            + Add application
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-4xl p-4">
        <Outlet />
      </main>
    </div>
  );
}