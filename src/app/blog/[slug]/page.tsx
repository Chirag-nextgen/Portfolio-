import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import { getPost, getPostSlugs } from '@/lib/blog';
import { formatLongDate } from '@/lib/utils';
import { mdxComponents } from '@/components/mdx/MDXComponents';
import { FadeIn } from '@/components/motion/FadeIn';
import { RevealText } from '@/components/motion/RevealText';
import { ReadingProgress } from './ReadingProgress';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, type: 'article' },
  };
}

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: { dark: 'github-dark', light: 'github-light' } }],
    ],
  },
} as const;

export default function PostPage({ params }: Params) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <>
      <ReadingProgress />
      <article>
        <header className="container-edge pb-12 pt-[calc(var(--nav-h,4.5rem)+4rem)] md:pt-[calc(var(--nav-h,4.5rem)+6rem)]">
          <FadeIn>
            <Link
              href="/blog"
              className="link-underline mb-12 inline-flex items-center gap-2 text-sm text-muted"
            >
              <span aria-hidden>←</span> Journal
            </Link>
          </FadeIn>

          <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-faint">
            <time dateTime={post.date}>{formatLongDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingTime} min read</span>
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-line/15 px-2.5 py-0.5">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="max-w-4xl font-display text-fluid-5xl font-medium leading-[0.98] tracking-tightest">
            <RevealText text={post.title} whileInView={false} />
          </h1>
          <FadeIn delay={0.3} className="mt-8 max-w-2xl">
            <p className="text-fluid-lg text-muted text-pretty">{post.description}</p>
          </FadeIn>
        </header>

        <div className="hairline container-edge !w-auto" />

        <div className="container-edge max-w-3xl pb-32 pt-16">
          {/* @ts-expect-error Async Server Component */}
          <MDXRemote source={post.content} components={mdxComponents} options={mdxOptions} />
        </div>
      </article>
    </>
  );
}
