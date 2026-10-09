import React from 'react';
import { SmoothScroll } from './components/SmoothScroll';
import { ScrollProgress } from './components/ScrollProgress';
import { SpotlightGrid } from './components/SpotlightGrid';
import { SectionDots } from './components/SectionDots';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { TracksSection } from './components/TracksSection';
import { TimelineSection } from './components/TimelineSection';
import { PrizesSection } from './components/PrizesSection';
import { JudgingSection } from './components/JudgingSection';
import { SponsorsSection } from './components/SponsorsSection';
import { RegisterSection } from './components/RegisterSection';
import { Footer } from './components/Footer';

export default function App() {
  const scrollToRegister = () => {
    const el = document.getElementById('register');
    if (el) {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(el, { offset: -20 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <SmoothScroll>
      <div
        className="bg-[#0C0C0C] text-[#D7E2EA] min-h-screen w-full relative selection:bg-[#B600A8]/30 selection:text-cyan-200"
        style={{ overflowX: 'clip' }}
      >
        {/* Top Fixed Accent Progress Bar */}
        <ScrollProgress />

        {/* Fixed Background Subtle Grid Texture + Ambient Cursor Spotlight */}
        <SpotlightGrid />

        {/* Fixed Right-Edge Section Dots Nav */}
        <SectionDots />

        {/* 1. HERO SECTION */}
        <HeroSection onRegisterClick={scrollToRegister} />

        {/* 2. MARQUEE SECTION */}
        <MarqueeSection />

        {/* 3. ABOUT SECTION */}
        <AboutSection onRegisterClick={scrollToRegister} />

        {/* 4. TRACKS SECTION */}
        <TracksSection />

        {/* 5. TIMELINE SECTION (2-Day Tabbed Roadmap) */}
        <TimelineSection />

        {/* 6. PRIZES SECTION (Clean 3-Column Awards Deck) */}
        <PrizesSection onRegisterClick={scrollToRegister} />

        {/* 7. JUDGING SECTION */}
        <JudgingSection />

        {/* 8. SPONSORS SECTION */}
        <SponsorsSection />

        {/* 9. REGISTER SECTION (+ 3-Step Form + Confetti + FAQ Accordion) */}
        <RegisterSection />

        {/* 10. FOOTER (+ Giant Title + Contact Links + Back to Top) */}
        <Footer onRegisterClick={scrollToRegister} />
      </div>
    </SmoothScroll>
  );
}
