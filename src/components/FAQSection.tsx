import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { EVENT_DATA } from '../data/event';

export const FAQSection: React.FC = () => {
  // First item open by default as required
  const [openFaqId, setOpenFaqId] = useState<string | null>('f1');

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-[#0C0C0C] text-[#D7E2EA] py-20 sm:py-[104px] md:py-32 border-t border-[#D7E2EA]/12 select-none"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Desktop 2-column composition: Left (4/12) for label/heading, Right (8/12) for accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column (Sticky heading) */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <FadeIn delay={0} y={12}>
                <span className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.28em] text-[#D7E2EA]/60 block mb-3 sm:mb-4">
                  05 &mdash; QUESTIONS
                </span>
              </FadeIn>
              <FadeIn delay={0.1} y={16}>
                <h2
                  id="faq-heading"
                  className="hero-heading font-heading font-black uppercase text-[clamp(2.5rem,7vw,6rem)] tracking-tight leading-[0.95] text-balance mb-4 sm:mb-6"
                >
                  FAQS
                </h2>
              </FadeIn>
              <FadeIn delay={0.15} y={16}>
                <p className="text-sm font-light text-[#D7E2EA]/60 leading-relaxed max-w-[32ch] hidden lg:block">
                  Everything you need to know about participating, rules, accommodation, and the 24-hour sprint.
                </p>
              </FadeIn>
            </div>
          </div>

          {/* Right Column (Accordion) */}
          <div className="lg:col-span-8 border-t border-[#D7E2EA]/12">
            {EVENT_DATA.faqs.map((faq, index) => {
              const isOpen = openFaqId === faq.id;
              const buttonId = `faq-btn-${faq.id}`;
              const panelId = `faq-panel-${faq.id}`;

              return (
                <div key={faq.id} className="border-b border-[#D7E2EA]/12">
                  <h3 className="m-0 p-0 font-normal">
                    <button
                      id={buttonId}
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="w-full flex items-start justify-between text-left gap-4 py-6 sm:py-7 cursor-pointer group focus-visible:outline-2 focus-visible:outline-[#BBCCD7] rounded-lg transition-colors"
                    >
                      <span className="font-heading font-medium uppercase text-[clamp(1.05rem,1.6vw,1.375rem)] text-white group-hover:text-cyan-200 transition-colors leading-snug pt-1">
                        {faq.question}
                      </span>

                      {/* Fixed 40-44px touch target circular control with purple accent on open/hover */}
                      <span
                        className={`w-11 h-11 shrink-0 rounded-full border flex items-center justify-center transition-all duration-200 ${
                          isOpen
                            ? 'border-[#B600A8] bg-[#B600A8]/15 text-white'
                            : 'border-[#D7E2EA]/20 text-[#D7E2EA]/70 group-hover:border-white group-hover:text-white'
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
                        <p className="text-[clamp(0.95rem,1.1vw,1.05rem)] font-light text-[#D7E2EA]/75 leading-[1.7] max-w-[65ch] pb-7 pr-4 sm:pr-14 text-pretty">
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
      </div>
    </section>
  );
};
