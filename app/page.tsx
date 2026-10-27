import type { Metadata } from "next";
import Image from "next/image";

import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Hero } from "@/components/sections/Hero";
import { ProgramsPreview } from "@/components/sections/ProgramsPreview";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { Testimonials } from "@/components/sections/Testimonials";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/ui/CTABanner";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { images } from "@/lib/images";
import { canonicalUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Home",
  description:
    "A warm, values-driven Nursery, Primary and Secondary school in Ifo, Ogun State. Apply now for the 2026/2027 academic year.",
  alternates: { canonical: canonicalUrl("/") },
};

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ------------------------------ Welcome ------------------------------ */}
      <section aria-labelledby="welcome-heading" className="py-16 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative">
              <Image
                src={images.welcome}
                alt="The main building of The Green Peace Schools, Ifo, with the mission and vision boards"
                width={1200}
                height={900}
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift"
              />
              <div className="absolute bottom-4 right-4 rounded-2xl border border-line bg-white/95 px-5 py-3 shadow-card backdrop-blur">
                <p className="font-serif text-2xl leading-none text-primary">
                  {siteConfig.stats.years}+
                </p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-text-muted">
                  Years of excellence
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-deep">
                Welcome to our school
              </p>
              <h2
                id="welcome-heading"
                className="mt-2 font-serif text-3xl leading-tight text-text sm:text-4xl"
              >
                A little school with a big heart — and a big standard.
              </h2>
              <p className="mt-4 leading-relaxed text-text-muted">
                At {siteConfig.name}, every child is known by name. We are
                teachers and parents working side by side in bright, calm
                classrooms, making sure learning is joyful — and never
                frightening.
              </p>
              <p className="mt-3 leading-relaxed text-text-muted">
                Since {siteConfig.foundedYear}, families across{" "}
                {siteConfig.address.city} have trusted us with their most
                precious people, and we repay that trust with small classes,
                honest reporting and a community that genuinely cares.
              </p>
              <Button href="/about" variant="outline" className="mt-7">
                Read our story
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <FeatureGrid />
      <StatsStrip />
      <ProgramsPreview />
      <Testimonials />

      <CTABanner
        title="Enrol your child today"
        text="Places for the 2026/2027 academic year are filling fast. Submit an inquiry and our admissions team will call you within one to two school days."
        ctaLabel="Apply Now"
        ctaHref="/admissions"
      />
    </>
  );
}
