'use client';

import { useEffect, useState } from 'react';

/** Subscribe to a CSS media query. Returns false during SSR. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** True when the user has requested reduced motion. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/** True on fine-pointer devices that support hover (i.e. not touch). */
export function useHasPointer(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}
