import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { EVENT_DATA } from '../data/event';

const CriteriaBar: React.FC<{
  name: string;
  weight: number;
  description: string;
}> = ({ name, weight, description }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: barRef,
    offset: ['start 0.9', 'start 0.5'],
  });

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, weight / 100]);

  return (
    <div ref={barRef} className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs sm:text-sm uppercase font-mono tracking-wider">
        <span className="font-semibold text-white">{name}</span>
        <span className="text-cyan-400 font-bold">{weight}%</span>
      </div>

      {/* 6px Track with ScaleX Gradient Fill */}
      <div className="w-full h-1.5 rounded-full bg-[#D7E2EA]/15 overflow-hidden">
        <motion.div
          style={{
            scaleX,
            transformOrigin: 'left',
            background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
          }}
          className="w-full h-full rounded-full"
        />
      </div>

      <p className="text-[11px] text-[#D7E2EA]/50 font-light">{description}</p>
    </div>
  );
};

export const JudgingSection: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: chartRef,
    offset: ['start 0.8', 'start 0.4'],
  });

  // Calculate polygon points on 5 axes based on weights: [25, 25, 20, 15, 15] normalized
  // Center is (100, 100), max radius = 75
  const center = 100;
  const maxRadius = 75;
  const weights = [25 / 30, 25 / 30, 20 / 30, 15 / 30, 15 / 30]; // normalized against scale

  const angles = [0, 72, 144, 216, 288].map((deg) => (deg - 90) * (Math.PI / 180));

  const targetPoints = angles
    .map((angle, i) => {
      const r = maxRadius * weights[i];
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(' ');

  const initialPoints = angles
    .map((angle) => {
      const x = center + 5 * Math.cos(angle);
      const y = center + 5 * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <section
      id="judging"
      className="bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 py-24 select-none relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16 sm:mb-20">
          <FadeIn delay={0} y={40}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#BBCCD7] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BE4C00]" />
              <span>Rigorous Evaluation</span>
            </div>
            <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none tracking-tight">
              Judging
            </h2>
          </FadeIn>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-center">
          {/* Left Column: 5 Criteria Bars */}
          <div className="flex flex-col gap-6">
            {EVENT_DATA.judgingCriteria.map((criterion, idx) => (
              <FadeIn key={criterion.name} delay={idx * 0.1} y={20}>
                <CriteriaBar
                  name={criterion.name}
                  weight={criterion.weight}
                  description={criterion.description}
                />
              </FadeIn>
            ))}
          </div>

          {/* Right Column: SVG Radar / Target Chart */}
          <div
            ref={chartRef}
            className="flex items-center justify-center p-6 rounded-3xl bg-white/[0.02] border border-white/10 relative"
          >
            <div className="w-64 h-64 sm:w-80 sm:h-80 relative flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 200 200">
                {/* Concentric Guide Circles = Target Motif */}
                {[20, 40, 60, 75].map((r, i) => (
                  <circle
                    key={i}
                    cx="100"
                    cy="100"
                    r={r}
                    stroke="#D7E2EA"
                    strokeOpacity={0.12}
                    strokeWidth="1"
                    strokeDasharray={i % 2 === 0 ? '4 4' : 'none'}
                    fill="none"
                  />
                ))}

                {/* 5 Radar Axis Rays */}
                {angles.map((angle, i) => (
                  <line
                    key={i}
                    x1="100"
                    y1="100"
                    x2={100 + maxRadius * Math.cos(angle)}
                    y2={100 + maxRadius * Math.sin(angle)}
                    stroke="#D7E2EA"
                    strokeOpacity={0.2}
                    strokeWidth="1"
                  />
                ))}

                {/* Morphed Polygon connecting the criteria */}
                <motion.polygon
                  points={targetPoints}
                  fill="#B600A8"
                  fillOpacity={0.25}
                  stroke="#38bdf8"
                  strokeWidth="2"
                  initial={{ points: initialPoints, opacity: 0 }}
                  whileInView={{ points: targetPoints, opacity: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />

                {/* Center Core */}
                <circle cx="100" cy="100" r="3.5" fill="#BE4C00" />
              </svg>

              {/* Axis Labels */}
              <span className="absolute top-1 text-[10px] font-mono text-cyan-300">INNOVATION</span>
              <span className="absolute top-16 right-0 text-[10px] font-mono text-purple-300">TECH</span>
              <span className="absolute bottom-6 right-4 text-[10px] font-mono text-amber-300">IMPACT</span>
              <span className="absolute bottom-6 left-4 text-[10px] font-mono text-emerald-300">DESIGN</span>
              <span className="absolute top-16 left-0 text-[10px] font-mono text-fuchsia-300">PITCH</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
