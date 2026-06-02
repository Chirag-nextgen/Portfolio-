import Link from 'next/link';
import type { MDXComponents } from 'mdx/types';
import { RevealImage } from '@/components/media/RevealImage';

/**
 * Element overrides for MDX content. Keeps article typography consistent
 * with the rest of the site and upgrades a few primitives.
 */
export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-16 scroll-mt-28 font-display text-fluid-2xl leading-tight tracking-tight"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-12 scroll-mt-28 font-display text-fluid-xl tracking-tight"
      {...props}
    />
  ),
  p: (props) => <p className="mt-6 text-fluid-lg leading-relaxed text-muted text-pretty" {...props} />,
  ul: (props) => <ul className="mt-6 list-disc space-y-2 pl-6 text-fluid-base text-muted" {...props} />,
  ol: (props) => <ol className="mt-6 list-decimal space-y-2 pl-6 text-fluid-base text-muted" {...props} />,
  li: (props) => <li className="pl-1 leading-relaxed" {...props} />,
  a: ({ href = '#', ...props }) => (
    <Link href={href} className="link-underline text-ink" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-10 border-l-2 border-accent pl-6 font-display text-fluid-xl italic leading-snug text-ink"
      {...props}
    />
  ),
  hr: () => <hr className="my-14 border-line/10" />,
  strong: (props) => <strong className="font-semibold text-ink" {...props} />,
  code: (props) => (
    <code
      className="rounded bg-ink/5 px-1.5 py-0.5 font-mono text-[0.85em] text-ink"
      {...props}
    />
  ),
  img: ({ src = '', alt = '' }) => (
    <span className="my-10 block">
      <RevealImage src={src} alt={alt} className="aspect-[16/9] w-full" sizes="100vw" />
    </span>
  ),
};
