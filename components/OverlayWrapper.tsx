// components/OverlayWrapper.tsx
'use client';

import { useEffect, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface OverlayWrapperProps {
  children: ReactNode;
}

export default function OverlayWrapper({ children }: OverlayWrapperProps) {
  const [mounted, setMounted] = useState(false);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    let root = document.getElementById('overlay-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'overlay-root';
      document.body.appendChild(root);
    }
    setPortalRoot(root);
  }, []);

  if (!mounted || !portalRoot) return null;

  return createPortal(children, portalRoot);
}
