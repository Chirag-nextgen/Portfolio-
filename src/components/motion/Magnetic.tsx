'use client';

import { motion } from 'framer-motion';
import { cloneElement, type ReactElement } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';

type MagneticProps = {
  children: ReactElement;
  strength?: number;
};

/**
 * Wraps a single child and makes it magnetically follow the cursor.
 * Use sparingly — reserved for primary CTAs and nav affordances.
 */
export function Magnetic({ children, strength = 0.4 }: MagneticProps) {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic(strength);

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x, y }}
      className="inline-block"
    >
      {cloneElement(children)}
    </motion.div>
  );
}
