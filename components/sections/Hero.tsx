import Image from "next/image";
import { ArrowRight, Sprout } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Home hero — full-width background photo (the hero.jpg placeholder
 * until the real one is dropped in) under a deep-green gradient so the
 * headline stays readable over any image.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-primary-950 text-white"
    >
      {/* Background photo — decorative (the overlay carries the mood). */}
      <Image
        src={images.hero}
        alt=""
        priority
        fill
        sizes="100vw"
        className="object-cover"
      />
      {/* Green overlay: keeps text WCAG-AA readable over any photo. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-primary-950/95 via-primary-900/90 to-primary-700/85"
      />

      <Container className="relative py-24 sm:py-32 lg:py-40">
        <Reveal className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-primary-50 backdrop-blur-sm sm:text-sm">
            <Sprout className="h-4 w-4 text-accent" aria-hidden="true" />
            A warm, green place where children grow
          </p>
          <h1
            id="hero-heading"
            className="mt-6 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl"
          >
            Nurturing Minds.
            <br className="hidden sm:block" /> Growing Character.
            <br className="hidden sm:block" /> Shaping Futures.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-100 sm:text-lg">
            From Nursery to Secondary, The Green Peace School raises
            confident, curious and kind children in a safe, green and
            caring community in {siteConfig.address.city},{" "}
            {siteConfig.address.region}.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/admissions" variant="gold" size="lg" className="w-full sm:w-auto">
              Apply Now
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="/about" variant="outline-light" size="lg" className="w-full sm:w-auto">
              Learn More
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
