"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    setTimeout(() => {
      animate(
        "span",
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
        },
        {
          duration: duration,
          delay: stagger(0.015),
        }
      );
    }, 100);
  }, [scope.current]);

  const renderLetters = () => {
  const lines = words.split("\n").map((line) => line.split(" "));

  return (
    <motion.div
      ref={scope}
      className="flex flex-col gap-y-[2px] leading-snug tracking-wide text-right items-end"
    >
      {lines.map((line, lineIdx) => (
        <div key={lineIdx} className="flex flex-wrap justify-end">
          {line.map((word, wordIdx) => (
            <span key={`${lineIdx}-${wordIdx}`} className="inline-flex">
              {word.split("").map((char, charIdx) => (
                <motion.span
                  key={`${lineIdx}-${wordIdx}-${charIdx}`}
                  className="opacity-0"
                  style={{
                    filter: "blur(6px)",
                    transform: "translateY(10px)",
                    display: "inline-block",
                    whiteSpace: "pre",
                    backgroundImage: "linear-gradient(90deg, #F0F0F0, #757575)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {char}
                </motion.span>
              ))}
              <span className="inline-block w-[0.3ch]" /> {/* пробел */}
            </span>
          ))}
        </div>
      ))}
    </motion.div>
  );
};

  return (
    <div className={cn("font-standard", className)}>
      {renderLetters()}
    </div>
  );
};
