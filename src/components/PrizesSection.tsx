import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Trophy, Gift, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { EVENT_DATA, PrizeCardData } from '../data/event';

const TrophyVisual: React.FC<{ tier: 'gold' | 'silver' | 'bronze' }> = ({ tier }) => {
  const isGold = tier === 'gold';
  const isSilver = tier === 'silver';

  const mainColor = isGold ? '#f59e0b' : isSilver ? '#94a3b8' : '#d97706';
  const strokeColor = isGold ? '#fde047' : isSilver ? '#cbd5e1' : '#f59e0b';

  return (
    <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto flex items-center justify-center overflow-hidden my-2">
      <div
        className="absolute inset-0 rounded-full opacity-25 blur-xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${mainColor} 0%, transparent 70%)`,
        }}
      />

      <svg className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]" viewBox="0 0 100 100" fill="none">
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

const PrizeCard: React.FC<{
  prize: PrizeCardData;
  index: number;
  onRegisterClick?: () => void;
}> = ({ prize, index, onRegisterClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-40px' });
  const [animatedAmount, setAnimatedAmount] = useState(0);

  const isGold = prize.tier === 'gold';
  const isSilver = prize.tier === 'silver';

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
      className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
        isGold
          ? 'bg-[#151520] border-2 border-amber-400/50 shadow-[0_0_30px_rgba(245,158,11,0.15)] md:-translate-y-3 z-20'
          : isSilver
          ? 'bg-[#111117] border border-cyan-400/30 shadow-xl z-10'
          : 'bg-[#111117] border border-white/10 shadow-xl z-10'
      }`}
    >
      {/* Top Banner Tag */}
      {isGold && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-300 text-black text-[11px] font-mono font-bold uppercase tracking-widest shadow-md">
          Grand Champion
        </div>
      )}

      {/* Header Info */}
      <div>
        <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/10">
          <span className="font-heading font-black text-3xl sm:text-4xl text-white/40 leading-none">
            {prize.number}
          </span>
          <span
            className={`text-xs uppercase font-mono tracking-wider px-2.5 py-1 rounded-full ${
              isGold
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                : isSilver
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                : 'bg-white/10 text-white/70 border border-white/15'
            }`}
          >
            {prize.category}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-heading font-bold uppercase text-white tracking-tight mt-4 text-center">
          {prize.name}
        </h3>

        {/* Trophy Visual */}
        <TrophyVisual tier={prize.tier} />

        {/* Amount Display */}
        <div className="my-4 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
          <span className="text-[10px] uppercase font-mono tracking-widest text-white/50 block mb-1">
            CASH GRANT
          </span>
          <div className="font-heading font-black text-4xl sm:text-5xl text-white tracking-tight leading-none">
            ₹{animatedAmount.toLocaleString()}
          </div>
        </div>

        {/* Perks list */}
        <div className="mt-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/50 mb-3">
            <Gift className="w-3.5 h-3.5 text-[#B600A8]" />
            <span>WHAT&apos;S INCLUDED</span>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#D7E2EA]/85">
            {prize.perks.map((perk, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Button CTA */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <a
          href="#register"
          onClick={onRegisterClick ? (e) => { e.preventDefault(); onRegisterClick(); } : undefined}
          className={`w-full py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition cursor-pointer ${
            isGold
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:opacity-95 shadow-md'
              : 'bg-white/10 hover:bg-white/15 text-white border border-white/15'
          }`}
        >
          <span>Claim Spot</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

export const PrizesSection: React.FC<{ onRegisterClick?: () => void }> = ({ onRegisterClick }) => {
  return (
    <section
      id="prizes"
      className="bg-[#0C0C0C] text-[#D7E2EA] border-t border-white/[0.06] relative z-10 pt-28 sm:pt-36 pb-32 px-6 sm:px-10 select-none"
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mx-auto mb-16 text-center">
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

        {/* 3 Responsive Prize Cards (Podium Order: 2nd, 1st, 3rd on md screens) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {/* Runner Up (2nd Place - ₹15k) */}
          <FadeIn delay={0.1} y={20} className="order-2 md:order-1 flex">
            <PrizeCard
              prize={EVENT_DATA.prizes[1]}
              index={1}
              onRegisterClick={onRegisterClick}
            />
          </FadeIn>

          {/* Winner (1st Place - ₹25k) */}
          <FadeIn delay={0.2} y={20} className="order-1 md:order-2 flex">
            <PrizeCard
              prize={EVENT_DATA.prizes[0]}
              index={0}
              onRegisterClick={onRegisterClick}
            />
          </FadeIn>

          {/* Special / Track Winners (3rd Place - ₹5k) */}
          <FadeIn delay={0.3} y={20} className="order-3 md:order-3 flex">
            <PrizeCard
              prize={EVENT_DATA.prizes[2]}
              index={2}
              onRegisterClick={onRegisterClick}
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
