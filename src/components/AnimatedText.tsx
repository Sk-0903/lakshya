import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const CharSpan: React.FC<{
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}> = ({ char, index, total, progress }) => {
  // Map index to a normalized window within [0, 1]
  const start = index / total;
  const end = Math.min(1, (index + 1) / total);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <motion.span style={{ opacity }} className="inline">
      {char}
    </motion.span>
  );
};

export const AnimatedText: React.FC<{
  text: string;
  className?: string;
}> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = Array.from(text);

  return (
    <p
      ref={containerRef}
      className={`font-light leading-relaxed text-[#D7E2EA] select-none text-center ${className}`}
    >
      {chars.map((char, index) => (
        <CharSpan
          key={index}
          char={char}
          index={index}
          total={chars.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
};
