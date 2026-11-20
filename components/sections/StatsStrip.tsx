import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Stats strip — deep-green band with the school's headline numbers.
 * Figures come from lib/siteConfig.ts (stats): real, verifiable facts
 * only, no placeholders.
 */
export function StatsStrip() {
  const stats = [
    { value: `${siteConfig.stats.years}+`, label: "Years of Excellence" },
    { value: siteConfig.stats.levels, label: "Levels: Nursery to Secondary" },
    { value: siteConfig.stats.boards, label: "Exam Boards: WAEC & NECO" },
    { value: "1", label: "Safe, Green Campus in Ifo" },
  ];

  return (
    <section
      aria-label="The school at a glance"
      className="bg-primary-900 py-12 text-white sm:py-14"
    >
      <Container className="grid grid-cols-2 gap-x-6 gap-y-10 text-center lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-serif text-4xl text-accent sm:text-5xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm text-primary-100">{stat.label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
