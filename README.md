# The Green Peace School — Website

A complete, production-ready marketing website built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS**. Simple, clean, warm, fast and fully responsive (mobile-first).

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. (Optional, for development) configure email — skip and the site
#    still works; submissions are logged to the server console instead.
cp .env.example .env.local      # then edit with your Resend details

# 3. Develop
npm run dev                     # http://localhost:3000

# 4. Production build + local test
npm run build
npm start
```

### Reproducing the project from scratch (reference)

This repo was scaffolded with:

```bash
npx create-next-app@14.2 green-peace-school --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
npm install lucide-react react-hook-form @hookform/resolvers@3 zod@3
npm install -D sharp            # only used by the placeholder generator
```

---

## Deployment (Vercel)

1. Push this folder to a Git repository (GitHub/GitLab/Bitbucket).
2. In Vercel: **New Project → import the repo**. Framework preset: **Next.js** (auto-detected). Build command `npm run build`, output `.next` — all defaults are fine.
3. Add the environment variables (`RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_TO`) in **Project → Settings → Environment Variables** (at least for Production).
4. Deploy.

> Note: if you drop `logo.svg`/`logo.png` (and photos) into the repo and
> redeploy, the navbar/footer automatically switch from the text
> wordmark to the real logo — no code changes needed.

---

## Email

Form submissions go to `POST /api/inquiry` and `POST /api/contact`,
validate server-side with the **same zod schema** the browser uses
(`lib/validation.ts`), then:

- **With `RESEND_API_KEY` set** → emails the school inbox
  (`EMAIL_TO`) **and** an auto-reply to the parent, via the Resend REST
  API (plain `fetch` — no extra package).
- **Without a key** → clearly-marked TODO fallback: every submission is
  logged to the server console (verified in the logs), so nothing is lost
  while you set up the key.

Prefers SMTP/Nodemailer? Swap only `lib/email.ts` — nothing else changes.

---

## What to replace (checklist)

All in one place wherever possible — search the repo for **`TODO: replace`**.

### 1. Logo — `/public`
| File | Used in | Status |
| --- | --- | --- |
| `logo.svg` or `logo.png` | Navbar + footer + JSON-LD | ✅ real crest bundled (`logo.png`, from the school's official portal) — upgrade to a higher-res/transparent version when you have one |
| `logo-light.svg` / `logo-light.png` | Footer (dark green background) — optional | not needed while `logo.png` is used |
| `app/icon.svg` | Favicon | ⬜ still the generic leaf — swap for a small crop of the crest |

### 2. Photos — `/public/images` (same file names)
`hero.jpg`, `welcome.jpg`, `about-story.jpg`, `proprietor.jpg`,
`principal.jpg`, `nursery.jpg`, `primary.jpg`, `secondary.jpg`,
`facility-library.jpg`, `facility-lab.jpg`, `facility-ict.jpg`,
`facility-playground.jpg`, `gallery-1.jpg`…`gallery-6.jpg`,
`og-image.jpg` (1200×630).

Full slot list + recommended sizes: **`public/images/README.md`**.
Paths are centralised in **`lib/images.ts`**.

### 3. School details — **`lib/siteConfig.ts`** (one file)
- Domain / `url` (also drives `metadataBase`, sitemap, robots, JSON-LD)
- Name, tagline, description, founding year
- Address, phone numbers, emails, WhatsApp number
- Opening hours, social links, Google Maps embed + directions URLs
- Home-page statistics (years, students, teachers, pass rate)

### 4. Copy
- About page: proprietor/principal names, titles, messages; team names (`app/about/page.tsx`)
- Academics: program details, subjects, schedule (`app/academics/page.tsx`)
- Admissions: process details, discounts, FAQ dates (`app/admissions/page.tsx`)
- Home testimonials (`components/sections/Testimonials.tsx`)

### 5. Environment — `.env.local`
- `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_TO` (see `.env.example`)
- Optional: `GOOGLE_SITE_VERIFICATION` (Search Console meta tag)

### 6. Legal documents — `/privacy`, `/terms`, `/cookies`
- All three are professional templates (Nigerian context: NDPR,
  governing law = Nigeria/Ogun State) with a visible "review with a
  lawyer" notice. Confirm the data-controller details and the
  "last reviewed" dates before going live.

---

## Folder structure

```
app/
  layout.tsx            Root layout: fonts, metadata, JSON-LD, skip link
  page.tsx              Home
  about/  academics/  admissions/  contact/
  privacy/  terms/  cookies/   Legal documents
  api/inquiry/route.ts  Admission inquiry endpoint (zod + email)
  api/contact/route.ts  Contact message endpoint (same pattern)
  not-found.tsx  loading.tsx  error.tsx
  sitemap.ts  robots.ts  icon.svg
components/
  layout/  Navbar, Footer, Logo, FloatingButtons (WhatsApp/call), ScrollToTop
  ui/      Button, Card, Container, SectionHeading, PageHeader, FormField,
           CTABanner, Accordion, Tag, Reveal, SocialIcons
  sections/ Hero, FeatureGrid, StatsStrip, ProgramsPreview, Testimonials
  forms/   InquiryForm, ContactForm   (react-hook-form + zod, honeypot)
lib/
  siteConfig.ts   ALL school details in one place
  images.ts       ALL image paths in one place
  logo.ts         build-time logo resolution (node:fs — server only)
  validation.ts   zod schemas shared by forms + API routes
  email.ts        Resend delivery + console TODO fallback
  utils.ts        cn() helper
