import React from 'react';
import { SmoothScroll } from './components/SmoothScroll';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { ScrollSequence } from './components/ScrollSequence';
import { AboutSection } from './components/AboutSection';
import { TracksSection } from './components/TracksSection';
import { TimelineSection } from './components/TimelineSection';
import { PrizesSection } from './components/PrizesSection';
import { SponsorsSection } from './components/SponsorsSection';
import { RegisterSection } from './components/RegisterSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <SmoothScroll>
      <div
        className="bg-[#0C0C0C] text-[#D7E2EA] min-h-screen w-full relative selection:bg-[#B600A8]/30 selection:text-white"
        style={{ overflowX: 'clip' }}
      >
        {/* Fixed Top 2px Accent Scroll Progress Bar */}
        <ScrollProgress />

        {/* Fixed Navigation Bar */}
        <Navbar />

        {/* 1. HERO: Signature Scroll-Scrubbed Video Sequence (id="top") */}
        <ScrollSequence />

        {/* 2. ABOUT: Character-by-Character Animated Text + Stats Strip (id="about") */}
        <AboutSection />

        {/* 3. TRACKS: Clean White Section with Hover Focus Interaction (id="tracks") */}
        <TracksSection />

        {/* 4. SCHEDULE: Pinned Horizontal Scrub Timeline on Desktop (id="schedule") */}
        <TimelineSection />

        {/* 5. PRIZES: 3 Sticky-Stacking Cards with Thin-Line SVG Illustrations (id="prizes") */}
        <PrizesSection />

        {/* 6. SPONSORS: Calm Understated Scroll Marquee (id="sponsors") */}
        <SponsorsSection />

        {/* 7. FAQ + REGISTER: 6 Accordion Items + High-Impact CTA (id="faq" & id="register") */}
        <RegisterSection />

        {/* 8. FOOTER: 3 Columns + Scroll-Scrubbed Giant Title (17vw) */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
