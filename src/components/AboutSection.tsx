import React from 'react';
import { SectionHeader } from './SectionHeader';
import { AnimatedText } from './AnimatedText';
import { StatsStrip } from './StatsStrip';
import { FadeIn } from './FadeIn';
import { EVENT_DATA } from '../data/event';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative bg-[#0C0C0C] text-[#D7E2EA] py-20 sm:py-[104px] md:py-32 border-t border-[#D7E2EA]/12 select-none"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Unified Section Header */}
        <SectionHeader
          label="01 — ABOUT"
          title="ABOUT LAKSHYA"
          headingId="about-heading"
          className="mb-6 sm:mb-8"
        />

        {/* Paragraph: Aligned on the exact same axis, constrained to 64ch */}
        <FadeIn delay={0.15} y={16}>
          <div className="max-w-[64ch]">
            <AnimatedText
              text={EVENT_DATA.aboutText}
              className="text-[clamp(1rem,1.2vw,1.125rem)] text-[#D7E2EA]/90"
            />
          </div>
        </FadeIn>

        {/* Stats Strip with 64-96px gap */}
        <div className="mt-16 sm:mt-20 md:mt-24">
          <FadeIn delay={0.2} y={20}>
            <StatsStrip />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
