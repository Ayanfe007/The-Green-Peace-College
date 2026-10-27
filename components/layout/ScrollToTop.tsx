"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * ScrollToTop — resets scroll position to the top on every route
 * change (instant, so it never fights the browser's reduced-motion
 * settings or in-page anchors).
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
