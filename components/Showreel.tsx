'use client';

export default function Showreel({ src }: { src: string }) {
  return (
    <div className="relative w-full h-screen overflow-hidden z-0">
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-contain"
      />
    </div>
  );
}
