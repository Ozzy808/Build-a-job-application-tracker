import { Link } from "react-router";
import { ArrowLeft, Compass } from "lucide-react";

export function NotFoundPage() {
  return (
    <section className="mx-auto max-w-xl rounded-3xl border border-slate-200/80 bg-white px-6 py-14 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <span className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300"><Compass size={26} /></span>
      <p className="text-sm font-bold tracking-widest text-blue-600 dark:text-blue-400">404</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight">That page does not exist</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">You may have followed an old link, or mistyped the address.</p>
      <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"><ArrowLeft size={16} /> Back to opportunities</Link>
    </section>
  );
}