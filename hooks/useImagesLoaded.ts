import { useState, useEffect } from 'react';

export function useImagesLoaded(selectors: string) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const images = Array.from(document.querySelectorAll<HTMLImageElement>(selectors));
    if (images.length === 0) {
      setLoaded(true);
      return;
    }

    let loadedCount = 0;
    const onLoad = () => {
      loadedCount++;
      if (loadedCount === images.length) setLoaded(true);
    };

    images.forEach((img) => {
      if (img.complete) {
        onLoad();
      } else {
        img.addEventListener('load', onLoad);
        img.addEventListener('error', onLoad);
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener('load', onLoad);
        img.removeEventListener('error', onLoad);
      });
    };
  }, [selectors]);

  return loaded;
}
