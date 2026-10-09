import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [locked, setLocked] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check if prefers reduced motion or already shown in this session
    const hasSeen = sessionStorage.getItem('lakshya_preloader_seen');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeen || prefersReducedMotion) {
      setShouldRender(false);
      onComplete();
      return;
    }

    // 000 to 100 over ~1.6s
    const startTime = performance.now();
    const duration = 1600;

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      const current = Math.floor(progress * 100);
      setCount(current);

      if (progress >= 1) {
        clearInterval(interval);
        setCount(100);
        setLocked(true);

        // Lock on pulse, then trigger curtain reveal after 300ms
        setTimeout(() => {
          setRevealing(true);
          sessionStorage.setItem('lakshya_preloader_seen', 'true');
          // Wait for curtain slide animation to finish (~600ms)
          setTimeout(() => {
            setShouldRender(false);
            onComplete();
          }, 650);
        }, 350);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!shouldRender) return null;

  const paddedCount = count.toString().padStart(3, '0');
  const dashOffset = 283 - (283 * count) / 100;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] pointer-events-none select-none flex flex-col items-center justify-center overflow-hidden">
        {/* Top Half Curtain */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: revealing ? '-100%' : 0 }}
          transition={{ duration: 0.65, ease: [0.77, 0, 0.175, 1] }}
          className="absolute top-0 left-0 w-full h-1/2 bg-[#0C0C0C] border-b border-white/5 pointer-events-auto"
        />

        {/* Bottom Half Curtain */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: revealing ? '100%' : 0 }}
          transition={{ duration: 0.65, ease: [0.77, 0, 0.175, 1] }}
          className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0C0C0C] border-t border-white/5 pointer-events-auto"
        />

        {/* Center Target & Counter Animation */}
        <motion.div
          animate={{
            opacity: revealing ? 0 : 1,
            scale: locked ? [1, 1.15, 1] : 1,
          }}
          transition={{ duration: 0.3 }}
          className="relative z-10 flex flex-col items-center justify-center gap-6"
        >
          {/* SVG Target Drawing Itself */}
          <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer Faint Guide Ring */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#D7E2EA"
                strokeWidth="0.75"
                strokeOpacity="0.15"
                strokeDasharray="3 3"
              />

              {/* Concentric Circle 1 (Outer target ring) */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#preloaderGrad)"
                strokeWidth="1.5"
                strokeDasharray="283"
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                className="transition-all duration-75"
              />

              {/* Concentric Circle 2 (Middle target ring) */}
              <circle
                cx="50"
                cy="50"
                r="30"
                stroke="#38bdf8"
                strokeWidth="1"
                strokeDasharray="188"
                strokeDashoffset={188 - (188 * count) / 100}
                strokeOpacity="0.8"
                strokeLinecap="round"
                className="transition-all duration-75"
              />

              {/* Concentric Circle 3 (Inner bullseye ring) */}
              <circle
                cx="50"
                cy="50"
                r="15"
                stroke="#B600A8"
                strokeWidth="1.5"
                strokeDasharray="94"
                strokeDashoffset={94 - (94 * count) / 100}
                strokeLinecap="round"
                className="transition-all duration-75"
              />

              {/* Bullseye Center Dot */}
              <circle
                cx="50"
                cy="50"
                r="4"
                fill="#BE4C00"
                className={`transition-opacity duration-300 ${count > 50 ? 'opacity-100' : 'opacity-0'}`}
              />

              {/* Crosshair Lines Extending */}
              <line
                x1="50"
                y1={50 - (48 * count) / 100}
                x2="50"
                y2={50 + (48 * count) / 100}
                stroke="#D7E2EA"
                strokeWidth="0.75"
                strokeOpacity="0.3"
              />
              <line
                x1={50 - (48 * count) / 100}
                y1="50"
                x2={50 + (48 * count) / 100}
                y2="50"
                stroke="#D7E2EA"
                strokeWidth="0.75"
                strokeOpacity="0.3"
              />

              <defs>
                <linearGradient id="preloaderGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#B600A8" />
                  <stop offset="50%" stopColor="#7621B0" />
                  <stop offset="100%" stopColor="#BE4C00" />
                </linearGradient>
              </defs>
            </svg>

            {/* Target Reticle Ticks */}
            <div className="absolute inset-0 flex items-center justify-between px-1 pointer-events-none">
              <span className="w-1.5 h-[1px] bg-cyan-400" />
              <span className="w-1.5 h-[1px] bg-cyan-400" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-between py-1 pointer-events-none">
              <span className="w-[1px] h-1.5 bg-cyan-400" />
              <span className="w-[1px] h-1.5 bg-cyan-400" />
            </div>
          </div>

          {/* Huge Kanit Font-Black Counter */}
          <div className="flex flex-col items-center">
            <div className="text-6xl sm:text-7xl md:text-8xl font-black font-sans tracking-tight hero-heading">
              {paddedCount}
            </div>
            <div className="text-xs uppercase tracking-[0.3em] font-mono text-[#BBCCD7]/60 mt-1">
              {locked ? 'TARGET ACQUIRED • LAKSHYA\'26' : 'INITIALIZING TARGET...'}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
