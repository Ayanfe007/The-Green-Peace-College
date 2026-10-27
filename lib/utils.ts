/**
 * Tiny class-name joiner (a minimal `clsx`-style helper).
 * Keeps the dependency list small — no extra package needed.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
