import type { Config } from "tailwindcss";
import lineClamp from '@tailwindcss/line-clamp';

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        shadow2: "0px -20px 50px rgba(0, 0, 0, 0.75)",
      },
      colors: {
        dark: "#141414",
      },
      height: {
        screen: "100dvh",
      },
      fontFamily: {
        franklin: ["FranklinGothicCondensed", "sans-serif"],
        druk: ["Druk", "sans-serif"],
        fradman: ["FRADMCN", "sans-serif"],
        fradmanBold: ["FranklinGothicBook", "sans-serif"],
        proto: ["ProtoMono", "monospace"],
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        spinZ: {
          '0%':   { transform: 'rotateZ(0deg)' },
          '100%': { transform: 'rotateZ(360deg)' },
        },
        spinY: {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        shimmer: {
          "0%": { "background-position": "0% 50%" },
          "100%": { "background-position": "200% 50%" },
        },
        gradient: {
          "0%,100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        blink: {
          "0%,50%,100%": { opacity: "1" },
          "25%,75%": { opacity: "0" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        'spin-z-slow': 'spinZ 5s linear infinite',
        "spin-y": "spinY 1s linear infinite",
        marquee: "marquee 600s linear infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        gradient: "gradient 0.5s linear infinite",
        blink: "blink 3s step-start infinite",
        spinSlow: "spinSlow 10s linear infinite",
      },
    },
  },
  plugins: [
    lineClamp
  ],
};

export default config;
