"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Send, TriangleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import {
  GRADES,
  quickEnquirySchema,
  type QuickEnquiryInput,
} from "@/lib/validation";

type Status = "idle" | "success" | "error";

/**
 * Quick enquiry form (home page) — name, phone, class and an optional
 * message. Posts to /api/enquiry and is validated server-side with the
 * same shared zod schema (lib/validation.ts) as every other form.
 */
export function QuickEnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuickEnquiryInput>({
    resolver: zodResolver(quickEnquirySchema),
    mode: "onTouched",
    defaultValues: { name: "", phone: "", grade: "", message: "" },
  });

  async function onSubmit(data: QuickEnquiryInput) {
    setStatus("idle");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error ?? "We could not send your enquiry.");
      }
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-primary-200 bg-primary-50 p-8 text-center sm:p-10"
      >
        <CheckCircle2
          className="mx-auto h-12 w-12 text-primary"
          aria-hidden="true"
        />
        <h3 className="mt-4 font-serif text-2xl text-text">
          Enquiry sent. Thank you!
        </h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-text-muted">
          Our admissions team will call you back within one to two school
          days.
        </p>
        <div className="mt-8">
          <Button variant="outline" onClick={() => setStatus("idle")}>
            Send another enquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-busy={isSubmitting}
    >
      {status === "error" && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <TriangleAlert
            className="mt-0.5 h-5 w-5 shrink-0"
            aria-hidden="true"
          />
          <p>
            <strong>Something went wrong.</strong> Your enquiry was not
            sent. Please try again, or call us directly.
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="enquiryName"
          label="Your name"
          required
          placeholder="e.g. Adaeze Adeyemi"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <FormField
          id="enquiryPhone"
          label="Phone number"
          type="tel"
          required
          placeholder="e.g. 0803 123 4567"
          autoComplete="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <FormField
          id="enquiryGrade"
          label="Class you are enquiring about"
          required
          as="select"
          className="sm:col-span-2"
          error={errors.grade?.message}
          {...register("grade")}
        >
          <option value="">Select a class</option>
          {GRADES.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </FormField>
        <FormField
          id="enquiryMessage"
          label="Message (optional)"
          as="textarea"
          className="sm:col-span-2"
          placeholder="Anything we should know before we call?"
          error={errors.message?.message}
          {...register("message")}
        />
      </div>

      {/* Honeypot — hidden from humans, tempting for bots. */}
      <div
        className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="enquiryWebsite">Leave this field empty</label>
        <input
          id="enquiryWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="mt-7">
        <Button
          type="submit"
          variant="gold"
          size="lg"
          loading={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            "Sending…"
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              Send Enquiry
            </>
          )}
        </Button>
        <p className="mt-3 text-xs text-text-muted">
          Ready to apply? The{" "}
          <Link href="/admissions" className="underline hover:text-text">
            full admission form
          </Link>{" "}
          covers everything in one go.
        </p>
      </div>
    </form>
  );
}
