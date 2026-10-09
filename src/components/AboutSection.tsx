import React from 'react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';
import { DecorativeShapes } from './DecorativeShapes';
import { TerminalCard } from './TerminalCard';
import { StatsStrip } from './StatsStrip';
import { EVENT_DATA } from '../data/event';

interface AboutSectionProps {
  onRegisterClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onRegisterClick }) => {
  return (
    <section
      id="about"
      className="relative min-h-screen bg-[#0C0C0C] flex flex-col justify-center items-center px-5 sm:px-8 md:px-10 py-24 overflow-hidden select-none"
    >
      {/* 4 Code-Generated 3D Floating Corner Objects */}
      <DecorativeShapes />

      {/* Main Content Column */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-5xl mx-auto w-full">
        {/* Section Pre-Label */}
        <FadeIn delay={0} y={20}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#BBCCD7] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B600A8]" />
            <span>Mission &bull; The Flagship Sprint</span>
          </div>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.1} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[clamp(3rem,12vw,160px)]">
            About Lakshya
          </h2>
        </FadeIn>

        {/* Character-by-character Scroll-Driven Opacity Paragraph */}
        <div className="mt-10 sm:mt-14 md:mt-16 w-full max-w-[560px] mx-auto">
          <AnimatedText
            text={EVENT_DATA.aboutParagraph}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed text-[clamp(1rem,2vw,1.35rem)]"
          />
        </div>

        {/* Register CTA Button */}
        <div className="mt-16 sm:mt-20 md:mt-24">
          <FadeIn delay={0.25} y={20}>
            <ContactButton
              label="Register Now"
              onClick={onRegisterClick}
              href="#register"
            />
          </FadeIn>
        </div>

        {/* Live Typing Terminal Card */}
        <div className="mt-20 sm:mt-24 w-full flex justify-center">
          <FadeIn delay={0.3} y={30} className="w-full flex justify-center">
            <TerminalCard />
          </FadeIn>
        </div>

        {/* Count-Up Stats Strip */}
        <div className="w-full mt-10">
          <FadeIn delay={0.4} y={30}>
            <StatsStrip />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
