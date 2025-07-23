'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import CityTime from './CityTime';
import { motion } from 'framer-motion';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';


type HeaderOverlayProps = {
  onClose: () => void;
  showBackButton?: boolean;
};

const navItems = [
  { name: 'WELCOME', href: '/' },
  { name: 'ПРОЕКТЫ', href: '/projects' },
  { name: 'КТО МЫ', href: '/about' },
  { name: 'БЛОГ', href: '/blog' },
];

const leftVideos = [
  '/video/left.webm',
  '/video/feature-3.webm',
  '/video/feature-4.webm',
  '/video/feature-5.webm',
];

const centerVideos = [
  '/video/center.webm',
  '/video/hero-1.webm',
  '/video/hero-3.webm',
  '/video/hero-4.webm',
];

function getRandomVideo(current: string, pool: string[]): string {
  const others = pool.filter(v => v !== current);
  return others[Math.floor(Math.random() * others.length)] || current;
}

export default function HeaderOverlay({ onClose, showBackButton = false }: HeaderOverlayProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [leftVideo, setLeftVideo] = useState('/video/left.webm');
  const [centerVideo, setCenterVideo] = useState('/video/center.webm');
  const [prevLeftVideo, setPrevLeftVideo] = useState('');
  const [prevCenterVideo, setPrevCenterVideo] = useState('');
  const [videosLoaded, setVideosLoaded] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setHasMounted(true);
    setWindowHeight(window.innerHeight);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    setWindowHeight(window.innerHeight);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const allSources = [...leftVideos, ...centerVideos];
    let loadedCount = 0;
    const checkDone = () => {
      loadedCount++;
      if (loadedCount === allSources.length) setVideosLoaded(true);
    };
    allSources.forEach(src => {
      const video = document.createElement('video');
      video.src = src;
      video.preload = 'auto';
      video.muted = true;
      video.oncanplaythrough = checkDone;
    });
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    if (leftVideo) setPrevLeftVideo(leftVideo);
  }, [leftVideo]);

  useEffect(() => {
    if (centerVideo) setPrevCenterVideo(centerVideo);
  }, [centerVideo]);

  useEffect(() => {
  const setVH = () => {
    // 1% от высоты окна
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  setVH();
  window.addEventListener('resize', setVH);
  return () => window.removeEventListener('resize', setVH);
}, []);

  useEffect(() => {
    if (videosLoaded) {
      setTimeout(() => setIsInitial(false), 100);
    }
  }, [videosLoaded]);

  useLockBodyScroll(true); 

  

  if (!hasMounted || (!videosLoaded && !isMobile)) {
    return (
      <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-[5px] border-t-transparent border-white rounded-full animate-spin" />
      </div>
    );
  }

  const socialLinks: Record<string, string> = {
  bh: 'https://behance.net/twin3dproduction',
  tg: 'https://t.me/twin_3d',
  wa: 'https://api.whatsapp.com/send?phone=79067244645',
};
 
  return (
    <div className="
        fixed inset-0 z-[100]
        w-full h-screen            /* fallback */
        sm:h-screen
        bg-black text-white
        flex flex-col sm:flex-row
        touch-none
      "
      style={{ height: 'calc(var(--vh, 1vh) * 100)' }}  /* корректная высота даже до effect */
    >
      {showBackButton && !isMobile && (
        <div
          className="absolute -top-1 left-5 z-[101] flex items-center gap-2 cursor-pointer mix-blend-difference text-white transition-opacity hover:opacity-80"
          onClick={onClose}
        >
          <img src="/icons/backiconmenu.svg" alt="Close" className="w-20 h-20 sm:w-20 sm:h-20" />
        </div>
      )}

      {!isMobile && (
        <>
          <div className="w-1/3 h-full relative overflow-hidden">
            {prevLeftVideo && prevLeftVideo !== leftVideo && (
              <motion.video
                key={prevLeftVideo}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              >
                <source src={prevLeftVideo} type="video/webm" />
              </motion.video>
            )}
            <motion.video
  key={leftVideo}
  className="absolute inset-0 w-full h-full object-cover"
  autoPlay
  muted
  loop
  initial={isInitial ? { opacity: 0, y: windowHeight } : { opacity: 0 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.1, ease: 'easeInOut' }}
>
  <source src={leftVideo} type="video/webm" />
</motion.video>
          </div>

          <div className="w-1/3 h-full relative overflow-hidden">
            {prevCenterVideo && prevCenterVideo !== centerVideo && (
              <motion.video
                key={prevCenterVideo}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              >
                <source src={prevCenterVideo} type="video/webm" />
              </motion.video>
            )}
            <motion.video
  key={centerVideo}
  className="absolute inset-0 w-full h-full object-cover"
  autoPlay
  muted
  loop
  initial={isInitial ? { opacity: 0, y: -windowHeight } : { opacity: 0 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.1, ease: 'easeInOut' }}
>
  <source src={centerVideo} type="video/webm" />
</motion.video>
          </div>
        </>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="w-full md:w-1/3 h-full bg-[#141414] flex flex-col gap-6 px-5 pt-2 pb-1"
      >
        <div className="flex md:hidden justify-between items-center mb-1">
          <button
            onClick={onClose}
            className="flex items-center gap-3 text-[#797979] hover:text-white transition text-[18px] px-4 py-2"
          >
            <img src="/icons/back.svg" alt="Back" className="w-7 h-7" />
            <span className="uppercase font-franklin text-[24px]">Back</span>
          </button>
          <img src="/images/logo-header.png" alt="logo-header" className="h-[24px] w-auto object-contain opacity-60" />
        </div>

        <nav className="flex flex-col gap-3 w-full font-bold font-druk text-[#4D4D4D] uppercase leading-[0.85] sm:items-start items-center text-center sm:text-left">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 150 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6, ease: 'easeOut' }}
              className="overflow-hidden w-full"
            >
              <Link href={item.href} onClick={onClose} className="block w-full group">
                <span
                  onMouseEnter={() => {
                    if (!isMobile) {
                      if (item.name === 'WELCOME' || item.name === 'ПРОЕКТЫ') {
                        setLeftVideo(getRandomVideo(leftVideo, leftVideos));
                      }
                      if (item.name === 'КТО МЫ' || item.name === 'БЛОГ') {
                        setCenterVideo(getRandomVideo(centerVideo, centerVideos));
                      }
                    }
                  }}
                  className="max-[639px]:text-[30vw] inline-block origin-left transition-all text-transparent bg-gradient-to-r from-[#343434] to-[#626262] bg-clip-text group-hover:from-[#1FA2FF] group-hover:via-[#12D8FA] group-hover:to-[#7BB3F4] text-[30vw] sm:text-[15vw] md:text-[7vw] xl:text-[130px]"
                >
                  {item.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col gap-[25px] mt-auto text-sm w-full"
        >
          <div className="flex flex-col xl:flex-row gap-2 xl:gap-[11.5px] justify-center sm:justify-start items-center sm:items-start">
            {['bh', 'tg', 'wa'].map((icon) => (
              <a
                key={icon}
                href={socialLinks[icon]}
                className="flex items-center justify-center gap-2 px-5 py-2 w-[140px] border border-white/20 rounded-[10.61px] font-normal text-white/70 hover:bg-white/10 hover:text-white transition"
              >
                <img src={`/icons/${icon}-icon.svg`} alt={icon} className="w-5 h-5" />
                <span className="text-[20px] leading-[20.9px] tracking-normal font-franklin">
                  {icon === 'bh' ? 'BEHANCE' : icon === 'tg' ? 'TELEGRAM' : 'WHATSAPP'}
                </span>
              </a>
            ))}
          </div>

          <div className="w-full flex justify-center sm:justify-between items-end">
            <div className="hidden lg:flex items-center gap-2">
              <img src="/icons/sk-icon.png" alt="Skolkovo" className="h-6 w-auto" />
            </div>
            <div className="flex flex-col items-center lg:items-end text-right gap-[7px] max-w-xs">
              <CityTime />
              <div className="hidden lg:block text-[#2C2C2C] text-[13px] leading-[12px] font-standard tracking-[-0.02em] uppercase">
                <p>Все 3D-аватары и цифровые двойники,</p>
                <p>представленные в кейсах, созданы</p>
                <p>компанией ООО «Твин3Д».</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
