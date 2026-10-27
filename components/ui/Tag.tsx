/**
 * Tag — small rounded chip for subjects, ranges and similar labels.
 */
export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="chip">{children}</span>;
}
