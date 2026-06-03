'use client';

import { ThemeProvider } from '@/providers/ThemeProvider';
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider';
import { CursorProvider } from '@/providers/CursorProvider';
import { Cursor } from '@/components/cursor/Cursor';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollProgress } from './ScrollProgress';
import { ImageDistortionFilter } from '@/components/media/RevealImage';

/**
 * Client-side application shell: wires up theming, smooth scroll, the custom
 * cursor, and the persistent chrome (nav/footer) around routed page content.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CursorProvider>
        <SmoothScrollProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
          >
            Skip to content
          </a>
          <Cursor />
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <ImageDistortionFilter />
        </SmoothScrollProvider>
      </CursorProvider>
    </ThemeProvider>
  );
}
