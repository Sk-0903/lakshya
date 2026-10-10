import React from 'react';
import { FadeIn } from './FadeIn';
import { ConvergeText } from './motion/ConvergeText';

interface SectionHeaderProps {
  label: string;
  title: string;
  headingId?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  headingId,
  className = '',
}) => {
  return (
    <div className={`mb-12 sm:mb-14 md:mb-16 ${className}`}>
      {/* Label: 12-13px, tracking 0.25-0.3em, muted blue-grey */}
      <FadeIn delay={0} y={12}>
        <span className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.28em] text-[#D7E2EA]/60 block mb-3 sm:mb-4">
          {label}
        </span>
      </FadeIn>

      {/* Heading: Converges words into place as heading scrolls into view */}
      <div className="w-full">
        <ConvergeText
          text={title}
          id={headingId}
          className="hero-heading font-heading font-black uppercase text-[clamp(2.5rem,7vw,6rem)] tracking-tight leading-[0.95] text-balance block"
        />
      </div>
    </div>
  );
};
