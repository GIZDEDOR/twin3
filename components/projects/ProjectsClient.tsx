'use client';

import { useEffect, useState } from 'react';
import { SliceZone } from '@prismicio/react';
import { components } from '@/slices';

interface ProjectsClientProps {
  slices: any[];  // при желании можно заменить на конкретный тип из Prismic
}

export default function ProjectsClient({ slices }: ProjectsClientProps) {
  const [isMobile, setIsMobile] = useState(false);

  // Определяем мобильное устройство
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 640px)');
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Если мобильный — отключаем showreel‑слайс
  const displaySlices = isMobile
    ? slices.filter((s) => s.slice_type !== 'showreel')
    : slices;

  return (
    <main className="overflow-hidden bg-dark text-white min-h-screen">
      <section className="relative z-10 py-12">
        <SliceZone slices={displaySlices} components={components} />
      </section>
    </main>
  );
}
