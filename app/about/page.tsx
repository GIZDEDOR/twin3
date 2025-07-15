// app/about/page.tsx
import { SliceZone } from '@prismicio/react';
import { createClient } from '@/prismicio';
import { components } from '@/slices';
import MainReval2 from '@/components/MainReval2';
import StatsGrid2 from '@/components/StatsGrid2';
import Keisinfo from '@/components/Keisinfo';
import Footer2 from '@/components/Footer2';
import type { AboutDocument } from '@/prismicio-types';

// если нужен ISR — раз в минуту
export const revalidate = 60;

export default async function AboutPage() {
  const client = createClient();
  const page = await client.getSingle<AboutDocument>('about');

  return (
    <>
      <MainReval2 />
      <StatsGrid2 />

      <SliceZone
        slices={page.data.slices}
        components={components}
      />

      <Keisinfo />
      <Footer2 />
    </>
  );
}
