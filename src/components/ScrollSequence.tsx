import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Countdown } from './Countdown';
import { ContactButton } from './ContactButton';
import { Magnet } from './Magnet';
import { EVENT_DATA } from '../data/event';

const HERO_LETTERS = [
  { char: 'L', initX: -20, initY: -14, initRot: -12, initScale: 0.8 },
  { char: 'a', initX: 14, initY: 15, initRot: 10, initScale: 1.3 },
  { char: 'k', initX: -16, initY: 16, initRot: -8, initScale: 0.9 },
  { char: 's', initX: 22, initY: -12, initRot: 14, initScale: 1.4 },
  { char: 'h', initX: -10, initY: -16, initRot: -6, initScale: 1.1 },
  { char: 'y', initX: 16, initY: 14, initRot: 9, initScale: 0.75 },
  { char: 'a', initX: -22, initY: 10, initRot: -11, initScale: 1.25 },
  { char: "'", initX: 8, initY: -18, initRot: 15, initScale: 1.5 },
  { char: '2', initX: 18, initY: 16, initRot: -10, initScale: 0.85 },
  { char: '6', initX: 24, initY: -14, initRot: 12, initScale: 1.2 },
];

const ConvergingHeroLetter: React.FC<{
  item: typeof HERO_LETTERS[0];
  progress: any;
  isReducedMotion: boolean;
}> = ({ item, progress, isReducedMotion }) => {
  const x = useTransform(progress, [0, 0.16, 0.22], [`${item.initX}vw`, '0vw', '0vw']);
  const y = useTransform(progress, [0, 0.16, 0.22], [`${item.initY}vh`, '0vh', '0vh']);
  const rotate = useTransform(progress, [0, 0.16, 0.22], [item.initRot, 0, 0]);
  const scale = useTransform(progress, [0, 0.16, 0.22, 0.25], [item.initScale, 1, 1, 1.08]);
  const opacity = useTransform(progress, [0, 0.12, 0.18, 0.24], [0, 0.95, 1, 0]);

  if (isReducedMotion) {
    return <span className="inline-block">{item.char}</span>;
  }

  return (
    <motion.span
      style={{ x, y, rotate, scale, opacity }}
      className="inline-block"
    >
      {item.char}
    </motion.span>
  );
};

