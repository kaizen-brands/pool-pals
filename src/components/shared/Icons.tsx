import React from 'react';

interface IconProps {
  style?: React.CSSProperties;
  className?: string;
}

export const Icon = {
  star: ({ style, className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" style={style} className={className}>
      <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.6L6 22l1.5-7.2L2 10l7.1-1.1L12 2z" />
    </svg>
  ),
  check: ({ style, className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  ),
  arrow: ({ style, className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  ),
  phone: ({ style, className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
      <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.5 2.1L8 9.7a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.5c.9.3 1.8.5 2.7.6a2 2 0 011.7 2z"/>
    </svg>
  ),
  shield: ({ style, className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  drop: ({ style, className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
      <path d="M12 2.7l5.5 7.5a7 7 0 11-11 0L12 2.7z"/>
    </svg>
  ),
  leaf: ({ style, className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
      <path d="M21 4c-9 0-16 5-16 13a4 4 0 004 4c8 0 13-7 13-16-0-1 0-1 0-1z"/>
      <path d="M5 21c2-7 7-12 14-13"/>
    </svg>
  ),
  wrench: ({ style, className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
      <path d="M14.7 6.3a4 4 0 105.6 5.6l-1.6 1.6L21 16l-5 5-3-3-7.5 7.5a2.1 2.1 0 11-3-3L11 14l-3-3 2.5-2.5L13 11l1.7-4.7z"/>
    </svg>
  ),
  calendar: ({ style, className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
      <rect x="3" y="5" width="18" height="16" rx="2"/>
      <path d="M8 3v4M16 3v4M3 10h18"/>
    </svg>
  ),
  pin: ({ style, className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  plus: ({ style, className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" style={style} className={className}>
      <path d="M12 5v14M5 12h14"/>
    </svg>
  ),
  minus: ({ style, className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" style={style} className={className}>
      <path d="M5 12h14"/>
    </svg>
  ),
  menu: ({ style, className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
      <path d="M3 12h18M3 6h18M3 18h18"/>
    </svg>
  ),
  close: ({ style, className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  ),
  mail: ({ style, className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
    </svg>
  ),
  external: ({ style, className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
      <path d="M15 3h6v6"/>
      <path d="M10 14L21 3"/>
    </svg>
  ),
  pool: ({ style, className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
      <path d="M3 16c1.5 0 1.5-1.5 3-1.5s1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5"/>
      <path d="M3 20c1.5 0 1.5-1.5 3-1.5s1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5"/>
      <path d="M6 14V6a2 2 0 012-2h0a2 2 0 012 2"/>
      <path d="M14 14V6a2 2 0 012-2h0a2 2 0 012 2v8"/>
    </svg>
  ),
};
