'use client';

import { createContext, useContext, useMemo, useState } from 'react';

/** Visual variants the custom cursor can morph into based on context. */
export type CursorVariant = 'default' | 'link' | 'view' | 'text' | 'hidden';

type CursorState = {
  variant: CursorVariant;
  label: string;
  setCursor: (variant: CursorVariant, label?: string) => void;
  resetCursor: () => void;
};

const CursorContext = createContext<CursorState | null>(null);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [label, setLabel] = useState('');

  const value = useMemo<CursorState>(
    () => ({
      variant,
      label,
      setCursor: (v, l = '') => {
        setVariant(v);
        setLabel(l);
      },
      resetCursor: () => {
        setVariant('default');
        setLabel('');
      },
    }),
    [variant, label],
  );

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export function useCursor(): CursorState {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error('useCursor must be used within a CursorProvider');
  return ctx;
}

/**
 * Convenience props spreader: attach to any element to drive the cursor
 * on hover, e.g. `<a {...cursorHover('view', 'Open')} />`.
 */
export function useCursorHover() {
  const { setCursor, resetCursor } = useCursor();
  return (variant: CursorVariant, label = '') => ({
    onMouseEnter: () => setCursor(variant, label),
    onMouseLeave: () => resetCursor(),
  });
}
