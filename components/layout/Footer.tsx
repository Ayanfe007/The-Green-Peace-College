import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { FacebookIcon, InstagramIcon, XIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { resolveFooterLogo } from "@/lib/logo";
import { siteConfig } from "@/lib/siteConfig";
import { Logo } from "./Logo";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/contact", label: "Contact" },
] as const;

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/cookies", label: "Cookie Policy" },
] as const;

const SOCIALS = [
  { label: "Facebook", href: siteConfig.social.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: siteConfig.social.instagram, Icon: InstagramIcon },
  { label: "X (formerly Twitter)", href: siteConfig.social.x, Icon: XIcon },
  { label: "YouTube", href: siteConfig.social.youtube, Icon: YoutubeIcon },
];

/**
 * Footer — deep green, with brand + tagline, quick links, contact
 * details, opening hours, social icons and copyright.
 * Server Component: resolves the real logo at build time (if any).
 */
export function Footer() {
  // Build-time resolution: use logo-light.* if supplied, else logo.*,
  // else the text wordmark (see lib/logo.ts).
  const footerLogo = resolveFooterLogo();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-primary-100">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Link href="/" aria-label="The Green Peace School — back to home" className="inline-block rounded-lg">
            <Logo src={footerLogo?.src ?? null} />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-200">
            {siteConfig.tagline} A warm, values-driven community in{" "}
            {siteConfig.address.city}.
          </p>
          <p className="mt-2 text-xs italic text-primary-300">
            “Knowledge, Development &amp; Prosperity” — our motto.
          </p>
          <ul className="mt-5 flex gap-3" aria-label="Social media">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${siteConfig.name} on ${label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent hover:text-primary-900"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
            Quick Links
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span>
                {siteConfig.address.street},
                <br />
                {siteConfig.address.city}, {siteConfig.address.region}
              </span>
            </li>
            {siteConfig.phones.map((p) => (
              <li key={p.number} className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <a
                  href={`tel:${p.number.replace(/\s/g, "")}`}
                  className="rounded transition-colors hover:text-white"
                >
                  {p.number}
                </a>
              </li>
            ))}
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <a
                href={`mailto:${siteConfig.email}`}
                className="rounded transition-colors hover:text-white"
              >
                {siteConfig.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MessageCircle
                className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                aria-hidden="true"
              />
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded transition-colors hover:text-white"
              >
                WhatsApp: {siteConfig.whatsapp}
              </a>
            </li>
          </ul>
        </div>

        {/* Opening hours */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
            Opening Hours
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            {siteConfig.hours.map((h) => (
              <div key={h.days}>
                <dt className="font-medium text-white">{h.days}</dt>
                <dd className="text-primary-200">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs sm:flex-row">
          <div className="text-center sm:text-left">
            <p>© {year} {siteConfig.name}. All rights reserved.</p>
            <p className="mt-0.5 text-primary-300">
              Nurturing minds since {siteConfig.foundedYear}.
            </p>
          </div>
          <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded text-primary-200 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </Container>
      </div>
    </footer>
  );
}
