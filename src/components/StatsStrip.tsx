import React, { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';
import { ConvergeGroup } from './motion/ConvergeGroup';
import { EVENT_DATA } from '../data/event';

interface StatItemProps {
  finalNumber: number;
  suffix?: string;
  prefix?: string;
  label: string;
  isFirstRow?: boolean;
  isOddCol?: boolean;
  isLastCol?: boolean;
}

const StatItem: React.FC<StatItemProps> = ({
  finalNumber,
  suffix = '',
  prefix = '',
  label,
  isFirstRow,
  isOddCol,
  isLastCol,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

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
    <div
      ref={ref}
      className={`flex flex-col items-start justify-center py-7 sm:py-9 md:py-10 px-5 sm:px-6 md:px-8 select-none min-w-0 ${
        /* Mobile 2x2 grid borders */
        isOddCol ? 'border-r border-[#D7E2EA]/12' : ''
      } ${
        isFirstRow ? 'border-b border-[#D7E2EA]/12 md:border-b-0' : ''
      } ${
        /* Desktop 4 columns right border except last */
        !isLastCol ? 'md:border-r md:border-[#D7E2EA]/12' : 'md:border-r-0'
      }`}
    >
      <div className="hero-heading font-heading font-black tracking-tight leading-none text-[clamp(1.85rem,4.2vw,3.75rem)] tabular-nums whitespace-nowrap mb-2 sm:mb-3">
        {prefix}
        {displayValue.toLocaleString()}
        <span className="text-[0.65em] font-medium ml-1 text-[#D7E2EA]/80">
          {suffix}
        </span>
      </div>
      <span className="text-[12px] uppercase tracking-[0.25em] text-[#D7E2EA]/60 font-mono">
        {label}
      </span>
    </div>
  );
};

export const StatsStrip: React.FC = () => {
  return (
    <div className="w-full border-y border-[#D7E2EA]/12 overflow-hidden">
      <ConvergeGroup radial className="grid grid-cols-2 md:grid-cols-4">
        <StatItem
          finalNumber={EVENT_DATA.durationHours}
          label="Hours"
          suffix=" HRS"
          isFirstRow={true}
          isOddCol={true}
          isLastCol={false}
        />
        <StatItem
          finalNumber={EVENT_DATA.participantsCount}
          label="Participants"
          suffix="+"
          isFirstRow={true}
          isOddCol={false}
          isLastCol={false}
        />
        <StatItem
          finalNumber={EVENT_DATA.prizePoolAmount}
          label="Prize Pool"
          prefix="₹"
          isFirstRow={false}
          isOddCol={true}
          isLastCol={false}
        />
        <StatItem
          finalNumber={EVENT_DATA.tracksCount}
          label="Tracks"
          suffix=" TRACKS"
          isFirstRow={false}
          isOddCol={false}
          isLastCol={true}
        />
      </ConvergeGroup>
    </div>
  );
};
