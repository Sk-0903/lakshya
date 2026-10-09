import React from 'react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';

interface HeroSectionProps {
  onContactClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Tracks', href: '#tracks' },
    { label: 'Showcase', href: '#projects' },
    { label: 'Register', href: '#register' },
  ];

  return (
    <section className="relative h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none">
      {/* Top Event Badge (Silver Jubilee & Lakshya Flagship) */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-1 rounded-full bg-white/[0.04] border border-amber-500/20 text-[11px] uppercase font-mono tracking-widest text-[#BBCCD7]">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
        <span>SJBIT Silver Jubilee 2026 &bull; Flagship Hackathon</span>
      </div>

      {/* Navbar */}
      <FadeIn delay={0} y={-20} className="w-full z-20">
        <nav className="flex items-center justify-between px-6 md:px-10 pt-7 md:pt-10 w-full max-w-7xl mx-auto">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={link.label === 'Register' ? (e) => { e.preventDefault(); onContactClick?.(); } : undefined}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* Centered Hero Emblem with Magnet */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[240px] sm:w-[320px] md:w-[400px] lg:w-[480px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto">
        <FadeIn delay={0.6} y={30} className="w-full h-full flex justify-center items-end">
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full flex justify-center items-end"
          >
            <img
              src="/sjbit_jubilee_logo.png"
              alt="SJBIT Silver Jubilee 2026 Emblem"
              className="w-full h-auto object-contain pointer-events-none drop-shadow-[0_25px_45px_rgba(245,158,11,0.25)] select-none hover:scale-[1.02] transition-transform duration-300"
              loading="eager"
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* Hero Heading */}
      <div className="w-full overflow-hidden flex justify-center items-center my-auto z-0">
        <FadeIn delay={0.15} y={40} className="w-full flex justify-center">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[13vw] sm:text-[14vw] md:text-[15.5vw] lg:text-[17vw] mt-6 sm:mt-4 md:-mt-5 select-none">
            LAKSHYA &apos;26
          </h1>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 max-w-7xl mx-auto flex justify-between items-end z-20">
        <FadeIn delay={0.35} y={20}>
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-[clamp(0.75rem,1.4vw,1.4rem)] max-w-[170px] sm:max-w-[240px] md:max-w-[280px]">
            National 36-hour flagship hackathon &bull; innovate, code &amp; transform
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton
            onClick={onContactClick}
            href="#register"
            label="Register Now"
          />
        </FadeIn>
      </div>
    </section>
  );
};
