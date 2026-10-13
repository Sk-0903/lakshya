import React, { useEffect } from 'react';
import Lenis from 'lenis';

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      syncTouch: false, // Ensure native smooth touch scrolling on mobile
    });

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    // Expose lenis instance globally for smooth scrollTo triggers
    (window as any).__lenis = lenis;

    // Synchronize html background to prevent overscroll bounce color mismatch
    const syncOverscrollColor = () => {
      const topSection = document.getElementById('top');
      if (topSection) {
        const rect = topSection.getBoundingClientRect();
        // While within the hero video runway, keep html background black (#0C0C0C)
        if (window.scrollY < rect.height * 0.88 && rect.bottom > window.innerHeight * 0.1) {
          document.documentElement.style.backgroundColor = '#0C0C0C';
        } else {
          document.documentElement.style.backgroundColor = '#0A1430';
        }
      }
    };

    lenis.on('scroll', syncOverscrollColor);
    window.addEventListener('scroll', syncOverscrollColor, { passive: true });
    syncOverscrollColor();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', syncOverscrollColor);
      lenis.destroy();
      delete (window as any).__lenis;
    };
  }, []);

  return <>{children}</>;
};
