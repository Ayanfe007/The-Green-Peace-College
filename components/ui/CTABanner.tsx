import { Button } from "./Button";
import { Container } from "./Container";

/**
 * CTABanner — the reusable green call-to-action strip used at the end
 * of key pages. Gold button reserved for the single key action.
 */
export function CTABanner({
  title,
  text,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  text: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-white shadow-lift sm:px-12">
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-accent" />
          <h2 className="font-serif text-3xl sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-primary-100">
            {text}
          </p>
          <div className="mt-8">
            <Button href={ctaHref} variant="gold" size="lg">
              {ctaLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
