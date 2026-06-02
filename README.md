# Chirag Suthar — Portfolio

A personal portfolio for a senior frontend engineer. **Minimalist on the surface, extraordinary underneath**: a calm, editorial first impression that reveals depth through purposeful, physics-based interaction.

The site is built to *be* the proof of skill — every interaction is hand-tuned, accessible, and performant.

## Highlights

- **Custom WebGL hero** — a domain-warped fluid gradient rendered from a single full-screen fragment shader (raw WebGL, no three.js), reacting to the cursor, with a tasteful static fallback.
- **Physics-based motion** — spring transitions, a magnetic custom cursor, staggered text reveals, and scroll-driven storytelling (parallax, word-by-word reveals, morphing type).
- **Seamless page transitions** — curtain reveal + fade choreographed on every route change.
- **Editorial layout** — asymmetric grids, oversized variable type, intentional negative space. No generic cards.
- **Smooth, momentum scrolling** via Lenis, synced to GSAP ScrollTrigger.
- **Dark / light theming** with smooth, variable-driven transitions.
- **MDX-powered journal** with syntax highlighting (Shiki / rehype-pretty-code).
- **Deep-dive case studies** — each project has its own rich page (problem · process · tech · outcomes · visuals).
- **Accessible & performant** — semantic HTML, keyboard nav, focus states, `prefers-reduced-motion` paths everywhere, lazy/optimized images, fully static export.

## Tech stack

| Concern        | Choice                                            |
| -------------- | ------------------------------------------------- |
| Framework      | Next.js 14 (App Router) + TypeScript              |
| Styling        | Tailwind CSS (CSS-variable theme, fluid type)     |
| Motion         | Framer Motion + GSAP / ScrollTrigger              |
| Smooth scroll  | Lenis                                             |
| WebGL          | Raw WebGL fragment shader                         |
| Content        | MDX (`next-mdx-remote`) + structured data layer   |
| Theming        | `next-themes`                                     |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build (fully static)
npm run start      # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Project structure

```
content/
  blog/                  MDX journal entries (frontmatter + body)
src/
  app/                   App Router routes
    page.tsx             Home (hero + sections)
    work/                Work index + [slug] case studies
    about/               About page
    blog/                Journal index + [slug] articles
    contact/             Contact page + form
    template.tsx         Per-navigation page transition
    layout.tsx           Root layout, fonts, metadata
    globals.css          Theme tokens + base styles
  components/
    layout/              Navbar, Footer, ThemeToggle, ScrollProgress, AppShell
    sections/            Composed home/page sections
    motion/              RevealText, FadeIn, Magnetic, Marquee
    cursor/              Custom animated cursor
    webgl/               FluidGradient shader
    media/               RevealImage (clip reveal + parallax + hover distortion)
    mdx/                 MDX element overrides
    ui/                  Small shared primitives
  hooks/                 useMediaQuery, useMagnetic, …
  providers/             Theme, SmoothScroll (Lenis), Cursor context
  lib/                   site config, content layers, motion + utils
```

## Content

- **Projects** live as typed data in `src/lib/projects.ts` — the index and case-study pages read from one source.
- **Blog posts** are MDX files in `content/blog/`. Add a file with frontmatter (`title`, `description`, `date`, `tags`) and it appears automatically.

## Accessibility & motion

Every animation has a reduced-motion path. When `prefers-reduced-motion: reduce` is set, smooth scroll is disabled, the WebGL shader is replaced with a static gradient, and transforms/parallax are removed while feedback is preserved. The custom cursor only mounts on fine-pointer devices.
