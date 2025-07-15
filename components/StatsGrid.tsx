// components/StatsGrid.tsx
'use client';

import React from 'react'
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useMediaQuery } from '@/hooks/useMediaQuery'; 

import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';
import { useFadeChildrenOnScroll } from '@/hooks/useFadeChildrenOnScroll';
import '@/app/styles/fade.css';

const VIDEO_SLOTS = [1, 3, 5, 7] as const;
const VIDEO_FILES: Record<number, string> = {
  1: '/video/center.webm',
  3: '/video/feature-3.webm',
  5: '/video/feature-4.webm',
  7: '/video/feature-5.webm',
};

const AWARD_IMAGES = [
  '/images/award-1.webp',
  '/images/award-2.webp',
  '/images/award-3.webp',
  '/images/award-4.webp',
  '/images/award-5.webp',
  '/images/award-6.webp',
];


function useAutoRepeat(imagesLength: number, imageWidth: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [repeatCount, setRepeatCount] = useState(10); // безопасное значение по умолчанию

  useEffect(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const totalImageWidth = imagesLength * imageWidth;

    // делаем так, чтобы ширина контента была минимум в 2.5 раза больше контейнера
    const requiredRepeatCount = Math.ceil((containerWidth * 2.5) / totalImageWidth);

    setRepeatCount(Math.max(5, requiredRepeatCount)); // минимум 5
  }, [imagesLength, imageWidth]);

  return { containerRef, repeatCount };
}

