import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownProps {
  targetISO: string;
  className?: string;
  compact?: boolean;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const DigitFlip: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  const formatted = value.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden w-12 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 rounded-2xl border border-[#D7E2EA]/30 bg-black/40 backdrop-blur-md flex items-center justify-center shadow-lg">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={formatted}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-mono tracking-tight"
          >
            {formatted}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[9px] sm:text-[10px] md:text-[11px] font-mono uppercase tracking-widest text-[#BBCCD7]/70 mt-1.5">
        {label}
      </span>
    </div>
  );
};

export const Countdown: React.FC<CountdownProps> = ({ targetISO, className = '', compact = false }) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const targetTime = new Date(targetISO).getTime();
      const now = new Date().getTime();
      const difference = Math.max(0, targetTime - now);

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetISO]);

  if (compact) {
    return (
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-[#D7E2EA]/20 backdrop-blur text-xs font-mono text-[#D7E2EA] ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-semibold text-white">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
        <span className="text-[10px] uppercase tracking-wider text-[#BBCCD7]/60">UNTIL KICKOFF</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 sm:gap-3 md:gap-4 select-none ${className}`}>
      <DigitFlip value={timeLeft.days} label="DAYS" />
      <span className="text-xl sm:text-2xl font-bold text-[#D7E2EA]/40 -mt-5">:</span>
      <DigitFlip value={timeLeft.hours} label="HOURS" />
      <span className="text-xl sm:text-2xl font-bold text-[#D7E2EA]/40 -mt-5">:</span>
      <DigitFlip value={timeLeft.minutes} label="MINS" />
      <span className="text-xl sm:text-2xl font-bold text-[#D7E2EA]/40 -mt-5">:</span>
      <DigitFlip value={timeLeft.seconds} label="SECS" />
    </div>
  );
};
