import type { Stage } from "../types";
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
    <div className="flex flex-col gap-2 sm:flex-row">
      <label className="flex-1">
        <span className="sr-only">Search company or job title</span>
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search company or job title…"
          className="w-full rounded-md border bg-transparent p-2"
        />
      </label>
      <label>
        <span className="sr-only">Filter by stage</span>
        <select
          value={stage}
          onChange={(e) => onStageChange(e.target.value as Stage | "all")}
          className="w-full rounded-md border bg-transparent p-2 dark:bg-slate-900"
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