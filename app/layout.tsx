import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import "./globals.css";

import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { images } from "@/lib/images";
import { resolveLogo } from "@/lib/logo";
import { canonicalUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";

/*
 * Typography — loaded with next/font (zero layout shift, self-hosted):
 *  - Playfair Display → refined serif for headings (font-serif)
 *  - Inter            → clean sans-serif for body (font-sans)
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

/*
 * Global metadata. Each page adds its own title/description/canonical
 * below; the template produces "Page | The Green Peace School".
 * TODO: update siteConfig.url with the live domain (lib/siteConfig.ts).
 */

// Optional Google Search Console verification tag — set the
// GOOGLE_SITE_VERIFICATION env var (see .env.example) after verifying
// the domain in Search Console.
const siteVerification = process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  // Canonical for the home page (every other page sets its own).
  alternates: { canonical: canonicalUrl("/") },
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "school",
    "nursery school",
    "primary school",
    "secondary school",
    "Ifo",
    "Ogun State",
    "admissions",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: images.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [images.ogImage],
  },
  // Emitted only when GOOGLE_SITE_VERIFICATION is configured.
  ...(siteVerification
    ? { other: { "google-site-verification": siteVerification } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#1E4D2B",
};

/*
 * JSON-LD "School" structured data (rendered once on every page).
 * The logo entry switches automatically to /logo.svg|png once the
 * client's real logo file is dropped into /public (see lib/logo.ts).
 */
const schoolJsonLd = {
  "@context": "https://schema.org",
  "@type": "School",
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: resolveLogo()?.src
    ? `${siteConfig.url}${resolveLogo()?.src}`
    : `${siteConfig.url}${images.ogImage}`,
  image: [
    {
      "@type": "ImageObject",
      url: `${siteConfig.url}${images.ogImage}`,
      width: 1200,
      height: 630,
    },
  ],
  foundingDate: String(siteConfig.foundedYear),
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.region,
    addressCountry: "NG",
  },
  telephone: siteConfig.phones[0].number,
  email: siteConfig.email,
  sameAs: Object.values(siteConfig.social),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:30",
      closes: "16:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "12:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Resolved at build time: real logo once supplied, else null → wordmark.
  const logo = resolveLogo();

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        {/* Skip link — first focusable element for keyboard users. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-xl focus:bg-accent focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-primary-900 focus:shadow-lift"
        >
          Skip to main content
        </a>

        <ScrollToTop />
        <Navbar logoSrc={logo?.src ?? null} />

        <main id="main-content">{children}</main>

        <Footer />
        <FloatingButtons />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolJsonLd) }}
        />
      </body>
    </html>
  );
}
