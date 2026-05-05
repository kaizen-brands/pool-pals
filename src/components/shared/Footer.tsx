import React from 'react';
import { Logo } from './Logo';
import { Icon } from './Icons';

export function Footer() {
  const cols = [
    {
      h: 'Services',
      l: ['Weekly cleaning', 'Chemical balancing', 'Equipment checks', 'Green pool recovery', 'Holiday rentals'],
    },
    {
      h: 'Company',
      l: ['About', 'Service areas', 'Reviews', 'Blog & guides', 'Careers'],
    },
    {
      h: 'Help',
      l: ['Pricing', 'FAQ', 'Contact', 'Customer dashboard', 'Refer a mate'],
    },
  ];

  return (
    <footer className="bg-[var(--color-bg-deep)] text-white pt-[72px] pb-8">
      <div className="container-main">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 lg:gap-12 mb-14">
          <div>
            <Logo inverted />
            <p className="mt-[18px] text-sm text-[oklch(0.7_0.02_230)] max-w-[320px] leading-relaxed">
              Family-run pool care across the Gold Coast since 2017. Reliable, transparent, and obsessed with sparkling water.
            </p>
            <div className="mt-5 flex flex-col gap-2 text-sm text-[oklch(0.78_0.02_230)]">
              <span className="inline-flex gap-2 items-center">
                <Icon.phone className="w-3.5 h-3.5" /> 1300 POOL PAL (1300 766 572)
              </span>
              <span className="inline-flex gap-2 items-center">
                <Icon.pin className="w-3.5 h-3.5" /> Unit 4 / 28 Sunshine Bvd, Mermaid Waters QLD
              </span>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <div className="text-xs tracking-[0.12em] uppercase text-[oklch(0.78_0.13_215)] mb-[18px] font-semibold">
                {c.h}
              </div>
              <ul className="list-none p-0 m-0 grid gap-2.5">
                {c.l.map((it) => (
                  <li key={it}>
                    <a href="#" className="text-sm text-[oklch(0.85_0.01_230)] hover:text-white transition-colors">{it}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 border-t border-[oklch(0.32_0.04_230)] flex flex-col sm:flex-row justify-between items-center flex-wrap gap-4 text-xs text-[oklch(0.65_0.02_230)]">
          <span>&copy; 2026 Pool Pals Pty Ltd &middot; ABN 41 638 902 117</span>
          <span className="font-mono tracking-wide">
            BUILT ON THE GOLD COAST &middot; QLD 4218
          </span>
          <span className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Insurance</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
