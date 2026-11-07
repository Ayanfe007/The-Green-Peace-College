/**
 * Central image registry.
 * ------------------------------------------------------------------
 * Every image used on the site is referenced from here, so if a file
 * is ever renamed you change it in ONE place.
 *
 * The files in /public/images are neutral placeholders. Replace each
 * file with the real photo (keeping the SAME filename) and the site
 * updates itself — no code changes needed.
 *
 * See /public/images/README.md for the full slot list and recommended
 * sizes.
 */
export const images = {
  /** Home hero background (wide, landscape) — 1920×1080 recommended. */
  hero: "/images/hero.jpg",
  /** Home welcome section — 1200×900 (4:3). */
  welcome: "/images/welcome.jpg",
  /** About page, “Our Story” — 1200×800 (3:2). */
  aboutStory: "/images/about-story.jpg",
  /** Proprietor portrait — 900×1125 (4:5) or square. */
  proprietor: "/images/proprietor.jpg",
  /** Principal portrait — 900×1125 (4:5) or square. */
  principal: "/images/principal.jpg",
  /** Headmistress portrait — 900×1125 (4:5) or square. */
  headmistress: "/images/headmistress.jpg",
  /** About page: leadership team card portraits (square 800×800). */
  team: {
    technicalDirector: "/images/team-technical-director.jpg",
    pro: "/images/team-pro.jpg",
  },
  /** Academics: Nursery card — 1000×750 (4:3). */
  nursery: "/images/nursery.jpg",
  /** Academics: Primary card — 1000×750 (4:3). */
  primary: "/images/primary.jpg",
  /** Academics: Secondary card — 1000×750 (4:3). */
  secondary: "/images/secondary.jpg",
  /** Facilities section. */
  facilities: {
    library: "/images/facility-library.jpg",
    lab: "/images/facility-lab.jpg",
    ict: "/images/facility-ict.jpg",
    playground: "/images/facility-playground.jpg",
  },
  /** Optional gallery / co-curricular (square 900×900). */
  gallery: {
    one: "/images/gallery-1.jpg",
    two: "/images/gallery-2.jpg",
    three: "/images/gallery-3.jpg",
    four: "/images/gallery-4.jpg",
    five: "/images/gallery-5.jpg",
    six: "/images/gallery-6.jpg",
  },
  /** Social sharing preview (Open Graph / Twitter card) — 1200×630. */
  ogImage: "/images/og-image.jpg",
} as const;
