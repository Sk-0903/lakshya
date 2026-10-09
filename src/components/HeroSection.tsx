import React from 'react';
import { motion } from 'framer-motion';
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
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-amber-500/30 text-[11px] uppercase font-mono tracking-widest text-[#D7E2EA] shadow-[0_0_20px_rgba(245,158,11,0.15)] backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_#f59e0b]" />
        <span>SJBIT Silver Jubilee 2026 &bull; Flagship Hackathon</span>
      </div>

      {/* Navbar */}
      <FadeIn delay={0} y={-20} className="w-full z-30">
        <nav className="flex items-center justify-between px-6 md:px-10 pt-8 md:pt-10 w-full max-w-7xl mx-auto">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={link.label === 'Register' ? (e) => { e.preventDefault(); onContactClick?.(); } : undefined}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-all duration-200 hover:opacity-70 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* Centered Hero Heading */}
      <div className="w-full overflow-hidden flex justify-center items-center my-auto z-0 relative">
        <FadeIn delay={0.15} y={40} className="w-full flex justify-center">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[13vw] sm:text-[14vw] md:text-[15.5vw] lg:text-[17vw] select-none pointer-events-none">
            LAKSHYA &apos;26
          </h1>
        </FadeIn>
      </div>

      {/* Centered 3D Silver Jubilee Peacock Feather Emblem with Float & Magnet Physics */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 w-[240px] sm:w-[300px] md:w-[360px] lg:w-[420px] pointer-events-auto flex items-center justify-center">
        {/* Warm Golden Atmospheric Halo Backlight */}
        <div className="absolute w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] bg-gradient-to-tr from-amber-500/25 via-yellow-500/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />

        <FadeIn delay={0.4} y={20} className="w-full flex justify-center items-center">
          <Magnet
            padding={160}
            strength={3.5}
            activeTransition="transform 0.25s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full flex justify-center items-center"
          >
            <motion.div
              animate={{
                y: [-7, 7, -7],
                rotateZ: [-1.2, 1.2, -1.2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-full flex justify-center items-center relative group cursor-grab active:cursor-grabbing"
            >
              <img
                src="/sjbit_jubilee_logo.png"
                alt="SJBIT Silver Jubilee 2026 25 Years Emblem"
                className="w-full h-auto max-h-[380px] object-contain drop-shadow-[0_20px_40px_rgba(245,158,11,0.35)] select-none transition-transform duration-300 group-hover:scale-105"
                loading="eager"
                draggable={false}
              />
            </motion.div>
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 max-w-7xl mx-auto flex justify-between items-end z-30">
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
