import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { User, Phone, Mail, Linkedin } from 'lucide-react';
import { EVENT_DATA, TeamMemberData } from '../data/event';
import { Converge, ConvergeText, useConvergeConfig } from './motion';

// Refined SVG concentric target-ring & crosshair pattern for placeholder avatar
export const PlaceholderAvatar: React.FC<{ role: string; name?: string }> = ({ role, name }) => {
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
  const hasPhoto = Boolean(member.photo && member.photo.trim().length > 0);
  const hasName = Boolean(member.name && member.name.trim().length > 0);

  return (
    <div className="w-[220px] sm:w-[240px] max-w-[68vw] sm:max-w-none shrink-0 rounded-[22px] bg-surface border border-[#D7E2EA]/12 p-3.5 sm:p-4 flex flex-col items-center select-none transition-all duration-300 hover:-translate-y-1 hover:border-[#B600A8]/50 shadow-lg shadow-[rgba(0,0,0,0.5)] group">
      {/* Photo / Minimalist Placeholder */}
      <div className="w-full aspect-[4/5] rounded-[18px] border border-[#D7E2EA]/10 overflow-hidden relative bg-surface-2 shrink-0 transition-transform duration-300 group-hover:scale-[1.02]">
        {hasPhoto ? (
          <img
            src={member.photo}
            alt={member.name || 'Team member'}
            width={240}
            height={300}
            loading="lazy"
            className="w-full h-full object-cover object-top pointer-events-none"
          />
        ) : (
          <PlaceholderAvatar role={member.role} name={member.name} />
        )}
      </div>

      {/* Member Name */}
      <div className="w-full pt-3 pb-1 text-center">
        <p
          className={`font-heading tracking-tight text-base sm:text-lg truncate ${
            hasName ? 'font-semibold text-white' : 'font-light text-[#D7E2EA]/45 italic'
          }`}
          title={member.name || 'Name to be announced'}
        >
          {hasName ? member.name : 'Name to be announced'}
        </p>

        {/* Optional Phone Link */}
        {Boolean(member.phone && member.phone.trim().length > 0) && (
          <a
            href={`tel:${member.phone.replace(/\s+/g, '')}`}
            className="inline-flex items-center justify-center gap-1.5 mt-1.5 text-xs font-mono text-[#D7E2EA]/80 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3 text-fuchsia-400 shrink-0" />
            <span>{member.phone}</span>
          </a>
        )}
      </div>
    </div>
  );
};

type FilterCategory = 'faculty' | 'core' | 'crew';

interface TeamSectionCategory {
  id: 'faculty' | 'core' | 'crew';
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  members: TeamMemberData[];
}

