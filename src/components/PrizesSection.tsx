import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import { Trophy, Award, Gift, Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { GhostButton } from './GhostButton';
import { EVENT_DATA, PrizeCardData } from '../data/event';

// Animated SVG Trophy / Medal for Panel C (Code-generated, NO IMAGES)
const TrophyVisual: React.FC<{ tier: 'gold' | 'silver' | 'bronze' }> = ({ tier }) => {
  const isGold = tier === 'gold';
  const isSilver = tier === 'silver';

  const mainColor = isGold ? '#f59e0b' : isSilver ? '#94a3b8' : '#d97706';
  const strokeColor = isGold ? '#fde047' : isSilver ? '#cbd5e1' : '#f59e0b';

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-6">
      {/* Rotating Conic-Gradient Glow */}
      <div
        className="absolute w-72 h-72 rounded-full opacity-35 animate-spin blur-3xl pointer-events-none"
        style={{
          background: `conic-gradient(from 0deg, ${mainColor}, #B600A8, #38bdf8, ${mainColor})`,
          animationDuration: '16s',
        }}
      />

      {/* Floating Sparkle Particles */}
      <motion.div
        animate={{ y: [-6, 6, -6], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-8 right-12 text-amber-300"
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>
      <motion.div
        animate={{ y: [6, -6, 6], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-10 left-10 text-cyan-300"
      >
        <Sparkles className="w-5 h-5" />
      </motion.div>

      {/* Code-Generated SVG Trophy / Badge Group */}
      <svg className="w-3/5 h-3/5 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]" viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id={`grad-${tier}`} x1="0" y1="0" x2="100" y2="100">
            <stop offset="0%" stopColor={strokeColor} />
            <stop offset="70%" stopColor={mainColor} />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
        </defs>

        {isGold || isSilver ? (
          <>
            {/* Trophy Cup */}
            <path
              d="M26 22 H74 V46 C74 58 63 68 50 68 C37 68 26 58 26 46 Z"
              fill={`url(#grad-${tier})`}
              stroke={strokeColor}
              strokeWidth="2"
            />
            {/* Handles */}
            <path d="M26 28 H14 C9 28 7 35 11 42 L18 52 C22 57 26 55 26 55" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M74 28 H86 C91 28 93 35 89 42 L82 52 C78 57 74 55 74 55" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
            {/* Stem & Base */}
            <rect x="46" y="68" width="8" height="15" fill={mainColor} stroke={strokeColor} strokeWidth="1" />
            <rect x="28" y="83" width="44" height="9" rx="3" fill="#1e1b2e" stroke={strokeColor} strokeWidth="1.5" />
            {/* Medallion Star */}
            <polygon points="50,32 52,38 58,38 53,42 55,48 50,44 45,48 47,42 42,38 48,38" fill="#ffffff" />
          </>
        ) : (
          /* Bronze / Track Winners: Multi-Badge Target Stack */
          <>
            <circle cx="50" cy="50" r="42" fill="#14141d" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="50" cy="50" r="32" fill="url(#grad-bronze)" stroke="#fde047" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="20" fill="#0C0C0C" stroke="#f59e0b" strokeWidth="1.5" />
            <polygon points="50,38 53,46 61,46 55,51 57,59 50,54 43,59 45,51 39,46 47,46" fill="#fde047" />
          </>
        )}
      </svg>
    </div>
  );
};

const StackingPrizeCard: React.FC<{
  prize: PrizeCardData;
  index: number;
  totalCards: number;
  onRegisterClick?: () => void;
}> = ({ prize, index, totalCards, onRegisterClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const [animatedAmount, setAnimatedAmount] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, prize.amount, {
        duration: 1.6,
        ease: 'easeOut',
        onUpdate: (val) => setAnimatedAmount(Math.floor(val)),
      });
      return () => controls.stop();
    }
  }, [isInView, prize.amount]);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] flex items-center justify-center sticky top-24 md:top-32"
      style={{ top: `calc(${index * 28}px + 5.5rem)` }}
    >
      <motion.div
        style={{ scale }}
        className="w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-2xl select-none"
      >
        {/* Top Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#D7E2EA]/15">
          <div className="flex items-baseline gap-4 sm:gap-6">
            <span className="font-black text-[clamp(2.5rem,6vw,90px)] text-[#D7E2EA] leading-none tracking-tight">
              {prize.number}
            </span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-medium uppercase tracking-widest text-[#D7E2EA]/60">
                {prize.category}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase text-[#D7E2EA] tracking-wide">
                {prize.name}
              </h3>
            </div>
          </div>

          <div>
            <GhostButton label="Register" onClick={onRegisterClick} href="#register" />
          </div>
        </div>

        {/* Bottom Row - 40/60 Grid entirely Code-Generated */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-4 sm:gap-6 pt-6 flex-1 items-stretch">
          {/* Left Column (40% width) - 2 Stacked Panels */}
          <div className="md:col-span-4 flex flex-col gap-4 sm:gap-6 justify-between">
            {/* Panel A (small): Giant Gradient Prize Amount Count-Up */}
            <div className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/15 p-6 flex flex-col justify-center items-center text-center h-[clamp(130px,16vw,210px)] relative overflow-hidden shadow-lg">
              <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-300 mb-1">
                HARD CASH GRANT
              </span>
              <div className="hero-heading font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-none">
                ₹{animatedAmount.toLocaleString()}
              </div>
            </div>

            {/* Panel B (medium): Perks List with Lucide Icons */}
            <div className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#121218] border border-white/15 p-6 flex flex-col justify-center gap-2.5 h-[clamp(160px,22vw,310px)] relative overflow-hidden shadow-lg">
              <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative z-10 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/50 mb-1">
                <Gift className="w-3.5 h-3.5 text-[#B600A8]" />
                <span>INCLUDED REWARDS</span>
              </div>
              <ul className="relative z-10 space-y-2 text-xs sm:text-sm text-white/90">
                {prize.perks.map((perk, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column (60% width) - 1 Tall Code-Generated Trophy Visual */}
          <div className="md:col-span-6 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-gradient-to-b from-[#14141e] to-[#0a0a0f] border border-white/15 overflow-hidden flex items-center justify-center min-h-[300px] md:min-h-full shadow-2xl relative">
            <TrophyVisual tier={prize.tier} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const PrizesSection: React.FC<{ onRegisterClick?: () => void }> = ({ onRegisterClick }) => {
  return (
    <section
      id="prizes"
      className="bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative pt-20 sm:pt-28 pb-32 px-4 sm:px-6 md:px-10 select-none"
    >
      <div className="max-w-6xl mx-auto mb-16 sm:mb-20 text-center">
        <FadeIn delay={0} y={40}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#BBCCD7] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>₹3,00,000 Total Bounty</span>
          </div>
          <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none tracking-tight">
            Prizes
          </h2>
        </FadeIn>
      </div>

      {/* 3 Stacking Prize Cards */}
      <div className="flex flex-col relative w-full max-w-6xl mx-auto pb-20">
        {EVENT_DATA.prizes.map((prize, index) => (
          <StackingPrizeCard
            key={prize.id}
            prize={prize}
            index={index}
            totalCards={EVENT_DATA.prizes.length}
            onRegisterClick={onRegisterClick}
          />
        ))}
      </div>
    </section>
  );
};
