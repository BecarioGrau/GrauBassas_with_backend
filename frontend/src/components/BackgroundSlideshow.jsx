import React, { useEffect, useRef } from 'react';

export default function BackgroundSlideshow({ images = [], interval = 5000, layerClass = 'absolute inset-0 bg-cover bg-center opacity-80 transition-opacity duration-1000' }) {
  const bg1Ref = useRef(null);
  const bg2Ref = useRef(null);

  useEffect(() => {
    const bg1 = bg1Ref.current;
    const bg2 = bg2Ref.current;
    if (!bg1 || !bg2 || images.length === 0) return;

    let currentIndex = 0;
    let isFirstLayer = true;

    bg1.style.backgroundImage = `url(${images[0]})`;
    bg1.style.opacity = '0.8';
    bg2.style.opacity = '0';

    const id = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;

      if (isFirstLayer) {
        bg2.style.backgroundImage = `url(${images[currentIndex]})`;
        bg2.style.opacity = '0.8';
        bg1.style.opacity = '0';
      } else {
        bg1.style.backgroundImage = `url(${images[currentIndex]})`;
        bg1.style.opacity = '0.8';
        bg2.style.opacity = '0';
      }

      isFirstLayer = !isFirstLayer;
    }, interval);

    return () => clearInterval(id);
  }, [images, interval]);

  return (
    <>
      <div ref={bg1Ref} className={layerClass} />
      <div ref={bg2Ref} className={layerClass} />
    </>
  );
}
