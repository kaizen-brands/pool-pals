"use client";

import { useState, useEffect } from 'react';
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
    { label: 'Services', href: '/services' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Service Area', href: '/#service-area' },
    { label: 'FAQ', href: '/#faq' },
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

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="lg:hidden p-2">
            <Menu className="w-6 h-6 text-ink" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="!w-[85vw] !max-w-sm bg-cream p-6"
          >
            <SheetHeader className="p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col mt-12">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-lg font-medium text-ink hover:text-aqua-deep transition-colors py-3 border-b border-border/60"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-3">
              <Button
                className="w-full h-11 rounded-full"
                onClick={() => {
                  setOpen(false);
                  openQuote();
                }}
              >
                Get a quote
                <ArrowRight className="h-4 w-4" />
              </Button>
              <a
                href="tel:1300766572"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-border text-sm font-medium text-ink-soft transition-colors hover:border-foreground hover:text-foreground"
              >
                <Phone className="h-4 w-4" />
                1300 POOL PAL
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
