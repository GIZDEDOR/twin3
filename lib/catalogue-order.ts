// Defaults from the acceptance brief; explicit Prismic priorities override these.
export const pinnedProjects: Record<string, string[]> = {
  all: ['yota', 'x5-pyaterochka', 'hennessy', 'amazing-red', 'coolcola', 'vk-video'],
  '3D-ПРОДАКШН': ['vk-video', 'coolcola', 'khl', 'dinopark', 'gazprombank'],
  'ИИ-ПРОДАКШН': ['x5-pyaterochka', 'yota', 'coolcola', 'sensia'],
  '3D-СКАНИРОВАНИЕ': ['yota', 'kino', 'amazing-red', 'khl'],
  'АВАТАРЫ': ['hennessy', 'rustore', 'coolcola', 'amazing-red', 'gazprombank'],
};
export const priorityFields: Record<string, string> = { all: 'priority_all', '3D-ПРОДАКШН': 'priority_3d', 'ИИ-ПРОДАКШН': 'priority_ai', '3D-СКАНИРОВАНИЕ': 'priority_scan', 'АВАТАРЫ': 'priority_avatars' };
export function orderCatalogue<T extends { identity: string; published_at?: string | null; priorities?: Record<string, number | null | undefined> }>(cards: T[], tag: string | null): T[] {
  const filter = tag || 'all';
  const rank = (card: T) => {
    const explicit = card.priorities?.[priorityFields[filter]];
    if (typeof explicit === 'number' && explicit > 0) return explicit;
    const index = pinnedProjects[filter]?.indexOf(card.identity) ?? -1;
    return index < 0 ? Infinity : index + 1;
  };
  return cards.map((card, index) => ({ card, index })).sort((a,b) => {
    const priority = rank(a.card) - rank(b.card);
    if (priority && !Number.isNaN(priority)) return priority;
    // Unknown dates retain CMS order, rather than inventing a publication date.
    const da = Date.parse(a.card.published_at || '') || 0, db = Date.parse(b.card.published_at || '') || 0;
    if (da !== db) return db - da;
    return a.index - b.index;
  }).map(({card}) => card);
}
