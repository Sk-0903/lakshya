import React, { useRef, useState, useEffect } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('translate3d(0px, 0px, 0px)');
  const [transition, setTransition] = useState(inactiveTransition);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Check if mouse is within padding of bounding box
      const isWithinX =
        e.clientX >= rect.left - padding && e.clientX <= rect.right + padding;
      const isWithinY =
        e.clientY >= rect.top - padding && e.clientY <= rect.bottom + padding;

      if (isWithinX && isWithinY) {
        const deltaX = (e.clientX - centerX) / strength;
        const deltaY = (e.clientY - centerY) / strength;
        setTransition(activeTransition);
        setTransform(`translate3d(${deltaX}px, ${deltaY}px, 0px)`);
      } else {
        setTransition(inactiveTransition);
        setTransform('translate3d(0px, 0px, 0px)');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        transform,
        transition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};
