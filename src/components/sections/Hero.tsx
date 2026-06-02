'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { site } from '@/lib/site';
import { EASE_EXPO } from '@/lib/motion';
import { FluidGradient } from '@/components/webgl/FluidGradient';
import { RevealText } from '@/components/motion/RevealText';
import { useCursorHover } from '@/providers/CursorProvider';

/**
 * Calm, confident first viewport: one oversized statement over a living
 * WebGL gradient. Content parallaxes and fades as the user scrolls away.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const cursor = useCursorHover();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '24%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const gradientScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-20 pt-[var(--nav-h,4.5rem)]"
    >
      {/* WebGL gradient, masked into an orb that sits behind the type. */}
      <motion.div
        aria-hidden
        style={{ scale: gradientScale }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute right-[-10%] top-[8%] h-[60vh] w-[60vh] opacity-90 blur-[2px] md:right-[6%] md:h-[70vh] md:w-[70vh]">
          <div className="h-full w-full overflow-hidden rounded-full">
            <FluidGradient />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-paper/0 via-paper/40 to-paper" />
      </motion.div>

      <motion.div style={{ y, opacity }} className="container-edge">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="eyebrow mb-8 flex items-center gap-3"
        >
          <span className="inline-block h-px w-8 bg-accent" />
          {site.role} · {site.location}
        </motion.p>

        <h1 className="font-display text-fluid-6xl font-medium leading-[0.92] tracking-tightest">
          <span className="block">
            <RevealText text="Interfaces with" whileInView={false} delay={0.5} />
          </span>
          <span className="block text-muted">
            <RevealText text="engineering rigor" whileInView={false} delay={0.62} />
          </span>
          <span className="block">
            <RevealText text="& design soul." whileInView={false} delay={0.74} />
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.9, ease: EASE_EXPO }}
          className="mt-10 flex max-w-xl flex-col gap-8 text-fluid-base text-muted text-pretty md:mt-14"
        >
          <p>
            I’m {site.name.split(' ')[0]}, a senior frontend engineer crafting fast,
            expressive products — from realtime systems to design languages that scale.
          </p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#work-preview"
              {...cursor('link')}
              className="group inline-flex items-center gap-3 text-ink"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full border border-line/20 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-paper">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </span>
              <span className="text-sm font-medium">Selected work</span>
            </a>
            <span className="text-sm text-faint">
              {site.availability}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        style={{ opacity }}
        className="container-edge pointer-events-none absolute inset-x-0 bottom-8 hidden items-center justify-between md:flex"
      >
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
          Scroll to explore
        </span>
        <span className="font-mono text-xs text-faint">{site.email}</span>
      </motion.div>
    </section>
  );
}
