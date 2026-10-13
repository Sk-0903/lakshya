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
      {/* Background Ambient High-Tech Visuals */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {/* Pulsing gradient orb */}
        <motion.div
          animate={
            isReducedMotion
              ? undefined
              : {
                  scale: [1, 1.2, 1],
                  opacity: [0.15, 0.28, 0.15],
                }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-[450px] h-[320px] sm:w-[650px] sm:h-[450px] bg-gradient-to-r from-[#B600A8]/20 via-[#7621B0]/15 to-[#BE4C00]/10 blur-[85px] rounded-full"
        />

        {/* Concentric Aim Reticle / Radar Rings for "Aim Higher" Theme */}
        <motion.div
          animate={
            isReducedMotion
              ? undefined
              : {
                  scale: [0.96, 1.04, 0.96],
                  opacity: [0.12, 0.25, 0.12],
                  rotate: [0, 180, 360],
                }
          }
          transition={{
            scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 60, repeat: Infinity, ease: 'linear' },
          }}
          className="absolute w-[360px] h-[360px] sm:w-[540px] sm:h-[540px] rounded-full border border-dashed border-fuchsia-500/20"
        />

        <motion.div
          animate={
            isReducedMotion
              ? undefined
              : {
                  scale: [1.03, 0.97, 1.03],
                  opacity: [0.08, 0.18, 0.08],
                }
          }
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute w-[520px] h-[520px] sm:w-[740px] sm:h-[740px] rounded-full border border-white/[0.05]"
        />

        {/* HUD Target Framing Brackets */}
        <div className="absolute inset-x-8 sm:inset-x-24 top-28 bottom-28 pointer-events-none hidden md:block opacity-25">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-fuchsia-400" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-fuchsia-400" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-fuchsia-400" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-fuchsia-400" />
        </div>

        {/* Ambient Floating Micro-Glows */}
        {!isReducedMotion &&
          [
            { top: '24%', left: '16%', size: 'w-1.5 h-1.5', delay: 0 },
            { top: '34%', right: '18%', size: 'w-2 h-2', delay: 1.5 },
            { top: '68%', left: '20%', size: 'w-1 h-1', delay: 0.8 },
            { top: '78%', right: '22%', size: 'w-1.5 h-1.5', delay: 2.2 },
          ].map((spark, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-8, 8, -8],
                opacity: [0.2, 0.75, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 4.5 + i,
                repeat: Infinity,
                delay: spark.delay,
                ease: 'easeInOut',
              }}
              style={{
                top: spark.top,
                left: (spark as any).left,
                right: (spark as any).right,
              }}
              className={`absolute ${spark.size} rounded-full bg-fuchsia-400 blur-[0.5px] pointer-events-none hidden sm:block`}
            />
          ))}
      </div>

      {/* Smooth Reveal Container */}
      <motion.div
        style={{ opacity, scale: isReducedMotion ? 1 : scale }}
        className="w-full flex flex-col items-center justify-center"
      >
        <div
          className="w-full px-5 sm:px-8 text-center relative z-10 flex flex-col items-center justify-center mx-auto"
          style={{ maxWidth: '860px' }}
        >
          {/* Section Label with pulsing indicator */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full flex justify-center mb-5 sm:mb-6"
          >
            <span className="inline-flex items-center gap-2.5 text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.28em] text-[#D7E2EA]/60 text-center">
              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-ping inline-block" />
              10 &mdash; REGISTRATION
            </span>
          </motion.div>

          {/* Animated Tagline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="w-full flex justify-center mb-3 sm:mb-4"
          >
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.28em] bg-gradient-to-r from-fuchsia-400 via-pink-200 to-amber-300 bg-clip-text text-transparent font-medium drop-shadow-[0_0_12px_rgba(182,0,168,0.35)]">
              {EVENT_DATA.tagline}
            </span>
          </motion.div>

          {/* Main High-Impact Heading with ConvergeText animation */}
          <div className="w-full flex justify-center items-center text-center mb-6 sm:mb-8">
            <ConvergeText
              text="READY TO AIM HIGHER?"
              as="h2"
              id="cta-heading"
              mode="words"
              stagger={0.08}
              className="hero-heading font-heading font-black uppercase text-[clamp(2.5rem,6.5vw,5.5rem)] tracking-tight leading-[1.02] text-center w-full mx-auto text-balance drop-shadow-[0_0_35px_rgba(182,0,168,0.2)]"
            />
          </div>

          {/* Subtitle with smooth fade up */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="w-full flex justify-center mb-10 sm:mb-12"
          >
            <p className="text-base sm:text-lg md:text-xl font-light text-[#D7E2EA]/75 max-w-[46ch] text-center mx-auto leading-relaxed text-pretty">
              24 hours of non-stop building, ₹35,000 in prizes, and 200+ hackers at {EVENT_DATA.collegeName}.
            </p>
          </motion.div>

          {/* Elegant Unified Metadata Badge with subtle hover lift and live indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="w-full flex justify-center mb-12 sm:mb-14"
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 px-6 py-2.5 rounded-full border border-[#D7E2EA]/15 bg-white/[0.03] backdrop-blur-sm text-xs sm:text-sm font-mono tracking-wider text-[#D7E2EA]/85 mx-auto hover:border-fuchsia-500/35 transition-colors duration-300 shadow-md">
              <span className="inline-flex items-center gap-1.5 text-white font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                05&ndash;06 NOV 2026
              </span>
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

          {/* Primary Action Button with light sheen sweep and magnet interaction */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.4 }}
            className="w-full flex justify-center relative"
          >
            {/* Outer ambient glow behind button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-56 h-14 rounded-full bg-gradient-to-r from-[#B600A8]/35 to-[#BE4C00]/35 blur-xl animate-pulse" />
            </div>

            <Magnet padding={120} strength={4}>
              <a
                href={EVENT_DATA.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background:
                    'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                }}
                className="group relative inline-flex items-center justify-center gap-3 px-10 sm:px-14 py-4 sm:py-5 rounded-full text-white font-medium text-sm sm:text-base uppercase tracking-widest hover:brightness-110 hover:shadow-2xl hover:shadow-[#B600A8]/40 active:scale-95 transition-all duration-300 shadow-xl shadow-[#B600A8]/25 cursor-pointer min-h-[52px] overflow-hidden"
              >
                {/* Continuous sweeping sheen highlight */}
                {!isReducedMotion && (
                  <motion.div
                    animate={{
                      x: ['-120%', '240%'],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3.2,
                      ease: 'easeInOut',
                      repeatDelay: 1.5,
                    }}
                    className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                  />
                )}

                <span className="relative z-10">Register Now</span>
                <ArrowUpRight className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 text-white/90 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>
            </Magnet>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
