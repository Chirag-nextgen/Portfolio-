'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useCursorHover } from '@/providers/CursorProvider';

type ArrowLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

/** Text link with a sliding arrow affordance. */
export function ArrowLink({ href, children, className, external }: ArrowLinkProps) {
  const cursor = useCursorHover();
  const props = external ? { target: '_blank', rel: 'noreferrer' } : {};

  return (
    <Link
      href={href}
      {...props}
      {...cursor('link')}
      className={cn(
        'group inline-flex items-center gap-2 text-sm font-medium text-ink',
        className,
      )}
    >
      <span className="link-underline">{children}</span>
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-300 ease-expo group-hover:translate-x-1 group-hover:-translate-y-0.5"
        aria-hidden
      >
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>
    </Link>
  );
}
