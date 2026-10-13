import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, X, ArrowUpRight } from 'lucide-react';
import { EVENT_DATA, LeadershipMemberData } from '../data/event';
import { Converge, ConvergeText, useConvergeConfig } from './motion';
import { PlaceholderAvatar } from './TeamSection';

interface LeadershipBannerCardProps {
  member: LeadershipMemberData;
  index: number;
  onOpenDialog: (member: LeadershipMemberData, triggerEl: HTMLElement | null) => void;
}

const LeadershipBannerCard: React.FC<LeadershipBannerCardProps> = ({
  member,
  index,
  onOpenDialog,
}) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const triggerBtnRef = useRef<HTMLButtonElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  const hasPhoto = Boolean(member.photo && member.photo.trim().length > 0);
  const hasName = Boolean(member.name && member.name.trim().length > 0);
  const hasMessage = Boolean(member.message && member.message.trim().length > 0);
  const hasDesignation = Boolean(member.designation && member.designation.trim().length > 0);
  const hasDepartment = Boolean(member.department && member.department.trim().length > 0);

  // Measure truncation with ResizeObserver (clamps on mobile, fully visible on desktop)
  useEffect(() => {
    if (!hasMessage) {
      setIsTruncated(false);
      return;
    }
    const el = textRef.current;
    if (!el) return;

    const checkTruncation = () => {
      setIsTruncated(el.scrollHeight > el.clientHeight + 2);
    };

    checkTruncation();
    const observer = new ResizeObserver(checkTruncation);
    observer.observe(el);
    return () => observer.disconnect();
  }, [member.message, hasMessage]);

  const handleOpenModal = () => {
    onOpenDialog(member, triggerBtnRef.current);
  };

  return (
    <article
      ref={cardRef}
      className="w-full rounded-[24px] sm:rounded-[28px] bg-surface/90 border border-[#D7E2EA]/12 p-5 sm:p-8 md:p-10 lg:p-12 overflow-hidden transition-all duration-300 hover:border-[#B600A8]/50 hover:-translate-y-0.5 sm:hover:-translate-y-1 relative group shadow-2xl shadow-black/50 flex flex-col md:flex-row items-center md:items-center gap-6 sm:gap-10 lg:gap-12 backdrop-blur-sm"
    >
      {/* Specular Top Hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D7E2EA]/20 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle Ambient Corner Glow */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-bl from-[#B600A8]/10 via-[#7621B0]/5 to-transparent blur-3xl rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Frame-Mounted Portrait Container (4:3 ratio matches executive landscape photos) */}
      <div className="w-full max-w-[340px] sm:max-w-[380px] md:w-[340px] lg:w-[380px] aspect-[4/3] rounded-[22px] overflow-hidden border border-[#D7E2EA]/15 shadow-[0_16px_40px_rgba(0,0,0,0.6)] relative shrink-0 bg-surface-2 transition-transform duration-500 group-hover:scale-[1.01] flex items-center justify-center">
        {hasPhoto ? (
          <img
            src={member.photo}
            alt={hasName ? `${member.name}, ${member.role}` : member.role}
            width={480}
            height={360}
            loading="lazy"
            className={`w-full h-full object-cover ${
              member.role.toLowerCase().includes('principal')
                ? 'object-[center_22%]'
                : member.role.toLowerCase().includes('dean')
                ? 'object-[38%_25%]'
                : 'object-[center_18%]'
            } pointer-events-none`}
          />
        ) : (
          <PlaceholderAvatar role={member.role} name={member.name} />
        )}

        {/* Soft Vignette Overlay around frame edge */}
        <div
          className="absolute inset-0 pointer-events-none shadow-[inset_0_0_24px_rgba(0,0,0,0.35)]"
          aria-hidden="true"
        />
      </div>

      {/* Right Column: Name, Designation & Full Message Quote */}
      <div className="flex-1 w-full flex flex-col justify-between relative z-10 text-left">
        <div>
          {/* Executive Role Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono tracking-[0.25em] uppercase text-fuchsia-300 bg-[#B600A8]/10 border border-[#B600A8]/30 mb-3.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
            <span>{member.role}</span>
          </div>

          {/* Leader Name */}
          <h3 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-snug">
            {hasName ? (
              member.name
            ) : (
              <span className="text-[#D7E2EA]/45 italic font-light">Name to be announced</span>
            )}
          </h3>

          {/* Designation & Department */}
          {(hasDesignation || hasDepartment) && (
            <p className="text-sm sm:text-base text-[#D7E2EA]/75 font-light mt-1.5 flex flex-wrap items-center gap-x-2">
              <span>{member.designation}</span>
              {hasDesignation && hasDepartment && (
                <span className="text-[#D7E2EA]/30">•</span>
              )}
              <span className="text-[#D7E2EA]/60">{member.department}</span>
            </p>
          )}

          {/* Thin Hairline Divider */}
          <div
            className="w-full h-[1px] bg-gradient-to-r from-[#D7E2EA]/15 via-[#B600A8]/35 to-transparent my-6 sm:my-7"
            aria-hidden="true"
          />
        </div>

        {/* Message Quote Block */}
        <blockquote className="flex-1 flex flex-col justify-between">
          {hasMessage ? (
            <div className="relative border-l-2 border-[#B600A8]/45 pl-5 sm:pl-7 py-1">
              <Quote
                className="w-6 h-6 text-fuchsia-400/50 rotate-180 mb-3.5"
                aria-hidden="true"
              />
              <div
                ref={textRef}
                className="space-y-3.5 text-[#D7E2EA]/85 text-base sm:text-[16.5px] lg:text-[17px] leading-[1.8] font-light max-w-[85ch] line-clamp-6 md:line-clamp-none"
                style={{ hyphens: 'none', WebkitHyphens: 'none' }}
              >
                {member.message.split('\n\n').map((paragraph, pIdx, arr) => (
                  <p key={pIdx}>
                    {pIdx === 0 && <span className="text-xl text-fuchsia-400/80 font-serif mr-1">&ldquo;</span>}
                    {paragraph}
                    {pIdx === arr.length - 1 && <span className="text-xl text-fuchsia-400/80 font-serif ml-1">&rdquo;</span>}
                  </p>
                ))}
              </div>
              {isTruncated && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-surface to-transparent pointer-events-none md:hidden"
                  aria-hidden="true"
                />
              )}
            </div>
          ) : (
            <div className="border-l-2 border-[#D7E2EA]/15 pl-5 sm:pl-7 py-2">
              <p className="text-[#D7E2EA]/45 italic text-sm sm:text-base font-light">
                Message to be added.
              </p>
            </div>
          )}

          {/* Read full message button (visible only if truncated on small screens) */}
          {hasMessage && isTruncated && (
            <div className="mt-5 pt-1 md:hidden">
              <button
                ref={triggerBtnRef}
                type="button"
                onClick={handleOpenModal}
                aria-haspopup="dialog"
                className="inline-flex items-center gap-2 rounded-full border border-[#D7E2EA]/25 text-[#D7E2EA] hover:bg-[#D7E2EA]/10 hover:text-white uppercase tracking-widest font-mono text-xs px-4 py-2 transition-colors cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-[#BBCCD7]"
              >
                <span>Read full message</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-fuchsia-400" />
              </button>
            </div>
          )}

          <footer className="sr-only">
            <cite>
              {hasName ? member.name : 'Leader'}, {member.role}
            </cite>
          </footer>
        </blockquote>
      </div>
    </article>
  );
};

