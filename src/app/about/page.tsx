import type { Metadata } from 'next';
import { bio, timeline, principles } from '@/lib/about';
import { site } from '@/lib/site';
import { PageHeader } from '@/components/ui/PageHeader';
import { FadeIn } from '@/components/motion/FadeIn';
import { RevealImage } from '@/components/media/RevealImage';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Expertise } from '@/components/sections/Expertise';
import { ContactCTA } from '@/components/sections/ContactCTA';

export const metadata: Metadata = {
  title: 'About',
  description: `About ${site.name} — senior frontend engineer focused on motion, performance, and design systems.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Engineer. Designer’s ally. Detail obsessive."
      />

      {/* Bio + portrait */}
      <section className="container-edge grid grid-cols-1 gap-12 pb-28 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5 md:sticky md:top-28 md:self-start">
          <RevealImage
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80"
            alt={`Portrait of ${site.name}`}
            className="aspect-[4/5] w-full"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
        <div className="flex flex-col gap-6 md:col-span-7 md:pt-4">
          {bio.map((p, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <p
                className={
                  i === 0
                    ? 'font-display text-fluid-2xl leading-snug tracking-tight text-balance'
                    : 'text-fluid-lg text-muted text-pretty'
                }
              >
                {p}
              </p>
            </FadeIn>
          ))}

          <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line/10 sm:grid-cols-2">
            {principles.map((pr, i) => (
              <FadeIn
                key={pr.title}
                delay={i * 0.06}
                className="bg-ink/[0.015] p-6"
              >
                <h3 className="font-display text-fluid-lg tracking-tight">{pr.title}</h3>
                <p className="mt-2 text-sm text-muted text-pretty">{pr.body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Expertise />

      {/* Timeline */}
      <section className="container-edge py-28 md:py-40">
        <SectionHeading index="03" eyebrow="Trajectory" title="A short history." />
        <div className="mt-16 border-t border-line/10">
          {timeline.map((t, i) => (
            <FadeIn
              key={i}
              delay={i * 0.05}
              className="grid grid-cols-1 gap-2 border-b border-line/10 py-8 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <span className="font-mono text-xs text-faint md:col-span-3">{t.period}</span>
              <div className="md:col-span-4">
                <h3 className="font-display text-fluid-xl tracking-tight">{t.role}</h3>
                <p className="text-sm text-accent">{t.org}</p>
              </div>
              <p className="text-sm text-muted text-pretty md:col-span-5">{t.note}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
