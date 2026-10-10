import React, { Children, isValidElement, cloneElement, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useConvergeConfig } from './useConvergeConfig';
import { ConvergeDirection } from './Converge';

export interface ConvergeGroupProps {
  children: React.ReactNode;
  radial?: boolean;
  stagger?: number;
  className?: string;
  onChildLand?: (index: number) => void;
}

export const ConvergeGroup: React.FC<ConvergeGroupProps> = ({
  children,
  radial = false,
  stagger = 0.05,
  className = '',
  onChildLand,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const config = useConvergeConfig();

  const childArray = Children.toArray(children);
  const count = childArray.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.95', 'start 0.45'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.4,
    restDelta: 0.001,
  });

  // Radial direction assignment for 4 corners or n items
  const getRadialDirection = (idx: number, total: number): { x: number; y: number; rotate: number } => {
    const dist = config.defaultDistance;
    const rot = config.defaultRotate;

    if (total === 4) {
      // 4 corners: 0: top-left, 1: top-right, 2: bottom-left, 3: bottom-right
      switch (idx) {
        case 0:
          return { x: -dist * 0.75, y: -dist * 0.75, rotate: -rot };
        case 1:
          return { x: dist * 0.75, y: -dist * 0.75, rotate: rot };
        case 2:
          return { x: -dist * 0.75, y: dist * 0.75, rotate: rot * 0.8 };
        case 3:
          return { x: dist * 0.75, y: dist * 0.75, rotate: -rot * 0.8 };
        default:
          return { x: 0, y: dist, rotate: 0 };
      }
    }

    // General circular distribution
    const angle = (idx / total) * 2 * Math.PI - Math.PI / 2;
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      rotate: (idx % 2 === 0 ? 1 : -1) * rot,
    };
  };

  if (config.isReducedMotion) {
    return (
      <div ref={containerRef} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className}>
      {childArray.map((child, idx) => {
        const { x: initX, y: initY, rotate: initRotate } = radial
          ? getRadialDirection(idx, count)
          : { x: (idx % 2 === 0 ? -1 : 1) * config.defaultDistance, y: 0, rotate: 0 };

        const startThreshold = Math.min(0.3, idx * stagger);
        const endThreshold = Math.min(1, 0.7 + idx * stagger);

        return (
          <GroupChildWrapper
            key={idx}
            progress={smoothProgress}
            initX={initX}
            initY={initY}
            initRotate={initRotate}
            startThreshold={startThreshold}
            endThreshold={endThreshold}
            allowBlur={config.allowBlur}
            onLand={onChildLand ? () => onChildLand(idx) : undefined}
          >
            {child}
          </GroupChildWrapper>
        );
      })}
    </div>
  );
};

interface GroupChildWrapperProps {
  children: React.ReactNode;
  progress: any;
  initX: number;
  initY: number;
  initRotate: number;
  startThreshold: number;
  endThreshold: number;
  allowBlur: boolean;
  onLand?: () => void;
}

const GroupChildWrapper: React.FC<GroupChildWrapperProps> = ({
  children,
  progress,
  initX,
  initY,
  initRotate,
  startThreshold,
  endThreshold,
  allowBlur,
  onLand,
}) => {
  const x = useTransform(progress, [startThreshold, endThreshold], [initX, 0]);
  const y = useTransform(progress, [startThreshold, endThreshold], [initY, 0]);
  const rotate = useTransform(progress, [startThreshold, endThreshold], [initRotate, 0]);
  const scale = useTransform(progress, [startThreshold, endThreshold], [0.85, 1]);
  const opacity = useTransform(progress, [startThreshold, endThreshold * 0.9], [0, 1]);
  const filter = useTransform(
    progress,
    [startThreshold, endThreshold],
    allowBlur ? ['blur(6px)', 'blur(0px)'] : ['none', 'none']
  );

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        filter,
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};
