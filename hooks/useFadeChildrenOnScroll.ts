// app/hooks/useFadeChildrenOnScroll.ts
'use client';

import { useEffect, useRef } from 'react';

export function useFadeChildrenOnScroll(
  childSelector = '.fade-child',
  threshold = 0.25
) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const children = containerRef.current.querySelectorAll<HTMLElement>(
      childSelector
    );

    /* ===== stagger-delay через CSS-переменную ===== */
    children.forEach((el, i) => el.style.setProperty('--d', `${i * 0.12}s`));

    /* ===== IntersectionObserver ===== */
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    children.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [childSelector, threshold]);

  return containerRef;
}
