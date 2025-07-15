/* -------------------- components/NewsSection.tsx -------------------- */
'use client';

import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import NewsModal from './NewsModal';

export type NewsCardProps = {
  tag?: string;
  image: string;
  mobileImage?: string;
  title: string;
  excerpt: string;
  full: string;
  date: string;
  link: string;
};

// Статический массив новостей
const blogPosts: NewsCardProps[] = [
  {
    image: '/images/news.png',
    mobileImage: undefined,
    title: 'НАШ РОЛИК ДЛЯ «ПЯТЁРОЧКИ»<br/> ПОЛУЧИЛ БРОНЗУ E+AWARDS 2025!',
    excerpt: 'Время — деньги: ролик для «Пятёрочки» мы собрали<br/> в стиле видеоигр всего за пару дней.',
    full: 'AI помог сгенерировать визуал — быстро и точно в цель...',
    date: '29/04/25',
    link: '/blog',
    tag: 'AI-продакшн',
  },
  {
    image: '/images/news2).webp',
    mobileImage: undefined,
    title: 'ИНТЕРВЬЮ ДЛЯ ADINDEX<br/> О 3D-АВАТАРАХ БРЕНДОВ',
    excerpt: 'Рассказали про опыт, технологии и перспективы<br/> внедрения цифровых аватаров в маркетинг брендов.',
    full: '25 ноября на Sostav стартовал конкурс...',
    date: '17/03/25',
    link: '/blog',
    tag: 'AI-продакшн',
  },
  {
    image: '/images/news3.webp',
    mobileImage: undefined,
    title: 'YANDEX BROWSER В ШОРТ-<br/>ЛИСТЕ RED APPLE 2024',
    excerpt: 'Ещё один кейс с нашим участием отметился<br/> среди номинантов фестиваля.',
    full: 'Проект с участием Twin3D попал в шорт-лист...',
    date: '22/11/24',
    link: '/blog',
    tag: 'AI-продакшн',
  },
  {
    image: '/images/news4.webp',
    mobileImage: undefined,
    title: 'TWIN3D ПОЛУЧИЛ <br/> ЗОЛОТО RED APPLE',
    excerpt: 'Рекламные ролики Yota с цифровыми аватарами<br/> получили наивысшую оценку жюри.',
    full: 'Мы создали уникальные CG-локации и аватары...',
    date: '18/09/24',
    link: '/blog',
    tag: 'AI-продакшн',
  },
];

function NewsCard({ image, title, excerpt, date }: NewsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        glareEnable={false}
        className="w-full rounded-[16px] border border-[#333] bg-[#1a1a1a] p-4 transition duration-300 hover:border-[#555]"
      >
        <div className="relative h-[300px] w-full overflow-hidden rounded-[12px]">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
        <div className="mt-4">
          <h3
            className="font-franklin text-xl font-normal leading-none text-white"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p
            className="mt-1 bg-gradient-to-r from-[#C3C3C3] to-[#999999] bg-clip-text text-lg font-standard leading-none text-transparent opacity-45"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        </div>
        <div className="mt-4 flex items-center justify-center gap-x-4 border-t border-[#333] pt-3 text-xs font-proto uppercase text-[#939393]">
          <span>[READ ALL]</span>
          <span className="opacity-55">{date}</span>
        </div>
      </Tilt>
    </motion.div>
  );
}

export default function NewsSection() {
  const pathname = usePathname();
  const isBlogPage = pathname?.startsWith('/blog');
  const [opened, setOpened] = useState<NewsCardProps | null>(null);
  const latest = blogPosts[0];

  return (
    <>
      {/* Блок последней новости */}
      <section className="relative w-full pb-28">
        <div className="relative w-full aspect-[3/4] sm:aspect-[16/9]">
          <Image
            src={latest.image}
            alt={latest.title}
            fill
            priority
            sizes="100vw"
            className="hidden sm:block object-cover object-top"
          />
          <Image
            src={latest.mobileImage ?? latest.image}
            alt={latest.title}
            fill
            priority
            sizes="100vw"
            className="block sm:hidden object-cover object-top"
          />
          <div className="hidden sm:block absolute inset-0 bg-black/40 mix-blend-multiply" />
        </div>
        <div className="relative z-10 -mt-[30vw] sm:-mt-[300px] w-full max-w-[1250px] mx-auto px-4 sm:px-8">
          <article className="relative z-10 bg-transparent sm:bg-black/60 sm:rounded-[30px] sm:border sm:border-white/15 sm:backdrop-blur-xl p-6 sm:p-10">
            <h1 className="mb-6 text-4xl sm:text-5xl font-druk font-extrabold leading-tight tracking-wide text-white whitespace-pre-line">
              {latest.title}
            </h1>
            <p className="mb-8 whitespace-pre-line text-base sm:text-2xl font-standard text-white opacity-45 leading-tight">
              { latest.full}
            </p>
            {latest.tag && (
              <span className="inline-flex items-center gap-4 rounded-[15px] border border-white/20 bg-[#141414]/80 px-6 py-3 font-franklin text-base font-medium text-white backdrop-blur-lg">
                <Image
                  src="/images/kruzhok.png"
                  alt="tag-icon"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                {latest.tag}
              </span>
            )}
          </article>
        </div>
      </section>

      {/* Сетка новостей */}
      <section className="bg-[#141414] py-20">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-0">
          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
            {blogPosts.map((post, i) =>
              isBlogPage ? (
                <button key={i} onClick={() => setOpened(post)} className="text-left">
                  <NewsCard {...post} />
                </button>
              ) : (
                <Link key={i} href={post.link} className="block">
                  <NewsCard {...post} />
                </Link>
              )
            )}
          </div>

          {!isBlogPage && (
            <div className="mt-10 flex justify-center">
              <Link
                href="/blog"
                className="w-full max-w-[1100px] rounded-xl border border-[#3C3C3C] px-8 py-3 text-xl font-franklin font-bold tracking-wider text-[#7E7E7E] transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#C3C3C3] hover:to-[#999999] hover:text-[#141414] text-center"
              >
                ВСЕ МАТЕРИАЛЫ
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Модалка для просмотра полной новости */}
      {opened && isBlogPage && <NewsModal post={opened} onClose={() => setOpened(null)} />}
    </>
  );
}
