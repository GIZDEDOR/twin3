'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import styles from './project.module.css';

export default function ProjectCatalogue({ children }: { children: ReactNode }) {
  const caseIsOpen = usePathname().startsWith('/projects/');
  return <div className={caseIsOpen ? styles.catalogueBehind : undefined} inert={caseIsOpen} aria-hidden={caseIsOpen || undefined}>{children}</div>;
}
