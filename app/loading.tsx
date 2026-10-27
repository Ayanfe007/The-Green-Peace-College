import { Container } from "@/components/ui/Container";

/**
 * Loading UI — shown while a route is being fetched. Pure CSS (no JS).
 */
export default function Loading() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-24">
      <span
        aria-hidden="true"
        className="h-10 w-10 animate-spin rounded-full border-[3px] border-primary-200 border-t-primary"
      />
      <p className="text-sm font-medium text-text-muted">Loading…</p>
    </Container>
  );
}
