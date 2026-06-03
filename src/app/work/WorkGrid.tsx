'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Project } from '@/lib/projects';
import { cn, pad } from '@/lib/utils';
import { EASE_EXPO } from '@/lib/motion';
import { RevealImage } from '@/components/media/RevealImage';
import { useCursor } from '@/providers/CursorProvider';

/**
 * Asymmetric editorial grid: alternating wide/offset projects, each a link
 * into its case study. Images reveal + parallax; the cursor reads "View".
 */
export function WorkGrid({ projects }: { projects: Project[] }) {
  const { setCursor, resetCursor } = useCursor();

  return (
    <div className="container-edge grid grid-cols-1 gap-x-8 gap-y-24 pb-28 md:grid-cols-12 md:gap-y-40">
      {projects.map((project, i) => {
        const offset = i % 2 === 1;
        return (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.8, ease: EASE_EXPO }}
            className={cn(
              'group',
              offset ? 'md:col-span-5 md:col-start-8 md:mt-32' : 'md:col-span-7',
            )}
          >
            <Link
              href={`/work/${project.slug}`}
              onMouseEnter={() => setCursor('view', 'View')}
              onMouseLeave={resetCursor}
              className="block"
            >
              <div className="flex items-center justify-between pb-4">
                <span className="font-mono text-xs text-faint">{pad(i + 1)} / {pad(projects.length)}</span>
                <span className="font-mono text-xs text-faint">{project.year}</span>
              </div>

              <RevealImage
                src={project.cover}
                alt={project.title}
                className={cn('w-full', offset ? 'aspect-[4/5]' : 'aspect-[16/11]')}
                sizes={offset ? '40vw' : '60vw'}
              />

              <div className="mt-6 flex items-start justify-between gap-6">
                <div>
                  <h2 className="font-display text-fluid-3xl tracking-tightest transition-colors group-hover:text-accent">
                    {project.title}
                  </h2>
                  <p className="mt-2 max-w-md text-muted text-pretty">{project.summary}</p>
                </div>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2">
                {project.stack.slice(0, 4).map((s) => (
                  <li key={s} className="rounded-full border border-line/15 px-3 py-1 text-xs text-muted">
                    {s}
                  </li>
                ))}
              </ul>
            </Link>
          </motion.article>
        );
      })}
    </div>
  );
}
