import { existsSync } from "node:fs";
import path from "node:path";

import { siteConfig } from "./siteConfig";

/**
 * Logo resolution (evaluated at build time).
 * ------------------------------------------------------------------
 * Drop the school's logo into /public as `logo.svg` (preferred) or
 * `logo.png` — and, if needed, a light version for the dark-green
 * navbar/footer as `logo-light.svg` / `logo-light.png`.
 *
 * The next time the site is built (local or on Vercel), the navbar,
 * footer and JSON-LD structured data will use the real logo
 * automatically. Until then the site shows the
 * “The Green Peace School” text wordmark.
 *
 * ⚠️  This module uses `node:fs`, so it may only be imported from
 *     Server Components (app/layout.tsx, Footer, etc.).
 */
function publicFileExists(relativePath: string): boolean {
  try {
    return existsSync(path.join(process.cwd(), "public", relativePath));
  } catch {
    return false;
  }
}

/** The logo shown in the navbar (and JSON-LD). Null until supplied. */
export function resolveLogo(): { src: string; alt: string } | null {
  if (publicFileExists("logo.svg")) {
    return { src: "/logo.svg", alt: siteConfig.name };
  }
  if (publicFileExists("logo.png")) {
    return { src: "/logo.png", alt: siteConfig.name };
  }
  return null;
}

/**
 * The light logo shown on dark-green backgrounds (footer).
 * Falls back to the regular logo if no light variant is supplied.
 */
export function resolveFooterLogo(): { src: string; alt: string } | null {
  if (publicFileExists("logo-light.svg")) {
    return { src: "/logo-light.svg", alt: siteConfig.name };
  }
  if (publicFileExists("logo-light.png")) {
    return { src: "/logo-light.png", alt: siteConfig.name };
  }
  return resolveLogo();
}
