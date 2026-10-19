import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EVENT_DATA } from '../data/event';

export const AnnouncementBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          key="announcement-banner"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="relative z-[200] overflow-hidden"
        >
          <div
            className="w-full flex items-center justify-center gap-2 sm:gap-4 px-4 sm:px-6 py-2.5 text-center"
            style={{
              background: 'linear-gradient(90deg, #18011F 0%, #7621B0 30%, #B600A8 60%, #BE4C00 100%)',
            }}
          >
            {/* Icon */}
            <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400 shrink-0" aria-hidden="true" />

            {/* Message */}
            <p className="text-[11px] sm:text-xs md:text-sm font-mono text-white/95 leading-tight text-center">
              <span className="font-bold text-red-400 uppercase tracking-widest mr-1 sm:mr-2">
                🔒 Slots Full
              </span>
              <span className="text-white/80">Registrations are</span>
              <span className="font-semibold text-white mx-1">now closed.</span>
              <span className="hidden sm:inline text-white/60 mx-1">·</span>
              <span className="hidden sm:inline text-white/80 italic">
                Thank you for the overwhelming response!
              </span>
            </p>

            {/* Mobile-only second line for the italic note */}
            <span className="sr-only sm:hidden">Thank you for the overwhelming response!</span>

            {/* Dismiss */}
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss announcement"
              className="ml-1 sm:ml-2 shrink-0 text-white/60 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-white rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile italic note */}
          <div
            className="sm:hidden w-full px-4 py-1 text-center"
            style={{ background: 'rgba(24,1,31,0.95)' }}
          >
            <p className="text-[10px] font-mono text-white/60 italic">
              May close before 22 Oct if slots are full.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
