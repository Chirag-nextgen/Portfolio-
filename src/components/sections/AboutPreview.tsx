'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { stats } from '@/lib/expertise';
import { FadeIn } from '@/components/motion/FadeIn';
import { ArrowLink } from '@/components/ui/ArrowLink';

const WORDS =
  'I treat the browser as a craft surface — where milliseconds, motion, and meaning all matter. The result is work that feels effortless because the engineering underneath isn’t.'.split(
    ' ',
  );

/**
 * Manifesto block where the statement reveals word-by-word, tied to scroll
 * progress (scroll-driven storytelling), backed by headline stats.
 */
export function AboutPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'start 0.25'],
  });

  return (
    <section className="container-edge py-28 md:py-40">
      <p className="eyebrow mb-12">[ Ethos ]</p>

      <div ref={ref} className="max-w-5xl">
        <p className="flex flex-wrap font-display text-fluid-3xl leading-[1.18] tracking-tight">
          {WORDS.map((word, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / WORDS.length, (i + 1) / WORDS.length]}>
              {word}
            </Word>
          ))}
        </p>
      </div>

      <div className="mt-16">
        <ArrowLink href="/about">More about me</ArrowLink>
      </div>

      <dl className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
        {stats.map((s, i) => (
          <FadeIn key={s.label} delay={i * 0.08} className="flex flex-col gap-2">
            <dt className="font-display text-fluid-4xl tracking-tightest text-ink">
              {s.value}
            </dt>
            <dd className="text-sm text-muted text-pretty">{s.label}</dd>
          </FadeIn>
        ))}
      </dl>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <span className="relative mr-[0.28em] mt-[0.1em]">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}
