import { asText, isFilled, type Content, type RichTextField, type LinkField } from '@prismicio/client';

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
  const image = isFilled.image(project.data.og_image) ? project.data.og_image.url : null;
  const description = projectDescription(project);
  return projectVideos(project).slice(0, 1).flatMap((video) => {
    if (!image || !description || !video.uploadDate || !Number.isFinite(Date.parse(video.uploadDate))) return [];
    return [{
      '@context': 'https://schema.org', '@type': 'VideoObject',
      name: project.data.title,
      description, thumbnailUrl: [image],
      uploadDate: new Date(video.uploadDate).toISOString(),
      contentUrl: video.src, url: `${SITE_URL}${projectPath(project.uid!)}`,
      ...(video.durationSeconds && video.durationSeconds > 0 ? { duration: `PT${Math.round(video.durationSeconds)}S` } : {}),
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

export function resultPresentation(project: Content.ProjectDocument) {
  const data = project.data;
  const legacy = asText(data.result).trim();
  const headline = data.result_headline?.trim() || (legacy.length <= 60 ? legacy : '');
  const details = asText(data.result_details || []).trim() ? data.result_details
    : legacy !== headline ? data.result : [] as RichTextField;
  return { headline, details };
}
export function participantFields(project: Content.ProjectDocument) {
  const data = project.data;
  if (data.vfx?.trim()) return { agency: data.agency, vfx: data.vfx };
  // Legacy combined field remains intact in Prismic; split only explicit role labels.
  const parts = data.agency?.split(/;\s*(?:VFX\s*:?|креатив и постпродакшн)\s*/i);
  return { agency: parts?.[0], vfx: parts?.[1] };
}
export function relatedProjects(project: Content.ProjectDocument, projects: Content.ProjectDocument[]) {
  const first = project.data.directions?.find(d => d.direction)?.direction;
  if (!first) return [];
  return projects.filter(p => p.uid !== project.uid && p.id !== project.id && !p.data.noindex
    && p.data.directions?.some(d => d.direction === first)).slice(0, 3);
}
