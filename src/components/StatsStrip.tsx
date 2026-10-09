import React, { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';
import { EVENT_DATA } from '../data/event';

interface StatItemProps {
  finalNumber: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ finalNumber, suffix = '', prefix = '', label }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, finalNumber, {
        duration: 1.8,
        ease: 'easeOut',
        onUpdate: (value) => {
          setDisplayValue(Math.floor(value));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, finalNumber]);

  const formattedDisplay =
    finalNumber >= 100000
      ? `${(displayValue / 100000).toFixed(1)}L`
      : displayValue.toLocaleString();

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="hero-heading font-black tracking-tight leading-none text-[clamp(2.5rem,8vw,110px)] mb-2">
        {prefix}
        {formattedDisplay}
        {suffix}
      </div>
      <span className="text-xs sm:text-sm uppercase tracking-widest font-light text-[#D7E2EA]/70">
        {label}
      </span>
    </div>
  );
};

export const StatsStrip: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto border-y border-[#D7E2EA]/20 my-16 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#D7E2EA]/15">
      <StatItem
        finalNumber={EVENT_DATA.metrics.hoursNum}
        label="Relentless Sprints"
        suffix=" HRS"
      />
      <StatItem
        finalNumber={EVENT_DATA.metrics.participantsNum}
        label="Elite Hackers"
        suffix="+"
      />
      <StatItem
        finalNumber={EVENT_DATA.metrics.prizePoolNum}
        label="Prize Pool"
        prefix="₹"
      />
      <StatItem
        finalNumber={EVENT_DATA.metrics.tracksCountNum}
        label="Domains of Impact"
        suffix=" Tracks"
      />
    </div>
  );
};
