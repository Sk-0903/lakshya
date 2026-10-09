import React, { useEffect, useState } from 'react';

interface CountdownProps {
  targetISO: string;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown: React.FC<CountdownProps> = ({ targetISO, className = '' }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetISO) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetISO]);

  const units = [
    { label: 'DAYS', value: timeLeft.days.toString().padStart(2, '0') },
    { label: 'HRS', value: timeLeft.hours.toString().padStart(2, '0') },
    { label: 'MIN', value: timeLeft.minutes.toString().padStart(2, '0') },
    { label: 'SEC', value: timeLeft.seconds.toString().padStart(2, '0') },
  ];

  return (
    <div className={`flex items-center justify-center gap-6 sm:gap-10 select-none ${className}`}>
      {units.map((unit, idx) => (
        <div key={unit.label} className="flex flex-col items-center">
          <span className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-none">
            {unit.value}
          </span>
          <span className="text-[10px] sm:text-xs uppercase font-mono tracking-[0.25em] text-[#D7E2EA]/50 mt-1.5">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
};
