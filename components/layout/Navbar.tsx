"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Navbar — sticky deep-green header.
 *  - Active route is highlighted (gold underline + aria-current).
 *  - Mobile: hamburger button with a slide-down drawer; closes on
 *    route change and on Escape; hidden links are non-focusable.
 *  - `logoSrc` is resolved server-side (lib/logo.ts) and passed in.
 */
export function Navbar({ logoSrc }: { logoSrc?: string | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close the mobile menu with the Escape key.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-primary-800/60 bg-primary shadow-md">
      <Container className="flex h-16 items-center justify-between gap-4 md:h-20">
        <Link
          href="/"
          aria-label="The Green Peace School — back to home"
          className="rounded-lg"
        >
          <Logo src={logoSrc} />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-white"
                    : "text-primary-100 hover:bg-white/10 hover:text-white"
                )}
              >
                {link.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            href="/admissions"
            variant="gold"
            size="sm"
            className="hidden lg:inline-flex"
          >
            Apply Now
          </Button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            {open ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile slide-down drawer */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={cn(
          "overflow-hidden bg-primary-900 transition-[max-height] duration-300 ease-in-out lg:hidden",
          open ? "max-h-[26rem] border-t border-white/10" : "max-h-0"
        )}
      >
        <Container className="py-4">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  tabIndex={open ? 0 : -1}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-xl px-4 py-3 text-base font-medium transition-colors",
                    active
                      ? "bg-white/10 text-white"
                      : "text-primary-100 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Button
              href="/admissions"
              variant="gold"
              className="mt-3 w-full"
              aria-hidden={!open}
            >
              Apply Now
            </Button>
          </nav>
        </Container>
      </div>
    </header>
  );
}
