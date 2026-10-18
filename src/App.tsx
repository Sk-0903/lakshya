import React from 'react';
import { SmoothScroll } from './components/SmoothScroll';
import { ScrollProgress } from './components/ScrollProgress';
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { Navbar } from './components/Navbar';
import { HeroJourney } from './components/HeroJourney';
import { AboutSection } from './components/AboutSection';
import { TracksSection } from './components/TracksSection';
import { TimelineSection } from './components/TimelineSection';
import { PrizesSection } from './components/PrizesSection';
import { PartnersSection } from './components/PartnersSection';
import { LeadershipSection } from './components/LeadershipSection';
import { TeamSection } from './components/TeamSection';
import { VenueSection } from './components/VenueSection';
import { RegisterSection } from './components/RegisterSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <SmoothScroll>
      <div
        className="bg-bg text-[#D7E2EA] min-h-screen w-full relative selection:bg-[#B600A8]/30 selection:text-white"
        style={{ overflowX: 'clip' }}
      >
        {/* Urgent Announcement Banner: Limited Slots + Registration Deadline */}
        <AnnouncementBanner />

        {/* Fixed Top 2px Accent Scroll Progress Bar */}
        <ScrollProgress />

        {/* Fixed Navigation Bar */}
        <Navbar />


        {/* 1. HERO: Unified Multi-Segment Scroll-Scrubbed Journey (id="top") */}
        <HeroJourney />

        {/* 2. ABOUT: Character-by-Character Animated Text + Stats Strip (id="about") */}
        <AboutSection />

        {/* 3. TRACKS: Clean White Section with Hover Focus Interaction (id="tracks") */}
        <TracksSection />

        {/* 4. SCHEDULE: Pinned Horizontal Scrub Timeline on Desktop (id="schedule") */}
        <TimelineSection />

        {/* 5. PRIZES: 3 Sticky-Stacking Cards with Thin-Line SVG Illustrations (id="prizes") */}
        <PrizesSection />

        {/* 6. PARTNERS: In Association With (id="partners") */}
        <PartnersSection />

        {/* 7. LEADERSHIP: Words of Encouragement (id="messages") */}
        <LeadershipSection />

        {/* 8. TEAM: The People Behind Lakshya'26 (id="team") */}
        <TeamSection />

        {/* 8. VENUE: Find Us / Location (id="venue") */}
        <VenueSection />

        {/* 9. FAQ + REGISTER: Clean FAQ Accordion + High-Impact Framed CTA (id="faq" & id="register") */}
        <RegisterSection />

        {/* 10. FOOTER: 3 Columns + Scroll-Scrubbed Giant Title (17vw) */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
