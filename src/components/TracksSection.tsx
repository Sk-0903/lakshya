import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Cpu, Code2, Layers, Radio, Sparkles, ArrowRight } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { ScrambleText } from './ScrambleText';
import { EVENT_DATA, TrackData } from '../data/event';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Cpu,
  Code2,
  Layers,
  Radio,
  Sparkles,
};

export const TracksSection: React.FC = () => {
  const [activeTrackIndex, setActiveTrackIndex] = useState<number | null>(null);
  const [hoveredTrack, setHoveredTrack] = useState<TrackData | null>(null);

  // Mouse coordinates for cursor-following preview chip
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 300 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 300 });

  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Focus effect: row nearest viewport center has full opacity, others dim to 0.35
  useEffect(() => {
    const handleScroll = () => {
      const centerY = window.innerHeight / 2;
      let closestIdx = 0;
      let minDistance = Infinity;

      rowRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const dist = Math.abs(centerY - elCenter);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      // Only trigger if within reasonable range of viewport
      if (minDistance < window.innerHeight * 0.45) {
        setActiveTrackIndex(closestIdx);
      } else {
        setActiveTrackIndex(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section
      id="tracks"
      onMouseMove={handleMouseMove}
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 w-full z-0 select-none relative overflow-hidden"
    >
      {/* Cursor-Following Preview Chip (Desktop only) */}
      {hoveredTrack && (
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '20px',
            translateY: '20px',
          }}
          className="fixed pointer-events-none z-50 hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0C0C0C] text-white text-xs font-mono shadow-2xl border border-white/20"
        >
          {(() => {
            const IconComponent = ICON_MAP[hoveredTrack.icon] || Sparkles;
            return <IconComponent className="w-3.5 h-3.5 text-cyan-400" />;
          })()}
          <span>{hoveredTrack.shortName}</span>
          <ArrowRight className="w-3 h-3 text-[#B600A8]" />
        </motion.div>
      )}

      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2 className="text-[#0C0C0C] font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none tracking-tight mb-16 sm:mb-20 md:mb-28">
            Tracks
          </h2>
        </FadeIn>

        {/* 5 Track Rows */}
        <div className="flex flex-col">
          {EVENT_DATA.tracks.map((track, index) => {
            const IconComponent = ICON_MAP[track.icon] || Sparkles;
            const isCenterFocused = activeTrackIndex === null || activeTrackIndex === index;

            return (
              <div
                key={track.id}
                ref={(el) => { rowRefs.current[index] = el; }}
                onMouseEnter={() => setHoveredTrack(track)}
                onMouseLeave={() => setHoveredTrack(null)}
                className={`relative group flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12 py-8 sm:py-10 md:py-12 transition-all duration-500 cursor-pointer ${
                  index !== 0 ? 'border-t border-[#0C0C0C]/15' : ''
                } ${isCenterFocused ? 'opacity-100' : 'opacity-35 hover:opacity-100'}`}
              >
                {/* Row background reveal sliding in from left on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#B600A8]/[0.06] via-[#7621B0]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl -mx-4 px-4" />

                {/* Left Number with 12px shift on hover */}
                <div className="font-black text-[clamp(3rem,10vw,140px)] text-[#0C0C0C] leading-none shrink-0 tracking-tight transition-transform duration-300 group-hover:translate-x-3">
                  {track.number}
                </div>

                {/* Center Name + Description Stack */}
                <div className="flex flex-col gap-2 md:gap-3 flex-1 max-w-2xl relative z-10">
                  <div className="inline-block relative">
                    <h3 className="font-medium uppercase text-[clamp(1.1rem,2.2vw,2.1rem)] text-[#0C0C0C] tracking-wide inline-block">
                      <ScrambleText text={track.name} scrambleOnMount={false} />
                    </h3>
                    {/* Gradient Underline Growing on Hover */}
                    <span className="block h-[2.5px] w-full bg-gradient-to-r from-[#B600A8] via-[#7621B0] to-[#BE4C00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </div>

                  <p className="font-light leading-relaxed text-[clamp(0.85rem,1.6vw,1.25rem)] text-[#0C0C0C] opacity-70">
                    {track.description}
                  </p>
                </div>

                {/* Far Right Lucide Icon (Hidden on mobile) */}
                <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-2xl bg-black/5 group-hover:bg-[#0C0C0C] transition-colors duration-300 shrink-0">
                  <IconComponent className="w-8 h-8 text-[#0C0C0C] group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
