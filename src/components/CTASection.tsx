import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { Magnet } from './Magnet';
import { EVENT_DATA } from '../data/event';
import { Converge, ConvergeText, useConvergeConfig } from './motion';

export const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { isReducedMotion } = useConvergeConfig();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });

  // Smooth entry opacity and scale
  const opacity = useTransform(scrollYProgress, [0.05, 0.45], [0.2, 1]);
  const scale = useTransform(scrollYProgress, [0.05, 0.45], [0.96, 1]);

  return (
    <section
      ref={sectionRef}
      id="register"
      aria-labelledby="cta-heading"
      className="bg-bg text-[#D7E2EA] flex flex-col justify-center items-center py-20 sm:py-28 md:py-36 border-t border-[#D7E2EA]/12 relative select-none overflow-hidden"
    >
      {/* Background Pure-CSS GPU Soft Ambient Aura */}
      <div 
        className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <div 
          className="w-[300px] h-[300px] sm:w-[650px] sm:h-[450px] rounded-full blur-[80px] sm:blur-[120px] opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(182, 0, 168, 0.35) 0%, rgba(118, 33, 176, 0.2) 45%, rgba(190, 76, 0, 0.1) 70%, transparent 90%)',
            transform: 'translateZ(0)',
          }}
        />
      </div>

      <div className="w-full flex flex-col items-center justify-center relative z-10">
        <div
          className="w-full px-4 sm:px-8 text-center relative z-10 flex flex-col items-center justify-center mx-auto"
          style={{ maxWidth: '860px' }}
        >
          {/* Section Label */}
          <div className="w-full flex justify-center mb-4 sm:mb-5">
            <span className="text-[11px] sm:text-[13px] font-mono uppercase tracking-[0.25em] sm:tracking-[0.28em] text-[#D7E2EA]/60 text-center">
              10 &mdash; REGISTRATION
            </span>
          </div>

          {/* Tagline */}
          <div className="w-full flex justify-center mb-4 sm:mb-5">
            <span className="text-[11px] sm:text-sm font-mono uppercase tracking-[0.22em] sm:tracking-[0.28em] bg-gradient-to-r from-fuchsia-400 via-pink-200 to-amber-300 bg-clip-text text-transparent font-medium drop-shadow-[0_0_12px_rgba(182,0,168,0.35)]">
              {EVENT_DATA.tagline}
            </span>
          </div>

          {/* Main High-Impact Heading: ALWAYS 100% VISIBLE */}
          <div className="w-full flex justify-center items-center text-center mb-6 sm:mb-8 select-none">
            <h2
              id="cta-heading"
              className="hero-heading font-heading font-black uppercase text-[clamp(2.4rem,7vw,5.5rem)] tracking-tight leading-[1.02] text-center w-full mx-auto text-balance drop-shadow-[0_8px_30px_rgba(182,0,168,0.25)]"
            >
              READY TO AIM HIGHER?
            </h2>
          </div>

          {/* Subtitle */}
          <div className="w-full flex justify-center mb-8 sm:mb-10">
            <p className="text-sm sm:text-lg md:text-xl font-light text-[#D7E2EA]/75 max-w-[46ch] text-center mx-auto leading-relaxed text-pretty px-2 sm:px-0">
              24 hours of non-stop building, ₹35,000 in prizes, and 200+ innovators at {EVENT_DATA.collegeName}.
            </p>
          </div>

          {/* Elegant Unified Metadata Badge */}
          <div className="w-full flex justify-center mb-10 sm:mb-12">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4 sm:px-6 py-2.5 rounded-2xl sm:rounded-full border border-[#D7E2EA]/15 bg-white/[0.03] backdrop-blur-sm text-[11px] sm:text-sm font-mono tracking-wider text-[#D7E2EA]/85 mx-auto hover:border-fuchsia-500/35 transition-colors duration-300 shadow-md">
              <span className="text-white font-medium">05&ndash;06 NOV 2026</span>
              <span className="text-[#D7E2EA]/30">&bull;</span>
              <span className="inline-flex items-center gap-1.5">
                <span>SJBIT BANGALORE</span>
                <a
                  href="#venue"
                  onClick={(e) => {
                    e.preventDefault();
                    const lenis = (window as any).__lenis;
                    if (lenis) {
                      lenis.scrollTo('#venue', { offset: -60 });
                    } else {
                      document.getElementById('venue')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center gap-1 text-amber-300 hover:text-white transition-colors underline underline-offset-2 ml-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#BBCCD7] rounded"
                  aria-label="Scroll to venue location and directions"
                >
                  <MapPin className="w-3 h-3 text-amber-300" />
                  <span>Get directions</span>
                </a>
              </span>
              <span className="text-[#D7E2EA]/30">&bull;</span>
              <span className="text-amber-300 font-semibold">ENTRY: ₹1,000 / SQUAD (2 TO 4 MEMBERS)</span>
            </div>
          </div>

          {/* ⚡ Limited Slots Urgency Block */}
          <div className="w-full flex flex-col items-center gap-2 mb-8 sm:mb-10">
            {/* Limited Slots pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/40 bg-amber-400/[0.07] backdrop-blur-sm">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
              </span>
              <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-300">
                Limited Slots Available
              </span>
            </div>

            {/* Deadline + early closure note */}
            <p className="text-xs sm:text-sm font-light text-[#D7E2EA]/60 text-center max-w-[38ch] leading-relaxed">
              Registration closes{' '}
              <span className="font-semibold text-white">22 October 2026.</span>
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> · </span>
              <span className="italic text-[#D7E2EA]/50">
                We may close registrations early if slots are filled.
              </span>
            </p>
          </div>

          {/* Primary Action Button */}
          <div className="w-full flex justify-center">
            <Magnet padding={80} strength={4}>
              <a
                href={EVENT_DATA.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background:
                    'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                }}
                className="group relative inline-flex items-center justify-center gap-3 px-10 sm:px-14 py-4 sm:py-5 rounded-full text-white font-medium text-sm sm:text-base uppercase tracking-widest hover:brightness-110 hover:shadow-2xl hover:shadow-[#B600A8]/40 active:scale-95 transition-all duration-300 shadow-xl shadow-[#B600A8]/25 cursor-pointer min-h-[52px]"
              >
                <span>Register Now</span>
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/90 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>
            </Magnet>
          </div>
        </div>
      </div>
    </section>
  );
};
