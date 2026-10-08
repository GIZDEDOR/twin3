'use client';

import { useEffect, useState } from 'react';
import { SliceZone } from '@prismicio/react';
import type { Content } from '@prismicio/client';
import { components } from '@/slices';
import type { CatalogueCaseContent } from '@/lib/catalogue-case-content';

interface ProjectsClientProps {
  slices: Content.ProjectsDocument['data']['slices'];
  projectLinks?: Record<string, string>;
  projectSlugs?: string[];
  caseContent?: CatalogueCaseContent;
}

export default function ProjectsClient({ slices, projectLinks = {}, projectSlugs = [], caseContent = {} }: ProjectsClientProps) {
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
        <SliceZone slices={displaySlices} components={components} context={{ projectLinks, projectSlugs, caseContent }} />
      </section>
    </main>
  );
}
