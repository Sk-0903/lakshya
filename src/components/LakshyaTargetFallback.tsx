import React from 'react';

export const LakshyaTargetFallback: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      {/* Ambient Radial Aura */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#B600A8]/20 via-[#7621B0]/15 to-[#BE4C00]/20 rounded-full blur-3xl pointer-events-none" />

      <svg
        className="w-full h-full drop-shadow-[0_20px_45px_rgba(182,0,168,0.35)]"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ringGrad1" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1a1a1f" />
            <stop offset="50%" stopColor="#2e2e38" />
            <stop offset="100%" stopColor="#141418" />
          </linearGradient>
          <linearGradient id="accentGrad" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#B600A8" />
            <stop offset="50%" stopColor="#7621B0" />
            <stop offset="100%" stopColor="#BE4C00" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Ring 5 - Metal */}
        <circle cx="100" cy="100" r="90" stroke="url(#ringGrad1)" strokeWidth="8" />
        <circle cx="100" cy="100" r="94" stroke="#D7E2EA" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="4 4" />

        {/* Ring 4 - Magenta Accent */}
        <circle cx="100" cy="100" r="74" stroke="#B600A8" strokeWidth="7" />

        {/* Ring 3 - Metal */}
        <circle cx="100" cy="100" r="58" stroke="url(#ringGrad1)" strokeWidth="7" />

        {/* Ring 2 - Electric Purple Accent */}
        <circle cx="100" cy="100" r="42" stroke="#7621B0" strokeWidth="7" />

        {/* Ring 1 - Fiery Amber Accent */}
        <circle cx="100" cy="100" r="26" stroke="#BE4C00" strokeWidth="6" />

        {/* Bullseye Center Core (Glowing) */}
        <circle cx="100" cy="100" r="14" fill="url(#accentGrad)" filter="url(#glow)" />
        <circle cx="100" cy="100" r="6" fill="#FFFFFF" />

        {/* Crosshair Guides */}
        <line x1="100" y1="4" x2="100" y2="196" stroke="#D7E2EA" strokeOpacity="0.15" strokeWidth="1" />
        <line x1="4" y1="100" x2="196" y2="100" stroke="#D7E2EA" strokeOpacity="0.15" strokeWidth="1" />

        {/* 4 Tick Marks on Outer Rim */}
        <rect x="98" y="6" width="4" height="6" rx="1" fill="#38bdf8" />
        <rect x="98" y="188" width="4" height="6" rx="1" fill="#38bdf8" />
        <rect x="6" y="98" width="6" height="4" rx="1" fill="#38bdf8" />
        <rect x="188" y="98" width="6" height="4" rx="1" fill="#38bdf8" />

        {/* 3D Arrow Embedded in Bullseye at an Angle */}
        <g transform="translate(100, 100) rotate(-45)">
          {/* Arrow Tip */}
          <polygon points="0,-4 5,8 -5,8" fill="#FFFFFF" filter="url(#glow)" />
          {/* Arrow Shaft extending outwards */}
          <line x1="0" y1="6" x2="0" y2="70" stroke="#BBCCD7" strokeWidth="3" strokeLinecap="round" />
          {/* Arrow Fins */}
          <polygon points="0,55 -9,72 0,66" fill="#B600A8" />
          <polygon points="0,55 9,72 0,66" fill="#BE4C00" />
        </g>
      </svg>
    </div>
  );
};
