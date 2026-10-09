import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
    <div className="w-[220px] h-[110px] shrink-0 rounded-2xl border border-[#D7E2EA]/15 bg-[#121217] p-4 flex flex-col justify-between items-center text-center select-none shadow-md transition-all duration-300 hover:border-cyan-400/50 hover:bg-[#16161e] group cursor-pointer">
      <div className="flex items-center justify-between w-full">
        <span className="text-[9px] font-mono uppercase tracking-wider text-white/40 group-hover:text-cyan-300">
          {sponsor.category}
        </span>
        <IconComponent className="w-4 h-4 text-white/40 group-hover:text-[#B600A8] transition-colors" />
      </div>

      <div className="my-auto">
        <span className="font-heading font-black text-xl tracking-tight uppercase text-white group-hover:text-cyan-200 transition-colors">
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
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const scrollX = useTransform(scrollYProgress, [0, 1], [0, -180]);

  const doubledSponsors = [
    ...EVENT_DATA.sponsors,
    ...EVENT_DATA.sponsors,
    ...EVENT_DATA.sponsors,
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] py-20 overflow-hidden w-full select-none relative border-t border-white/[0.04]"
    >
      <div className="max-w-6xl mx-auto px-6 text-center mb-10">
        <FadeIn delay={0} y={15}>
          <h3 className="uppercase tracking-[0.35em] text-xs text-[#D7E2EA]/50 font-mono font-medium">
            Backed By Industry Leaders
          </h3>
        </FadeIn>
      </div>

      {/* Single-Row Compositor Scroll Marquee */}
      <motion.div
        style={{ x: scrollX }}
        className="flex gap-4 whitespace-nowrap will-change-transform"
      >
        {doubledSponsors.map((sponsor, index) => (
          <SponsorTile key={`${sponsor.id}-${index}`} sponsor={sponsor} />
        ))}
      </motion.div>
    </section>
  );
};
