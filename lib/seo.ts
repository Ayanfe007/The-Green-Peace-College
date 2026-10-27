import { siteConfig } from "./siteConfig";

/**
 * SEO helpers.
 * ------------------------------------------------------------------
 * Canonical URLs: every page sets `alternates.canonical` in its
 * metadata using this helper, so search engines always treat the
 * canonical (www, https) version as the one true URL.
 */
export function canonicalUrl(path: string): string {
  return `${siteConfig.url}${path === "/" ? "/" : path}`;
}
