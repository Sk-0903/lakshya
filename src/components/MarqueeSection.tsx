import React, { useEffect, useRef, useState } from 'react';

const ALL_GIFS = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

const ROW_1_IMAGES = [...ALL_GIFS.slice(0, 11), ...ALL_GIFS.slice(0, 11), ...ALL_GIFS.slice(0, 11)];
const ROW_2_IMAGES = [...ALL_GIFS.slice(11), ...ALL_GIFS.slice(11), ...ALL_GIFS.slice(11)];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const calculatedOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(calculatedOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const row1Transform = `translateX(${offset - 200}px)`;
  const row2Transform = `translateX(${-(offset - 200)}px)`;

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden w-full select-none"
    >
      <div className="flex flex-col gap-3 w-full">
        {/* Row 1 - Moves RIGHT on scroll */}
        <div
          className="flex gap-3 whitespace-nowrap"
          style={{
            transform: row1Transform,
            willChange: 'transform',
          }}
        >
          {ROW_1_IMAGES.map((src, index) => (
            <div
              key={`row1-${index}`}
              className="w-[420px] h-[270px] shrink-0 rounded-2xl overflow-hidden bg-slate-900 border border-white/5"
            >
              <img
                src={src}
                alt="3D Motion Preview"
                className="w-full h-full object-cover rounded-2xl"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Row 2 - Moves LEFT on scroll */}
        <div
          className="flex gap-3 whitespace-nowrap"
          style={{
            transform: row2Transform,
            willChange: 'transform',
          }}
        >
          {ROW_2_IMAGES.map((src, index) => (
            <div
              key={`row2-${index}`}
              className="w-[420px] h-[270px] shrink-0 rounded-2xl overflow-hidden bg-slate-900 border border-white/5"
            >
              <img
                src={src}
                alt="3D Motion Preview"
                className="w-full h-full object-cover rounded-2xl"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
