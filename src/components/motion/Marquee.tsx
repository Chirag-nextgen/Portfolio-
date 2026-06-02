'use client';

import { cn } from '@/lib/utils';

type MarqueeProps = {
  items: string[];
  className?: string;
  separator?: string;
};

/**
 * Seamless looping marquee built from two identical tracks.
 * Pure CSS animation so it costs nothing on the main thread and
 * is automatically paused for reduced-motion users (see globals.css).
 */
export function Marquee({ items, className, separator = '✦' }: MarqueeProps) {
  const Track = () => (
    <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-10">
          <span>{item}</span>
          <span className="text-accent">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn('flex w-full overflow-hidden whitespace-nowrap', className)}>
      <div className="flex animate-marquee">
        <Track />
        <Track />
      </div>
    </div>
  );
}
