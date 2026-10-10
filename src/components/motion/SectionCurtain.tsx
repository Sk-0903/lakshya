import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useConvergeConfig } from './useConvergeConfig';

export interface SectionCurtainProps {
  children: React.ReactNode;
  overlap?: number; // default 48px
  className?: string;
  id?: string;
  roundedClass?: string;
}

export const SectionCurtain: React.FC<SectionCurtainProps> = ({
  children,
  overlap = 48,
  className = '',
  id,
  roundedClass = 'rounded-t-[36px] sm:rounded-t-[48px]',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const config = useConvergeConfig();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const shadowOpacity = useTransform(scrollYProgress, [0.4, 0.9], [0, 0.4]);

  return (
    <div
      ref={containerRef}
      id={id}
      style={{
        marginTop: config.isReducedMotion ? 0 : `-${overlap}px`,
      }}
      className={`relative z-10 ${roundedClass} ${className}`}
    >
      {/* Dynamic top shadow as curtain slides over previous section */}
      <motion.div
        style={{ opacity: shadowOpacity }}
        className={`absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none ${roundedClass}`}
      />
      {children}
    </div>
  );
};
