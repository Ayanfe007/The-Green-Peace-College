import Image from "next/image";
import { Leaf } from "lucide-react";

import { siteConfig } from "@/lib/siteConfig";

/**
 * Logo — shows the school's real crest when `logo.png` / `logo.svg` has
 * been dropped into /public (resolved at build time by lib/logo.ts).
 *
 * The current crest (512×512, dark corners with a light halo) is
 * displayed as a compact badge on a near-black rounded chip so it
 * blends into the deep-green navbar/footer. The crest already contains
 * the school name, so no extra wordmark is shown when the logo exists.
 *
 * Until a logo file exists, a text wordmark is shown instead.
 *
 * `src` is computed by a Server Component (the root layout / footer)
 * and passed down, so this component stays client-safe.
 */
export function Logo({ src }: { src?: string | null }) {
  if (src) {
    return (
      <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-primary-950 ring-1 ring-white/15 md:h-14 md:w-14">
        <Image
          src={src}
          alt={`${siteConfig.name} crest`}
          width={512}
          height={512}
          priority
          className="h-full w-full object-cover"
        />
      </span>
    );
  }

  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 md:h-12 md:w-12"
      >
        <Leaf className="h-5 w-5 text-accent md:h-6 md:w-6" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-lg font-semibold tracking-wide text-white md:text-xl">
          {siteConfig.name}
        </span>
        {/* TODO: review the "Est." year once real school details are set. */}
        <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.22em] text-primary-200 md:text-[11px]">
          {siteConfig.address.city} · Est. {siteConfig.foundedYear}
        </span>
      </span>
    </span>
  );
}
