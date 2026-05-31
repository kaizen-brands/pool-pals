import { Icon } from './Icons';

interface StarsProps {
  count?: number;
  size?: number;
}

export function Stars({ count = 5, size = 14 }: StarsProps) {
  return (
    <span style={{ display: 'inline-flex', gap: '2px', color: 'var(--color-sun)' }}>
      {Array.from({ length: count }).map((_, i) => (
        <Icon.star key={i} style={{ width: size, height: size }} />
      ))}
    </span>
  );
}
