import type { Stage } from "../types";

export const STAGE_LABELS: Record<Stage, string> = {
  wishlist: "Saved",
  applied: "Applied",
  interview: "Interview",
  offer: "Offer",
  closed: "Closed",
};

const STYLES: Record<Stage, string> = {
  wishlist: "bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-slate-100",
  applied: "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100",
  interview: "bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-100",
  offer: "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100",
  closed: "bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100",
};

export function StageBadge({ stage }: { stage: Stage }) {
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold uppercase ${STYLES[stage]}`}>
      {STAGE_LABELS[stage]}
    </span>
  );
}