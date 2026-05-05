"use client";

import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, Phone } from 'lucide-react';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openQuote = () => {
    window.dispatchEvent(new CustomEvent('open-quote-wizard'));
  };

  const links = [
    { label: 'Services', href: '/services' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Service Area', href: '/#service-area' },
    { label: 'FAQ', href: '/#faq' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'bg-cream/85 backdrop-blur-md border-b border-[var(--color-hairline)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container-main flex items-center justify-between py-[18px]">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-ink-soft hover:text-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:1300766572"
            className="text-sm font-medium flex items-center gap-2 text-ink-soft hover:text-ink transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            1300 POOL PAL
          </a>
          <button className="btn btn-aqua btn-sm" onClick={openQuote}>
            Get instant quote
          </button>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden p-2" asChild>
            <button>
              <Menu className="w-6 h-6 text-ink" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-sm bg-cream">
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-8">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-base font-medium text-ink-soft hover:text-ink transition-colors py-2"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-3">
              <a
                href="tel:1300766572"
                className="text-sm font-medium flex items-center gap-2 text-ink-soft"
              >
                <Phone className="w-3.5 h-3.5" />
                1300 POOL PAL
              </a>
              <button
                className="btn btn-aqua w-full justify-center"
                onClick={() => {
                  setOpen(false);
                  openQuote();
                }}
              >
                Get instant quote
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
