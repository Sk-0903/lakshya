import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import { Trophy, Gift, Sparkles, CheckCircle2 } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { GhostButton } from './GhostButton';
import { EVENT_DATA, PrizeCardData } from '../data/event';

const TrophyVisual: React.FC<{ tier: 'gold' | 'silver' | 'bronze' }> = ({ tier }) => {
  const isGold = tier === 'gold';
  const isSilver = tier === 'silver';

  const mainColor = isGold ? '#f59e0b' : isSilver ? '#94a3b8' : '#d97706';
  const strokeColor = isGold ? '#fde047' : isSilver ? '#cbd5e1' : '#f59e0b';

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-6">
      <div
        className="absolute w-72 h-72 rounded-full opacity-30 animate-spin blur-3xl pointer-events-none"
        style={{
          background: `conic-gradient(from 0deg, ${mainColor}, #B600A8, #38bdf8, ${mainColor})`,
          animationDuration: '20s',
        }}
      />

      <motion.div
        animate={{ y: [-5, 5, -5], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-8 right-12 text-amber-300"
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>

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
            <path
              d="M26 22 H74 V46 C74 58 63 68 50 68 C37 68 26 58 26 46 Z"
              fill={`url(#grad-${tier})`}
              stroke={strokeColor}
              strokeWidth="2"
            />
            <path d="M26 28 H14 C9 28 7 35 11 42 L18 52 C22 57 26 55 26 55" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M74 28 H86 C91 28 93 35 89 42 L82 52 C78 57 74 55 74 55" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
            <rect x="46" y="68" width="8" height="15" fill={mainColor} stroke={strokeColor} strokeWidth="1" />
            <rect x="28" y="83" width="44" height="9" rx="3" fill="#1e1b2e" stroke={strokeColor} strokeWidth="1.5" />
            <polygon points="50,32 52,38 58,38 53,42 55,48 50,44 45,48 47,42 42,38 48,38" fill="#ffffff" />
          </>
        ) : (
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
        duration: 1.4,
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
        className="w-full max-w-5xl rounded-[36px] sm:rounded-[44px] border-2 border-white/20 bg-[#101015] p-6 sm:p-8 md:p-10 flex flex-col justify-between shadow-2xl select-none"
      >
        {/* Top Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-baseline gap-4 sm:gap-6">
            <span className="font-heading font-black text-5xl sm:text-6xl text-white leading-none">
              {prize.number}
            </span>
            <div className="flex flex-col">
              <span className="text-xs uppercase font-mono tracking-widest text-cyan-400">
                {prize.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-bold uppercase text-white tracking-tight">
                {prize.name}
              </h3>
            </div>
          </div>

          <div>
            <GhostButton label="Claim Spot" onClick={onRegisterClick} href="#register" />
          </div>
        </div>

        {/* Bottom 40/60 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6 pt-6 flex-1 items-stretch">
          {/* Left Column (40%) */}
          <div className="md:col-span-4 flex flex-col gap-5 justify-between">
            {/* Prize Amount Panel */}
            <div className="rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/15 p-6 flex flex-col justify-center items-center text-center shadow-lg">
              <span className="text-[10px] uppercase font-mono tracking-widest text-white/50 mb-1.5">
                CASH REWARD
              </span>
              <div className="font-heading font-black text-4xl sm:text-5xl text-white tracking-tight leading-none">
                ₹{animatedAmount.toLocaleString()}
              </div>
            </div>

            {/* Perks Panel */}
            <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-center gap-3 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/50">
                <Gift className="w-3.5 h-3.5 text-[#B600A8]" />
                <span>INCLUDED BENEFITS</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-white/80">
                {prize.perks.map((perk, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column (60%): Trophy Graphic */}
          <div className="md:col-span-6 rounded-3xl bg-gradient-to-b from-[#161622] to-[#0c0c12] border border-white/10 overflow-hidden flex items-center justify-center min-h-[260px] shadow-2xl relative">
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
      className="bg-[#0C0C0C] text-[#D7E2EA] border-t border-white/[0.06] relative z-10 pt-28 sm:pt-36 pb-32 px-6 sm:px-10 select-none"
    >
      <div className="max-w-5xl mx-auto mb-16 text-center">
        <FadeIn delay={0} y={20}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono uppercase tracking-widest text-amber-300 mb-4">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>₹45,000 Total Prize Pool</span>
          </div>
          <h2 className="hero-heading font-heading font-black uppercase text-5xl sm:text-6xl md:text-7xl tracking-tight leading-none mb-4">
            Bounties &amp; Awards
          </h2>
          <p className="text-sm sm:text-base text-[#D7E2EA]/70 max-w-lg mx-auto">
            Hard cash grants, official trophies, developer toolkits, and certificates for the top innovators.
          </p>
        </FadeIn>
      </div>

      {/* 3 Stacking Prize Cards */}
      <div className="flex flex-col relative w-full max-w-5xl mx-auto pb-20">
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
