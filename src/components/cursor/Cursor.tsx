'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '@/providers/CursorProvider';
import { useHasPointer, usePrefersReducedMotion } from '@/hooks/useMediaQuery';

/**
 * Custom animated cursor.
 * - A small ink dot tracks the pointer 1:1.
 * - A larger spring-eased ring lags behind for weight.
 * - Morphs (size/label) based on the active CursorVariant from context.
 * Only mounts on fine-pointer, motion-allowing devices; otherwise the
 * native cursor is used and nothing renders.
 */
export function Cursor() {
  const { variant, label } = useCursor();
  const hasPointer = useHasPointer();
  const reduced = usePrefersReducedMotion();
  const enabled = hasPointer && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;
    document.body.dataset.customCursor = 'true';

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      delete document.body.dataset.customCursor;
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringSize =
    variant === 'view' ? 88 : variant === 'link' ? 56 : variant === 'text' ? 8 : 36;
  const dotOpacity = variant === 'view' || variant === 'text' ? 0 : 1;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      {/* Lagging ring */}
      <motion.div
        className="fixed left-0 top-0 flex items-center justify-center rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor:
            variant === 'view' ? 'rgb(var(--accent))' : 'rgb(var(--ink) / 0.0)',
          border: variant === 'view' ? 'none' : '1px solid rgb(var(--ink) / 0.5)',
          mixBlendMode: variant === 'view' ? 'normal' : 'difference',
        }}
        animate={{ width: ringSize, height: ringSize, opacity: variant === 'hidden' ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      >
        <AnimatePresence>
          {variant === 'view' && label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-paper"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 1:1 dot */}
      <motion.div
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-ink"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: 'difference',
        }}
        animate={{ opacity: dotOpacity }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
