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

// Frame Dimensions and Safe Area Constants for Segment A
const FRAME_W = 1280;
const FRAME_H = 720;
const SAFE_X1 = 330;
const SAFE_X2 = 950;
const SAFE_Y1 = 60;
const SAFE_Y2 = 640;
const SAFE_W = SAFE_X2 - SAFE_X1; // 620
const SAFE_H = SAFE_Y2 - SAFE_Y1; // 580
const SAFE_CY = (SAFE_Y1 + SAFE_Y2) / 2; // 350

interface FrameMetrics {
  vw: number;
  vh: number;
  dpr: number;
  canvasW: number;
  canvasH: number;
  compactNavH: number;
  bottomReserve: number;
  finalScale: number;
  maxPushIn: number;
}

function getCompactNavH(): number {
  if (typeof window === 'undefined') return 100;
  const header = document.querySelector('header');
  const isMob = window.innerWidth < 768;
  const measured = header ? header.getBoundingClientRect().height : 0;
  return Math.max(measured, isMob ? 68 : 100);
}

function computeFrameTransform(
  metrics: FrameMetrics,
  aProg: number,
  scaleTransform: number
) {
  const { vw, vh, dpr, canvasW, compactNavH, bottomReserve } = metrics;
  const topBound = compactNavH + 16;
  const availH = Math.max(100, vh - topBound - bottomReserve);
  const availW = Math.max(100, vw - 32);

  const coverScale = Math.max(vw / FRAME_W, vh / FRAME_H);
  const safeScale = Math.min(availW / SAFE_W, availH / SAFE_H);
  const finalScale = Math.min(coverScale, safeScale);

  // Blend from coverScale to finalScale across segment A progress 0.10 to 0.27
  const blendFactor = smoothstep(0.10, 0.27, aProg);
  const blendedScale = coverScale * (1 - blendFactor) + finalScale * blendFactor;
  const effectiveScale = blendedScale * scaleTransform;

  const drawW = FRAME_W * effectiveScale * dpr;
  const drawH = FRAME_H * effectiveScale * dpr;
  const drawX = (canvasW - drawW) / 2;

  // Vertical placement: center safe area in available region
  const availCenterY = topBound + availH / 2;
  const desiredDrawY_css = availCenterY - SAFE_CY * effectiveScale;
  const coverDrawY_css = (vh - FRAME_H * effectiveScale) / 2;

  // Strictly guarantee safe area top never crosses above topBound into navbar
  let targetDrawY_css = Math.max(desiredDrawY_css, topBound - SAFE_Y1 * effectiveScale);

  // Guarantee safe area bottom never exceeds vh - bottomReserve
  const maxAllowedY = (vh - bottomReserve) - SAFE_Y2 * effectiveScale;
  targetDrawY_css = Math.min(targetDrawY_css, maxAllowedY);

  const drawY_css = coverDrawY_css * (1 - blendFactor) + targetDrawY_css * blendFactor;
  const drawY = drawY_css * dpr;

  return {
    drawX,
    drawY,
    drawW,
    drawH,
    blendFactor,
    effectiveScale,
  };
}

// Lakshya Converging letter configuration
const HERO_LETTERS = [
  { char: 'L', initX: -20, initY: -14, initRot: -12, initScale: 0.8 },
  { char: 'a', initX: 14, initY: 15, initRot: 10, initScale: 1.3 },
  { char: 'k', initX: -16, initY: 16, initRot: -8, initScale: 0.9 },
  { char: 's', initX: 22, initY: -12, initRot: 14, initScale: 1.4 },
  { char: 'h', initX: -10, initY: -16, initRot: -6, initScale: 1.1 },
  { char: 'y', initX: 16, initY: 14, initRot: 9, initScale: 0.75 },
  { char: 'a', initX: -22, initY: 10, initRot: -11, initScale: 1.25 },
];

