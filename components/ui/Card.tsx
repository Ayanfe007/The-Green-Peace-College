import { cn } from "@/lib/utils";

/**
 * Card — white rounded panel with a soft border and shadow.
 * Use `hover={false}` for static panels (form wrappers, etc.).
 */
export function Card({
  className,
  children,
  hover = true,
}: {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-white p-6 shadow-card",
        hover && "transition-shadow duration-300 hover:shadow-lift",
        className
      )}
    >
      {children}
    </div>
  );
}
