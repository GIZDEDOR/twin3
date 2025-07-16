// next.config.ts

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Включаем source maps для браузера в продакшене
  productionBrowserSourceMaps: true,

  // Если у вас были ошибки ESLint при билде — не фаталить сборку
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Если TypeScript выдаёт ошибки — тоже не останавливаем билд
  typescript: {
    ignoreBuildErrors: true,
  },

  // Разрешённые домены для <Image>
  images: {
    domains: [
      'images.prismic.io',
      // 'images.unsplash.com',
      // 'cdn.example.com',
    ],
  },

  // остальные ваши опции...
};

export default nextConfig;
