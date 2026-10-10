import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useConvergeConfig } from './useConvergeConfig';

export type ConvergeDirection =
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface ConvergeProps {
  children: React.ReactNode;
  from?: ConvergeDirection;
  distance?: number;
  rotate?: number;
  scaleFrom?: number;
  blur?: number;
  offset?: [string, string];
  className?: string;
  style?: React.CSSProperties;
}

export const Converge: React.FC<ConvergeProps> = ({
  children,
  from = 'bottom',
  distance,
  rotate,
  scaleFrom = 0.85,
  blur = 6,
  offset = ['start 0.95', 'start 0.45'],
  className = '',
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const config = useConvergeConfig();

  const effectiveDistance = distance ?? config.defaultDistance;
  const effectiveRotate = rotate ?? (from.includes('left') ? -config.defaultRotate : config.defaultRotate);

  // Compute directional offsets
  let initX = 0;
  let initY = 0;
  if (from === 'left') initX = -effectiveDistance;
  else if (from === 'right') initX = effectiveDistance;
  else if (from === 'top') initY = -effectiveDistance;
  else if (from === 'bottom') initY = effectiveDistance;
  else if (from === 'top-left') {
    initX = -effectiveDistance * 0.7;
    initY = -effectiveDistance * 0.7;
  } else if (from === 'top-right') {
    initX = effectiveDistance * 0.7;
    initY = -effectiveDistance * 0.7;
  } else if (from === 'bottom-left') {
    initX = -effectiveDistance * 0.7;
    initY = effectiveDistance * 0.7;
  } else if (from === 'bottom-right') {
    initX = effectiveDistance * 0.7;
    initY = effectiveDistance * 0.7;
  }

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset as any,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.4,
    restDelta: 0.001,
  });

  const x = useTransform(smoothProgress, [0, 1], [initX, 0]);
  const y = useTransform(smoothProgress, [0, 1], [initY, 0]);
  const rotation = useTransform(smoothProgress, [0, 1], [effectiveRotate, 0]);
  const scale = useTransform(smoothProgress, [0, 1], [scaleFrom, 1]);
  const opacity = useTransform(smoothProgress, [0, 0.8, 1], [0, 0.9, 1]);
  const filterBlur = useTransform(
    smoothProgress,
    [0, 1],
    config.allowBlur && blur > 0 ? [`blur(${blur}px)`, 'blur(0px)'] : ['none', 'none']
  );

  if (config.isReducedMotion) {
    return (
      <div ref={containerRef} className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className} style={style}>
      <motion.div
        style={{
          x,
          y,
          rotate: rotation,
          scale,
          opacity,
          filter: filterBlur,
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
