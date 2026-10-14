import { useState } from "react";
import { Link } from "react-router";
import type { Stage } from "../types";
import { useApplications } from "../hooks/useApplications";
import { countByStage, filterApplications } from "../lib/applications";
import { StageSummary } from "../components/StageSummary";
import { FilterBar } from "../components/FilterBar";
import { ApplicationList } from "../components/ApplicationList";
import { ArrowRight, BriefcaseBusiness, RotateCcw, Sparkles } from "lucide-react";

export function ApplicationsPage() {
  const { applications, loading, error } = useApplications();
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState<Stage | "all">("all");

  const counts = countByStage(applications);
  const visible = filterApplications(applications, search, stage);

  if (loading) {
    return (
      <div role="status" aria-live="polite" className="space-y-4">
        <span className="sr-only">Loading</span>
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-28 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
        ))}
      </div>
    );
  }

  if (error) {
    return <p role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200">{error}</p>;
  }

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#14213d] via-[#172b50] to-[#1d3b70] px-6 py-7 text-white shadow-xl shadow-blue-950/10 sm:px-8 sm:py-9">
        <div className="absolute -right-12 -top-24 size-72 rounded-full border-[36px] border-white/[0.04]" aria-hidden="true" />
        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-300/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-blue-100">
              <Sparkles size={14} /> YOUR CAREER DASHBOARD
            </span>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Your job search,<br className="sm:hidden" /> in focus.</h1>
            <p className="mt-3 max-w-lg text-sm leading-6 text-blue-100/75 sm:text-base">
              Keep every opportunity moving forward. Here’s a snapshot of your applications.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-blue-100">
            <BriefcaseBusiness size={17} />
            <span><strong className="text-white">{applications.length}</strong> {applications.length === 1 ? "application" : "applications"} tracked</span>
          </div>
        </div>
      </section>
      <StageSummary counts={counts} />
      <section className="space-y-4">
        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#14213d] dark:text-white">Opportunities</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Search and filter your current pipeline.</p>
          </div>
          <p className="text-xs font-medium text-slate-400">{visible.length} shown</p>
        </div>
        <FilterBar search={search} onSearchChange={setSearch} stage={stage} onStageChange={setStage} />

        {applications.length === 0 ? (
          <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900">
            <span className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300"><BriefcaseBusiness size={24} /></span>
            <h3 className="text-lg font-bold">Start building your pipeline</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">Add your first opportunity and keep all the important details in one place.</p>
            <Link to="/new" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500">
              Add your first application <ArrowRight size={16} />
            </Link>
          </section>
        ) : visible.length === 0 ? (
          <section className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center dark:border-slate-800 dark:bg-slate-900">
            <p className="font-semibold">No applications match these filters.</p>
            <button
              onClick={() => {
                setSearch("");
                setStage("all");
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              <RotateCcw size={15} /> Clear filters
            </button>
          </section>
        ) : (
          <ApplicationList applications={visible} />
        )}
      </section>
    </div>
  );
}
