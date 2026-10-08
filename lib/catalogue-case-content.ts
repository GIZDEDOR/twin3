import type { Content } from '@prismicio/client';
import { normalizeCatalogueTags } from './project-catalogue.ts';
export function catalogueCaseContent(projects: Content.ProjectDocument[]) {
  return Object.fromEntries(projects.filter(p => p.uid).map(p => [p.uid!, {
    title: p.data.card_title || '', summary: p.data.summary || '',
    tags: normalizeCatalogueTags(p.data.directions.map(d => d.direction).filter(Boolean).join(',')),
  }]));
}
export type CatalogueCaseContent = ReturnType<typeof catalogueCaseContent>;
