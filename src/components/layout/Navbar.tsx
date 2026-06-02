'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { nav, site } from '@/lib/site';
import { cn } from '@/lib/utils';
import { EASE_EXPO } from '@/lib/motion';
import { ThemeToggle } from './ThemeToggle';
import { Magnetic } from '@/components/motion/Magnetic';
import { useCursorHover } from '@/providers/CursorProvider';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const cursor = useCursorHover();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <motion.div
        className={cn(
          'pointer-events-auto transition-[background-color,backdrop-filter,border-color] duration-500',
          scrolled
            ? 'border-b border-line/10 bg-paper/70 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <nav className="container-edge flex h-[var(--nav-h,4.5rem)] items-center justify-between">
          <Magnetic strength={0.25}>
            <Link
              href="/"
              {...cursor('link')}
              className="font-display text-lg font-medium tracking-tight"
            >
              {site.name}
              <span className="text-accent">.</span>
            </Link>
          </Magnetic>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                {...cursor('link')}
                className="group relative px-3.5 py-2 text-sm text-muted transition-colors hover:text-ink"
              >
                <span className={cn(isActive(item.href) && 'text-ink')}>{item.label}</span>
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-px h-px bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <div className="ml-3">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line/15"
            >
              <div className="relative h-3 w-5">
                <motion.span
                  className="absolute left-0 top-0 h-px w-full bg-ink"
                  animate={open ? { rotate: 45, top: '50%' } : { rotate: 0, top: 0 }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 h-px w-full bg-ink"
                  animate={open ? { rotate: -45, bottom: '50%' } : { rotate: 0, bottom: 0 }}
                />
              </div>
            </button>
          </div>
        </nav>
      </motion.div>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.6, ease: EASE_EXPO }}
            className="pointer-events-auto fixed inset-0 top-0 z-40 flex flex-col justify-center bg-paper px-8 md:hidden"
          >
            <ul className="space-y-2">
              {nav.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.span
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.7, ease: EASE_EXPO }}
                    className="block"
                  >
                    <Link
                      href={item.href}
                      className="font-display text-5xl tracking-tightest text-ink"
                    >
                      {item.label}
                    </Link>
                  </motion.span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
