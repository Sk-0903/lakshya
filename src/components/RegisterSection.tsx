import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { ContactButton } from './ContactButton';
import { Magnet } from './Magnet';
import { EVENT_DATA } from '../data/event';

export const RegisterSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('f1');

  return (
    <>
      {/* ================= 7A. FAQ ACCORDION ================= */}
      <section
        id="faq"
        className="bg-[#0C0C0C] text-[#D7E2EA] py-28 sm:py-36 md:py-48 px-6 md:px-10 border-t border-[#D7E2EA]/12 select-none"
      >
        <div className="max-w-3xl mx-auto">
          {/* Section Label + Heading */}
          <div className="text-center mb-16">
            <FadeIn delay={0} y={16}>
              <span className="text-[0.75rem] uppercase tracking-[0.3em] text-[#D7E2EA]/60 font-mono block mb-4">
                05 &mdash; Questions
              </span>
            </FadeIn>
            <FadeIn delay={0.1} y={20}>
              <h2 className="hero-heading font-heading font-black uppercase text-[clamp(2.5rem,7vw,6rem)] tracking-tight leading-none">
                FAQs
              </h2>
            </FadeIn>
          </div>

          {/* 6 Accordion Items with Hairline Dividers */}
          <div className="flex flex-col border-t border-[#D7E2EA]/12">
            {EVENT_DATA.faqs.map((faq, index) => {
              const isOpen = openFaqId === faq.id;

              return (
                <FadeIn key={faq.id} delay={index * 0.05} y={15}>
                  <div className="border-b border-[#D7E2EA]/12 py-6">
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full flex items-center justify-between text-left gap-4 cursor-pointer group focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <span className="font-heading font-medium uppercase text-base sm:text-lg text-white group-hover:text-cyan-300 transition-colors">
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                        className="w-8 h-8 rounded-full border border-[#D7E2EA]/20 flex items-center justify-center shrink-0 group-hover:border-white transition-colors"
                      >
                        <Plus className="w-4 h-4 text-white" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm font-light text-[#D7E2EA]/70 leading-relaxed pt-4 pr-6 sm:pr-10">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 7B. REGISTER CALL TO ACTION ================= */}
      <section
        id="register"
        className="bg-[#0C0C0C] text-[#D7E2EA] py-32 sm:py-44 md:py-56 px-6 md:px-10 border-t border-[#D7E2EA]/12 relative overflow-hidden select-none"
      >
        {/* Subtle: A thin rotating target outline ring slowly turning behind the CTA (hairline only) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] sm:w-[600px] h-[460px] sm:h-[600px] pointer-events-none opacity-20">
          <svg
            className="w-full h-full animate-spin"
            style={{ animationDuration: '60s' }}
            viewBox="0 0 200 200"
            fill="none"
          >
            <circle cx="100" cy="100" r="90" stroke="#D7E2EA" strokeWidth="0.75" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="65" stroke="#D7E2EA" strokeWidth="0.75" />
            <circle cx="100" cy="100" r="40" stroke="#D7E2EA" strokeWidth="0.75" strokeDasharray="2 3" />
            <line x1="100" y1="5" x2="100" y2="195" stroke="#D7E2EA" strokeWidth="0.5" />
            <line x1="5" y1="100" x2="195" y2="100" stroke="#D7E2EA" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Center Stage Content */}
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
          <FadeIn delay={0} y={20}>
            <h2 className="hero-heading font-heading font-black uppercase text-[clamp(2.5rem,8vw,7rem)] tracking-tight leading-none mb-6">
              Ready to Aim Higher?
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} y={20}>
            <p className="text-sm sm:text-base text-[#D7E2EA]/60 uppercase font-mono tracking-[0.25em] mb-12">
              {EVENT_DATA.dates} &bull; {EVENT_DATA.venue}
            </p>
          </FadeIn>

          {/* ONE Primary ContactButton wrapped in Magnet */}
          <FadeIn delay={0.2} y={20}>
            <Magnet padding={100} strength={4}>
              <ContactButton label="Register Now" href={EVENT_DATA.registrationUrl} />
            </Magnet>
          </FadeIn>
        </div>
      </section>
    </>
  );
};
