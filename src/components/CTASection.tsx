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
      className="bg-bg text-[#D7E2EA] min-h-[85vh] flex flex-col justify-center items-center py-36 sm:py-48 md:py-60 border-t border-[#D7E2EA]/12 relative select-none overflow-hidden"
    >
      {/* Background Pure-CSS GPU Soft Ambient Aura (Zero JS loop, zero lag) */}
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

      {/* Smooth Reveal Container */}
      <motion.div
        style={{ opacity, scale: isReducedMotion ? 1 : scale }}
        className="w-full flex flex-col items-center justify-center relative z-10"
      >
        <div
          className="w-full px-4 sm:px-8 text-center relative z-10 flex flex-col items-center justify-center mx-auto"
          style={{ maxWidth: '860px' }}
        >
          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full flex justify-center mb-4 sm:mb-6"
          >
            <span className="text-[11px] sm:text-[13px] font-mono uppercase tracking-[0.25em] sm:tracking-[0.28em] text-[#D7E2EA]/60 text-center">
              10 &mdash; REGISTRATION
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="w-full flex justify-center mb-4 sm:mb-5"
          >
            <span className="text-[11px] sm:text-sm font-mono uppercase tracking-[0.22em] sm:tracking-[0.28em] bg-gradient-to-r from-fuchsia-400 via-pink-200 to-amber-300 bg-clip-text text-transparent font-medium drop-shadow-[0_0_12px_rgba(182,0,168,0.35)]">
              {EVENT_DATA.tagline}
            </span>
          </motion.div>

          {/* Unique Cinematic Masked Headline Reveal: Zero lag, silky 60fps GPU transform */}
          <div className="w-full flex flex-col items-center justify-center text-center mb-6 sm:mb-8 select-none">
            {/* Line 1: READY TO */}
            <div className="overflow-hidden py-1 w-full flex justify-center">
              <motion.h2
                id="cta-heading"
                initial={{ y: isReducedMotion ? 0 : '110%', opacity: isReducedMotion ? 1 : 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{
                  duration: 0.85,
                  delay: 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="hero-heading font-heading font-black uppercase text-[clamp(2.3rem,7.5vw,5.5rem)] tracking-tight leading-[0.98] text-center will-change-transform"
              >
                READY TO
              </motion.h2>
            </div>

            {/* Line 2: AIM HIGHER? with dramatic glow accent */}
            <div className="overflow-hidden py-1 w-full flex justify-center">
              <motion.span
                initial={{ y: isReducedMotion ? 0 : '110%', opacity: isReducedMotion ? 1 : 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{
                  duration: 0.9,
                  delay: 0.22,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="hero-heading font-heading font-black uppercase text-[clamp(2.3rem,7.5vw,5.5rem)] tracking-tight leading-[0.98] text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E6EDF2] to-fuchsia-200 will-change-transform drop-shadow-[0_8px_30px_rgba(182,0,168,0.3)] block"
              >
                AIM HIGHER?
              </motion.span>
            </div>
          </div>

          {/* Subtitle with smooth fade up */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="w-full flex justify-center mb-8 sm:mb-12"
          >
            <p className="text-sm sm:text-lg md:text-xl font-light text-[#D7E2EA]/75 max-w-[46ch] text-center mx-auto leading-relaxed text-pretty px-2 sm:px-0">
              24 hours of non-stop building, ₹35,000 in prizes, and 200+ hackers at {EVENT_DATA.collegeName}.
            </p>
          </motion.div>

          {/* Elegant Unified Metadata Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="w-full flex justify-center mb-10 sm:mb-14"
          >
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
          </motion.div>

          {/* Primary Action Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="w-full flex justify-center"
          >
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
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
