'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Project } from '@/lib/projects';
import { EASE_EXPO } from '@/lib/motion';
import { RevealText } from '@/components/motion/RevealText';
import { FadeIn } from '@/components/motion/FadeIn';
import { RevealImage } from '@/components/media/RevealImage';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { useCursor } from '@/providers/CursorProvider';

type CaseStudyProps = { project: Project; prev: Project; next: Project };

export function CaseStudy({ project, prev, next }: CaseStudyProps) {
  const { setCursor, resetCursor } = useCursor();

  return (
    <article>
      {/* Hero */}
      <header className="container-edge pb-12 pt-[calc(var(--nav-h,4.5rem)+4rem)] md:pt-[calc(var(--nav-h,4.5rem)+6rem)]">
        <FadeIn>
          <Link
            href="/work"
            className="link-underline mb-12 inline-flex items-center gap-2 text-sm text-muted"
          >
            <span aria-hidden>←</span> All work
          </Link>
        </FadeIn>

        <p className="eyebrow mb-6" style={{ color: project.accent }}>
          {project.client} · {project.discipline}
        </p>
        <h1 className="max-w-5xl font-display text-fluid-6xl font-medium leading-[0.9] tracking-tightest">
          <RevealText text={project.title} whileInView={false} />
        </h1>
        <FadeIn delay={0.3} className="mt-8 max-w-2xl">
          <p className="text-fluid-lg text-muted text-pretty">{project.summary}</p>
        </FadeIn>

        {/* Meta row */}
        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line/10 pt-8 md:grid-cols-4">
          {[
            { k: 'Role', v: project.role },
            { k: 'Year', v: project.year },
            { k: 'Discipline', v: project.discipline },
            { k: 'Stack', v: project.stack.slice(0, 3).join(', ') },
          ].map((item) => (
            <div key={item.k} className="flex flex-col gap-2">
              <dt className="eyebrow">{item.k}</dt>
              <dd className="text-sm text-ink">{item.v}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* Cover */}
      <div className="container-edge">
        <RevealImage
          src={project.cover}
          alt={project.title}
          className="aspect-[16/9] w-full"
          sizes="100vw"
          priority
        />
      </div>

      {/* Metrics */}
      <section className="container-edge py-24 md:py-32">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {project.metrics.map((m, i) => (
            <FadeIn key={m.label} delay={i * 0.1} className="flex flex-col gap-3">
              <span
                className="font-display text-fluid-5xl tracking-tightest"
                style={{ color: project.accent }}
              >
                {m.value}
              </span>
              <span className="text-sm text-muted text-pretty">{m.label}</span>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Problem */}
      <NarrativeBlock label="01 — The Problem" paragraphs={project.problem} />

      {/* Process */}
      <section className="border-y border-line/10 bg-ink/[0.015]">
        <div className="container-edge py-24 md:py-32">
          <p className="eyebrow mb-16">02 — The Process</p>
          <div className="flex flex-col gap-20">
            {project.process.map((step, i) => (
              <FadeIn
                key={step.heading}
                className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10"
              >
                <span className="font-mono text-xs text-accent md:col-span-2">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-fluid-2xl leading-tight tracking-tight md:col-span-5">
                  {step.heading}
                </h3>
                <div className="flex flex-col gap-4 text-muted text-pretty md:col-span-5">
                  {step.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="container-edge py-24 md:py-32">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {project.gallery.map((img, i) => (
            <RevealImage
              key={i}
              src={img.src}
              alt={img.alt}
              className="aspect-[4/3] w-full"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ))}
        </div>
      </section>

      {/* Outcome */}
      <NarrativeBlock label="03 — The Outcome" paragraphs={project.outcome} accent>
        {project.liveUrl && (
          <div className="mt-10">
            <ArrowLink href={project.liveUrl} external>
              Visit the live project
            </ArrowLink>
          </div>
        )}
      </NarrativeBlock>

      {/* Next project */}
      <Link
        href={`/work/${next.slug}`}
        onMouseEnter={() => setCursor('view', 'Next')}
        onMouseLeave={resetCursor}
        className="group block border-t border-line/10"
      >
        <div className="container-edge py-20 md:py-28">
          <p className="eyebrow mb-6">Next project</p>
          <div className="flex items-center justify-between gap-6">
            <motion.h2
              className="font-display text-fluid-5xl tracking-tightest transition-colors group-hover:text-accent"
              whileHover={{ x: 16 }}
              transition={{ duration: 0.5, ease: EASE_EXPO }}
            >
              {next.title}
            </motion.h2>
            <span className="font-mono text-xs text-faint">{next.discipline}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function NarrativeBlock({
  label,
  paragraphs,
  accent,
  children,
}: {
  label: string;
  paragraphs: string[];
  accent?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className="container-edge py-24 md:py-32">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <p className="eyebrow md:col-span-4">{label}</p>
        <div className="md:col-span-8">
          <div className="flex max-w-2xl flex-col gap-6">
            {paragraphs.map((p, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <p
                  className={
                    accent && i === 0
                      ? 'font-display text-fluid-2xl leading-snug tracking-tight text-ink'
                      : 'text-fluid-lg text-muted text-pretty'
                  }
                >
                  {p}
                </p>
              </FadeIn>
            ))}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
