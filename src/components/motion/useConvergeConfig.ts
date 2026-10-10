import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

export interface ConvergeConfig {
  isReducedMotion: boolean;
  isMobile: boolean;
  isTouch: boolean;
  allowBlur: boolean;
  defaultDistance: number;
  defaultRotate: number;
}

export function useConvergeConfig(): ConvergeConfig {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const check = () => {
      const mobile = window.innerWidth < 768;
      const touch = window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(mobile);
      setIsTouch(touch);
    };

    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  return {
    isReducedMotion: shouldReduceMotion,
    isMobile,
    isTouch,
    allowBlur: !shouldReduceMotion && !isTouch && !isMobile,
    defaultDistance: isMobile ? 48 : 120,
    defaultRotate: isMobile ? 2 : 6,
  };
}
