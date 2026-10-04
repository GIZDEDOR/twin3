import { asText, isFilled, type Content, type LinkField } from '@prismicio/client';

export const SITE_URL = 'https://twin3d.ru';
export const projectPath = (uid: string) => `/projects/${encodeURIComponent(uid)}`;

export function safeWebUrl(field: LinkField | undefined | null): string | null {
  if (!field || !isFilled.link(field) || !('url' in field) || !field.url) return null;
  try {
    const url = new URL(field.url);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

export function hasProjectContent(project: Content.ProjectDocument): boolean {
  return Boolean(project.uid && project.data.title?.trim());
}

export function projectDescription(project: Content.ProjectDocument): string {
  const data = project.data;
  return data.meta_description?.trim() || data.summary?.trim() || asText(data.task).slice(0, 180);
}

export function projectVideos(project: Content.ProjectDocument) {
  return (project.data.videos || []).flatMap((video) => {
    const src = safeWebUrl(video.video);
    if (!src) return [];
    return [{
      src,
      name: video.name?.trim() || project.data.title || 'Видео проекта',
      poster: isFilled.image(video.poster) ? video.poster.url : undefined,
      description: video.description?.trim() || projectDescription(project),
      uploadDate: video.upload_date,
      durationSeconds: video.duration_seconds,
    }];
  });
}

export function projectVideoSchema(project: Content.ProjectDocument) {
  return projectVideos(project).flatMap((video) => {
    // Never invent publication dates or emit incomplete VideoObject markup.
    if (!video.poster || !video.description || !video.uploadDate) return [];
    return [{
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: video.name,
      description: video.description,
      thumbnailUrl: [video.poster],
      uploadDate: video.uploadDate,
      contentUrl: video.src,
      url: `${SITE_URL}${projectPath(project.uid!)}`,
      ...(video.durationSeconds && video.durationSeconds > 0
        ? { duration: `PT${Math.round(video.durationSeconds)}S` }
        : {}),
    }];
  });
}

export function projectContactUrl(project: Content.ProjectDocument): string {
  const configured = safeWebUrl(project.data.contact_link);
  const url = new URL(configured || 'https://t.me/D_Twin3D');
  if (url.hostname === 't.me') {
    url.searchParams.set('text', `Хочу похожий проект: ${project.data.title}. ${SITE_URL}${projectPath(project.uid!)}`);
  } else {
    url.searchParams.set('project', project.uid!);
  }
  return url.href;
}
