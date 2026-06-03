/** Expertise + skills content used on the home and about pages. */

export type Expertise = {
  title: string;
  blurb: string;
  skills: string[];
};

export const expertise: Expertise[] = [
  {
    title: 'Frontend Engineering',
    blurb:
      'Architecting large React/Next.js applications that stay fast and maintainable as teams and surface area grow.',
    skills: ['React', 'Next.js', 'TypeScript', 'Remix', 'State machines', 'Testing'],
  },
  {
    title: 'Motion & Creative Dev',
    blurb:
      'Physics-based motion, scroll choreography, and WebGL/GLSL accents that feel intentional — never decorative.',
    skills: ['Framer Motion', 'GSAP', 'WebGL / GLSL', 'Three.js', 'Lenis', 'Canvas'],
  },
  {
    title: 'Design Systems',
    blurb:
      'Token-driven, accessible component libraries that unify product teams and make the right thing the easy thing.',
    skills: ['Design tokens', 'Radix', 'Storybook', 'Tailwind', 'a11y (WCAG 2.2)', 'Monorepos'],
  },
  {
    title: 'Performance',
    blurb:
      'Profiling, budgeting, and shipping. Core Web Vitals treated as a feature, not an afterthought.',
    skills: ['Core Web Vitals', 'Profiling', 'Edge / RSC', 'Web Workers', 'Caching', 'Lighthouse'],
  },
];

export const stats = [
  { value: '8+', label: 'Years building for the web' },
  { value: '40+', label: 'Shipped products' },
  { value: '11', label: 'Teams aligned on systems' },
  { value: '90+', label: 'Typical Lighthouse score' },
];

export const stack = [
  'TypeScript',
  'React',
  'Next.js',
  'Framer Motion',
  'GSAP',
  'WebGL',
  'Tailwind CSS',
  'Node.js',
  'GraphQL',
  'Design Systems',
  'Accessibility',
  'Performance',
];
