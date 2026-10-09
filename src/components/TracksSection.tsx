import React, { useState } from 'react';
import { Cpu, Code2, Layers, Radio, Sparkles } from 'lucide-react';
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
  return (
    <section
      id="tracks"
      className="bg-[#0C0C0C] text-[#D7E2EA] px-6 sm:px-10 py-28 sm:py-36 w-full relative select-none border-t border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <FadeIn delay={0} y={20}>
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-widest text-[#BBCCD7] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B600A8]" />
              <span>5 Core Innovation Pillars</span>
            </div>
            <h2 className="hero-heading font-heading font-black uppercase text-5xl sm:text-6xl md:text-7xl tracking-tight leading-none mb-4">
              Challenge Tracks
            </h2>
            <p className="text-sm sm:text-base text-[#D7E2EA]/70 max-w-lg mx-auto">
              Choose your domain, assemble your team, and build a working solution over 24 hours.
            </p>
          </div>
        </FadeIn>

        {/* 5 Spacious Track Rows */}
        <div className="flex flex-col border-t border-white/10">
          {EVENT_DATA.tracks.map((track, index) => {
            const IconComponent = ICON_MAP[track.icon] || Sparkles;

            return (
              <FadeIn key={track.id} delay={index * 0.08} y={15}>
                <div
                  className="relative group flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-10 py-8 sm:py-10 border-b border-white/10 hover:border-white/20 transition-all cursor-pointer"
                >
                  {/* Row Hover Background Accent */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl -mx-4 px-4" />

                  {/* Left Number */}
                  <div className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-white/30 group-hover:text-cyan-400 leading-none shrink-0 tracking-tight transition-colors duration-300 w-24">
                    {track.number}
                  </div>

                  {/* Center Title + Description */}
                  <div className="flex flex-col gap-2 flex-1 max-w-2xl relative z-10">
                    <div className="inline-block relative">
                      <h3 className="font-heading font-bold uppercase text-xl sm:text-2xl text-white group-hover:text-cyan-200 tracking-tight transition-colors">
                        {track.name}
                      </h3>
                      <span className="block h-[2px] w-full bg-gradient-to-r from-[#B600A8] via-[#7621B0] to-[#BE4C00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mt-1" />
                    </div>

                    <p className="font-normal leading-relaxed text-xs sm:text-sm text-[#D7E2EA]/70">
                      {track.description}
                    </p>
                  </div>

                  {/* Right Icon Box */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-cyan-400/40 group-hover:bg-cyan-500/10 transition-all duration-300 shrink-0">
                    <IconComponent className="w-5 h-5 text-white/60 group-hover:text-cyan-300 transition-colors duration-300" />
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
