import type { APIRoute } from 'astro';
import { services } from '@/data/services';

const SITE = 'https://poolpals.com.au';

export const GET: APIRoute = () => {
  const serviceLines = services
    .map((s) => `- [${s.title}](${SITE}/services/${s.slug}/): ${s.blurb} (${s.price})`)
    .join('\n');

  const body = `# Pool Pals

> Pool Pals is a family-owned, QBCC-licensed pool cleaning and maintenance company serving the Gold Coast, Queensland. We offer weekly pool cleaning, water chemistry, green pool recovery, equipment repair and installation, leak detection, pre-purchase pool inspections, and Form 23 pool safety certificates. Transparent pricing, no lock-in contracts, same technician every visit. Phone 1300 766 572 (1300 POOL PAL).

## Services
${serviceLines}

## Company
- [About Pool Pals](${SITE}/about/): Local, family-owned, fully insured Gold Coast pool technicians.
- [Reviews](${SITE}/reviews/): Customer reviews and ratings.
- [Contact](${SITE}/contact/): Get a quote or book a service — phone 1300 766 572, email hello@poolpals.com.au.

## Guides
- [Why Is My Pool Green?](${SITE}/blog/why-is-my-pool-green/): Common causes of a green pool and how to fix them.
- [How Often Should You Clean a Pool in Queensland?](${SITE}/blog/how-often-clean-pool-queensland/): Recommended cleaning frequency for Gold Coast pools.
- [Pool Cleaning Cost on the Gold Coast](${SITE}/blog/pool-cleaning-cost-gold-coast-2025/): What pool cleaning and maintenance costs locally.

## Service area
Gold Coast, Queensland — including Surfers Paradise, Broadbeach, Mermaid Beach, Miami, Burleigh Heads, Palm Beach, Currumbin, Coolangatta, Robina, Varsity Lakes, Mudgeeraba, Bundall, Benowa, Ashmore, Helensvale, Hope Island, Paradise Point, Runaway Bay, Southport and surrounding suburbs.
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
