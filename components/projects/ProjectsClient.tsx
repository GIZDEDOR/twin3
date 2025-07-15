'use client';

import { useEffect, useState } from 'react';
import { SliceZone } from '@prismicio/react';
import { components } from '@/slices';
import { createClient } from '@/prismicio';

export default function ProjectsClientWrapper() {
  const [isMobile, setIsMobile] = useState(false);
  const [slices, setSlices] = useState<any[]>([]);

  // Определяем mobile
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 640px)');
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Загружаем все слайсы из Prismic
  useEffect(() => {
    const fetchData = async () => {
      const client = createClient();
      const page = await client.getSingle('projects');
      setSlices(page.data.slices);
    };
    fetchData();
  }, []);

  // Если мобильный — отключаем showreel‑слайс
  const displaySlices = isMobile
    ? slices.filter((s) => s.slice_type !== 'showreel')
    : slices;

  return (
    <main className="overflow-hidden bg-dark text-white min-h-screen">
      <section className="relative z-10 py-12">
        {/* 
          Здесь Prismic автоматически найдёт showreel‑слайс и подставит ваш
          ShowreelSlice, где вы берёте slice.primary.video.url
        */}
        <SliceZone slices={displaySlices} components={components} />
      </section>
    </main>
  );
}
