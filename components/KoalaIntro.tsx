"use client";

import { useEffect, useRef, useState } from "react";

export default function KoalaIntro() {
    const [isVisible, setIsVisible] = useState(true);
    const [isFading, setIsFading] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Попытка программно воспроизвести видео
        if (videoRef.current) {
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Если браузер заблокировал autoplay, можно ждать клика
                    console.log("Autoplay заблокирован на мобильном");
                });
            }
        }
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-700 ${
                isFading ? "opacity-0" : "opacity-100"
            }`}
        >
            <video
                ref={videoRef}
                src="/koala.mp4"
                autoPlay
                muted
                playsInline
                preload="auto"
                onEnded={() => {
                    setIsFading(true);
                    setTimeout(() => setIsVisible(false), 700);
                }}
                className="w-full h-full object-cover"
            />
        </div>
    );
}