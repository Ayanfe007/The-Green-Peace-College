import Link from "next/link";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Button — used for BOTH links and buttons.
 * Pass `href` to render a <Link>, otherwise a <button>.
 *
 * Variants:
 *  - gold          → key actions only (Apply Now, Register, Submit, Enquire).
 *                    Dark-green text on gold for readable contrast.
 *  - green         → solid deep green (secondary actions).
 *  - outline       → green outline.
 *  - outline-light → white outline, for use on green backgrounds.
 *
 * All variants are touch-friendly (min 44px height).
 */
type ButtonVariant = "gold" | "green" | "outline" | "outline-light";
type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex select-none items-center justify-center gap-2 rounded-xl font-semibold transition-colors disabled:pointer-events-none disabled:opacity-60";

const variantClasses: Record<ButtonVariant, string> = {
  gold: "bg-accent text-primary-900 shadow-sm hover:bg-accent-hover",
  green: "bg-primary text-white shadow-sm hover:bg-primary-800",
  outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white",
  "outline-light": "border-2 border-white/70 bg-transparent text-white hover:bg-white/10",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 text-sm",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-7 text-base",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Renders a next/link instead of a button when provided. */
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Shows a spinner and disables the button (forms). */
  loading?: boolean;
}

export function Button({
  href,
  variant = "green",
  size = "md",
  loading = false,
  className,
  children,
  disabled,
  type = "button",
  ...rest
}: ButtonProps) {
  const classes = cn(base, variantClasses[variant], sizeClasses[size], className);

  if (href) {
    // Links never submit forms; extra button-only props are intentionally
    // not forwarded (we only ever pass className/href/children to links).
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={classes}
      {...rest}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}
