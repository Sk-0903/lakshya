import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { EVENT_DATA } from '../data/event';

export const TimelineSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map 0 to 1 scroll progress to horizontal translation percentage
  // Total 9 cards with min-w-[30vw] and gap-6 -> ~-70% total translation
  const xTranslate = useTransform(scrollYProgress, [0, 1], ['5%', '-72%']);
  const progressLineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="schedule"
      ref={containerRef}
      className="bg-[#0C0C0C] text-[#D7E2EA] relative select-none md:h-[300vh]"
    >
      {/* ================= DESKTOP PINNED HORIZONTAL TRACK ================= */}
      <div className="hidden md:flex sticky top-0 h-screen w-full flex-col justify-between overflow-hidden py-14 px-8 md:px-14">
        {/* Header Row */}
        <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
          <div>
            <span className="text-[0.75rem] uppercase tracking-[0.3em] text-[#D7E2EA]/60 font-mono block mb-2">
              03 &mdash; Schedule
            </span>
            <h2 className="hero-heading font-heading font-black uppercase text-4xl sm:text-5xl tracking-tight leading-none">
              24-Hour Timeline
            </h2>
          </div>

          {/* Thin Progress Rail with Dot */}
          <div className="w-56 h-[2px] bg-[#D7E2EA]/12 relative rounded-full overflow-hidden">
            <motion.div
              style={{ width: progressLineWidth }}
              className="h-full bg-gradient-to-r from-[#B600A8] to-[#BE4C00]"
            />
          </div>
        </div>

        {/* Horizontal Scrolling Flex Track */}
        <div className="w-full my-auto overflow-hidden">
          <motion.div
            style={{ x: xTranslate }}
            className="flex items-center gap-6 will-change-transform"
          >
            {EVENT_DATA.schedule.map((item, idx) => (
              <div
                key={`${item.time}-${idx}`}
                className="min-w-[30vw] max-w-[34vw] rounded-3xl border border-[#D7E2EA]/12 bg-[#101015]/80 p-8 md:p-10 flex flex-col justify-between shrink-0 transition-transform duration-300 hover:border-[#D7E2EA]/25"
              >
                {/* Day Tag */}
                <div className="flex items-center justify-between mb-8">
                  <span
                    className={`text-[0.7rem] font-mono uppercase tracking-[0.25em] px-3 py-1 rounded-full border ${
                      item.day === 'DAY 1'
                        ? 'border-[#B600A8]/40 bg-[#B600A8]/10 text-fuchsia-300'
                        : 'border-[#BE4C00]/40 bg-[#BE4C00]/10 text-amber-300'
                    }`}
                  >
                    {item.day}
                  </span>
                  <span className="text-xs font-mono text-[#D7E2EA]/40">
                    PHASE 0{idx + 1}
                  </span>
                </div>

                {/* Big Gradient Time */}
                <div className="hero-heading font-heading font-black text-[clamp(2.5rem,5vw,4.5rem)] tracking-tight leading-none mb-4">
                  {item.time}
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="font-heading font-medium uppercase text-lg text-white tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="font-light text-sm text-[#D7E2EA]/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Footer Hint */}
        <div className="max-w-6xl w-full mx-auto flex items-center justify-between text-xs font-mono text-[#D7E2EA]/40">
          <span>05-06 NOVEMBER 2026</span>
          <span>SCROLL DOWN TO PROGRESS</span>
        </div>
      </div>

      {/* ================= MOBILE CLEAN VERTICAL TIMELINE ================= */}
      <div className="md:hidden py-24 px-6">
        <div className="mb-12">
          <span className="text-[0.75rem] uppercase tracking-[0.3em] text-[#D7E2EA]/60 font-mono block mb-2">
            03 &mdash; Schedule
          </span>
          <h2 className="hero-heading font-heading font-black uppercase text-4xl tracking-tight leading-none">
            Schedule
          </h2>
        </div>

        {/* Vertical Rail */}
        <div className="relative pl-6 border-l border-[#D7E2EA]/12 flex flex-col gap-6">
          {EVENT_DATA.schedule.map((item, idx) => (
            <FadeIn key={`mob-${item.time}-${idx}`} delay={idx * 0.05} y={15}>
              <div className="relative rounded-3xl border border-[#D7E2EA]/12 bg-[#101015] p-6">
                {/* Node marker on vertical line */}
                <span className="absolute -left-[31px] top-7 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#B600A8] to-[#BE4C00] ring-4 ring-[#0C0C0C]" />

                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D7E2EA]/50">
                    {item.day}
                  </span>
                  <span className="font-heading font-black text-2xl hero-heading">
                    {item.time}
                  </span>
                </div>

                <h3 className="font-heading font-medium uppercase text-base text-white tracking-tight mb-1">
                  {item.title}
                </h3>
                <p className="font-light text-xs text-[#D7E2EA]/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
