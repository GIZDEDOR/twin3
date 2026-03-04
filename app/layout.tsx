import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import type { ReactNode } from 'react';
import { PrismicPreview } from '@prismicio/next';
import { repositoryName, createClient } from '@/prismicio';
import type { Content } from '@prismicio/client';

import Header from '@/components/Header';
import VhSetter from '@/components/VhSetter';

import KoalaIntro from "@/components/KoalaIntro";



export const metadata: Metadata = {
  title: 'TWIN3D',
  description: 'Делаем реальность цифровой',
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