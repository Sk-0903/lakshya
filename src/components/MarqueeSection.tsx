import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';
import { GENERATED_TILES, TileCard } from './TileFactory';

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  // Velocity-driven skew: up to 4 degrees based on scroll velocity
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 40, stiffness: 300 });
  const skewX = useTransform(smoothVelocity, [-1500, 0, 1500], [-4, 0, 4]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const calculatedOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(calculatedOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const row1Tiles = [...GENERATED_TILES.slice(0, 11), ...GENERATED_TILES.slice(0, 11), ...GENERATED_TILES.slice(0, 11)];
  const row2Tiles = [...GENERATED_TILES.slice(11), ...GENERATED_TILES.slice(11), ...GENERATED_TILES.slice(11)];

  const row1Transform = `translateX(${offset - 200}px)`;
  const row2Transform = `translateX(${-(offset - 200)}px)`;

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-16 overflow-hidden w-full select-none"
    >
      <motion.div style={{ skewX }} className="flex flex-col gap-6 w-full">
        {/* Row 1 - Moves RIGHT on scroll */}
        <div
          className="flex gap-3 whitespace-nowrap"
          style={{
            transform: row1Transform,
            willChange: 'transform',
          }}
        >
          {row1Tiles.map((tile, index) => (
            <TileCard key={`row1-${tile.id}-${index}`} tile={tile} />
          ))}
        </div>

        {/* Divider Thin Centered Repeated Line */}
        <div className="w-full overflow-hidden py-3 border-y border-white/5 bg-black/30 flex items-center justify-center">
          <p className="whitespace-nowrap text-xs sm:text-sm font-mono uppercase tracking-[0.4em] text-[#D7E2EA]/60 select-none">
            Code &bull; Design &bull; Build &bull; Pitch &bull; Win &bull; Code &bull; Design &bull; Build &bull; Pitch &bull; Win &bull; Code &bull; Design &bull; Build &bull; Pitch &bull; Win
          </p>
        </div>

        {/* Row 2 - Moves LEFT on scroll */}
        <div
          className="flex gap-3 whitespace-nowrap"
          style={{
            transform: row2Transform,
            willChange: 'transform',
          }}
        >
          {row2Tiles.map((tile, index) => (
            <TileCard key={`row2-${tile.id}-${index}`} tile={tile} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};
