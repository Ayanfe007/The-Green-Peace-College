import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { canonicalUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms governing use of the The Green Peace School website, including admissions information, intellectual property and limitations of liability.",
  alternates: { canonical: canonicalUrl("/terms") },
};

const SECTIONS: Array<{ title: string; body: React.ReactNode }> = [
  {
    title: "1. Acceptance of these terms",
    body: (
      <p>
        By accessing or using {siteConfig.name}&apos;s website
        (the “Website”), you agree to be bound by these Terms &amp;
        Conditions. If you do not agree, please do not use the Website.
        These terms are in addition to our{" "}
        <Link href="/privacy" className="font-semibold text-primary underline">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/cookies" className="font-semibold text-primary underline">
          Cookie Policy
        </Link>
        , which form part of how you use the Website.
      </p>
    ),
  },
  {
    title: "2. About the school",
    body: (
      <p>
        {siteConfig.name} is a nursery, primary and secondary school
        located at {siteConfig.address.street}, {siteConfig.address.city},{" "}
        {siteConfig.address.region}, {siteConfig.address.country}. The
        Website exists to inform parents and the public about the
        school, its programmes and its admission process.
      </p>
    ),
  },
  {
    title: "3. Use of the Website",
    body: (
      <p>
        You may use the Website for lawful purposes only. You agree not to
        interfere with its normal operation, attempt to gain unauthorised
        access to any system, submit false or misleading information
        through our forms, or use the Website in any way that could damage
        it or impair other users&apos; ability to enjoy it.
      </p>
    ),
  },
  {
    title: "4. Admissions & enrolment",
    body: (
      <ul className="list-disc space-y-1.5 pl-6">
        <li>
          The admission information on this Website is provided for
          general guidance and does not constitute a formal offer of
          admission.
        </li>
        <li>
          Admission is subject to the school&apos;s published admission
          process, including an assessment/interview and the availability
          of places in the relevant class.
        </li>
        <li>
          We do not process payment or card details online. All fees are
          paid in person (or by the other means we advise) at the school
          office, with a receipt.
        </li>
        <li>
          Details submitted through our forms should be accurate.
          Admission decisions made on the basis of incorrect
          information may be withdrawn.
        </li>
      </ul>
    ),
  },
  {
    title: "5. Intellectual property",
    body: (
      <p>
        The content of this Website (including text, graphics, logos,
        icons, images and the overall design) is the property of{" "}
        {siteConfig.name} or its licensors, and is protected by
        copyright and other intellectual property laws. You may view and
        print reasonable copies for your personal, non-commercial use,
        but you may not reproduce, distribute or create derivative works
        without our prior written permission.
      </p>
    ),
  },
  {
    title: "6. Third-party links",
    body: (
      <p>
        The Website may contain links to third-party websites and
        services (for example, our social media pages and Google Maps).
        We do not control those sites and are not responsible for their
        content, accuracy or availability. Linking to them does not
        imply endorsement.
      </p>
    ),
  },
  {
    title: "7. Disclaimer",
    body: (
      <p>
        The Website is provided in good faith and “as is”. While we
        update it regularly, we do not guarantee that all information is
        complete, current or error-free. Nothing on the Website
        guarantees admission to the school or any particular academic
        result.
      </p>
    ),
  },
  {
    title: "8. Limitation of liability",
    body: (
      <p>
        To the maximum extent permitted by law, {siteConfig.name} will
        not be liable for any indirect, incidental or consequential loss
        arising from your use of, or inability to use, the Website.
        Nothing in these terms excludes liability that cannot lawfully
        be excluded.
      </p>
    ),
  },
  {
    title: "9. Changes to the Website or these terms",
    body: (
      <p>
        We may update the Website and these Terms from time to time. The
        “last updated” date below shows when this version was published.
        Continued use of the Website after changes means you accept the
        revised terms.
      </p>
    ),
  },
  {
    title: "10. Governing law",
    body: (
      <p>
        These Terms are governed by the laws of the Federal Republic of
        Nigeria. Any dispute arising from them is subject to the exclusive
        jurisdiction of the courts of {siteConfig.address.region}.
      </p>
    ),
  },
  {
    title: "11. Contact us",
    body: (
      <p>
        Questions about these Terms? Email{" "}
        <a href={`mailto:${siteConfig.email}`} className="font-semibold text-primary underline">
          {siteConfig.email}
        </a>{" "}
        or call {siteConfig.phones[0].number}.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        crumb="Terms"
        title="Terms & Conditions"
        description="The rules for using this website: admissions, fees, content and liability, in plain language."
      />
      <section className="py-16 sm:py-24">
        <Container className="max-w-3xl">
          <p className="rounded-2xl border border-accent/40 bg-accent-soft p-5 text-sm leading-relaxed text-text">
            <strong>Template notice:</strong> these terms are a starting
            point for the school. Please have them reviewed by a
            qualified Nigerian lawyer before you rely on them.{" "}
            <span className="text-text-muted">
              Last updated: 25 October 2026 (TODO: update).
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
