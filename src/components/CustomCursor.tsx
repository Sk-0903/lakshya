import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse coords
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for cursor lag
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mediaQuery.matches);

    const checkPointer = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };
    mediaQuery.addEventListener('change', checkPointer);

    if (!mediaQuery.matches) return;

    // Hide native cursor when custom cursor is active
    document.documentElement.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable element (a, button, role=button, input, select)
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest('a, button, input, select, textarea, [role="button"], .clickable');
        setIsHoveringClickable(isClickable);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      mediaQuery.removeEventListener('change', checkPointer);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isFinePointer || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden">
      {/* 1. Center Dot (hides over links/buttons) */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isHoveringClickable ? 0 : 1,
          scale: isHoveringClickable ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="fixed w-1.5 h-1.5 rounded-full bg-white mix-blend-difference pointer-events-none"
      />

      {/* 2. Reticle Ring with 4 tick marks */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHoveringClickable ? 64 : 36,
          height: isHoveringClickable ? 64 : 36,
          rotate: isHoveringClickable ? 45 : 0,
          borderColor: isHoveringClickable ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="fixed rounded-full border border-white/60 mix-blend-difference pointer-events-none flex items-center justify-center"
      >
        {/* 4 Reticle Tick Marks */}
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-[1px] h-1.5 bg-white mix-blend-difference" />
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[1px] h-1.5 bg-white mix-blend-difference" />
        <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-[1px] bg-white mix-blend-difference" />
        <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-[1px] bg-white mix-blend-difference" />
      </motion.div>
    </div>
  );
};
