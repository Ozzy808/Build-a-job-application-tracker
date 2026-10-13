import { useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import type { Stage } from "../types";
import { useApplications } from "../hooks/useApplications";
import { STAGES } from "../lib/applications";
import { STAGE_LABELS } from "../components/StageBadge";

type FormValues = {
  company: string; role: string; link: string;
  dateSent: string; stage: Stage; notes: string;
};

const todayString = () => new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD, local time

function Field({ id, label, error, children }: {
  id: string; label: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium">{label}</label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="text-sm text-red-700 dark:text-red-300">{error}</p>}
    </div>
  );
}

const inputClass = "w-full rounded-md border bg-transparent p-2 aria-[invalid=true]:border-red-600";

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
    <section className="space-y-4">
      <Link to="/" className="text-sm underline">← Back to all applications</Link>
      <h1 className="text-2xl font-bold">Add an application</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
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

        <div className="flex gap-2">
          <button type="submit" disabled={isSubmitting}
            className="rounded-md bg-blue-700 px-4 py-2 font-semibold text-white disabled:opacity-50">
            {isSubmitting ? "Saving…" : "Save application"}
          </button>
          <Link to="/" className="rounded-md border px-4 py-2 font-semibold">Cancel</Link>
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