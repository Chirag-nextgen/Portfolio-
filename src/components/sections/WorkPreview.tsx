'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { projects } from '@/lib/projects';
import { pad } from '@/lib/utils';
import { EASE_EXPO } from '@/lib/motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { useCursor } from '@/providers/CursorProvider';
import { useHasPointer } from '@/hooks/useMediaQuery';

/**
 * Selected work as an editorial index. Hovering a row floats a project
 * preview that tracks the cursor; the row text shifts to signal focus.
 */
export function WorkPreview() {
  const [active, setActive] = useState<number | null>(null);
  const hasPointer = useHasPointer();
  const { setCursor, resetCursor } = useCursor();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 150, damping: 20, mass: 0.6 });
  const y = useSpring(my, { stiffness: 150, damping: 20, mass: 0.6 });
  const containerRef = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  }

  return (
    <section id="work-preview" className="container-edge py-28 md:py-40">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading index="01" eyebrow="Selected Work" title="Projects worth the deep dive." />
        <ArrowLink href="/work" className="shrink-0">
          All projects
        </ArrowLink>
      </div>

      <div ref={containerRef} className="relative mt-16" onMouseMove={onMove}>
        {/* Floating cursor-tracking preview */}
        {hasPointer && (
          <AnimatePresence>
            {active !== null && (
              <motion.div
                key="preview"
                style={{ x, y, translateX: '-50%', translateY: '-50%' }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.4, ease: EASE_EXPO }}
                className="pointer-events-none absolute left-0 top-0 z-20 hidden aspect-[4/3] w-[26vw] max-w-sm overflow-hidden rounded-lg md:block"
              >
                {projects.map((p, i) => (
                  <motion.div
                    key={p.slug}
                    animate={{ opacity: active === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={p.cover}
                      alt=""
                      fill
                      sizes="26vw"
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}

        <ul className="border-t border-line/10">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                onMouseEnter={() => {
                  setActive(i);
                  setCursor('view', 'View');
                }}
                onMouseLeave={() => {
                  setActive(null);
                  resetCursor();
                }}
                className="group relative flex items-center gap-6 border-b border-line/10 py-7 md:py-9"
              >
                <span className="font-mono text-xs text-faint">{pad(i + 1)}</span>

                <motion.div
                  className="flex flex-1 flex-col gap-1 md:flex-row md:items-baseline md:gap-6"
                  animate={{ x: hasPointer && active === i ? 24 : 0 }}
                  transition={{ duration: 0.5, ease: EASE_EXPO }}
                >
                  <h3 className="font-display text-fluid-2xl tracking-tightest text-ink transition-colors group-hover:text-accent">
                    {project.title}
                  </h3>
                  <span className="text-sm text-muted">{project.excerpt}</span>
                </motion.div>

                <span className="hidden font-mono text-xs text-faint md:block">
                  {project.discipline}
                </span>
                <span className="font-mono text-xs text-faint">{project.year}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
