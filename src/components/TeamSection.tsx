import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { User, Phone, Mail, Linkedin } from 'lucide-react';
import { EVENT_DATA, TeamMemberData } from '../data/event';
import { Converge, ConvergeText, useConvergeConfig } from './motion';

// Refined SVG concentric target-ring & crosshair pattern for placeholder avatar
const PlaceholderAvatar: React.FC<{ role: string; name?: string }> = ({ role, name }) => {
  const getInitials = (n: string) => {
    const parts = n.trim().split(/\s+/);
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return parts[0] ? parts[0].slice(0, 2).toUpperCase() : '';
  };

  const initials = name && name.trim().length > 0 ? getInitials(name) : null;

  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1C1C20] via-[#141417] to-[#0C0C0E]">
      {/* Precision concentric rings and crosshair background */}
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 text-[#D7E2EA]"
      >
        <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="0.75" fill="none" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="0.75" fill="none" />
        <circle cx="50" cy="50" r="18" stroke="currentColor" strokeWidth="0.75" fill="none" strokeDasharray="2 2" />
        <line x1="50" y1="6" x2="50" y2="94" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
        <line x1="6" y1="50" x2="94" y2="50" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
      </svg>

      {/* Subtly illuminated central glyph */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {initials ? (
          <span className="font-heading font-black text-3xl sm:text-4xl tracking-tighter text-[#D7E2EA]/85">
            {initials}
          </span>
        ) : (
          <User className="w-10 h-10 sm:w-12 sm:h-12 text-[#D7E2EA]/30 stroke-[1.5]" />
        )}
      </div>

      {/* Edge vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_24px_rgba(0,0,0,0.6)]" />
    </div>
  );
};

const TeamCard: React.FC<{
  member: TeamMemberData;
  isDuplicate?: boolean;
}> = ({ member, isDuplicate = false }) => {
  const isFaculty = member.group === 'faculty';
  const hasPhoto = Boolean(member.photo && member.photo.trim().length > 0);
  const hasName = Boolean(member.name && member.name.trim().length > 0);
  const hasPhone = Boolean(member.phone && member.phone.trim().length > 0);
  const hasEmail = Boolean(member.email && member.email.trim().length > 0);
  const hasLinkedin = Boolean(member.linkedin && member.linkedin.trim().length > 0);

  const tabIndex = isDuplicate ? -1 : 0;

  return (
    <div className="w-[260px] sm:w-[280px] max-w-[72vw] sm:max-w-none shrink-0 h-[420px] sm:h-[440px] rounded-[24px] bg-[#121212] border border-[#D7E2EA]/12 p-4 sm:p-5 flex flex-col justify-between select-none transition-all duration-200 hover:-translate-y-0.5 hover:border-[#B600A8]/50 shadow-lg shadow-black/20">
      {/* Photo / Refined Placeholder */}
      <div className="w-full aspect-[4/5] rounded-[20px] border border-[#D7E2EA]/10 overflow-hidden relative bg-[#0C0C0C] shrink-0">
        {hasPhoto ? (
          <img
            src={member.photo}
            alt={`${member.name || 'Team member'}, ${member.role}`}
            width={240}
            height={300}
            loading="lazy"
            className="w-full h-full object-cover pointer-events-none"
          />
        ) : (
          <PlaceholderAvatar role={member.role} name={member.name} />
        )}
      </div>

      {/* Information Area */}
      <div className="mt-3 flex flex-col flex-1 justify-between">
        <div>
          {/* Role + Optional Faculty Pill */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span
              className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.2em] text-[#D7E2EA]/60 truncate"
              title={member.role}
            >
              {member.role}
            </span>
            {isFaculty && (
              <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border border-[#B600A8]/50 text-fuchsia-300 bg-[#B600A8]/10 shrink-0 font-medium">
                FACULTY
              </span>
            )}
          </div>

          {/* Member Name */}
          <p
            className={`font-heading tracking-tight text-base sm:text-lg truncate ${
              hasName ? 'font-medium text-white' : 'font-light text-[#D7E2EA]/40 italic'
            }`}
          >
            {hasName ? member.name : 'Name to be announced'}
          </p>
        </div>

        {/* Contact Links & Placeholders */}
        <div className="pt-3 border-t border-[#D7E2EA]/10 flex items-center justify-between gap-2">
          {/* Phone */}
          {hasPhone ? (
            <a
              href={`tel:${member.phone.replace(/\s+/g, '')}`}
              aria-label={`Call ${member.name || member.role}`}
              tabIndex={tabIndex}
              className="inline-flex items-center gap-2 text-xs font-mono text-[#D7E2EA]/80 hover:text-white transition-colors min-h-[44px] focus-visible:outline-2 focus-visible:outline-[#BBCCD7] rounded"
            >
              <Phone className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
              <span>{member.phone}</span>
            </a>
          ) : (
            <div
              className="inline-flex items-center gap-2 text-xs font-mono text-[#D7E2EA]/30 min-h-[44px]"
              aria-hidden="true"
            >
              <Phone className="w-3.5 h-3.5 text-white/20 shrink-0" />
              <span>+91 XXXXX XXXXX</span>
            </div>
          )}

          {/* Email & LinkedIn Action Buttons (if provided) */}
          <div className="flex items-center gap-1 shrink-0">
            {hasEmail && (
              <a
                href={`mailto:${member.email}`}
                aria-label={`Email ${member.name || member.role}`}
                tabIndex={tabIndex}
                className="w-11 h-11 inline-flex items-center justify-center text-[#D7E2EA]/70 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#BBCCD7] rounded"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
            {hasLinkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name || member.role} LinkedIn profile`}
                tabIndex={tabIndex}
                className="w-11 h-11 inline-flex items-center justify-center text-[#D7E2EA]/70 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#BBCCD7] rounded"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const TeamSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackSetRef = useRef<HTMLUListElement>(null);
  const config = useConvergeConfig();

  // Marquee controls & state
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);

  const [singleSetWidth, setSingleSetWidth] = useState(0);

  // Framer Motion driven X position
  const x = useMotionValue(0);
  const currentSpeedRef = useRef(45);
  const scrollBoostRef = useRef(0);
  const lastScrollYRef = useRef(0);

  // Measure single set width with ResizeObserver
  useEffect(() => {
    if (!trackSetRef.current) return;
    const updateWidth = () => {
      if (trackSetRef.current) {
        setSingleSetWidth(trackSetRef.current.offsetWidth);
      }
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(trackSetRef.current);
    return () => observer.disconnect();
  }, []);

  // Track visibility & tab focus
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // IntersectionObserver for section in view
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '100px 0px' }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Scroll velocity calculation for subtle speed boost
  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = Math.abs(currentScrollY - lastScrollYRef.current);
      lastScrollYRef.current = currentScrollY;

      // Add gentle boost capped at 50px/s
      scrollBoostRef.current = Math.min(scrollBoostRef.current + deltaY * 0.15, 50);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Pointer fine check for hover pause
  const handleMouseEnter = useCallback(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsHovered(true);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Animation frame loop
  useAnimationFrame((_, delta) => {
    if (config.isReducedMotion) return;

    const dt = Math.min(delta / 1000, 0.1);

    // Fade out scroll boost gradually
    scrollBoostRef.current = Math.max(0, scrollBoostRef.current - dt * 40);

    const isPaused =
      isHovered || isFocused || isTouching || !isInView || !isTabVisible;

    // Target speed: 0 when paused, 45 + boost when running
    const targetSpeed = isPaused ? 0 : 45 + scrollBoostRef.current;

    // Smoothly ease current speed to avoid abrupt stops
    currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * Math.min(1, dt * 7);

    if (currentSpeedRef.current > 0.05 && singleSetWidth > 0) {
      // 24px is gap-6 in Tailwind
      const loopWidth = singleSetWidth + 24;
      let nextX = x.get() - currentSpeedRef.current * dt;

      // Wrap around seamlessly
      if (nextX <= -loopWidth) {
        nextX += loopWidth;
      }

      x.set(nextX);
    }
  });

  return (
    <section
      ref={sectionRef}
      id="team"
      aria-labelledby="team-heading"
      className="bg-[#0C0C0C] text-[#D7E2EA] py-24 sm:py-32 md:py-40 border-t border-[#D7E2EA]/12 relative select-none overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 mb-12 sm:mb-16">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Section Label: 06 — TEAM */}
          <Converge from="bottom" distance={20} className="w-full flex justify-center">
            <span className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.28em] text-[#D7E2EA]/60 block mb-3 text-center">
              06 &mdash; TEAM
            </span>
          </Converge>

          {/* Heading: THE TEAM via ConvergeText */}
          <div className="w-full flex justify-center items-center text-center mb-4">
            <h2
              id="team-heading"
              className="hero-heading font-heading font-black uppercase text-[clamp(2.5rem,7vw,5.5rem)] tracking-tight leading-[0.95] text-center w-full mx-auto"
            >
              <ConvergeText text="THE TEAM" mode="words" />
            </h2>
          </div>

          {/* Subtitle */}
          <Converge from="bottom" distance={24} delay={0.05} className="w-full flex justify-center">
            <p className="text-sm sm:text-base font-light text-[#D7E2EA]/65 leading-relaxed max-w-[50ch] text-center mx-auto">
              {EVENT_DATA.teamSubtitle}
            </p>
          </Converge>
        </div>
      </div>

      {/* Marquee or Reduced-Motion Static Grid */}
      {config.isReducedMotion ? (
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 list-none p-0 m-0">
            {EVENT_DATA.team.map((member, idx) => (
              <li key={`static-${member.role}-${idx}`}>
                <TeamCard member={member} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Converge from="bottom" distance={32} delay={0.1} className="w-full">
          <div
            className="w-full relative overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocusCapture={() => setIsFocused(true)}
            onBlurCapture={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setIsFocused(false);
              }
            }}
            onTouchStart={() => setIsTouching(true)}
            onTouchEnd={() => setIsTouching(false)}
            onTouchCancel={() => setIsTouching(false)}
            style={{
              maskImage:
                'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            }}
          >
            {/* Infinite Horizontal Track */}
            <motion.div style={{ x }} className="flex gap-6 shrink-0 w-max will-change-transform py-4">
              {/* Primary Set 1 */}
              <ul ref={trackSetRef} className="flex gap-6 shrink-0 list-none p-0 m-0">
                {EVENT_DATA.team.map((member, idx) => (
                  <li key={`team-primary-${member.role}-${idx}`}>
                    <TeamCard member={member} />
                  </li>
                ))}
              </ul>

              {/* Duplicate Set 2 (for seamless loop) */}
              <ul className="flex gap-6 shrink-0 list-none p-0 m-0" aria-hidden="true">
                {EVENT_DATA.team.map((member, idx) => (
                  <li key={`team-dup-${member.role}-${idx}`}>
                    <TeamCard member={member} isDuplicate={true} />
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </Converge>
      )}
    </section>
  );
};
