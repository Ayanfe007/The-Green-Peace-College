import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/lib/images";

const PROGRAMS = [
  {
    image: images.nursery,
    alt: "The colourful covered walkway beside the school play yard",
    name: "Nursery",
    range: "Ages 2–4 · Nursery 1–3",
    text: "Play-based learning where curiosity, phonics and confidence take root.",
  },
  {
    image: images.primary,
    alt: "The classroom wing and open play yard of the school compound",
    name: "Primary",
    range: "Ages 5–11 · Primary 1–6",
    text: "A strong academic foundation in reading, writing, numbers and character.",
  },
  {
    image: images.secondary,
    alt: "The main school building at The Green Peace Schools, Agbado, Ifo",
    name: "Secondary",
    range: "JSS 1–3 · SS 1–3",
    text: "Exam-focused secondary education with genuine career guidance.",
  },
];

/**
 * Programs preview — three cards (Nursery / Primary / Secondary)
 * linking through to /academics.
 */
export function ProgramsPreview() {
  return (
    <section aria-labelledby="programs-heading" className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          id="programs-heading"
          eyebrow="Our programmes"
          title="From first steps to first degrees"
          description="One continuous journey from Nursery to Secondary — same values, same community, steadily bigger challenges."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PROGRAMS.map((program, i) => (
            <Reveal key={program.name} delay={i * 80} className="h-full">
              <Link
                href="/academics"
                className="group block h-full overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-shadow hover:shadow-lift"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-serif text-xl text-text">{program.name}</h3>
                    <ArrowRight
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-accent-deep transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
                    {program.range}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {program.text}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
