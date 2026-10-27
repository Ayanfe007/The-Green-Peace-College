import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/siteConfig";

/**
 * robots.txt — allow everything, point to the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
