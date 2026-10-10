import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { EVENT_DATA } from '../data/event';

export const FAQSection: React.FC = () => {
  // First item open by default
  const [openFaqId, setOpenFaqId] = useState<string | null>('f1');

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-[#0C0C0C] text-[#D7E2EA] py-32 sm:py-44 md:py-52 border-t border-[#D7E2EA]/12 select-none relative"
    >
      {/* Horizontally centered container with guaranteed margin: 0 auto */}
      <div
        className="w-full px-5 sm:px-8"
        style={{ maxWidth: '860px', margin: '0 auto' }}
      >
        {/* Centered Clean Header */}
        <div className="w-full flex flex-col items-center justify-center text-center mb-16 sm:mb-20">
          <FadeIn delay={0} y={12} className="w-full flex flex-col items-center justify-center text-center">
            <span className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.28em] text-[#D7E2EA]/60 text-center block mb-3 sm:mb-4">
              05 &mdash; QUESTIONS
            </span>
          </FadeIn>
          <FadeIn delay={0.1} y={16} className="w-full flex flex-col items-center justify-center text-center">
            <h2
              id="faq-heading"
              className="hero-heading font-heading font-black uppercase text-[clamp(2.25rem,5.5vw,4.5rem)] tracking-tight leading-[0.95] text-center w-full mx-auto mb-5 block"
            >
              Frequently Asked Questions
            </h2>
          </FadeIn>
          <FadeIn delay={0.15} y={16} className="w-full flex flex-col items-center justify-center text-center">
            <p className="text-sm sm:text-base font-light text-[#D7E2EA]/65 leading-relaxed max-w-[52ch] text-center w-full mx-auto block">
              Everything you need to know about eligibility, rules, teams, and the 24-hour sprint.
            </p>
          </FadeIn>
        </div>

        {/* Spacious, Centered Accordion Cards */}
        <div className="w-full flex flex-col gap-4">
          {EVENT_DATA.faqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            const buttonId = `faq-btn-${faq.id}`;
            const panelId = `faq-panel-${faq.id}`;

            return (
              <div
                key={faq.id}
                className={`w-full rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-[#B600A8]/50 bg-white/[0.03] shadow-lg shadow-[#B600A8]/5'
                    : 'border-[#D7E2EA]/12 bg-white/[0.015] hover:border-[#D7E2EA]/25 hover:bg-white/[0.025]'
                }`}
              >
                <h3 className="m-0 p-0 font-normal">
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full flex items-center justify-between text-left gap-6 px-6 sm:px-8 py-6 sm:py-7 cursor-pointer group focus-visible:outline-2 focus-visible:outline-[#BBCCD7] rounded-2xl"
                  >
                    <span className="font-heading font-normal sm:font-medium text-[clamp(1.05rem,1.35vw,1.25rem)] text-white/95 group-hover:text-white transition-colors leading-snug">
                      {faq.question}
                    </span>

                    {/* Minimal Circular Toggle Button */}
                    <span
                      className={`w-10 h-10 shrink-0 rounded-full border flex items-center justify-center transition-all duration-200 ${
                        isOpen
                          ? 'border-[#B600A8] bg-[#B600A8]/20 text-white'
                          : 'border-[#D7E2EA]/15 text-[#D7E2EA]/60 group-hover:border-[#D7E2EA]/40 group-hover:text-white'
                      }`}
                    >
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                        className="inline-flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </motion.span>
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-[clamp(0.95rem,1.05vw,1.025rem)] font-light text-[#D7E2EA]/75 leading-[1.8] max-w-[70ch] px-6 sm:px-8 pb-7 text-pretty">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
