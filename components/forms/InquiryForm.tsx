"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CheckCircle2, ChevronLeft, ChevronRight, Send, TriangleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import {
  CONTACT_METHODS,
  GRADES,
  RELATIONSHIPS,
  inquirySchema,
  todayISO,
  type InquiryInput,
} from "@/lib/validation";
import { siteConfig } from "@/lib/siteConfig";

type Status = "idle" | "success" | "error";

/**
 * Registration & Inquiry form (Admissions page).
 *
 * The form is a three-step progression, one panel per step, with a progress
 * bar so parents always know where they are:
 *
 *   1. Your details      (the enquiry: who is calling, how to reach you)
 *   2. About your child  (child's name, date of birth, class applying for)
 *   3. Contact & consent (preferred contact method, questions, consent)
 *
 * Technical notes:
 *  - react-hook-form + zodResolver with the SAME schema the API route
 *    validates with (lib/validation.ts). "Continue" only validates the
 *    fields on the current step; the final submit re-validates everything.
 *  - Inline validation with clear messages, loading state, success
 *    confirmation and an error fallback. The button is disabled while
 *    submitting.
 *  - Hidden honeypot field (`website`) for spam protection.
 */

const STEPS = [
  {
    label: "Your details",
    fields: ["parentName", "relationship", "phone", "email", "address"] as const,
  },
  {
    label: "About your child",
    fields: ["childName", "childDob", "gender", "grade", "previousSchool"] as const,
  },
  {
    label: "Contact & consent",
    fields: ["contactMethod", "message", "consent"] as const,
  },
];

