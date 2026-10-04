'use client';

import { useRef } from 'react';
import type { projectVideos } from '@/lib/project-content';
import styles from './project.module.css';

export default function ProjectVideos({ videos }: { videos: ReturnType<typeof projectVideos> }) {
  const root = useRef<HTMLDivElement>(null);
  if (!videos.length) return null;
  return (
    <div ref={root} className={styles.videos}>
      {videos.map((video, index) => (
        <figure key={`${video.src}-${index}`} className={index === 0 ? styles.mainVideo : styles.seriesVideo}>
          <div className={styles.videoFrame}>
          <video
            controls
            playsInline
            preload="none"
            poster={video.poster}
            src={video.src}
            aria-label={video.name}
            onPlay={(event) => {
              root.current?.querySelectorAll('video').forEach((other) => {
                if (other !== event.currentTarget) other.pause();
              });
            }}
          />
          </div>
          {videos.length > 1 && <figcaption>{video.name}</figcaption>}
        </figure>
      ))}
    </div>
  );
}
