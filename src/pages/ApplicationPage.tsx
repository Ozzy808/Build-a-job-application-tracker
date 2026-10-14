import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useApplications } from "../hooks/useApplications";
import { formatDate } from "../lib/applications";
import { StageBadge } from "../components/StageBadge";
import { ArrowLeft, CalendarDays, ExternalLink, StickyNote, Trash2 } from "lucide-react";

export function ApplicationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applications, loading, error, busy, remove } = useApplications();
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const application = applications.find((item) => item.id === id);

  async function handleDelete() {
    if (!application || !window.confirm(`Delete the application for ${application.company}? This cannot be undone.`)) {
      return;
    }

    setDeleteError(null);
    try {
      await remove(application.id);
      navigate("/");
    } catch {
      setDeleteError("Could not delete this application. Please try again.");
    }
  }

  if (loading) {
    return <p role="status" className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">Loading application...</p>;
  }

  if (error) {
    return <p role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200">{error}</p>;
  }

  if (!application) {
    return (
      <section className="space-y-4">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500"><ArrowLeft size={16} /> Back to opportunities</Link>
        <p className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200">Application not found.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl space-y-6">
      <Link to="/" className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-slate-500 transition hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"><ArrowLeft size={16} /> Back to opportunities</Link>

      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#14213d] via-[#172b50] to-[#1d3b70] px-6 py-7 text-white shadow-xl shadow-blue-950/10 sm:px-8 sm:py-9">
        <div className="absolute -right-8 -top-16 size-56 rounded-full border-[28px] border-white/[0.04]" aria-hidden="true" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">Application details</p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{application.company}</h1>
            <p className="mt-2 text-lg text-blue-100/80">{application.role}</p>
          </div>
          <StageBadge stage={application.stage} />
        </div>
      </header>

      {deleteError && (
        <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200">{deleteError}</p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400"><CalendarDays size={15} /> Date sent</p>
          <p className="font-semibold text-slate-800 dark:text-slate-100">{formatDate(application.dateSent)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400"><ExternalLink size={15} /> Listing</p>
          {application.link ? (
            <a href={application.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:underline dark:text-blue-300">
              Open job listing <ExternalLink size={14} />
            </a>
          ) : (
            <p className="font-medium text-slate-500 dark:text-slate-400">No listing link added</p>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400"><StickyNote size={15} /> Notes</p>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700 dark:text-slate-300">
          {application.notes || "No notes yet."}
        </p>
      </div>
      <div className="flex justify-end border-t border-slate-200 pt-5 dark:border-slate-800">
        <button
          type="button"
          onClick={handleDelete}
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-xl border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-50 disabled:opacity-50 dark:border-rose-900 dark:text-rose-300 dark:hover:bg-rose-950/50"
        >
          <Trash2 size={16} /> {busy ? "Deleting..." : "Delete application"}
        </button>
      </div>
    </section>
  );
}