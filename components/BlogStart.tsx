'use client';

import Image from 'next/image';
import type { FC } from 'react';
import { blogPosts } from '@/lib/blogData';

interface BlogStartProps {
  className?: string;
}

const BlogStart: FC<BlogStartProps> = ({ className = '' }) => {
  const post = blogPosts[0];
  const { title, description = post.full, image, mobileImage, tag } = post;

  return (
    <section className={`relative w-full pb-28 ${className}`}>
      {/* ─── Фон ─── */}
      <div className="relative w-full aspect-[3/4] sm:aspect-[16/9]">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="hidden sm:block object-cover object-top"
        />
        <Image
          src={mobileImage ?? image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="block sm:hidden object-cover object-top"
        />
        <div className="hidden sm:block absolute inset-0 bg-black/40 mix-blend-multiply" />
      </div>

      {/* ─── Карточка ─── */}
      <div className="relative z-10 -mt-[30vw] sm:-mt-[300px] w-full max-w-[1250px] mx-auto px-4 sm:px-8">
        <article className="
          relative z-10
          bg-transparent
          sm:bg-black/60 sm:rounded-[30px] sm:border sm:border-white/15 sm:backdrop-blur-xl
          p-6 sm:p-10
        ">
          <h1 className="
            mb-6 text-4xl sm:text-5xl font-druk font-extrabold
            leading-tight tracking-wide text-white whitespace-pre-line
          ">
            {title}
          </h1>

          <p className="mb-8 whitespace-pre-line text-base sm:text-2xl font-standard text-white opacity-45 leading-tight">
            {description}
          </p>

          {tag && (
            <span className="
              inline-flex items-center gap-4
              rounded-[15px] border border-white/20
              bg-[#141414]/80 px-6 py-3
              font-franklin text-base font-medium text-white
              backdrop-blur-lg
            ">
              <Image
                src="/images/kruzhok.png"
                alt="tag-icon"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              {tag}
            </span>
          )}
        </article>

        {/* ─── Тёмный хвост под карточкой (мобилка) ─── */}
        <div className="block sm:hidden pointer-events-none absolute inset-x-0 top-full h-[0vh] bg-[#141414] z-0" />
      </div>
    </section>
  );
};

export default BlogStart;
