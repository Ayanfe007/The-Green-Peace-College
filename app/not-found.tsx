import type { Metadata } from "next";
import { Sprout } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Page Not Found",
  // Point the 404 at the home page so no weight is wasted on it.
  alternates: { canonical: canonicalUrl("/") },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-20">
      <Container className="text-center">
        <p aria-hidden="true" className="font-serif text-7xl text-primary sm:text-8xl">
          404
        </p>
        <Sprout className="mx-auto mt-5 h-10 w-10 text-accent" aria-hidden="true" />
        <h1 className="mt-4 font-serif text-3xl text-text sm:text-4xl">
          This page has wandered off the garden path.
        </h1>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-text-muted">
          The page you are looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back somewhere useful.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" variant="green">
            Back to Home
          </Button>
          <Button href="/admissions" variant="outline">
            View Admissions
          </Button>
        </div>
      </Container>
    </section>
  );
}
