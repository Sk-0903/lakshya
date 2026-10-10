import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useConvergeConfig } from './useConvergeConfig';

export interface ConvergeTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
  className?: string;
  mode?: 'words' | 'letters';
  id?: string;
}

export const ConvergeText: React.FC<ConvergeTextProps> = ({
  text,
  as: Component = 'h2',
  className = '',
  mode = 'words',
  id,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const config = useConvergeConfig();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.95', 'start 0.55'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.4,
    restDelta: 0.001,
  });

  const tokens = mode === 'words' ? text.split(' ') : text.split('');

  if (config.isReducedMotion) {
    return (
      <Component id={id} className={className} aria-label={text}>
        {text}
      </Component>
    );
  }

  return (
    <div ref={containerRef} className="inline-block relative w-full text-center">
      <Component id={id} className={className} aria-label={text}>
        <span className="inline-flex flex-wrap items-baseline justify-center gap-x-[0.25em] w-full text-center" aria-hidden="true">
          {tokens.map((token, idx) => {
            // Deterministic scattered offsets per token
            const seed = (idx * 37) % 100;
            const signX = idx % 2 === 0 ? -1 : 1;
            const signY = idx % 3 === 0 ? 1 : -1;
            const initX = signX * (15 + (seed % 35));
            const initY = signY * (12 + ((seed * 7) % 25));
            const initRotate = (seed % 7) - 3;

            return (
              <ConvergeToken
                key={`${token}-${idx}`}
                token={token}
                index={idx}
                total={tokens.length}
                progress={smoothProgress}
                initX={initX}
                initY={initY}
                initRotate={initRotate}
                allowBlur={config.allowBlur}
              />
            );
          })}
        </span>
      </Component>
    </div>
  );
};

interface ConvergeTokenProps {
  token: string;
  index: number;
  total: number;
  progress: any;
  initX: number;
  initY: number;
  initRotate: number;
  allowBlur: boolean;
}

const ConvergeToken: React.FC<ConvergeTokenProps> = ({
  token,
  index,
  total,
  progress,
  initX,
  initY,
  initRotate,
  allowBlur,
}) => {
  const start = Math.min(0.35, index * (0.35 / Math.max(1, total)));
  const end = Math.min(1, 0.75 + index * (0.25 / Math.max(1, total)));

  const x = useTransform(progress, [start, end], [initX, 0]);
  const y = useTransform(progress, [start, end], [initY, 0]);
  const rotate = useTransform(progress, [start, end], [initRotate, 0]);
  const scale = useTransform(progress, [start, end], [1.35, 1]);
  const opacity = useTransform(progress, [start, end * 0.9], [0, 1]);
  const filter = useTransform(
    progress,
    [start, end],
    allowBlur ? ['blur(6px)', 'blur(0px)'] : ['none', 'none']
  );

  return (
    <motion.span
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        filter,
        display: 'inline-block',
      }}
    >
      {token}
    </motion.span>
  );
};
