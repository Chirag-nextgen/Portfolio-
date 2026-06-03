'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { EASE_EXPO } from '@/lib/motion';

type FadeInProps = HTMLMotionProps<'div'> & {
  delay?: number;
  y?: number;
  duration?: number;
};

/** Generic in-view fade + lift. Respects reduced motion via Framer's defaults. */
export function FadeIn({
  children,
  delay = 0,
  y = 24,
  duration = 0.8,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration, ease: EASE_EXPO, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
