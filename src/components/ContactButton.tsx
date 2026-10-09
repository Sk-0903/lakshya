import React from 'react';
import { motion } from 'framer-motion';

interface ContactButtonProps {
  label?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  label = 'Register Now',
  href = 'https://forms.gle/lakshya26',
  onClick,
  className = '',
}) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
      className={`inline-flex items-center justify-center rounded-full text-white uppercase tracking-widest font-medium text-xs sm:text-sm md:text-base px-8 py-3.5 md:px-12 md:py-4 select-none cursor-pointer transition-shadow hover:brightness-110 ${className}`}
    >
      {label}
    </motion.a>
  );
};
