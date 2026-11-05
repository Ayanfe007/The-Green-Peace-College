import type { Metadata } from "next";
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  type LucideIcon,
} from "lucide-react";

import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { canonicalUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Visit, call, email or WhatsApp The Green Peace School — address, phone numbers, opening hours, map and a quick contact form.",
  alternates: { canonical: canonicalUrl("/contact") },
};

const tel = (n: string) => `tel:${n.replace(/\s/g, "")}`;

const INFO_CARDS: Array<{
  icon: LucideIcon;
  title: string;
  lines: React.ReactNode;
}> = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: (
      <>
        <p>
          {siteConfig.address.street},
          <br />
          {siteConfig.address.city}, {siteConfig.address.region}
        </p>
        <a
          href={siteConfig.maps.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary underline"
        >
          Get directions →
        </a>
      </>
    ),
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: (
      <ul className="space-y-2">
        {siteConfig.phones.map((p) => (
          <li key={p.number}>
            <a href={tel(p.number)} className="font-semibold text-primary underline">
              {p.number}
            </a>
            <span className="block text-xs text-text-muted">{p.label}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: (
      <ul className="space-y-2">
        <li>
          <a href={`mailto:${siteConfig.email}`} className="break-all font-semibold text-primary underline">
            {siteConfig.email}
          </a>
          <span className="block text-xs text-text-muted">General enquiries</span>
        </li>
        <li>
          <a
            href={`mailto:${siteConfig.admissionsEmail}`}
            className="break-all font-semibold text-primary underline"
          >
            {siteConfig.admissionsEmail}
          </a>
          <span className="block text-xs text-text-muted">Admissions</span>
        </li>
      </ul>
    ),
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    lines: (
      <>
        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary underline"
        >
          Chat with us on WhatsApp
        </a>
        <p className="text-xs text-text-muted">
          We usually reply within a few minutes during opening hours.
        </p>
      </>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumb="Contact"
        title="Contact Us"
        description="Questions, visits or a simple hello — however you reach us, a real person will answer."
      />

      {/* ------------------------------- Info cards ------------------------------- */}
      <section aria-label="Contact details" className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {INFO_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.title} delay={i * 60} className="h-full">
                  <div className="h-full rounded-2xl border border-line bg-white p-6 shadow-card">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h2 className="mt-4 text-lg font-semibold text-text">{card.title}</h2>
                    <div className="mt-2 text-sm leading-relaxed text-text-muted">
                      {card.lines}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ------------------------------ Hours + map ------------------------------ */}
      <section aria-label="Opening hours and map" className="bg-background-dark py-16 sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="h-full rounded-3xl border border-line bg-white p-8 shadow-card">
              <h2 className="flex items-center gap-2.5 font-serif text-2xl text-text">
                <Clock className="h-6 w-6 text-primary" aria-hidden="true" />
                Opening Hours
              </h2>
              <dl className="mt-6 divide-y divide-line">
                {siteConfig.hours.map((h) => (
                  <div
                    key={h.days}
                    className="flex items-center justify-between gap-4 py-3.5"
                  >
                    <dt className="font-medium text-text">{h.days}</dt>
                    <dd className="text-right text-sm text-text-muted">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-xs leading-relaxed text-text-muted">
                The admissions office is on the ground floor, just inside the
                main gate. Visits are best on Tuesdays or Thursdays, 10:00am –
                12:00pm.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card">
              {/*
                The Google Maps embed comes from lib/siteConfig.ts
                (maps.embedUrl) — currently set to the school's real
                listing. Re-embed there if the pin moves.
              */}
              <iframe
                src={siteConfig.maps.embedUrl}
                title={`Map showing the location of ${siteConfig.name}`}
                className="min-h-[320px] w-full flex-1"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-text-muted">
                  {siteConfig.address.street}, {siteConfig.address.city},{" "}
                  {siteConfig.address.region}
                </p>
                <a
                  href={siteConfig.maps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border-2 border-primary px-5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                >
                  <Navigation className="h-4 w-4" aria-hidden="true" />
                  Get Directions
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------- Contact form ------------------------------- */}
      <section aria-labelledby="contact-form-heading" className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            id="contact-form-heading"
            eyebrow="Drop us a line"
            title="Send us a short message"
            description="For anything that doesn't fit a phone call. We usually reply within one school day."
          />
          <Reveal className="mx-auto mt-12 max-w-2xl">
            <div className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-10">
              <ContactForm />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
