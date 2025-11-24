'use client';

import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useCaseFilter } from '@/store/useCaseFilter';
import { JSX } from 'react';
import { RichTextField } from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';
import React from 'react'; // ← добавили этот импорт

export type CaseFiltersProps = SliceComponentProps<Content.CaseFiltersSlice>;

/* ---------------------- Типизация элемента items ---------------------- */
type PrismicCaseItem = {
  title: string | null;
  logo: { url: string } | null;
  category: string | null;
  tags: string | null;
  video1: { url: string } | null;
  fullVideo: { url: string } | null;
  company: string | null;
  description: RichTextField;
  companyLogo: { url: string } | null;
  poster: { url: string } | null;
  link: { url: string } | null;
};

export type Case = {
  title: string;
  logo: string | null;
  category: string;
  tags: string[];
  video1: string | null;
  fullVideo: string | null;
  company: string;
  description: RichTextField;
  companyLogo: string | null;
  poster: string | null;
  link: string | null;
};

const shortTag = (tag: string): string => {
  const map: Record<string, string> = {
    '3D-СКАНИРОВАНИЕ': '3D-СKАН',
    'АВАТАРЫ': 'АВАТАР',
    'CG-ПРОДАКШН': 'CG-ПРОДАКШН',
    'ИИ-АВАТАРЫ': 'ИИ-АВАТАРЫ',
    'ИИ-ПРОДАКШН': 'ИИ-ПРОДАКШН',
  };
  return map[tag] || tag;
};

