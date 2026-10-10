import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import { Trophy, Award, Gift } from 'lucide-react';
import { EVENT_DATA, PrizeData } from '../data/event';
import { ConvergeText, useConvergeConfig } from './motion';

const ICON_MAP = {
  trophy: Trophy,
  medal: Award,
  stars: Gift,
};

// Minimal Thin-Line SVG Illustrations that draw on view via pathLength
const MinimalSvgIllustration: React.FC<{
  type: 'trophy' | 'medal' | 'stars';
  isInView: boolean;
}> = ({ type, isInView }) => {
  return (
    <div className="w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center p-4">
      {type === 'trophy' && (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <motion.path
            d="M30 20 H70 V45 C70 56 61 65 50 65 C39 65 30 56 30 45 Z"
            stroke="#D7E2EA"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <motion.path
            d="M30 26 H18 C14 26 12 32 15 38 L22 46 C25 50 29 48 30 48"
            stroke="#D7E2EA"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <motion.path
            d="M70 26 H82 C86 26 88 32 85 38 L78 46 C75 50 71 48 70 48"
            stroke="#D7E2EA"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <motion.path
            d="M50 65 V80 M35 80 H65"
            stroke="#D7E2EA"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <motion.circle
            cx="50"
            cy="42"
            r="8"
            stroke="#B600A8"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.0, delay: 0.6 }}
          />
        </svg>
      )}

      {type === 'medal' && (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <motion.path
            d="M35 15 L50 42 L65 15"
            stroke="#D7E2EA"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <motion.circle
            cx="50"
            cy="58"
            r="24"
            stroke="#D7E2EA"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <motion.circle
            cx="50"
            cy="58"
            r="16"
            stroke="#BE4C00"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          />
          <motion.path
            d="M50 48 L53 54 L60 55 L55 60 L56 67 L50 63 L44 67 L45 60 L40 55 L47 54 Z"
            stroke="#D7E2EA"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.0, delay: 0.6 }}
          />
        </svg>
      )}

      {type === 'stars' && (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <motion.circle
            cx="50"
            cy="50"
            r="36"
            stroke="#D7E2EA"
            strokeWidth="1"
            strokeDasharray="6 6"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <motion.polygon
            points="50,22 58,40 78,42 62,56 68,76 50,64 32,76 38,56 22,42 42,40"
            stroke="#D7E2EA"
            strokeWidth="1.5"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="5"
            fill="#B600A8"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          />
        </svg>
      )}
    </div>
  );
};

const StackingPrizeCard: React.FC<{
  prize: PrizeData;
  index: number;
  total: number;
}> = ({ prize, index, total }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });
  const [animatedAmount, setAnimatedAmount] = useState(0);
  const { prefersReducedMotion } = useConvergeConfig();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Entry tilt: from 3deg rotateX to 0deg as card reaches sticky zone
  const rotateX = useTransform(scrollYProgress, [0, 0.35], [prefersReducedMotion ? 0 : 3.5, 0]);
  
  // Stacking scale: card scales down slightly (0.94 - 1.0) and dims as cards stack above
  const targetScale = 1 - (total - 1 - index) * 0.04;
  const scale = useTransform(scrollYProgress, [0.35, 0.85], [1, targetScale]);
  const opacity = useTransform(scrollYProgress, [0.35, 0.9], [1, 0.82]);

  useEffect(() => {
    if (isInView) {
      if (prefersReducedMotion) {
        setAnimatedAmount(prize.amount);
        return;
      }
      const controls = animate(0, prize.amount, {
        duration: 1.6,
        ease: [0.25, 0.1, 0.25, 1],
        onUpdate: (val) => setAnimatedAmount(Math.floor(val)),
      });
      return () => controls.stop();
    }
  }, [isInView, prize.amount, prefersReducedMotion]);

  const IconComp = ICON_MAP[prize.illustration];

  return (
    <div
      ref={containerRef}
      className="h-[80vh] flex items-center justify-center sticky top-24 md:top-32"
      style={{ top: `calc(${index * 24}px + 5.5rem)`, perspective: 1200 }}
    >
      <motion.div
        style={{ scale, opacity, rotateX, transformOrigin: 'top center' }}
        className="w-full max-w-5xl rounded-[40px] border border-[#D7E2EA]/12 bg-[#0C0C0C] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10 select-none will-change-transform"
      >
        {/* Left Side: Number, Label, Amount, Perks */}
        <div className="flex-1 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-heading font-black text-4xl sm:text-5xl text-white/40 leading-none">
                {prize.number}
              </span>
              <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#D7E2EA]/60">
                {prize.category}
              </span>
            </div>

            <h3 className="font-heading font-bold uppercase text-2xl sm:text-3xl text-white tracking-tight mb-6">
              {prize.label}
            </h3>

            {/* Giant Gradient Prize Amount counting up */}
            <div className="hero-heading font-heading font-black text-[clamp(3rem,7vw,6.5rem)] tracking-tight leading-none mb-8">
              ₹{animatedAmount.toLocaleString()}
            </div>
          </div>

          {/* Short perk list with Lucide icons */}
          <ul className="space-y-3 pt-6 border-t border-[#D7E2EA]/12">
            {prize.perks.map((perk, i) => (
              <li key={i} className="flex items-center gap-3 text-xs sm:text-sm text-[#D7E2EA]/80 font-light">
                <IconComp className="w-4 h-4 text-white/50 shrink-0" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side (md+): Minimal Code-Drawn Thin Line SVG */}
        <div className="hidden md:flex items-center justify-center border-l border-[#D7E2EA]/12 pl-12">
          <MinimalSvgIllustration type={prize.illustration} isInView={isInView} />
        </div>
      </motion.div>
    </div>
  );
};

export const PrizesSection: React.FC = () => {
  return (
    <section
      id="prizes"
      className="bg-[#0C0C0C] text-[#D7E2EA] py-28 sm:py-36 md:py-48 px-6 md:px-10 border-t border-[#D7E2EA]/12 relative select-none"
    >
      <div className="max-w-5xl mx-auto mb-16 text-center">
        <span className="text-[0.75rem] uppercase tracking-[0.3em] text-[#D7E2EA]/60 font-mono block mb-4">
          04 &mdash; Prizes
        </span>
        <h2 className="hero-heading font-heading font-black uppercase text-[clamp(2.5rem,8vw,7rem)] tracking-tight leading-none">
          <ConvergeText text="PRIZES" mode="letters" stagger={0.04} />
        </h2>
      </div>

      {/* 3 Sticky-Stacking Cards */}
      <div className="flex flex-col relative w-full max-w-5xl mx-auto pb-24">
        {EVENT_DATA.prizes.map((prize, idx) => (
          <StackingPrizeCard
            key={prize.id}
            prize={prize}
            index={idx}
            total={EVENT_DATA.prizes.length}
          />
        ))}
      </div>
    </section>
  );
};
