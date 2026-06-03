import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import { PageHeader } from '@/components/ui/PageHeader';
import { FadeIn } from '@/components/motion/FadeIn';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Notes on frontend engineering, motion, performance, and design systems.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHeader
        eyebrow="Journal"
        title="Notes on the craft."
        intro="Essays on motion, performance, and building interfaces that last."
      />

      <section className="container-edge pb-32">
        {posts.length === 0 ? (
          <p className="text-muted">New writing is on the way.</p>
        ) : (
          <ul className="border-t border-line/10">
            {posts.map((post, i) => (
              <li key={post.slug}>
                <FadeIn delay={i * 0.05}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid grid-cols-1 gap-3 border-b border-line/10 py-10 md:grid-cols-12 md:items-baseline md:gap-8"
                >
                  <div className="flex items-center gap-4 font-mono text-xs text-faint md:col-span-3">
                    <span>{formatDate(post.date)}</span>
                    <span>·</span>
                    <span>{post.readingTime} min</span>
                  </div>
                  <div className="md:col-span-6">
                    <h2 className="font-display text-fluid-2xl leading-tight tracking-tight transition-colors group-hover:text-accent">
                      {post.title}
                    </h2>
                    <p className="mt-2 max-w-xl text-muted text-pretty">{post.description}</p>
                  </div>
                  <ul className="flex flex-wrap gap-2 md:col-span-3 md:justify-end">
                    {post.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-line/15 px-3 py-1 text-xs text-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </Link>
                </FadeIn>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
