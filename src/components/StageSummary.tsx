import type { Stage } from "../types";
import { STAGES } from "../lib/applications";
import { STAGE_LABELS } from "./StageBadge";

export function StageSummary({ counts }: { counts: Record<Stage, number> }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {STAGES.map((s) => (
        <li key={s} className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-900/[0.03] dark:border-slate-800 dark:bg-slate-900">
          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{STAGE_LABELS[s]}</span>
          <strong className="mt-2 block text-3xl font-bold tracking-tight text-[#14213d] dark:text-white">{counts[s]}</strong>
          <span className="mt-1 block text-xs text-slate-400">{counts[s] === 1 ? "opportunity" : "opportunities"}</span>
        </li>
      ))}
    </ul>
  );
}