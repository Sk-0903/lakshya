import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { Terminal as TerminalIcon } from 'lucide-react';
import { EVENT_DATA } from '../data/event';

export const TerminalCard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const lines = EVENT_DATA.terminalLines;

  useEffect(() => {
    if (!isInView || isFinished) return;

    if (currentLineIndex < lines.length) {
      const targetLine = lines[currentLineIndex];

      if (currentCharIndex < targetLine.length) {
        const timeout = setTimeout(() => {
          setDisplayedLines((prev) => {
            const next = [...prev];
            next[currentLineIndex] = targetLine.slice(0, currentCharIndex + 1);
            return next;
          });
          setCurrentCharIndex((prev) => prev + 1);
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        // Line finished, move to next after slight pause
        const timeout = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 120);
        return () => clearTimeout(timeout);
      }
    } else {
      setIsFinished(true);
    }
  }, [isInView, currentLineIndex, currentCharIndex, isFinished, lines]);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-2xl rounded-3xl border border-[#D7E2EA]/20 bg-black/50 backdrop-blur-md p-5 sm:p-6 shadow-2xl font-mono text-left select-none"
    >
      {/* Header with Fake Window Controls */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-white/50">
          <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span>lakshya-shell &bull; zsh</span>
        </div>
        <span className="text-[10px] text-white/30">v2.6.0</span>
      </div>

      {/* Terminal Content Area */}
      <div className="min-h-[140px] flex flex-col justify-start gap-2 text-xs sm:text-sm leading-relaxed">
        {displayedLines.map((line, idx) => {
          const isCheck = line.startsWith('✔');
          const isStatus = line.startsWith('> status:');
          const isPrompt = line.startsWith('>');

          let colorClass = 'text-white/80';
          if (isCheck) colorClass = 'text-emerald-400 font-medium';
          else if (isStatus) colorClass = 'text-amber-400 font-bold';
          else if (isPrompt) colorClass = 'text-cyan-300 font-medium';

          return (
            <p key={idx} className={`${colorClass} flex items-center gap-2`}>
              <span>{line}</span>
              {/* Show blinking cursor on current typing line */}
              {idx === currentLineIndex && !isFinished && (
                <span className="w-2 h-4 bg-cyan-400 animate-pulse inline-block" />
              )}
            </p>
          );
        })}

        {/* Permanent blinking cursor when completed */}
        {isFinished && (
          <p className="text-white/40 flex items-center gap-2 pt-1">
            <span>&gt; ready for input</span>
            <span className="w-2 h-4 bg-emerald-400 animate-pulse inline-block" />
          </p>
        )}
      </div>
    </div>
  );
};
