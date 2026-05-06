"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  { q: 'How quickly can you start?', a: 'Most new clients get their first service within 5 working days. Same-day call-outs available for green pools and equipment failures (Crystal plan and up).' },
  { q: 'Do I have to be home?', a: 'No — most clients give us side gate access. We send a photo log after every visit so you know exactly what was done. Locked gates with code-pads work too.' },
  { q: 'What if it rains?', a: 'Light rain we still service. Heavy storms we\'ll reschedule within 48hrs at no charge. We don\'t skip and bill — every visit on your plan is delivered.' },
  { q: 'Are you licensed and insured?', a: 'Yes. QBCC license #15278394, $20M public liability, $5M product liability. Happy to send certificates before your first visit.' },
  { q: 'Can I pause for winter?', a: 'On the Splash plan, yes — go fortnightly June–August at no charge. Crystal and Concierge we recommend keeping weekly because Coast pools still grow algae in winter.' },
  { q: 'Do you do one-off cleans?', a: 'Yes, $145 flat for a one-off (≤50,000L pools). But honestly, most one-offs become weekly clients within 2 months — pools are needier than people think.' },
];

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

        <Accordion type="single" collapsible defaultValue="0" className="mt-2">
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