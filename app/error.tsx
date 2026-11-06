"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Error boundary — shown when a route (or the app) throws at runtime.
 * Must be a Client Component (Next.js requirement).
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-[60vh] items-center py-24">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <AlertTriangle
            className="mx-auto h-12 w-12 text-accent-deep"
            aria-hidden="true"
          />
          <h1 className="mt-4 font-serif text-3xl text-text">
            Something went wrong.
          </h1>
          <p className="mt-3 leading-relaxed text-text-muted">
            An unexpected error occurred
            {error.digest ? ` (reference: ${error.digest})` : ""}. Please try
            again. If it keeps happening, give us a call and we&apos;ll sort
            it out.
          </p>
          <div className="mt-8">
            <Button variant="green" onClick={() => reset()}>
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Try again
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
