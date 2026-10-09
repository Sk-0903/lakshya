import React from 'react';
import {
  Terminal,
  Cpu,
  Code2,
  Rocket,
  Trophy,
  Target,
  Sparkles,
  Layers,
  Radio,
  Flame,
  Zap,
} from 'lucide-react';

export interface TileData {
  id: number;
  type: 'terminal' | 'orb' | 'stat' | 'track' | 'code' | 'target' | 'quote';
  paletteIndex: number;
}

const PALETTES = [
  { from: '#18011F', via: '#B600A8', to: '#7621B0', accent: '#B600A8' },
  { from: '#050c1e', via: '#1d4ed8', to: '#38bdf8', accent: '#38bdf8' },
  { from: '#1f0d04', via: '#c2410c', to: '#ea580c', accent: '#BE4C00' },
];

export const TileCard: React.FC<{ tile: TileData }> = ({ tile }) => {
  const palette = PALETTES[tile.paletteIndex % PALETTES.length];

  switch (tile.type) {
    case 'terminal':
      return (
        <div className="w-[420px] h-[270px] shrink-0 rounded-2xl bg-[#111116] border border-white/10 p-5 flex flex-col justify-between font-mono text-xs select-none shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-[#B600A8]/50 group">
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-[10px] text-white/40">bash &bull; lakshya-sprint</span>
          </div>

          <div className="flex flex-col gap-2 text-white/80 my-auto">
            <p className="text-cyan-400 font-semibold">$ git commit -m &quot;ship mvp&quot;</p>
            <p className="text-emerald-400">&gt; deploying autonomous agent cluster...</p>
            <p className="text-purple-400">&#10004; build passed in 4.2s (zero errors)</p>
            <p className="text-amber-400 flex items-center gap-1">
              <span>&gt; status: 24h live hacking</span>
              <span className="inline-block w-2 h-3.5 bg-cyan-400 animate-pulse" />
            </p>
          </div>

          <div className="flex justify-between items-center text-[10px] text-white/30 pt-2 border-t border-white/5">
            <span>RAM 12.8GB / 32GB</span>
            <span className="text-emerald-400 font-bold">&#9679; ONLINE</span>
          </div>
        </div>
      );

    case 'orb':
      return (
        <div className="w-[420px] h-[270px] shrink-0 rounded-2xl bg-[#0e0e12] border border-white/10 p-6 relative overflow-hidden flex flex-col justify-between select-none shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-cyan-500/50 group">
          {/* Animated blurred mesh gradient orbs */}
          <div
            className="absolute -top-10 -left-10 w-44 h-44 rounded-full blur-3xl opacity-40 transition-transform duration-1000 group-hover:scale-125"
            style={{ background: palette.via }}
          />
          <div
            className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full blur-3xl opacity-40 transition-transform duration-1000 group-hover:scale-125"
            style={{ background: palette.accent }}
          />

          <div className="relative z-10 flex justify-between items-center">
            <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
              Interactive Arena
            </span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center my-auto">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center backdrop-blur-md mb-3 group-hover:scale-110 transition-transform">
              <Rocket className="w-8 h-8 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
            </div>
            <h4 className="text-lg font-bold uppercase tracking-wider text-white">Velocity Sprint</h4>
            <p className="text-xs text-[#D7E2EA]/60">Idea to production in 24 hours</p>
          </div>

          <div className="relative z-10 text-[10px] font-mono text-white/40 flex justify-between">
            <span>SJB TECH HUB</span>
            <span style={{ color: palette.accent }}>BUILD FAST</span>
          </div>
        </div>
      );

    case 'stat':
      return (
        <div className="w-[420px] h-[270px] shrink-0 rounded-2xl bg-[#121217] border border-white/10 p-6 flex flex-col justify-between select-none shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-purple-500/50 group">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono uppercase tracking-wider text-white/50">Benchmark</span>
            <Flame className="w-4 h-4 text-orange-400" />
          </div>

          <div className="my-auto flex flex-col">
            <span
              className="text-6xl sm:text-7xl font-black tracking-tight leading-none text-white drop-shadow-md group-hover:scale-105 transition-transform"
              style={{
                background: `linear-gradient(135deg, #ffffff 40%, ${palette.accent} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {tile.id % 3 === 0 ? '500+' : tile.id % 3 === 1 ? '24 HRS' : '₹3.0L'}
            </span>
            <span className="text-sm font-semibold uppercase tracking-widest text-[#D7E2EA]/80 mt-2">
              {tile.id % 3 === 0 ? 'Top Tier Builders' : tile.id % 3 === 1 ? 'Relentless Coding' : 'Cash & Hardware Pool'}
            </span>
          </div>

          <p className="text-[11px] text-white/40 border-t border-white/5 pt-2">
            National collegiate elite competition
          </p>
        </div>
      );

    case 'track':
      return (
        <div className="w-[420px] h-[270px] shrink-0 rounded-2xl bg-[#0f0f14] border border-white/10 p-6 flex flex-col justify-between select-none shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-amber-500/50 relative overflow-hidden group">
          {/* Subtle grid lines background */}
          <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="relative z-10 flex justify-between items-center">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-cyan-300">
              TRACK SPOTLIGHT
            </span>
            <Cpu className="w-4 h-4 text-cyan-400" />
          </div>

          <div className="relative z-10 my-auto">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-3 group-hover:rotate-6 transition-transform">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold uppercase text-white tracking-wide">
              {tile.id % 2 === 0 ? 'Autonomous AI Agents' : 'Next-Gen Decentralized'}
            </h4>
            <p className="text-xs text-[#D7E2EA]/60 mt-1 line-clamp-2">
              Build high-impact models, edge intelligence, and distributed systems.
            </p>
          </div>

          <div className="relative z-10 text-[10px] font-mono text-white/40 flex justify-between border-t border-white/5 pt-2">
            <span>PRIZE ₹50,000</span>
            <span className="text-cyan-400">EXPLORE &rarr;</span>
          </div>
        </div>
      );

    case 'code':
      return (
        <div className="w-[420px] h-[270px] shrink-0 rounded-2xl bg-[#0c0d12] border border-white/10 p-5 flex flex-col justify-between font-mono text-xs select-none shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-sky-500/50 group">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-[10px] text-emerald-400">AgentCore.ts</span>
            <span className="text-[10px] text-white/30">TypeScript 5.8</span>
          </div>

          <div className="my-auto space-y-1 text-white/90 leading-relaxed text-[11px]">
            <p>
              <span className="text-purple-400">export async function</span>{' '}
              <span className="text-cyan-300">solveChallenge</span>() &#123;
            </p>
            <p className="pl-4">
              <span className="text-purple-400">const</span> squad ={' '}
              <span className="text-amber-300">await</span> initTeam(&apos;Lakshya&apos;);
            </p>
            <p className="pl-4">
              <span className="text-purple-400">const</span> victory ={' '}
              <span className="text-sky-300">squad</span>.compile(&#123; impact:{' '}
              <span className="text-emerald-400">100</span> &#125;);
            </p>
            <p className="pl-4 text-white/50">&#47;&#47; Ship product to production</p>
            <p className="pl-4">
              <span className="text-purple-400">return</span> victory.deploy();
            </p>
            <p>&#125;</p>
          </div>

          <div className="flex justify-between items-center text-[10px] text-white/40 border-t border-white/5 pt-2">
            <span>TESTS: 42 PASSED</span>
            <span className="text-sky-400">STRICT MODE</span>
          </div>
        </div>
      );

    case 'target':
      return (
        <div className="w-[420px] h-[270px] shrink-0 rounded-2xl bg-[#121016] border border-white/10 p-5 flex items-center justify-center relative overflow-hidden select-none shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-pink-500/50 group">
          {/* SVG Concentric Target with Rotating Crosshair */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="44" stroke="#D7E2EA" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="34" stroke="#B600A8" strokeWidth="2" />
              <circle cx="50" cy="50" r="22" stroke="#7621B0" strokeWidth="2" />
              <circle cx="50" cy="50" r="10" stroke="#BE4C00" strokeWidth="3" fill="#BE4C00" fillOpacity="0.4" />
              <circle cx="50" cy="50" r="3" fill="#FFFFFF" />

              <g className="animate-spin" style={{ transformOrigin: '50px 50px', animationDuration: '10s' }}>
                <line x1="50" y1="2" x2="50" y2="98" stroke="#38bdf8" strokeOpacity="0.6" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="2" y1="50" x2="98" y2="50" stroke="#38bdf8" strokeOpacity="0.6" strokeWidth="1" strokeDasharray="2 2" />
              </g>
            </svg>
          </div>

          <div className="absolute top-4 left-4 text-[10px] font-mono text-white/40 uppercase tracking-widest">
            TARGET ACQUISITION
          </div>
          <div className="absolute bottom-4 right-4 text-[10px] font-mono text-cyan-400 uppercase">
            LOCKED: 100%
          </div>
        </div>
      );

    case 'quote':
    default:
      return (
        <div className="w-[420px] h-[270px] shrink-0 rounded-2xl bg-[#111116] border border-white/10 p-7 flex flex-col justify-between select-none shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-[#BE4C00]/50 relative overflow-hidden group">
          <div className="flex justify-between items-center">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-[10px] font-mono uppercase text-white/40">HACKER MANIFESTO</span>
          </div>

          <div className="my-auto">
            <blockquote className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white leading-tight">
              &ldquo;Ship it. Break it. Fix it. Repeat.&rdquo;
            </blockquote>
            <p className="text-xs text-amber-300/80 mt-2 font-mono uppercase tracking-wider">
              &mdash; Lakshya &apos;26 Ethos
            </p>
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-white/40 border-t border-white/5 pt-2">
            <span>SJBIT BANGALORE</span>
            <span className="text-amber-400">AIM HIGHER</span>
          </div>
        </div>
      );
  }
};

// Generate exactly 21 deterministic tiles across the 7 variants and 3 palettes
export const GENERATED_TILES: TileData[] = Array.from({ length: 21 }, (_, index) => {
  const types: TileData['type'][] = ['terminal', 'orb', 'stat', 'track', 'code', 'target', 'quote'];
  return {
    id: index + 1,
    type: types[index % types.length],
    paletteIndex: Math.floor(index / 7),
  };
});
