/** Global site metadata and navigation — single source of truth. */
export const site = {
  name: 'Chirag Suthar',
  role: 'Senior Frontend Engineer',
  tagline: 'I build fast, expressive interfaces where engineering rigor meets design craft.',
  location: 'Bengaluru, India',
  email: 'hello@chiragsuthar.dev',
  url: 'https://chiragsuthar.dev',
  availability: 'Open to select 2026 collaborations',
  socials: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'X / Twitter', href: 'https://x.com/' },
    { label: 'Read.cv', href: 'https://read.cv/' },
  ],
} as const;

export const nav = [
  { label: 'Index', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/blog' },
  { label: 'Contact', href: '/contact' },
] as const;
