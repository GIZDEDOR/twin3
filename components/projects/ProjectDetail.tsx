import { asText, isFilled, type Content, type RichTextField } from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';
import { projectContactUrl, projectPath, projectVideos, projectVideoSchema, safeWebUrl } from '@/lib/project-content';
import { ProjectLink } from './ProjectNavigation';
import ProjectVideos from './ProjectVideos';
import styles from './project.module.css';

function TextSection({ title, field }: { title: string; field: RichTextField }) {
  if (!asText(field).trim()) return null;
  return <section className={styles.textSection} data-section={title}><h2>{title}</h2><div className={styles.richText}><PrismicRichText field={field} /></div></section>;
}

export default function ProjectDetail({ project, related }: { project: Content.ProjectDocument; related: Content.ProjectDocument[] }) {
  const data = project.data;
  const videos = projectVideos(project);
  const schema = projectVideoSchema(project);
  const behance = safeWebUrl(data.behance_link);
  const passport = [
    ['Клиент', data.client_name], ['Агентство', data.agency], ['Год', data.year],
    ['Формат', data.formats], ['Срок', data.production_time],
  ].filter(([, value]) => value !== null && value !== undefined && String(value).trim());
  const gallery = (data.gallery || []).filter((frame) => isFilled.image(frame.image));

  return (
    <article className={styles.article}>
      {schema.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />}
      <header className={styles.heading}>
        <h1 id="project-title">{data.title}</h1>
        {data.summary && <p className={styles.summary}>{data.summary}</p>}
        {passport.length > 0 && <dl className={styles.passport}>{passport.map(([label, value]) => (
          <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
        ))}</dl>}
        {data.directions?.some((item) => item.direction) && <ul className={styles.tags}>{data.directions.map((item, index) => item.direction && <li key={index}>{item.direction}</li>)}</ul>}
      </header>

      {videos.length ? <ProjectVideos videos={videos} /> : isFilled.image(data.cover) && (
        // Original Prismic URL preserves the editor's crop and image dimensions.
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.cover} src={data.cover.url} alt={data.cover.alt || data.title || ''} width={data.cover.dimensions.width} height={data.cover.dimensions.height} fetchPriority="high" />
      )}

      <div className={styles.story}>
        <TextSection title="Задача" field={data.task} />
        <TextSection title="Решение" field={data.solution} />
        <TextSection title="Результат" field={data.result} />
      </div>

      {gallery.length > 0 && <section className={styles.gallerySection}>
        <h2>Кадры проекта</h2>
        <div className={styles.gallery}>{gallery.map((frame, index) => isFilled.image(frame.image) && (
          <figure key={index}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={frame.image.url} alt={frame.image.alt || frame.caption || `${data.title}, кадр ${index + 1}`} width={frame.image.dimensions.width} height={frame.image.dimensions.height} loading="lazy" />
            {frame.caption && <figcaption>{frame.caption}</figcaption>}
          </figure>
        ))}</div>
      </section>}

      <div className={styles.actions}>
        <a className={styles.cta} href={projectContactUrl(project)} target="_blank" rel="noopener noreferrer">Хочу похожий проект</a>
        {behance && <a className={styles.behance} href={behance} target="_blank" rel="noopener noreferrer">Полная версия на Behance ↗</a>}
      </div>

      {related.length > 0 && <section className={styles.related}>
        <h2>Другие кейсы</h2>
        <div className={styles.relatedGrid}>{related.map((item) => (
          <ProjectLink key={item.id} href={projectPath(item.uid!)} className={styles.relatedItem}>
            {isFilled.image(item.data.cover) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.data.cover.url} alt={item.data.cover.alt || ''} width={item.data.cover.dimensions.width} height={item.data.cover.dimensions.height} loading="lazy" />
            )}
            <h3>{item.data.title}</h3>
          </ProjectLink>
        ))}</div>
      </section>}
    </article>
  );
}
