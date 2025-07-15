'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

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
  const [repeatCount, setRepeatCount] = useState(10);

  useEffect(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const totalImageWidth = imagesLength * imageWidth;
    const requiredRepeatCount = Math.ceil((containerWidth * 2.5) / totalImageWidth);

    setRepeatCount(Math.max(5, requiredRepeatCount));
  }, [imagesLength, imageWidth]);

  return { containerRef, repeatCount };
}

export default function StatsGrid2() {
  const stats = [
    { id: 0, title: '#1', subtitle: 'ПО СОЗДАНИЮ 3D АВАТАРОВ\nИ ЦИФРОВЫХ ДВОЙНИКОВ' },
    { id: 1, title: '12+', subtitle: 'БОЛЕЕ 12 ЛЕТ\nНА РЫНКЕ' },
    { id: 2, title: '11 000+', subtitle: 'ЦИФРОВЫХ 3D АВАТАРОВ\nДЛЯ КИНО И РЕКЛАМЫ' },
    { id: 3, title: '30+', subtitle: 'CG-ПРОФЕССИОНАЛОВ\nВ КОМАНДЕ' },
    { id: 4, title: '1000+', subtitle: 'УСПЕШНО\nРЕАЛИЗОВАННЫХ\nПРОЕКТОВ' },
  ];

  const imageSize = 96;
  const { containerRef, repeatCount } = useAutoRepeat(AWARD_IMAGES.length, imageSize);

  return (
    <section className="relative z-0 bg-[#141414] text-white py-16 px-4">
      <div className="text-center text-[#B3B3B3] font-standard uppercase tracking-wider mb-10">
        <div className="text-sm mb-1">
          <span className="text-[#939393] font-proto">[TWIN3D]</span>{' '}
          <span className="text-[#939393] font-proto opacity-55">[ABOUT]</span>
        </div>
        <div className="text-lg leading-snug max-w-[900px] mx-auto bg-gradient-to-r from-[#C3C3C3] to-[#999999] bg-clip-text text-transparent">
          Создаем цифровых героев, маскотов и контент с ними.
Используем собственный 3D-сканер человека и нейросети.
Награды EPlus, Red Apple и Silver Mercury. Резидент Сколково.
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto">
        {stats.map(({ id, title, subtitle }) => (
          <article
            key={id}
            className={`relative aspect-[111/153] md:aspect-[427/353] rounded-[15px] md:rounded-3xl overflow-hidden group cursor-pointer border hover:scale-[1.05] duration-300 ${id === 0 ? 'md:border md:border-[#545454] border-transparent hover:border-[#545454]' : 'border border-[#545454] hover:border-transparent'}`}
          >
            <div
              className={`absolute inset-0 z-0 transition-colors ${
                id === 0
                  ? 'bg-black group-hover:bg-black md:bg-black md:group-hover:bg-gradient-to-br md:group-hover:from-[#1FA2FF] md:group-hover:to-[#1ADBFC] before:content-[\'\'] before:absolute before:inset-0 before:bg-gradient-to-br before:from-[#1FA2FF] before:to-[#1ADBFC] md:before:hidden group-hover:before:hidden'
                  : 'bg-[#2C2C2C] group-hover:bg-black md:bg-black md:group-hover:bg-gradient-to-br md:group-hover:from-[#1FA2FF] md:group-hover:to-[#1ADBFC]'
              }`}
            />
            <div className="absolute inset-0 flex flex-col p-4 z-10">
              <h3 className={`font-druk leading-none text-white ${id === 0 ? 'text-4xl md:text-6xl' : 'text-3xl md:text-6xl'}`}>{title}</h3>
              <p
  className={`
    mt-auto whitespace-pre-line font-franklin font-normal
    text-[12px] md:text-[18px] leading-[14px] md:leading-5
    ${id === 0
      ? 'text-white md:text-transparent md:bg-clip-text md:bg-gradient-to-br md:from-[#C3C3C3] md:to-[#999999] md:group-hover:text-white'
      : 'text-transparent bg-clip-text bg-gradient-to-br from-[#C3C3C3] to-[#999999] group-hover:text-white'
    }
  `}
>
  {subtitle}
</p>
            </div>
          </article>
        ))}

        {/* Блок наград */}
        <aside className="relative bg-[#0b0b0b] aspect-[111/153] md:aspect-[427/353] rounded-[15px] md:rounded-3xl border border-[#FFD700] pt-4 pb-4 px-0 md:px-[4px] flex flex-col justify-between">
          <div className="flex-1 flex items-center overflow-hidden pb-4 md:pb-3">
            <div
              ref={containerRef}
              className="flex gap-[6px] items-center animate-marquee min-w-max"
              style={{ willChange: 'transform' }}
            >
              {Array.from({ length: repeatCount }).flatMap((_, repeatIndex) =>
                AWARD_IMAGES.map((src, i) => (
                  <div key={`${repeatIndex}-${i}`} className="flex items-center justify-center">
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
      </div>
    </section>
  );
}
