import {
  Building2,
  HeartHandshake,
  ShieldCheck,
  Trophy,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FEATURES: Array<{ icon: LucideIcon; title: string; text: string }> = [
  {
    icon: Users,
    title: "Qualified & Caring Teachers",
    text: "Experienced, trained educators who know every child by name and champion their growth, in the classroom and beyond it.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Green Campus",
    text: "A secure, fenced and landscaped campus with CCTV, first-aid trained staff, and plenty of shade, greenery and open air.",
  },
  {
    icon: Building2,
    title: "Modern Learning Facilities",
    text: "Bright classrooms, a cosy library, a working science lab, an ICT room and a big open playground for growing bodies.",
  },
  {
    icon: HeartHandshake,
    title: "Strong Moral & Character Education",
    text: "Daily values lessons, close mentoring and a calm, respectful culture that shapes how our children treat one another.",
  },
  {
    icon: UsersRound,
    title: "Small Class Sizes",
    text: "A maximum of 20 pupils per class (15 in Nursery), so no child is ever lost in the crowd and every voice is heard.",
  },
  {
    icon: Trophy,
    title: "Co-curricular Activities",
    text: "Sports, music, debate, art, computer and reading clubs, plus termly shows and sports day that let every talent shine.",
  },
];

/**
 * Key features — the six reasons families choose the school.
 */
export function FeatureGrid() {
  return (
    <section
      aria-labelledby="features-heading"
      className="bg-background py-16 sm:py-24"
    >
      <Container>
        <SectionHeading
          id="features-heading"
          eyebrow="Why families choose us"
          title="Everything a child needs to grow"
          description="Six promises we make to every family in the Green Peace family, and keep every single term."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Reveal key={feature.title} delay={(i % 3) * 80} className="h-full">
                <Card className="h-full">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-text">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {feature.text}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
