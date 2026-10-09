import React from 'react';
import { FadeIn } from './FadeIn';

interface TrackItem {
  number: string;
  name: string;
  description: string;
}

const TRACKS: TrackItem[] = [
  {
    number: '01',
    name: 'Artificial Intelligence & Agents',
    description:
      'Generative AI, multimodal LLMs, autonomous agents, computer vision, and real-time neural networks solving high-impact challenges.',
  },
  {
    number: '02',
    name: 'Web3 & Decentralized Systems',
    description:
      'Zero-knowledge protocols, DeFi primitives, decentralized identity (DID), smart contracts, and next-gen blockchain infrastructure.',
  },
  {
    number: '03',
    name: 'IoT & Smart Robotics',
    description:
      'Edge computing, autonomous drones, embedded firmware, sensor mesh networks, and intelligent physical hardware.',
  },
  {
    number: '04',
    name: 'FinTech & Cyber Defense',
    description:
      'Real-time fraud prevention, cryptographic security, algorithmic finance pipelines, and resilient threat intelligence.',
  },
  {
    number: '05',
    name: 'Open Innovation & Sustainability',
    description:
      'Moonshot ideas across healthcare, clean green energy, agritech, smart cities, and transformative social impact engineering.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="tracks"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 w-full z-0 select-none"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2 className="text-[#0C0C0C] font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none tracking-tight mb-16 sm:mb-20 md:mb-28">
            Tracks
          </h2>
        </FadeIn>

        {/* 5 Track items list */}
        <div className="flex flex-col">
          {TRACKS.map((item, index) => (
            <FadeIn
              key={item.number}
              delay={index * 0.1}
              y={30}
              className={`flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12 py-8 sm:py-10 md:py-12 ${
                index !== 0 ? 'border-t border-[#0C0C0C]/15' : ''
              }`}
            >
              {/* Left Number */}
              <div className="font-black text-[clamp(3rem,10vw,140px)] text-[#0C0C0C] leading-none shrink-0 tracking-tight">
                {item.number}
              </div>

              {/* Right Name + Description Stack */}
              <div className="flex flex-col gap-2 md:gap-3 flex-1 max-w-2xl">
                <h3 className="font-medium uppercase text-[clamp(1rem,2.2vw,2.1rem)] text-[#0C0C0C] tracking-wide">
                  {item.name}
                </h3>
                <p className="font-light leading-relaxed text-[clamp(0.85rem,1.6vw,1.25rem)] text-[#0C0C0C] opacity-60">
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
