import React from 'react';
import { SectionHeader } from './SectionHeader';
import { FadeIn } from './FadeIn';
import { EVENT_DATA } from '../data/event';

export const SponsorsSection: React.FC = () => {
  return (
    <section
      id="sponsors"
      aria-labelledby="sponsors-heading"
      className="bg-[#0C0C0C] text-[#D7E2EA] py-20 sm:py-[104px] md:py-32 border-t border-[#D7E2EA]/12 select-none"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Unified Section Header */}
        <SectionHeader
          label="BACKED BY"
          title="INDUSTRY PARTNERS"
          headingId="sponsors-heading"
          className="mb-12 sm:mb-14 md:mb-16"
        />

        {/* Responsive Static Grid: 3 cols desktop, 2 cols tablet, 1 or 2 cols mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {EVENT_DATA.sponsors.map((sponsor, idx) => (
            <FadeIn key={sponsor.id} delay={idx * 0.05} y={16} className="h-full">
              <div className="h-full min-h-[150px] sm:min-h-[160px] rounded-2xl border border-[#D7E2EA]/12 bg-[#101015] p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:border-[#B600A8]/50 group cursor-default min-w-0">
                {/* Category label aligned top-left */}
                <span className="text-[11px] sm:text-[12px] uppercase font-mono tracking-[0.25em] text-[#D7E2EA]/60 block mb-4">
                  {sponsor.category}
                </span>

                {/* Sponsor name in clean, high-contrast Kanit typography */}
                <div className="my-auto py-2">
                  <span className="font-heading font-black text-xl sm:text-2xl tracking-tight uppercase text-white group-hover:text-cyan-200 transition-colors block text-balance">
                    {sponsor.name}
                  </span>
                </div>

                {/* Subtle indicator dot */}
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D7E2EA]/30">
                    Official Sponsor
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#B600A8] transition-colors" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
