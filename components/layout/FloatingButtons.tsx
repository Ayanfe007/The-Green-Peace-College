import { MessageCircle, Phone } from "lucide-react";

import { siteConfig } from "@/lib/siteConfig";

/**
 * FloatingButtons — WhatsApp + call shortcuts pinned to the bottom-right.
 * Both are real <a> links (tel: / wa.me), so they work with zero JS.
 * Numbers come from lib/siteConfig.ts (placeholders until replaced).
 */
export function FloatingButtons() {
  return (
    <div
      aria-label="Quick contact"
      className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3"
    >
      <a
        href={`tel:${siteConfig.phones[0].number.replace(/\s/g, "")}`}
        aria-label={`Call ${siteConfig.name}`}
        title={`Call ${siteConfig.phones[0].number}`}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lift transition-transform hover:scale-105 hover:bg-primary-800"
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
      </a>
      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${siteConfig.name} on WhatsApp`}
        title="Chat with us on WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform hover:scale-105 hover:bg-[#1EB857]"
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
      </a>
    </div>
  );
}
