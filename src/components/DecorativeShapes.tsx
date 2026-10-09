import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Rocket } from 'lucide-react';

export const DecorativeShapes: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax offsets at different speeds
  const yTopLeft = useTransform(scrollYProgress, [0, 1], [-30, 40]);
  const yTopRight = useTransform(scrollYProgress, [0, 1], [30, -50]);
  const yBottomLeft = useTransform(scrollYProgress, [0, 1], [-40, 30]);
  const yBottomRight = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10">
      {/* 1. Top-Left: Glass Cube with Code2 Icon */}
      <motion.div
        style={{ y: yTopLeft }}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px] aspect-square"
      >
        <motion.div
          animate={{ y: [-8, 8, -8], rotateZ: [-2, 2, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full relative flex items-center justify-center rounded-3xl bg-gradient-to-tr from-cyan-500/10 via-white/5 to-transparent border border-white/15 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
        >
          {/* Isometric Cube Visuals in SVG */}
          <svg className="w-3/4 h-3/4" viewBox="0 0 100 100" fill="none">
            {/* Top Face */}
            <polygon points="50,15 80,32 50,50 20,32" fill="#38bdf8" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="1.5" />
            {/* Left Face */}
            <polygon points="20,32 50,50 50,85 20,68" fill="#1d4ed8" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="1.5" />
            {/* Right Face */}
            <polygon points="50,50 80,32 80,68 50,85" fill="#B600A8" fillOpacity="0.3" stroke="#B600A8" strokeWidth="1.5" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Code2 className="w-8 h-8 text-cyan-300 drop-shadow-[0_0_8px_#38bdf8]" />
          </div>
        </motion.div>
      </motion.div>

      {/* 2. Top-Right: Ring / Torus with Rocket Icon */}
      <motion.div
        style={{ y: yTopRight }}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px] aspect-square"
      >
        <motion.div
          animate={{ y: [8, -8, 8], rotateZ: [3, -3, 3] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full relative flex items-center justify-center rounded-3xl bg-gradient-to-tr from-[#B600A8]/15 via-white/5 to-transparent border border-white/15 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
        >
          {/* Concentric Glow Torus Rings */}
          <svg className="w-4/5 h-4/5 animate-spin" style={{ animationDuration: '24s' }} viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="38" stroke="#B600A8" strokeWidth="3" strokeDasharray="12 8" />
            <circle cx="50" cy="50" r="28" stroke="#7621B0" strokeWidth="2" strokeDasharray="6 6" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Rocket className="w-8 h-8 text-fuchsia-300 drop-shadow-[0_0_10px_#B600A8]" />
          </div>
        </motion.div>
      </motion.div>

      {/* 3. Bottom-Left: Chip / Circuit SVG with Glowing Traces */}
      <motion.div
        style={{ y: yBottomLeft }}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px] aspect-square"
      >
        <motion.div
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full relative flex items-center justify-center rounded-2xl bg-[#0f1015]/80 border border-white/15 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.6)] p-3"
        >
          <svg className="w-full h-full" viewBox="0 0 80 80" fill="none">
            <rect x="20" y="20" width="40" height="40" rx="8" fill="#14141e" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="40" cy="40" r="10" fill="#B600A8" fillOpacity="0.3" stroke="#B600A8" strokeWidth="1" />
            {/* Circuit Traces */}
            <path d="M40 20 V8 M40 60 V72 M20 40 H8 M60 40 H72" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="40" cy="8" r="2" fill="#38bdf8" />
            <circle cx="40" cy="72" r="2" fill="#38bdf8" />
            <circle cx="8" cy="40" r="2" fill="#38bdf8" />
            <circle cx="72" cy="40" r="2" fill="#38bdf8" />
            <path d="M28 28 L14 14 M52 28 L66 14 M28 52 L14 66 M52 52 L66 66" stroke="#B600A8" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.div>

      {/* 4. Bottom-Right: Trophy SVG with Gradient Fill */}
      <motion.div
        style={{ y: yBottomRight }}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px] aspect-square"
      >
        <motion.div
          animate={{ y: [7, -7, 7], rotateZ: [-2, 2, -2] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full relative flex items-center justify-center rounded-3xl bg-gradient-to-tr from-amber-500/10 via-white/5 to-transparent border border-white/15 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
        >
          <svg className="w-4/5 h-4/5" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="trophyShapeGrad" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="60%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#BE4C00" />
              </linearGradient>
            </defs>
            {/* Trophy Cup */}
            <path
              d="M30 25 H70 V45 C70 56 61 65 50 65 C39 65 30 56 30 45 Z"
              fill="url(#trophyShapeGrad)"
              stroke="#fbbf24"
              strokeWidth="1.5"
            />
            {/* Handles */}
            <path d="M30 30 H20 C16 30 14 36 17 42 L22 50 C26 55 30 53 30 53" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
            <path d="M70 30 H80 C84 30 86 36 83 42 L78 50 C74 55 70 53 70 53" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
            {/* Stem & Base */}
            <rect x="47" y="65" width="6" height="15" fill="#f59e0b" />
            <rect x="32" y="80" width="36" height="8" rx="2" fill="#78350f" stroke="#fbbf24" strokeWidth="1" />
            {/* Star on Cup */}
            <polygon points="50,34 52,39 57,39 53,42 55,47 50,44 45,47 47,42 43,39 48,39" fill="#ffffff" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};