const ConvergingHeroLetter: React.FC<{
  item: typeof HERO_LETTERS[0];
  progress: any;
  isReducedMotion: boolean;
}> = ({ item, progress, isReducedMotion }) => {
  // Mapped across extended segment B step (0.50 to 0.63)
  const x = useTransform(progress, [0.50, 0.56, 0.61], [`${item.initX}vw`, '0vw', '0vw']);
  const y = useTransform(progress, [0.50, 0.56, 0.61], [`${item.initY}vh`, '0vh', '0vh']);
  const rotate = useTransform(progress, [0.50, 0.56, 0.61], [item.initRot, 0, 0]);
  const scale = useTransform(progress, [0.50, 0.56, 0.61, 0.63], [item.initScale, 1, 1, 1.05]);
  const opacity = useTransform(progress, [0.50, 0.54, 0.60, 0.63], [0, 0.95, 1, 0]);

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
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    }
    return false;
  });
  const [useFallback, setUseFallback] = useState(false);
  const isVisibleRef = useRef(true);
  const hasPaintedFirstFrameRef = useRef(false);
  const shouldReduceMotion = useReducedMotion() ?? false;

  // Scroll Progress across expanded 850vh desktop / 650vh mobile
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

  // Lakshya Text Steps mapped to expanded Segment B range: 0.50 to 1.00
  // Step 1: 0.50 to 0.63 -> Assembling "Lakshya'26" letters + tagline
  const step1Opacity = useTransform(smoothProgress, [0.50, 0.54, 0.60, 0.63], [0, 1, 1, 0]);
  const step1Scale = useTransform(smoothProgress, [0.50, 0.55, 0.60, 0.63], [0.98, 1, 1, 1.05]);
  const taglineY = useTransform(smoothProgress, [0.52, 0.56, 0.61], [28, 0, -14]);
  const taglineOpacity = useTransform(smoothProgress, [0.52, 0.55, 0.60, 0.63], [0, 1, 1, 0]);

  // Step 2: 0.63 to 0.75 -> 24 Hours. 500+ Builders. One Goal.
  const step2Opacity = useTransform(smoothProgress, [0.63, 0.66, 0.72, 0.75], [0, 1, 1, 0]);
  const step2HeadingX = useTransform(smoothProgress, [0.63, 0.66, 0.72, 0.75], [-36, 0, 0, -36]);
  const step2BrandX = useTransform(smoothProgress, [0.63, 0.66, 0.72, 0.75], [36, 0, 0, 36]);

  // Step 3: 0.75 to 0.87 -> The Clock is Ticking + Countdown
  const step3Opacity = useTransform(smoothProgress, [0.75, 0.78, 0.84, 0.87], [0, 1, 1, 0]);
  const step3HeadingY = useTransform(smoothProgress, [0.75, 0.78, 0.84, 0.87], [-30, 0, 0, -30]);
  const step3CountdownY = useTransform(smoothProgress, [0.75, 0.78, 0.84, 0.87], [40, 0, 0, 40]);

  // Step 4: 0.87 to 1.00 -> Registrations are open + Magnetic Register button (holds till end)
  const step4Opacity = useTransform(smoothProgress, [0.87, 0.90, 1], [0, 1, 1]);
  const step4HeadingY = useTransform(smoothProgress, [0.87, 0.90, 1], [-24, 0, 0]);
  const step4ButtonY = useTransform(smoothProgress, [0.87, 0.90, 1], [28, 0, 0]);

  // Scroll-linked handoff to dark blue (var(--bg)) over progress 0.88 to 1.00
  // 1. Stage background interpolates from hero black to dark blue
  const stageBgColor = useTransform(
    smoothProgress,
    [0.88, 1.00],
    ['rgb(12 12 12)', 'rgb(10 20 48)']
  );

  // 2. Vertical gradient handoff: bottom of the screen turns navy first (0.86 to 0.94)
  const navyGradientOpacity = useTransform(smoothProgress, [0.86, 0.94], [0, 1]);

  // 3. Solid navy stage veil (0.90 to 1.00) so the tunnel dims smoothly into solid navy
  const navySolidOpacity = useTransform(smoothProgress, [0.90, 1.00], [0, 1]);

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

  const startFrameA = isMobile ? EVENT_DATA.segmentA.startFrameMobile : EVENT_DATA.segmentA.startFrameDesktop;
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
  const metricsRef = useRef<FrameMetrics>({
    vw: typeof window !== 'undefined' ? window.innerWidth : 1920,
    vh: typeof window !== 'undefined' ? window.innerHeight : 1080,
    dpr: 1,
    canvasW: 1920,
    canvasH: 1080,
    compactNavH: 100,
    bottomReserve: 24,
    finalScale: 1,
    maxPushIn: 1.04,
  });

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
  // 1. Load A start frame immediately (instant poster).
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
        // Poster frame (A at trimmed startFrame)
        const frameAStart = await fetchSingleFrame(getFrameUrlA(startFrameA));
        if (!isCancelled) {
          cacheA.set(startFrameA, frameAStart);
          renderFrameImmediate();
        }
      } catch (err) {
        console.warn('Hero frame A poster failed, enabling fallback:', err);
        if (!isCancelled) setUseFallback(true);
        return;
      }

      // Preload Segment A (from startFrameA to totalFramesA)
      const pendingA = new Set<number>();
      for (let i = startFrameA; i <= totalFramesA; i++) {
        if (i !== startFrameA) pendingA.add(i);
      }

      const loadRemainingA = async () => {
        while (pendingA.size > 0 && !isCancelled) {
          const currentP = currentScrollPRef.current;
          // Approximate target in A (0.0 to 0.34)
          const targetIndex = Math.max(
            startFrameA,
            Math.min(totalFramesA, Math.round(startFrameA + (currentP / 0.34) * (totalFramesA - startFrameA)))
          );
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

      // In parallel: Preload Segment B (guarantee B's first 30 frames are ready before progress 0.40)
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
          // Approximate target in B (0.50 to 0.90)
          const targetIndex = Math.max(1, Math.min(totalFramesB, Math.round(((currentP - 0.50) / 0.40) * (totalFramesB - 1)) + 1));
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

    if (useFallback) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = '#0C0C0C';
      ctx.fillRect(0, 0, canvasW, canvasH);
      drawProceduralTarget(ctx, canvasW, canvasH, progressVal);
      lastStateRef.current = { segment, frameIndex, scale: scaleTransform, alpha: globalAlpha, p: progressVal };
      return;
    }

    if (segment === 'NONE' || globalAlpha <= 0.001) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = '#0C0C0C';
      ctx.fillRect(0, 0, canvasW, canvasH);
      lastStateRef.current = { segment, frameIndex, scale: scaleTransform, alpha: globalAlpha, p: progressVal };
      return;
    }

    const cache = segment === 'A' ? cacheARef.current : cacheBRef.current;
    let img = cache.get(frameIndex);

    // If exact frame is loading, find closest loaded frame in the same segment
    if (!img) {
      let closestDist = Infinity;
      let closestIdx = -1;
      for (const idx of cache.keys()) {
        const dist = Math.abs(idx - frameIndex);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = idx;
        }
      }
      if (closestIdx !== -1) {
        img = cache.get(closestIdx);
      }
    }

    if (!img) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = '#0C0C0C';
      ctx.fillRect(0, 0, canvasW, canvasH);
      lastStateRef.current = { segment, frameIndex, scale: scaleTransform, alpha: globalAlpha, p: progressVal };
      return;
    }

    if (!hasPaintedFirstFrameRef.current) {
      hasPaintedFirstFrameRef.current = true;
    }

    // Reset transform & solidly fill entire canvas with #0C0C0C
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#0C0C0C';
    ctx.fillRect(0, 0, canvasW, canvasH);

    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, globalAlpha));

    if (segment === 'A') {
      const { drawX, drawY, drawW, drawH, blendFactor } = computeFrameTransform(
        metricsRef.current,
        segAProgress ?? 0,
        scaleTransform
      );

      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      // Seamless edge feathering into #0C0C0C when frame is letterboxed or blended
      if (blendFactor > 0.01 || drawX > 0 || drawW < canvasW || drawY > 0 || drawH < canvasH) {
        const featherH = Math.min(48 * metricsRef.current.dpr, drawH * 0.12);
        const featherW = Math.min(48 * metricsRef.current.dpr, drawW * 0.12);

        // Top edge feather: fade into #0C0C0C
        const topGrad = ctx.createLinearGradient(0, drawY - 1, 0, drawY + featherH);
        topGrad.addColorStop(0, '#0C0C0C');
        topGrad.addColorStop(1, 'rgba(12, 12, 12, 0)');
        ctx.fillStyle = topGrad;
        ctx.fillRect(0, drawY - 2, canvasW, featherH + 2);

        // Bottom edge feather: fade into #0C0C0C
        const btmGrad = ctx.createLinearGradient(0, drawY + drawH - featherH, 0, drawY + drawH + 1);
        btmGrad.addColorStop(0, 'rgba(12, 12, 12, 0)');
        btmGrad.addColorStop(1, '#0C0C0C');
        ctx.fillStyle = btmGrad;
        ctx.fillRect(0, drawY + drawH - featherH, canvasW, featherH + 2);

        // Left edge feather: fade into #0C0C0C
        const leftGrad = ctx.createLinearGradient(drawX - 1, 0, drawX + featherW, 0);
        leftGrad.addColorStop(0, '#0C0C0C');
        leftGrad.addColorStop(1, 'rgba(12, 12, 12, 0)');
        ctx.fillStyle = leftGrad;
        ctx.fillRect(drawX - 2, 0, featherW + 2, canvasH);

        // Right edge feather: fade into #0C0C0C
        const rightGrad = ctx.createLinearGradient(drawX + drawW - featherW, 0, drawX + drawW + 1, 0);
        rightGrad.addColorStop(0, 'rgba(12, 12, 12, 0)');
        rightGrad.addColorStop(1, '#0C0C0C');
        ctx.fillStyle = rightGrad;
        ctx.fillRect(drawX + drawW - featherW, 0, featherW + 2, canvasH);

        // Subtle radial vignette to soften outer areas into #0C0C0C as blend factor increases
        if (blendFactor > 0.05) {
          const cx = drawX + drawW / 2;
          const cy = drawY + drawH / 2;
          const radius = Math.hypot(drawW / 2, drawH / 2);
          const vignette = ctx.createRadialGradient(cx, cy, radius * 0.65, cx, cy, radius);
          vignette.addColorStop(0, 'rgba(12, 12, 12, 0)');
          vignette.addColorStop(1, `rgba(12, 12, 12, ${0.45 * blendFactor})`);
          ctx.fillStyle = vignette;
          ctx.fillRect(0, 0, canvasW, canvasH);
        }
      }
    } else {
      // Segment B: cover fit
      const { vw, vh, dpr } = metricsRef.current;
      const baseScale = Math.max(vw / (img.width || FRAME_W), vh / (img.height || FRAME_H));
      const effectiveScale = baseScale * scaleTransform;
      const drawW = (img.width || FRAME_W) * effectiveScale * dpr;
      const drawH = (img.height || FRAME_H) * effectiveScale * dpr;
      const drawX = (canvasW - drawW) / 2;
      const drawY = (canvasH - drawH) / 2;

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }

    ctx.restore();

    lastStateRef.current = {
      segment,
      frameIndex,
      scale: scaleTransform,
      alpha: globalAlpha,
      p: progressVal,
    };
  }, [useFallback, drawProceduralTarget]);

  // Evaluation & Mapping Logic:
  // 0.00 - 0.34: Segment A frames startFrameA to totalFramesA
  // 0.34 - 0.40: Hold A's last frame, push-in scale capped by maxPushIn
  // 0.40 - 0.46: EXIT: scale up toward 1.25+, alpha falls 1 -> 0 (gentle dip through black)
  // 0.46 - 0.50: Near-black beat. Segment B frame 1 emerges from dark (scale 1.08 -> 1.0, alpha 0 -> 1)
  // 0.50 - 0.90: Segment B frames 1 to totalFramesB (slow, relaxed scrub across 40% of scroll space)
  // 0.90 - 1.00: Hold B's last frame with Register CTA
  const evaluateAndDraw = useCallback((p: number) => {
    currentScrollPRef.current = p;

    if (p <= 0.34) {
      // Segment A playback starting a few seconds before the logo emergence
      const segAProg = Math.max(0, Math.min(1, p / 0.34));
      const rawIdx = Math.round(startFrameA + segAProg * (totalFramesA - startFrameA));
      const frameIdx = Math.max(startFrameA, Math.min(totalFramesA, rawIdx));
      drawToCanvas('A', frameIdx, 1.0, 1.0, p, segAProg);
    } else if (p <= 0.40) {
      // Hold A's last frame with push-in capped by maxPushIn
      const holdProg = (p - 0.34) / 0.06;
      const maxPushIn = metricsRef.current.maxPushIn;
      const scale = maxPushIn > 1.005 ? 1.0 + holdProg * (maxPushIn - 1.0) : 1.0;
      drawToCanvas('A', totalFramesA, scale, 1.0, p, 1.0);
    } else if (p <= 0.46) {
      // Exit A: starts at maxPushIn and scales toward Math.max(1.25, maxPushIn * 1.2), alpha falls 1.0 -> 0.0
      const exitProg = (p - 0.40) / 0.06;
      const maxPushIn = metricsRef.current.maxPushIn;
      const targetExitScale = Math.max(1.25, maxPushIn * 1.2);
      const scale = maxPushIn + exitProg * (targetExitScale - maxPushIn);
      const alpha = 1.0 - exitProg;
      drawToCanvas('A', totalFramesA, scale, alpha, p, 1.0);
    } else if (p <= 0.50) {
      // Near-black beat: Segment B Frame 1 emerges from dark (scale 1.08 -> 1.0, alpha 0 -> 1)
      const beatProg = (p - 0.46) / 0.04;
      const scale = 1.08 - beatProg * 0.08;
      const alpha = beatProg;
      drawToCanvas('B', 1, scale, alpha, p, 0);
    } else if (p <= 0.90) {
      // Segment B playback: relaxed, cinematic scrub matching Swamiji's pace
      const segBProg = (p - 0.50) / 0.40;
      const rawIdx = Math.round(segBProg * (totalFramesB - 1)) + 1;
      const frameIdx = Math.max(1, Math.min(totalFramesB, rawIdx));
      drawToCanvas('B', frameIdx, 1.0, 1.0, p, 0);
    } else {
      // Hold B's last frame till 1.00
      drawToCanvas('B', totalFramesB, 1.0, 1.0, p, 0);
    }
  }, [startFrameA, totalFramesA, totalFramesB, drawToCanvas]);

  // Immediate frame render helper
  const renderFrameImmediate = useCallback(() => {
    drawToCanvas('A', startFrameA, 1, 1, 0, 0);
  }, [drawToCanvas, startFrameA]);

  // Canvas Resizing and Metrics caching with ResizeObserver
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateMetrics = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isMob = w < 768 || window.matchMedia('(pointer: coarse)').matches;
      const dpr = Math.min(isMob ? 1.5 : 2.0, window.devicePixelRatio || 1);
      const compactNavH = getCompactNavH();
      const bottomReserve = 24;

      const topBound = compactNavH + 16;
      const availH = Math.max(100, h - topBound - bottomReserve);
      const availW = Math.max(100, w - 32);

      const coverScale = Math.max(w / FRAME_W, h / FRAME_H);
      const safeScale = Math.min(availW / SAFE_W, availH / SAFE_H);
      const finalScale = Math.min(coverScale, safeScale);
      const maxPushIn = Math.min(1.04, availH / (SAFE_H * finalScale), availW / (SAFE_W * finalScale));

      const canvasW = Math.floor(w * dpr);
      const canvasH = Math.floor(h * dpr);

      canvas.width = canvasW;
      canvas.height = canvasH;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      metricsRef.current = {
        vw: w,
        vh: h,
        dpr,
        canvasW,
        canvasH,
        compactNavH,
        bottomReserve,
        finalScale,
        maxPushIn,
      };

      document.documentElement.style.setProperty('--navbar-height', `${compactNavH}px`);

      // Force redraw
      lastStateRef.current.segment = 'NONE';
      evaluateAndDraw(currentScrollPRef.current);
    };

    updateMetrics();

    const ro = new ResizeObserver(() => {
      updateMetrics();
    });
    if (containerRef.current) ro.observe(containerRef.current);
    const header = document.querySelector('header');
    if (header) ro.observe(header);

    window.addEventListener('resize', updateMetrics);
    window.addEventListener('orientationchange', updateMetrics);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateMetrics);
      window.removeEventListener('orientationchange', updateMetrics);
    };
  }, [evaluateAndDraw]);

  // Initial draw on mount using HTMLImageElement preload
  useEffect(() => {
    const img = new Image();
    img.src = getFrameUrlA(startFrameA);
    const onLoad = () => {
      if (!cacheARef.current.has(startFrameA)) {
        cacheARef.current.set(startFrameA, img);
      }
      renderFrameImmediate();
    };
    if (img.complete) {
      onLoad();
    } else {
      img.onload = onLoad;
    }
  }, [getFrameUrlA, startFrameA, renderFrameImmediate]);

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

  // Reduced motion: show static stack (navy stage with dimmed poster)
  if (shouldReduceMotion) {
    return (
      <section id="top" className="relative w-full bg-bg text-[#D7E2EA] select-none py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-16">
          {/* Segment A Static Poster: SJBIT Silver Jubilee */}
          <div className="w-full rounded-2xl overflow-hidden border border-[#D7E2EA]/12 bg-surface">
            <img
              src={`/frames/${folderA}/frame_${totalFramesA.toString().padStart(4, '0')}.webp`}
              alt="SJB Institute of Technology, Silver Jubilee Year 2026, 25 years, with photographs of three swamijis"
              className="w-full h-auto object-contain opacity-85"
            />
          </div>

          {/* Segment B Static Poster + Lakshya Content */}
          <div className="text-center flex flex-col items-center gap-6 relative">
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
      className={`relative w-full ${isMobile ? 'h-[650vh]' : 'h-[850vh]'} select-none`}
    >
      {/* Screen reader semantic description */}
      <div className="sr-only">
        SJB Institute of Technology, Silver Jubilee Year 2026, 25 years, with photographs of three swamijis.
      </div>

      {/* Sticky Viewport Stage (100svh, top 0) - Stays black, interpolates to navy over last part */}
      <motion.div
        style={{ backgroundColor: stageBgColor }}
        className="sticky top-0 h-[100svh] w-full overflow-hidden"
      >
        {/* Render Canvas */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-[1]"
        />

        {/* Scroll-Linked Navy Handoff Layer: Bottom turns navy first */}
        <motion.div
          style={{ opacity: navyGradientOpacity }}
          className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg))] via-[rgb(var(--bg))/75] to-transparent pointer-events-none z-[2]"
        />

        {/* Scroll-Linked Navy Handoff Layer: Full stage veil dims tunnel into solid navy */}
        <motion.div
          style={{ opacity: navySolidOpacity }}
          className="absolute inset-0 bg-[rgb(var(--bg))] pointer-events-none z-[3]"
        />


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

        {/* Step 1: 0.66 to 0.77 -> Assembling Lakshya Letters + Tagline */}
        <motion.div
          style={{ opacity: step1Opacity, scale: step1Scale }}
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none z-10"
        >
          <div className="max-w-5xl mx-auto flex flex-col items-center relative">
            <h1
              className="hero-heading font-heading font-black uppercase text-[clamp(2.8rem,13vw,14rem)] tracking-tight leading-none whitespace-nowrap"
              aria-label="Lakshya"
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
          className="absolute inset-0 flex items-center justify-center p-6 text-center pointer-events-none z-10"
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <motion.h2
              style={{ x: step2HeadingX }}
              className="hero-heading font-heading font-black uppercase text-[clamp(2.5rem,8vw,7rem)] tracking-tight leading-none"
            >
              24 Hours. 200+ Builders. One Goal.
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
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none z-10"
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
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10"
        >
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-amber-300">
              LIMITED SPOTS AVAILABLE &bull; ENTRY: ₹1,000 / SQUAD
            </span>
            <motion.h2
              style={{ y: step4HeadingY }}
              className="hero-heading font-heading font-black uppercase text-[clamp(2.5rem,7vw,6.5rem)] tracking-tight leading-none"
            >
              Registrations Are Open
            </motion.h2>
            <p className="text-sm sm:text-base text-[#D7E2EA]/70 max-w-md font-light leading-relaxed">
              Assemble your squad of 4 builders and enter the 24-hour sprint.
            </p>
            <motion.div style={{ y: step4ButtonY }} className="mt-2 pointer-events-auto">
              <Magnet padding={100} strength={4}>
                <ContactButton label="Register Now" href={EVENT_DATA.registrationUrl} />
              </Magnet>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
