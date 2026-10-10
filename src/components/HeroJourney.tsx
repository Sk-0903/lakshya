import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Countdown } from './Countdown';
import { ContactButton } from './ContactButton';
import { Magnet } from './Magnet';
import { EVENT_DATA } from '../data/event';

// Smoothstep helper
function smoothstep(min: number, max: number, value: number) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

// Lakshya'26 Converging letter configuration
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
  // Mapped across segment B step (0.66 to 0.76)
  const x = useTransform(progress, [0.66, 0.72, 0.76], [`${item.initX}vw`, '0vw', '0vw']);
  const y = useTransform(progress, [0.66, 0.72, 0.76], [`${item.initY}vh`, '0vh', '0vh']);
  const rotate = useTransform(progress, [0.66, 0.72, 0.76], [item.initRot, 0, 0]);
  const scale = useTransform(progress, [0.66, 0.72, 0.76, 0.77], [item.initScale, 1, 1, 1.06]);
  const opacity = useTransform(progress, [0.66, 0.70, 0.75, 0.77], [0, 0.95, 1, 0]);

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

export const HeroJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const isVisibleRef = useRef(true);

  // Scroll Progress across 600vh desktop / 480vh mobile
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth the scrub progress using spring physics (stiffness 120, damping 30, mass 0.3)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  // Scroll Indicator only visible at start
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.04, 0.07], [1, 1, 0]);

  // Lakshya Text Steps mapped to Segment B range: 0.66 to 0.97
  // Step 1: 0.66 to 0.77 -> Assembling "Lakshya'26" letters + tagline
  const step1Opacity = useTransform(smoothProgress, [0.66, 0.70, 0.75, 0.77], [0, 1, 1, 0]);
  const step1Scale = useTransform(smoothProgress, [0.66, 0.71, 0.75, 0.77], [0.98, 1, 1, 1.06]);
  const taglineY = useTransform(smoothProgress, [0.68, 0.72, 0.76], [28, 0, -14]);
  const taglineOpacity = useTransform(smoothProgress, [0.68, 0.71, 0.75, 0.77], [0, 1, 1, 0]);

  // Step 2: 0.77 to 0.85 -> 24 Hours. 500+ Builders. One Goal.
  const step2Opacity = useTransform(smoothProgress, [0.77, 0.79, 0.83, 0.85], [0, 1, 1, 0]);
  const step2HeadingX = useTransform(smoothProgress, [0.77, 0.79, 0.83, 0.85], [-36, 0, 0, -36]);
  const step2BrandX = useTransform(smoothProgress, [0.77, 0.79, 0.83, 0.85], [36, 0, 0, 36]);

  // Step 3: 0.85 to 0.93 -> The Clock is Ticking + Countdown
  const step3Opacity = useTransform(smoothProgress, [0.85, 0.87, 0.91, 0.93], [0, 1, 1, 0]);
  const step3HeadingY = useTransform(smoothProgress, [0.85, 0.87, 0.91, 0.93], [-30, 0, 0, -30]);
  const step3CountdownY = useTransform(smoothProgress, [0.85, 0.87, 0.91, 0.93], [40, 0, 0, 40]);

  // Step 4: 0.93 to 1.00 -> Registrations are open + Magnetic Register button (holds till end)
  const step4Opacity = useTransform(smoothProgress, [0.93, 0.95, 1], [0, 1, 1]);
  const step4HeadingY = useTransform(smoothProgress, [0.93, 0.95, 1], [-24, 0, 0]);
  const step4ButtonY = useTransform(smoothProgress, [0.93, 0.95, 1], [28, 0, 0]);

  // Device inspection
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const totalFramesA = isMobile ? EVENT_DATA.segmentA.mobileFrames : EVENT_DATA.segmentA.desktopFrames;
  const totalFramesB = isMobile ? EVENT_DATA.segmentB.mobileFrames : EVENT_DATA.segmentB.desktopFrames;
  const folderA = isMobile ? 'a/mobile' : 'a/desktop';
  const folderB = isMobile ? 'b/mobile' : 'b/desktop';

  // Frame Caches
  const cacheARef = useRef<Map<number, ImageBitmap | HTMLImageElement>>(new Map());
  const cacheBRef = useRef<Map<number, ImageBitmap | HTMLImageElement>>(new Map());

  // Render State tracking to avoid redundant canvas paints
  const lastStateRef = useRef<{
    segment: 'A' | 'B' | 'NONE';
    frameIndex: number;
    scale: number;
    alpha: number;
    p: number;
  }>({
    segment: 'NONE',
    frameIndex: -1,
    scale: -1,
    alpha: -1,
    p: -1,
  });

  const currentScrollPRef = useRef<number>(0);

  // Procedural Target Fallback Render
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

    // Core glow
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

  // Frame URL helpers
  const getFrameUrlA = useCallback((index: number) => {
    const padded = index.toString().padStart(4, '0');
    return `/frames/${folderA}/frame_${padded}.webp`;
  }, [folderA]);

  const getFrameUrlB = useCallback((index: number) => {
    const padded = index.toString().padStart(4, '0');
    return `/frames/${folderB}/frame_${padded}.webp`;
  }, [folderB]);

  // Load single frame helper (ImageBitmap or HTMLImageElement)
  const fetchSingleFrame = async (url: string): Promise<ImageBitmap | HTMLImageElement> => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Frame missing: ${url}`);
    const blob = await res.blob();
    if ('createImageBitmap' in window) {
      return await createImageBitmap(blob);
    }
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = URL.createObjectURL(blob);
    });
  };

  // Progressive Preloading Pipeline:
  // 1. Load A frame 1 immediately (instant poster).
  // 2. Load Segment A in batches prioritized near current progress.
  // 3. In background, load Segment B (first 30 frames guaranteed before progress 0.50).
  useEffect(() => {
    let isCancelled = false;
    const cacheA = cacheARef.current;
    const cacheB = cacheBRef.current;
    cacheA.clear();
    cacheB.clear();

    const startLoading = async () => {
      try {
        // Poster frame (A frame 1)
        const frameA1 = await fetchSingleFrame(getFrameUrlA(1));
        if (!isCancelled) {
          cacheA.set(1, frameA1);
          renderFrameImmediate();
        }
      } catch (err) {
        console.warn('Hero frame A1 failed, enabling fallback:', err);
        if (!isCancelled) setUseFallback(true);
        return;
      }

      // Preload Segment A (all frames)
      const pendingA = new Set<number>();
      for (let i = 2; i <= totalFramesA; i++) pendingA.add(i);

      const loadRemainingA = async () => {
        while (pendingA.size > 0 && !isCancelled) {
          const currentP = currentScrollPRef.current;
          // Approximate target in A (0.0 to 0.42)
          const targetIndex = Math.max(1, Math.min(totalFramesA, Math.round((currentP / 0.42) * (totalFramesA - 1)) + 1));
          const sorted = Array.from(pendingA).sort((a, b) => Math.abs(a - targetIndex) - Math.abs(b - targetIndex));
          const batch = sorted.slice(0, 10);

          await Promise.all(
            batch.map(async (idx) => {
              try {
                const bmp = await fetchSingleFrame(getFrameUrlA(idx));
                if (!isCancelled) cacheA.set(idx, bmp);
              } catch {
                // Ignore single dropped frame
              } finally {
                pendingA.delete(idx);
              }
            })
          );
        }
      };

      // In parallel: Preload Segment B (guarantee B's first 30 frames are ready before progress 0.50)
      const preloadB = async () => {
        // 1. First 30 frames of B
        const first30B = Array.from({ length: Math.min(30, totalFramesB) }, (_, i) => i + 1);
        await Promise.all(
          first30B.map(async (idx) => {
            try {
              const bmp = await fetchSingleFrame(getFrameUrlB(idx));
              if (!isCancelled) cacheB.set(idx, bmp);
            } catch {
              // Ignore
            }
          })
        );

        // 2. Remaining frames of B
        const pendingB = new Set<number>();
        for (let i = 31; i <= totalFramesB; i++) pendingB.add(i);

        while (pendingB.size > 0 && !isCancelled) {
          const currentP = currentScrollPRef.current;
          // Approximate target in B (0.66 to 0.97)
          const targetIndex = Math.max(1, Math.min(totalFramesB, Math.round(((currentP - 0.66) / 0.31) * (totalFramesB - 1)) + 1));
          const sorted = Array.from(pendingB).sort((a, b) => Math.abs(a - targetIndex) - Math.abs(b - targetIndex));
          const batch = sorted.slice(0, 10);

          await Promise.all(
            batch.map(async (idx) => {
              try {
                const bmp = await fetchSingleFrame(getFrameUrlB(idx));
                if (!isCancelled) cacheB.set(idx, bmp);
              } catch {
                // Ignore
              } finally {
                pendingB.delete(idx);
              }
            })
          );
        }
      };

      await Promise.all([loadRemainingA(), preloadB()]);
    };

    startLoading();

    return () => {
      isCancelled = true;
    };
  }, [totalFramesA, totalFramesB, getFrameUrlA, getFrameUrlB]);

  // Main Canvas Draw Routine
  const drawToCanvas = useCallback((
    segment: 'A' | 'B' | 'NONE',
    frameIndex: number,
    scaleTransform: number,
    globalAlpha: number,
    progressVal: number,
    segAProgress?: number
  ) => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisibleRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasW = canvas.width;
    const canvasH = canvas.height;

    // Fast state change check
    const last = lastStateRef.current;
    if (
      last.segment === segment &&
      last.frameIndex === frameIndex &&
      Math.abs(last.scale - scaleTransform) < 0.0005 &&
      Math.abs(last.alpha - globalAlpha) < 0.005 &&
      !useFallback
    ) {
      return;
    }

    // Always clear/fill #0C0C0C first
    ctx.fillStyle = '#0C0C0C';
    ctx.fillRect(0, 0, canvasW, canvasH);

    if (useFallback) {
      drawProceduralTarget(ctx, canvasW, canvasH, progressVal);
      lastStateRef.current = { segment, frameIndex, scale: scaleTransform, alpha: globalAlpha, p: progressVal };
      return;
    }

    if (segment === 'NONE' || globalAlpha <= 0.001) {
      lastStateRef.current = { segment, frameIndex, scale: scaleTransform, alpha: globalAlpha, p: progressVal };
      return;
    }

    const cache = segment === 'A' ? cacheARef.current : cacheBRef.current;
    let img = cache.get(frameIndex);

    // If exact frame is loading, find closest loaded frame in the same segment
    if (!img) {
      let closestDist = Infinity;
      let closestIdx = 1;
      for (const idx of cache.keys()) {
        const dist = Math.abs(idx - frameIndex);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = idx;
        }
      }
      img = cache.get(closestIdx);
    }

    if (!img) {
      // In near-black beat or before ready, hold solid black rather than showing stale frames
      lastStateRef.current = { segment, frameIndex, scale: scaleTransform, alpha: globalAlpha, p: progressVal };
      return;
    }

    const imgW = img.width;
    const imgH = img.height;

    // Calculate base scale according to segment fit rules:
    // Segment B: cover
    // Segment A: cover blending to safe-fit (safe area: x 340-935, y 80-630, 24px pad)
    let baseScale = Math.max(canvasW / imgW, canvasH / imgH);

    if (segment === 'A') {
      const coverScale = Math.max(canvasW / imgW, canvasH / imgH);
      const safeW = 935 - 340; // 595
      const safeH = 630 - 80;  // 550
      const padding = 24;
      const safeScale = Math.min(canvasW / (safeW + padding * 2), canvasH / (safeH + padding * 2));

      // Blend from coverScale to min(coverScale, safeScale) as the logo grows in (progress in A: 0.10 to 0.27)
      const aProg = segAProgress ?? 0;
      const blendFactor = smoothstep(0.10, 0.27, aProg);
      const finalFitScale = coverScale * (1 - blendFactor) + Math.min(coverScale, safeScale) * blendFactor;
      baseScale = finalFitScale;
    }

    const effectiveScale = baseScale * scaleTransform;
    const drawW = imgW * effectiveScale;
    const drawH = imgH * effectiveScale;
    const drawX = (canvasW - drawW) / 2;
    const drawY = (canvasH - drawH) / 2;

    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, globalAlpha));
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();

    lastStateRef.current = {
      segment,
      frameIndex,
      scale: scaleTransform,
      alpha: globalAlpha,
      p: progressVal,
    };
  }, [useFallback, drawProceduralTarget]);

  // Immediate frame render helper
  const renderFrameImmediate = useCallback(() => {
    drawToCanvas('A', 1, 1, 1, 0, 0);
  }, [drawToCanvas]);

  // Canvas Resizing with devicePixelRatio cap (2 desktop, 1.5 mobile)
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

      // Force redraw
      lastStateRef.current.segment = 'NONE';
      const p = currentScrollPRef.current;
      evaluateAndDraw(p);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [isMobile]);

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

  // Evaluation & Mapping Logic:
  // 0.00 - 0.42: Segment A frames 1 to totalFramesA
  // 0.42 - 0.50: Hold A's last frame, push-in scale 1.0 to 1.04
  // 0.50 - 0.60: EXIT: scale 1.04 to 1.3, alpha falls 1 -> 0 (gentle dip through black)
  // 0.60 - 0.66: Near-black beat. Segment B frame 1 fades in (alpha 0 -> 1, scale 1.10 -> 1.0)
  // 0.66 - 0.97: Segment B frames 1 to totalFramesB, scale 1.0, alpha 1.0
  // 0.97 - 1.00: Hold B's last frame
  const evaluateAndDraw = useCallback((p: number) => {
    currentScrollPRef.current = p;

    if (p <= 0.42) {
      // Segment A playback
      const segAProg = Math.max(0, Math.min(1, p / 0.42));
      const rawIdx = Math.round(segAProg * (totalFramesA - 1)) + 1;
      const frameIdx = Math.max(1, Math.min(totalFramesA, rawIdx));
      drawToCanvas('A', frameIdx, 1.0, 1.0, p, segAProg);
    } else if (p <= 0.50) {
      // Hold A's last frame with very slow push-in scale (1.0 -> 1.04)
      const holdProg = (p - 0.42) / 0.08;
      const scale = 1.0 + holdProg * 0.04;
      drawToCanvas('A', totalFramesA, scale, 1.0, p, 1.0);
    } else if (p <= 0.60) {
      // Exit A: scale 1.04 -> 1.30, alpha 1.0 -> 0.0
      const exitProg = (p - 0.50) / 0.10;
      const scale = 1.04 + exitProg * 0.26;
      const alpha = 1.0 - exitProg;
      drawToCanvas('A', totalFramesA, scale, alpha, p, 1.0);
    } else if (p <= 0.66) {
      // Near-black beat: Segment B Frame 1 emerges from dark (scale 1.10 -> 1.0, alpha 0 -> 1)
      const beatProg = (p - 0.60) / 0.06;
      const scale = 1.10 - beatProg * 0.10;
      const alpha = beatProg;
      drawToCanvas('B', 1, scale, alpha, p, 0);
    } else if (p <= 0.97) {
      // Segment B playback
      const segBProg = (p - 0.66) / 0.31;
      const rawIdx = Math.round(segBProg * (totalFramesB - 1)) + 1;
      const frameIdx = Math.max(1, Math.min(totalFramesB, rawIdx));
      drawToCanvas('B', frameIdx, 1.0, 1.0, p, 0);
    } else {
      // Hold B's last frame till 1.00
      drawToCanvas('B', totalFramesB, 1.0, 1.0, p, 0);
    }
  }, [totalFramesA, totalFramesB, drawToCanvas]);

  // Hook smooth progress changes to RAF draw
  useEffect(() => {
    let animId: number;

    const unsubscribe = smoothProgress.on('change', (latestProgress) => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(() => {
        evaluateAndDraw(latestProgress);
      });
    });

    return () => {
      unsubscribe();
      cancelAnimationFrame(animId);
    };
  }, [smoothProgress, evaluateAndDraw]);

  const shouldReduceMotion = useReducedMotion() ?? false;

  // Reduced motion: show static stack
  if (shouldReduceMotion) {
    return (
      <section id="top" className="relative w-full bg-[#0C0C0C] text-[#D7E2EA] select-none py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-16">
          {/* Segment A Static Poster: SJBIT Silver Jubilee */}
          <div className="w-full rounded-2xl overflow-hidden border border-[#D7E2EA]/12">
            <img
              src={`/frames/${folderA}/frame_${totalFramesA.toString().padStart(4, '0')}.webp`}
              alt="SJB Institute of Technology, Silver Jubilee Year 2026, 25 years, with photographs of three swamijis"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Segment B Static Poster + Lakshya Content */}
          <div className="text-center flex flex-col items-center gap-6">
            <h1 className="hero-heading font-heading font-black uppercase text-[clamp(3rem,10vw,8rem)] tracking-tight leading-none">
              Lakshya&apos;26
            </h1>
            <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#D7E2EA]/60 font-mono">
              {EVENT_DATA.tagline}
            </p>
            <div className="mt-8">
              <Countdown targetISO={EVENT_DATA.startTimestampISO} />
            </div>
            <div className="mt-8">
              <Magnet padding={100} strength={4}>
                <ContactButton label="Register Now" href={EVENT_DATA.registrationUrl} />
              </Magnet>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="top"
      ref={containerRef}
      className={`relative w-full ${isMobile ? 'h-[480vh]' : 'h-[600vh]'} select-none`}
    >
      {/* Screen reader semantic description */}
      <div className="sr-only">
        SJB Institute of Technology, Silver Jubilee Year 2026, 25 years, with photographs of three swamijis.
      </div>

      {/* Sticky Viewport Stage (100svh, top 0) */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#0C0C0C]">
        {/* Render Canvas (feathered top and bottom edges via 12% gradient mask) */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
          }}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Ambient Dark Vignette for Ultra-Crisp Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/35 to-[#0C0C0C]/60 pointer-events-none" />

        {/* ================= OVERLAY TEXT STEPS ================= */}

        {/* Animated Scroll Down Indicator (visible at start only: 0.00 to 0.07) */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 pointer-events-none z-20"
        >
          <span className="text-[10px] uppercase font-mono tracking-[0.3em]">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4 text-white/50" />
          </motion.div>
        </motion.div>

        {/* Step 1: 0.66 to 0.77 -> Assembling Lakshya'26 Letters + Tagline */}
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
        </motion.div>

        {/* Step 2: 0.77 to 0.85 -> [24] hours (Left) + SJBIT (Right) */}
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

        {/* Step 3: 0.85 to 0.93 -> Heading (Top) + Countdown (Bottom) */}
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

        {/* Step 4: 0.93 to 1.00 -> Heading (Top) + Register button (Bottom) */}
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
