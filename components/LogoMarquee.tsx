'use client';

import { useEffect, useLayoutEffect, useRef, useState, useMemo } from 'react';
import gsap           from 'gsap';
import Image          from 'next/image';

const logos = [
  'vtb.svg','red.svg','yandex.svg','tbank.svg','t2.svg','megafon.svg',
  'yota.svg','vk.svg','sber.svg','x5.svg','rjd.svg','mts.svg',
];
// утилита тасовки
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function LogoMarquee() {
  const containerRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  // сразу на старте считаем, какие ряды и в каком порядке
  const rowsData = useMemo(
    () => [...Array(3)].map(() =>
      Array.from({ length: 15 }, () => shuffle(logos)).flat()
    ),
    []
  );

  // включаем GSAP анимацию только после mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLDivElement>('.logo-row');
      rows.forEach((row, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        gsap.to(row, {
          x: `${dir * 1000}px`,
          duration: 60,
          ease: 'linear',
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x) => parseFloat(x) % row.scrollWidth),
          },
          delay: i === 2 ? 3 : 0,
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [mounted]);

  // корневой <section> всегда на месте — меняем только «внутренности»
  return (
    <section
      ref={containerRef}
      className="wrapper overflow-hidden py-16 sm:py-24 bg-dark"
    >
      {mounted &&
        rowsData.map((rowLogos, rowIndex) => (
          <div
            key={rowIndex}
            className="logo-row mb-6 sm:mb-10 flex items-center justify-center gap-4 sm:gap-6 will-change-transform"
          >
            {rowLogos.map((logo, idx) => (
              <Image
                key={logo + idx}
                src={`/logos/${logo}`}
                alt={logo}
                width={90}
                height={40}
                className="object-contain h-[60px] w-auto rounded-xl
                           bg-[#202020] px-2 sm:px-4 py-2 sm:py-3
                           border border-[#727272]"
              />
            ))}
          </div>
        ))}
    </section>
  );
}
