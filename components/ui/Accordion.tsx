"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export interface AccordionItem {
  question: string;
  answer: string;
}

/**
 * Accordion — accessible FAQ list.
 *  - Native <button> triggers → fully keyboard operable.
 *  - aria-expanded / aria-controls / role="region" wiring.
 *  - Smooth height animation via the CSS grid-rows trick (no JS
 *    measuring), disabled automatically under prefers-reduced-motion.
 */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-white px-6 shadow-card">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={`faq-button-${i}`}
                aria-expanded={open}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex min-h-11 w-full items-center justify-between gap-4 py-4 text-left font-medium text-text transition-colors hover:text-primary"
              >
                <span>{item.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "h-5 w-5 shrink-0 text-primary transition-transform duration-300",
                    open && "rotate-180"
                  )}
                />
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-button-${i}`}
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="pb-5 leading-relaxed text-text-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
