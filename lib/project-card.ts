// Exact legacy identities: do not group unrelated VK or dinosaur projects.
const titles: Record<string, string> = {
  'yota': 'yota', 'пятёрочка': 'x5-pyaterochka', 'пятерочка': 'x5-pyaterochka',
  'coolcola': 'coolcola', 'vk видео': 'vk-video', 'кхл': 'khl',
  'динопарк': 'dinopark', 'rustore': 'rustore',
  'буратино': 'kino', 'master': 'kino',
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
const mediaSlugs: Record<string, string> = {
  'yota.webm':'yota', 'pyaterochka.webm':'x5-pyaterochka', 'альварес_1.webm':'hennessy',
  'feduk.webm':'amazing-red', 'сс_chars_v2.webm':'coolcola', 'vk_federal.webm':'vk-video',
  'KHL.webm':'khl', 'dinopark.webm':'dinopark', 'RuStore.webm':'rustore',
};
export type ProjectCard = {
  fullVideo?: { url?: string; link_type?: string } | null;
  title?: string | null; company?: string | null;
  project?: { link_type?: string; id?: string; isBroken?: boolean };
  link?: { link_type?: string; url?: string } | null;
};
export function legacyProjectSlug(card: ProjectCard): string | null {
  let mediaSlug: string | undefined;
  try {
    const url = new URL(card.fullVideo?.url || '');
    if (url.hostname === 'videos.twin3d.ru') mediaSlug = mediaSlugs[decodeURIComponent(url.pathname.split('/').pop() || '')];
  } catch { /* Empty legacy media field. */ }
  const gallery = card.link?.url?.match(/^https?:\/\/(?:www\.)?behance\.net\/gallery\/(\d+)(?:\/|$)/i)?.[1];
  return mediaSlug || (gallery && galleries[gallery]) || titles[card.title?.trim().toLowerCase() || ''] || companies[card.company?.trim().toLowerCase() || ''] || null;
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
