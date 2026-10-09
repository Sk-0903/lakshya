import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Cpu, Rocket, Trophy } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';
import { LakshyaTarget3D } from './LakshyaTarget3D';
import { Countdown } from './Countdown';
import { ScrambleText } from './ScrambleText';
import { EVENT_DATA } from '../data/event';

interface HeroSectionProps {
  onRegisterClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onRegisterClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll scrub over the first 100vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const headingOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Tracks', href: '#tracks' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Register', href: '#register' },
  ];

  const titleChars = "Lakshya'26".split('');

  // 4 Orbiting glass pills
  const orbitingChips = [
    { icon: Code2, label: 'Code', radius: 195, duration: 22, delay: 0 },
    { icon: Cpu, label: 'Agents', radius: 235, duration: 28, delay: -6 },
    { icon: Rocket, label: 'Ship', radius: 210, duration: 25, delay: -12 },
    { icon: Trophy, label: 'Win', radius: 255, duration: 32, delay: -18 },
  ];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none"
    >
      {/* Navbar */}
      <FadeIn delay={0} y={-20} className="w-full z-30">
        <nav className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8 w-full max-w-7xl mx-auto">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={link.label === 'Register' && onRegisterClick ? (e) => { e.preventDefault(); onRegisterClick(); } : undefined}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70 group"
            >
              <ScrambleText text={link.label} scrambleOnMount={false} />
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* Hero Heading with Per-Character Mask Reveal & Scroll Scrub */}
      <div className="w-full overflow-hidden flex justify-center items-center my-auto z-0 relative">
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="w-full flex justify-center items-center"
        >
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[13vw] sm:text-[14vw] md:text-[15vw] lg:text-[16.5vw] mt-6 sm:mt-4 md:-mt-5 flex justify-center overflow-hidden">
            {titleChars.map((char, i) => (
              <span key={i} className="inline-block overflow-hidden py-2">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + i * 0.05,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              </span>
            ))}
          </h1>
        </motion.div>
      </div>

      {/* 3D Target Centerpiece with Magnet & Scroll Scrub */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[300px] sm:w-[380px] md:w-[460px] lg:w-[540px] aspect-square top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto flex items-center justify-center">
        <motion.div
          style={{ y: visualY, scale: visualScale }}
          className="w-full h-full flex items-center justify-center relative"
        >
          <FadeIn delay={0.6} y={30} className="w-full h-full flex items-center justify-center">
            <Magnet
              padding={150}
              strength={3}
              activeTransition="transform 0.3s ease-out"
              inactiveTransition="transform 0.6s ease-in-out"
              className="w-full h-full flex items-center justify-center relative"
            >
              <LakshyaTarget3D className="w-full h-full" />

              {/* Orbiting Chips (Hidden on mobile) */}
              <div className="absolute inset-0 pointer-events-none hidden md:block">
                {orbitingChips.map((chip, idx) => {
                  const IconComponent = chip.icon;
                  return (
                    <motion.div
                      key={idx}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: chip.duration,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: chip.delay,
                      }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div
                        style={{ transform: `translateY(-${chip.radius}px)` }}
                        className="pointer-events-auto"
                      >
                        {/* Counter-rotate so chip stays upright */}
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{
                            duration: chip.duration,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: chip.delay,
                          }}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-[#D7E2EA]/20 text-xs font-mono text-white shadow-[0_4px_16px_rgba(0,0,0,0.6)] hover:border-[#B600A8]/60 transition"
                        >
                          <IconComponent className="w-3.5 h-3.5 text-[#38bdf8]" />
                          <span>{chip.label}</span>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Magnet>
          </FadeIn>
        </motion.div>
      </div>

      {/* Mobile Compact Countdown Bar (Above bottom bar) */}
      <div className="md:hidden flex justify-center w-full px-6 z-20 mb-2">
        <Countdown targetISO={EVENT_DATA.startTimestampISO} compact />
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 max-w-7xl mx-auto flex justify-between items-end z-20 gap-4">
        {/* Left Text */}
        <FadeIn delay={0.35} y={20}>
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-[clamp(0.75rem,1.4vw,1.5rem)] max-w-[160px] sm:max-w-[220px] md:max-w-[260px]">
            a {EVENT_DATA.durationHours}-hour hackathon where bold ideas become real products
          </p>
        </FadeIn>

        {/* Center Countdown (md:block, hidden below) */}
        <FadeIn delay={0.45} y={20} className="hidden md:block">
          <Countdown targetISO={EVENT_DATA.startTimestampISO} />
        </FadeIn>

        {/* Right Contact / Register Button */}
        <FadeIn delay={0.5} y={20}>
          <ContactButton
            label="Register Now"
            onClick={onRegisterClick}
            href="#register"
          />
        </FadeIn>
      </div>
    </section>
  );
};