export const TeamSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FilterCategory>('faculty');
  const sectionRef = useRef<HTMLElement>(null);
  const trackSetRef = useRef<HTMLUListElement>(null);
  const config = useConvergeConfig();

  // Sliding marquee state for All Crew
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [singleSetWidth, setSingleSetWidth] = useState(0);

  const x = useMotionValue(0);
  const currentSpeedRef = useRef(125);
  const scrollBoostRef = useRef(0);
  const lastScrollYRef = useRef(0);

  // Group members into the 3 tiers
  const facultyMembers = EVENT_DATA.team.filter((m) => m.group === 'faculty');
  const coreMembers = EVENT_DATA.team.filter((m) => m.group === 'core');
  const crewMembers = EVENT_DATA.team.filter((m) => m.group === 'crew');

  const categories: TeamSectionCategory[] = [
    {
      id: 'faculty',
      title: 'Faculty Coordinators',
      badge: 'FACULTY',
      badgeColor: 'border-[#B600A8]/50 text-fuchsia-300 bg-[#B600A8]/10',
      description: 'Guiding and mentoring the institution-wide vision of Lakshya 2026',
      members: facultyMembers,
    },
    {
      id: 'core',
      title: 'Core Leads',
      badge: 'CORE LEADS',
      badgeColor: 'border-cyan-400/50 text-cyan-300 bg-cyan-500/10',
      description: 'Driving overall hackathon execution, technical architecture, and operations',
      members: coreMembers,
    },
    {
      id: 'crew',
      title: 'All Crew',
      badge: 'ORGANIZING CREW',
      badgeColor: 'border-amber-400/50 text-amber-300 bg-amber-500/10',
      description: 'Powering outreach, logistics, hospitality, public relations, and on-ground energy',
      members: crewMembers,
    },
  ];

  const currentCategory = categories.find((cat) => cat.id === activeTab) || categories[0];

  // Measure marquee set width for crew sliding track
  useEffect(() => {
    if (activeTab !== 'crew' || !trackSetRef.current) return;
    const updateWidth = () => {
      if (trackSetRef.current) {
        setSingleSetWidth(trackSetRef.current.offsetWidth);
      }
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(trackSetRef.current);
    return () => observer.disconnect();
  }, [activeTab]);

  // Tab visibility
  useEffect(() => {
    const handleVisibility = () => setIsTabVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Section in view
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { rootMargin: '100px 0px' });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Scroll boost
  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = Math.abs(currentScrollY - lastScrollYRef.current);
      lastScrollYRef.current = currentScrollY;
      scrollBoostRef.current = Math.min(scrollBoostRef.current + deltaY * 0.15, 50);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Reset marquee x when tab changes
  useEffect(() => {
    x.set(0);
  }, [activeTab, x]);

  // Animation frame loop for continuous smooth sliding when 'crew' tab is active
  useAnimationFrame((_, delta) => {
    if (activeTab !== 'crew' || config.isReducedMotion) return;

    const dt = Math.min(delta / 1000, 0.1);
    scrollBoostRef.current = Math.max(0, scrollBoostRef.current - dt * 40);

    const isPaused = isHovered || isFocused || isTouching || !isInView || !isTabVisible;
    const targetSpeed = isPaused ? 0 : 125 + scrollBoostRef.current;
    currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * Math.min(1, dt * 7);

    if (currentSpeedRef.current > 0.05 && singleSetWidth > 0) {
      const loopWidth = singleSetWidth + 24;
      let nextX = x.get() - currentSpeedRef.current * dt;
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
      className="bg-bg text-[#D7E2EA] py-24 sm:py-32 md:py-40 border-t border-[#D7E2EA]/12 relative select-none overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 mb-10 sm:mb-14">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Section Label: 06 — TEAM */}
          <Converge from="bottom" distance={20} className="w-full flex justify-center">
            <span className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.28em] text-[#D7E2EA]/60 block mb-3 text-center">
              07 &mdash; TEAM
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

          <Converge from="bottom" distance={24} delay={0.05} className="w-full flex justify-center">
            <p className="text-sm sm:text-base font-light text-[#D7E2EA]/65 leading-relaxed max-w-[60ch] text-center mx-auto mb-8">
              {EVENT_DATA.teamSubtitle} &bull; <span className="text-fuchsia-300/80 font-mono text-xs uppercase tracking-wider">{EVENT_DATA.tagline}</span>
            </p>
          </Converge>

          {/* 3 Section Tabs (Faculty, Core Leads, All Crew) */}
          <Converge from="bottom" distance={20} delay={0.08} className="w-full flex justify-center">
            <div className="inline-flex p-1.5 rounded-full bg-surface/90 backdrop-blur-md border border-[#D7E2EA]/15 gap-1.5 sm:gap-2 justify-center shadow-xl shadow-black/40">
              <button
                type="button"
                onClick={() => setActiveTab('faculty')}
                className={`relative px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-sm font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 sm:gap-2 ${
                  activeTab === 'faculty'
                    ? 'bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white shadow-lg shadow-[#B600A8]/30 font-semibold'
                    : 'text-[#D7E2EA]/70 hover:text-white hover:bg-surface-2'
                }`}
              >
                <span>FACULTY</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === 'faculty' ? 'bg-white/20 text-white' : 'bg-white/10 text-[#D7E2EA]/60'}`}>
                  {facultyMembers.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('core')}
                className={`relative px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-sm font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 sm:gap-2 ${
                  activeTab === 'core'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-600/30 font-semibold'
                    : 'text-[#D7E2EA]/70 hover:text-white hover:bg-surface-2'
                }`}
              >
                <span>CORE LEADS</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === 'core' ? 'bg-white/20 text-white' : 'bg-white/10 text-[#D7E2EA]/60'}`}>
                  {coreMembers.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('crew')}
                className={`relative px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-sm font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 sm:gap-2 ${
                  activeTab === 'crew'
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-600/30 font-semibold'
                    : 'text-[#D7E2EA]/70 hover:text-white hover:bg-surface-2'
                }`}
              >
                <span>ALL CREW</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === 'crew' ? 'bg-white/20 text-white' : 'bg-white/10 text-[#D7E2EA]/60'}`}>
                  {crewMembers.length}
                </span>
              </button>
            </div>
          </Converge>
        </div>
      </div>

      {/* Tier Overview Header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-8 text-center">
        <span className={`inline-block text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border mb-2.5 ${currentCategory.badgeColor}`}>
          {currentCategory.badge} &bull; {currentCategory.members.length} MEMBERS
        </span>
        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {currentCategory.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#D7E2EA]/65 max-w-[50ch] mx-auto mt-1.5">
          {currentCategory.description}
        </p>
      </div>

      {/* Content Rendering: Sliding Marquee for All Crew, Clean Centered Grid for Faculty & Core Leads */}
      {activeTab === 'crew' && !config.isReducedMotion ? (
        <div
          className="w-full relative overflow-hidden py-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocusCapture={() => setIsFocused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsFocused(false);
          }}
          onTouchStart={() => setIsTouching(true)}
          onTouchEnd={() => setIsTouching(false)}
          onTouchCancel={() => setIsTouching(false)}
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          }}
        >
          {/* Smooth Sliding Marquee for the 21 Crew Members */}
          <motion.div style={{ x }} className="flex gap-6 shrink-0 w-max will-change-transform">
            {/* Set 1 */}
            <ul ref={trackSetRef} className="flex gap-6 shrink-0 list-none p-0 m-0">
              {crewMembers.map((member, idx) => (
                <li key={`crew-primary-${idx}`}>
                  <TeamCard member={member} />
                </li>
              ))}
            </ul>

            {/* Set 2 (Seamless loop) */}
            <ul className="flex gap-6 shrink-0 list-none p-0 m-0" aria-hidden="true">
              {crewMembers.map((member, idx) => (
                <li key={`crew-dup-${idx}`}>
                  <TeamCard member={member} isDuplicate={true} />
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      ) : (
        /* Centered Grid for Faculty (3) & Core Leads (3) */
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <ul className="flex flex-wrap justify-center gap-6 sm:gap-8 list-none p-0 m-0">
            {currentCategory.members.map((member, idx) => (
              <motion.li
                key={`${currentCategory.id}-${idx}`}
                initial={{ opacity: config.isReducedMotion ? 1 : 0, y: config.isReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: config.isReducedMotion ? 0 : idx * 0.08 }}
              >
                <TeamCard member={member} />
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
