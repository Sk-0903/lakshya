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
      className="bg-[#0C0C0C] text-[#D7E2EA] border-t border-[#D7E2EA]/12 pt-24 pb-8 overflow-hidden relative select-none"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Three Columns (Stack on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 pb-16">
          {/* Col 1: Brand + Tagline */}
          <div className="flex flex-col gap-4">
            <span className="font-heading font-black text-2xl uppercase tracking-tight text-white">
              Lakshya&apos;26
            </span>
            <p className="text-sm font-light text-[#D7E2EA]/60 max-w-sm leading-relaxed">
              Where students come together for 24 hours of non-stop building, learning and breaking limits at {EVENT_DATA.collegeName}.
            </p>
            <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#D7E2EA]/40">
              {EVENT_DATA.tagline}
            </span>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D7E2EA]/40 mb-2">
              Navigation
            </span>
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
                className="text-sm font-light text-[#D7E2EA]/75 hover:text-white transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Col 3: Contact & Socials */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D7E2EA]/40 mb-2">
              Contact &amp; Venue
            </span>
            <a
              href={`mailto:${EVENT_DATA.contacts.email}`}
              aria-label="Email Lakshya support"
              className="inline-flex items-center gap-3 text-sm text-[#D7E2EA]/75 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 text-white/50" />
              <span>{EVENT_DATA.contacts.email}</span>
            </a>
            <a
              href={`tel:${EVENT_DATA.contacts.phone}`}
              aria-label="Call Lakshya organizers"
              className="inline-flex items-center gap-3 text-sm text-[#D7E2EA]/75 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-white/50" />
              <span>{EVENT_DATA.contacts.phone}</span>
            </a>
            <div className="inline-flex items-start gap-3 text-sm text-[#D7E2EA]/60 leading-relaxed">
              <MapPin className="w-4 h-4 text-white/50 shrink-0 mt-1" />
              <span>{EVENT_DATA.contacts.address}</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-5 mt-3 pt-3 border-t border-[#D7E2EA]/12">
              <a
                href={EVENT_DATA.contacts.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Lakshya Instagram"
                className="text-white/50 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={EVENT_DATA.contacts.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Lakshya LinkedIn"
                className="text-white/50 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={EVENT_DATA.contacts.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Lakshya GitHub"
                className="text-white/50 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Giant "Lakshya'26" in .hero-heading rising in via scroll scrub */}
      <div className="w-full overflow-hidden relative flex justify-center items-end mt-4">
        <motion.div
          style={{ y: giantTextY, opacity: giantTextOpacity }}
          className="w-full flex justify-center"
        >
          <div className="hero-heading font-heading font-black uppercase whitespace-nowrap text-[17vw] leading-none tracking-tighter select-none pointer-events-none text-center">
            LAKSHYA&apos;26
          </div>
        </motion.div>
      </div>

      {/* Copyright Line */}
      <div className="border-t border-[#D7E2EA]/12 pt-8 text-center text-xs font-mono text-[#D7E2EA]/40 px-6 relative z-10">
        &copy; 2026 {EVENT_DATA.collegeName}. All rights reserved.
      </div>
    </footer>
  );
};