export function InquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [step, setStep] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    mode: "onTouched",
    defaultValues: {
      parentName: "",
      relationship: "",
      phone: "",
      email: "",
      address: "",
      childName: "",
      childDob: "",
      grade: "",
      previousSchool: "",
      message: "",
    },
  });

  /** Move to the next step after validating the current step's fields. */
  async function goNext() {
    const ok = await trigger([...STEPS[step].fields]);
    if (ok) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  async function onSubmit(data: InquiryInput) {
    setStatus("idle");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error ?? "We could not send your inquiry.");
      }
      setStatus("success");
      reset();
      setStep(0);
    } catch {
      setStatus("error");
    }
  }

  /* ---------- success confirmation (replaces the form) ---------- */
  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-primary-200 bg-primary-50 p-8 text-center sm:p-12"
      >
        <CheckCircle2 className="mx-auto h-14 w-14 text-primary" aria-hidden="true" />
        <h3 className="mt-4 font-serif text-2xl text-text">Thank you. Your inquiry is in!</h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-text-muted">
          Our admissions team will reach out within one to two school days. In
          a hurry? Call us on{" "}
          <a
            href={`tel:${siteConfig.phones[0].number.replace(/\s/g, "")}`}
            className="font-semibold text-primary underline"
          >
            {siteConfig.phones[0].number}
          </a>
          .
        </p>
        <div className="mt-8">
          <Button variant="outline" onClick={() => setStatus("idle")}>
            Send another inquiry
          </Button>
        </div>
      </div>
    );
  }

  const isLastStep = step === STEPS.length - 1;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-busy={isSubmitting}>
      {status === "error" && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p>
            <strong>Something went wrong.</strong> Your inquiry was not sent.
            Please check your connection and try again, or call us directly on{" "}
            {siteConfig.phones[0].number}.
          </p>
        </div>
      )}

      {/* --------------------------- Progression bar --------------------------- */}
      <div aria-label="Form progress">
        <ol className="flex items-center">
          {STEPS.map((s, i) => {
            const done = i < step;
            const current = i === step;
            return (
              <li key={s.label} className="flex flex-1 items-center last:flex-none">
                <span
                  aria-current={current ? "step" : undefined}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                    done || current
                      ? "border-primary bg-primary text-white"
                      : "border-line bg-white text-text-muted"
                  }`}
                >
                  {done ? <Check className="h-4 w-4" aria-hidden="true" /> : i + 1}
                </span>
                <span
                  className={`ml-2 hidden text-sm font-semibold sm:block ${
                    current ? "text-primary" : done ? "text-text" : "text-text-muted"
                  }`}
                >
                  {s.label}
                </span>
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={`mx-3 h-0.5 flex-1 rounded-full ${i < step ? "bg-primary" : "bg-line"}`}
                  />
                )}
              </li>
            );
          })}
        </ol>
        {/* Mobile: the labels are hidden, so show "Step X of 3" instead */}
        <p className="mt-2 text-sm font-semibold text-primary sm:hidden">
          Step {step + 1} of {STEPS.length}: {STEPS[step].label}
        </p>
      </div>

      {/* ------------------------------ Step 1 ------------------------------ */}
      {step === 0 && (
        <fieldset className="mt-8">
          <legend className="sr-only">Your details</legend>
          <h2 className="font-serif text-xl text-text">Your details</h2>
          <p className="mt-1 text-sm text-text-muted">
            Who is making the enquiry, and how we can reach you.
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <FormField
              id="parentName"
              label="Parent / Guardian full name"
              required
              placeholder="e.g. Adunni Okafor"
              autoComplete="name"
              error={errors.parentName?.message}
              {...register("parentName")}
            />
            <FormField
              id="relationship"
              label="Relationship to child"
              as="select"
              required
              error={errors.relationship?.message}
              {...register("relationship")}
            >
              <option value="" disabled>
                Choose…
              </option>
              {RELATIONSHIPS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </FormField>
            <FormField
              id="phone"
              label="Phone number"
              type="tel"
              required
              placeholder="e.g. 0803 123 4567"
              autoComplete="tel"
              error={errors.phone?.message}
              {...register("phone")}
            />
            <FormField
              id="email"
              label="Email address"
              type="email"
              required
              placeholder="you@example.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
            />
            <FormField
              id="address"
              label="Home address"
              className="sm:col-span-2"
              placeholder="Street, area, city"
              autoComplete="street-address"
              error={errors.address?.message}
              {...register("address")}
            />
          </div>
        </fieldset>
      )}

      {/* ------------------------------ Step 2 ------------------------------ */}
      {step === 1 && (
        <fieldset className="mt-8">
          <legend className="sr-only">About your child</legend>
          <h2 className="font-serif text-xl text-text">About your child</h2>
          <p className="mt-1 text-sm text-text-muted">
            A few details about the child you are applying for.
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <FormField
              id="childName"
              label="Child's full name"
              required
              placeholder="e.g. Adaeze Okafor"
              error={errors.childName?.message}
              {...register("childName")}
            />
            <FormField
              id="childDob"
              label="Child's date of birth"
              type="date"
              required
              max={todayISO}
              error={errors.childDob?.message}
              {...register("childDob")}
            />
            <FormField
              id="gender"
              label="Gender"
              as="select"
              error={errors.gender?.message}
              {...register("gender")}
            >
              <option value="" disabled>
                Choose…
              </option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </FormField>
            <FormField
              id="grade"
              label="Grade / class applying for"
              as="select"
              required
              error={errors.grade?.message}
              {...register("grade")}
            >
              <option value="" disabled>
                Choose…
              </option>
              {GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </FormField>
            <FormField
              id="previousSchool"
              label="Previous school (if any)"
              className="sm:col-span-2"
              placeholder="Where your child currently attends"
              error={errors.previousSchool?.message}
              {...register("previousSchool")}
            />
          </div>
        </fieldset>
      )}

      {/* ------------------------------ Step 3 ------------------------------ */}
      {step === 2 && (
        <fieldset className="mt-8">
          <legend className="sr-only">Contact and consent</legend>
          <h2 className="font-serif text-xl text-text">Contact &amp; consent</h2>
          <p className="mt-1 text-sm text-text-muted">
            The last step. Tell us how you would like to hear back.
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <FormField
              id="contactMethod"
              label="Preferred contact method"
              as="select"
              required
              error={errors.contactMethod?.message}
              {...register("contactMethod")}
            >
              <option value="" disabled>
                Choose…
              </option>
              {CONTACT_METHODS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </FormField>
            <FormField
              id="message"
              label="Message / questions"
              as="textarea"
              className="sm:col-span-2"
              placeholder="Tell us anything else we should know. Questions about fees, dates, transport, anything at all."
              error={errors.message?.message}
              {...register("message")}
            />
          </div>
          <div className="mt-6">
            <div className="flex items-start gap-3">
              <input
                id="consent"
                type="checkbox"
                aria-invalid={errors.consent ? true : undefined}
                aria-describedby={errors.consent ? "consent-error" : undefined}
                className="mt-0.5 h-5 w-5 shrink-0 rounded border-line text-primary focus:ring-2 focus:ring-primary-300"
                {...register("consent")}
              />
              <label htmlFor="consent" className="text-sm leading-relaxed text-text-muted">
                I give permission for {siteConfig.name} to contact me about
                this inquiry using the details I provided.{" "}
                <span aria-hidden="true" className="text-red-600">
                  *
                </span>
              </label>
            </div>
            {errors.consent && (
              <p
                id="consent-error"
                role="alert"
                className="mt-1.5 text-sm font-medium text-red-700"
              >
                {errors.consent.message}
              </p>
            )}
          </div>
        </fieldset>
      )}

      {/* Honeypot. Hidden from humans, tempting for bots. Never register it
          visually; the API route silently discards filled submissions. */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {/* ------------------------------ Navigation ------------------------------ */}
      <div className="mt-8 flex items-center justify-between gap-4">
        {step > 0 ? (
          <Button type="button" variant="outline" onClick={() => setStep((s) => s - 1)}>
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </Button>
        ) : (
          <span aria-hidden="true" />
        )}

        {isLastStep ? (
          <Button type="submit" variant="gold" size="lg" loading={isSubmitting}>
            {isSubmitting ? "Sending…" : (
              <>
                <Send className="h-4 w-4" aria-hidden="true" />
                Submit Inquiry
              </>
            )}
          </Button>
        ) : (
          <Button type="button" variant="gold" size="lg" onClick={goNext}>
            Continue
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        )}
      </div>

      <p className="mt-3 text-xs leading-relaxed text-text-muted">
        We respond within one to two school days. Your details are kept
        private. See our{" "}
        <Link href="/privacy" className="underline hover:text-text">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