export default function StatsGrid() {
   const fadeGroupRef = useFadeChildrenOnScroll();   // вместо useFadeInOnScroll

  const HERO_IMAGES = [
  '/images/girlcase1png.webp',
  '/images/stas.webp',
  '/images/vorona.webp',
];
const [heroIdx, setHeroIdx] = useState(0);

  const isMobile = useMediaQuery('(max-width: 767px)', true);

const indicesToRender = isMobile
  ? [0, 6, 2, 4, 8] // мобильный набор, упорядоченный
  : Array.from({ length: 9 }, (_, idx) => idx); // десктоп — все кейсы
  const marqueeRef = useRef<HTMLDivElement>(null);

  return (
    <section  className="relative z-0 bg-[#141414] text-white py-16">
      {/* Заголовок блока */}
      <div className="flex flex-col items-center text-[#B3B3B3] text-center uppercase font-standard tracking-wider mb-10">
        <div className="text-sm mb-1">
          <span className="text-[#939393] tracking-tighter font-proto">[TWIN3D]</span>{' '}
          <span className="text-[#939393] tracking-tighter font-proto opacity-55">[ABOUT]</span>
        </div>
        <div className="text-base leading-relaxed sm:text-lg sm:leading-snug max-w-[900px] mb-10 bg-gradient-to-r from-[#C3C3C3] to-[#999999] bg-clip-text text-transparent md:hidden ">
  <p>Создаем цифровых героев, маскотов и контент с ними.
  Используем собственный 3D-сканер человека и нейросети.
  Награды EPlus, Red Apple и Silver Mercury. Резидент Сколково.</p>
</div>

{/* Только для десктопа */}
<div className="hidden md:block text-lg
 leading-snug max-w-[900px] bg-gradient-to-r from-[#C3C3C3] to-[#999999] bg-clip-text text-transparent">
  <p>Создаем цифровых героев, маскотов и контент с ними.
  Используем собственный 3D-сканер человека и нейросети.
  Награды EPlus, Red Apple и Silver Mercury. Резидент Сколково.</p>
</div>
      </div>

      {/* Сетка 3×3 */}
      <div className="mt-16 grid grid-cols-3 gap-1 md:gap-4 px-4 max-w-6xl mx-auto">
        {indicesToRender.map((idx) => {
          // 1,3,5,7 — видео-слоты
          if (VIDEO_SLOTS.includes(idx as any)) {
            const vid = VIDEO_FILES[idx as keyof typeof VIDEO_FILES];
            return (
              <div
                key={idx}
                className="hidden sm:block relative aspect-[427/353] rounded-[10px] md:rounded-3xl overflow-hidden group cursor-pointer border border-[#545454] hover:border-transparent hover:scale-[1.05] duration-300"
              >
                <video
                  src={vid}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                />
                {/* удаляем голубой hover именно здесь */}
              </div>
            );
          }

          // 8 — награды
          const imageSize = 96; // 80px + padding/margin
          const { containerRef, repeatCount } = useAutoRepeat(AWARD_IMAGES.length, imageSize);

          if (idx === 8) {
  return (
    <aside
      key={idx}
      className="mt-[6px] md:mt-0 col-span-3 md:col-span-1 relative bg-[#0b0b0b] aspect-[346/153] md:aspect-[427/353] rounded-[10px] md:rounded-3xl border-[1px] border-[#FFD700] pt-4 pb-4 px-0 md:px-[4px] flex flex-col justify-between"
    >
      <div className="flex-1 flex items-center overflow-hidden pb-4 md:pb-3">
        <div
  ref={containerRef}
  className="flex gap-0 md:gap-[6px] items-center animate-marquee min-w-max"
  style={{ willChange: 'transform' }}
>
          {Array.from({ length: repeatCount }).flatMap((_, repeatIndex) =>
  AWARD_IMAGES.map((src, i) => (
    <div
  key={`${repeatIndex}-${i}`}
  className="flex items-center justify-center"
>
      <Image
  src={src}
  alt={`Award ${i + 1}`}
  width={64}
  height={90}
  className="object-contain h-[90px] w-[64px] md:h-[142px] md:w-[100px]"
/>
    </div>
  ))
)}
        </div>
      </div>
      <div className="mt-[2px] -pb-0 flex justify-between items-end px-2 relative">
  <p className="font-franklin text-[#FFBB00] uppercase text-[13px] font-bold md:text-lg md:leading-5 leading-tight">
    Наши<br />награды
  </p>
  <Image
    src="/images/Vector.svg"
    alt="Award badge icon"
    width={32}
    height={32}
    className="w-6 h-6 md:w-11 md:h-11"
  />
</div>
    </aside>
  );
}

          // ========== Статичные текстовые карточки ==========
          let title = '';
          let subtitle = '';

          switch (idx) {
            case 0:
              title = '#1';
              subtitle = 'ПО СОЗДАНИЮ 3D АВАТАРОВ\nИ ЦИФРОВЫХ ДВОЙНИКОВ';
              break;
            case 2:
              title = '12+';
              subtitle = 'БОЛЕЕ 12 ЛЕТ\nНА РЫНКЕ';
              break;
            case 4:
              title = '30+';
              subtitle = 'CG-ПРОФЕССИОНАЛОВ\nВ КОМАНДЕ';
              break;
            case 6:
              title = '11 000+';
              subtitle = 'ЦИФРОВЫХ 3D АВАТАРОВ\nДЛЯ КИНО И РЕКЛАМЫ';
              break;
          }

          const colSpanClass = [0, 8].includes(idx) ? 'col-span-3 md:col-span-1' : '';
          const aspectClass =
            [0, 8].includes(idx)
              ? 'aspect-[346/153] md:aspect-[427/353]'
              : 'aspect-[111/153] md:aspect-[427/353]';         

          return (
            <React.Fragment key={idx}>
            <article
              key={idx}
              className={`relative ${aspectClass} rounded-[15px] md:rounded-3xl overflow-hidden group cursor-pointer border hover:scale-[1.05] duration-300 ${idx === 0 ? 'md:border md:border-[#545454] border-transparent hover:border-[#545454]' : 'border border-[#545454] hover:border-transparent'} ${colSpanClass}`}
            >
              {/* 1) градиентный фон, под текстом bg-[#2C2C2C] group-hover:bg-black md:bg-black */}
              <div
  className={`absolute inset-0 z-0 transition-colors
    ${
      idx === 0
        ? `
          bg-black
          group-hover:bg-black
          md:bg-black md:group-hover:bg-gradient-to-br md:group-hover:from-[#1FA2FF] md:group-hover:to-[#1ADBFC]
          before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-[#1FA2FF] before:to-[#1ADBFC]
          md:before:hidden
          group-hover:before:hidden
        `
        : [2, 4, 6].includes(idx)
        ? `
          bg-[#2C2C2C] group-hover:bg-black
          md:bg-black md:group-hover:bg-gradient-to-br md:group-hover:from-[#1FA2FF] md:group-hover:to-[#1ADBFC]
        `
        : `
          bg-gradient-to-br from-[#1FA2FF] to-[#1ADBFC] opacity-0 group-hover:opacity-100
        `
    }`}
/>


              {/* 2) контент поверх фонового слоя */}
              <div className="absolute inset-0 flex flex-col p-2 md:p-4 z-10">
                <h3
  className={`font-druk leading-none text-white ${
    idx === 0
      ? 'text-5xl md:text-6xl' // увеличен на мобилке, без изменений на десктопе
      : 'text-4xl md:text-6xl'
  }`}
>
  {title}
</h3>
                <p
  className={`mt-auto whitespace-pre-line font-franklin font-normal text-[14px] md:text-[18px] leading-[14px] md:leading-5
    ${
      idx === 0
        ? 'text-white md:bg-clip-text md:text-transparent md:bg-gradient-to-br md:from-[#C3C3C3] md:to-[#999999] group-hover:text-white'
        : 'bg-clip-text text-transparent bg-gradient-to-br from-[#C3C3C3] to-[#999999] group-hover:text-white'
    }`}
>
  {subtitle}
</p>
              </div>
            </article>
            {idx === 0 && isMobile && (
  <div
    className="relative col-span-3 md:hidden -mt-[346px] z-30 overflow-visible"
    // убери pointer-events-none, чтобы кликать!
    onClick={() => setHeroIdx((prev) => (prev + 1) % HERO_IMAGES.length)}
    style={{ cursor: 'pointer' }}
  >
    <div className="relative w-full h-[346px] overflow-hidden rounded-[10px] md:rounded-3xl">
      <Image
        src={HERO_IMAGES[heroIdx]}
        alt="Hero"
        width={300}
        height={400}
        className="absolute bottom-0 right-[1px] top-[82px] object-contain w-auto h-[75%]"
        draggable={false}
      />
    </div>
  </div>
)}

</React.Fragment>
          );
        })}
      </div>
    </section>
  );
}
