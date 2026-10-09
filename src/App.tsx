import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactModal } from './components/ContactModal';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div
      className="bg-[#0C0C0C] text-[#D7E2EA] min-h-screen w-full relative"
      style={{ overflowX: 'clip' }}
    >
      {/* 1. HERO SECTION */}
      <HeroSection onContactClick={() => setIsContactOpen(true)} />

      {/* 2. MARQUEE SECTION */}
      <MarqueeSection />

      {/* 3. ABOUT SECTION */}
      <AboutSection onContactClick={() => setIsContactOpen(true)} />

      {/* 4. SERVICES SECTION */}
      <ServicesSection />

      {/* 5. PROJECTS SECTION */}
      <ProjectsSection />

      {/* Bottom Footer / Lakshya Acknowledgement */}
      <footer id="contact" className="bg-[#0C0C0C] border-t border-white/5 py-12 px-6 text-center select-none z-20 relative">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#D7E2EA]/50 font-mono uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B600A8]" />
            <span>Jack &bull; 3D Creator &bull; Lakshya &apos;26 Flagship</span>
          </div>
          <p>&copy; {new Date().getFullYear()} Jack &bull; All Rights Reserved</p>
        </div>
      </footer>

      {/* Interactive Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
