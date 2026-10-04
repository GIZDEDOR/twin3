// Exact legacy identities: do not group unrelated VK or dinosaur projects.
const titles: Record<string, string> = {
  'yota': 'yota', 'пятёрочка': 'x5-pyaterochka', 'пятерочка': 'x5-pyaterochka',
  'coolcola': 'coolcola', 'vk видео': 'vk-video', 'кхл': 'khl',
  'динопарк': 'dinopark', 'rustore': 'rustore',
  'космическая собака лида': 'kino', 'буратино': 'kino', 'master': 'kino',
  'союз спасения': 'kino', 'grom': 'kino', '100let': 'kino',
  'цифровые двойники для кино': 'kino',
};
const companies: Record<string, string> = {
  'yota': 'yota', 'x5': 'x5-pyaterochka', 'hennessy': 'hennessy',
  'amazing red': 'amazing-red', 'rustore': 'rustore', 'кхл': 'khl', 'динопарк': 'dinopark',
};
const galleries: Record<string, string> = {
  '205531607': 'yota', '183508499': 'hennessy', '183506745': 'amazing-red',
  '247576923': 'coolcola', '244317913': 'vk-video', '251553205': 'dinopark',
};
export type ProjectCard = {
  title?: string | null; company?: string | null;
  project?: { link_type?: string; id?: string; isBroken?: boolean };
  link?: { link_type?: string; url?: string } | null;
};
export function legacyProjectSlug(card: ProjectCard): string | null {
  const gallery = card.link?.url?.match(/^https?:\/\/(?:www\.)?behance\.net\/gallery\/(\d+)(?:\/|$)/i)?.[1];
  return (gallery && galleries[gallery]) || titles[card.title?.trim().toLowerCase() || ''] || companies[card.company?.trim().toLowerCase() || ''] || null;
}
export function projectCardDestination(card: ProjectCard, links: Record<string, string> = {}, publishedSlugs: string[] = []) {
  const linked = card.project?.id && !card.project.isBroken ? links[card.project.id] : null;
  const legacy = legacyProjectSlug(card);
  const slug = linked || (legacy && publishedSlugs.includes(legacy) ? legacy : null);
  return {
    projectUrl: slug ? `/projects/${encodeURIComponent(slug)}` : null,
    externalUrl: linked || legacy || card.project?.id ? null : card.link?.url || null,
  };
}