export const LeadershipSection: React.FC = () => {
  const leadership = EVENT_DATA.leadership;
  const members = leadership?.members || [];
  const config = useConvergeConfig();

  // Active dialog state for expanded view on small viewports
  const [activeMember, setActiveMember] = useState<LeadershipMemberData | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock scroll & Lenis when modal is open
  useEffect(() => {
    if (activeMember) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
      (window as any).__lenis?.stop();

      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
      (window as any).__lenis?.start();

      if (triggerRef.current) {
        triggerRef.current.focus();
        triggerRef.current = null;
      }
    }

    return () => {
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
      (window as any).__lenis?.start();
    };
  }, [activeMember]);

  // Trap focus & handle Esc key
  useEffect(() => {
    if (!activeMember) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMember(null);
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMember]);

  const handleOpenDialog = useCallback(
    (member: LeadershipMemberData, triggerEl: HTMLElement | null) => {
      triggerRef.current = triggerEl;
      setActiveMember(member);
    },
    []
  );

  return (
    <section
      id="messages"
      aria-labelledby="leadership-heading"
      className="bg-bg text-[#D7E2EA] py-24 sm:py-32 md:py-40 border-t border-[#D7E2EA]/12 relative select-none overflow-hidden"
    >
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16">
          <Converge from="bottom" distance={20} className="w-full flex justify-center">
            <span className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.28em] text-[#D7E2EA]/60 block mb-3 text-center">
              06 &mdash; {leadership.sectionLabel || 'LEADERSHIP'}
            </span>
          </Converge>

          <div className="w-full flex justify-center items-center text-center mb-4">
            <h2
              id="leadership-heading"
              className="hero-heading font-heading font-black uppercase text-[clamp(2.5rem,7vw,5.5rem)] tracking-tight leading-[0.95] text-center w-full mx-auto"
            >
              <ConvergeText text={leadership.heading || 'WORDS OF ENCOURAGEMENT'} mode="words" />
            </h2>
          </div>

          <Converge from="bottom" distance={24} delay={0.05} className="w-full flex justify-center">
            <p className="text-sm sm:text-base font-light text-[#D7E2EA]/65 leading-relaxed max-w-[60ch] text-center mx-auto">
              A few words on Lakshya&apos;26 &bull; <span className="text-fuchsia-300/80 font-mono text-xs uppercase tracking-wider">{EVENT_DATA.tagline}</span>
            </p>
          </Converge>
        </div>

        {/* Stacked "One Below One" Banner Cards */}
        <div className="w-full flex flex-col gap-8 sm:gap-10">
          {members.map((member, idx) => (
            <Converge
              key={member.role || idx}
              from="bottom"
              distance={40}
              delay={idx * 0.08}
              className="w-full"
            >
              <LeadershipBannerCard
                member={member}
                index={idx}
                onOpenDialog={handleOpenDialog}
              />
            </Converge>
          ))}
        </div>
      </div>

      {/* Accessible Full Message Modal Dialog (Fallback for smaller mobile screens) */}
      <AnimatePresence>
        {activeMember && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveMember(null)}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="dialog-title"
              aria-describedby="dialog-desc"
              initial={config.isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={config.isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              transition={
                config.isReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
              }
              onClick={(e) => e.stopPropagation()}
              className="bg-surface border border-[#D7E2EA]/15 rounded-[24px] max-w-[640px] w-full max-h-[85svh] flex flex-col overflow-hidden shadow-2xl shadow-black relative"
            >
              {/* Dialog Header */}
              <div className="p-6 sm:p-7 border-b border-[#D7E2EA]/12 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-[16px] border border-[#D7E2EA]/12 overflow-hidden bg-surface-2 shrink-0">
                    {activeMember.photo ? (
                      <img
                        src={activeMember.photo}
                        alt={activeMember.name || activeMember.role}
                        className={`w-full h-full object-cover ${
                          activeMember.role.toLowerCase().includes('principal')
                            ? 'object-[center_22%]'
                            : activeMember.role.toLowerCase().includes('dean')
                            ? 'object-[38%_25%]'
                            : 'object-[center_18%]'
                        }`}
                      />
                    ) : (
                      <PlaceholderAvatar role={activeMember.role} name={activeMember.name} />
                    )}
                  </div>
                  <div>
                    <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-[#D7E2EA]/60 block">
                      {activeMember.role}
                    </span>
                    <h3
                      id="dialog-title"
                      className="font-heading font-medium text-lg sm:text-xl text-white tracking-tight"
                    >
                      {activeMember.name || 'Name to be announced'}
                    </h3>
                    {activeMember.designation && (
                      <p className="text-xs text-[#D7E2EA]/70 font-light">
                        {activeMember.designation}
                        {activeMember.department ? ` • ${activeMember.department}` : ''}
                      </p>
                    )}
                  </div>
                </div>

                {/* 44px Accessible Close Button */}
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setActiveMember(null)}
                  aria-label="Close message dialog"
                  className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center text-[#D7E2EA]/70 hover:text-white hover:bg-surface-2 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#BBCCD7]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Dialog Body with Full Message */}
              <div className="p-6 sm:p-8 overflow-y-auto flex-1">
                <div className="flex items-center mb-4" aria-hidden="true">
                  <Quote className="w-8 h-8 text-fuchsia-400/50 rotate-180" />
                </div>
                <div
                  id="dialog-desc"
                  className="space-y-4 text-[#D7E2EA]/90 text-base sm:text-lg leading-[1.8] font-light"
                  style={{ hyphens: 'none', WebkitHyphens: 'none' }}
                >
                  {activeMember.message.split('\n\n').map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Bottom Hairline Highlight */}
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#B600A8]/30 to-transparent" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
