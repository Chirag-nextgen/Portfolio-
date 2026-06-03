import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { projects } from '@/lib/projects';
import { getPostSlugs } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ['', '/work', '/about', '/blog', '/contact'].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const work = projects.map((p) => ({
    url: `${site.url}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }));

  const posts = getPostSlugs().map((slug) => ({
    url: `${site.url}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...routes, ...work, ...posts];
}
