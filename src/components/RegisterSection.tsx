import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  User,
  Mail,
  Phone,
  Building,
  GraduationCap,
  Layers,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Plus,
  Sparkles,
} from 'lucide-react';
import { FadeIn } from './FadeIn';
import { GhostButton } from './GhostButton';
import { ConfettiCanvas } from './Confetti';
import { EVENT_DATA } from '../data/event';

export const RegisterSection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    teamName: '',
    teamSize: '4',
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    college: '',
    year: '3rd Year',
    track: 'AI & Machine Learning',
    ideaSummary: '',
  });

  // FAQ state: active accordion ID
  const [openFaqId, setOpenFaqId] = useState<string | null>('f1');

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Submit form
      if (EVENT_DATA.formEndpoint) {
        fetch(EVENT_DATA.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }).catch((err) => console.log('Submission API error:', err));
      }
      setSubmitted(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  return (
    <section
      id="register"
      className="bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 py-24 select-none relative"
    >
      {showConfetti && <ConfettiCanvas />}

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <FadeIn delay={0} y={20}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-widest text-[#BBCCD7] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Free &bull; Zero Registration Fee</span>
            </div>
            <h2 className="hero-heading font-heading font-black uppercase text-5xl sm:text-6xl md:text-7xl tracking-tight leading-none mb-4">
              Register Your Squad
            </h2>
            <p className="text-sm sm:text-base text-[#D7E2EA]/70 max-w-md mx-auto leading-relaxed">
              Join 500+ developers, designers, and thinkers at SJBIT. Complete the 3-step squad registration below.
            </p>
          </FadeIn>
        </div>

        {/* Multi-Step Registration Card */}
        <div className="w-full max-w-3xl rounded-[40px] border-2 border-[#D7E2EA] bg-[#0E0E14] p-6 sm:p-10 shadow-2xl relative">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#D7E2EA]/15">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center gap-2.5">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                    currentStep === step
                      ? 'bg-gradient-to-r from-[#B600A8] to-[#BE4C00] text-white shadow-[0_0_10px_#B600A8]'
                      : currentStep > step
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white/10 text-white/40'
                  }`}
                >
                  {currentStep > step ? '✓' : step}
                </span>
                <span className="hidden sm:inline text-xs uppercase font-mono tracking-wider text-white/70">
                  {step === 1 ? 'Team' : step === 2 ? 'Lead' : 'Domain'}
                </span>
              </div>
            ))}
          </div>

          {submitted ? (
            /* Success State */
            <div className="py-12 flex flex-col items-center text-center gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mb-2 shadow-[0_0_24px_rgba(52,211,153,0.3)]"
              >
                <CheckCircle2 className="w-10 h-10" />
              </motion.div>
              <h3 className="text-3xl font-black uppercase text-white tracking-tight">
                Squad Registered!
              </h3>
              <p className="text-sm font-light text-[#D7E2EA]/70 max-w-md leading-relaxed">
                Welcome to Lakshya &apos;26! A confirmation packet and discord link have been dispatched to {formData.leaderEmail}.
              </p>
              <div className="mt-4">
                <GhostButton
                  label="Submit Another Team"
                  onClick={() => {
                    setSubmitted(false);
                    setCurrentStep(1);
                  }}
                />
              </div>
            </div>
          ) : (
            /* Form Steps with AnimatePresence */
            <form onSubmit={handleNextStep}>
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-5"
                  >
                    <h4 className="text-lg font-bold uppercase text-white mb-1">
                      Step 1 &bull; Squad Formation
                    </h4>

                    <div>
                      <label className="block text-xs uppercase font-medium tracking-wider mb-2 text-[#D7E2EA]/80">
                        Team Name
                      </label>
                      <div className="relative">
                        <Users className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                        <input
                          type="text"
                          required
                          value={formData.teamName}
                          onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                          placeholder="e.g. NeuralVanguard"
                          className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/15 text-white placeholder:text-white/20 focus:outline-none focus:border-[#B600A8] transition text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-medium tracking-wider mb-2 text-[#D7E2EA]/80">
                        Squad Size (Members)
                      </label>
                      <select
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#14141e] border border-white/15 text-white focus:outline-none focus:border-[#B600A8] transition text-sm"
                      >
                        <option value="2">2 Members</option>
                        <option value="3">3 Members</option>
                        <option value="4">4 Members (Recommended)</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-4"
                  >
                    <h4 className="text-lg font-bold uppercase text-white mb-1">
                      Step 2 &bull; Lead Contact
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase font-medium tracking-wider mb-2 text-[#D7E2EA]/80">
                          Team Lead Name
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                          <input
                            type="text"
                            required
                            value={formData.leaderName}
                            onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
                            placeholder="Alex Morgan"
                            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/[0.04] border border-white/15 text-white placeholder:text-white/20 focus:outline-none focus:border-[#B600A8] transition text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-medium tracking-wider mb-2 text-[#D7E2EA]/80">
                          Lead Email
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                          <input
                            type="email"
                            required
                            value={formData.leaderEmail}
                            onChange={(e) => setFormData({ ...formData, leaderEmail: e.target.value })}
                            placeholder="lead@college.edu"
                            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/[0.04] border border-white/15 text-white placeholder:text-white/20 focus:outline-none focus:border-[#B600A8] transition text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase font-medium tracking-wider mb-2 text-[#D7E2EA]/80">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                          <input
                            type="tel"
                            required
                            value={formData.leaderPhone}
                            onChange={(e) => setFormData({ ...formData, leaderPhone: e.target.value })}
                            placeholder="+91 98765 43210"
                            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/[0.04] border border-white/15 text-white placeholder:text-white/20 focus:outline-none focus:border-[#B600A8] transition text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-medium tracking-wider mb-2 text-[#D7E2EA]/80">
                          College / Institute
                        </label>
                        <div className="relative">
                          <Building className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                          <input
                            type="text"
                            required
                            value={formData.college}
                            onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                            placeholder="SJB Institute of Tech"
                            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/[0.04] border border-white/15 text-white placeholder:text-white/20 focus:outline-none focus:border-[#B600A8] transition text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-4"
                  >
                    <h4 className="text-lg font-bold uppercase text-white mb-1">
                      Step 3 &bull; Challenge Domain
                    </h4>

                    <div>
                      <label className="block text-xs uppercase font-medium tracking-wider mb-2 text-[#D7E2EA]/80">
                        Primary Track
                      </label>
                      <select
                        value={formData.track}
                        onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#14141e] border border-white/15 text-white focus:outline-none focus:border-[#B600A8] transition text-sm"
                      >
                        {EVENT_DATA.tracks.map((t) => (
                          <option key={t.id} value={t.name}>
                            {t.number} - {t.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-medium tracking-wider mb-2 text-[#D7E2EA]/80">
                        Project Synopsis (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.ideaSummary}
                        onChange={(e) => setFormData({ ...formData, ideaSummary: e.target.value })}
                        placeholder="Brief overview of what you plan to engineer..."
                        className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/15 text-white placeholder:text-white/20 focus:outline-none focus:border-[#B600A8] transition text-sm resize-none"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-[#D7E2EA]/15">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-xs font-mono uppercase tracking-wider text-white/80 hover:bg-white/10 transition cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : <div />}

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-medium uppercase tracking-widest text-xs sm:text-sm cursor-pointer transition-transform hover:scale-[1.03] active:scale-[0.98]"
                  style={{
                    background:
                      'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                    boxShadow:
                      '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                    outline: '2px solid white',
                    outlineOffset: '-3px',
                  }}
                >
                  <span>{currentStep === 3 ? 'Confirm & Enter' : 'Continue'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Secondary Official Form Link Button */}
          <div className="mt-8 pt-6 border-t border-white/5 flex justify-center">
            <a
              href={EVENT_DATA.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#38bdf8] hover:underline"
            >
              <span>Prefer our official external Google Form? Open link</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="w-full max-w-3xl mt-24">
          <div className="text-center mb-12">
            <FadeIn delay={0} y={20}>
              <h3 className="hero-heading font-black uppercase text-3xl sm:text-4xl tracking-tight">
                Frequently Asked Questions
              </h3>
            </FadeIn>
          </div>

          <div className="flex flex-col border-t border-[#D7E2EA]/20">
            {EVENT_DATA.faqs.map((faq, index) => {
              const isOpen = openFaqId === faq.id;

              return (
                <FadeIn key={faq.id} delay={index * 0.08} y={15}>
                  <div className="border-b border-[#D7E2EA]/20 py-5">
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full flex items-center justify-between text-left gap-4 cursor-pointer group"
                    >
                      <span className="font-medium uppercase text-base sm:text-lg text-white group-hover:text-cyan-300 transition-colors">
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                        className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shrink-0 group-hover:border-cyan-400"
                      >
                        <Plus className="w-4 h-4 text-white" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm font-light text-[#D7E2EA]/70 leading-relaxed pt-3 pr-8">
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
      </div>
    </section>
  );
};
