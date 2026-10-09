import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Countdown } from './Countdown';
import { ContactButton } from './ContactButton';
import { Magnet } from './Magnet';
import { EVENT_DATA } from '../data/event';

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
  const step1Scale = useTransform(smoothProgress, [0, 0.24], [1, 0.96]);

  // Step 2: 0.25 to 0.55
  const step2Opacity = useTransform(smoothProgress, [0.24, 0.32, 0.48, 0.55], [0, 1, 1, 0]);
  const step2Y = useTransform(smoothProgress, [0.24, 0.32, 0.48, 0.55], [20, 0, 0, -20]);

  // Step 3: 0.55 to 0.85
  const step3Opacity = useTransform(smoothProgress, [0.55, 0.63, 0.78, 0.85], [0, 1, 1, 0]);
  const step3Y = useTransform(smoothProgress, [0.55, 0.63, 0.78, 0.85], [20, 0, 0, -20]);

  // Step 4: 0.85 to 1.00
  const step4Opacity = useTransform(smoothProgress, [0.85, 0.92, 1], [0, 1, 1]);
  const step4Y = useTransform(smoothProgress, [0.85, 0.92, 1], [20, 0, 0]);

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

        {/* Step 1: 0.00 to 0.25 -> Title + Tagline + Scroll indicator */}
        <motion.div
          style={{ opacity: step1Opacity, scale: step1Scale }}
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none"
        >
          <div className="max-w-5xl mx-auto flex flex-col items-center">
            <h1 className="hero-heading font-heading font-black uppercase text-[clamp(3.5rem,13vw,14rem)] tracking-tight leading-none">
              Lakshya&apos;26
            </h1>
            <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#D7E2EA]/60 font-mono mt-4 sm:mt-6">
              {EVENT_DATA.tagline}
            </p>
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

        {/* Step 2: 0.25 to 0.55 -> [24] hours. [500+] builders. One goal. */}
        <motion.div
          style={{ opacity: step2Opacity, y: step2Y }}
          className="absolute inset-0 flex items-center justify-center p-6 text-center pointer-events-none"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="hero-heading font-heading font-black uppercase text-[clamp(2.5rem,8vw,7rem)] tracking-tight leading-none">
              24 Hours. 500+ Builders. One Goal.
            </h2>
            <p className="text-xs sm:text-sm uppercase font-mono tracking-[0.3em] text-[#D7E2EA]/60 mt-6">
              SJB INSTITUTE OF TECHNOLOGY &bull; BANGALORE
            </p>
          </div>
        </motion.div>

        {/* Step 3: 0.55 to 0.85 -> [DATES] · [VENUE] + Countdown */}
        <motion.div
          style={{ opacity: step3Opacity, y: step3Y }}
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none"
        >
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
            <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-white/60">
              {EVENT_DATA.dates} &bull; {EVENT_DATA.collegeShort}
            </div>
            <h2 className="hero-heading font-heading font-black uppercase text-[clamp(2rem,6vw,5rem)] tracking-tight leading-none">
              The Clock is Ticking
            </h2>
            <div className="mt-4 pointer-events-auto">
              <Countdown targetISO={EVENT_DATA.startTimestampISO} />
            </div>
          </div>
        </motion.div>

        {/* Step 4: 0.85 to 1.00 -> Registrations are open + Register button */}
        <motion.div
          style={{ opacity: step4Opacity, y: step4Y }}
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
        >
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-emerald-400">
              LIMITED SPOTS AVAILABLE
            </span>
            <h2 className="hero-heading font-heading font-black uppercase text-[clamp(2.5rem,7vw,6.5rem)] tracking-tight leading-none">
              Registrations Are Open
            </h2>
            <p className="text-sm sm:text-base text-[#D7E2EA]/70 max-w-md font-light leading-relaxed">
              Assemble your squad of 2–4 builders and enter the 24-hour sprint.
            </p>
            <div className="mt-2 pointer-events-auto">
              <Magnet padding={100} strength={4}>
                <ContactButton label="Register Now" href={EVENT_DATA.registrationUrl} />
              </Magnet>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
