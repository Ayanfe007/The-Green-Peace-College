import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { canonicalUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How The Green Peace School's website uses cookies — in short: no tracking or advertising cookies, and one third-party map on the Contact page.",
  alternates: { canonical: canonicalUrl("/cookies") },
};

const SECTIONS: Array<{ title: string; body: React.ReactNode }> = [
  {
    title: "1. What cookies are",
    body: (
      <p>
        Cookies are small text files that a website stores on your
        device so it can remember things between visits — like your
        preferences. You can see and manage cookies in your browser
        settings at any time.
      </p>
    ),
  },
  {
    title: "2. Cookies used on this website",
    body: (
      <>
        <p>
          <strong>
            {siteConfig.name}&apos;s Website does not set its own
            tracking, analytics or advertising cookies.
          </strong>{" "}
          We do not run third-party ad networks and we do not sell data.
          The only place a third party may set cookies is:
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-6">
          <li>
            <strong>Google Maps</strong> — the embedded map on the{" "}
            <Link href="/contact" className="font-semibold text-primary underline">
              Contact page
            </Link>{" "}
            may set cookies when it loads. Google&apos;s use of cookies is
            described in Google&apos;s own privacy policy.
          </li>
        </ul>
        <p className="mt-3">
          Your hosting and CDN infrastructure may also store temporary
          technical data (such as cache and session information) needed
          to serve the site reliably; this is not used to profile you.
        </p>
      </>
    ),
  },
  {
    title: "3. Summary table",
    body: (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-line text-left">
              <th scope="col" className="py-2 pr-4 font-semibold text-text">Cookie</th>
              <th scope="col" className="py-2 pr-4 font-semibold text-text">Set by</th>
              <th scope="col" className="py-2 pr-4 font-semibold text-text">Purpose</th>
              <th scope="col" className="py-2 font-semibold text-text">Duration</th>
            </tr>
          </thead>
          <tbody className="text-text-muted">
            <tr className="border-b border-line">
              <td className="py-2.5 pr-4">Google Maps cookies</td>
              <td className="py-2.5 pr-4">Google (when the map loads)</td>
              <td className="py-2.5 pr-4">Map rendering and functionality</td>
              <td className="py-2.5">As set by Google</td>
            </tr>
            <tr className="border-b border-line">
              <td className="py-2.5 pr-4">Technical/cache storage</td>
              <td className="py-2.5 pr-4">Hosting/CDN</td>
              <td className="py-2.5 pr-4">Delivers the site reliably</td>
              <td className="py-2.5">Short / session</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    title: "4. How to control cookies",
    body: (
      <p>
        You can accept or block cookies through your browser settings
        (usually under “Privacy” or “Cookies”). Blocking all cookies may
        prevent the embedded map from displaying, but every other part
        of the Website — including the admission forms — works normally
        without cookies.
      </p>
    ),
  },
  {
    title: "5. Changes to this policy",
    body: (
      <p>
        We may update this Cookie Policy if the services the Website
        uses change. The “last reviewed” date below shows when this
        version was checked.
      </p>
    ),
  },
  {
    title: "6. Contact us",
    body: (
      <p>
        Questions about cookies? Email{" "}
        <a href={`mailto:${siteConfig.email}`} className="font-semibold text-primary underline">
          {siteConfig.email}
        </a>{" "}
        or call {siteConfig.phones[0].number}.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <>
      <PageHeader
        crumb="Cookies"
        title="Cookie Policy"
        description="In short: no tracking or advertising cookies — just a third-party map on the Contact page."
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
