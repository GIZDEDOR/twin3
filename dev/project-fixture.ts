import type { Content, RichTextField } from '@prismicio/client';

// Local preview only. Text and media are from the supplied brief and public
// Yota card. Unknown dates, production times and metrics are not invented.
const paragraph = (text: string): RichTextField => [{ type: 'paragraph', text, spans: [] }];
const cover = {
  id: 'local-yota-cover', alt: 'Кадр рекламного проекта Yota', copyright: null,
  url: 'https://images.prismic.io/twin3/aHApf0MqNJQqHxd1_yota.webp?auto=format,compress',
  dimensions: { width: 1839, height: 1043 },
  edit: { x: 0, y: 0, zoom: 1, background: 'transparent' },
};

export const previewProject: Content.ProjectDocument = {
  id: 'local-preview-yota', uid: 'preview-yota', type: 'project', lang: 'ru-ru',
  url: null, href: '', tags: [], slugs: ['preview-yota'], linked_documents: [], alternate_languages: [],
  first_publication_date: '', last_publication_date: '',
  data: {
    result_headline: null, result_details: [], vfx: null,
    title: 'Yota: bullet time через 3D-скан всей съёмочной сцены',
    card_title: null,
    summary: 'Оцифровали актёров и съёмочную сцену целиком и создали пролёты камеры с помощью ИИ.',
    cover, client_name: 'Yota', agency: null, year: null,
    formats: 'Серия роликов «Всё на максимум»', production_time: null, category: 'РЕКЛАМА',
    directions: [{ direction: '3D-сканирование' }, { direction: 'ИИ-продакшн' }],
    task: paragraph('Создать серию роликов с эффектными пролётами камеры без сложной и дорогой съёмки.'),
    solution: paragraph('Отсканировали в 3D людей и локации. Пролёты камеры в стиле bullet time собрали с помощью ИИ.'),
    result: paragraph('+33% к конверсии, +13% к вовлечённости и узнаваемости. Золото Red Apple.'),
    videos: [{
      name: 'Yota: Всё на максимум',
      video: { link_type: 'Web', url: 'https://videos.twin3d.ru/media/videos/yota.webm' },
      poster: cover, description: 'Рекламный ролик Yota с эффектом bullet time.',
      upload_date: null, duration_seconds: null,
    }],
    gallery: [{ image: cover, caption: null }],
    meta_title: 'Yota: локальный предпросмотр шаблона | Twin3D',
    meta_description: 'Локальный пример шаблона кейса. Не опубликован в Prismic.',
    og_image: cover, noindex: true,
    behance_link: { link_type: 'Web', url: 'https://www.behance.net/gallery/205531607/Yota-All-to-Max' },
    contact_link: { link_type: 'Any' },
  },
};