public/
  images/         19 labelled placeholders + README.md
scripts/
  generate-placeholders.mjs   regenerate the placeholder JPGs
```

---

## Design system

Tailwind tokens in `tailwind.config.ts`:

| Token | Value | Use |
| --- | --- | --- |
| `primary` | `#1E4D2B` (+ light `#2F5F3E` / dark `#122F1C` + 50–950 scale) | Navbar, footer, headings, accents |
| `background` | `#FAF6EE` (+ `dark` cream) | Page background, alternating sections |
| `accent` | `#D4AF37` (+ `hover`, `deep`) | **Key buttons only** (Apply Now, Submit, Enquire…) + tiny highlights |
| `text` | `#1B2A20` (+ `muted #5B6B60`) | Body text |
| `line` | `#DEE6DC` | Subtle borders |

Gold buttons always use **dark-green text** (AA contrast). Typography:
Playfair Display (serif, headings) + Inter (sans, body) via `next/font`.
Motion: subtle scroll-in reveals + hovers, fully disabled under
`prefers-reduced-motion`.

## Accessibility & performance notes

- Skip-to-content link, one `h1` per page, logical heading order,
  labelled form fields with `aria-describedby` errors, `aria-invalid`,
  keyboard-operable menu & accordion, visible focus rings, WCAG AA
  contrast on all text colours.
- Server Components by default; `"use client"` only for Navbar, forms,
  accordion, Reveal and ScrollToTop. Minimal client JS
  (~103 kB first-load on Home).
- All images via `next/image` with `sizes`/`aspect` + `object-cover`;
  hero loads with `priority`; the map iframe is lazy with a `title`.
- Semantic landmarks (`header/nav/main/section/footer`), sitemap.xml,
  robots.txt, per-page metadata + Open Graph, JSON-LD `School` data.

## SEO checklist — implemented & verified

| # | Item | Status | Where |
| --- | --- | --- | --- |
| 1 | No `noindex` tags | ✅ verified — none present | grep the built HTML |
| 2 | Meta titles | ✅ per page | `metadata.title` in every page |
| 3 | Meta descriptions | ✅ per page | `metadata.description` in every page |
| 4 | Alt text on images | ✅ all `next/image` have meaningful alt (decorative = `alt=""`) | all pages |
| 5 | Core Web Vitals | ✅ static pages, ~103 kB first load, `priority` hero, `next/font` swap | `app/` |
| 6 | sitemap.xml | ✅ auto-generated | `app/sitemap.ts` (incl. legal pages) |
| 7 | og:image | ✅ 1200×630 + per-page OG | `app/layout.tsx`, `og-image.jpg` |
| 8 | No broken links | ✅ verified — all internal links + anchors resolve 200 | footer/CTAs/forms |
| 9 | Header hierarchy | ✅ one `h1`/page, logical `h2`/`h3`, fixed `aria-labelledby` on About | all pages |
| 10 | Backlink strategy | 📋 off-site — see steps below | — |
| 11 | Clean URL slugs | ✅ `/about`, `/academics`, `/admissions`, `/contact`, `/privacy`, `/terms`, `/cookies` | app routes |
| 12 | Internal linking | ✅ programs→academics, CTAs→admissions, about→contact, footer legal links, form cross-links | all pages |
| 13 | Canonical tags | ✅ absolute `alternates.canonical` on every page | `lib/seo.ts` |
| 14 | HTTPS enforced | ✅ https URL in config; Vercel enforces HTTPS automatically at deploy | — |
| 15 | Image compression | ✅ `next/image` (WebP/AVIF auto) + light JPEG placeholders | all images |
| 16 | Schema markup | ✅ JSON-LD: `School` (layout), `BreadcrumbList` (PageHeader), `FAQPage` (admissions) | layout, PageHeader, admissions |
| 17 | Search Console | ✅ code-ready — set `GOOGLE_SITE_VERIFICATION` env var to emit the meta tag; then verify + submit sitemap (steps below) | `.env.example`, layout |
| 18 | One `h1` per page | ✅ verified | all pages |
| 19 | robots.txt | ✅ | `app/robots.ts` |
| 20 | Mobile responsive | ✅ mobile-first, tested at 360/768/1024/1440 | Tailwind config + components |

### Off-site SEO actions (do once the domain is live)

1. **Google Search Console**
   - Create a property at <https://search.google.com/search-console> for your domain.
   - Verify via the **HTML tag** method: copy the meta content, set
     `GOOGLE_SITE_VERIFICATION` in Vercel env vars, redeploy, click
     *Verify*.
   - Submit `https://yourdomain/sitemap.xml` (Sitemaps → add sitemap).
   - Monitor the *Pages* and *Enhancements* reports (FAQ rich results
     will appear here).
2. **Backlink strategy** (this is off-page; the code can’t do it for you)
   - Claim the **Google Business Profile** for the school (free local
     pack + map results).
   - Add the site to school directories (e.g. school listing sites for
     Ifo/Ogun State) with the canonical URL.
   - Link from the school’s social profiles (Facebook/Instagram/X/YouTube) —
     these are in `lib/siteConfig.ts`.
   - Ask local partners (uniform suppliers, PTA, church/mosque
     newsletters, local newspapers) to link to the site.
   - Ensure the phone number/address on the site matches the Google
     Business Profile exactly (NAP consistency).
3. **HTTPS** — automatic on Vercel; keep `siteConfig.url` as the
   `https://` canonical (already done).

## Regenerating placeholder images

```bash
node scripts/generate-placeholders.mjs
```
