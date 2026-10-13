import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, CalendarDays, Clock, Navigation, ArrowUpRight, MousePointerClick, Phone, Mail } from 'lucide-react';
import { EVENT_DATA } from '../data/event';
import { Converge, ConvergeText, useConvergeConfig } from './motion';
import { GhostButton } from './GhostButton';
import { Magnet } from './Magnet';

export const VenueSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mapCardRef = useRef<HTMLDivElement>(null);
  const { isReducedMotion } = useConvergeConfig();

  // Lazy-mount state for iframe
  const [isNearViewport, setIsNearViewport] = useState(false);
  // Prevent scroll trapping: interactive state
  const [isInteractive, setIsInteractive] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  const venue = EVENT_DATA.venue;
  const addressQuery = encodeURIComponent(venue.address);
  const mapEmbedUrl = venue.mapEmbedUrl || `https://www.google.com/maps?q=${addressQuery}&output=embed`;
  const mapLinkUrl = venue.mapLinkUrl || `https://www.google.com/maps/search/?api=1&query=${addressQuery}`;
  const directionsUrl = venue.directionsUrl || `https://www.google.com/maps/dir/?api=1&destination=${addressQuery}`;

  // Detect touch device
  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  // IntersectionObserver for lazy mounting the iframe (300px ahead)
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Reset interactive mode on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsInteractive(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll progress for clip-path reveal on map card
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0.05, 0.45],
    ['inset(8% 8% 8% 8% round 24px)', 'inset(0% 0% 0% 0% round 24px)']
  );

  return (
    <section
      ref={sectionRef}
      id="venue"
      aria-labelledby="venue-heading"
      className="bg-bg text-[#D7E2EA] py-24 sm:py-32 md:py-40 border-t border-[#D7E2EA]/12 relative select-none overflow-hidden"
    >
      {/* Background Subtle Hairline Target-Ring Motif */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-[0.04]">
        <svg
          viewBox="0 0 800 800"
          className="w-[700px] h-[700px] sm:w-[900px] sm:h-[900px] text-white"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="400" cy="400" r="380" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="400" cy="400" r="280" strokeWidth="1" />
          <circle cx="400" cy="400" r="180" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="400" cy="400" r="90" strokeWidth="1" />
          <line x1="400" y1="20" x2="400" y2="780" strokeWidth="0.75" />
          <line x1="20" y1="400" x2="780" y2="400" strokeWidth="0.75" />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16">
          <Converge from="bottom" distance={20} className="w-full flex justify-center">
            <span className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.28em] text-[#D7E2EA]/60 block mb-3 text-center">
              08 &mdash; VENUE
            </span>
          </Converge>

          <div className="w-full flex justify-center items-center text-center mb-4">
            <h2
              id="venue-heading"
              className="hero-heading font-heading font-black uppercase text-[clamp(2.5rem,7vw,5.5rem)] tracking-tight leading-[0.95] text-center w-full mx-auto"
            >
              <ConvergeText text="FIND US" mode="words" />
            </h2>
          </div>

          <Converge from="bottom" distance={24} delay={0.05} className="w-full flex justify-center">
            <p className="text-sm sm:text-base font-light text-[#D7E2EA]/65 leading-relaxed max-w-[50ch] text-center mx-auto">
              Join us at the CSE Seminar Hall, SJBIT campus for 24 hours of continuous innovation.
            </p>
          </Converge>
        </div>

        {/* Two-Column Grid: Details (5/12) & Map (7/12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Details Card (Left: 5 cols) */}
          <Converge
            from="left"
            distance={isReducedMotion ? 0 : 80}
            className="lg:col-span-5 flex flex-col h-full"
          >
            <div className="h-full rounded-[24px] bg-surface border border-[#D7E2EA]/12 p-7 sm:p-9 md:p-10 flex flex-col justify-between shadow-xl shadow-[rgba(2,6,18,0.5)]">
              <div className="flex flex-col">
                {/* Small Label */}
                <span className="text-[12px] font-mono uppercase tracking-[0.25em] text-[#D7E2EA]/60 block mb-2.5">
                  EVENT VENUE
                </span>

                {/* Venue Name */}
                <h3 className="text-white font-medium text-[clamp(1.25rem,2vw,1.75rem)] leading-snug mb-3">
                  {venue.name}
                </h3>

                {/* Scannable Address in <address> */}
                <address className="not-italic text-[#D7E2EA]/75 leading-[1.7] text-sm sm:text-base max-w-[36ch] mb-6 block">
                  <span className="block text-white/90 font-medium">CSE Seminar Hall</span>
                  <span className="block">Department of CSE &amp; ISE</span>
                  <span className="block">SJB Institute of Technology</span>
                  <span className="block">BGS Health &amp; Education City, Dr. Vishnuvardhan Road</span>
                  <span className="block">Kengeri, Bangalore &ndash; 560060</span>
                </address>

                {/* Meta Group: Dates & Duration */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 pt-4 border-t border-[#D7E2EA]/10 mb-6">
                  <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-mono text-[#D7E2EA]/85">
                    <span className="w-5 shrink-0 flex items-center justify-center">
                      <CalendarDays className="w-4 h-4 text-amber-300/80" />
                    </span>
                    <span>{venue.dates}</span>
                  </div>
                  <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-mono text-[#D7E2EA]/85">
                    <span className="w-5 shrink-0 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-[#B600A8]" />
                    </span>
                    <span>24-Hour Innovation Sprint</span>
                  </div>
                </div>

                {/* Direct Contact & Inquiries */}
                <div className="pt-4 border-t border-[#D7E2EA]/10 mb-6 flex flex-col gap-2.5">
                  <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#D7E2EA]/50">
                    Contact &amp; Inquiries
                  </span>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-6">
                    <a
                      href={`tel:${EVENT_DATA.contacts.phone.replace(/\s+/g, '')}`}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-[#D7E2EA]/85 hover:text-amber-300 transition-colors group cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-300 shrink-0 group-hover:scale-110 transition-transform" />
                      <span>{EVENT_DATA.contacts.phone}</span>
                    </a>
                    <a
                      href={`mailto:${EVENT_DATA.contacts.email}`}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-[#D7E2EA]/85 hover:text-fuchsia-300 transition-colors group cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5 text-fuchsia-400 shrink-0 group-hover:scale-110 transition-transform" />
                      <span>{EVENT_DATA.contacts.email}</span>
                    </a>
                  </div>
                </div>

                {/* Optional How to Reach list */}
                {venue.howToReach && venue.howToReach.length > 0 && (
                  <div className="pt-4 border-t border-[#D7E2EA]/10 mb-6 flex flex-col gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D7E2EA]/50">
                      How to reach
                    </span>
                    {venue.howToReach.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#D7E2EA]/70">
                        <Navigation className="w-3.5 h-3.5 text-white/40 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-white/80 font-medium">{item.label}:</strong> {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Optional Note */}
                {venue.note && (
                  <p className="text-xs text-[#D7E2EA]/60 italic mb-4">
                    {venue.note}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-6 border-t border-[#D7E2EA]/10">
                <Magnet padding={60} strength={4} className="w-full sm:w-auto">
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background:
                        'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                      boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                      outline: '2px solid white',
                      outlineOffset: '-3px',
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-full text-white uppercase tracking-widest font-medium text-xs sm:text-sm px-6 py-3.5 select-none cursor-pointer transition-shadow hover:brightness-110 min-h-[48px] w-full sm:w-auto shadow-md"
                  >
                    <span>Get Directions</span>
                    <Navigation className="w-3.5 h-3.5 text-white/90" />
                  </a>
                </Magnet>

                <GhostButton
                  label="Open in Google Maps"
                  href={mapLinkUrl}
                  className="min-h-[48px] w-full sm:w-auto text-center"
                />
              </div>
            </div>
          </Converge>

          {/* Map Card (Right: 7 cols) */}
          <Converge
            from="right"
            distance={isReducedMotion ? 0 : 80}
            className="lg:col-span-7 flex flex-col h-full"
          >
            <motion.div
              ref={mapCardRef}
              style={{ clipPath: isReducedMotion ? undefined : clipPath }}
              onMouseLeave={() => setIsInteractive(false)}
              className="relative rounded-[24px] bg-surface border border-[#D7E2EA]/15 overflow-hidden h-[340px] sm:h-[400px] lg:h-full lg:min-h-[480px] shadow-xl shadow-[rgba(2,6,18,0.5)] group"
            >
              {/* Placeholder & Fallback panel (shown before lazy-mount or on iframe failure) */}
              {(!isNearViewport || iframeError) && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-surface-2 via-surface to-bg">
                  {/* Concentric hairline target rings */}
                  <svg
                    viewBox="0 0 200 200"
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full pointer-events-none opacity-20 text-[#D7E2EA]"
                  >
                    <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="4 4" />
                    <circle cx="100" cy="100" r="64" stroke="currentColor" strokeWidth="1" fill="none" />
                    <circle cx="100" cy="100" r="36" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="3 3" />
                    <line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.4" />
                    <line x1="10" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.4" />
                  </svg>

                  <div className="relative z-20 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center mb-3 text-amber-300">
                      <MapPin className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <span className="text-white font-medium text-base mb-1">
                      {venue.name}
                    </span>
                    <span className="text-xs text-[#D7E2EA]/60 max-w-[32ch] mb-4">
                      {venue.address}
                    </span>
                    <a
                      href={mapLinkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-300 hover:text-white underline underline-offset-4 transition-colors"
                    >
                      <span>Open in Google Maps</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}

              {/* Lazy Mounted Embedded Google Map iframe with Dark Theme filter */}
              {isNearViewport && (
                <iframe
                  title="Map showing SJBIT campus venue"
                  src={mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  onError={() => setIframeError(true)}
                  style={{
                    filter: 'grayscale(0.85) invert(0.92) contrast(1.05) brightness(0.9) sepia(0.25) hue-rotate(185deg)',
                  }}
                  className={`w-full h-full border-0 absolute inset-0 transition-opacity duration-500 ${
                    isInteractive ? 'pointer-events-auto' : 'pointer-events-none'
                  }`}
                />
              )}

              {/* Floating Top-Left Chip: SJBIT CAMPUS, KENGERI */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface/90 backdrop-blur-md border border-[#D7E2EA]/15 text-xs font-mono text-[#D7E2EA]/90 shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  <span>{venue.campusTag}</span>
                </div>
              </div>

              {/* Floating Bottom-Right Link: Open in Maps */}
              <div className="absolute bottom-4 right-4 z-20">
                <a
                  href={mapLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open SJBIT campus venue in Google Maps"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface/90 hover:bg-surface-2 backdrop-blur-md border border-[#D7E2EA]/15 text-xs font-mono text-[#D7E2EA]/90 hover:text-white transition-all shadow-md focus-visible:outline-2 focus-visible:outline-[#BBCCD7]"
                >
                  <span>Open in Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-300" />
                </a>
              </div>

              {/* Click / Tap to Interact Overlay (prevents scroll trapping until engaged) */}
              {!isInteractive && isNearViewport && (
                <button
                  type="button"
                  onClick={() => setIsInteractive(true)}
                  aria-label="Click to interact with map"
                  className="absolute inset-0 z-10 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors cursor-pointer group/overlay"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/95 backdrop-blur-md border border-[#D7E2EA]/20 text-xs font-mono uppercase tracking-wider text-[#D7E2EA] group-hover/overlay:border-white/40 group-hover/overlay:text-white transition-all shadow-lg transform group-hover/overlay:scale-105">
                    <MousePointerClick className="w-3.5 h-3.5 text-amber-300" />
                    <span>{isTouch ? 'Tap to interact' : 'Click to interact'}</span>
                  </div>
                </button>
              )}

              {/* Exit Interactive Hint when engaged on desktop */}
              {isInteractive && !isTouch && (
                <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                  <span className="text-[11px] font-mono text-white/70 bg-surface/85 backdrop-blur-sm px-2.5 py-1 rounded border border-white/10">
                    Press Esc or move cursor away to lock scroll
                  </span>
                </div>
              )}
            </motion.div>
          </Converge>
        </div>
      </div>
    </section>
  );
};
