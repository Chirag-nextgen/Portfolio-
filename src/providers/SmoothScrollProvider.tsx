'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

/**
 * Drives momentum/smooth scrolling with Lenis and syncs it to GSAP's
 * ScrollTrigger so scroll-driven animations stay perfectly in step.
 * Disabled entirely for reduced-motion users — native scroll takes over.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Expose globally so other components can scroll programmatically.
    window.__lenis = lenis;

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, [reduced]);

  return <>{children}</>;
}

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}
