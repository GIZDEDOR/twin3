/* -------------------------------------------------------------------------- */
/*  components/NewsModal.tsx                                                  */
/* -------------------------------------------------------------------------- */
'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { NewsCardProps } from './NewsGrid';

interface NewsModalProps {
  post: NewsCardProps;
  onClose: () => void;
}

export default function NewsModal({ post, onClose }: NewsModalProps) {
  useEffect(() => {
    const { body } = document;
    const prev = body.style.overflow;
    body.style.overflow = 'hidden';
    return () => {
      body.style.overflow = prev;
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative mx-4 w-full max-w-3xl rounded-2xl bg-[#1a1a1a] p-0 md:p-0 overflow-hidden max-h-[90vh] overflow-y-auto scrollbar-hidden"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Обложка */}
          <div className="relative h-[320px] w-full overflow-hidden">
            <Image
              src={post.image}
              alt={post.title.replace(/<br\s*\/?>/g, ' ')}
              fill
              className="object-cover"
            />
          </div>

          {/* Контент */}
          <div className="px-6 py-8 pb-16 md:px-10 md:py-10 space-y-6">
            {/* Заголовок */}
            <h2
              className="font-franklin text-3xl md:text-4xl font-bold uppercase leading-tight text-white"
              dangerouslySetInnerHTML={{ __html: post.title }}
            />

            {/* Описание */}
            <p
              className="bg-gradient-to-r from-[#C3C3C3] to-[#999999] bg-clip-text text-[18px] md:text-[20px] font-standard leading-[1.9] text-transparent whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: post.full ?? post.excerpt }}
            />

            {/* Тег и дата */}
            <div className="flex items-center justify-between pt-2">
              {post.tag && (
                <span className="inline-flex items-center gap-4 rounded-[15px] border border-white/20 bg-white/5 px-6 py-3 font-franklin text-base font-medium text-white backdrop-blur-lg">
                  <Image
                    src="/images/kruzhok.png"
                    alt="tag-icon"
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  {post.tag}
                </span>
              )}
              <div className="font-proto text-sm uppercase text-[#999]">
                {post.date}
              </div>
            </div>

            {/* Разделительная полоса */}
            <div className="h-px w-full bg-[#333]" />

            {/* Кнопка [BACK] */}
            <div className="pt-2 text-center">
              <button
                onClick={onClose}
                className="font-proto text-sm uppercase text-[#999] hover:text-white transition"
              >
                [BACK]
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
