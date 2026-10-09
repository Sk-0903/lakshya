import React, { useState } from 'react';
import { SmoothScroll } from './components/SmoothScroll';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
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
  const [preloaderDone, setPreloaderDone] = useState(false);

  const scrollToRegister = () => {
    const el = document.getElementById('register');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SmoothScroll>
      <div
        className="bg-[#0C0C0C] text-[#D7E2EA] min-h-screen w-full relative selection:bg-[#B600A8]/30 selection:text-cyan-200"
        style={{ overflowX: 'clip' }}
      >
        {/* Full-Screen Preloader Counter + Curtain Reveal */}
        <Preloader onComplete={() => setPreloaderDone(true)} />

        {/* Global Reticle Custom Cursor (Desktop Pointer Only) */}
        <CustomCursor />

        {/* Top Fixed Accent Progress Bar */}
        <ScrollProgress />

        {/* Fixed Background Texture + Cursor Purple Spotlight */}
        <SpotlightGrid />

        {/* Fixed Right-Edge Section Dots Nav */}
        <SectionDots />

        {/* 1. HERO SECTION */}
        <HeroSection onRegisterClick={scrollToRegister} />

        {/* 2. MARQUEE SECTION (Code-Generated Tiles with Velocity Skew) */}
        <MarqueeSection />

        {/* 3. ABOUT SECTION (+ 3D Shapes + TerminalCard + StatsStrip) */}
        <AboutSection onRegisterClick={scrollToRegister} />

        {/* 4. TRACKS SECTION (White Background) */}
        <TracksSection />

        {/* 5. TIMELINE SECTION (Pinned Horizontal Scroll-Scrub) */}
        <TimelineSection />

        {/* 6. PRIZES SECTION (Sticky-Stacking Cards with Code-Generated Panels) */}
        <PrizesSection onRegisterClick={scrollToRegister} />

        {/* 7. JUDGING SECTION (Criteria Bars + Morphing Radar Target Chart) */}
        <JudgingSection />

        {/* 8. SPONSORS SECTION (Typographic Wordmark Marquee) */}
        <SponsorsSection />

        {/* 9. REGISTER SECTION (+ 3-Step Form + Confetti + FAQ Accordion) */}
        <RegisterSection />

        {/* 10. FOOTER (+ Giant Rising Title + Contact Links + Back to Top) */}
        <Footer onRegisterClick={scrollToRegister} />
      </div>
    </SmoothScroll>
  );
}
