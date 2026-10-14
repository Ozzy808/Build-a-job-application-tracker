import { Link, Outlet } from "react-router";
import { Plus } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Layout() {
  return (
    <div className="min-h-screen bg-[#f4f7fc] text-slate-900 dark:bg-[#0b1220] dark:text-slate-100">
      <header className="bg-[#101b33] text-white shadow-lg shadow-slate-900/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Link to="/" className="group flex items-center gap-3 rounded-lg">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-lg shadow-blue-500/25">
              <svg viewBox="0 0 64 64" aria-label="Ozzy" role="img" className="size-12">
                <path
                  d="M32 4 56 18v28L32 60 8 46V18L32 4Z"
                  fill="none"
                  stroke="#8CC84B"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
                <text
                  x="32"
                  y="36"
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="13"
                  fontWeight="700"
                  fontFamily="Arial, sans-serif"
                >
                  Ozzy
                </text>
              </svg>
            </span>
            <span>
              <span className="block text-lg font-bold tracking-tight">Applied</span>
              <span className="hidden text-xs text-slate-400 sm:block">Job search, organized</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Link to="/new" className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-3 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-950/20 transition hover:bg-blue-400 sm:px-4">
              <Plus size={17} />
              <span className="hidden sm:inline">Add application</span>
              <span className="sm:hidden">Add</span>
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <Outlet />
      </main>
      <footer className="mx-auto max-w-6xl px-4 pb-8 text-center text-xs text-slate-400 sm:px-6 dark:text-slate-600">
        A little more clarity for your next career move.
      </footer>
    </div>
  );
}