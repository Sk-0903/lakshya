import React, { useState } from 'react';
import {
  Clock,
  Sparkles,
  Rocket,
  Users,
  Gamepad2,
  Target,
  Lock,
  Trophy,
  Award,
  Calendar,
} from 'lucide-react';
import { FadeIn } from './FadeIn';
import { EVENT_DATA, MilestoneData } from '../data/event';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Clock,
  Sparkles,
  Rocket,
  Users,
  Gamepad2,
  Target,
  Lock,
  Trophy,
  Award,
};

export const TimelineSection: React.FC = () => {
  const [activeDay, setActiveDay] = useState<'ALL' | 'DAY 1' | 'DAY 2'>('ALL');

  const filteredSchedule =
    activeDay === 'ALL'
      ? EVENT_DATA.schedule
      : EVENT_DATA.schedule.filter((item) => item.day === activeDay);

  const day1Items = EVENT_DATA.schedule.filter((item) => item.day === 'DAY 1');
  const day2Items = EVENT_DATA.schedule.filter((item) => item.day === 'DAY 2');

  return (
    <section
      id="schedule"
      className="bg-[#0C0C0C] text-[#D7E2EA] px-6 sm:px-10 py-28 sm:py-36 relative z-10 select-none border-t border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <FadeIn delay={0} y={20}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-widest text-[#BBCCD7] mb-4">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>05-06 November 2026</span>
            </div>
            <h2 className="hero-heading font-heading font-black uppercase text-5xl sm:text-6xl md:text-7xl tracking-tight leading-none mb-6">
              24-Hour Schedule
            </h2>
            <p className="text-sm sm:text-base text-[#D7E2EA]/70 max-w-xl mx-auto leading-relaxed">
              From the opening keynote to the final pitch round. Mark your calendar for 24 hours of non-stop momentum.
            </p>
          </FadeIn>

          {/* Clean Day Filter Tabs */}
          <FadeIn delay={0.1} y={15} className="mt-8 flex justify-center gap-3">
            {(['ALL', 'DAY 1', 'DAY 2'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveDay(tab)}
                className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  activeDay === tab
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'bg-white/[0.05] border border-white/10 text-[#D7E2EA]/70 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                {tab === 'ALL' ? 'Full Schedule' : tab === 'DAY 1' ? 'Day 1 (Nov 5)' : 'Day 2 (Nov 6)'}
              </button>
            ))}
          </FadeIn>
        </div>

        {/* 2-Day Timeline Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14">
          {/* Day 1 Column (Nov 5) */}
          {(activeDay === 'ALL' || activeDay === 'DAY 1') && (
            <div className={`flex flex-col gap-6 ${activeDay === 'DAY 1' ? 'md:col-span-2 max-w-2xl mx-auto w-full' : ''}`}>
              <div className="flex items-center gap-3 pb-3 border-b border-fuchsia-500/20">
                <span className="w-3 h-3 rounded-full bg-[#B600A8]" />
                <h3 className="font-heading font-bold uppercase text-xl text-white">
                  Day 1 &bull; Thursday, Nov 5
                </h3>
              </div>

              <div className="flex flex-col gap-4 relative pl-6 border-l border-white/10">
                {day1Items.map((milestone, idx) => {
                  const IconComponent = ICON_MAP[milestone.icon] || Clock;
                  return (
                    <FadeIn key={milestone.id} delay={idx * 0.08} y={15}>
                      <div className="relative group p-5 rounded-2xl bg-[#121217] border border-white/[0.08] hover:border-fuchsia-500/40 transition-colors">
                        {/* Node Marker on vertical line */}
                        <span className="absolute -left-[31px] top-6 w-2.5 h-2.5 rounded-full bg-[#B600A8] ring-4 ring-[#0C0C0C]" />

                        <div className="flex items-center justify-between gap-4 mb-2">
                          <span className="font-mono text-xs font-bold text-cyan-300 px-2.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                            {milestone.time}
                          </span>
                          <IconComponent className="w-4 h-4 text-white/40 group-hover:text-fuchsia-400 transition-colors" />
                        </div>

                        <h4 className="font-heading font-semibold text-lg text-white mb-1">
                          {milestone.label}
                        </h4>
                        <p className="text-xs sm:text-sm font-normal text-[#D7E2EA]/65 leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            </div>
          )}

          {/* Day 2 Column (Nov 6) */}
          {(activeDay === 'ALL' || activeDay === 'DAY 2') && (
            <div className={`flex flex-col gap-6 ${activeDay === 'DAY 2' ? 'md:col-span-2 max-w-2xl mx-auto w-full' : ''}`}>
              <div className="flex items-center gap-3 pb-3 border-b border-amber-500/20">
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <h3 className="font-heading font-bold uppercase text-xl text-white">
                  Day 2 &bull; Friday, Nov 6
                </h3>
              </div>

              <div className="flex flex-col gap-4 relative pl-6 border-l border-white/10">
                {day2Items.map((milestone, idx) => {
                  const IconComponent = ICON_MAP[milestone.icon] || Clock;
                  return (
                    <FadeIn key={milestone.id} delay={idx * 0.08} y={15}>
                      <div className="relative group p-5 rounded-2xl bg-[#121217] border border-white/[0.08] hover:border-amber-500/40 transition-colors">
                        {/* Node Marker on vertical line */}
                        <span className="absolute -left-[31px] top-6 w-2.5 h-2.5 rounded-full bg-amber-400 ring-4 ring-[#0C0C0C]" />

                        <div className="flex items-center justify-between gap-4 mb-2">
                          <span className="font-mono text-xs font-bold text-amber-300 px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                            {milestone.time}
                          </span>
                          <IconComponent className="w-4 h-4 text-white/40 group-hover:text-amber-400 transition-colors" />
                        </div>

                        <h4 className="font-heading font-semibold text-lg text-white mb-1">
                          {milestone.label}
                        </h4>
                        <p className="text-xs sm:text-sm font-normal text-[#D7E2EA]/65 leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
