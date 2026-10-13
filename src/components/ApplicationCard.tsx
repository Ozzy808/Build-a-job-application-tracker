import { Link } from "react-router";
import type { Application } from "../types";
import { daysSince, needsNudge, formatDate } from "../lib/applications";
import { StageBadge } from "./StageBadge";

export function ApplicationCard({ application }: { application: Application }) {
  const days = daysSince(application.dateSent);
  const nudge = needsNudge(application);

  return (
    <article className="rounded-lg border p-4 space-y-1">
      <div className="flex items-start justify-between gap-2">
        <Link to={`/applications/${application.id}`} className="hover:underline focus-visible:outline-2">
          <h3 className="font-semibold">{application.company}</h3>
        </Link>
        <StageBadge stage={application.stage} />
      </div>
      <p className="text-sm">{application.role}</p>
      <p className="text-xs opacity-80">
        Sent {formatDate(application.dateSent)} · {days} days ago
      </p>
      {nudge && <p className="text-xs font-semibold text-orange-700 dark:text-orange-300">⚠ Needs a nudge</p>}
    </article>
  );
}
1