import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { EVENT_DATA } from '../data/event';

export const TracksSection: React.FC = () => {
  const [nearestIndex, setNearestIndex] = useState<number | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const centerY = window.innerHeight / 2;
      let closestIdx = 0;
      let minDistance = Infinity;

      rowRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const rowCenter = rect.top + rect.height / 2;
        const dist = Math.abs(centerY - rowCenter);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      // If section is roughly in view, activate center focus
      if (minDistance < window.innerHeight * 0.4) {
        setNearestIndex(closestIdx);
      } else {
        setNearestIndex(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="tracks"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[48px] py-36 md:py-48 px-6 md:px-10 relative z-10 select-none overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Label: 02 — Tracks */}
        <FadeIn delay={0} y={16}>
          <span className="text-[0.75rem] uppercase tracking-[0.3em] text-[#0C0C0C]/50 font-mono block mb-4">
            02 &mdash; Tracks
          </span>
        </FadeIn>

        {/* Section Heading: Tracks */}
        <FadeIn delay={0.1} y={20}>
          <h2 className="font-heading font-black uppercase text-[clamp(2.5rem,8vw,7rem)] text-[#0C0C0C] tracking-tight leading-none mb-16 sm:mb-20">
            Tracks
          </h2>
        </FadeIn>

        {/* 5 Vertical Rows with 1px dark hairline between rows */}
        <div className="flex flex-col border-t border-[#0C0C0C]/10">
          {EVENT_DATA.tracks.map((track, idx) => {
            const isCenterFocused = nearestIndex === null || nearestIndex === idx;

            return (
              <FadeIn key={track.number} delay={idx * 0.08} y={20}>
                <div
                  ref={(el) => {
                    rowRefs.current[idx] = el;
                  }}
                  className={`group relative flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-10 py-10 md:py-14 border-b border-[#0C0C0C]/10 transition-opacity duration-300 cursor-pointer ${
                    isCenterFocused ? 'opacity-100' : 'opacity-40 hover:opacity-100'
                  }`}
                >
                  {/* Left: Number with 12px hover shift */}
                  <div className="font-heading font-black text-[clamp(2.5rem,8vw,7rem)] text-[#0C0C0C] leading-none shrink-0 tracking-tight transition-transform duration-300 group-hover:translate-x-3 w-32 md:w-44">
                    {track.number}
                  </div>

                  {/* Center/Right: Name + Description */}
                  <div className="flex-1 max-w-xl">
                    <h3 className="font-heading font-medium uppercase text-[clamp(1.1rem,2.2vw,2rem)] text-[#0C0C0C] tracking-tight leading-snug mb-2">
                      {track.name}
                    </h3>
                    <p className="font-light text-[clamp(0.95rem,1.1vw,1.1rem)] text-[#0C0C0C]/60 leading-relaxed">
                      {track.description}
                    </p>
                  </div>

                  {/* Far Right: ArrowUpRight fades in on hover */}
                  <div className="hidden md:flex items-center justify-end w-12 shrink-0">
                    <ArrowUpRight className="w-8 h-8 text-[#0C0C0C] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
