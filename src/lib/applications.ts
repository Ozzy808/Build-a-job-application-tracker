import type { Application, Stage } from "../types";

const DAY = 1000 * 60 * 60 * 24;
export const STAGES: Stage[] = ["wishlist", "applied", "interview", "offer", "closed"];

export function daysSince(dateSent: string, today: Date = new Date()): number {
  const sent = new Date(dateSent);
  return Math.floor((today.getTime() - sent.getTime()) / DAY);
}

export function needsNudge(job: Application, today: Date = new Date()): boolean {
  if (job.stage !== "applied") return false;
  return daysSince(job.dateSent, today) > 14;
}

export function countByStage(applications: Application[]): Record<Stage, number> {
  const counts: Record<Stage, number> = { wishlist: 0, applied: 0, interview: 0, offer: 0, closed: 0 };
  for (const a of applications) counts[a.stage]++;
  return counts;
}

export function filterApplications(
  applications: Application[],
  search: string,
  stage: Stage | "all",
): Application[] {
  const q = search.trim().toLowerCase();
  return applications
    .filter((a) => stage === "all" || a.stage === stage)
    .filter((a) => !q || a.company.toLowerCase().includes(q) || a.role.toLowerCase().includes(q))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt)); // newest first, on a copy
}

export function formatDate(dateSent: string): string {
  return new Date(`${dateSent}T00:00:00`).toLocaleDateString("en-ZA", {
    day: "2-digit", month: "short", year: "numeric",
  });
}