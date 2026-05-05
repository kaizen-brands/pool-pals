import React from 'react';

interface LogoProps {
  inverted?: boolean;
}

export function Logo({ inverted = false }: LogoProps) {
  const fill = inverted ? 'white' : 'var(--color-ink)';
  const aqua = 'var(--color-aqua)';

  return (
    <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
      <span style={{
        width: 34,
        height: 34,
        borderRadius: 10,
        background: `linear-gradient(140deg, ${aqua}, var(--color-aqua-deep))`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 16c1.5 0 1.5-1.5 3-1.5s1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5"/>
          <path d="M3 20c1.5 0 1.5-1.5 3-1.5s1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5"/>
        </svg>
      </span>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: 24,
        lineHeight: 1,
        color: fill,
        letterSpacing: '-0.02em',
      }}>
        Pool Pals
      </span>
    </a>
  );
}
