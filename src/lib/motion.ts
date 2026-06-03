import type { Transition, Variants } from 'framer-motion';

/**
 * Shared motion primitives.
 * Centralising easing + spring config keeps motion feeling consistent
 * across the whole site rather than ad-hoc per component.
 */

export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_QUART = [0.76, 0, 0.24, 1] as const;

export const springSoft: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 20,
  mass: 0.8,
};

export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 380,
  damping: 30,
  mass: 0.6,
};

/** Stagger container for revealing groups of children. */
export const staggerContainer = (stagger = 0.06, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** A single line/word rising up from behind a mask. */
export const riseIn: Variants = {
  hidden: { y: '110%' },
  show: {
    y: '0%',
    transition: { duration: 0.9, ease: EASE_EXPO },
  },
};

/** Soft fade + lift used for blocks and images. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_EXPO },
  },
};

export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' } as const;
