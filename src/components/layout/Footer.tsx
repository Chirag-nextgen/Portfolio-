'use client';

import Link from 'next/link';
import { site, nav } from '@/lib/site';
import { RevealText } from '@/components/motion/RevealText';
import { Magnetic } from '@/components/motion/Magnetic';
import { useCursorHover } from '@/providers/CursorProvider';

export function Footer() {
  const cursor = useCursorHover();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line/10 bg-paper">
      <div className="container-edge py-20 md:py-28">
        <p className="eyebrow mb-8">Let’s build something</p>

        <Magnetic strength={0.18}>
          <a
            href={`mailto:${site.email}`}
            {...cursor('link')}
            className="link-underline inline-block font-display text-fluid-4xl leading-[0.95] tracking-tightest text-ink"
          >
            <RevealText text={site.email} stagger={0.02} />
          </a>
        </Magnetic>

        <div className="mt-16 grid grid-cols-2 gap-10 md:grid-cols-4">
          <nav className="flex flex-col gap-3">
            <span className="eyebrow">Sitemap</span>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                {...cursor('link')}
                className="link-underline w-fit text-sm text-muted hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <nav className="flex flex-col gap-3">
            <span className="eyebrow">Elsewhere</span>
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                {...cursor('link')}
                className="link-underline w-fit text-sm text-muted hover:text-ink"
              >
                {s.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="eyebrow">Status</span>
            <p className="flex items-center gap-2 text-sm text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {site.availability}
            </p>
            <p className="text-sm text-muted">{site.location}</p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <span className="eyebrow">Local time</span>
            <LocalClock />
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-line/10 pt-8 text-xs text-faint md:flex-row md:items-center">
          <p>
            © {year} {site.name}. Designed &amp; built from scratch.
          </p>
          <p className="font-mono">Next.js · TypeScript · WebGL · Framer Motion · GSAP</p>
        </div>
      </div>

      {/* Oversized watermark wordmark. */}
      <div
        aria-hidden
        className="pointer-events-none select-none px-4 text-center font-display text-[22vw] leading-[0.8] tracking-tightest text-ink/[0.04]"
      >
        Suthar
      </div>
    </footer>
  );
}

function LocalClock() {
  return (
    <time className="font-mono text-sm text-muted" suppressHydrationWarning>
      {new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Kolkata',
      })}{' '}
      IST
    </time>
  );
}
