'use client';

import { useRef } from 'react';
import {
  useMotionValue,
  useSpring,
  type MotionValue,
} from 'framer-motion';
import { usePrefersReducedMotion } from './useMediaQuery';

type MagneticReturn = {
  ref: React.RefObject<HTMLElement>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
};

/**
 * Pulls an element toward the cursor while hovered, snapping back on leave.
 * `strength` is the fraction of the offset that is followed (0–1).
 */
export function useMagnetic(strength = 0.35): MagneticReturn {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 18, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 18, mass: 0.5 });

  function onMouseMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return { ref, x, y, onMouseMove, onMouseLeave };
}
