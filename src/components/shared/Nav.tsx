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
import { Button } from '@/components/ui/button';
import { Menu, Phone, ArrowRight } from 'lucide-react';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openQuote = () => {
    window.dispatchEvent(new CustomEvent('open-quote-wizard'));
  };

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Service Area', href: '#service-area' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      style={{ height: '64px', minHeight: '64px', boxSizing: 'border-box' }}
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? 'border-b border-border/80 bg-background/80 backdrop-blur-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:1300766572"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-foreground transition-colors"
          >
            <Phone className="h-4 w-4" />
            1300 POOL PAL
          </a>
          <Button onClick={openQuote} size="default" className="shadow-md">
            Get a quote
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="lg:hidden p-2">
            <Menu className="w-6 h-6 text-ink" />
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
                  className="text-base font-medium text-ink-soft hover:text-foreground transition-colors py-2"
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
              <Button
                className="w-full"
                onClick={() => {
                  setOpen(false);
                  openQuote();
                }}
              >
                Get a quote
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
