import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { SectionHeader } from './SectionHeader';
import { EVENT_DATA } from '../data/event';

export const TimelineSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll tracking across the timeline section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 80%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  const progressPercent = useTransform(smoothProgress, (val) => {
    return `${Math.min(100, Math.max(0, Math.round(val * 100)))}%`;
  });

  const day1Items = EVENT_DATA.schedule.filter((item) => item.day === 'DAY 1');
  const day2Items = EVENT_DATA.schedule.filter((item) => item.day === 'DAY 2');

  return (
    <section
      ref={sectionRef}
      id="schedule"
      aria-labelledby="schedule-heading"
      className="bg-[#0C0C0C] text-[#D7E2EA] py-24 sm:py-32 md:py-40 border-t border-[#D7E2EA]/12 select-none relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Unified Section Header */}
        <SectionHeader
          label="03 — SCHEDULE"
          title="24-HOUR TIMELINE"
          headingId="schedule-heading"
          className="mb-8 sm:mb-10"
        />

        {/* Scroll-Linked Sprint Progression Tracker */}
        <div className="w-full flex items-center justify-between gap-4 py-3 px-5 sm:px-6 rounded-full border border-[#D7E2EA]/12 bg-white/[0.02] mb-12 sm:mb-16 backdrop-blur-sm">
          <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#D7E2EA]/75">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B600A8] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B600A8]" />
            </span>
            <span>24-Hour Sprint Progression</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-24 sm:w-44 h-1.5 rounded-full bg-white/10 overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#B600A8] via-[#7621B0] to-[#BE4C00] rounded-full"
                style={{ width: progressPercent }}
              />
            </div>
            <motion.span className="text-xs font-mono text-cyan-300 tabular-nums">
              {progressPercent}
            </motion.span>
          </div>
        </div>

        {/* ================= DESKTOP & TABLET: RESPONSIVE CARDS GRID ================= */}
        <div className="hidden md:flex flex-col gap-12 sm:gap-14">
          {/* Day 1 Group */}
          <div>
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#D7E2EA]/12">
              <span className="w-2 h-2 rounded-full bg-[#B600A8] shadow-[0_0_8px_#B600A8]" />
              <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-[#D7E2EA]/70">
                Day 1 &mdash; Thursday, 05 November
              </h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {day1Items.map((item, idx) => {
                const phaseNum = (idx + 1).toString().padStart(2, '0');
                return (
                  <motion.div
                    key={`d1-${item.time}`}
                    initial={{ opacity: 0, y: 32, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-40px', amount: 0.15 }}
                    transition={{
                      duration: 0.65,
                      delay: idx * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -6, transition: { duration: 0.25 } }}
                    className="h-full group"
                  >
                    <div className="h-full rounded-2xl border border-[#D7E2EA]/12 bg-[#101015] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group-hover:border-[#B600A8]/60 group-hover:bg-[#121018] group-hover:shadow-lg group-hover:shadow-[#B600A8]/10 min-w-0 relative overflow-hidden">
                      {/* Subtle hover accent light */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#B600A8]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      <div>
                        {/* Row 1: Day Badge & Phase */}
                        <div className="flex items-center justify-between gap-2 mb-6">
                          <span className="text-[11px] font-mono uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full border border-[#B600A8]/30 bg-[#B600A8]/10 text-fuchsia-300 group-hover:border-[#B600A8]/50 transition-colors">
                            {item.day}
                          </span>
                          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D7E2EA]/50 group-hover:text-[#D7E2EA]/80 transition-colors">
                            Phase {phaseNum}
                          </span>
                        </div>

                        {/* Large Fluid Gradient Time with Tabular Numerals */}
                        <div className="hero-heading font-heading font-black text-[clamp(2rem,3.8vw,3.25rem)] tracking-tight leading-none tabular-nums whitespace-nowrap mb-4 group-hover:brightness-110 transition-all">
                          {item.time}
                        </div>

                        {/* Title */}
                        <h4 className="font-heading font-medium uppercase text-base sm:text-lg text-white tracking-tight leading-snug mb-2">
                          {item.title}
                        </h4>
                      </div>

                      {/* Description */}
                      <p className="font-light text-sm text-[#D7E2EA]/70 leading-relaxed mt-3">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Day 2 Group */}
          <div>
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#D7E2EA]/12">
              <span className="w-2 h-2 rounded-full bg-[#BE4C00] shadow-[0_0_8px_#BE4C00]" />
              <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-[#D7E2EA]/70">
                Day 2 &mdash; Friday, 06 November
              </h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {day2Items.map((item, idx) => {
                const phaseNum = (idx + 5).toString().padStart(2, '0');
                return (
                  <motion.div
                    key={`d2-${item.time}`}
                    initial={{ opacity: 0, y: 32, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-40px', amount: 0.15 }}
                    transition={{
                      duration: 0.65,
                      delay: idx * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -6, transition: { duration: 0.25 } }}
                    className="h-full group"
                  >
                    <div className="h-full rounded-2xl border border-[#D7E2EA]/12 bg-[#101015] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group-hover:border-[#BE4C00]/60 group-hover:bg-[#151210] group-hover:shadow-lg group-hover:shadow-[#BE4C00]/10 min-w-0 relative overflow-hidden">
                      {/* Subtle hover accent light */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#BE4C00]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      <div>
                        {/* Row 1: Day Badge & Phase */}
                        <div className="flex items-center justify-between gap-2 mb-6">
                          <span className="text-[11px] font-mono uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full border border-[#BE4C00]/30 bg-[#BE4C00]/10 text-amber-300 group-hover:border-[#BE4C00]/50 transition-colors">
                            {item.day}
                          </span>
                          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D7E2EA]/50 group-hover:text-[#D7E2EA]/80 transition-colors">
                            Phase {phaseNum}
                          </span>
                        </div>

                        {/* Large Fluid Gradient Time with Tabular Numerals */}
                        <div className="hero-heading font-heading font-black text-[clamp(2rem,3.8vw,3.25rem)] tracking-tight leading-none tabular-nums whitespace-nowrap mb-4 group-hover:brightness-110 transition-all">
                          {item.time}
                        </div>

                        {/* Title */}
                        <h4 className="font-heading font-medium uppercase text-base sm:text-lg text-white tracking-tight leading-snug mb-2">
                          {item.title}
                        </h4>
                      </div>

                      {/* Description */}
                      <p className="font-light text-sm text-[#D7E2EA]/70 leading-relaxed mt-3">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= MOBILE: CLEAN VERTICAL TIMELINE WITH ACTIVE LASER RAIL ================= */}
        <div className="md:hidden">
          <div className="relative pl-7 flex flex-col gap-6">
            {/* Background Base Rail Line */}
            <div className="absolute left-[3px] top-4 bottom-4 w-[2px] bg-[#D7E2EA]/12" />

            {/* Scroll-Driven Glowing Laser Rail Beam */}
            <motion.div
              className="absolute left-[3px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#B600A8] via-[#7621B0] to-[#BE4C00] origin-top shadow-[0_0_8px_rgba(182,0,168,0.8)]"
              style={{ scaleY: smoothProgress }}
            />

            {EVENT_DATA.schedule.map((item, idx) => {
              const phaseNum = (idx + 1).toString().padStart(2, '0');
              const isDay1 = item.day === 'DAY 1';

              return (
                <motion.div
                  key={`mob-${item.time}`}
                  initial={{ opacity: 0, x: -16, scale: 0.97 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-20px', amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative rounded-2xl border border-[#D7E2EA]/12 bg-[#101015] p-5 sm:p-6 min-w-0"
                >
                  {/* Node marker on vertical rail line */}
                  <span
                    className={`absolute -left-[30px] top-6 w-3 h-3 rounded-full ring-4 ring-[#0C0C0C] transition-shadow duration-300 ${
                      isDay1
                        ? 'bg-[#B600A8] shadow-[0_0_8px_#B600A8]'
                        : 'bg-[#BE4C00] shadow-[0_0_8px_#BE4C00]'
                    }`}
                  />

                  {/* Badge & Phase */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border ${
                        isDay1
                          ? 'border-[#B600A8]/30 bg-[#B600A8]/10 text-fuchsia-300'
                          : 'border-[#BE4C00]/30 bg-[#BE4C00]/10 text-amber-300'
                      }`}
                    >
                      {item.day}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D7E2EA]/50">
                      Phase {phaseNum}
                    </span>
                  </div>

                  {/* Time */}
                  <div className="hero-heading font-heading font-black text-3xl tabular-nums whitespace-nowrap mb-2">
                    {item.time}
                  </div>

                  {/* Title */}
                  <h4 className="font-heading font-medium uppercase text-base text-white tracking-tight leading-snug mb-1">
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p className="font-light text-xs text-[#D7E2EA]/70 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
