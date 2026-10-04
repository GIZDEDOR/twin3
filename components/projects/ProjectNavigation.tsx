'use client';

import { createContext, useContext, useRef, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NavigationContext = createContext<{ openedFromCatalogue: { current: boolean } } | null>(null);

export function ProjectNavigation({ children }: { children: ReactNode }) {
  const openedFromCatalogue = useRef(false);
  return <NavigationContext.Provider value={{ openedFromCatalogue }}>{children}</NavigationContext.Provider>;
}

export function ProjectLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const pathname = usePathname();
  const navigation = useContext(NavigationContext);
  return (
    <Link
      href={href}
      scroll={false}
      prefetch={false}
      replace={pathname.startsWith('/projects/')}
      onNavigate={() => {
        if (navigation && pathname === '/projects') navigation.openedFromCatalogue.current = true;
      }}
      className={className}
    >{children}</Link>
  );
}

export function useCloseProject() {
  const router = useRouter();
  const navigation = useContext(NavigationContext);
  return () => {
    if (navigation?.openedFromCatalogue.current) router.back();
    else router.replace('/projects', { scroll: false });
  };
}
