import React from 'react';
import { motion, useScroll } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        transformOrigin: 'left',
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
      }}
      className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none shadow-[0_0_12px_rgba(182,0,168,0.6)]"
    />
  );
};
