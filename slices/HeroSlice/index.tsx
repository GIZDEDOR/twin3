'use client';

import React, { useRef, useEffect, useState, FC } from 'react';
import { createPortal } from 'react-dom';
import { SliceComponentProps } from '@prismicio/react';
import {
  Content,
  isFilled,
  FilledLinkToMediaField,
} from '@prismicio/client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type HeroSliceProps = SliceComponentProps<Content.HeroSliceSlice>;

const HeroSlice: FC<HeroSliceProps> = ({ slice }) => {
  /* ------------------------------------------------------------------ refs */
  const containerRef   = useRef<HTMLDivElement>(null);
  const matrixBlockRef = useRef<HTMLDivElement>(null);
  const textRefs       = useRef<HTMLHeadingElement[]>([]);
  const twinRef        = useRef<HTMLDivElement>(null);
  const showRef        = useRef<HTMLDivElement>(null);
  const titleRef       = useRef<HTMLHeadingElement>(null);

  /* -------------------------------------------------------------- positions */
  const [twinStyle, setTwinStyle] = useState<React.CSSProperties>({});
  const [showStyle, setShowStyle] = useState<React.CSSProperties>({});

  /* ----------------------------------------------------------------- modal */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal  = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  /* ----------------------------------------------- вычисление позиций hero */
  useEffect(() => {
    const updatePosition = () => {
      if (!containerRef.current || !textRefs.current[0] || !showRef.current)
        return;

      const GAP = 20;
      const DESKTOP_GAP = 6;
      const headerHeight =
        document.getElementById('header')?.getBoundingClientRect().height ?? 0;

      let top: number;
if (window.innerWidth >= 800) {
  top = headerHeight + DESKTOP_GAP; // desktop
} else {
  top = 550; // фиксированная позиция на мобилке
}

      const ctrHeight = containerRef.current.getBoundingClientRect().height;
      const btnBottom = ctrHeight - top + GAP;

      setTwinStyle({ position: 'absolute', top, left: 0, width: '100%' });
      setShowStyle({ position: 'absolute', bottom: btnBottom, left: 0 });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  /* ---------------------------------------------------------- GSAP анимации */
  useGSAP(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        '(min-width:800px)': () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current!,
              start: 'top top',
              end: '+=200%',
              scrub: true,
              pin: true,
              invalidateOnRefresh: true,
            },
          });

          tl.to(textRefs.current[0], { opacity: 0, y: -50, duration: 0.2 })
            .to(matrixBlockRef.current, { opacity: 1, duration: 0.3 }, 0.1);

          for (let i = 1; i < textRefs.current.length; i++) {
            tl.fromTo(
              textRefs.current[i],
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.25 },
              `+=${i === 1 ? 0.4 : 0.1}`,
            ).to(
              textRefs.current[i],
              { opacity: 0, y: -50, duration: 0.25 },
              '+=0.3',
            );
          }
        },

        '(max-width:799px)': () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current!,
              start: 'top top',
              end: '1490',
              scrub: true,
              pin: true,
              invalidateOnRefresh: true,
            },
          });

          tl.to(textRefs.current[0], { opacity: 0, y: -50, duration: 0.2 })
            .to(matrixBlockRef.current, { opacity: 1, duration: 0.3 }, 0.1);

          for (let i = 1; i < textRefs.current.length; i++) {
            tl.fromTo(
              textRefs.current[i],
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.25 },
              `+=${i === 1 ? 0.4 : 0.1}`,
            );
            
            if (i === 2) {
              const shiftY = textRefs.current[i].getBoundingClientRect().height * 0.5;
              tl.to([titleRef.current, showRef.current], { y: -shiftY, duration: 0.3 }, '-=0.3');
            }
            

            if (i !== textRefs.current.length - 1) {
              tl.to(
                textRefs.current[i],
                { opacity: 0, y: -50, duration: 0.25 },
                '+=0.3',
              );
            }
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  });

  /* -------------------------------------------------------- кнопка Showreel */
  function ShowreelButton({ className = '' }: { className?: string }) {
    return (
      <button
        onClick={openModal}
        className={`
          group relative z-0 inline-flex items-center gap-[10px] px-6 py-2
          rounded-[15px] font-bold font-franklin text-[16px] border
          overflow-hidden transition-all duration-300 ease-in-out
          border-[#1DB4FE] hover:border-transparent active:border-transparent
          ${className}
        `}
      >
        <span
          className="
            absolute inset-0 rounded-[15px] bg-gradient-to-r
            from-[#1FA2FF] to-[#1ADBFC] transition-all duration-300
            opacity-0 group-hover:opacity-100 group-active:opacity-100
          "
        />
        <span
          className="
            bg-clip-text text-transparent bg-gradient-to-r
            from-[#1FA2FF] to-[#1ADBFC] transition-all duration-300 z-10
            group-hover:text-white group-active:text-white
          "
        >
          SHOWREEL
        </span>
        <img
          src="/icons/showreel2.svg"
          alt=""
          className="w-6 h-6 relative z-10 group-hover:hidden group-active:hidden"
        />
        <img
          src="/images/Vector12.svg"
          alt=""
          className="w-6 h-6 relative z-10 hidden group-hover:inline-block group-active:inline-block"
        />
      </button>
    );
  }

  // Вот здесь берём URL прямо из Prismic CDN:
  const bgVideoUrl = (slice.primary.background_video as FilledLinkToMediaField)?.url;
  const showreelUrl = (slice.primary.showreel_video as FilledLinkToMediaField)?.url;

  /* ---------------------------------------------------------------- phrases */
  const phrases = ['CG-ПРОДАКШН', '3D АВАТАРЫ', 'ЦИФРОВЫЕ ДВОЙНИКИ'];

  /* ---------------------------------------------------------------- render */
  return (
    <>
      {/* ---------- hero-секция ---------- */}
      <section
        ref={containerRef}
        className="relative z-10 w-full overflow-hidden bg-black text-white"
        style={{
  height: '100dvh',
  paddingBottom: 'env(safe-area-inset-bottom)',
  paddingTop: 'env(safe-area-inset-top)',
}}
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        {/* фоновое видео */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={bgVideoUrl} type="video/webm" />
          <source src={bgVideoUrl.replace('.webm', '.mp4')} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

        {/* twin3d title */}
        <div ref={twinRef} style={twinStyle} className="px-5">
          <h1
            ref={titleRef}
            className="relative z-30 font-druk font-bold text-7xl sm:text-6xl
                       md:text-[11.25rem] uppercase leading-none tracking-normal
                       mix-blend-difference"
          >
            twin3d
          </h1>
        </div>

        {/* Showreel button (mobile) */}
        <div ref={showRef} style={showStyle} className="md:hidden px-5">
          <ShowreelButton />
        </div>

        {/* фразы */}
        {phrases.map((txt, i) => (
          <h1
            key={i}
            ref={(el) => {el && (textRefs.current[i] = el)}}
            className={`
              font-druk font-bold text-7xl sm:text-6xl md:text-[11.25rem]
              uppercase tracking-normal absolute bottom-[4px] left-0 px-5 sm:px-10
              z-30 mix-blend-difference leading-none w-full
              ${i === 0 ? '' : 'opacity-0'}
            `}
            style={{ willChange: 'transform' }}
          >
            {txt}
          </h1>
        ))}

        {/* Showreel button (desktop) */}
        <div
          ref={matrixBlockRef}
          className="hidden md:flex absolute right-5 bottom-6 translate-y-[-20px]
                     sm:right-10 sm:bottom-[4px] z-30 opacity-0 flex-col items-end gap-4
                     max-w-[90%] sm:max-w-[600px]"
        >
          <ShowreelButton />
        </div>
      </section>

      {/* ---------- модалка Showreel ---------- */}
      {isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center
                       bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <div
              className="relative w-full max-w-3xl aspect-video"
              onClick={(e) => e.stopPropagation()} // чтобы не закрывать при клике на видео
            >
              <video
                src={showreelUrl}
                controls
                autoPlay
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={closeModal}
                className="absolute -right-3 -top-3 w-9 h-9 rounded-full
                           bg-white text-black flex items-center justify-center
                           font-bold text-xl"
              >
                ✕
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default HeroSlice;
