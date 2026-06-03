'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { site } from '@/lib/site';
import { RevealText } from '@/components/motion/RevealText';
import { Magnetic } from '@/components/motion/Magnetic';
import { useCursorHover } from '@/providers/CursorProvider';

/** Closing call-to-action with a scroll-scaled oversized headline. */
export function ContactCTA() {
  const ref = useRef<HTMLElement>(null);
  const cursor = useCursorHover();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  return (
    <section ref={ref} className="container-edge py-28 text-center md:py-40">
      <p className="eyebrow mb-10">Available — {site.availability}</p>

      <motion.h2
        style={{ scale }}
        className="mx-auto max-w-5xl font-display text-fluid-5xl font-medium leading-[0.95] tracking-tightest"
      >
        <RevealText text="Have a project in mind?" />
        <span className="block text-muted">
          <RevealText text="Let’s make it remarkable." delay={0.1} />
        </span>
      </motion.h2>

      <div className="mt-14 flex justify-center">
        <Magnetic strength={0.5}>
          <a
            href="/contact"
            {...cursor('link')}
            className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-paper transition-colors hover:bg-accent"
          >
            <span className="text-sm font-medium">Start a conversation</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </Magnetic>
      </div>
    </section>
  );
}
