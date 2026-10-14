import type { Stage } from "../types";
import { Search, SlidersHorizontal } from "lucide-react";
import { STAGES } from "../lib/applications";
import { STAGE_LABELS } from "./StageBadge";

type Props = {
  search: string;
  onSearchChange: (v: string) => void;
  stage: Stage | "all";
  onStageChange: (v: Stage | "all") => void;
};

export function FilterBar({ search, onSearchChange, stage, onStageChange }: Props) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm shadow-slate-900/[0.03] sm:flex-row dark:border-slate-800 dark:bg-slate-900">
      <label className="relative flex-1">
        <span className="sr-only">Search company or job title</span>
        <Search size={18} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search company or job title…"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:focus:bg-slate-950"
        />
      </label>
      <label className="relative sm:w-52">
        <span className="sr-only">Filter by stage</span>
        <SlidersHorizontal size={17} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <select
          value={stage}
          onChange={(e) => onStageChange(e.target.value as Stage | "all")}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950"
        >
          <option value="all">All stages</option>
          {STAGES.map((s) => (
            <option key={s} value={s}>{STAGE_LABELS[s]}</option>
          ))}
        </select>
      </label>
    </div>
  );
}