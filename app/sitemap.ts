import type { MetadataRoute } from 'next';
import { getProjects } from '@/lib/projects';
import { projectPath, SITE_URL } from '@/lib/project-content';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects(true);
  return [
    ...['', '/projects', '/about', '/blog'].map((path) => ({ url: `${SITE_URL}${path}` })),
    ...projects.filter((project) => !project.data.noindex).map((project) => ({
      url: `${SITE_URL}${projectPath(project.uid!)}`,
      lastModified: project.last_publication_date,
    })),
  ];
}
