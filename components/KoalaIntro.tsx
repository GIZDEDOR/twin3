"use client";

import { useState } from "react";

export default function KoalaIntro() {
    const [isVisible, setIsVisible] = useState(true);
    const [isFading, setIsFading] = useState(false);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-700 ${
                isFading ? "opacity-0" : "opacity-100"
            }`}
        >
            <video
                src="/koala.mp4"
                autoPlay
                muted
                playsInline
                onEnded={() => {
                    setIsFading(true);
                    setTimeout(() => {
                        setIsVisible(false);
                    }, 700);
                }}
                className="w-full h-full object-cover"
            />
        </div>
    );
}