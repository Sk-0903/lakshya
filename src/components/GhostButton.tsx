import React from 'react';
import { motion } from 'framer-motion';

interface GhostButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const GhostButton: React.FC<GhostButtonProps> = ({
  label,
  href,
  onClick,
  className = '',
}) => {
  return (
    <motion.a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`inline-flex items-center justify-center rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] hover:bg-[#D7E2EA]/10 uppercase tracking-widest font-medium text-xs sm:text-sm px-6 py-2.5 md:px-8 md:py-3 transition-colors cursor-pointer select-none ${className}`}
    >
      {label}
    </motion.a>
  );
};
