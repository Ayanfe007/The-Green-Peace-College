import type { Metadata } from "next";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  MessageCircle,
  PenLine,
  type LucideIcon,
} from "lucide-react";

import { InquiryForm } from "@/components/forms/InquiryForm";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { canonicalUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Admissions & Registration",
  description:
    "How to apply to The Green Peace School: the 4-step admission process, document requirements, FAQ and the registration & inquiry form.",
  alternates: { canonical: canonicalUrl("/admissions") },
};

/* TODO: confirm the process details, discounts and dates below. */

const STEPS: Array<{ icon: LucideIcon; step: string; title: string; text: string }> = [
  {
    icon: MessageCircle,
    step: "1",
    title: "Inquire",
    text: "Call, WhatsApp, visit the office or use the form above. We respond within one to two school days.",
  },
  {
    icon: PenLine,
    step: "2",
    title: "Submit Form",
    text: "Complete the registration & inquiry form (above). A small processing fee confirms your application.",
  },
  {
    icon: ClipboardCheck,
    step: "3",
    title: "Assessment & Interview",
    text: "A short, friendly assessment: play-based for Nursery, written for Primary and Secondary. Plus a chat with the child and parents.",
  },
  {
    icon: GraduationCap,
    step: "4",
    title: "Enrolment",
    text: "Receive your offer, complete the enrolment forms, pay fees and collect the uniform, books and timetable. Welcome aboard!",
  },
];

const REQUIREMENTS = [
  "Birth certificate (or official hospital birth record)",
  "Two passport-size photographs",
  "Most recent report card (if transferring from another school)",
  "Current immunization record",
  "Previous school's ID card / leave permit (where applicable)",
];

const FAQ = [
  {
    question: "When does the new academic year begin?",
    answer:
      "Classes typically begin in late September (TODO: confirm the exact date each year). We accept applications throughout the year, although mid-year entry is subject to available places in the relevant class.",
  },
  {
    question: "Can we visit the school before applying?",
    answer:
      "Yes! Guided visits run on Tuesdays and Thursdays from 10:00am to 12:00pm. Call or WhatsApp ahead so we can host you properly and answer every question.",
  },
  {
    question: "How old should my child be for Nursery 1?",
    answer:
      "Children should be at least 2 years old by the start of the term (TODO: confirm policy). If you are unsure whether your child is ready, ask us. We will advise you honestly.",
  },
  {
    question: "What happens after I submit the form?",
    answer:
      "We call or WhatsApp you within one to two school days to arrange a visit or assessment. Results follow within one week, and every offer comes with clear next steps.",
  },
  {
    question: "Do you offer sibling discounts?",
    answer:
      "Yes. 10% off for the second child and 15% for a third (TODO: confirm the current discounts). Simply mention it when you apply.",
  },
  {
    question: "What should my child bring on assessment day?",
    answer:
      "The previous report card, comfortable clothes for play, and a water bottle. We handle everything else. Just come relaxed.",
  },
];

/**
 * FAQPage structured data — mirrors the FAQ accordion below so Google
 * can show the questions as rich results (keep the two in sync when
 * editing the FAQ).
 */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function AdmissionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHeader
        crumb="Admissions"
        title="Admissions & Registration"
        description="Four simple steps stand between you and a place at The Green Peace School. Start with the form. We will walk through every step with you."
      />

      {/* --------------------------------- The form ---------------------------------
          First thing on the page: the action comes before the theory, so the
          page reads as a progression — apply → how it works → what to bring. */}
      <section
        id="inquiry-form"
        aria-labelledby="inquiry-heading"
        className="py-16 sm:py-24"
      >
        <Container>
          {/* Centered heading, then the form card, then what happens next */}
          <SectionHeading
            id="inquiry-heading"
            eyebrow="Registration & inquiry"
            title="Take the first step"
            description="Fill this form in three quick parts and our admissions team will contact you within one to two school days. No commitment, just a conversation."
          />

          <Reveal>
            <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-line bg-white p-6 text-center shadow-card sm:p-10">
              <h2 className="font-serif text-2xl text-text">
                Registration &amp; Inquiry Form
              </h2>
              <p className="mt-1 text-sm text-text-muted">
                Fields marked{" "}
                <span className="font-semibold text-red-600" aria-hidden="true">
                  *
                </span>{" "}
                <span className="sr-only">(asterisk) are</span> required.
              </p>
              <div className="mt-8 text-left">
                <InquiryForm />
              </div>
            </div>
          </Reveal>

          {/* What happens next: three short, centred reassurances */}
          <h3 className="mt-14 text-center text-sm font-bold uppercase tracking-wider text-text">
            What happens next
          </h3>
          <div className="mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-3">
            {[
              "We call or WhatsApp you to arrange a visit or assessment.",
              "You receive the outcome within one week, with clear next steps.",
              "Enrolment takes a quiet afternoon: forms, fees, uniforms, books. Done.",
            ].map((item, i) => (
              <div
                key={item}
                className="rounded-2xl border border-line bg-white p-5 text-center shadow-card"
              >
                <CheckCircle2
                  className="mx-auto h-6 w-6 text-primary"
                  aria-hidden="true"
                />
                <span className="sr-only">Step {i + 1}:</span>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">{item}</p>
              </div>
            ))}
          </div>

          {/* Prefer to talk? centred card */}
          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-line bg-white p-6 text-center shadow-card">
            <h3 className="font-semibold text-text">Prefer to talk?</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Call{" "}
              <a
                href={`tel:${siteConfig.phones[0].number.replace(/\s/g, "")}`}
                className="font-semibold text-primary underline"
              >
                {siteConfig.phones[0].number}
              </a>{" "}
              or{" "}
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary underline"
              >
                WhatsApp us
              </a>
              . We are happy to answer questions about fees, dates and the
              admission process.
            </p>
          </div>
        </Container>
      </section>

      {/* ------------------------------- The process ------------------------------- */}
      <section aria-labelledby="process-heading" className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            id="process-heading"
            eyebrow="The process"
            title="How admission works"
            description="No mystery, no queues, just four clear steps."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title} delay={i * 80} className="h-full">
                  <div className="relative h-full rounded-2xl border border-line bg-white p-6 shadow-card">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary font-serif text-lg text-white">
                        {step.step}
                      </span>
                      <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-text">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.text}</p>
                    {i < STEPS.length - 1 && (
                      <ArrowRight
                        aria-hidden="true"
                        className="absolute -right-4 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 text-accent-deep lg:block"
                      />
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ------------------------------ Requirements ------------------------------ */}
      <section aria-labelledby="requirements-heading" className="bg-background-dark py-16 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-deep">
                What to bring
              </p>
              <h2
                id="requirements-heading"
                className="mt-2 font-serif text-3xl leading-tight text-text sm:text-4xl"
              >
                Document requirements
              </h2>
              <p className="mt-4 leading-relaxed text-text-muted">
                Keep these ready when you apply. Having them on hand is the
                fastest way through the whole process.
              </p>
              <ul className="mt-6 space-y-3">
                {REQUIREMENTS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="leading-relaxed text-text">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-2xl border border-line bg-white p-4 text-sm leading-relaxed text-text-muted">
                Bring originals and photocopies. We copy on site and return
                your originals the same day.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-3xl border border-line bg-white p-8 shadow-card sm:p-10">
              <h2 className="font-serif text-2xl text-text">Frequently asked questions</h2>
              <p className="mt-2 text-sm text-text-muted">
                The questions every parent asks, answered honestly.
              </p>
              <div className="mt-6">
                <Accordion items={FAQ} />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