export const ScrollSequence: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const isVisibleRef = useRef(true);

  // Scroll Progress across 300vh (250vh mobile)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth the scrub progress using specified spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  // Text step crossfades
  // Step 1: 0.00 to 0.25
  const step1Opacity = useTransform(smoothProgress, [0, 0.18, 0.24], [1, 1, 0]);
  const step1Scale = useTransform(smoothProgress, [0, 0.18, 0.24], [1, 1, 1.08]);
  const taglineY = useTransform(smoothProgress, [0.06, 0.16, 0.24], [36, 0, -16]);
  const taglineOpacity = useTransform(smoothProgress, [0.06, 0.14, 0.22, 0.25], [0, 1, 1, 0]);

  // Step 2: 0.25 to 0.55 (Heading slides in from left, branding from right)
  const step2Opacity = useTransform(smoothProgress, [0.24, 0.32, 0.48, 0.55], [0, 1, 1, 0]);
  const step2HeadingX = useTransform(smoothProgress, [0.24, 0.32, 0.48, 0.55], [-36, 0, 0, -36]);
  const step2BrandX = useTransform(smoothProgress, [0.24, 0.32, 0.48, 0.55], [36, 0, 0, 36]);

  // Step 3: 0.55 to 0.85 (Heading from top, Countdown from bottom)
  const step3Opacity = useTransform(smoothProgress, [0.55, 0.63, 0.78, 0.85], [0, 1, 1, 0]);
  const step3HeadingY = useTransform(smoothProgress, [0.55, 0.63, 0.78, 0.85], [-30, 0, 0, -30]);
  const step3CountdownY = useTransform(smoothProgress, [0.55, 0.63, 0.78, 0.85], [40, 0, 0, 40]);

  // Step 4: 0.85 to 1.00 (Heading from top, Register button from bottom)
  const step4Opacity = useTransform(smoothProgress, [0.85, 0.92, 1], [0, 1, 1]);
  const step4HeadingY = useTransform(smoothProgress, [0.85, 0.92, 1], [-30, 0, 0]);
  const step4ButtonY = useTransform(smoothProgress, [0.85, 0.92, 1], [36, 0, 0]);

  // Check device size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const totalFrames = isMobile ? EVENT_DATA.mobileFrameCount : EVENT_DATA.desktopFrameCount;
  const folder = isMobile ? 'mobile' : 'desktop';

  // Frame Cache
  const framesCacheRef = useRef<Map<number, ImageBitmap | HTMLImageElement>>(new Map());
  const lastRenderedIndexRef = useRef<number>(-1);
  const currentTargetIndexRef = useRef<number>(1);

  // Procedural Canvas Target Fallback Render
  const drawProceduralTarget = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, p: number) => {
    ctx.fillStyle = '#0C0C0C';
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) * 0.35;

    // Draw concentric thin rings
    const ringCount = 5;
    for (let i = 1; i <= ringCount; i++) {
      const r = (maxRadius / ringCount) * i;
      const ringProgress = Math.max(0, Math.min(1, p * ringCount - (i - 1)));
      if (ringProgress > 0) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2 * ringProgress);
        ctx.strokeStyle = i === 1 ? 'rgba(182, 0, 168, 0.8)' : 'rgba(215, 226, 234, 0.12)';
        ctx.lineWidth = i === 1 ? 2.5 : 1;
        ctx.stroke();
      }
    }

    // Crosshairs
    const lineLen = maxRadius * 1.15 * Math.min(1, p * 1.5);
    ctx.strokeStyle = 'rgba(215, 226, 234, 0.18)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(centerX - lineLen, centerY);
    ctx.lineTo(centerX + lineLen, centerY);
    ctx.moveTo(centerX, centerY - lineLen);
    ctx.lineTo(centerX, centerY + lineLen);
    ctx.stroke();

    // Bullseye center glow
    if (p > 0.6) {
      const coreAlpha = (p - 0.6) / 0.4;
      const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 36);
      grad.addColorStop(0, `rgba(255, 255, 255, ${coreAlpha})`);
      grad.addColorStop(0.3, `rgba(182, 0, 168, ${coreAlpha * 0.9})`);
      grad.addColorStop(0.7, `rgba(190, 76, 0, ${coreAlpha * 0.6})`);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 36, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  // Draw frame with object-fit: cover
  const drawCover = useCallback((ctx: CanvasRenderingContext2D, img: ImageBitmap | HTMLImageElement, canvasW: number, canvasH: number) => {
    const imgW = img.width;
    const imgH = img.height;
    const scale = Math.max(canvasW / imgW, canvasH / imgH);
    const w = imgW * scale;
    const h = imgH * scale;
    const x = (canvasW - w) / 2;
    const y = (canvasH - h) / 2;

    ctx.drawImage(img, x, y, w, h);
  }, []);

  // Progressive frame loader
  useEffect(() => {
    let isCancelled = false;
    const cache = framesCacheRef.current;
    cache.clear();

    const getFrameUrl = (index: number) => {
      const padded = index.toString().padStart(4, '0');
      return `/frames/${folder}/frame_${padded}.webp`;
    };

    // 1. Load Frame 1 immediately (Poster Frame)
    const loadFrame1 = async () => {
      try {
        const res = await fetch(getFrameUrl(1));
        if (!res.ok) throw new Error('Frame 1 missing');
        const blob = await res.blob();
        const bitmap = 'createImageBitmap' in window ? await createImageBitmap(blob) : await new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = URL.createObjectURL(blob);
        });
        if (!isCancelled) {
          cache.set(1, bitmap);
          // Render frame 1 immediately
          renderCurrentFrame(1);
          // Now progressively load the rest in batches
          preloadRemainingFrames();
        }
      } catch (err) {
        console.warn('Frame sequence failed to load, switching to procedural canvas fallback:', err);
        if (!isCancelled) setUseFallback(true);
      }
    };

    // 2. Preload remaining frames in batches of ~10, prioritizing nearest to current scroll target
    const preloadRemainingFrames = async () => {
      const pending = new Set<number>();
      for (let i = 2; i <= totalFrames; i++) {
        pending.add(i);
      }

      while (pending.size > 0 && !isCancelled) {
        // Find 10 nearest frames to currentTargetIndexRef
        const target = currentTargetIndexRef.current;
        const sorted = Array.from(pending).sort((a, b) => Math.abs(a - target) - Math.abs(b - target));
        const batch = sorted.slice(0, 10);

        await Promise.all(
          batch.map(async (idx) => {
            try {
              const res = await fetch(getFrameUrl(idx));
              if (!res.ok) return;
              const blob = await res.blob();
              const bitmap = 'createImageBitmap' in window ? await createImageBitmap(blob) : await new Promise<HTMLImageElement>((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = URL.createObjectURL(blob);
              });
              if (!isCancelled) {
                cache.set(idx, bitmap);
              }
            } catch {
              // Ignore single dropped frame
            } finally {
              pending.delete(idx);
            }
          })
        );
      }
    };

    loadFrame1();

    return () => {
      isCancelled = true;
    };
  }, [totalFrames, folder]);

  // Main Render Routine inside RAF
  const renderCurrentFrame = useCallback((frameIndex: number, progressVal?: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisibleRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    if (useFallback) {
      drawProceduralTarget(ctx, width, height, progressVal ?? (frameIndex - 1) / (totalFrames - 1));
      lastRenderedIndexRef.current = frameIndex;
      return;
    }

    const cache = framesCacheRef.current;
    // Find nearest loaded frame
    let target = cache.get(frameIndex);
    if (!target) {
      // Find closest loaded frame in cache
      let closestDist = Infinity;
      let closestIdx = 1;
      for (const idx of cache.keys()) {
        const dist = Math.abs(idx - frameIndex);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = idx;
        }
      }
      target = cache.get(closestIdx);
    }

    if (target) {
      ctx.clearRect(0, 0, width, height);
      drawCover(ctx, target, width, height);
      lastRenderedIndexRef.current = frameIndex;
    }
  }, [useFallback, totalFrames, drawProceduralTarget, drawCover]);

  // Canvas Resizing with devicePixelRatio cap
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(isMobile ? 1.5 : 2.0, window.devicePixelRatio || 1);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      // Re-draw current frame after resize
      renderCurrentFrame(currentTargetIndexRef.current);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [isMobile, renderCurrentFrame]);

  // IntersectionObserver to pause rendering when offscreen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Hook smooth progress changes to RAF draw
  useEffect(() => {
    let animId: number;

    const unsubscribe = smoothProgress.on('change', (latestProgress) => {
      const rawIndex = Math.round(latestProgress * (totalFrames - 1)) + 1;
      const clampedIndex = Math.max(1, Math.min(totalFrames, rawIndex));
      currentTargetIndexRef.current = clampedIndex;

      if (clampedIndex !== lastRenderedIndexRef.current || useFallback) {
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(() => {
          renderCurrentFrame(clampedIndex, latestProgress);
        });
      }
    });

    return () => {
      unsubscribe();
      cancelAnimationFrame(animId);
    };
  }, [smoothProgress, totalFrames, renderCurrentFrame, useFallback]);

  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="top"
      ref={containerRef}
      className={`relative w-full ${isMobile ? 'h-[250vh]' : 'h-[300vh]'} select-none`}
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#0C0C0C]">
        {/* Render Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Ambient Dark Vignette for Ultra-Crisp Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/40 to-[#0C0C0C]/70 pointer-events-none" />

        {/* ================= OVERLAY TEXT STEPS ================= */}

        {/* Step 1: 0.00 to 0.25 -> Assembling Lakshya'26 Letters + Tagline */}
        <motion.div
          style={{ opacity: step1Opacity, scale: step1Scale }}
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none"
        >
          <div className="max-w-5xl mx-auto flex flex-col items-center">
            <h1
              className="hero-heading font-heading font-black uppercase text-[clamp(3.5rem,13vw,14rem)] tracking-tight leading-none"
              aria-label="Lakshya'26"
            >
              {HERO_LETTERS.map((item, idx) => (
                <ConvergingHeroLetter
                  key={idx}
                  item={item}
                  progress={smoothProgress}
                  isReducedMotion={shouldReduceMotion}
                />
              ))}
            </h1>
            <motion.p
              style={{ y: taglineY, opacity: taglineOpacity }}
              className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#D7E2EA]/60 font-mono mt-4 sm:mt-6"
            >
              {EVENT_DATA.tagline}
            </motion.p>
          </div>

          {/* Animated Scroll Down Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
            <span className="text-[10px] uppercase font-mono tracking-[0.3em]">SCROLL</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="w-4 h-4 text-white/50" />
            </motion.div>
          </div>
        </motion.div>

        {/* Step 2: 0.25 to 0.55 -> [24] hours (Left) + SJBIT (Right) */}
        <motion.div
          style={{ opacity: step2Opacity }}
          className="absolute inset-0 flex items-center justify-center p-6 text-center pointer-events-none"
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <motion.h2
              style={{ x: step2HeadingX }}
              className="hero-heading font-heading font-black uppercase text-[clamp(2.5rem,8vw,7rem)] tracking-tight leading-none"
            >
              24 Hours. 500+ Builders. One Goal.
            </motion.h2>
            <motion.p
              style={{ x: step2BrandX }}
              className="text-xs sm:text-sm uppercase font-mono tracking-[0.3em] text-[#D7E2EA]/60 mt-6"
            >
              SJB INSTITUTE OF TECHNOLOGY &bull; BANGALORE
            </motion.p>
          </div>
        </motion.div>

        {/* Step 3: 0.55 to 0.85 -> Heading (Top) + Countdown (Bottom) */}
        <motion.div
          style={{ opacity: step3Opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none"
        >
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
            <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-white/60">
              {EVENT_DATA.dates} &bull; {EVENT_DATA.collegeShort}
            </div>
            <motion.h2
              style={{ y: step3HeadingY }}
              className="hero-heading font-heading font-black uppercase text-[clamp(2rem,6vw,5rem)] tracking-tight leading-none"
            >
              The Clock is Ticking
            </motion.h2>
            <motion.div style={{ y: step3CountdownY }} className="mt-4 pointer-events-auto">
              <Countdown targetISO={EVENT_DATA.startTimestampISO} />
            </motion.div>
          </div>
        </motion.div>

        {/* Step 4: 0.85 to 1.00 -> Heading (Top) + Register button (Bottom) */}
        <motion.div
          style={{ opacity: step4Opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
        >
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-emerald-400">
              LIMITED SPOTS AVAILABLE
            </span>
            <motion.h2
              style={{ y: step4HeadingY }}
              className="hero-heading font-heading font-black uppercase text-[clamp(2.5rem,7vw,6.5rem)] tracking-tight leading-none"
            >
              Registrations Are Open
            </motion.h2>
            <p className="text-sm sm:text-base text-[#D7E2EA]/70 max-w-md font-light leading-relaxed">
              Assemble your squad of 2–4 builders and enter the 24-hour sprint.
            </p>
            <motion.div style={{ y: step4ButtonY }} className="mt-2 pointer-events-auto">
              <Magnet padding={100} strength={4}>
                <ContactButton label="Register Now" href={EVENT_DATA.registrationUrl} />
              </Magnet>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
