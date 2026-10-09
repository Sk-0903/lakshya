import React from 'react';
import { motion } from 'framer-motion';

interface ContactButtonProps {
  label?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  label = 'Register Now',
  href = '#register',
  onClick,
  className = '',
  target,
  rel,
}) => {
  const buttonStyle: React.CSSProperties = {
    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
    boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
    outline: '2px solid white',
    outlineOffset: '-3px',
  };

  const innerContent = (
    <>
      <span className="relative z-10">{label}</span>
      {/* Light sweep hover overlay */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 pointer-events-none rounded-full" />
    </>
  );

  const baseClasses = `
    group relative overflow-hidden inline-flex items-center justify-center rounded-full
    px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4
    text-xs sm:text-sm md:text-base
    text-white font-medium uppercase tracking-widest
    select-none cursor-pointer transition-shadow
    ${className}
  `;

  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className={baseClasses}
        style={buttonStyle}
      >
        {innerContent}
      </motion.button>
    );
  }

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={baseClasses}
      style={buttonStyle}
    >
      {innerContent}
    </motion.a>
  );
};
