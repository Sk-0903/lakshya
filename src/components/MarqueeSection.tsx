import React, { useEffect, useRef, useState } from 'react';
import { GENERATED_TILES, TileCard } from './TileFactory';

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const calculatedOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.22;
      setOffset(calculatedOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const row1Tiles = [...GENERATED_TILES.slice(0, 11), ...GENERATED_TILES.slice(0, 11), ...GENERATED_TILES.slice(0, 11)];
  const row2Tiles = [...GENERATED_TILES.slice(11), ...GENERATED_TILES.slice(11), ...GENERATED_TILES.slice(11)];

  const row1Transform = `translateX(${offset - 100}px)`;
  const row2Transform = `translateX(${-(offset - 100)}px)`;

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] py-24 sm:py-32 overflow-hidden w-full select-none border-y border-white/[0.04]"
    >
      <div className="flex flex-col gap-6 w-full">
        {/* Row 1 - Moves RIGHT on scroll */}
        <div
          className="flex gap-5 whitespace-nowrap"
          style={{
            transform: row1Transform,
            willChange: 'transform',
          }}
        >
          {row1Tiles.map((tile, index) => (
            <TileCard key={`row1-${tile.id}-${index}`} tile={tile} />
          ))}
        </div>

        {/* Clean Center Banner Ticker */}
        <div className="w-full overflow-hidden py-4 bg-white/[0.02] border-y border-white/[0.06] flex items-center justify-center">
          <p className="whitespace-nowrap text-xs font-mono uppercase tracking-[0.35em] text-[#D7E2EA]/50 select-none">
            Code &bull; Design &bull; Build &bull; Pitch &bull; Win &bull; 05-06 NOV 2026 &bull; Code &bull; Design &bull; Build &bull; Pitch &bull; Win
          </p>
        </div>

        {/* Row 2 - Moves LEFT on scroll */}
        <div
          className="flex gap-5 whitespace-nowrap"
          style={{
            transform: row2Transform,
            willChange: 'transform',
          }}
        >
          {row2Tiles.map((tile, index) => (
            <TileCard key={`row2-${tile.id}-${index}`} tile={tile} />
          ))}
        </div>
      </div>
    </section>
  );
};
