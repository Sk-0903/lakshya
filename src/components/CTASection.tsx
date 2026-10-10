import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Magnet } from './Magnet';
import { EVENT_DATA } from '../data/event';
import { Converge, ConvergeText, useConvergeConfig } from './motion';

export const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { prefersReducedMotion } = useConvergeConfig();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });

  // Target iris reveal: clip-path circle(0% at 50% 50%) -> circle(85% at 50% 50%)
  const clipCircle = useTransform(
    scrollYProgress,
    [0.1, 0.9],
    [
      prefersReducedMotion ? 'circle(100% at 50% 50%)' : 'circle(0% at 50% 50%)',
      'circle(85% at 50% 50%)',
    ]
  );

  return (
    <section
      ref={sectionRef}
      id="register"
      aria-labelledby="cta-heading"
      className="bg-[#0C0C0C] text-[#D7E2EA] min-h-[85vh] flex flex-col justify-center items-center py-36 sm:py-48 md:py-60 border-t border-[#D7E2EA]/12 relative select-none overflow-hidden"
    >
      {/* Background Soft Ambient Purple Glow (Smooth, no harsh lines) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[500px] h-[350px] sm:w-[700px] sm:h-[450px] bg-gradient-to-b from-[#B600A8]/10 via-[#7621B0]/5 to-transparent blur-3xl -translate-y-8" />
      </div>

      {/* Iris Reveal Wrapper */}
      <motion.div
        style={{ clipPath: clipCircle }}
        className="w-full h-full flex flex-col items-center justify-center will-change-[clip-path]"
      >
        <div
          className="w-full px-5 sm:px-8 text-center relative z-10 flex flex-col items-center justify-center"
          style={{ maxWidth: '860px', margin: '0 auto' }}
        >
          {/* Section Label */}
          <Converge from="top" distance={24} threshold={[0.1, 0.5]} className="w-full flex justify-center">
            <span className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.28em] text-[#D7E2EA]/60 block mb-5 sm:mb-6 text-center">
              06 &mdash; REGISTRATION
            </span>
          </Converge>

          {/* Main High-Impact Heading */}
          <div className="w-full flex justify-center mb-6 sm:mb-8">
            <h2
              id="cta-heading"
              className="hero-heading font-heading font-black uppercase text-[clamp(2.5rem,6.5vw,5.5rem)] tracking-tight leading-[1.02] text-center w-full mx-auto text-balance"
            >
              <ConvergeText text="READY TO AIM HIGHER?" mode="words" stagger={0.06} />
            </h2>
          </div>

          {/* Short, Confident Subtitle */}
          <Converge from="bottom" distance={28} delay={0.05} threshold={[0.2, 0.6]} className="w-full flex justify-center">
            <p className="text-base sm:text-lg md:text-xl font-light text-[#D7E2EA]/75 max-w-[46ch] text-center mx-auto leading-relaxed mb-10 sm:mb-12 text-pretty">
              24 hours of non-stop building, ₹45,000 in prizes, and 500+ hackers at {EVENT_DATA.collegeName}.
            </p>
          </Converge>

          {/* Elegant Unified Metadata Badge */}
          <Converge from="bottom" distance={32} delay={0.1} threshold={[0.25, 0.65]} className="w-full flex justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 px-6 py-2.5 rounded-full border border-[#D7E2EA]/15 bg-white/[0.02] text-xs sm:text-sm font-mono tracking-wider text-[#D7E2EA]/80 mb-12 sm:mb-14">
              <span className="text-white font-medium">05&ndash;06 NOV 2026</span>
              <span className="text-[#D7E2EA]/30">&bull;</span>
              <span>SJBIT BANGALORE</span>
              <span className="text-[#D7E2EA]/30">&bull;</span>
              <span className="text-cyan-300 font-medium">FREE ENTRY</span>
            </div>
          </Converge>

          {/* Primary Action Button */}
          <Converge from="bottom" distance={36} delay={0.15} threshold={[0.3, 0.7]} className="w-full flex justify-center">
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
          </Converge>
        </div>
      </motion.div>
    </section>
  );
};
