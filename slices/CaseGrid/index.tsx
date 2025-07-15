'use client';

import { useEffect, useRef, useState } from 'react';
import { useCaseFilter } from '@/store/useCaseFilter';
import Image from 'next/image';
import Link from 'next/link';
import { SliceComponentProps } from '@prismicio/react';
import { Content } from '@prismicio/client';

interface CaseData {
  title: string;
  video1: string;
  video2: string;
  tags: string[];
  category: string;
}

const mapPrismicCase = (item: any): CaseData => ({
  title: item.title ?? '',
  video1: item.video1?.url ?? '',
  video2: item.video2?.url ?? '',
  category: item.category ?? '',
  tags: Array.isArray(item.tags) ? item.tags.map((t: any) => t.tag) : [],
});

export default function CaseGrid({ slice }: SliceComponentProps<Content.CaseGridSlice>) {
  const { category } = useCaseFilter();
  const [visible, setVisible] = useState(3);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const ALL_CASES = slice.primary.cases.map(mapPrismicCase);
  const filtered = category ? ALL_CASES.filter((c) => c.category === category) : ALL_CASES;
  const visibleCases = filtered.slice(0, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && visible < filtered.length) {
          setVisible((v) => v + 2);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [filtered.length, visible]);

  return (
    <section className="bg-dark pt-20 pb-50 min-h-screen">
      <div className="flex flex-col gap-6 items-center">
        {visibleCases.map((item, i) => (
          <div
            key={i}
            className="max-w-[1100px] px-4 sm:px-0 w-full scale-[0.95] md:scale-100"
          >
            <CaseRow {...item} />
          </div>
        ))}

        <Link
          href="/projects"
          className="w-[375px] sm:w-full max-w-[1100px] mt-[1px] sm:mt-[10px] px-[90.5px] py-[11px] rounded-2xl font-franklin text-[18px] font-extrabold uppercase transition duration-300
          text-[#7c7c81] border border-[#3a3a3a]
          hover:text-black hover:border-transparent
          hover:bg-gradient-to-r hover:from-[#1FA2FF] hover:to-[#1ADBFC] text-center block"
        >
          ПОСМОТРЕТЬ ВСЕ КЕЙСЫ
        </Link>
      </div>
      <div ref={loaderRef} className="h-10 mt-10" />
    </section>
  );
}

function CaseRow({ title, video1, video2, tags }: CaseData) {
  const isYota = title === 'YOTA';
  const isFeduk = title.includes('FEDUK');
  const isPerek = title.includes('ПЯТЁРОЧКА');

  const borderColor = isYota
    ? 'border-blue-400'
    : isFeduk
    ? 'border-neutral-500'
    : isPerek
    ? 'border-green-400'
    : 'border-[#444444]';

  const textColor = borderColor.replace('border-', 'text-');

  const logo = isYota
    ? '/images/yota_466415.svg'
    : isFeduk
    ? '/images/red_353562.svg'
    : isPerek
    ? '/images/x5_540202.svg'
    : '';

  const icon = isYota
    ? '/images/logosmobyota.svg'
    : isFeduk
    ? '/images/logosmobred.svg'
    : isPerek
    ? '/images/logosmob55.svg'
    : '';

  const gradientClass = isYota
    ? 'from-[#1FA2FF] via-[#12D8FA] to-[#7BB3F4]'
    : isPerek
    ? 'from-[#34FA56] to-[#4CE15A]'
    : '';

  return (
    <div
      className={`group relative rounded-[21px] p-[2px] hover:p-[4px] transition-all duration-300 ${
        isYota || isPerek
          ? `bg-gradient-to-r ${gradientClass}`
          : `${borderColor} border-solid border-[2px] hover:border-[4px]`
      } hover:scale-[1.05]`}
    >
      <div className="bg-black transition-all duration-300 rounded-[18px] group-hover:rounded-[14px] p-[10px]">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-[6px]">
          <CaseVideo src={video1} borderColor={borderColor} />
          <div className="hidden md:block">
            <CaseVideo src={video2} borderColor={borderColor} />
          </div>
          <div className="flex flex-col items-start pr-0 pt-1">
            <div className="hidden sm:flex flex-col items-start text-[15px] font-proto font-bold uppercase tracking-wide leading-[15px] text-left text-transparent bg-clip-text bg-gradient-to-b from-[#C3C3C3] to-[#999999] rotate-360 writing-vertical opacity-20 h-auto min-h-[170px] w-[44px] min-w-[44px] whitespace-nowrap justify-center">
              <span>Who: Twin3D x {title.replace('FEDUK FEAT ', '')}</span>
              <span>Task: Digital Ad</span>
            </div>
            <div className="hidden sm:block mt-2">
              <img
                src={logo}
                alt="case logo"
                className={`mx-2 my-1 opacity-20 ${isPerek ? 'h-[24px] w-[30px]' : 'h-[70px] w-auto'}`}
              />
            </div>
          </div>
        </div>

        <div className={`mt-3 rounded-[12px] pl-[16px] pr-[10px] border ${borderColor} overflow-visible`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 w-full">
              <div className={`block sm:hidden ${isPerek ? 'ml-[0px]' : 'ml-[1px]'} ${isFeduk ? 'pt-[6px] pb-[6px]' : 'pt-[2px] pb-[2px]'}`}>
                <Image
                  src={icon}
                  alt={`${title} icon`}
                  width={isFeduk ? 36 : 52}
                  height={isFeduk ? 36 : 52}
                  className={`${isFeduk ? 'h-8' : 'h-14'} w-auto`}
                />
              </div>
              <h3
                className={`hidden sm:block min-w-0 truncate px-[2px] font-extrabold font-franklin text-[33px] tracking-tight ${
                  isYota
                    ? 'bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#7BB3F4] text-transparent bg-clip-text'
                    : isPerek
                    ? 'bg-gradient-to-r from-[#34FA56] to-[#4CE15A] text-transparent bg-clip-text'
                    : isFeduk
                    ? 'text-[#7c7c81]'
                    : textColor
                }`}
              >
                {title}
              </h3>
            </div>
            <div className="flex gap-2">
              {tags.map((tag: string, i: number) => {
                const isLeft = isYota && i === 0;
                const isRight = isYota && i === 1;

                return (
                  <span
                    key={i}
                    className={`whitespace-nowrap rounded-[6px] px-3 py-[4px] text-[18px] font-franklin uppercase font-bold leading-none ${
                      isLeft
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#7BB3F4] border border-[#1FA2FF]'
                        : isRight
                        ? 'text-[#7c7c81] border border-[#7c7c81]'
                        : isFeduk
                        ? 'text-[#7c7c81] border border-[#7c7c81]'
                        : isPerek
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#34FA56] to-[#4CE15A] border border-[#34FA56]'
                        : `${borderColor} ${textColor} border`
                    }`}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CaseVideo({ src, borderColor }: { src: string; borderColor: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (isMobile) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
            video.currentTime = 0;
          }
        },
        { threshold: 0.6 }
      );

      observer.observe(video);
      return () => observer.disconnect();
    }
  }, [isMobile]);

  const handleHover = () => {
    if (!isMobile) ref.current?.play();
  };

  const handleLeave = () => {
    if (!isMobile && ref.current) {
      ref.current.pause();
      ref.current.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      className={`relative w-full h-[440px] overflow-hidden rounded-[18.65px] border bg-dark ${borderColor}`}
    >
      <video
        ref={ref}
        src={src}
        className="w-full h-full object-cover transition duration-300 ease-in-out"
        muted
        loop
        playsInline
        autoPlay
      />
    </div>
  );
}
