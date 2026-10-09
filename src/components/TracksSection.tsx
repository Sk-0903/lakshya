import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Cpu, Code2, Layers, Radio, Sparkles, ArrowRight } from 'lucide-react';
import { FadeIn } from './FadeIn';
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

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 300 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 300 });

  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-6 sm:px-10 py-24 sm:py-32 w-full z-0 select-none relative overflow-hidden"
    >
      {/* Cursor-Following Preview Chip */}
      {hoveredTrack && (
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '20px',
            translateY: '20px',
          }}
          className="fixed pointer-events-none z-50 hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-[#0C0C0C] text-white text-xs font-mono shadow-2xl border border-white/20"
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
        {/* Section Heading */}
        <FadeIn delay={0} y={30}>
          <div className="text-center mb-16 sm:mb-24">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#0C0C0C]/50 block mb-3">
              5 Core Innovation Pillars
            </span>
            <h2 className="text-[#0C0C0C] font-heading font-black uppercase text-5xl sm:text-6xl md:text-7xl tracking-tight leading-none">
              Challenge Tracks
            </h2>
          </div>
        </FadeIn>

        {/* 5 Spacious Track Rows */}
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
                className={`relative group flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12 py-10 sm:py-12 md:py-14 transition-all duration-300 cursor-pointer ${
                  index !== 0 ? 'border-t border-[#0C0C0C]/10' : ''
                } ${isCenterFocused ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
              >
                {/* Row Hover Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#B600A8]/[0.04] via-[#7621B0]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl -mx-4 px-4" />

                {/* Left Number */}
                <div className="font-heading font-black text-5xl sm:text-6xl md:text-7xl text-[#0C0C0C]/90 leading-none shrink-0 tracking-tight transition-transform duration-300 group-hover:translate-x-2 w-28">
                  {track.number}
                </div>

                {/* Center Title + Description */}
                <div className="flex flex-col gap-2.5 flex-1 max-w-2xl relative z-10">
                  <div className="inline-block relative">
                    <h3 className="font-heading font-bold uppercase text-xl sm:text-2xl md:text-3xl text-[#0C0C0C] tracking-tight">
                      {track.name}
                    </h3>
                    <span className="block h-[2px] w-full bg-gradient-to-r from-[#B600A8] via-[#7621B0] to-[#BE4C00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mt-1" />
                  </div>

                  <p className="font-normal leading-relaxed text-sm sm:text-base text-[#0C0C0C]/75">
                    {track.description}
                  </p>
                </div>

                {/* Right Icon Box */}
                <div className="hidden md:flex items-center justify-center w-14 h-14 rounded-2xl bg-black/[0.04] group-hover:bg-[#0C0C0C] transition-colors duration-300 shrink-0">
                  <IconComponent className="w-6 h-6 text-[#0C0C0C] group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
