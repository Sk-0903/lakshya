import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Github,
  ArrowUp,
} from 'lucide-react';
import { ContactButton } from './ContactButton';
import { EVENT_DATA } from '../data/event';

export const Footer: React.FC<{ onRegisterClick?: () => void }> = ({ onRegisterClick }) => {
  const footerRef = useRef<HTMLElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });

  // Giant text rises from translateY 60% to 25% while opacity goes 0 to 1
  const giantTextY = useTransform(scrollYProgress, [0, 1], ['60%', '25%']);
  const giantTextOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // Rotating faint SVG target behind it
  const targetRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="bg-[#0C0C0C] text-[#D7E2EA] relative overflow-hidden pt-24 pb-8 select-none"
    >
      {/* Top Banner Call to Action */}
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center relative z-20">
        <h2 className="text-[clamp(1.8rem,5vw,4.5rem)] font-black uppercase tracking-tight text-white leading-tight mb-8">
          Ready to aim higher?
        </h2>

        <ContactButton
          label="Register Now"
          onClick={onRegisterClick}
          href="#register"
        />

        {/* Contact Links Row */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-16 pt-8 border-t border-white/10 w-full text-xs font-mono uppercase tracking-wider text-[#D7E2EA]/70">
          <a
            href={`mailto:${EVENT_DATA.contacts.email}`}
            aria-label="Email Lakshya 26"
            className="flex items-center gap-2 hover:opacity-100 hover:text-cyan-400 transition"
          >
            <Mail className="w-4 h-4" />
            <span>{EVENT_DATA.contacts.email}</span>
          </a>

          <a
            href={`tel:${EVENT_DATA.contacts.phone}`}
            aria-label="Call Lakshya 26 Support"
            className="flex items-center gap-2 hover:opacity-100 hover:text-cyan-400 transition"
          >
            <Phone className="w-4 h-4" />
            <span>{EVENT_DATA.contacts.phone}</span>
          </a>

          <div className="flex items-center gap-2 text-white/50">
            <MapPin className="w-4 h-4" />
            <span>{EVENT_DATA.collegeShort}, Bangalore</span>
          </div>

          <div className="flex items-center gap-4 pl-4 border-l border-white/10">
            <a
              href={EVENT_DATA.contacts.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lakshya Instagram"
              className="hover:text-fuchsia-400 transition"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={EVENT_DATA.contacts.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lakshya LinkedIn"
              className="hover:text-sky-400 transition"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={EVENT_DATA.contacts.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lakshya GitHub"
              className="hover:text-white transition"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Gigantic "Lakshya'26" Text with Scroll Scrub & Faint Rotating Target */}
      <div className="w-full overflow-hidden relative mt-16 z-10 flex justify-center items-end">
        {/* Faint Rotating SVG Target */}
        <motion.div
          style={{ rotate: targetRotate }}
          className="absolute -bottom-24 w-[500px] h-[500px] pointer-events-none opacity-[0.08]"
        >
          <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="90" stroke="#D7E2EA" strokeWidth="2" strokeDasharray="8 8" />
            <circle cx="100" cy="100" r="65" stroke="#B600A8" strokeWidth="3" />
            <circle cx="100" cy="100" r="40" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="100" cy="100" r="15" stroke="#BE4C00" strokeWidth="3" />
            <line x1="100" y1="0" x2="100" y2="200" stroke="#D7E2EA" strokeWidth="1" />
            <line x1="0" y1="100" x2="200" y2="100" stroke="#D7E2EA" strokeWidth="1" />
          </svg>
        </motion.div>

        <motion.div
          style={{ y: giantTextY, opacity: giantTextOpacity }}
          className="w-full flex justify-center"
        >
          <div className="hero-heading font-black uppercase whitespace-nowrap text-[17vw] leading-none tracking-tighter select-none pointer-events-none text-center">
            LAKSHYA&apos;26
          </div>
        </motion.div>
      </div>

      {/* Copyright Notice */}
      <div className="border-t border-white/5 pt-8 text-center text-xs font-mono text-[#D7E2EA]/40 px-6 relative z-20">
        &copy; 2026 {EVENT_DATA.collegeName}. Made with &hearts; by Team Lakshya.
      </div>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-black/70 border border-[#D7E2EA]/30 backdrop-blur-md flex items-center justify-center text-white hover:border-cyan-400 hover:scale-110 transition shadow-2xl cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 text-cyan-300" />
        </motion.button>
      )}
    </footer>
  );
};
