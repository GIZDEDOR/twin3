// components/SlicesClient.tsx
'use client';

import { SliceZone } from '@prismicio/react';
import { components } from '@/slices';
import type { WelcomeDocumentDataSlicesSlice as SliceType } from '@/prismicio-types';

interface SlicesClientProps {
  slices: SliceType[];
}

export default function SlicesClient({ slices }: SlicesClientProps) {
  return (
    // ЕДИНЫЙ корневой элемент!!!
    <div>
      <SliceZone slices={slices} components={components} />
    </div>
  );
}
