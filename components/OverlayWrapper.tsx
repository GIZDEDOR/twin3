'use client';

import { useEffect, useState } from 'react';
import HeaderOverlay from './HeaderOverlay';

export default function OverlayWrapper({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hydrated, setHydrated] = useState(false); // SSR-safe флаг

  useEffect(() => {
    setHydrated(true); // ждём client-side
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const updateMatch = () => setIsDesktop(mediaQuery.matches);

    updateMatch();
    mediaQuery.addEventListener('change', updateMatch);
    return () => mediaQuery.removeEventListener('change', updateMatch);
  }, []);

  useEffect(() => {
    if (isDesktop && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isDesktop, isOpen]);

  if (!hydrated) return null; // блокируем до client-side

  // ✅ десктоп: overlay -> потом children
  // ✅ мобилка: сразу children
  return (
    <>
      {isDesktop && isOpen ? (
        <HeaderOverlay onClose={() => setIsOpen(false)} />
      ) : (
        children
      )}
    </>
  );
}
