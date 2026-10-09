import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const SpotlightGrid: React.FC = () => {
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const springConfig = { damping: 30, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsPointerDevice(!isTouch);

    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* 1. Global Faint Dot/Grid Pattern (#D7E2EA at 6% opacity) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06] text-[#D7E2EA]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="globalGrid" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="16" cy="16" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#globalGrid)" />
      </svg>

      {/* 2. Cursor Spotlight (500px radial gradient accent purple at 12% opacity) */}
      {isPointerDevice && (
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(182,0,168,0.12)_0%,rgba(118,33,176,0.06)_40%,transparent_70%)] blur-2xl pointer-events-none"
        />
      )}
    </div>
  );
};
