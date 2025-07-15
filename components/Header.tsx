/* -------------------------------------------------------------------------- */
/*  components/Header.tsx                                                     */
/* -------------------------------------------------------------------------- */
'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import HeaderOverlay from './HeaderOverlay';
import { RxHamburgerMenu } from 'react-icons/rx';

const navItems = [
  { name: 'WELCOME', href: '/' },
  { name: 'ПРОЕКТЫ', href: '/projects' },
  { name: 'КТО МЫ', href: '/about' },
  { name: 'БЛОГ', href: '/blog' },
];

export default function Header() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  /* ---------------------------------------------------------------------- */
  /*  Scroll-logic: работает ТОЛЬКО на главной, на остальных header статичен */
  /* ---------------------------------------------------------------------- */
  useEffect(() => {
    setIsClient(true);

    const handleScroll = () => {
      const current = window.scrollY;
      const isScrollingUp = prevScrollPos > current;
      const isHomePage = pathname === '/';

      if (isHomePage) {
        const heroBottom = window.innerHeight * 2;      // ≈ конец hero-секции
        const aboveHero  = current < heroBottom;

        if (aboveHero) {
          setVisible(true);            // всегда показываем в верхней части
        } else {
          setVisible(isScrollingUp);   // прячем, если скролл вниз
        }
      } else {
        setVisible(isScrollingUp);     // на других страницах – «show on scroll up»
      }

      setPrevScrollPos(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, pathname]);

  /* ---------------------------------------------------------------------- */
  /*  Render                                                                */
  /* ---------------------------------------------------------------------- */
  return (
    <>
      {/* === DESKTOP / TABLET HEADER === */}
      <header
        id="header"
        className={twMerge(
          'hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-48px)] max-w-[1720px] items-center justify-between rounded-[15px] border border-white/10 bg-black/70 px-[21px] py-[14px] backdrop-blur-md transition-transform duration-300',
          visible ? 'translate-y-0' : '-translate-y-[120%]'
        )}
      >
        {/* ЛЕВАЯ ЧАСТЬ  --------------------------------------------------- */}
        <div className="flex items-center gap-[20px]">
          {/* Кнопка-бургер c точками */}
          <button
            onClick={() => setMenuOpen(true)}
            className="rounded-[15px] bg-black px-5 py-[11px] border border-white/10 hover:bg-gradient-to-br hover:from-[#1FA2FF] hover:to-[#1ADBFC] transition-all"
          >
            <div className="grid grid-cols-3 gap-[2px]">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className="h-[3px] w-[3px] rounded-full bg-white/70" />
              ))}
            </div>
          </button>

          {/* Навигация */}
          {isClient && (
            <nav className="flex gap-[20px] font-franklin">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={twMerge(
                    'flex h-[36px] items-center justify-center rounded-[15px] border border-white/10 px-5 py-[11px] text-[14px] font-medium text-white/60 transition-colors',
                    pathname === item.href
                      ? 'bg-[#2D2D2D] text-[#E6E6E6]'
                      : 'hover:bg-white/10 hover:text-white'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}
        </div>

        {/* Логотип */}
        <div className="pr-2 flex items-center">
          <img
            src="/images/logocvet.webp"
            alt="logo-header"
            className="h-8 w-auto opacity-100"
          />
        </div>
      </header>

      {/* === MOBILE HEADER === */}
      <header
        className={twMerge(
          'flex md:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-24px)] items-center justify-between rounded-2xl border border-white/10 bg-black/60 px-4 py-2 backdrop-blur-md transition-transform duration-300',
          visible ? 'translate-y-0' : '-translate-y-[120%]'
        )}
      >
        {/* Левая часть — SHOW MENU */}
        <button
          onClick={() => setMenuOpen(true)}
          className="flex items-center gap-2 text-white/70 hover:text-white transition"
        >
          <RxHamburgerMenu className="text-2xl" />
          <span className="font-franklin text-lg font-bold uppercase bg-gradient-to-r from-[#C3C3C3] to-[#999999] bg-clip-text text-transparent">
            Show Menu
          </span>
        </button>

        {/* Логотип */}
        <div className="flex items-center">
          <img
            src="/images/logocvet.webp"
            alt="logo-header"
            className="h-5 w-auto opacity-100"
          />
        </div>
      </header>

      {/* Оверлей меню */}
      {menuOpen && (
        <HeaderOverlay onClose={() => setMenuOpen(false)} showBackButton />
      )}
    </>
  );
}
