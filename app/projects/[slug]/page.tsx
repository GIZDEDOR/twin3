import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { isFilled } from '@prismicio/client';
import { getProject, getProjects } from '@/lib/projects';
import { projectDescription, projectPath, SITE_URL } from '@/lib/project-content';
import ProjectOverlay from '@/components/projects/ProjectOverlay';
import ProjectDetail from '@/components/projects/ProjectDetail';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: 'Кейс не найден | Twin3D', robots: { index: false, follow: true } };
  const preview = (await draftMode()).isEnabled;
  const title = project.data.meta_title?.trim() || `${project.data.title} | Twin3D`;
  const description = projectDescription(project);
  const url = `${SITE_URL}${projectPath(project.uid!)}`;
  const image = isFilled.image(project.data.og_image) ? project.data.og_image : project.data.cover;
  const images = isFilled.image(image)
    ? [{ url: image.url, width: image.dimensions.width, height: image.dimensions.height, alt: image.alt || project.data.title || '' }]
    : [];
  return {
    title, description,
    alternates: { canonical: url },
    robots: { index: !preview && !project.data.noindex, follow: true },
    openGraph: { title, description, url, type: 'article', siteName: 'Twin3D', locale: 'ru_RU', images },
    twitter: { card: 'summary_large_image', title, description, images: images.map((item) => item.url) },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();
  const projects = await getProjects();
  const related = projects.filter((item) =>
    item.id !== project.id && !item.data.noindex && project.data.category && item.data.category === project.data.category,
  ).slice(0, 3);
  return <ProjectOverlay key={slug} slug={slug}><ProjectDetail project={project} related={related} /></ProjectOverlay>;
}
