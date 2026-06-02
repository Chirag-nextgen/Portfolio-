import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { readingTime } from './utils';

/** Frontmatter + derived fields for a journal entry. */
export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: number;
};

export type Post = PostMeta & { content: string };

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function readPostFile(slug: string): Post {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? '',
    date: data.date ?? new Date().toISOString(),
    tags: data.tags ?? [],
    readingTime: readingTime(content),
    content,
  };
}

/** All posts, newest first. */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const { content, ...meta } = readPostFile(f.replace(/\.mdx$/, ''));
      return meta;
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPost(slug: string): Post | null {
  try {
    return readPostFile(slug);
  } catch {
    return null;
  }
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}
