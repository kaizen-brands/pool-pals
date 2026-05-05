import React from 'react';
import { Logo } from './Logo';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const cols = [
    { h: 'Services', l: ['Weekly cleaning', 'Chemical balancing', 'Equipment checks', 'Green pool recovery', 'Holiday rentals'] },
    { h: 'Company', l: ['About', 'Service areas', 'Reviews', 'Blog & guides', 'Careers'] },
    { h: 'Help', l: ['Pricing', 'FAQ', 'Contact', 'Customer dashboard', 'Refer a mate'] },
  ];

  return (
    <footer className="bg-deep text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <Logo inverted />
          <p className="text-sm text-aqua-soft/70 leading-relaxed">
            Local Gold Coast pool care, since 2014. Family-owned, QBCC-licensed, fully insured.
          </p>
          <div className="text-sm text-aqua-soft/70 space-y-1.5">
            <a href="tel:1300766572" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="h-3.5 w-3.5" /> 1300 POOL PAL
            </a>
            <a href="mailto:hi@poolpals.com.au" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="h-3.5 w-3.5" /> hi@poolpals.com.au
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" /> Unit 4 / 28 Sunshine Bvd, Mermaid Waters
            </span>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <div className="text-xs font-mono uppercase tracking-widest text-aqua mb-4 font-semibold">{c.h}</div>
            <ul className="space-y-2.5">
              {c.l.map((it) => (
                <li key={it}>
                  <a href="#" className="text-sm text-aqua-soft/80 hover:text-white transition-colors">{it}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="h-px w-full bg-white/10" />
      <div className="mx-auto max-w-7xl px-6 py-6 flex flex-wrap justify-between items-center gap-4 text-xs text-aqua-soft/60">
        <span>© 2026 Pool Pals Pty Ltd · ABN 41 638 902 117</span>
        <span className="font-mono uppercase tracking-widest">Built on the Gold Coast · QLD 4218</span>
        <span className="flex gap-5">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Insurance</a>
        </span>
      </div>
    </footer>
  );
}