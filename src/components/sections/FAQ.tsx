"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { homeFaqs as faqs } from '@/data/faqs';

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-card border-y border-border">
      <div className="mx-auto max-w-4xl px-6">
        <div className="max-w-3xl space-y-4 mb-12 mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-aqua">
            <span className="h-px w-8 bg-aqua"></span>
            FAQ
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-deep">
            Questions we get asked a lot
          </h2>
          <p className="text-lg text-ink-soft leading-relaxed">
            Can&apos;t find what you&apos;re after? Call 1300 POOL PAL or grab a quote — first reply usually within 2 hours.
          </p>
        </div>

        <Accordion defaultValue={["0"]} className="mt-2">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={String(i)}>
              <AccordionTrigger className="text-deep hover:no-underline text-base font-semibold">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-ink-soft text-base leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}