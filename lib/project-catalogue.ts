import type { RichTextField } from '@prismicio/client';

type MediaLink = { url?: string } | null;
export type CatalogueSource = {
  title: string | null;
  company: string | null;
  category: string | null;
  tags: string | null;
  description: RichTextField;
  video1: MediaLink;
  fullVideo: MediaLink;
  poster: { url?: string } | null;
  link: MediaLink;
};
export type CatalogueVideo = { src: string; poster?: string; name: string };

// Exact audited files, not array positions, brands, or approximate title matches.
const groups = [
  { main: 'vk_federal.webm', files: ['vk_federal.webm', 'VK_2.webm', 'VK_3.webm', 'VK_insta_v3.webm'] },
  { main: 'сс_chars_v2.webm', files: ['сс_chars_v2.webm', 'СС1.webm', 'CC2.webm', 'CC3.webm', 'CoolColaBill.webm'] },
  { main: 'DILARA-2.webm', files: ['DILARA-2.webm', 'MAXIM-2.webm'] },
  { main: 'SBERREGA.webm', files: ['SBERREGA.webm', 'CITYDRIVE0001-0500.webm'] },
];
const films = new Set(['Dog_cosmos_lida.webm', 'Burat.webm', 'master_hover.webm', 'soyuz_hover.webm', 'grom_hover.webm', '100let_hover.webm']);
const videoNames: Record<string, string> = {
  'DILARA-2.webm': 'FreshBar — Дилара', 'MAXIM-2.webm': 'FreshBar — Максим Лутчак',
  'SBERREGA.webm': 'Ситидрайв — Сберёга', 'CITYDRIVE0001-0500.webm': 'Ситидрайв — 3D-персонажи',
  'vk_federal.webm': 'VK Видео — главный ролик', 'VK_2.webm': 'VK Видео — ролик 2', 'VK_3.webm': 'VK Видео — финал', 'VK_insta_v3.webm': 'VK Видео — DOOH / digital',
  'сс_chars_v2.webm': 'CoolCola — персонажи', 'СС1.webm': 'CoolCola — ролик 1', 'CC2.webm': 'CoolCola — ролик 2', 'CC3.webm': 'CoolCola — ролик 3', 'CoolColaBill.webm': 'CoolCola — билборд',
};
export function catalogueFile(item: CatalogueSource): string {
  try {
    const url = new URL(item.fullVideo?.url || item.video1?.url || '');
    if (url.hostname !== 'videos.twin3d.ru') return '';
    return decodeURIComponent(url.pathname.split('/').pop() || '');
  } catch { return ''; }
}
export const catalogueTags = ['3D-ПРОДАКШН', 'ИИ-ПРОДАКШН', '3D-СКАНИРОВАНИЕ', 'АВАТАРЫ'];
export function normalizeCatalogueTags(tags: string | null): string[] {
  return [...new Set((tags || '').split(',').map(t => {
    t = t.trim().toUpperCase();
    if (['АВАТАР', 'ИИ-АВАТАРЫ'].includes(t)) return 'АВАТАРЫ';
    if (['3D-СКАН', '3D-СKАН', '3D-СKАНИРОВАНИЕ'].includes(t)) return '3D-СКАНИРОВАНИЕ';
    if (t === 'CG-ПРОДАКШН') return '3D-ПРОДАКШН';
    return t;
  }).filter(t => catalogueTags.includes(t)))];
}
export function caseCountLabel(n: number): string {
  const last100 = n % 100;
  if (last100 >= 11 && last100 <= 14) return 'КЕЙСОВ';
  return n % 10 === 1 ? 'КЕЙС' : n % 10 >= 2 && n % 10 <= 4 ? 'КЕЙСА' : 'КЕЙСОВ';
}
export function buildProjectCatalogue<T extends CatalogueSource>(items: T[]) {
  const video = (source: T): CatalogueVideo[] => source.fullVideo?.url ? [{
    src: source.fullVideo.url, poster: source.poster?.url,
    name: videoNames[catalogueFile(source)] || source.title || source.company || 'Видео проекта',
  }] : [];
  const cards = items.flatMap(item => {
    const file = catalogueFile(item);
    const group = groups.find(g => g.files.includes(file));
    // Never swallow a member if its approved main card is missing.
    const mainExists = group && items.some(x => catalogueFile(x) === group.main);
    if (group && mainExists && file !== group.main) return [];
    const sources = group && mainExists
      ? group.files.flatMap(f => items.filter(x => catalogueFile(x) === f)) : [item];
    const videos = sources.flatMap(video).filter((v, i, a) => a.findIndex(x => x.src === v.src) === i);
    const tags = [...new Set(sources.flatMap(s => normalizeCatalogueTags(s.tags)))];
    const firstLink = sources.find(s => s.link?.url)?.link || item.link;
    return [{
      item: { ...item, tags: tags.join(', '), link: firstLink },
      // Retain original descriptions, images, links and all other source fields.
      sources, videos, isFilm: films.has(file), synthetic: false,
      destinationSource: item,
    }];
  });
  return cards;
}
