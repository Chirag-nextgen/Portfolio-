'use client';

import { motion } from 'framer-motion';
import { EASE_EXPO } from '@/lib/motion';

/**
 * Per-navigation transition. `template.tsx` re-mounts on every route change
 * (unlike `layout.tsx`), so it's the right place for enter animations.
 * A brief curtain wipes up while the new page fades + lifts into place.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: EASE_EXPO }}
        style={{ transformOrigin: 'top' }}
        className="pointer-events-none fixed inset-0 z-[80] bg-accent"
      />
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_EXPO, delay: 0.25 }}
      >
        {children}
      </motion.div>
    </>
  );
}
