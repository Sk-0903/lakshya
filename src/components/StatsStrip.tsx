import React, { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';
import { EVENT_DATA } from '../data/event';

interface StatItemProps {
  finalNumber: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({
  finalNumber,
  suffix = '',
  prefix = '',
  label,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, finalNumber, {
        duration: 1.6,
        ease: [0.25, 0.1, 0.25, 1],
        onUpdate: (val) => setDisplayValue(Math.floor(val)),
      });
      return () => controls.stop();
    }
  }, [isInView, finalNumber]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 sm:p-8 text-center select-none">
      <div className="hero-heading font-heading font-black tracking-tight leading-none text-[clamp(2.5rem,6vw,5.5rem)] mb-3">
        {prefix}
        {displayValue.toLocaleString()}
        {suffix}
      </div>
      <span className="text-[0.75rem] uppercase tracking-[0.3em] text-[#D7E2EA]/60 font-mono">
        {label}
      </span>
    </div>
  );
};

export const StatsStrip: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto border-y border-[#D7E2EA]/12 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#D7E2EA]/12">
      <StatItem
        finalNumber={EVENT_DATA.durationHours}
        label="Hours"
        suffix=" Hours"
      />
      <StatItem
        finalNumber={EVENT_DATA.participantsCount}
        label="Participants"
        suffix="+"
      />
      <StatItem
        finalNumber={EVENT_DATA.prizePoolAmount}
        label="Prize Pool"
        prefix="₹"
      />
      <StatItem
        finalNumber={EVENT_DATA.tracksCount}
        label="Tracks"
        suffix=" Tracks"
      />
    </div>
  );
};
