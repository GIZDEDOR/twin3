'use client';

import { useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { PrismicRichText } from '@prismicio/react';
import { RichTextField } from '@prismicio/client';

type NewsItem = {
  images: { url: string; alt?: string };
  mobileImage?: { url: string; alt?: string };
  title: RichTextField;
  excerpt: RichTextField;
  full: RichTextField;
  date: string;
  tag?: string;
  circle_image?: { url: string; alt?: string };
};

type Props = {
  slice: {
    primary: {
      news: NewsItem[];
    };
  };
};

export default function NewsGridSlice({ slice }: Props) {
  const newsItems = slice.primary.news;
  if (!Array.isArray(newsItems) || newsItems.length === 0) return null;
  const [opened, setOpened] = useState<NewsItem | null>(null);
  const latest = newsItems[0];

  return (
    <>
      {/* ─── Latest News ─── */}
      <section className="relative w-full pb-28">
        <div className="relative w-full aspect-[3/4] sm:aspect-[16/9]">
          <Image
            src={latest.images.url}
            alt={latest.images.alt ?? ''}
            fill
            priority
            sizes="100vw"
            className="hidden sm:block object-cover object-top"
          />
          <Image
            src={latest.mobileImage?.url ?? latest.images.url}
            alt={latest.mobileImage?.alt ?? ''}
            fill
            priority
            sizes="100vw"
            className="block sm:hidden object-cover object-top"
          />
          <div className="hidden sm:block absolute inset-0 bg-black/40 mix-blend-multiply" />
        </div>

        <div className="relative z-10 -mt-[30vw] sm:-mt-[300px] w-full max-w-[1250px] mx-auto px-4 sm:px-8">
          <article className="relative z-10 bg-transparent sm:bg-black/60 sm:rounded-[30px] sm:border sm:border-white/15 sm:backdrop-blur-xl p-6 sm:p-10">
            <div className="mb-6 text-4xl sm:text-5xl font-druk font-extrabold mix-blend-difference uppercase leading-tight tracking-wide text-white whitespace-pre-line">
              <PrismicRichText field={latest.title} />
            </div>
            <div className="mb-8 whitespace-pre-line text-base sm:text-2xl font-standard text-white opacity-45 leading-tight">
              <PrismicRichText field={latest.full} />
            </div>
            {latest.tag && latest.circle_image?.url && (
              <span className="inline-flex items-center gap-4 rounded-[15px] border border-white/20 bg-[#141414]/80 px-6 py-3 font-franklin text-base font-medium text-white backdrop-blur-lg">
                <Image
                  src={latest.circle_image.url}
                  alt={latest.circle_image.alt ?? 'icon'}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                {latest.tag}
              </span>
            )}
          </article>
          <div className="block sm:hidden pointer-events-none absolute inset-x-0 top-full h-[0vh] bg-[#141414] z-0" />
        </div>
      </section>

      {/* ─── News Grid ─── */}
      <section className="bg-[#141414] py-20">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-0">
          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
            {newsItems.slice(1).map((post, idx) => (
              <button key={idx + 1} onClick={() => setOpened(post)} className="text-left">
                <motion.div whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                  <Tilt
                    tiltMaxAngleX={10}
                    tiltMaxAngleY={10}
                    glareEnable={false}
                    className="w-full rounded-[16px] border border-[#333] bg-[#1a1a1a] p-4 transition duration-300 hover:border-[#555]"
                  >
                    <div className="relative h-[300px] w-full overflow-hidden rounded-[12px]">
                      <Image
                        src={post.images.url}
                        alt={post.images.alt ?? ''}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-4">
                      <PrismicRichText
                        field={post.title}
                        components={{
                          heading1: ({ children }) => (
                            <h3 className="font-franklin text-xl font-bold uppercase leading-tight whitespace-pre-line text-white">
                              {children}
                            </h3>
                          ),
                        }}
                      />
                      <div className="mt-1 bg-gradient-to-r from-[#C3C3C3] to-[#999999] bg-clip-text text-lg font-standard leading-none text-transparent opacity-45">
                        <PrismicRichText field={post.excerpt} />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-x-4 border-t border-[#333] pt-3 text-xs font-proto uppercase text-[#939393]">
                      <span>[READ ALL]</span>
                      <span className="opacity-55">{post.date}</span>
                    </div>
                  </Tilt>
                </motion.div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Modal ─── */}
      <AnimatePresence>
        {opened && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpened(null)}
          >
            <motion.div
              className="relative mx-4 w-full max-w-3xl rounded-2xl bg-[#1a1a1a] overflow-hidden max-h-[90vh] overflow-y-auto scrollbar-hidden"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[320px] w-full overflow-hidden">
                <Image
                  src={opened.images.url}
                  alt={opened.images.alt ?? ''}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="px-6 py-8 pb-16 md:px-10 md:py-10 space-y-6">
                <div className="font-franklin text-3xl md:text-4xl font-bold uppercase leading-tight text-white">
                  <PrismicRichText field={opened.title} />
                </div>
                <div className="bg-gradient-to-r from-[#C3C3C3] to-[#999999] bg-clip-text text-[18px] md:text-[20px] font-standard leading-[1.9] text-transparent whitespace-pre-line">
                  <PrismicRichText field={opened.full} />
                </div>
                <div className="flex items-center justify-between pt-2">
                  {opened.tag && opened.circle_image?.url && (
                    <span className="inline-flex items-center gap-4 rounded-[15px] border border-white/20 bg-white/5 px-6 py-3 font-franklin text-base font-medium text-white backdrop-blur-lg">
                      <Image
                        src={opened.circle_image.url}
                        alt={opened.circle_image.alt ?? 'icon'}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                      {opened.tag}
                    </span>
                  )}
                  <div className="font-proto text-sm uppercase text-[#999]">{opened.date}</div>
                </div>
                <div className="h-px w-full bg-[#333]" />
                <div className="pt-2 text-center">
                  <button
                    onClick={() => setOpened(null)}
                    className="font-proto text-sm uppercase text-[#999] hover:text-white transition"
                  >
                    [BACK]
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
