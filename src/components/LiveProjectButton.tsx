import React from 'react';

interface LiveProjectButtonProps {
  href?: string;
  onClick?: () => void;
  className?: string;
  label?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  href = '#',
  onClick,
  className = '',
  label = 'Live Project',
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
      <button type="button" onClick={onClick} className={baseClasses}>
        {label}
      </button>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
      {label}
    </a>
  );
};
