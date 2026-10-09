import React from 'react';
import { Target, Sparkles } from 'lucide-react';
import { FadeIn } from './FadeIn';
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
      className="relative min-h-screen bg-[#0C0C0C] flex flex-col justify-center items-center px-6 sm:px-10 py-32 overflow-hidden select-none"
    >
      {/* Subtle 3D Corner Accent Shapes */}
      <DecorativeShapes />

      {/* Main Content Column with Generous Vertical Rhythm */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto w-full">
        {/* Section Badge */}
        <FadeIn delay={0} y={15}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-widest text-[#BBCCD7] mb-8">
            <Target className="w-3.5 h-3.5 text-cyan-400" />
            <span>Mission &bull; Lakshya &apos;26</span>
          </div>
        </FadeIn>

        {/* Section Heading */}
        <FadeIn delay={0.1} y={25}>
          <h2 className="hero-heading font-heading font-black uppercase tracking-tight text-center text-5xl sm:text-6xl md:text-7xl mb-8">
            Aim Higher. Build Bold.
          </h2>
        </FadeIn>

        {/* Breathable, Legible About Paragraph */}
        <FadeIn delay={0.2} y={20} className="w-full max-w-2xl mx-auto">
          <p className="text-[#D7E2EA]/85 font-normal text-base sm:text-lg leading-relaxed text-center">
            {EVENT_DATA.aboutParagraph}
          </p>
        </FadeIn>

        {/* CTA Button */}
        <FadeIn delay={0.3} y={20} className="mt-12">
          <ContactButton
            label="Register Your Squad"
            onClick={onRegisterClick}
            href="#register"
          />
        </FadeIn>

        {/* Live Typing Terminal Card with Spaced Margin */}
        <div className="mt-20 w-full flex justify-center">
          <FadeIn delay={0.35} y={25} className="w-full flex justify-center">
            <TerminalCard />
          </FadeIn>
        </div>

        {/* Stats Strip with Distinct Spacing */}
        <div className="w-full mt-16">
          <FadeIn delay={0.4} y={25}>
            <StatsStrip />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
