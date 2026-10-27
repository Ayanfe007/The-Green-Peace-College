"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Send, TriangleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { contactSchema, type ContactInput } from "@/lib/validation";

type Status = "idle" | "success" | "error";

/**
 * Short contact form (Contact page) — same validation/API pattern as
 * the admissions inquiry form (zod schema + /api/contact + honeypot).
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  async function onSubmit(data: ContactInput) {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error ?? "We could not send your message.");
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
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" aria-hidden="true" />
        <h3 className="mt-4 font-serif text-2xl text-text">Message sent — thank you!</h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-text-muted">
          We read every message and usually reply within one school day.
        </p>
        <div className="mt-8">
          <Button variant="outline" onClick={() => setStatus("idle")}>
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-busy={isSubmitting}>
      {status === "error" && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p>
            <strong>Something went wrong.</strong> Your message was not sent —
            please try again, or call us directly.
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="contactName"
          label="Your name"
          required
          placeholder="e.g. Adaeze Adeyemi"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <FormField
          id="contactPhone"
          label="Phone number"
          type="tel"
          placeholder="e.g. 0803 123 4567"
          autoComplete="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <FormField
          id="contactEmail"
          label="Email address"
          type="email"
          required
          className="sm:col-span-2"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <FormField
          id="contactMessage"
          label="Message"
          as="textarea"
          required
          className="sm:col-span-2"
          rows={5}
          placeholder="How can we help?"
          error={errors.message?.message}
          {...register("message")}
        />
      </div>

      {/* Honeypot — hidden from humans, tempting for bots. */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contactWebsite">Leave this field empty</label>
        <input
          id="contactWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="mt-7">
        <Button type="submit" variant="gold" size="lg" loading={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? "Sending…" : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              Send Message
            </>
          )}
        </Button>
        <p className="mt-3 text-xs text-text-muted">
          For admission questions, the{" "}
          <Link href="/admissions" className="underline hover:text-text">
            admissions form
          </Link>{" "}
          is the fastest route.
        </p>
      </div>
    </form>
  );
}
