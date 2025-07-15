'use client';

import { useEffect, useState } from 'react';
import Showreel from '../Showreel';
import { SliceZone } from '@prismicio/react';
import { components } from '@/slices';
import { createClient } from '@/prismicio';

export default function ProjectsClientWrapper() {
  const [isMobile, setIsMobile] = useState(false);
  const [slices, setSlices] = useState<any[]>([]);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 640px)');
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const client = createClient();
      const page = await client.getSingle('projects'); // UID страницы "projects"
      setSlices(page.data.slices);
    };
    fetchData();
  }, []);

  return (
    <main className="overflow-hidden bg-dark text-white min-h-screen">
      {!isMobile && <Showreel src="/video/showreel.webm" />}
      <section className="relative z-10 py-12">
        <SliceZone slices={slices} components={components} />
      </section>
    </main>
  );
}
