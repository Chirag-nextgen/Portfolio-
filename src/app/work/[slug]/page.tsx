import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProject, getAdjacentProjects, projects } from '@/lib/projects';
import { CaseStudy } from './CaseStudy';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.client}`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.summary,
      images: [project.cover],
    },
  };
}

export default function ProjectPage({ params }: Params) {
  const project = getProject(params.slug);
  if (!project) notFound();
  const { prev, next } = getAdjacentProjects(params.slug);

  return <CaseStudy project={project} prev={prev} next={next} />;
}
