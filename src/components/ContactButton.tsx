import React from 'react';

interface ContactButtonProps {
  onClick?: () => void;
  href?: string;
  className?: string;
  label?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  onClick,
  href = '#contact',
  className = '',
  label = 'Contact Me',
}) => {
  const buttonStyle: React.CSSProperties = {
    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
    boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
    outline: '2px solid white',
    outlineOffset: '-3px',
  };

  const baseClasses = `
    inline-flex items-center justify-center rounded-full
    px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4
    text-xs sm:text-sm md:text-base
    text-white font-medium uppercase tracking-widest
    transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]
    cursor-pointer select-none
    ${className}
  `;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={baseClasses}
        style={buttonStyle}
      >
        {label}
      </button>
    );
  }

  return (
    <a
      href={href}
      className={baseClasses}
      style={buttonStyle}
    >
      {label}
    </a>
  );
};
