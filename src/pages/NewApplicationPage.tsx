import { useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import type { Stage } from "../types";
import { useApplications } from "../hooks/useApplications";
import { STAGES } from "../lib/applications";
import { STAGE_LABELS } from "../components/StageBadge";
import { ArrowLeft, Check, Sparkles } from "lucide-react";

type FormValues = {
  company: string; role: string; link: string;
  dateSent: string; stage: Stage; notes: string;
};

const todayString = () => new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD, local time

function Field({ id, label, error, children }: {
  id: string; label: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-slate-700 dark:text-slate-200">{label}</label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="text-sm text-rose-700 dark:text-rose-300">{error}</p>}
    </div>
  );
}

const inputClass = "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 aria-[invalid=true]:border-rose-500 dark:border-slate-700 dark:bg-slate-950 dark:focus:bg-slate-950";

export function NewApplicationPage() {
  const navigate = useNavigate();
  const { add } = useApplications();
  const {
    register, handleSubmit, formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { company: "", role: "", link: "", dateSent: todayString(), stage: "wishlist", notes: "" },
  });

  // useRef on a DOM node: focus the first field when the form opens
  const companyRef = useRef<HTMLInputElement | null>(null);
  const { ref: companyFormRef, ...companyProps } = register("company", {
    required: "Company is required",
    minLength: { value: 2, message: "Company is required" },
  });

  async function onSubmit(v: FormValues) {
    await add({
      company: v.company.trim(),
      role: v.role.trim(),
      link: v.link.trim() || undefined,
      dateSent: v.dateSent,
      stage: v.stage,
      notes: v.notes.trim() || undefined,
    });
    navigate("/");
  }

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <Link to="/" className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-slate-500 transition hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"><ArrowLeft size={16} /> Back to opportunities</Link>
      <header className="rounded-3xl bg-gradient-to-br from-[#14213d] to-[#1d3b70] px-6 py-7 text-white sm:px-8">
        <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-blue-200"><Sparkles size={14} /> NEW OPPORTUNITY</span>
        <h1 className="text-3xl font-bold tracking-tight">Add an application</h1>
        <p className="mt-2 text-sm text-blue-100/75">Capture the details now, keep your next step clear.</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/[0.03] sm:p-8 dark:border-slate-800 dark:bg-slate-900">
        <Field id="company" label="Company" error={errors.company?.message}>
          <input
            id="company"
            className={inputClass}
            autoFocus={false}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "company-error" : undefined}
            {...companyProps}
            ref={(el) => { companyFormRef(el); companyRef.current = el; }}
          />
        </Field>
        {/* the focus-on-open effect */}
        <FocusOnMount target={companyRef} />

        <Field id="role" label="Job title" error={errors.role?.message}>
          <input id="role" className={inputClass}
            aria-invalid={!!errors.role}
            aria-describedby={errors.role ? "role-error" : undefined}
            {...register("role", {
              required: "Job title is required",
              minLength: { value: 2, message: "Job title is required" },
            })} />
        </Field>

        <Field id="link" label="Link to the advert (optional)" error={errors.link?.message}>
          <input id="link" className={inputClass} placeholder="https://careers.example.com/…"
            aria-invalid={!!errors.link}
            aria-describedby={errors.link ? "link-error" : undefined}
            {...register("link", {
              validate: (v) => {
                if (!v.trim()) return true;
                try {
                  const u = new URL(v.trim());
                  return u.protocol === "http:" || u.protocol === "https:" || "That does not look like a link";
                } catch {
                  return "That does not look like a link";
                }
              },
            })} />
        </Field>

        <Field id="dateSent" label="Date sent" error={errors.dateSent?.message}>
          <input id="dateSent" type="date" className={inputClass}
            aria-invalid={!!errors.dateSent}
            aria-describedby={errors.dateSent ? "dateSent-error" : undefined}
            {...register("dateSent", {
              required: "Date sent is required",
              validate: (v) => v <= todayString() || "You cannot have sent it tomorrow",
            })} />
        </Field>

        <Field id="stage" label="Stage">
          <select id="stage" className={`${inputClass} dark:bg-slate-900`} {...register("stage")}>
            {STAGES.map((s) => <option key={s} value={s}>{STAGE_LABELS[s]}</option>)}
          </select>
        </Field>

        <Field id="notes" label="Notes (optional)">
          <textarea id="notes" rows={4} className={inputClass} {...register("notes")} />
        </Field>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end dark:border-slate-800">
          <button type="submit" disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:opacity-50">
            <Check size={17} />
            {isSubmitting ? "Saving…" : "Save application"}
          </button>
          <Link to="/" className="rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">Cancel</Link>
        </div>
      </form>
    </section>
  );
}

import { useEffect } from "react";
function FocusOnMount({ target }: { target: React.RefObject<HTMLInputElement | null> }) {
  useEffect(() => { target.current?.focus(); }, [target]);
  return null;
}