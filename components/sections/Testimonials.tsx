import { Star } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

// TODO: replace with real parent testimonials (with permission) —
// or simply edit these placeholders.
const TESTIMONIALS = [
  {
    quote:
      "From the first day, our daughter felt safe and loved. The teachers know her by name and tell us exactly how she is doing every term, not just at exam time.",
    name: "Mrs. Funke A.",
    role: "Parent of a Primary 4 pupil",
  },
  {
    quote:
      "The school prepared my son brilliantly for his BECE. What surprised me most was his character. He is respectful, honest and hardworking, and that started here.",
    name: "Alhaji Ibrahim S.",
    role: "Parent of a JSS 3 pupil",
  },
  {
    quote:
      "We have moved schools three times in four years. This is the first one that feels like family: small classes, caring teachers and a genuinely safe campus.",
    name: "Mr. & Mrs. Okafor",
    role: "Parents of Nursery and Primary pupils",
  },
];

/**
 * Testimonials — three placeholder parent voices on a darker cream
 * band for gentle contrast.
 */
export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-background-dark py-16 sm:py-24"
    >
      <Container>
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Kind words"
          title="What our parents say"
          description="The best report card we could ever receive."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 80} className="h-full">
              <Card className="flex h-full flex-col">
                <div className="flex gap-1" aria-label="Rated 5 out of 5">
                  {[0, 1, 2, 3, 4].map((n) => (
                    <Star
                      key={n}
                      className="h-4 w-4 fill-accent text-accent"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-text">
                  “{t.quote}”
                </blockquote>
                <footer className="mt-5 border-t border-line pt-4">
                  <p className="text-sm font-semibold text-text">{t.name}</p>
                  <p className="mt-0.5 text-xs text-text-muted">{t.role}</p>
                </footer>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
