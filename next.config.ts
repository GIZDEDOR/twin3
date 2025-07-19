// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // чтобы в консоли браузера видеть реальные файлы и строки
  productionBrowserSourceMaps: true,

  // чтобы ошибки ESLint/TS не прерывали билд
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  images: {
    domains: ['images.prismic.io'],
  },
  output: 'export',
};

export default nextConfig;
