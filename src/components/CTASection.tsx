import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { ContactButton } from './ContactButton';
import { Magnet } from './Magnet';
import { EVENT_DATA } from '../data/event';

export const CTASection: React.FC = () => {
  return (
    <section
      id="register"
      aria-labelledby="cta-heading"
      className="bg-[#0C0C0C] text-[#D7E2EA] py-20 sm:py-[104px] md:py-32 border-t border-[#D7E2EA]/12 relative select-none"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
        <div className="flex flex-col items-start max-w-3xl">
          {/* Section Label */}
          <FadeIn delay={0} y={12}>
            <span className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.28em] text-[#D7E2EA]/60 block mb-3 sm:mb-4">
              06 &mdash; REGISTRATION
            </span>
          </FadeIn>

          {/* Heading: clamp(2.5rem, 7vw, 6rem) in 2 lines on desktop */}
          <FadeIn delay={0.1} y={16}>
            <h2
              id="cta-heading"
              className="hero-heading font-heading font-black uppercase text-[clamp(2.5rem,7vw,6rem)] tracking-tight leading-[0.95] text-balance mb-8 sm:mb-10"
            >
              Ready To<br />Aim Higher?
            </h2>
          </FadeIn>

          {/* Compact 2-item event details group (max-w 600px, stacks on mobile) */}
          <FadeIn delay={0.15} y={16}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-[620px] pb-8 sm:pb-10 border-b border-[#D7E2EA]/12 w-full">
              {/* Item 1: Event Dates */}
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-white/50 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#D7E2EA]/50 block mb-1">
                    Event Dates
                  </span>
                  <p className="text-sm sm:text-base font-medium text-white tracking-wide">
                    {EVENT_DATA.dates}
                  </p>
                </div>
              </div>

              {/* Item 2: Venue */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white/50 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#D7E2EA]/50 block mb-1">
                    Hackathon Venue
                  </span>
                  <p className="text-sm sm:text-base font-medium text-white tracking-wide">
                    {EVENT_DATA.venue}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Action Button: Gap 32-40px below details */}
          <FadeIn delay={0.2} y={16} className="mt-8 sm:mt-10 w-full sm:w-auto">
            <Magnet padding={100} strength={4} className="w-full sm:w-auto">
              <ContactButton
                label="Register Now"
                href={EVENT_DATA.registrationUrl}
                className="w-full sm:w-auto min-h-[48px]"
              />
            </Magnet>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
