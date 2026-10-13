import { useState } from "react";
import { Link } from "react-router";
import type { Stage } from "../types";
import { useApplications } from "../hooks/useApplications";
import { countByStage, filterApplications } from "../lib/applications";
import { StageSummary } from "../components/StageSummary";
import { FilterBar } from "../components/FilterBar";
import { ApplicationList } from "../components/ApplicationList";

export function ApplicationsPage() {
  const { applications, loading, error } = useApplications();
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState<Stage | "all">("all");

  const counts = countByStage(applications);
  const visible = filterApplications(applications, search, stage);

  if (loading) {
    return (
      <div role="status" aria-live="polite" className="space-y-3">
        <span className="sr-only">Loading</span>
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-20 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
        ))}
      </div>
    );
  }

  if (error) {
    return <p role="alert" className="rounded-md border border-red-500 p-4">{error}</p>;
  }

  return (
    <div className="space-y-4">
      <StageSummary counts={counts} />
      <FilterBar search={search} onSearchChange={setSearch} stage={stage} onStageChange={setStage} />

      {applications.length === 0 ? (
        <section className="space-y-3 py-10 text-center">
          <p>You have not added any applications yet.</p>
          <Link to="/new" className="inline-block rounded-md bg-blue-700 px-3 py-2 font-semibold text-white">
            Add your first application
          </Link>
        </section>
      ) : visible.length === 0 ? (
        <section className="space-y-3 py-10 text-center">
          <p>No applications match your search or filter.</p>
          <button
            onClick={() => {
              setSearch("");
              setStage("all");
            }}
            className="rounded-md border px-3 py-2 font-semibold"
          >
            Clear filters
          </button>
        </section>
      ) : (
        <ApplicationList applications={visible} />
      )}
    </div>
  );
}
