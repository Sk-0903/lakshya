import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Clock,
  Sparkles,
  Rocket,
  Users,
  Gamepad2,
  Target,
  Lock,
  Trophy,
  Award,
} from 'lucide-react';
import { FadeIn } from './FadeIn';
import { EVENT_DATA, MilestoneData } from '../data/event';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Clock,
  Sparkles,
  Rocket,
  Users,
  Gamepad2,
  Target,
  Lock,
  Trophy,
  Award,
};

const MilestoneCard: React.FC<{ milestone: MilestoneData; index: number }> = ({ milestone }) => {
  const IconComponent = ICON_MAP[milestone.icon] || Clock;

  return (
    <div className="w-[85vw] sm:w-[55vw] md:w-[35vw] shrink-0 rounded-[40px] sm:rounded-[50px] border-2 border-[#D7E2EA] bg-[#0C0C0C]/90 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 select-none">
      {/* Top Header Row with Day Chip & Icon */}
      <div className="flex items-center justify-between pb-4 border-b border-[#D7E2EA]/15">
        <span
          className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
            milestone.day === 'DAY 1'
              ? 'bg-[#B600A8]/20 border border-[#B600A8]/40 text-fuchsia-300'
              : 'bg-[#BE4C00]/20 border border-[#BE4C00]/40 text-amber-300'
          }`}
        >
          {milestone.day}
        </span>
        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <IconComponent className="w-5 h-5 text-cyan-300" />
        </div>
      </div>

      {/* Giant Time Display */}
      <div className="my-6">
        <div className="hero-heading font-black tracking-tight text-[clamp(2.8rem,6vw,90px)] leading-none">
          {milestone.time}
        </div>
        <h4 className="text-xl sm:text-2xl font-bold uppercase text-[#D7E2EA] tracking-wide mt-3">
          {milestone.label}
        </h4>
      </div>

      {/* Description */}
      <p className="text-sm font-light leading-relaxed text-[#D7E2EA]/70 border-t border-[#D7E2EA]/10 pt-4">
        {milestone.description}
      </p>
    </div>
  );
};

export const TimelineSection: React.FC = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate translation range for horizontal track
  // 9 cards * approx 38vw ~ 340vw total width
  const xTransform = useTransform(scrollYProgress, [0, 1], ['0%', '-78%']);
  const progressLineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const bgTextParallax = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  return (
    <section
      id="schedule"
      className="bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 select-none"
    >
      {/* Section Header */}
      <div className="max-w-6xl mx-auto pt-20 sm:pt-28 pb-8 px-6 text-center">
        <FadeIn delay={0} y={40}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#BBCCD7] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>24-Hour Road to Victory</span>
          </div>
          <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none tracking-tight">
            Schedule
          </h2>
        </FadeIn>
      </div>

      {/* Desktop & Tablet: Pinned Horizontal Scrub Container (400vh outer) */}
      <div ref={outerRef} className="hidden md:block h-[400vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
          {/* Faint Huge Parallax Word Behind Cards: "24 HRS" */}
          <motion.div
            style={{ x: bgTextParallax }}
            className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap pointer-events-none select-none z-0"
          >
            <span
              className="text-[26vw] font-black uppercase tracking-tighter opacity-[0.06] font-mono"
              style={{
                WebkitTextStroke: '2px #D7E2EA',
                color: 'transparent',
              }}
            >
              24 HRS SPRINT &bull; 24 HRS SPRINT
            </span>
          </motion.div>

          {/* Top Progress Line with Glowing Leading Edge */}
          <div className="max-w-7xl mx-auto w-full px-10 mb-8 relative z-20">
            <div className="w-full h-[2px] bg-[#D7E2EA]/20 relative rounded-full">
              {/* Animated Progress Fill */}
              <motion.div
                style={{ width: progressLineWidth }}
                className="h-full bg-gradient-to-r from-[#B600A8] via-[#7621B0] to-[#BE4C00] relative rounded-full"
              >
                {/* Glowing Leading Dot */}
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8] -mr-1.5" />
              </motion.div>

              {/* Milestone Ticks */}
              <div className="absolute inset-0 flex justify-between pointer-events-none">
                {EVENT_DATA.schedule.map((_, i) => (
                  <span
                    key={i}
                    className="w-1.5 h-3 -top-0.5 bg-[#D7E2EA]/40 rounded-full inline-block"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Horizontally Moving Flex Track */}
          <motion.div
            style={{ x: xTransform }}
            className="flex gap-6 sm:gap-8 px-10 relative z-20 w-max"
          >
            {EVENT_DATA.schedule.map((milestone, index) => (
              <MilestoneCard key={milestone.id} milestone={milestone} index={index} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile: Vertical List with Vertical Progress Line */}
      <div className="md:hidden px-5 pb-24 flex flex-col gap-6 relative">
        <div className="absolute left-8 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#B600A8] via-[#7621B0] to-[#BE4C00] opacity-40" />
        {EVENT_DATA.schedule.map((milestone, index) => (
          <div key={milestone.id} className="relative pl-8">
            <span className="absolute left-[29px] top-8 w-2.5 h-2.5 rounded-full bg-cyan-400 -translate-x-1/2 shadow-[0_0_8px_#38bdf8]" />
            <MilestoneCard milestone={milestone} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
};