export default function CaseFilters({ slice }: CaseFiltersProps): JSX.Element {
  const { category, setCategory, subfilter, setSubfilter } = useCaseFilter();
  const items = slice.items as unknown as PrismicCaseItem[];

  const cases: Case[] = items.map((item) => ({
    title: item.title || '',
    logo: item.logo?.url || null,
    category: item.category || '',
    tags: item.tags?.split(',').map((t) => t.trim()) || [],
    video1: item.video1?.url || null,
    fullVideo: item.fullVideo?.url || null,
    company: item.company || '',
    description: item.description || '',
    companyLogo: item.companyLogo?.url || null,
    poster: item.poster?.url || null,
    link: item.link?.url || null,
  }));

  const categories = Array.from(new Set(cases.map((c) => c.category))).map(
    (label) => ({
      label,
      count: cases.filter((c) => c.category === label).length,
    })
  );

  const filteredByCategory = category
    ? cases.filter((c) => c.category === category)
    : cases;
  const subfilters = Array.from(
    new Set(cases.flatMap((c) => c.tags))
  );
  const activeSubfilters = subfilters.filter((tag) =>
    filteredByCategory.some((c) => c.tags.includes(tag))
  );
  const filteredCases = subfilter
    ? filteredByCategory.filter((c) => c.tags.includes(subfilter))
    : filteredByCategory;

  useEffect(() => {
    if (subfilter && !activeSubfilters.includes(subfilter)) {
      setSubfilter(null);
    }
  }, [category, subfilter, activeSubfilters, setSubfilter]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVideoSrc, setModalVideoSrc] = useState<string | null>(null);

  const openModal = (src: string) => {
    setModalVideoSrc(src);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalVideoSrc(null);
  };


  return (
    <main className="overflow-hidden bg-dark text-white">
      {/* Mobile — категории */}
      <div className="sm:hidden ml-1 -mx-4 px-4 bg-dark bg-[80%_0%] bg-cover h-[600px] flex items-start pt-4" style={{
    backgroundImage: "url('/images/bg-projects2.webp')",
    backgroundPosition: '10% 0%',
    backgroundSize: 'cover',
  }}>
        <div className="flex flex-col gap-1 mt-2">
          {categories.map((cat) => {
            const isActive = category === cat.label;
            return (
              <button
                key={cat.label}
                onClick={() => setCategory(cat.label)}
                className="flex items-start gap-2"
                type="button"
              >
                <span
                  className={`font-druk ${
                    isActive ? 'text-white' : 'text-[#4D4D4D]'
                  } text-[3rem] leading-none`}
                >
                  {cat.label}
                </span>
                <span
                  className={`font-proto ${
                    isActive ? 'text-[#C3C3C3]' : 'text-[#949494]/35'
                  } text-[0.6rem] leading-none mt-[0.1rem]`}
                >
                  [{cat.count} CASES]
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4">
        {/* Desktop — категории */}
        <div className="hidden sm:flex flex-wrap justify-center gap-6 mt-8 mb-3">
          {categories.map((cat) => {
            const isActive = category === cat.label;
            return (
              <button
                key={cat.label}
                onClick={() => setCategory(cat.label)}
                className="group flex items-end gap-2 px-5 py-2 font-druk transition-all"
                type="button"
              >
                <span
                  className={`text-8xl leading-[1] transition-all ${
                    isActive ? 'gradient-text-active' : 'text-[#4D4D4D]'
                  }`}
                >
                  {cat.label}
                </span>
                <span
                  className={`ml-1 mb-[60.5px] font-proto leading-1 ${
                    isActive ? 'text-[#C3C3C3]' : 'text-[#949494]/35'
                  }`}
                >
                  [{cat.count} CASES]
                </span>
              </button>
            );
          })}
        </div>

        {/* Subfilters */}
<div className="mb-4 px-4">
  <div className="mt-4 mb-8 flex flex-wrap gap-2 justify-center">
    {subfilters.map((filterValue) => {
      const isAvailable = activeSubfilters.includes(filterValue);
      const isSelected = subfilter === filterValue;

      return (
        <button
          key={filterValue}
          disabled={!isAvailable}
          onClick={() => isAvailable && setSubfilter(filterValue)}
          className={`
            px-4 py-2 font-franklin text-[16px] sm:text-[30px]
            rounded-xl sm:rounded-[17.6px] w-full sm:w-auto
            border transition-colors break-words text-center whitespace-nowrap truncate
            ${!isAvailable
              ? 'text-white/10 border-white/10 cursor-default'
              : isSelected
              ? 'bg-white/10 text-white border-white/30'
              : 'bg-[#141414] text-white/60 border-white/20'
            }
          `}
          style={{ fontWeight: 500 }}
          type="button"
        >
          {filterValue}
        </button>
      );
    })}
  </div>
</div>


        {/* Карточки */}
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
          {filteredCases.map((item, i) => {
            const fullVideoSrc = item.fullVideo;
            return (
              <div
                key={i}
                className="bg-[#1A1A1A] border border-[#767676] rounded-[20px] w-full px-[20px] pb-[23px] pt-[20px] flex flex-col shadow-lg"
                style={{ boxShadow: '0 0 0 1.2px #363636' }}
              >
                <div className="relative w-full h-[240px] md:h-[345px] rounded-[18px] overflow-hidden mb-[20px]">
                  <CaseVideo src={item.video1 || ''} poster={item.poster || undefined} />
                  <div className="absolute bottom-2 sm:bottom-5 right-2 sm:right-5 z-20 flex gap-1 sm:gap-2">
                    <div className="flex bg-white/10 rounded-[6px]  sm:rounded-[12px] px-2 py-[3px] sm:px-5 sm:py-[9px] font-franklin text-[12px] sm:text-[18px] text-white/100 uppercase shadow-md gap-1 sm:gap-2 tracking-tight backdrop-blur-[1px]">
                      {item.tags.map(shortTag).join(' | ')}
                    </div>
                  </div>
                </div>

                <div className="w-full text-left mb-[20px]">
                  <div className="text-[#727272] font-proto text-[15px] mb-[2px] uppercase flex gap-2 leading-8">
                    <span>[CASE {item.company.toUpperCase()}]</span>
                    <span className="opacity-35">[ABOUT]</span>
                  </div>
                  <div className="text-[16px] sm:text-[20px] text-[#8F8F8F] font-standard leading-[1.4] sm:leading-[1] break-words mb-[72px] whitespace-pre-line ml-[2px]">
                    <PrismicRichText field={item.description} />
                  </div>
                </div>

                <div className="flex justify-between items-end gap-2 mt-auto">
                  <div className="flex gap-[12.8px]">
                    {item.link ? (
                      <a href={item.link} className="inline-block">
                        <CaseButton primary>ПОКАЗАТЬ КЕЙС</CaseButton>
                      </a>
                    ) : (
                      <CaseButton primary disabled>ПОКАЗАТЬ КЕЙС</CaseButton>
                    )}
                    {fullVideoSrc ? (
                      <CaseButton onClick={() => openModal(fullVideoSrc)}>ВИДЕО</CaseButton>
                    ) : (
                      <CaseButton disabled>ВИДЕО</CaseButton>
                    )}
                  </div>
                  {item.companyLogo && (
                    <img src={item.companyLogo} alt={item.company} className="h-[40px] w-auto opacity-90" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Модалка */}
      {isModalOpen &&
        modalVideoSrc &&
        createPortal(
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <div className="relative w-full max-w-3xl aspect-video" onClick={(e) => e.stopPropagation()}>
              <video src={modalVideoSrc} controls autoPlay className="w-full h-full object-cover rounded-lg" />
              <button
                onClick={closeModal}
                className="absolute -right-3 -top-3 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl"
              >
                ✕
              </button>
            </div>
          </div>,
          document.body
        )}
    </main>
  );
}

function CaseButton({
  children,
  primary = false,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  primary?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const base = `flex items-center justify-center rounded-[7px] sm:rounded-[12px] font-franklin font-extrabold uppercase tracking-tight text-[14px] px-3 py-1 sm:text-[20px] sm:px-[12.82px] sm:py-[9.6px] min-w-0`;

  const color = primary
    ? 'text-[#444444] border-[#545454] border-[1px] hover:bg-gradient-to-r from-[#1FA2FF] to-[#1ADBFC] hover:text-[#161616]'
    : 'text-[#444444] border-[#545454] border-[1px] hover:bg-gradient-to-r from-[#C3C3C3] to-[#999999] hover:text-[#222]';

  const disabledStyles = 'opacity-30 cursor-not-allowed pointer-events-none';

  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${color} ${disabled ? disabledStyles : ''}`}>
      {children}
    </button>
  );
}

function CaseVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Detect viewport
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  // On desktop: play on hover
  const handleHover = () => {
    if (!isMobile) ref.current?.play().catch(() => {});
  };
  const handleLeave = () => {
    if (!isMobile && ref.current) {
      ref.current.pause();
      ref.current.currentTime = 0;
    }
  };

  // On mobile: auto-play when in view
  useEffect(() => {
    if (!isMobile || !ref.current) return;
    const video = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <div
      className={`relative w-full h-full overflow-hidden rounded-[18.65px] border-[1px] bg-dark`}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay={isMobile}        // start muted autoplay on mobile
        className="w-full h-full object-cover transition duration-300 ease-in-out"
      />
    </div>
  );
}
