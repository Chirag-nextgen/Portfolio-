/**
 * Selected work content layer.
 * Projects are authored as structured data so the index and the deep-dive
 * case-study pages stay in sync from one source.
 */

export type ProjectMetric = { value: string; label: string };

export type ProjectSection = {
  heading: string;
  body: string[];
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  role: string;
  discipline: string;
  summary: string;
  /** One-line hook used on the index. */
  excerpt: string;
  accent: string; // hex used for per-project theming accents
  cover: string;
  stack: string[];
  metrics: ProjectMetric[];
  problem: string[];
  process: ProjectSection[];
  outcome: string[];
  gallery: { src: string; alt: string }[];
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: 'aurora-trading-terminal',
    title: 'Aurora',
    client: 'Aurora Markets',
    year: '2025',
    role: 'Lead Frontend Engineer',
    discipline: 'Realtime data · Design systems',
    summary:
      'A realtime trading terminal rendering tens of thousands of live price updates per second without dropping a frame.',
    excerpt: 'A 60fps realtime trading terminal.',
    accent: '#5a46e5',
    cover:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=2000&q=80',
    stack: ['Next.js', 'TypeScript', 'WebGL', 'Web Workers', 'WebSockets', 'Zustand'],
    metrics: [
      { value: '60fps', label: 'Sustained under 40k updates/s' },
      { value: '−74%', label: 'Main-thread jank' },
      { value: '120ms', label: 'p95 interaction latency' },
    ],
    problem: [
      'Aurora’s legacy terminal buckled under load. As markets opened, the React tree re-rendered on every tick, the main thread saturated, and traders watched the UI stutter at precisely the moment milliseconds mattered most.',
      'The mandate was uncompromising: render the full depth-of-book, live charts, and order blotter at a locked 60fps — on a five-year-old laptop, over a flaky connection.',
    ],
    process: [
      {
        heading: 'Move computation off the critical path',
        body: [
          'I moved the socket connection and all numeric aggregation into a dedicated Web Worker, streaming only diffed, frame-budgeted snapshots back to the UI thread.',
          'A custom virtualization layer rendered just the visible rows, recycling DOM nodes and bypassing React reconciliation for the hottest cells.',
        ],
      },
      {
        heading: 'Render charts on the GPU',
        body: [
          'Price charts were rebuilt on a WebGL canvas with a hand-written shader pipeline, so plotting 250k points cost almost nothing on the CPU.',
          'Everything degraded gracefully: reduced-motion users got a calm, static view, and unsupported browsers fell back to canvas 2D.',
        ],
      },
    ],
    outcome: [
      'The terminal now holds a locked 60fps through market-open volatility, with p95 interaction latency cut to 120ms.',
      'The virtualization and worker primitives were extracted into Aurora’s internal design system and now power four downstream products.',
    ],
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1642790551116-18e150f248e3?auto=format&fit=crop&w=1600&q=80',
        alt: 'Trading terminal dashboard with live charts',
      },
      {
        src: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1600&q=80',
        alt: 'Depth-of-book data visualization',
      },
    ],
    liveUrl: 'https://chiragsuthar.dev',
  },
  {
    slug: 'monolith-design-system',
    title: 'Monolith',
    client: 'Northwind',
    year: '2024',
    role: 'Design Systems Architect',
    discipline: 'Design systems · DX',
    summary:
      'A headless, token-driven design system that unified eleven product teams onto a single accessible component library.',
    excerpt: 'One design system, eleven product teams.',
    accent: '#0f766e',
    cover:
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=2000&q=80',
    stack: ['React', 'TypeScript', 'Radix', 'Style Dictionary', 'Storybook', 'Turborepo'],
    metrics: [
      { value: '11', label: 'Teams unified' },
      { value: '100%', label: 'WCAG 2.2 AA components' },
      { value: '−61%', label: 'Time to ship a new screen' },
    ],
    problem: [
      'Northwind’s eleven squads had each grown their own button. Accessibility was inconsistent, brand drift was visible, and every new screen reinvented the same primitives.',
      'I was brought in to design the system — and the adoption strategy that would actually get teams to use it.',
    ],
    process: [
      {
        heading: 'Tokens as the source of truth',
        body: [
          'Design decisions live as platform-agnostic tokens, transformed via Style Dictionary into CSS variables, Tailwind config, and native theme files from one pipeline.',
          'Theming — including a full dark mode — became a data change, not a code change.',
        ],
      },
      {
        heading: 'Accessible, headless primitives',
        body: [
          'Components were built headless on Radix, with every interactive element audited against WCAG 2.2 AA: focus management, keyboard semantics, and screen-reader behaviour shipped by default.',
          'Storybook doubled as living documentation and an automated accessibility + visual-regression gate in CI.',
        ],
      },
    ],
    outcome: [
      'All eleven teams migrated within two quarters; shipping a new screen got 61% faster.',
      'Accessibility regressions effectively went to zero, caught automatically before merge.',
    ],
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1600&q=80',
        alt: 'Design system component sheet',
      },
      {
        src: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1600&q=80',
        alt: 'Color token palette',
      },
    ],
  },
  {
    slug: 'sift-ai-workspace',
    title: 'Sift',
    client: 'Sift Labs',
    year: '2025',
    role: 'Founding Frontend Engineer',
    discipline: 'AI product · Streaming UX',
    summary:
      'A collaborative AI research workspace with streaming responses, live multiplayer cursors, and an editor that feels instant.',
    excerpt: 'A multiplayer AI research workspace.',
    accent: '#b91c1c',
    cover:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=2000&q=80',
    stack: ['Next.js', 'TypeScript', 'tRPC', 'CRDT', 'Server-Sent Events', 'Tailwind'],
    metrics: [
      { value: '0ms', label: 'Perceived edit latency' },
      { value: '40+', label: 'Concurrent live cursors' },
      { value: '3wk', label: 'Concept to launched beta' },
    ],
    problem: [
      'Sift needed an AI workspace that felt like a native app, not a chat box: streaming model output, real-time collaboration, and an editor with zero perceptible lag.',
      'As founding frontend engineer, I owned the entire client architecture from the first commit.',
    ],
    process: [
      {
        heading: 'Optimistic, conflict-free collaboration',
        body: [
          'The document layer is built on CRDTs, so edits apply instantly and merge without conflicts even when peers are offline.',
          'Presence and cursors stream over a lightweight channel, rendered off the main thread to stay smooth at 40+ participants.',
        ],
      },
      {
        heading: 'Streaming that feels alive',
        body: [
          'Model responses stream token-by-token over SSE with a typed, resumable client, gracefully recovering from dropped connections.',
          'Micro-interactions — a thinking shimmer, spring-eased message entrances — make latency feel intentional rather than slow.',
        ],
      },
    ],
    outcome: [
      'Sift went from concept to a launched, paying beta in three weeks.',
      'Edits feel instantaneous and collaboration is rock-solid, becoming the product’s most-praised quality in user interviews.',
    ],
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80',
        alt: 'Collaborative editor interface',
      },
      {
        src: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1600&q=80',
        alt: 'AI workspace with streaming responses',
      },
    ],
  },
  {
    slug: 'meridian-immersive-microsite',
    title: 'Meridian',
    client: 'Meridian Studio',
    year: '2024',
    role: 'Creative Frontend Engineer',
    discipline: 'WebGL · Creative dev',
    summary:
      'An award-winning immersive microsite blending WebGL, scroll-driven narrative, and editorial typography.',
    excerpt: 'An award-winning immersive microsite.',
    accent: '#c2410c',
    cover:
      'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?auto=format&fit=crop&w=2000&q=80',
    stack: ['Next.js', 'GLSL', 'GSAP', 'Lenis', 'WebGL', 'Framer Motion'],
    metrics: [
      { value: '94', label: 'Lighthouse performance' },
      { value: '2', label: 'Industry awards' },
      { value: '3.4×', label: 'Avg. session duration' },
    ],
    problem: [
      'Meridian wanted a launch experience that felt like a destination — immersive and cinematic — without sacrificing performance or accessibility.',
      'The challenge was holding real-time WebGL and scroll choreography to a 90+ Lighthouse score on mobile.',
    ],
    process: [
      {
        heading: 'Shaders with a performance budget',
        body: [
          'A custom GLSL fluid-distortion shader reacts to pointer and scroll, with quality that adapts to the device’s capabilities.',
          'Reduced-motion and low-power devices receive a refined static composition — never a broken one.',
        ],
      },
      {
        heading: 'Choreographed scroll narrative',
        body: [
          'GSAP ScrollTrigger and Lenis drive layered parallax and morphing type that reveals the story one beat at a time.',
          'Assets are streamed and decoded just-in-time so the first paint stays instant.',
        ],
      },
    ],
    outcome: [
      'The site won two industry awards and tripled average session duration.',
      'It sustained a 94 Lighthouse performance score — proving immersive and fast aren’t mutually exclusive.',
    ],
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91?auto=format&fit=crop&w=1600&q=80',
        alt: 'Immersive WebGL microsite hero',
      },
      {
        src: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&w=1600&q=80',
        alt: 'Fluid gradient shader detail',
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): { prev: Project; next: Project } {
  const i = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  return { prev, next };
}
