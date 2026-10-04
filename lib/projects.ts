import { cache } from 'react';
import { createClient as createPublicClient, type Content } from '@prismicio/client';
import { createClient, repositoryName } from '@/prismicio';
import { hasProjectContent, safeWebUrl } from './project-content';
import { legacyProjectSlug } from './project-card';

export const getProjects = cache(async (publicOnly = false): Promise<Content.ProjectDocument[]> => {
  // Public sitemap must never include documents from a Prismic preview cookie.
  const client = publicOnly
    ? createPublicClient(repositoryName, { fetchOptions: { cache: 'no-store' } })
    : createClient({ fetchOptions: { cache: 'no-store' } });
  const repository = await client.getRepository();
  // The existing catalogue remains usable before the new model is pushed.
  if (!repository.types.project) return [];
  const documents = await client.getAllByType('project', {
    orderings: [{ field: 'document.first_publication_date', direction: 'desc' }],
  });
  return documents.filter(hasProjectContent);
});

export const getProject = cache(async (uid: string) => {
  const projects = await getProjects();
  const project = projects.find((project) => project.uid === uid);
  if (!project) {
    if (process.env.NODE_ENV === 'development' && ['yota', 'preview-yota'].includes(uid)) {
      const example = (await import('@/dev/project-fixture')).previewProject;
      return { ...example, uid };
    }
    return null;
  }
  if (safeWebUrl(project.data.behance_link)) return project;
  // Keep the existing Behance destination inside the case during migration.
  const catalogue = await createClient({ fetchOptions: { cache: 'no-store' } }).getSingle('projects');
  for (const slice of catalogue.data.slices) {
    if (slice.slice_type !== 'case_filters') continue;
    for (const card of slice.items) {
      const relationship = card.project && 'id' in card.project ? card.project : null;
      const matches = (relationship && !relationship.isBroken && relationship.id === project.id)
        || (!relationship && legacyProjectSlug(card) === uid);
      const url = safeWebUrl(card.link);
      if (matches && url && /^(https?:\/\/)(www\.)?behance\.net\//i.test(url)) {
        return { ...project, data: { ...project.data, behance_link: { link_type: 'Web' as const, url } } };
      }
    }
  }
  return project;
});
