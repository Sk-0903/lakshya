import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';

interface ProjectData {
  number: string;
  name: string;
  category: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
}

const PROJECTS: ProjectData[] = [
  {
    number: '01',
    name: 'Nextlevel Neural Studio',
    category: 'AI Track Winner',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  },
  {
    number: '02',
    name: 'Aura Identity Protocol',
    category: 'Web3 Track Winner',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  },
  {
    number: '03',
    name: 'Solaris Intelligent Grid',
    category: 'Hardware & IoT Winner',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, totalCards }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] flex items-center justify-center sticky top-24 md:top-32"
      style={{
        top: `calc(${index * 28}px + 6rem)`,
      }}
    >
      <motion.div
        style={{ scale }}
        className="w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-2xl"
      >
        {/* Top Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#D7E2EA]/15">
          <div className="flex items-baseline gap-4 sm:gap-6">
            <span className="font-black text-[clamp(2.5rem,6vw,90px)] text-[#D7E2EA] leading-none tracking-tight">
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-medium uppercase tracking-widest text-[#D7E2EA]/60">
                {project.category}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase text-[#D7E2EA] tracking-wide">
                {project.name}
              </h3>
            </div>
          </div>

          <div>
            <LiveProjectButton href="#projects" label="View Project" />
          </div>
        </div>

        {/* Bottom Row - Two Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-4 sm:gap-6 pt-6">
          {/* Left Column (40% width) - 2 stacked images */}
          <div className="md:col-span-4 flex flex-col gap-4 sm:gap-6">
            <div className="overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-slate-900 border border-white/5">
              <img
                src={project.col1Img1}
                alt={`${project.name} preview 1`}
                className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] h-[clamp(130px,16vw,230px)]"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-slate-900 border border-white/5">
              <img
                src={project.col1Img2}
                alt={`${project.name} preview 2`}
                className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] h-[clamp(160px,22vw,340px)]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column (60% width) - 1 tall image */}
          <div className="md:col-span-6 overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-slate-900 border border-white/5">
            <img
              src={project.col2Img}
              alt={`${project.name} main showcase`}
              className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] min-h-[300px] md:min-h-full"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative pt-20 sm:pt-24 md:pt-32 pb-32 px-4 sm:px-6 md:px-10 select-none"
    >
      <div className="max-w-6xl mx-auto mb-16 sm:mb-20">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none tracking-tight">
            Showcase
          </h2>
        </FadeIn>
      </div>

      {/* 3 Stacking Project Cards */}
      <div className="flex flex-col relative w-full max-w-6xl mx-auto pb-20">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            totalCards={PROJECTS.length}
          />
        ))}
      </div>
    </section>
  );
};
