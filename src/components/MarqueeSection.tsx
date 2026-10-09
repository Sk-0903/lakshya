import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GENERATED_TILES, TileCard } from './TileFactory';

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Use compositor-driven scroll transform instead of state re-renders
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const row1X = useTransform(scrollYProgress, [0, 1], [-120, 160]);
  const row2X = useTransform(scrollYProgress, [0, 1], [160, -120]);

  const row1Tiles = [...GENERATED_TILES.slice(0, 11), ...GENERATED_TILES.slice(0, 11)];
  const row2Tiles = [...GENERATED_TILES.slice(11), ...GENERATED_TILES.slice(11)];

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] py-20 sm:py-28 overflow-hidden w-full select-none border-y border-white/[0.04]"
    >
      <div className="flex flex-col gap-6 w-full">
        {/* Row 1 - Moves RIGHT smoothly on scroll */}
        <motion.div
          style={{ x: row1X }}
          className="flex gap-5 whitespace-nowrap will-change-transform"
        >
          {row1Tiles.map((tile, index) => (
            <TileCard key={`row1-${tile.id}-${index}`} tile={tile} />
          ))}
        </motion.div>

        {/* Center Ticker Line */}
        <div className="w-full overflow-hidden py-3 bg-white/[0.02] border-y border-white/[0.06] flex items-center justify-center">
          <p className="whitespace-nowrap text-xs font-mono uppercase tracking-[0.35em] text-[#D7E2EA]/50 select-none">
            Code &bull; Design &bull; Build &bull; Pitch &bull; Win &bull; 05-06 NOV 2026 &bull; Code &bull; Design &bull; Build &bull; Pitch &bull; Win
          </p>
        </div>

        {/* Row 2 - Moves LEFT smoothly on scroll */}
        <motion.div
          style={{ x: row2X }}
          className="flex gap-5 whitespace-nowrap will-change-transform"
        >
          {row2Tiles.map((tile, index) => (
            <TileCard key={`row2-${tile.id}-${index}`} tile={tile} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
