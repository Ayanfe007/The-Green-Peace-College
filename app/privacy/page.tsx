import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { canonicalUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How The Green Peace School collects, uses, protects and retains the personal information you share with us through this website.",
  alternates: { canonical: canonicalUrl("/privacy") },
};

const SECTIONS: Array<{ title: string; body: React.ReactNode }> = [
  {
    title: "1. Who we are",
    body: (
      <p>
        <strong>{siteConfig.name}</strong> (“the school”, “we”, “us”,
        “our”) is the data controller for the personal information
        collected through this website. We are located at{" "}
        {siteConfig.address.street}, {siteConfig.address.city},{" "}
        {siteConfig.address.region}, {siteConfig.address.country}. You can
        reach us on {siteConfig.phones[0].number} or at{" "}
        {siteConfig.email}.
      </p>
    ),
  },
  {
    title: "2. Information we collect",
    body: (
      <>
        <p>
          We collect only what you choose to share with us through the
          admissions and contact forms:
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-6">
          <li>
            Your details: full name, relationship to the child, phone
            number, email address and home address;
          </li>
          <li>
            Your child&apos;s details: full name, date of birth, gender and
            the grade you are applying for;
          </li>
          <li>
            Any previous school and any questions or messages you include.
          </li>
        </ul>
        <p className="mt-3">
          We do <strong>not</strong> collect payment or card details on
          this website, and we do not use analytics or advertising
          trackers.
        </p>
      </>
    ),
  },
  {
    title: "3. How we use your information",
    body: (
      <ul className="list-disc space-y-1.5 pl-6">
        <li>To respond to your inquiry or message;</li>
        <li>
          To arrange visits, assessments and the admission process (our
          legitimate interest in operating the school, and your consent
          given on the form);
        </li>
        <li>To communicate with you about your child after enrolment;</li>
        <li>
          To meet our legal and record-keeping obligations as a school.
        </li>
      </ul>
    ),
  },
  {
    title: "4. How long we keep it",
    body: (
      <p>
        We keep admission records for as long as they are needed for the
        admission decision and, once a child is enrolled, for the period
        required by Nigerian education record-keeping practice.
        Information from unresolved inquiries is deleted within a
        reasonable period (typically 12 months) if no admission
        materialises.
      </p>
    ),
  },
  {
    title: "5. Cookies",
    body: (
      <p>
        This website does not set its own tracking or advertising
        cookies. The Google Map shown on the Contact page may set
        cookies when it loads. See our{" "}
        <Link href="/cookies" className="font-semibold text-primary underline">
          Cookie Policy
        </Link>{" "}
        for details and how to control this.
      </p>
    ),
  },
  {
    title: "6. Who we share it with",
    body: (
      <>
        <p>
          We share personal information only with the services we use to
          run the website:
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-6">
          <li>
            Our email provider (Resend), which delivers form
            submissions to our inbox and our auto-replies to you;
          </li>
          <li>
            Our web hosting provider, which keeps the site online and
            may keep standard server logs (such as IP addresses).
          </li>
        </ul>
        <p className="mt-3">
          We never sell, rent or trade personal information, and we do
          not share it with marketers or third parties for their own
          purposes.
        </p>
      </>
    ),
  },
  {
    title: "7. Security",
    body: (
      <p>
        The website runs over encrypted HTTPS, and access to form
        submissions is limited to members of our administrative team.
        No method of transmission over the internet is 100% secure, but
        we take reasonable steps to protect the information you share
        with us.
      </p>
    ),
  },
  {
    title: "8. Children's information",
    body: (
      <p>
        This website is operated by adults for adults. Information about
        children is collected only from a parent or legal guardian, with
        the guardian&apos;s consent (given via the consent box on our
        forms), and is used solely for admission and school
        communication.
      </p>
    ),
  },
  {
    title: "9. Your rights",
    body: (
      <>
        <p>
          In line with the Nigeria Data Protection Regulation (NDPR) and
          related data protection law, you have the right to:
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-6">
          <li>Ask what personal information we hold about you;</li>
          <li>Ask us to correct inaccurate information;</li>
          <li>Ask us to delete your information (where we have no obligation to keep it);</li>
          <li>Withdraw consent at any time where processing is based on consent;</li>
          <li>Object to or restrict certain processing.</li>
        </ul>
        <p className="mt-3">
          To exercise any of these rights, email{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-semibold text-primary underline">
            {siteConfig.email}
          </a>.{" "}
          There is no fee, and we respond within 30 days. You also have
          the right to lodge a complaint with the Nigeria Data Protection
          Commission (NDPC).
        </p>
      </>
    ),
  },
  {
    title: "10. Changes to this policy",
    body: (
      <p>
        We may update this policy as the website grows or the law
        changes. The “last reviewed” date below shows when it was last
        checked.
      </p>
    ),
  },
  {
    title: "11. Contact us",
    body: (
      <p>
        Questions about this policy? Email{" "}
        <a href={`mailto:${siteConfig.email}`} className="font-semibold text-primary underline">
          {siteConfig.email}
        </a>{" "}
        or call {siteConfig.phones[0].number}.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        crumb="Privacy"
        title="Privacy Policy"
        description="How we collect, use, protect and retain the information you share with us."
      />
      <section className="py-16 sm:py-24">
        <Container className="max-w-3xl">
          <p className="rounded-2xl border border-accent/40 bg-accent-soft p-5 text-sm leading-relaxed text-text">
            <strong>Template notice:</strong> this policy is a starting
            point for the school. Please have it reviewed by a qualified
            Nigerian lawyer before you rely on it.{" "}
            <span className="text-text-muted">
              Last reviewed: 25 October 2026 (TODO: update).
            </span>
          </p>
          <div className="mt-10 space-y-10">
            {SECTIONS.map((section) => (
              <article key={section.title}>
                <h2 className="font-serif text-2xl text-text">{section.title}</h2>
                <div className="mt-3 space-y-3 leading-relaxed text-text-muted">
                  {section.body}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
