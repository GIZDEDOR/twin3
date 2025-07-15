// components/ui/GradientBorder.tsx
'use client';

import { ReactNode, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Props {
  children: ReactNode;
  color1: string;
  color2: string;
  borderRadius?: string;  // e.g. "2rem"
  borderWidth?: number;   // px
  duration?: number;      // seconds
}

export function GradientBorderPulse({
  children, color1, color2,
  borderRadius = '1rem',
  borderWidth = 4,      // увеличили для наглядности
  duration = 1.5,
}: Props) {
  const borderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!borderRef.current) return;
    const el = borderRef.current;
    el.style.background = `linear-gradient(90deg, ${color1}, ${color2})`;
    el.style.backgroundSize = '200% 100%';
    el.style.backgroundPosition = '0% 0%';

    gsap.to(el, {
      backgroundPositionX: '100%',
      duration,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  }, [color1, color2, duration]);

  return (
    <div
      className="relative inline-block"
      style={{ borderRadius, overflow: 'visible' }}
    >
      {/* 1) сам анимированный ободок */}
      <div
        ref={borderRef}
        className="absolute inset-0"
        style={{
          padding: `${borderWidth}px`,
          borderRadius,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* 2) подложка под картинку — ровным цветом и над ободком */}
      <div
        className="relative"
        style={{
          backgroundColor: '#141414',
          borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
}
