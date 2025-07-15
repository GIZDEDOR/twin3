// File: slices/Showreel/index.tsx
'use client';

import React from 'react';
import type { SliceComponentProps } from '@prismicio/react';

/**
 * Полностью описываем ваш собственный тип слайса,
 * чтобы TS знал про обязательные поля id, slice_label и вашу video.url
 */
interface ShowreelSlice {
  slice_type: 'showreel';
  slice_label?: string | null;
  id: string;
  primary: {
    video: {
      /** сюда Prismic положит URL на файл из Media Library */
      url: string;
      /** остальные поля, которые могут быть полезны */
      alt?: string | null;
      name?: string;
    };
  };
  items: [];
}

/** SliceComponentProps оборачивает ShowreelSlice в { slice } */
type Props = SliceComponentProps<ShowreelSlice>;

export default function ShowreelSlice({ slice }: Props) {
  const videoUrl = slice.primary.video.url;

  return (
    <section className="w-full overflow-hidden bg-black">
      <video
        src={videoUrl}
        className="w-full h-auto"
        autoPlay
        loop
        muted
        playsInline
        controls
      />
    </section>
  );
}
