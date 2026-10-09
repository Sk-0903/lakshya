import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Sparkles } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    teamName: '',
    leaderEmail: '',
    track: 'AI & Autonomous Agents',
    college: 'SJB Institute of Technology',
    teamSize: '4 Members',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg rounded-[36px] border-2 border-[#D7E2EA]/40 bg-[#0C0C0C] p-6 sm:p-8 text-[#D7E2EA] shadow-2xl z-10"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#D7E2EA]/70 hover:text-white hover:border-white/30 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#B600A8]" />
              <span className="text-xs uppercase font-mono tracking-widest text-[#B600A8]">
                Lakshya &apos;26 &bull; Team Registration
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-white mb-2 tracking-tight">
              Register Your Squad
            </h3>
            <p className="text-sm font-light text-[#D7E2EA]/70 mb-6 leading-relaxed">
              36 hours of non-stop innovation at SJBIT. ₹15,00,000+ prize pool. Fill your team details below:
            </p>

            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-bounce" />
                <h4 className="text-xl font-bold uppercase text-white">Registration Received!</h4>
                <p className="text-xs text-[#D7E2EA]/70 max-w-sm">
                  Welcome to Lakshya &apos;26! A confirmation email and Discord access token have been dispatched to {formData.leaderEmail || 'your email'}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs uppercase font-medium tracking-wider mb-1.5 text-[#D7E2EA]/80">
                    Team Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    placeholder="e.g. CyberVanguard"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#B600A8] transition text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-medium tracking-wider mb-1.5 text-[#D7E2EA]/80">
                    Team Lead Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.leaderEmail}
                    onChange={(e) => setFormData({ ...formData, leaderEmail: e.target.value })}
                    placeholder="lead@university.edu"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#B600A8] transition text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase font-medium tracking-wider mb-1.5 text-[#D7E2EA]/80">
                      Primary Track
                    </label>
                    <select
                      value={formData.track}
                      onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-white/10 text-white focus:outline-none focus:border-[#B600A8] transition text-xs sm:text-sm"
                    >
                      <option value="AI & Autonomous Agents">AI &amp; Autonomous Agents</option>
                      <option value="Web3 & Decentralized">Web3 &amp; Decentralized</option>
                      <option value="IoT & Smart Robotics">IoT &amp; Smart Robotics</option>
                      <option value="FinTech & Cyber Defense">FinTech &amp; Cyber Defense</option>
                      <option value="Open Innovation">Open Innovation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-medium tracking-wider mb-1.5 text-[#D7E2EA]/80">
                      Team Size
                    </label>
                    <select
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-white/10 text-white focus:outline-none focus:border-[#B600A8] transition text-xs sm:text-sm"
                    >
                      <option value="2 Members">2 Members</option>
                      <option value="3 Members">3 Members</option>
                      <option value="4 Members">4 Members</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-medium tracking-wider mb-1.5 text-[#D7E2EA]/80">
                    College / Institute
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    placeholder="e.g. SJBIT, Bangalore"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#B600A8] transition text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 rounded-full text-white font-medium uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition hover:opacity-95 cursor-pointer"
                  style={{
                    background:
                      'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                    boxShadow:
                      '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                    outline: '2px solid white',
                    outlineOffset: '-3px',
                  }}
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Registration</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
