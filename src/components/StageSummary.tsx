import type { Stage } from "../types";
import { STAGES } from "../lib/applications";
import { STAGE_LABELS } from "./StageBadge";

export function StageSummary({ counts }: { counts: Record<Stage, number> }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
      {STAGES.map((s) => (
        <li key={s}>
          {STAGE_LABELS[s]} <strong>{counts[s]}</strong>
        </li>
      ))}
    </ul>
  );
}