import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { EVENT_DATA } from '../data/event';

const NAV_LINKS = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Tracks', href: '#tracks', id: 'tracks' },
  { label: 'Schedule', href: '#schedule', id: 'schedule' },
  { label: 'Prizes', href: '#prizes', id: 'prizes' },
  { label: 'FAQ', href: '#faq', id: 'faq' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);

      // Section tracking for active underline
      const sections = NAV_LINKS.map((l) => l.id);
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.15) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 select-none ${
          isScrolled
            ? 'bg-[#0C0C0C]/85 backdrop-blur-md border-b border-[#D7E2EA]/12 py-3.5 sm:py-4'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Left: Brand Wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#top');
            }}
            className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-white hover:opacity-85 transition"
          >
            Lakshya&apos;26
          </a>

          {/* Center Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className="relative text-xs uppercase font-medium tracking-wider text-[#D7E2EA] hover:opacity-70 transition-opacity py-1 cursor-pointer"
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="navActiveLine"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#B600A8] to-[#BE4C00]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action + Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <a
              href={EVENT_DATA.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background:
                  'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
              }}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-full text-white text-xs font-medium uppercase tracking-wider hover:brightness-110 transition shadow-sm cursor-pointer"
            >
              Register
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white/80 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50 bg-[#0C0C0C] flex flex-col justify-between p-8 pt-24 md:hidden"
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2 text-white/70 hover:text-white"
              aria-label="Close Menu"
            >
              <X className="w-7 h-7" />
            </button>

            {/* Staggered Nav Links */}
            <nav className="flex flex-col gap-6 my-auto">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.4 }}
                  className="font-heading font-black text-4xl sm:text-5xl uppercase tracking-tight text-white hover:text-cyan-300 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Bottom Register CTA in Mobile Menu */}
            <div className="pt-6 border-t border-white/10">
              <a
                href={EVENT_DATA.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background:
                    'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                }}
                className="w-full py-4 rounded-full text-white font-medium uppercase tracking-widest text-center text-sm block"
              >
                Register Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
