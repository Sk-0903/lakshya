import React, { useRef, useState, useEffect } from 'react';
import {
  Terminal,
  Layers,
  Code2,
  Rocket,
  Database,
  Send,
  Shield,
  Mail,
  Sparkles,
} from 'lucide-react';
import { FadeIn } from './FadeIn';
import { EVENT_DATA, SponsorData } from '../data/event';

const SPONSOR_ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Terminal,
  Layers,
  Code2,
  Rocket,
  Database,
  Send,
  Shield,
  Mail,
};

const SponsorTile: React.FC<{ sponsor: SponsorData }> = ({ sponsor }) => {
  const IconComponent = SPONSOR_ICON_MAP[sponsor.icon] || Sparkles;

  return (
    <div className="w-[220px] h-[110px] shrink-0 rounded-2xl border border-[#D7E2EA]/20 bg-[#101015] p-4 flex flex-col justify-between items-center text-center select-none shadow-lg transition-all duration-300 grayscale hover:grayscale-0 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(56,189,248,0.25)] group cursor-pointer">
      <div className="flex items-center justify-between w-full">
        <span className="text-[9px] font-mono uppercase tracking-wider text-white/40 group-hover:text-cyan-300">
          {sponsor.category}
        </span>
        <IconComponent className="w-4 h-4 text-white/50 group-hover:text-[#B600A8] transition-colors" />
      </div>

      <div className="my-auto">
        <span className="font-black text-xl tracking-tight uppercase text-white group-hover:text-cyan-200 transition-colors">
          {sponsor.name}
        </span>
      </div>

      <span className="text-[9px] uppercase font-mono tracking-widest text-white/30">
        {sponsor.tier}
      </span>
    </div>
  );
};

export const SponsorsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const calculatedOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.25;
      setOffset(calculatedOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tripledSponsors = [
    ...EVENT_DATA.sponsors,
    ...EVENT_DATA.sponsors,
    ...EVENT_DATA.sponsors,
  ];

  const transformStyle = `translateX(${-(offset - 150)}px)`;

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] py-20 overflow-hidden w-full select-none relative"
    >
      <div className="max-w-6xl mx-auto px-6 text-center mb-10">
        <FadeIn delay={0} y={20}>
          <h3 className="uppercase tracking-[0.4em] text-sm text-[#D7E2EA]/60 font-mono font-medium">
            Backed By Industry Leaders
          </h3>
        </FadeIn>
      </div>

      {/* Single-Row Scroll-Driven Marquee (Moves LEFT) */}
      <div
        className="flex gap-4 whitespace-nowrap"
        style={{
          transform: transformStyle,
          willChange: 'transform',
        }}
      >
        {tripledSponsors.map((sponsor, index) => (
          <SponsorTile key={`${sponsor.id}-${index}`} sponsor={sponsor} />
        ))}
      </div>
    </section>
  );
};
