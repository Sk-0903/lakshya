import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Linkedin, Github } from 'lucide-react';
import { EVENT_DATA } from '../data/event';

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });

  // Giant text rises in via scroll scrub translateY 40% to 15% with opacity 0 to 1
  const giantTextY = useTransform(scrollYProgress, [0, 1], ['40%', '15%']);
  const giantTextOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const scrollTo = (href: string) => {
    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(el, { offset: -40 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer
      ref={footerRef}
      className="bg-[#0C0C0C] text-[#D7E2EA] border-t border-[#D7E2EA]/12 pt-20 sm:pt-24 md:pt-28 pb-8 overflow-hidden relative select-none"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Three Columns Grid: Desktop 1.4fr : 1fr : 1.2fr (5 cols, 3 cols, 4 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16 pb-16 items-start">
          {/* Col 1: Brand + Tagline (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="font-heading font-black text-2xl uppercase tracking-tight text-white block">
              Lakshya&apos;26
            </span>
            <p className="text-sm font-light text-[#D7E2EA]/75 max-w-[40ch] leading-[1.65]">
              Where students come together for 24 hours of non-stop building, learning and breaking limits at {EVENT_DATA.collegeName}.
            </p>
            <span className="text-[12px] uppercase font-mono tracking-[0.25em] text-[#D7E2EA]/50 mt-1 block">
              {EVENT_DATA.tagline}
            </span>
          </div>

          {/* Col 2: Navigation Links (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.25em] text-[#D7E2EA]/60 mb-2 block">
              Navigation
            </span>
            <nav className="flex flex-col gap-2.5">
              {[
                { label: 'About Lakshya', href: '#about' },
                { label: 'Innovation Tracks', href: '#tracks' },
                { label: '24-Hour Timeline', href: '#schedule' },
                { label: 'Awards & Bounties', href: '#prizes' },
                { label: 'Frequently Asked Questions', href: '#faq' },
                { label: 'Registration Portal', href: '#register' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className="text-sm font-light text-[#D7E2EA]/70 hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#BBCCD7] rounded"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 3: Contact & Venue (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-4 md:col-span-2 lg:col-span-4">
            <span className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.25em] text-[#D7E2EA]/60 mb-2 block">
              Contact &amp; Venue
            </span>

            <div className="flex flex-col gap-3">
              {/* Email */}
              <a
                href={`mailto:${EVENT_DATA.contacts.email}`}
                aria-label="Email Lakshya support"
                className="inline-flex items-center gap-3 text-sm text-[#D7E2EA]/75 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#BBCCD7] rounded"
              >
                <span className="w-5 shrink-0 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white/50" />
                </span>
                <span>{EVENT_DATA.contacts.email}</span>
              </a>

              {/* Phone */}
              <a
                href={`tel:${EVENT_DATA.contacts.phone}`}
                aria-label="Call Lakshya organizers"
                className="inline-flex items-center gap-3 text-sm text-[#D7E2EA]/75 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#BBCCD7] rounded"
              >
                <span className="w-5 shrink-0 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white/50" />
                </span>
                <span>{EVENT_DATA.contacts.phone}</span>
              </a>

              {/* Address in semantic scannable lines */}
              <div className="inline-flex items-start gap-3 text-sm text-[#D7E2EA]/70 leading-[1.6]">
                <span className="w-5 shrink-0 flex items-center justify-center pt-0.5">
                  <MapPin className="w-4 h-4 text-white/50" />
                </span>
                <address className="not-italic max-w-[300px]">
                  <span>SJBIT, BGS Health &amp; Education City,</span><br />
                  <span>Dr. Vishnuvardhan Road, Kengeri,</span><br />
                  <span>Bangalore &ndash; 560060</span>
                </address>
              </div>
            </div>

            {/* Social Icons (44x44px touch targets) */}
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[#D7E2EA]/12">
              <a
                href={EVENT_DATA.contacts.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 rounded-full border border-[#D7E2EA]/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-colors focus-visible:outline-2 focus-visible:outline-[#BBCCD7]"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={EVENT_DATA.contacts.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-11 h-11 rounded-full border border-[#D7E2EA]/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-colors focus-visible:outline-2 focus-visible:outline-[#BBCCD7]"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={EVENT_DATA.contacts.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-11 h-11 rounded-full border border-[#D7E2EA]/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-colors focus-visible:outline-2 focus-visible:outline-[#BBCCD7]"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Giant "Lakshya'26" in .hero-heading rising in via scroll scrub (Contained, no overflow) */}
      <div className="w-full overflow-hidden relative flex justify-center items-end mt-4">
        <motion.div
          style={{ y: giantTextY, opacity: giantTextOpacity }}
          className="w-full flex justify-center overflow-hidden"
        >
          <div className="hero-heading font-heading font-black uppercase whitespace-nowrap text-[clamp(3.5rem,15vw,13rem)] leading-none tracking-tighter select-none pointer-events-none text-center">
            LAKSHYA&apos;26
          </div>
        </motion.div>
      </div>

      {/* Copyright Line */}
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 border-t border-[#D7E2EA]/12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#D7E2EA]/50 relative z-10">
        <span>&copy; 2026 {EVENT_DATA.collegeName}. All rights reserved.</span>
        <span>BANGALORE &bull; 05-06 NOVEMBER 2026</span>
      </div>
    </footer>
  );
};
