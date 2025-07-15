/* -------------------------------------------------------------------------- */
/*  components/Hero.tsx                                                       */
/* -------------------------------------------------------------------------- */
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  /* ------------------------- refs ---- UI элементы ----------------------- */
  const containerRef   = useRef<HTMLDivElement>(null);
  const matrixBlockRef = useRef<HTMLDivElement>(null);
  const textRefs       = useRef<HTMLHeadingElement[]>([]);
  const twinRef        = useRef<HTMLDivElement>(null);
  const showRef        = useRef<HTMLDivElement>(null);
  const titleRef       = useRef<HTMLHeadingElement>(null);

  /* ---------------------- динамические инлайн-стили ---------------------- */
  const [twinStyle, setTwinStyle] = useState<React.CSSProperties>({});
  const [showStyle, setShowStyle] = useState<React.CSSProperties>({});

  /* --------------------------- modal state ------------------------------- */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal  = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  /* -------------------- вычисляем позиции twiN3D + Btn ------------------- */
  useEffect(() => {
    const updatePosition = () => {
      if (
        !containerRef.current ||
        !textRefs.current[0] ||
        !twinRef.current ||
        !showRef.current
      ) return;

      const GAP = 20;
      const DESKTOP_GAP = 6;

      /* высота фиксированного header */
      const headerEl      = document.getElementById('header');
      const headerHeight  = headerEl?.getBoundingClientRect().height || 0;

      let top: number;
      if (window.innerWidth >= 800) {
        /* desktop ─ под шапкой */
        top = headerHeight + DESKTOP_GAP;
      } else {
        /* mobile ─ под первой фразой */
        const EXTRA = 40;
        const ctr = containerRef.current.getBoundingClientRect();
        const txt = textRefs.current[0].getBoundingClientRect();
        top = txt.top - ctr.top - GAP - EXTRA;
      }

      const ctrHeight = containerRef.current.getBoundingClientRect().height;
      const btnBottom = ctrHeight - top + GAP;

      setTwinStyle({ position:'absolute', top:`${top}px`, left:0, width:'100%' });
      setShowStyle({ position:'absolute', bottom:`${btnBottom}px`, left:0 });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  /* ----------------------------- GSAP / ST ------------------------------ */
  useGSAP(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({

        /* === Desktop ===================================================== */
        '(min-width:800px)': () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current!,
              start: 'top top',
              end: '+=200%',
              scrub: true,
              pin: true,
              pinSpacing: true,
              invalidateOnRefresh: true,
            }
          });

          tl.to(textRefs.current[0], { opacity:0, y:-50, duration:0.2 })
            .to(matrixBlockRef.current, { opacity:1, duration:0.3 }, 0.1);

          for (let i=1;i<textRefs.current.length;i++){
            tl.fromTo(
               textRefs.current[i], { opacity:0, y:10 },
               { opacity:1, y:0, duration:0.25 }, `+=${i===1?0.4:0.1}`
             )
             .to(textRefs.current[i], { opacity:0, y:-50, duration:0.25 }, '+=0.3');
          }
        },

        /* === Mobile ====================================================== */
        '(max-width:799px)': () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current!,
              start: 'top top',
              end: ()=>'='+containerRef.current!.offsetHeight*0.7,
              scrub: true,
              pin: true,
              pinSpacing: true,
              invalidateOnRefresh: true,
            }
          });

          tl.to(textRefs.current[0], { opacity:0, y:-50, duration:0.2 })
            .to(matrixBlockRef.current,{ opacity:1,duration:0.3 },0.1);

          for (let i=1;i<textRefs.current.length;i++){
            tl.fromTo(
               textRefs.current[i], { opacity:0, y:10 },
               { opacity:1, y:0, duration:0.25 }, `+=${i===1?0.4:0.1}`
             );

            if (i===2){
              const shiftY = textRefs.current[i].getBoundingClientRect().height*0.5;
              tl.to([titleRef.current, showRef.current],
                    { y:-shiftY,duration:0.3 }, '-=0.3');
            }

            if (i!==textRefs.current.length-1){
              tl.to(textRefs.current[i],{ opacity:0, y:-50,duration:0.25 }, '+=0.3');
            }
          }
        }

      });
    }, containerRef);
    return () => ctx.revert();
  });

  /* ---------------------------- helpers --------------------------------- */
  function ShowreelButton({ className = '' }: { className?: string }) {
  return (
    <button
      onClick={openModal}
      className={`
        group relative z-0 inline-flex items-center gap-[10px] px-6 py-2 rounded-[15px]
        font-bold font-franklin text-[16px] border overflow-hidden
        transition-all duration-300 ease-in-out
        border-[#1DB4FE] hover:border-transparent active:border-transparent
        ${className}
      `}
    >
      {/* фон-градиент */}
      <span
        className={`
          absolute inset-0 rounded-[15px] bg-gradient-to-r from-[#1FA2FF] to-[#1ADBFC]
          transition-all duration-300
          opacity-0 group-hover:opacity-100 group-active:opacity-100
        `}
      />

      {/* текст */}
      <span
        className={`
          bg-clip-text text-transparent bg-gradient-to-r from-[#1FA2FF] to-[#1ADBFC]
          transition-all duration-300 z-10
          group-hover:text-white group-active:text-white
        `}
      >
        SHOWREEL
      </span>

      {/* иконки */}
      <img
        src="/icons/showreel2.svg"
        alt=""
        className={`
          w-6 h-6 relative z-10
          group-hover:hidden group-active:hidden
        `}
      />
      <img
        src="/images/Vector12.svg"
        alt=""
        className={`
          w-6 h-6 relative z-10 hidden
          group-hover:inline-block group-active:inline-block
        `}
      />
    </button>
  );
}


  /* ---------------------------- render ---------------------------------- */
  const phrases = ['CG-ПРОДАКШН', '3D АВАТАРЫ', 'ЦИФРОВЫЕ ДВОЙНИКИ'];

  return (
    <>
      {/* ---------- hero-секция ---------- */}
      <section
        ref={containerRef}
        id="hero"
        className="relative z-10 w-full overflow-hidden bg-black text-white"
        style={{ height:'100vh', paddingBottom:'env(safe-area-inset-bottom)' }}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay muted loop playsInline webkit-playsinline="true"
        >
          <source src="/video/hero-1.webm" type="video/webm" />
          <source src="/video/hero-1.mp4"  type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

        {/* twin3d */}
        <div ref={twinRef} style={twinStyle} className="px-5">
          <h1
            ref={titleRef}
            className="relative z-30 font-druk font-bold text-7xl sm:text-6xl md:text-[11.25rem]
                       uppercase leading-none tracking-normal mix-blend-difference">
            twin3d
          </h1>
        </div>

        {/* Showreel (mobile) */}
        <div ref={showRef} style={showStyle} className="md:hidden px-5">
          <ShowreelButton />
        </div>

        {/* фразы */}
        {phrases.map((txt,i)=>(
          <h1
            key={i}
            ref={el=>{el&&(textRefs.current[i]=el)}}
            className={`
              font-druk font-bold text-7xl sm:text-6xl md:text-[11.25rem]
              uppercase tracking-normal absolute bottom-[4px] left-0 px-5 sm:px-10
              z-30 mix-blend-difference leading-none w-full
              ${i===0?'':'opacity-0'}
            `}
            style={{willChange:'transform'}}
          >
            {txt}
          </h1>
        ))}

        {/* matrixBlock (desktop) */}
        <div
          ref={matrixBlockRef}
          className="hidden md:flex absolute right-5 bottom-6 translate-y-[-20px]
                     sm:right-10 sm:bottom-[4px] z-30 opacity-0 flex-col items-end gap-4
                     max-w-[90%] sm:max-w-[600px]"
        >
          <ShowreelButton />
        </div>
      </section>

      {/* ---------- модальное окно Showreel ---------- */}
      {isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <div
              className="relative w-full max-w-3xl aspect-video"
              onClick={(e)=>e.stopPropagation()} /* чтобы не закрывать при клике на видео */
            >
              <video
                src="/video/showreel.webm"
                controls
                autoPlay
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={closeModal}
                className="absolute -right-3 -top-3 w-9 h-9 rounded-full bg-white text-black
                           flex items-center justify-center font-bold text-xl"
              >
                ✕
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
