import type { LocalBusiness, FAQPage, WithContext } from 'schema-dts';

export function localBusinessSchema(): WithContext<LocalBusiness> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Pool Pals',
    description: 'Reliable weekly pool cleaning across the Gold Coast. Same friendly technician, transparent pricing, sparkling pool every visit.',
    url: 'https://poolpals.com.au',
    telephone: '+611300766572',
    email: 'hello@poolpals.com.au',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Unit 4 / 28 Sunshine Bvd',
      addressLocality: 'Mermaid Waters',
      addressRegion: 'QLD',
      postalCode: '4218',
      addressCountry: 'AU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-28.0167',
      longitude: '153.4000',
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '-28.0167',
        longitude: '153.4000',
      },
      geoRadius: '50km',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '14:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '312',
      bestRating: '5',
    },
    foundingDate: '2017',
    sameAs: [
      'https://g.co/kgs/poolpals',
    ],
  };
}

export function faqPageSchema(faqs: Array<{ q: string; a: string }>): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}
