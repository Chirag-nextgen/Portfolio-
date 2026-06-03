/** Narrative + timeline content for the About page. */

export const bio = [
  'I’m Chirag Suthar — a senior frontend engineer with eight years spent at the intersection of engineering and design. I care about the details most people never notice, because those are the ones everybody feels.',
  'My work spans realtime trading systems, multiplayer AI tools, design systems used by entire orgs, and award-winning immersive experiences. The throughline is craft: interfaces that are fast, accessible, and quietly delightful.',
  'I believe the best frontend work is invisible. When motion is purposeful, performance is a feature, and accessibility is a default — the product simply feels right, and the engineering disappears beneath the experience.',
];

export type TimelineEntry = {
  period: string;
  role: string;
  org: string;
  note: string;
};

export const timeline: TimelineEntry[] = [
  {
    period: '2023 — Now',
    role: 'Senior Frontend Engineer',
    org: 'Independent · Select clients',
    note: 'Leading frontend architecture and creative engineering for product and studio teams.',
  },
  {
    period: '2021 — 2023',
    role: 'Lead Frontend Engineer',
    org: 'Aurora Markets',
    note: 'Owned the realtime terminal platform and the design system powering it.',
  },
  {
    period: '2019 — 2021',
    role: 'Frontend Engineer',
    org: 'Northwind',
    note: 'Built the component library and accessibility practice across eleven product squads.',
  },
  {
    period: '2017 — 2019',
    role: 'Frontend Developer',
    org: 'Studio collective',
    note: 'Creative development for brands — WebGL, motion, and editorial sites.',
  },
];

export const principles = [
  { title: 'Motion with intent', body: 'Animation should guide attention and add meaning — never decorate.' },
  { title: 'Performance is UX', body: 'A fast interface is a respectful one. Budgets are set before pixels.' },
  { title: 'Accessible by default', body: 'Keyboard, screen reader, and reduced-motion paths are first-class.' },
  { title: 'Systems over screens', body: 'Reusable primitives compound; one-off screens don’t scale.' },
];
