import React, { useEffect, useState } from 'react';

interface SectionItem {
  id: string;
  label: string;
}

const SECTIONS: SectionItem[] = [
  { id: 'hero', label: 'Top' },
  { id: 'about', label: 'About' },
  { id: 'tracks', label: 'Tracks' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'prizes', label: 'Prizes' },
  { id: 'judging', label: 'Judging' },
  { id: 'sponsors', label: 'Sponsors' },
  { id: 'register', label: 'Register' },
];

export const SectionDots: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.4) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(el, { offset: -20 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3 select-none">
      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;
        const isHovered = hoveredId === sec.id;

        return (
          <button
            key={sec.id}
            type="button"
            onClick={() => scrollTo(sec.id)}
            onMouseEnter={() => setHoveredId(sec.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group flex items-center gap-2 p-1 focus:outline-none cursor-pointer"
            aria-label={`Scroll to ${sec.label}`}
          >
            {/* Label on Hover */}
            <span
              className={`text-[10px] uppercase font-mono tracking-widest text-[#D7E2EA] transition-all duration-200 pointer-events-none px-2 py-0.5 rounded bg-black/60 backdrop-blur border border-white/10 ${
                isHovered || isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
              }`}
            >
              {sec.label}
            </span>

            {/* Dot / Elongated Pill */}
            <span
              className={`w-2 rounded-full transition-all duration-300 ${
                isActive
                  ? 'h-6 bg-gradient-to-b from-[#B600A8] to-[#BE4C00] shadow-[0_0_8px_#B600A8]'
                  : 'h-2 bg-white/20 group-hover:bg-white/60'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};
