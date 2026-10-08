import type { ReactNode } from 'react';
import { createClient } from '@/prismicio';
import { getProjects } from '@/lib/projects';
import { catalogueCaseContent } from '@/lib/catalogue-case-content';
import ProjectsClient from '@/components/projects/ProjectsClient';
import ProjectCatalogue from '@/components/projects/ProjectCatalogue';
import { ProjectNavigation } from '@/components/projects/ProjectNavigation';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default async function ProjectsLayout({ children }: { children: ReactNode }) {
  const client = createClient({ fetchOptions: { cache: 'no-store' } });
  const [page, projects] = await Promise.all([client.getSingle('projects'), getProjects()]);
  const projectLinks = Object.fromEntries(projects.map((project) => [project.id, project.uid!]));
  const projectSlugs = projects.map((project) => project.uid!);
  if (process.env.NODE_ENV === 'development' && !projectSlugs.includes('yota')) projectSlugs.push('yota');
  // Keep the catalogue mounted when a case opens, preserving filters and scroll.
  return (
    <ProjectNavigation>
      <ProjectCatalogue>
        <ProjectsClient slices={page.data.slices} projectLinks={projectLinks} projectSlugs={projectSlugs} caseContent={catalogueCaseContent(projects)} />
        <Footer />
      </ProjectCatalogue>
      {children}
    </ProjectNavigation>
  );
}
