import type { Metadata } from 'next';
import './globals.css';
import React, { Suspense } from 'react';
import YandexMetrika from '@/components/YandexMetrika';
import type { ReactNode } from 'react';
import { PrismicPreview } from '@prismicio/next';
import { repositoryName, createClient } from '@/prismicio';
import type { Content } from '@prismicio/client';

import Header from '@/components/Header';
import VhSetter from '@/components/VhSetter';

import KoalaIntro from "@/components/KoalaIntro";



export const metadata: Metadata = {
  title: 'Twin3D — креативный AI CGI продакшн',
  description: 'AI CGI продакшн полного цикла: рекламные ролики, 3D-аватары, цифровые двойники и маскоты для брендов. Нейросети + 3D-графика. Кейсы, шоурил, расчёт проекта.',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const client = createClient();
  const settings = await client.getSingle('extramenu');
  const headerSlice = settings.data.slices.find(
    (s): s is Content.HeaderOverlaySlice =>
      s.slice_type === 'header_overlay'
  ) ?? null;

  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="font-druk antialiased">
        <Suspense fallback={null}><YandexMetrika /></Suspense>
        <VhSetter />
         <KoalaIntro />
        {/* dedicated portal root for overlays */}
        <div id="overlay-root" />

        <Header headerOverlaySlice={headerSlice} />
        {children}
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}