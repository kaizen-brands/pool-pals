import {
  Filter,
  FlaskConical,
  Leaf,
  SlidersHorizontal,
  Calendar,
  ShieldCheck,
  Droplets,
  ClipboardCheck,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

/**
 * Maps the string `icon` name stored on a Service to its lucide-react component.
 * Keeping the data layer as plain strings lets `src/data/services.ts` be imported
 * from both `.astro` and `.tsx` without pulling component references into the data.
 */
export const iconMap: Record<string, LucideIcon> = {
  Filter,
  FlaskConical,
  Leaf,
  SlidersHorizontal,
  Calendar,
  ShieldCheck,
  Droplets,
  ClipboardCheck,
  Wrench,
};
