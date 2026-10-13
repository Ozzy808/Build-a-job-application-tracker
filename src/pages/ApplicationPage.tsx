import { Link, useParams } from "react-router";
import { useApplications } from "../hooks/useApplications";
import { formatDate } from "../lib/applications";
import { StageBadge } from "../components/StageBadge";

export function ApplicationPage() {
  const { id } = useParams();
  const { applications, loading, error } = useApplications();

  const application = applications.find((item) => item.id === id);

  if (loading) {
    return <p className="rounded-md border p-4">Loading application...</p>;
  }

  if (error) {
    return <p role="alert" className="rounded-md border border-red-500 p-4">{error}</p>;
  }

  if (!application) {
    return (
      <section className="space-y-4">
        <Link to="/" className="text-sm underline">← Back to all applications</Link>
        <p className="rounded-md border border-red-500 p-4">Application not found.</p>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <Link to="/" className="text-sm underline">← Back to all applications</Link>

      <header className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-500">Application</p>
            <h1 className="text-3xl font-bold">{application.company}</h1>
          </div>
          <StageBadge stage={application.stage} />
        </div>
        <p className="text-lg text-slate-700 dark:text-slate-200">{application.role}</p>
      </header>

      <div className="grid gap-4 rounded-lg border p-4 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-slate-500">Date sent</p>
          <p>{formatDate(application.dateSent)}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-500">Link</p>
          {application.link ? (
            <a href={application.link} target="_blank" rel="noreferrer" className="text-blue-700 underline dark:text-blue-300">
              Open listing
            </a>
          ) : (
            <p>N/A</p>
          )}
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <p className="text-sm font-semibold text-slate-500">Notes</p>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-6">
          {application.notes || "No notes yet."}
        </p>
      </div>
    </section>
  );
}