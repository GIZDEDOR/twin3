'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { RxCross2 } from 'react-icons/rx';
import Link from 'next/link';
import { useCloseProject } from './ProjectNavigation';
import styles from './project.module.css';

export default function ProjectOverlay({ children, slug }: { children: ReactNode; slug: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const close = useCloseProject();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    const paddingRight = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    // `open` renders the content in the initial HTML. Promote to a native modal
    // after hydration for focus trapping, inert background and Escape support.
    dialog.close();
    dialog.showModal();
    dialog.scrollTop = 0;
    dialog.querySelector('button')?.focus({ preventScroll: true });
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [slug]);

  return (
    <dialog
      ref={ref}
      open
      aria-labelledby="project-title"
      className={styles.dialog}
      onCancel={(event) => { event.preventDefault(); close(); }}
      onClick={(event) => { if (event.target === event.currentTarget) close(); }}
    >
      <div className={styles.sheet}>
        <div className={styles.toolbar}>
          <Link href="/projects" prefetch={false} scroll={false} replace className={styles.back} onClick={(event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault(); close();
          }}>Все проекты</Link>
          <button type="button" className={styles.close} onClick={close} aria-label="Закрыть кейс">
            <RxCross2 aria-hidden="true" size={24} />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
