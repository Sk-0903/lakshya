import React from 'react';
import { Calendar, MapPin, ArrowUpRight } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { EVENT_DATA } from '../data/event';

export const CTASection: React.FC = () => {
  return (
    <section
      id="register"
      aria-labelledby="cta-heading"
      className="bg-[#0C0C0C] text-[#D7E2EA] py-28 sm:py-36 md:py-44 border-t border-[#D7E2EA]/12 relative select-none"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Dedicated Framed Conversion Card */}
        <div className="relative rounded-3xl border border-[#D7E2EA]/12 bg-gradient-to-b from-white/[0.03] to-transparent p-10 sm:p-14 md:p-20 overflow-hidden text-center flex flex-col items-center">
          {/* Subtle Accent Glow in Background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[550px] h-[250px] bg-gradient-to-b from-[#B600A8]/12 via-[#7621B0]/6 to-transparent blur-3xl pointer-events-none" />

          {/* Section Index Label */}
          <FadeIn delay={0} y={12}>
            <span className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.28em] text-[#D7E2EA]/60 block mb-4">
              06 &mdash; REGISTRATION
            </span>
          </FadeIn>

          {/* Main Inspiring Call To Action */}
          <FadeIn delay={0.1} y={16}>
            <h2
              id="cta-heading"
              className="hero-heading font-heading font-black uppercase text-[clamp(2.75rem,7.5vw,6rem)] tracking-tight leading-[0.95] max-w-4xl mx-auto mb-6 text-balance"
            >
              Ready To<br className="hidden sm:inline" /> Aim Higher?
            </h2>
          </FadeIn>

          {/* Calming Descriptive Subtitle */}
          <FadeIn delay={0.15} y={16}>
            <p className="text-sm sm:text-base md:text-lg font-light text-[#D7E2EA]/75 max-w-[56ch] mx-auto leading-relaxed mb-10 sm:mb-12 text-pretty">
              Join 500+ builders, innovators, and designers for 24 hours of intense sprint, high-stakes development, and ₹45,000 in prizes at {EVENT_DATA.collegeName}.
            </p>
          </FadeIn>

          {/* Event Details Pills with Comfortable Breathing Room */}
          <FadeIn delay={0.2} y={16}>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-12 sm:mb-14">
              {/* Event Dates Pill */}
              <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#D7E2EA]/15 bg-white/[0.03] text-[#D7E2EA]">
                <Calendar className="w-4 h-4 text-white/60 shrink-0" />
                <span className="text-xs sm:text-sm font-medium tracking-wide">
                  {EVENT_DATA.dates}
                </span>
              </div>

              {/* Venue Pill */}
              <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#D7E2EA]/15 bg-white/[0.03] text-[#D7E2EA]">
                <MapPin className="w-4 h-4 text-white/60 shrink-0" />
                <span className="text-xs sm:text-sm font-medium tracking-wide">
                  {EVENT_DATA.venue}
                </span>
              </div>
            </div>
          </FadeIn>

          {/* Prominent Primary Button */}
          <FadeIn delay={0.25} y={16}>
            <Magnet padding={120} strength={4}>
              <a
                href={EVENT_DATA.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background:
                    'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                }}
                className="inline-flex items-center justify-center gap-3 px-10 sm:px-14 py-4 sm:py-4.5 rounded-full text-white font-medium text-sm sm:text-base uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all duration-300 shadow-lg shadow-[#B600A8]/20 cursor-pointer min-h-[48px]"
              >
                <span>Register Now</span>
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
              </a>
            </Magnet>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
