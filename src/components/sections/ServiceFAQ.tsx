import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { FAQItem } from '@/types';

interface Props {
  faqs: FAQItem[];
}

export function ServiceFAQ({ faqs }: Props) {
  return (
    <Accordion defaultValue={['0']} className="mt-2">
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
  );
}
