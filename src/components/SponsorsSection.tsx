import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { EVENT_DATA } from '../data/event';

export const SponsorsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Calm scroll-linked motion
  const scrollX = useTransform(scrollYProgress, [0, 1], ['0%', '-33%']);

  // Tripled list for infinite seamless feel
  const tripledSponsors = [
    ...EVENT_DATA.sponsors,
    ...EVENT_DATA.sponsors,
    ...EVENT_DATA.sponsors,
  ];

  return (
    <section
      id="sponsors"
      ref={sectionRef}
      className="bg-[#0C0C0C] py-28 overflow-hidden w-full select-none relative border-t border-[#D7E2EA]/12"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 text-center mb-12">
        <FadeIn delay={0} y={16}>
          <span className="text-[0.75rem] uppercase tracking-[0.3em] text-[#D7E2EA]/60 font-mono">
            Backed By
          </span>
        </FadeIn>
      </div>

      {/* ONE calm row: scroll-linked marquee */}
      <motion.div
        style={{ x: scrollX }}
        className="flex gap-4 sm:gap-6 whitespace-nowrap will-change-transform px-6"
      >
        {tripledSponsors.map((sponsor, idx) => (
          <div
            key={`${sponsor.id}-${idx}`}
            className="w-[200px] h-[96px] shrink-0 rounded-2xl border border-[#D7E2EA]/12 bg-[#101015]/60 p-4 flex flex-col justify-between items-center text-center transition-all duration-300 hover:border-[#D7E2EA]/35 group cursor-pointer"
          >
            <span className="text-[9px] uppercase font-mono tracking-widest text-[#D7E2EA]/40">
              {sponsor.category}
            </span>
            <div className="font-heading font-black text-sm tracking-tight uppercase text-[#D7E2EA]/70 group-hover:text-white transition-colors">
              {sponsor.name}
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#B600A8] transition-colors" />
          </div>
        ))}
      </motion.div>
    </section>
  );
};
