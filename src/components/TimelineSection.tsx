import React from 'react';
import { SectionHeader } from './SectionHeader';
import { FadeIn } from './FadeIn';
import { EVENT_DATA } from '../data/event';

export const TimelineSection: React.FC = () => {
  const day1Items = EVENT_DATA.schedule.filter((item) => item.day === 'DAY 1');
  const day2Items = EVENT_DATA.schedule.filter((item) => item.day === 'DAY 2');

  return (
    <section
      id="schedule"
      aria-labelledby="schedule-heading"
      className="bg-[#0C0C0C] text-[#D7E2EA] py-20 sm:py-[104px] md:py-32 border-t border-[#D7E2EA]/12 select-none"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Unified Section Header */}
        <SectionHeader
          label="03 — SCHEDULE"
          title="24-HOUR TIMELINE"
          headingId="schedule-heading"
          className="mb-12 sm:mb-14 md:mb-16"
        />

        {/* ================= DESKTOP & TABLET: RESPONSIVE CARDS GRID ================= */}
        <div className="hidden md:flex flex-col gap-12 sm:gap-14">
          {/* Day 1 Group */}
          <div>
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#D7E2EA]/12">
              <span className="w-2 h-2 rounded-full bg-[#B600A8]" />
              <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-[#D7E2EA]/70">
                Day 1 &mdash; Thursday, 05 November
              </h3>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {day1Items.map((item, idx) => {
                const phaseNum = (idx + 1).toString().padStart(2, '0');
                return (
                  <FadeIn key={`d1-${item.time}`} delay={idx * 0.05} y={16} className="h-full">
                    <div className="h-full rounded-2xl border border-[#D7E2EA]/12 bg-[#101015] p-6 sm:p-7 flex flex-col justify-between transition-colors duration-200 hover:border-[#B600A8]/50 min-w-0">
                      <div>
                        {/* Row 1: Day Badge & Phase */}
                        <div className="flex items-center justify-between gap-2 mb-6">
                          <span className="text-[11px] font-mono uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full border border-[#B600A8]/30 bg-[#B600A8]/10 text-fuchsia-300">
                            {item.day}
                          </span>
                          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D7E2EA]/50">
                            Phase {phaseNum}
                          </span>
                        </div>

                        {/* Large Fluid Gradient Time with Tabular Numerals */}
                        <div className="hero-heading font-heading font-black text-[clamp(2rem,3.8vw,3.25rem)] tracking-tight leading-none tabular-nums whitespace-nowrap mb-4">
                          {item.time}
                        </div>

                        {/* Title */}
                        <h4 className="font-heading font-medium uppercase text-base sm:text-lg text-white tracking-tight leading-snug mb-2">
                          {item.title}
                        </h4>
                      </div>

                      {/* Description */}
                      <p className="font-light text-sm text-[#D7E2EA]/70 leading-relaxed mt-3">
                        {item.description}
                      </p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>

          {/* Day 2 Group */}
          <div>
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#D7E2EA]/12">
              <span className="w-2 h-2 rounded-full bg-[#BE4C00]" />
              <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-[#D7E2EA]/70">
                Day 2 &mdash; Friday, 06 November
              </h3>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {day2Items.map((item, idx) => {
                const phaseNum = (idx + 5).toString().padStart(2, '0');
                return (
                  <FadeIn key={`d2-${item.time}`} delay={idx * 0.05} y={16} className="h-full">
                    <div className="h-full rounded-2xl border border-[#D7E2EA]/12 bg-[#101015] p-6 sm:p-7 flex flex-col justify-between transition-colors duration-200 hover:border-[#BE4C00]/50 min-w-0">
                      <div>
                        {/* Row 1: Day Badge & Phase */}
                        <div className="flex items-center justify-between gap-2 mb-6">
                          <span className="text-[11px] font-mono uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full border border-[#BE4C00]/30 bg-[#BE4C00]/10 text-amber-300">
                            {item.day}
                          </span>
                          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D7E2EA]/50">
                            Phase {phaseNum}
                          </span>
                        </div>

                        {/* Large Fluid Gradient Time with Tabular Numerals */}
                        <div className="hero-heading font-heading font-black text-[clamp(2rem,3.8vw,3.25rem)] tracking-tight leading-none tabular-nums whitespace-nowrap mb-4">
                          {item.time}
                        </div>

                        {/* Title */}
                        <h4 className="font-heading font-medium uppercase text-base sm:text-lg text-white tracking-tight leading-snug mb-2">
                          {item.title}
                        </h4>
                      </div>

                      {/* Description */}
                      <p className="font-light text-sm text-[#D7E2EA]/70 leading-relaxed mt-3">
                        {item.description}
                      </p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= MOBILE: CLEAN VERTICAL TIMELINE ================= */}
        <div className="md:hidden">
          <div className="relative pl-6 border-l border-[#D7E2EA]/12 flex flex-col gap-6">
            {EVENT_DATA.schedule.map((item, idx) => {
              const phaseNum = (idx + 1).toString().padStart(2, '0');
              const isDay1 = item.day === 'DAY 1';

              return (
                <FadeIn key={`mob-${item.time}`} delay={idx * 0.04} y={12}>
                  <div className="relative rounded-2xl border border-[#D7E2EA]/12 bg-[#101015] p-5 sm:p-6 min-w-0">
                    {/* Node marker on vertical rail line */}
                    <span
                      className={`absolute -left-[31px] top-6 w-2.5 h-2.5 rounded-full ring-4 ring-[#0C0C0C] ${
                        isDay1 ? 'bg-[#B600A8]' : 'bg-[#BE4C00]'
                      }`}
                    />

                    {/* Badge & Phase */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border ${
                          isDay1
                            ? 'border-[#B600A8]/30 bg-[#B600A8]/10 text-fuchsia-300'
                            : 'border-[#BE4C00]/30 bg-[#BE4C00]/10 text-amber-300'
                        }`}
                      >
                        {item.day}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D7E2EA]/50">
                        Phase {phaseNum}
                      </span>
                    </div>

                    {/* Time */}
                    <div className="hero-heading font-heading font-black text-3xl tabular-nums whitespace-nowrap mb-2">
                      {item.time}
                    </div>

                    {/* Title */}
                    <h4 className="font-heading font-medium uppercase text-base text-white tracking-tight leading-snug mb-1">
                      {item.title}
                    </h4>

                    {/* Description */}
                    <p className="font-light text-xs text-[#D7E2EA]/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
