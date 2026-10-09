import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Trophy, ArrowRight } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { ContactButton } from './ContactButton';
import { LakshyaTarget3D } from './LakshyaTarget3D';
import { Countdown } from './Countdown';
import { EVENT_DATA } from '../data/event';

interface HeroSectionProps {
  onRegisterClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onRegisterClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Tracks', href: '#tracks' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Prizes', href: '#prizes' },
    { label: 'Register', href: '#register' },
  ];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none pt-4 pb-10"
    >
      {/* Top Navbar */}
      <FadeIn delay={0} y={-15} className="w-full z-30">
        <header className="flex items-center justify-between px-6 sm:px-10 py-5 w-full max-w-7xl mx-auto border-b border-white/[0.06]">
          {/* Logo Brand Mark */}
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B600A8] shadow-[0_0_10px_#B600A8]" />
            <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-white">
              Lakshya<span className="text-cyan-400">&apos;26</span>
            </span>
          </div>

          {/* Clean Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={link.label === 'Register' && onRegisterClick ? (e) => { e.preventDefault(); onRegisterClick(); } : undefined}
                className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA]/75 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Nav CTA Button */}
          <div className="flex items-center gap-4">
            <a
              href="#register"
              onClick={onRegisterClick ? (e) => { e.preventDefault(); onRegisterClick(); } : undefined}
              className="px-5 py-2 rounded-full border border-white/20 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
            >
              Enter Sprint
            </a>
          </div>
        </header>
      </FadeIn>

      {/* Main Hero Center Stage */}
      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col items-center justify-center my-auto py-12 z-10 text-center">
        {/* Event Key Badges (Dates & Prize Pool) */}
        <FadeIn delay={0.1} y={15}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-wider text-[#D7E2EA]">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>{EVENT_DATA.dates}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono uppercase tracking-wider text-amber-300">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>₹45,000 Prize Pool</span>
            </div>
          </div>
        </FadeIn>

        {/* Hero Title */}
        <motion.div
          style={{ y: headingY }}
          className="w-full flex flex-col items-center mb-8"
        >
          <h1 className="hero-heading font-heading font-black uppercase tracking-tight text-[12vw] sm:text-[13vw] md:text-[11vw] lg:text-[9.5rem] leading-[0.9] select-none">
            Lakshya&apos;26
          </h1>
          <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-[#BBCCD7]/60 mt-4">
            {EVENT_DATA.tagline} &bull; 24-Hour Innovation Sprint
          </p>
        </motion.div>

        {/* 3D Target Centerpiece with Breathable Sizing */}
        <motion.div
          style={{ y: visualY, scale: visualScale }}
          className="w-[260px] sm:w-[320px] md:w-[380px] aspect-square my-2 relative flex items-center justify-center overflow-hidden rounded-3xl"
        >
          <LakshyaTarget3D className="w-full h-full" />
        </motion.div>

        {/* Tagline Summary */}
        <FadeIn delay={0.3} y={20} className="max-w-xl mx-auto mt-6">
          <p className="text-sm sm:text-base font-normal text-[#D7E2EA]/80 leading-relaxed">
            Where bold ideas transform into working products. 24 hours of non-stop engineering, product design, and mentorship at {EVENT_DATA.collegeShort}.
          </p>
        </FadeIn>

        {/* Action Button & Registration Link */}
        <FadeIn delay={0.4} y={20} className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <ContactButton
            label="Register Now"
            onClick={onRegisterClick}
            href="#register"
          />
          <a
            href="#schedule"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/60 hover:text-white transition-colors px-4 py-2"
          >
            <span>View 2-Day Timeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </FadeIn>
      </div>

      {/* Hero Bottom Bar with Live Countdown */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-6 z-20">
        <div className="text-left">
          <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 block">VENUE</span>
          <p className="text-xs sm:text-sm font-medium text-white/80">{EVENT_DATA.venue}</p>
        </div>

        {/* Countdown Box */}
        <div className="flex items-center gap-3">
          <Countdown targetISO={EVENT_DATA.startTimestampISO} />
        </div>
      </div>
    </section>
  );
};
