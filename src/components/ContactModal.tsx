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
    name: '',
    email: '',
    projectType: 'Lakshya 3D Experience',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
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
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#D7E2EA]/70 hover:text-white hover:border-white/30 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#B600A8]" />
              <span className="text-xs uppercase font-mono tracking-widest text-[#B600A8]">
                Lakshya &apos;26 &bull; Direct Connect
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-white mb-2 tracking-tight">
              Let&apos;s Build Together
            </h3>
            <p className="text-sm font-light text-[#D7E2EA]/70 mb-6 leading-relaxed">
              Have a project, 3D design inquiry, or want to collaborate for the Lakshya flagship sprint? Send a message below.
            </p>

            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-bounce" />
                <h4 className="text-xl font-bold uppercase text-white">Message Dispatched!</h4>
                <p className="text-xs text-[#D7E2EA]/70">
                  Thank you! We&apos;ll be in touch with you right away.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs uppercase font-medium tracking-wider mb-1.5 text-[#D7E2EA]/80">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Morgan"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#B600A8] transition text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-medium tracking-wider mb-1.5 text-[#D7E2EA]/80">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@studio.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#B600A8] transition text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-medium tracking-wider mb-1.5 text-[#D7E2EA]/80">
                    Collaboration Focus
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-white/10 text-white focus:outline-none focus:border-[#B600A8] transition text-sm"
                  >
                    <option value="Lakshya 3D Experience">Lakshya &apos;26 3D Experience</option>
                    <option value="3D Modeling & Rendering">3D Modeling &amp; Rendering</option>
                    <option value="Motion Design">Motion Design</option>
                    <option value="Brand Identity">Brand Identity</option>
                    <option value="Web Design">Web Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-medium tracking-wider mb-1.5 text-[#D7E2EA]/80">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your vision..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#B600A8] transition text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 rounded-full text-white font-medium uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition hover:opacity-95"
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
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
