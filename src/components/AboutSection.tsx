import React from 'react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { StatsStrip } from './StatsStrip';
import { EVENT_DATA } from '../data/event';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen bg-[#0C0C0C] text-[#D7E2EA] flex flex-col justify-center items-center py-28 sm:py-36 md:py-48 px-6 md:px-10 border-t border-[#D7E2EA]/12 select-none"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center text-center">
        {/* Section Label: 01 — About */}
        <FadeIn delay={0} y={16}>
          <span className="text-[0.75rem] uppercase tracking-[0.3em] text-[#D7E2EA]/60 font-mono block mb-6">
            01 &mdash; About
          </span>
        </FadeIn>

        {/* Section Heading */}
        <FadeIn delay={0.1} y={20}>
          <h2 className="hero-heading font-heading font-black uppercase text-[clamp(2.5rem,8vw,7rem)] tracking-tight leading-none mb-12">
            About Lakshya
          </h2>
        </FadeIn>

        {/* Scrubbed Character-by-Character Animated Text */}
        <div className="w-full max-w-[640px] mx-auto text-center px-4">
          <AnimatedText
            text={EVENT_DATA.aboutText}
            className="text-[clamp(1rem,1.3vw,1.25rem)] font-light leading-relaxed text-[#D7E2EA]"
          />
        </div>

        {/* Stats Strip with Generous mt-24 Spacing */}
        <div className="w-full mt-24">
          <FadeIn delay={0.2} y={24}>
            <StatsStrip />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
