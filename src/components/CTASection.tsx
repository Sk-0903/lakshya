import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { EVENT_DATA } from '../data/event';

export const CTASection: React.FC = () => {
  return (
    <section
      id="register"
      aria-labelledby="cta-heading"
      className="bg-[#0C0C0C] text-[#D7E2EA] py-32 sm:py-40 md:py-48 border-t border-[#D7E2EA]/12 relative select-none overflow-hidden"
    >
      {/* Background Ambient Glow & Subtle Bullseye / Target Motif */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {/* Soft Radial Ambient Spotlight */}
        <div className="w-[600px] h-[350px] sm:w-[800px] sm:h-[450px] bg-gradient-to-b from-[#B600A8]/12 via-[#7621B0]/5 to-transparent blur-3xl -translate-y-6" />

        {/* Faint Concentric Reticle Target Rings (Lakshya Motif) */}
        <svg
          viewBox="0 0 600 600"
          className="w-[500px] sm:w-[700px] md:w-[850px] h-auto absolute opacity-[0.06] text-[#D7E2EA]"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="300" cy="300" r="120" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="300" cy="300" r="200" strokeWidth="1" />
          <circle cx="300" cy="300" r="280" strokeWidth="1" strokeDasharray="8 8" />
          <line x1="300" y1="10" x2="300" y2="590" strokeWidth="0.8" />
          <line x1="10" y1="300" x2="590" y2="300" strokeWidth="0.8" />
        </svg>
      </div>

      <div className="max-w-[1000px] mx-auto px-5 sm:px-8 text-center relative z-10 flex flex-col items-center">
        {/* Section Label */}
        <FadeIn delay={0} y={12}>
          <span className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.28em] text-[#D7E2EA]/60 block mb-4 sm:mb-6">
            06 &mdash; REGISTRATION
          </span>
        </FadeIn>

        {/* Main High-Impact Heading */}
        <FadeIn delay={0.1} y={16}>
          <h2
            id="cta-heading"
            className="hero-heading font-heading font-black uppercase text-[clamp(2.75rem,8vw,6.5rem)] tracking-tight leading-[0.95] text-balance mb-6 sm:mb-8"
          >
            Ready To<br />Aim Higher?
          </h2>
        </FadeIn>

        {/* Short, Confident Subtitle */}
        <FadeIn delay={0.15} y={16}>
          <p className="text-base sm:text-lg md:text-xl font-light text-[#D7E2EA]/75 max-w-[48ch] mx-auto leading-relaxed mb-8 sm:mb-10 text-pretty">
            24 hours of non-stop building, ₹45,000 in prizes, and 500+ hackers at {EVENT_DATA.collegeName}.
          </p>
        </FadeIn>

        {/* Elegant Unified Metadata Badge */}
        <FadeIn delay={0.2} y={16}>
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-6 py-2.5 rounded-full border border-[#D7E2EA]/15 bg-white/[0.02] text-xs sm:text-sm font-mono tracking-wider text-[#D7E2EA]/80 mb-10 sm:mb-14">
            <span className="text-white font-medium">05&ndash;06 NOV 2026</span>
            <span className="text-[#D7E2EA]/30">&bull;</span>
            <span>SJBIT BANGALORE</span>
            <span className="text-[#D7E2EA]/30">&bull;</span>
            <span className="text-cyan-300">FREE ENTRY</span>
          </div>
        </FadeIn>

        {/* Primary Action Button */}
        <FadeIn delay={0.25} y={16}>
          <Magnet padding={120} strength={4}>
            <a
              href={EVENT_DATA.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background:
                  'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
              }}
              className="inline-flex items-center justify-center gap-3 px-10 sm:px-14 py-4 sm:py-5 rounded-full text-white font-medium text-sm sm:text-base uppercase tracking-widest hover:brightness-110 hover:shadow-2xl hover:shadow-[#B600A8]/30 active:scale-95 transition-all duration-300 shadow-lg shadow-[#B600A8]/20 cursor-pointer min-h-[52px]"
            >
              <span>Register Now</span>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
            </a>
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
};
