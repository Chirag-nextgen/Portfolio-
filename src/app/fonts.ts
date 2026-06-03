import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google';

/** Variable UI sans. */
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

/** Expressive variable serif used for oversized display type. */
export const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  axes: ['opsz'],
});

/** Monospace for eyebrows, metadata, and code. */
export const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});
