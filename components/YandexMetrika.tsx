'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackMetrikaPage } from '@/lib/yandex-metrika';

export default function YandexMetrika() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  useEffect(() => {
    if (!pathname) return;
    trackMetrikaPage(Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID),
      new URL(pathname + (query ? '?' + query : ''), window.location.origin).href);
  }, [pathname, query]);
  return null;
}
