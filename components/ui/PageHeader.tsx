import Link from "next/link";
import { ChevronRight, Leaf } from "lucide-react";

import { siteConfig } from "@/lib/siteConfig";
import { Container } from "./Container";

/**
 * PageHeader — deep-green banner with the page title (the page's only
 * <h1>) and a Home / … breadcrumb.
 * Also emits BreadcrumbList JSON-LD so search engines can render the
 * breadcrumb in results (pairs with the JSON-LD School data in the
 * root layout).
 */
export function PageHeader({
  title,
  description,
  crumb,
}: {
  title: string;
  description?: string;
  crumb: string;
}) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: crumb },
    ],
  };

  return (
    <section className="relative overflow-hidden bg-primary text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Subtle leaf watermark. */}
      <Leaf
        aria-hidden="true"
        className="absolute -right-10 -top-10 h-64 w-64 rotate-12 text-white/[0.06]"
        strokeWidth={1}
      />
      <Leaf
        aria-hidden="true"
        className="absolute -bottom-16 right-1/4 h-72 w-72 -rotate-12 text-white/[0.05]"
        strokeWidth={1}
      />
      <Container className="relative py-14 sm:py-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-primary-200">
            <li>
              <Link href="/" className="rounded transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li aria-current="page" className="font-medium text-white">
              {crumb}
            </li>
          </ol>
        </nav>
        <h1 className="mt-4 font-serif text-4xl sm:text-5xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl leading-relaxed text-primary-100">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
