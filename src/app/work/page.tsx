import type { Metadata } from 'next';
import { projects } from '@/lib/projects';
import { PageHeader } from '@/components/ui/PageHeader';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { WorkGrid } from './WorkGrid';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected case studies — realtime systems, design systems, AI products, and immersive web.',
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Selected Work · 2024–2025"
        title="Case studies, in depth."
        intro="A handful of projects I’m proud of — each one a problem, a process, and an outcome worth telling."
      />
      <WorkGrid projects={projects} />
      <ContactCTA />
    </>
  );
}
