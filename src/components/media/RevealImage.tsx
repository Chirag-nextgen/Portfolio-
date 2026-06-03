'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { EASE_EXPO } from '@/lib/motion';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

type RevealImageProps = {
  src: string;
  alt: string;
  className?: string;
  /** Adds a layered parallax drift as the image scrolls through view. */
  parallax?: boolean;
  priority?: boolean;
  sizes?: string;
  rounded?: boolean;
};

/**
 * Image that wipes in behind a clip-path mask, drifts with parallax, and
 * subtly distorts on hover via an SVG turbulence displacement filter.
 */
export function RevealImage({
  src,
  alt,
  className,
  parallax = true,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 60vw',
  rounded = true,
}: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.04, 1.12]);

  return (
    <motion.div
      ref={ref}
      className={cn(
        'group relative overflow-hidden bg-ink/5',
        rounded && 'rounded-xl',
        className,
      )}
      initial={reduced ? undefined : { clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={reduced ? undefined : { clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 1.1, ease: EASE_EXPO }}
    >
      <motion.div
        className="relative h-full w-full"
        style={parallax && !reduced ? { y, scale } : undefined}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-[filter,transform] duration-700 ease-expo group-hover:scale-[1.03] motion-safe:group-hover:[filter:url(#reveal-distort)]"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-line/10" />
    </motion.div>
  );
}

/**
 * Shared SVG filter referenced by RevealImage's hover state.
 * Mounted once near the app root.
 */
export function ImageDistortionFilter() {
  return (
    <svg aria-hidden className="pointer-events-none absolute h-0 w-0">
      <filter id="reveal-distort">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.012 0.016"
          numOctaves={2}
          seed={4}
          result="noise"
        >
          <animate
            attributeName="baseFrequency"
            dur="14s"
            values="0.012 0.016; 0.02 0.012; 0.012 0.016"
            repeatCount="indefinite"
          />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" />
      </filter>
    </svg>
  );
}
