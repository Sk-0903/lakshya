import React from 'react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';

interface AboutSectionProps {
  onContactClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  const bioText =
    "With 25 years of educational excellence, SJBIT presents Lakshya '26 — a premier 36-hour national hackathon uniting 1,200+ elite engineers, designers, and innovators. Compete for ₹15,00,000+ in prizes, solve real-world industry challenges, and present your best ideas. Let's build something incredible together!";

  return (
    <section
      id="about"
      className="relative min-h-screen bg-[#0C0C0C] flex flex-col justify-center items-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden select-none"
    >
      {/* Decorative 3D Corner Object 1: Top-Left (Moon) */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10 pointer-events-none"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="3D Moon Object"
          className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
          loading="lazy"
        />
      </FadeIn>

      {/* Decorative 3D Corner Object 2: Bottom-Left (3D object) */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10 pointer-events-none"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="3D Geometric Object"
          className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
          loading="lazy"
        />
      </FadeIn>

      {/* Decorative 3D Corner Object 3: Top-Right (Lego icon) */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10 pointer-events-none"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt="3D Lego Object"
          className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
          loading="lazy"
        />
      </FadeIn>

      {/* Decorative 3D Corner Object 4: Bottom-Right (3D group) */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-10 pointer-events-none"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt="3D Composition Object"
          className="w-[130px] sm:w-[170px] md:w-[220px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
          loading="lazy"
        />
      </FadeIn>

      {/* Content wrapper */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[clamp(2.8rem,11vw,150px)]">
            About Lakshya
          </h2>
        </FadeIn>

        {/* Animated paragraph */}
        <div className="mt-10 sm:mt-14 md:mt-16">
          <AnimatedText
            text={bioText}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[620px] mx-auto text-[clamp(1rem,2vw,1.35rem)]"
          />
        </div>

        {/* Contact button */}
        <div className="mt-16 sm:mt-20 md:mt-24">
          <FadeIn delay={0.2} y={20}>
            <ContactButton
              onClick={onContactClick}
              href="#register"
              label="Register Team"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
