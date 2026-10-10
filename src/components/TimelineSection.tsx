import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useInView,
  useReducedMotion,
  animate,
} from 'framer-motion';
import { Converge } from './motion/Converge';
import { ConvergeText } from './motion/ConvergeText';
import { useConvergeConfig } from './motion/useConvergeConfig';
import { EVENT_DATA, MilestoneData } from '../data/event';

// ============================================================================
// Helper: Animated Time Numeral with Tabular Digits and Screen-Reader Safety
// ============================================================================
interface AnimatedTimeProps {
  targetTime: string;
  isReducedMotion: boolean;
  className?: string;
}

const AnimatedTime: React.FC<AnimatedTimeProps> = ({
  targetTime,
  isReducedMotion,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [displayTime, setDisplayTime] = useState(isReducedMotion ? targetTime : '00:00');

  useEffect(() => {
    if (isReducedMotion) {
      setDisplayTime(targetTime);
      return;
    }

    if (!isInView) return;

    const [targetH, targetM] = targetTime.split(':').map(Number);
    const targetTotal = targetH * 60 + targetM;

    const controls = animate(0, 1, {
      duration: 0.9,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (progress) => {
        if (progress >= 0.999) {
          setDisplayTime(targetTime);
          return;
        }
        const currentTotal = Math.round(targetTotal * progress);
        const curH = Math.floor(currentTotal / 60);
        const curM = currentTotal % 60;
        setDisplayTime(
          `${curH.toString().padStart(2, '0')}:${curM.toString().padStart(2, '0')}`
        );
      },
    });

    return () => controls.stop();
  }, [isInView, targetTime, isReducedMotion]);

  return (
    <div
      ref={ref}
      aria-label={`Time: ${targetTime}`}
      className={`hero-heading font-heading font-black tabular-nums tracking-tight leading-none whitespace-nowrap ${className}`}
    >
      {displayTime}
    </div>
  );
};

// ============================================================================
// Single Milestone Card with Mouse Spotlight, Node Indicator & Active Focus
// ============================================================================
interface MilestoneCardProps {
  item: MilestoneData;
  index: number;
  totalIndex: number; // 0 to 8 across both days
  isDay1: boolean;
  isSprintEnd?: boolean;
  isSprintStart?: boolean;
  isActive: boolean;
  hasActiveCard: boolean;
  isReducedMotion: boolean;
  scrollProgressValue: number;
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({
  item,
  index,
  totalIndex,
  isDay1,
  isSprintEnd = false,
  isSprintStart = false,
  isActive,
  hasActiveCard,
  isReducedMotion,
  scrollProgressValue,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);
  const [supportsFinePointer, setSupportsFinePointer] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSupportsFinePointer(window.matchMedia('(pointer: fine)').matches);
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const phaseNum = (totalIndex + 1).toString().padStart(2, '0');

  // Node position threshold along the progress bar (0 to 1)
  const nodeThreshold = (totalIndex + 0.5) / 9;
  const isNodePassed = scrollProgressValue >= nodeThreshold;

  // Active / Dimmed state
  const isDimmed = hasActiveCard && !isActive;

  return (
    <motion.div
      ref={cardRef}
      id={`timeline-card-${totalIndex}`}
      initial={{
        opacity: isReducedMotion ? 1 : 0,
        y: isReducedMotion ? 0 : 32,
        filter: isReducedMotion ? 'blur(0px)' : 'blur(6px)',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{
        duration: isReducedMotion ? 0 : 0.65,
        delay: isReducedMotion ? 0 : index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onMouseMove={supportsFinePointer ? handleMouseMove : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: -1000, y: -1000 });
      }}
      className={`h-full flex flex-col transition-all duration-300 relative ${
        isDimmed ? 'opacity-65' : 'opacity-100'
      } ${isActive ? '-translate-y-1' : 'translate-y-0'}`}
    >
      {/* Node Marker on Desktop Connector Rail (Positioned directly on top rail) */}
      <div className="hidden lg:flex items-center justify-center w-full mb-3 relative z-10">
        <motion.div
          animate={{
            scale: isNodePassed || isActive ? 1 : 0.65,
            borderColor: isSprintEnd
              ? '#BE4C00'
              : isNodePassed || isActive
              ? '#B600A8'
              : 'rgba(215, 226, 234, 0.2)',
            backgroundColor: isNodePassed || isActive
              ? isSprintEnd ? '#BE4C00' : '#B600A8'
              : '#0C0C0C',
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-3.5 h-3.5 rounded-full border-2 transition-shadow duration-300 shadow-sm"
          style={{
            boxShadow:
              isNodePassed || isActive
                ? isSprintEnd
                  ? '0 0 10px rgba(190, 76, 0, 0.7)'
                  : '0 0 10px rgba(182, 0, 168, 0.7)'
                : 'none',
          }}
        />
      </div>

      {/* Main Card Shell - 24px internal padding (p-6) guarantees content never touches borders */}
      <div
        className={`h-full rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden min-w-0 ${
          isSprintEnd
            ? 'border-2 border-[#BE4C00]/80 bg-[#141010] shadow-lg shadow-[#BE4C00]/15'
            : isActive
            ? 'border border-[#B600A8] bg-[#131018] shadow-lg shadow-[#B600A8]/20'
            : isHovered
            ? 'border border-[#B600A8]/60 bg-[#111016]'
            : 'border border-[#D7E2EA]/12 bg-[#101015]'
        }`}
      >
        {/* Desktop Cursor Spotlight (Pointer fine only) */}
        {supportsFinePointer && isHovered && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
            style={{
              background: `radial-gradient(240px circle at ${mousePos.x}px ${mousePos.y}px, rgba(182, 0, 168, 0.12), transparent 70%)`,
            }}
          />
        )}

        {/* Ambient Corner Accent */}
        <div
          className={`absolute top-0 right-0 w-28 h-28 pointer-events-none rounded-bl-full transition-opacity duration-300 ${
            isSprintEnd
              ? 'bg-gradient-to-bl from-[#BE4C00]/15 to-transparent opacity-100'
              : 'bg-gradient-to-bl from-[#B600A8]/10 to-transparent opacity-0 group-hover:opacity-100'
          }`}
        />

        <div>
          {/* Top Row: Day Badge & Phase (Micro-detail: 0.1s delayed reveal) */}
          <motion.div
            initial={{ opacity: isReducedMotion ? 1 : 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: isReducedMotion ? 0 : 0.4,
              delay: isReducedMotion ? 0 : index * 0.1 + 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="flex items-center justify-between gap-2 mb-6"
          >
            <span
              className={`text-[11px] font-mono uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full border ${
                isSprintEnd
                  ? 'border-[#BE4C00]/50 bg-[#BE4C00]/20 text-amber-300 font-semibold'
                  : isDay1
                  ? 'border-[#B600A8]/30 bg-[#B600A8]/10 text-fuchsia-300'
                  : 'border-[#BE4C00]/30 bg-[#BE4C00]/10 text-amber-300'
              }`}
            >
              {isSprintEnd ? '24H SPRINT END' : item.day}
            </span>

            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D7E2EA]/50">
              Phase {phaseNum}
            </span>
          </motion.div>

          {/* Time with Animated Count-up and Tabular Digits */}
          <div className="mb-4">
            <AnimatedTime
              targetTime={item.time}
              isReducedMotion={isReducedMotion}
              className={`text-[clamp(2.1rem,3.6vw,3.25rem)] ${
                isActive ? 'brightness-125' : ''
              }`}
            />
          </div>

          {/* Title */}
          <h4 className="font-heading font-medium uppercase text-base sm:text-lg text-white tracking-tight leading-snug mb-2">
            {item.title}
          </h4>
        </div>

        {/* Description */}
        <p className="font-light text-sm text-[#D7E2EA]/70 leading-relaxed mt-4 pt-3 border-t border-[#D7E2EA]/10">
          {item.description}
        </p>

        {/* Special Milestone Callout for Sprint Start / End */}
        {isSprintStart && (
          <div className="mt-3 text-[10px] font-mono uppercase tracking-[0.2em] text-fuchsia-300 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B600A8] animate-ping" />
            <span>Sprint Commences</span>
          </div>
        )}
        {isSprintEnd && (
          <div className="mt-3 text-[10px] font-mono uppercase tracking-[0.2em] text-amber-300 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BE4C00] animate-pulse" />
            <span>Submission Freeze</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ============================================================================
// Main Timeline Section
// ============================================================================
export const TimelineSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;

  // 1. Scroll-Linked Sprint Progress: Bound across the section with offset ["start 0.7", "end 0.5"]
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.7', 'end 0.5'],
  });

  const smoothSprint = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const [percent, setPercent] = useState(0);
  const [hourCount, setHourCount] = useState(0);
  const [currentProgressRaw, setCurrentProgressRaw] = useState(0);

  useEffect(() => {
    const unsubscribe = smoothSprint.on('change', (latest) => {
      const clamped = Math.min(100, Math.max(0, Math.round(latest * 100)));
      setPercent(clamped);
      const hour = Math.min(24, Math.max(0, Math.round(latest * 24)));
      setHourCount(hour);
      setCurrentProgressRaw(latest);
    });
    return () => unsubscribe();
  }, [smoothSprint]);

  // Heading subtle parallax (20-30px slower than scroll)
  const headingParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-15, 15]
  );

  // Active card tracking via viewport center calculation
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const vCenter = window.innerHeight / 2;

        // Only activate when section is actively around viewport center
        if (sectionRect.top > vCenter + 200 || sectionRect.bottom < vCenter - 200) {
          setActiveCardIndex(null);
          return;
        }

        let closestIndex: number | null = null;
        let minDistance = Infinity;

        for (let i = 0; i < 9; i++) {
          const el = document.getElementById(`timeline-card-${i}`);
          if (el) {
            const rect = el.getBoundingClientRect();
            const cardCenter = rect.top + rect.height / 2;
            const dist = Math.abs(cardCenter - vCenter);
            if (dist < minDistance && dist < 260) {
              minDistance = dist;
              closestIndex = i;
            }
          }
        }
        setActiveCardIndex(closestIndex);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const day1Items = EVENT_DATA.schedule.filter((item) => item.day === 'DAY 1');
  const day2Items = EVENT_DATA.schedule.filter((item) => item.day === 'DAY 2');

  const config = useConvergeConfig();

  return (
    <section
      ref={sectionRef}
      id="schedule"
      aria-labelledby="schedule-heading"
      className="bg-[#0C0C0C] text-[#D7E2EA] py-24 sm:py-32 md:py-40 border-t border-[#D7E2EA]/12 select-none relative overflow-hidden"
    >
      {/* Shared Site Container: max-w-[1200px], px-5 (20px mobile), px-8 (32px tablet), px-12 (48px desktop) */}
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
        {/* ==================================================================== */}
        {/* 1. HEADING REVEAL: ConvergeText assembling words + Subtle Parallax */}
        {/* ==================================================================== */}
        <motion.div
          style={{ y: headingParallaxY }}
          className="mb-8"
        >
          {/* Section Index Label */}
          <span className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.28em] text-[#D7E2EA]/60 block mb-3 sm:mb-4">
            03 &mdash; SCHEDULE
          </span>

          <ConvergeText
            text="24-HOUR TIMELINE"
            id="schedule-heading"
            className="hero-heading font-heading font-black uppercase text-[clamp(2.5rem,7vw,5.5rem)] tracking-tight leading-[0.95] text-balance block"
          />
        </motion.div>

        {/* ==================================================================== */}
        {/* 2. SCROLL-LINKED SPRINT PROGRESS: Gap 32px below heading */}
        {/* ==================================================================== */}
        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="24-Hour Hackathon Timeline Progress"
          className="w-full flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 py-3.5 px-6 rounded-2xl border border-[#D7E2EA]/12 bg-[#101015]/80 mb-12 sm:mb-16 backdrop-blur-md"
        >
          {/* Left: Animated Pulse Dot + Label */}
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-[#D7E2EA]/80">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B600A8] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#B600A8]" />
            </span>
            <span>24-Hour Sprint Progression</span>
          </div>

          {/* Right: Progress Track with Leading Glow Dot + Hour & Percent Readouts */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-[11px] font-mono text-[#D7E2EA]/60 uppercase tracking-widest tabular-nums whitespace-nowrap">
              HOUR {hourCount.toString().padStart(2, '0')} / 24
            </span>

            {/* Progress Track */}
            <div className="w-24 sm:w-48 h-2 rounded-full bg-white/10 overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#B600A8] via-[#7621B0] to-[#BE4C00] rounded-full relative"
                style={{
                  scaleX: shouldReduceMotion ? 1 : smoothSprint,
                  transformOrigin: '0% 50%',
                }}
              >
                {/* Glowing Leading Dot at leading edge */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#B600A8,0_0_12px_#BE4C00]" />
              </motion.div>
            </div>

            <span className="text-xs font-mono text-cyan-300 font-medium tabular-nums min-w-[36px] text-right">
              {percent}%
            </span>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* DESKTOP & TABLET: STRUCTURED 4-COL UNIFIED GRIDS */}
        {/* ==================================================================== */}
        <div className="hidden sm:flex flex-col gap-16">
          {/* ---------------- DAY 1 (4 EQUAL COLUMNS) ---------------- */}
          <div>
            {/* 3. Day 1 Subheader: Dot pulses + Thin line draws left to right */}
            <div className="flex items-center gap-3.5 mb-6 pb-2">
              <motion.span
                className="w-2.5 h-2.5 rounded-full bg-[#B600A8] shadow-[0_0_8px_#B600A8]"
                initial={{ scale: 1 }}
                whileInView={shouldReduceMotion ? {} : { scale: [1, 1.45, 1] }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              />
              <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-[#D7E2EA]/80 whitespace-nowrap">
                Day 1 &mdash; Thursday, 05 November
              </h3>
              {/* Animated Drawing Divider Line */}
              <div className="flex-1 h-[1px] bg-[#D7E2EA]/12 overflow-hidden relative ml-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#B600A8]/80 to-transparent"
                  initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ transformOrigin: '0% 50%' }}
                />
              </div>
            </div>

            {/* 6. Connector Rail on Desktop: Thin 1px line above cards */}
            <div className="hidden lg:block w-full h-[1px] bg-[#D7E2EA]/12 relative mb-[-7px]">
              <motion.div
                className="h-full bg-gradient-to-r from-[#B600A8] via-[#7621B0] to-[#BE4C00]"
                style={{
                  scaleX: shouldReduceMotion ? 1 : smoothSprint,
                  transformOrigin: '0% 50%',
                }}
              />
            </div>

            {/* Day 1 Cards: 4 equal columns on desktop, 2 on tablet */}
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch list-none p-0 m-0">
              {day1Items.map((item, idx) => (
                <li key={`d1-${item.time}`} className="h-full">
                  <Converge
                    from={idx % 2 === 0 ? 'top' : 'bottom'}
                    distance={config.isMobile ? 32 : 72}
                    rotate={idx % 2 === 0 ? -2 : 2}
                    className="h-full"
                  >
                    <MilestoneCard
                      item={item}
                      index={idx}
                      totalIndex={idx} // 0, 1, 2, 3
                      isDay1={true}
                      isSprintStart={idx === 2} // Phase 03: 12:00 Hacking Begins
                      isActive={activeCardIndex === idx}
                      hasActiveCard={activeCardIndex !== null}
                      isReducedMotion={shouldReduceMotion}
                      scrollProgressValue={currentProgressRaw}
                    />
                  </Converge>
                </li>
              ))}
            </ol>
          </div>

          {/* 9. SPRINT SPAN MARKER: Visual connection between Phase 03 and Phase 07 */}
          <div className="relative py-2 flex items-center justify-center">
            <div className="w-full flex items-center gap-4">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#D7E2EA]/15 to-[#B600A8]/40" />
              <div className="px-4 py-1.5 rounded-full border border-[#B600A8]/40 bg-[#B600A8]/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B600A8] animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-fuchsia-300 font-medium">
                  24H SPRINT SPAN &bull; 12:00 DAY 1 &rarr; 12:00 DAY 2
                </span>
              </div>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-[#BE4C00]/40 via-[#D7E2EA]/15 to-transparent" />
            </div>
          </div>

          {/* ---------------- DAY 2 (IDENTICAL COLUMN WIDTHS, 3 + 2 BALANCED ROW) ---------------- */}
          <div>
            {/* 3. Day 2 Subheader: Dot pulses + Thin line draws left to right */}
            <div className="flex items-center gap-3.5 mb-6 pb-2">
              <motion.span
                className="w-2.5 h-2.5 rounded-full bg-[#BE4C00] shadow-[0_0_8px_#BE4C00]"
                initial={{ scale: 1 }}
                whileInView={shouldReduceMotion ? {} : { scale: [1, 1.45, 1] }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              />
              <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-[#D7E2EA]/80 whitespace-nowrap">
                Day 2 &mdash; Friday, 06 November
              </h3>
              {/* Animated Drawing Divider Line */}
              <div className="flex-1 h-[1px] bg-[#D7E2EA]/12 overflow-hidden relative ml-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#BE4C00]/80 to-transparent"
                  initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ transformOrigin: '0% 50%' }}
                />
              </div>
            </div>

            {/* 6. Connector Rail on Desktop: Thin 1px line above Day 2 cards */}
            <div className="hidden lg:block w-full h-[1px] bg-[#D7E2EA]/12 relative mb-[-7px]">
              <motion.div
                className="h-full bg-gradient-to-r from-[#7621B0] to-[#BE4C00]"
                style={{
                  scaleX: shouldReduceMotion ? 1 : smoothSprint,
                  transformOrigin: '0% 50%',
                }}
              />
            </div>

            {/* Day 2 Cards: 3 + 2 arrangement with the EXACT same column width (w-[calc(25%-18px)] on lg, w-[calc(50%-12px)] on sm) */}
            <ol className="flex flex-wrap justify-center gap-6 list-none p-0 m-0">
              {day2Items.map((item, idx) => {
                const totalIdx = idx + 4; // 4, 5, 6, 7, 8
                const isSprintEnd = idx === 2; // Phase 07: 12:00 Hacking Ends
                const fromDir = idx % 2 === 0 ? 'left' : 'right';

                return (
                  <li
                    key={`d2-${item.time}`}
                    className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex-shrink-0"
                  >
                    <Converge
                      from={fromDir}
                      distance={config.isMobile ? 32 : 80}
                      rotate={idx % 2 === 0 ? -3 : 3}
                      className="h-full"
                    >
                      <MilestoneCard
                        item={item}
                        index={idx}
                        totalIndex={totalIdx}
                        isDay1={false}
                        isSprintEnd={isSprintEnd}
                        isActive={activeCardIndex === totalIdx}
                        hasActiveCard={activeCardIndex !== null}
                        isReducedMotion={shouldReduceMotion}
                        scrollProgressValue={currentProgressRaw}
                      />
                    </Converge>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* MOBILE: CLEAN VERTICAL RAIL TIMELINE WITH SCROLL-DRIVEN LASER BEAM */}
        {/* ==================================================================== */}
        <div className="sm:hidden">
          {/* Day 1 Mobile Label */}
          <div className="flex items-center gap-2 mb-6 text-xs font-mono uppercase tracking-[0.2em] text-[#D7E2EA]/80">
            <span className="w-2 h-2 rounded-full bg-[#B600A8]" />
            <span>Day 1 &mdash; 05 November</span>
          </div>

          <div className="relative pl-7 flex flex-col gap-6">
            {/* Background Base Rail Line */}
            <div className="absolute left-[3px] top-4 bottom-4 w-[2px] bg-[#D7E2EA]/12" />

            {/* Scroll-Driven Glowing Laser Rail Beam */}
            <motion.div
              className="absolute left-[3px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#B600A8] via-[#7621B0] to-[#BE4C00] origin-top shadow-[0_0_8px_rgba(182,0,168,0.8)]"
              style={{
                scaleY: shouldReduceMotion ? 1 : smoothSprint,
                transformOrigin: '0% 0%',
              }}
            />

            <ol className="flex flex-col gap-6 list-none p-0 m-0">
              {EVENT_DATA.schedule.map((item, idx) => {
                const isDay1 = item.day === 'DAY 1';
                const isSprintStart = idx === 2;
                const isSprintEnd = idx === 6;
                const isItemActive = activeCardIndex === idx;

                return (
                  <li key={`mob-${item.day}-${item.time}-${idx}`} className="relative">
                    {/* Node marker on vertical rail line */}
                    <motion.span
                      animate={{
                        scale: isItemActive ? 1.3 : 1,
                        borderColor: isSprintEnd
                          ? '#BE4C00'
                          : isDay1
                          ? '#B600A8'
                          : '#BE4C00',
                      }}
                      className={`absolute -left-[31px] top-7 w-3 h-3 rounded-full ring-4 ring-[#0C0C0C] z-10 transition-shadow duration-300 ${
                        isSprintEnd
                          ? 'bg-[#BE4C00] shadow-[0_0_8px_#BE4C00]'
                          : isDay1
                          ? 'bg-[#B600A8] shadow-[0_0_8px_#B600A8]'
                          : 'bg-[#BE4C00] shadow-[0_0_8px_#BE4C00]'
                      }`}
                    />

                    {/* Mobile Sprint Span Badge between Phase 03 and Phase 07 */}
                    {isSprintStart && (
                      <div className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#B600A8]/40 bg-[#B600A8]/10 text-[10px] font-mono uppercase tracking-widest text-fuchsia-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B600A8] animate-ping" />
                        <span>24H SPRINT START &bull; 12:00</span>
                      </div>
                    )}

                    {isSprintEnd && (
                      <div className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#BE4C00]/40 bg-[#BE4C00]/10 text-[10px] font-mono uppercase tracking-widest text-amber-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#BE4C00] animate-pulse" />
                        <span>24H SPRINT END &bull; 12:00</span>
                      </div>
                    )}

                    {/* Mobile Card */}
                    <div
                      id={`timeline-card-${idx}`}
                      className={`relative rounded-2xl p-6 min-w-0 transition-all duration-300 ${
                        isSprintEnd
                          ? 'border-2 border-[#BE4C00] bg-[#141010] shadow-lg shadow-[#BE4C00]/20'
                          : isItemActive
                          ? 'border border-[#B600A8] bg-[#131018]'
                          : 'border border-[#D7E2EA]/12 bg-[#101015]'
                      }`}
                    >
                      {/* Badge & Phase */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span
                          className={`text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full border ${
                            isSprintEnd
                              ? 'border-[#BE4C00]/50 bg-[#BE4C00]/20 text-amber-300 font-semibold'
                              : isDay1
                              ? 'border-[#B600A8]/30 bg-[#B600A8]/10 text-fuchsia-300'
                              : 'border-[#BE4C00]/30 bg-[#BE4C00]/10 text-amber-300'
                          }`}
                        >
                          {isSprintEnd ? '24H SPRINT END' : item.day}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D7E2EA]/50">
                          Phase {(idx + 1).toString().padStart(2, '0')}
                        </span>
                      </div>

                      {/* Animated Time */}
                      <div className="mb-2">
                        <AnimatedTime
                          targetTime={item.time}
                          isReducedMotion={shouldReduceMotion}
                          className="text-3xl"
                        />
                      </div>

                      {/* Title */}
                      <h4 className="font-heading font-medium uppercase text-base text-white tracking-tight leading-snug mb-2">
                        {item.title}
                      </h4>

                      {/* Description */}
                      <p className="font-light text-xs sm:text-sm text-[#D7E2EA]/70 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};
