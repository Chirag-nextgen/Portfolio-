import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes with conflict resolution. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Format an ISO date string as e.g. "Apr 2024". */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

/** Format an ISO date string as e.g. "April 12, 2024". */
export function formatLongDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/** Estimate reading time in minutes from raw text. */
export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

/** Pad a number with a leading zero, e.g. 3 -> "03". */
export function pad(n: number): string {
  return String(n).padStart(2, '0');
}
