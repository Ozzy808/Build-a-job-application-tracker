import { Link } from "react-router";
import type { Application } from "../types";
import { daysSince, needsNudge, formatDate } from "../lib/applications";
import { StageBadge } from "./StageBadge";
import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";

export function ApplicationCard({ application }: { application: Application }) {
  const days = daysSince(application.dateSent);
  const nudge = needsNudge(application);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/[0.03] transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-950/[0.06] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-900">
      <div className="mb-5 flex items-start justify-between gap-3">
        <Link to={`/applications/${application.id}`} className="min-w-0 rounded-lg">
          <span className="mb-3 flex size-11 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold uppercase text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            {application.company.slice(0, 1)}
          </span>
          <h3 className="flex items-center gap-1 font-bold tracking-tight text-slate-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-300">
            <span className="truncate">{application.company}</span>
            <ArrowUpRight size={15} className="shrink-0 opacity-0 transition group-hover:opacity-100" />
          </h3>
        </Link>
        <StageBadge stage={application.stage} />
      </div>
      <p className="mb-5 text-sm font-medium text-slate-600 dark:text-slate-300">{application.role}</p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} /> Sent {formatDate(application.dateSent)}</span>
        <span className="inline-flex items-center gap-1.5"><Clock3 size={14} /> {days} days ago</span>
      </div>
      {nudge && <p className="mt-4 inline-flex rounded-full bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">Needs a follow-up</p>}
    </article>
  );
}
1