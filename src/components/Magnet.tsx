import React, { useRef, useState, useEffect } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 100,
  strength = 4,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('translate3d(0px, 0px, 0px)');
  const [transition, setTransition] = useState('transform 0.6s ease-in-out');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const isWithinX =
        e.clientX >= rect.left - padding && e.clientX <= rect.right + padding;
      const isWithinY =
        e.clientY >= rect.top - padding && e.clientY <= rect.bottom + padding;

      if (isWithinX && isWithinY) {
        const deltaX = (e.clientX - centerX) / strength;
        const deltaY = (e.clientY - centerY) / strength;
        setTransition('transform 0.3s ease-out');
        setTransform(`translate3d(${deltaX}px, ${deltaY}px, 0px)`);
      } else {
        setTransition('transform 0.6s ease-in-out');
        setTransform('translate3d(0px, 0px, 0px)');
      }
    };

    const handleMouseLeave = () => {
      setTransition('transform 0.6s ease-in-out');
      setTransform('translate3d(0px, 0px, 0px)');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [padding, strength]);

  if (isTouchDevice) {
    return <div className={`inline-block ${className}`}>{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      className={`inline-block ${className}`}
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
