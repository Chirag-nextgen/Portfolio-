'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';

/** Wraps next-themes with the project's defaults (class strategy, dark default). */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemeProvider>
  );
}
