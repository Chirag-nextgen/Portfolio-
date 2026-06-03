'use client';

import { motion } from 'framer-motion';
import { Fragment, useMemo, type ElementType } from 'react';
import { cn } from '@/lib/utils';
import { EASE_EXPO } from '@/lib/motion';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

type RevealTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Delay before the stagger begins (s). */
  delay?: number;
  /** Per-word stagger (s). */
  stagger?: number;
  /** Animate when in view rather than on mount. */
  whileInView?: boolean;
};

/**
 * Reveals a string word-by-word, each word rising from behind a mask.
 * The workhorse for oversized display headings.
 */
export function RevealText({
  text,
  as = 'span',
  className,
  delay = 0,
  stagger = 0.045,
  whileInView = true,
}: RevealTextProps) {
  // Create the motion component once per tag (motion() during render is
  // deprecated and re-creates the component on every render).
  const Tag = useMemo(() => motion.create(as as ElementType), [as]);
  const reduced = usePrefersReducedMotion();
  const words = text.split(' ');

  const animateProps = whileInView
    ? { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } }
    : { animate: 'show' };

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag
      className={cn('inline', className)}
      initial="hidden"
      {...animateProps}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="reveal-mask align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: { y: '115%' },
                show: { y: '0%', transition: { duration: 0.85, ease: EASE_EXPO } },
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </Tag>
  );
}
