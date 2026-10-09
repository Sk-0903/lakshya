import React from 'react';
import { motion } from 'framer-motion';

interface GhostButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
}

export const GhostButton: React.FC<GhostButtonProps> = ({
  label,
  href = '#register',
  onClick,
  className = '',
  target,
  rel,
}) => {
  const baseClasses = `
    inline-flex items-center justify-center rounded-full
    border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest
    px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base
    transition-colors duration-200 hover:bg-[#D7E2EA]/10
    cursor-pointer select-none
    ${className}
  `;

  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={baseClasses}
      >
        {label}
      </motion.button>
    );
  }

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={baseClasses}
    >
      {label}
    </motion.a>
  );
};
