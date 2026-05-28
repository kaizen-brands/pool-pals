export interface QuoteData {
  frequency: string;
  poolType: string;
  approxSize: string;
  postcode: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export interface Review {
  quote: string;
  name: string;
  suburb: string;
  rating: number;
}

export interface Service {
  icon: string;
  title: string;
  desc: string;
  tag?: string;
  bullets: string[];
}

export interface PricingTier {
  name: string;
  tag: string;
  price: number;
  cadence: string;
  freq: string;
  features: string[];
  cta: string;
  highlight: boolean;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  date: Date;
  author: string;
  tags: string[];
  excerpt: string;
  coverImage?: string;
}
