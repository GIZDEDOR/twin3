"use client";

import { useEffect, useRef, useState } from "react";

export default function KoalaIntro() {
    const [isVisible, setIsVisible] = useState(true);
    const [isFading, setIsFading] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const tryPlayVideo = () => {
            if (videoRef.current) {
                videoRef.current.play().catch(() => {
                    // Safari/iOS заблокировал autoplay, ждем первого взаимодействия
                    console.log("Autoplay заблокирован, ждем взаимодействия пользователя");
                });
            }
        };

        // Пытаемся воспроизвести сразу
        tryPlayVideo();

        // На случай iOS: воспроизвести при первом взаимодействии пользователя
        const userGesturePlay = () => {
            tryPlayVideo();
            window.removeEventListener("touchstart", userGesturePlay);
            window.removeEventListener("click", userGesturePlay);
        };

        window.addEventListener("touchstart", userGesturePlay, { passive: true });
        window.addEventListener("click", userGesturePlay, { passive: true });
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