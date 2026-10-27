import { cn } from "@/lib/utils";

/**
 * SectionHeading — eyebrow label + serif heading + description.
 * The gold underline is one of the few "small highlights" allowed.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  /** Optional id for the h2 (use with aria-labelledby on <section>). */
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-deep">
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="mt-2 font-serif text-3xl leading-tight text-text sm:text-4xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-3 leading-relaxed text-text-muted">{description}</p>
      )}
      <span
        aria-hidden="true"
        className={cn(
          "mt-5 block h-1 w-16 rounded-full bg-accent",
          align === "center" && "mx-auto"
        )}
      />
    </div>
  );
}
