'use client';

import { motion } from 'framer-motion';
import { expertise } from '@/lib/expertise';
import { pad } from '@/lib/utils';
import { EASE_EXPO } from '@/lib/motion';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * Expertise as an expandable editorial list rather than a grid of cards.
 * Each row's skill tags stagger in as it enters the viewport.
 */
export function Expertise() {
  return (
    <section className="border-y border-line/10 bg-ink/[0.015]">
      <div className="container-edge py-28 md:py-40">
        <SectionHeading index="02" eyebrow="Expertise" title="Four disciplines, one craft." />

        <div className="mt-16 border-t border-line/10">
          {expertise.map((item, i) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '0px 0px -12% 0px' }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
              }}
              className="grid grid-cols-1 items-start gap-6 border-b border-line/10 py-10 md:grid-cols-12 md:gap-10 md:py-12"
            >
              <div className="flex items-baseline gap-4 md:col-span-4">
                <span className="font-mono text-xs text-accent">{pad(i + 1)}</span>
                <h3 className="font-display text-fluid-xl tracking-tight">{item.title}</h3>
              </div>

              <p className="text-fluid-base text-muted text-pretty md:col-span-5">
                {item.blurb}
              </p>

              <ul className="flex flex-wrap gap-2 md:col-span-3 md:justify-end">
                {item.skills.map((skill) => (
                  <motion.li
                    key={skill}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_EXPO } },
                    }}
                    className="rounded-full border border-line/15 px-3 py-1 text-xs text-muted"
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
