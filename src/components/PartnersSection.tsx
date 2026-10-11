import React, { useState } from 'react';
import { EVENT_DATA, AssociationData } from '../data/event';
import { Converge, useConvergeConfig } from './motion';

const PartnerCard: React.FC<{
  partner: AssociationData;
  index: number;
}> = ({ partner, index }) => {
  const [imageError, setImageError] = useState(false);
  const { isReducedMotion } = useConvergeConfig();

  const isLink = Boolean(partner.url && partner.url.trim().length > 0);

  const cardContent = (
    <div className="relative group">
      {/* Soft Ethereal Ambient Halo behind the white card */}
      <div className="absolute -inset-1.5 rounded-[30px] bg-gradient-to-r from-[#B600A8]/30 via-white/15 to-[#BE4C00]/30 blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Main Elevated White Card */}
      <div
        className={`w-[220px] h-[130px] sm:w-[260px] sm:h-[150px] rounded-[24px] bg-white border border-neutral-100 shadow-[0_14px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.08)] flex items-center justify-center p-6 sm:p-7 relative overflow-hidden transition-all duration-300 ${
          isLink
            ? 'group-hover:-translate-y-1 group-hover:shadow-[0_22px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(255,255,255,0.15)] focus-visible:outline-2 focus-visible:outline-[#BBCCD7] cursor-pointer'
            : 'group-hover:-translate-y-0.5'
        }`}
      >
        {/* Subtle Diagonal Specular Reflection Highlight */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-bl from-black/[0.03] to-transparent rounded-full pointer-events-none" />

        {imageError || !partner.logo ? (
          <span className="text-[#0C0C0C] font-heading font-black text-2xl sm:text-3xl uppercase tracking-wider text-center select-none">
            {partner.name}
          </span>
        ) : (
          <img
            src={partner.logo}
            alt={partner.alt || partner.name}
            width={200}
            height={100}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-contain pointer-events-none transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
    </div>
  );

  return (
    <Converge
      from="bottom"
      distance={24}
      delay={isReducedMotion ? 0 : index * 0.08}
      className="flex items-center justify-center"
    >
      {isLink ? (
        <a
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={partner.alt || partner.name}
          className="rounded-[24px] inline-block focus:outline-none"
        >
          {cardContent}
        </a>
      ) : (
        cardContent
      )}
    </Converge>
  );
};

export const PartnersSection: React.FC = () => {
  return (
    <section
      id="partners"
      aria-labelledby="partners-heading"
      className="bg-[#0C0C0C] text-[#D7E2EA] py-20 sm:py-24 md:py-28 px-5 sm:px-8 md:px-12 border-t border-[#D7E2EA]/12 relative select-none overflow-hidden"
    >
      {/* Background Soft Purple/Amber Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[500px] h-[220px] bg-gradient-to-r from-[#B600A8]/10 via-[#7621B0]/8 to-[#BE4C00]/10 blur-3xl rounded-full -translate-y-2 opacity-75" />
      </div>

      <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-center text-center relative z-10">
        {/* Section Label + Title Line */}
        <Converge from="bottom" distance={20} className="w-full flex flex-col items-center justify-center text-center">
          <span className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.28em] text-[#D7E2EA]/60 block mb-2 sm:mb-3 text-center">
            05 &mdash; PARTNERS
          </span>
          <h2
            id="partners-heading"
            className="text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.25em] text-[#D7E2EA]/75 text-center flex items-center justify-center gap-2.5"
          >
            <span>IN ASSOCIATION WITH</span>
          </h2>
        </Converge>

        {/* Centered Partner Logo Cards Row */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-6 w-full">
          {EVENT_DATA.associations.map((partner, idx) => (
            <PartnerCard key={partner.name} partner={partner} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
