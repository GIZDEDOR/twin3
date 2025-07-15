'use client';

import { SliceComponentProps } from '@prismicio/react';
import { CaseSlyderSlice } from '@/prismicio-types';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const slidesMeta: Record<string, {
  tag: string;
  about?: string;
  desc: string;
  label: string;
}> = {
  scan: {
    tag: '[3D-SCAN]',
    about: '[ABOUT]',
    desc: `СОЗДАЁМ ВЫСОКОДЕТАЛИЗИРОВАННЫЕ\n3D ДВОЙНИКИ ЛЮДЕЙ И ОБЪЕКТОВ\nС ПОМОЩЬЮ СОБСТВЕННЫХ 3D-СКАНЕРОВ.`,
    label: '3D-СКАНИРОВАНИЕ',
  },
  avatars: {
    tag: '[CG-AVATARS]',
    about: '[ABOUT]',
    desc: 'Создаём цифровых героев и маскотов\nпод ключ: от концепт-арта до детальной\nпроработки персонажа в 3D под продакшн.',
    label: 'АВАТАРЫ',
  },
  cg: {
    tag: '[CG-PRODUCTION]',
    about: '[ABOUT]',
    desc: 'Полный цикл производства рекламных\nкреативов с персонажем для кампаний\n360°: от идеи и сценариев до продакшна\nвидеоматериалов любой сложности',
    label: 'CG-ПРОДАКШН',
  },
  'ai-avatars': {
    tag: '[AI-AVATARS]',
    about: '[ABOUT]',
    desc: 'Интегрируем фотореалистичные\n3D-аватары людей в диалоговые\nассистенты и чат-боты.',
    label: 'ИИ-АВАТАРЫ',
  },
  'ai-cg': {
    tag: '[AI-PRODUCTION]',
    about: '[ABOUT]',
    desc: 'Используем генеративные\nнейросети для производства\nрекламных креативов в сжатые сроки.',
    label: 'ИИ-ПРОДАКШН',
  },
};

export default function CategorySlyder({ slice }: SliceComponentProps<CaseSlyderSlice>) {
  const categories = Object.keys(slidesMeta);
  const [currentCategory, setCurrentCategory] = useState<string>(categories[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isTouching = useRef(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const SWIPE_THRESHOLD = 50;

  type SlyderItem = {
  category_key: string;
  image: { url?: string } | null;
};

const filteredSlides = (slice.items as SlyderItem[]).filter(
  (item) => item.category_key === currentCategory
);
const slides = filteredSlides.map((item) => item.image?.url).filter(Boolean) as string[];
  const { tag, about, desc, label } = slidesMeta[currentCategory];

  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
  };

  useEffect(() => {
    setCurrentIndex(0);
    startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentCategory]);

  const handleTouchStart = (e: React.TouchEvent) => {
    isTouching.current = true;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const dx = touchStartX.current - touchEndX.current;
    if (dx > SWIPE_THRESHOLD) {
      setCurrentIndex((i) => (i + 1) % slides.length);
    } else if (dx < -SWIPE_THRESHOLD) {
      setCurrentIndex((i) => (i - 1 + slides.length) % slides.length);
    }
    setTimeout(() => {
      if (!isTouching.current && !intervalRef.current) {
        startAutoSlide();
      }
    }, 1500);
  };

  return (
    <div className="z-0 flex flex-col items-center bg-[#141414] text-white overflow-hidden relative">
      {/* Бегущая строка */}
      <div className="relative w-full overflow-hidden bg-gradient-to-r from-[#1FA2FF] to-[#1ADBFC] text-black text-[26px] sm:text-[22px] md:text-[30px] h-[45px] sm:h-[55px] md:h-[55px] flex items-center whitespace-nowrap">
        <div className="animate-marquee flex items-center gap-0 px-[20px]">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="flex items-center gap-[clamp(4px,2vw,10px)] px-1 min-w-fit">
              <div className="flex items-center gap-2">
                <Image src="/mini-man.svg" alt="icon" width={36} height={36} className="w-[36px] h-[36px] sm:w-[28px] sm:h-[28px] md:w-[35px] md:h-[35px]" />
                <span className='font-fradman'>НАШИ УСЛУГИ</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/mini-man.svg" alt="icon" width={36} height={36} className="w-[36px] h-[36px] sm:w-[28px] sm:h-[28px] md:w-[35px] md:h-[35px]" />
                <span className='font-franklin'>TWIN 3D</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Кнопки категорий */}
      <div className="flex flex-wrap justify-center sm:justify-between gap-2 sm:gap-3 mb-6 w-full max-w-[1000px] pt-6 sm:pt-10 font-franklin font-bold">
        {categories.map((key) => (
          <button
            key={key}
            className={`px-4 py-2 rounded-[12px] text-sm sm:text-2xl transition-colors border ${
              currentCategory === key
                ? 'bg-gradient-to-r from-[#1FA2FF] to-[#1ADBFC] text-black border-none'
                : 'bg-[#141414] text-[#444444] border-[#444444]'
            }`}
            onClick={() => setCurrentCategory(key)}
          >
            {slidesMeta[key].label}
          </button>
        ))}
      </div>

      {/* Описание категории */}
      <div className="flex flex-col items-center text-[#B3B3B3] text-center uppercase font-standard tracking-wider mb-10">
        <div className="text-sm mb-1">
          <span className="text-[#939393] font-proto">{tag}</span>{' '}
          {about && <span className="text-[#939393] font-proto opacity-55">{about}</span>}
        </div>
        <div className="text-lg leading-snug max-w-[900px] bg-gradient-to-r from-[#C3C3C3] to-[#999999] bg-clip-text text-transparent">
          {desc.split('\n').map((line, i) => <p key={i}>{line}</p>)}
        </div>
      </div>

      {/* Слайдер карточек */}
      <div
        className="relative w-full max-w-[1000px] h-[520px] overflow-visible pointer-events-auto"
        style={{ touchAction: 'pan-y' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative h-full flex items-center justify-center pointer-events-auto">
          {slides.map((src, idx) => {
            const offset = idx - currentIndex;
            let posClasses = 'absolute top-0 transition-transform duration-700 ease-in-out opacity-0 w-[60%] h-full';
            if (offset === 0) {
              posClasses += ' translate-x-0 scale-100 opacity-100 z-30';
            } else if (offset === -1 || (currentIndex === 0 && idx === slides.length - 1)) {
              posClasses += ' -translate-x-[70%] scale-75 opacity-60 z-20 blur-md';
            } else if (offset === 1 || (currentIndex === slides.length - 1 && idx === 0)) {
              posClasses += ' translate-x-[70%] scale-75 opacity-60 z-20 blur-md';
            } else {
              posClasses += ' hidden';
            }
            return (
              <Link key={idx} href="/projects" className={`block ${posClasses}`}>
                <div className="w-full h-full flex items-center justify-center">
                  <div className="relative aspect-[3/4] w-[300px]">
                    <Image src={src} alt={`Slide ${idx}`} fill className="object-contain rounded-3xl" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
