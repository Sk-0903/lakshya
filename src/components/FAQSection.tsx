import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ShieldCheck, Search, Users, Code, Building, Scale, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { EVENT_DATA, RuleItem } from '../data/event';
import { Converge, ConvergeText } from './motion';

type CategoryFilter = 'all' | 'Eligibility & Team' | 'Submission & Originality' | 'Venue & Conduct' | 'Evaluation & Authority';

export const FAQSection: React.FC = () => {
  const [openRuleId, setOpenRuleId] = useState<string | null>('r1');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpandedAll, setIsExpandedAll] = useState(false);

  const toggleRule = (id: string) => {
    setOpenRuleId((prev) => (prev === id ? null : id));
  };

  const categories = [
    { id: 'all', label: 'All Rules', count: EVENT_DATA.rules.length, icon: BookOpen },
    { id: 'Eligibility & Team', label: 'Eligibility & Teams', count: 5, icon: Users },
    { id: 'Submission & Originality', label: 'Code & Submission', count: 5, icon: Code },
    { id: 'Venue & Conduct', label: 'Venue & Conduct', count: 6, icon: Building },
    { id: 'Evaluation & Authority', label: 'Evaluation & Jury', count: 4, icon: Scale },
  ];

  const filteredRules = useMemo(() => {
    return EVENT_DATA.rules.filter((rule) => {
      const matchesCategory = selectedCategory === 'all' || rule.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rule.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rule.number.toString().includes(searchQuery.trim());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // When viewing "all" with no search, show a clean compact initial set of 8 rules (4 rows in 2 columns),
  // with a toggle button to show all 20 rules smoothly without clutter.
  const isFilterActive = selectedCategory !== 'all' || searchQuery.trim().length > 0;
  const displayedRules = useMemo(() => {
    if (isFilterActive || isExpandedAll) {
      return filteredRules;
    }
    return filteredRules.slice(0, 8);
  }, [filteredRules, isFilterActive, isExpandedAll]);

  const remainingCount = filteredRules.length - displayedRules.length;

  return (
    <section
      id="rules"
      aria-labelledby="rules-heading"
      className="bg-bg text-[#D7E2EA] py-20 sm:py-28 md:py-32 border-t border-[#D7E2EA]/12 select-none relative"
    >
      {/* Horizontally centered container with generous 1140px width for 2 columns */}
      <div
        className="w-full px-5 sm:px-8"
        style={{ maxWidth: '1140px', margin: '0 auto' }}
      >
        {/* Centered Header */}
        <div className="w-full flex flex-col items-center justify-center text-center mb-10 sm:mb-14">
          <span className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.28em] text-[#D7E2EA]/60 text-center block mb-3 sm:mb-4">
            09 &mdash; GUIDELINES
          </span>
          <h2
            id="rules-heading"
            className="hero-heading font-heading font-black uppercase text-[clamp(2.25rem,5.5vw,4.5rem)] tracking-tight leading-[0.95] text-center w-full mx-auto mb-4 block"
          >
            <ConvergeText text="Rules & Regulations" mode="words" stagger={0.06} />
          </h2>
          <p className="text-sm sm:text-base font-light text-[#D7E2EA]/65 leading-relaxed max-w-[62ch] text-center w-full mx-auto block">
            {EVENT_DATA.rulesSubtitle}. All 20 official points for fair play, eligibility, code originality, and venue conduct.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-md mt-7 relative">
            <Search className="w-4 h-4 text-[#D7E2EA]/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 20 rules (e.g., team size, consent, food)..."
              className="w-full pl-11 pr-4 py-2.5 sm:py-3 rounded-full bg-surface border border-[#D7E2EA]/15 text-sm text-white placeholder-[#D7E2EA]/40 focus:outline-none focus:border-[#B600A8] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-[#D7E2EA]/50 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-5 sm:mt-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id as CategoryFilter);
                    if (cat.id !== 'all') {
                      setIsExpandedAll(true);
                    }
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white border-transparent shadow-md shadow-[#B600A8]/25 font-semibold'
                      : 'bg-surface/60 border-[#D7E2EA]/12 text-[#D7E2EA]/70 hover:text-white hover:bg-surface-2'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20' : 'bg-white/10'}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Responsive Rules Grid */}
        <div className="w-full">
          {filteredRules.length === 0 ? (
            <div className="text-center py-12 rounded-2xl border border-[#D7E2EA]/10 bg-surface/30">
              <p className="text-[#D7E2EA]/60 text-sm">No rules match your search &quot;{searchQuery}&quot;.</p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="mt-3 text-xs font-mono text-fuchsia-400 hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5 items-start">
              {displayedRules.map((rule, idx) => {
                const isOpen = openRuleId === rule.id;
                const buttonId = `rule-btn-${rule.id}`;
                const panelId = `rule-panel-${rule.id}`;
                const formattedNumber = rule.number.toString().padStart(2, '0');

                return (
                  <Converge
                    key={rule.id}
                    from="bottom"
                    distance={20}
                    delay={Math.min(idx * 0.02, 0.2)}
                    className="w-full"
                  >
                    <div
                      className={`w-full rounded-2xl border transition-all duration-200 ${
                        isOpen
                          ? 'border-[#B600A8]/50 bg-surface shadow-lg shadow-[#B600A8]/10'
                          : 'border-[#D7E2EA]/12 bg-surface/50 hover:border-[#D7E2EA]/25 hover:bg-surface'
                      }`}
                    >
                      <h3 className="m-0 p-0 font-normal">
                        <button
                          id={buttonId}
                          type="button"
                          onClick={() => toggleRule(rule.id)}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          className="w-full flex items-center justify-between text-left gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 sm:py-4 cursor-pointer group focus-visible:outline-2 focus-visible:outline-[#BBCCD7] rounded-2xl"
                        >
                          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                            {/* Number Badge */}
                            <span className={`w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-lg font-mono text-xs font-bold flex items-center justify-center border ${
                              isOpen
                                ? 'border-[#B600A8] bg-[#B600A8]/20 text-white'
                                : 'border-[#D7E2EA]/15 bg-surface-2 text-[#D7E2EA]/60 group-hover:text-white group-hover:border-[#D7E2EA]/30'
                            }`}>
                              {formattedNumber}
                            </span>

                            <div className="min-w-0">
                              <span className="font-heading font-medium text-sm sm:text-base text-white/95 group-hover:text-white transition-colors leading-snug block truncate">
                                {rule.title}
                              </span>
                              <span className="text-[10px] font-mono uppercase tracking-wider text-[#D7E2EA]/45 block">
                                {rule.category}
                              </span>
                            </div>
                          </div>

                          {/* Minimal Circular Toggle Button */}
                          <span
                            className={`w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-full border flex items-center justify-center transition-all duration-200 ${
                              isOpen
                                ? 'border-[#B600A8] bg-[#B600A8]/20 text-white'
                                : 'border-[#D7E2EA]/15 text-[#D7E2EA]/60 group-hover:border-[#D7E2EA]/40 group-hover:text-white'
                            }`}
                          >
                            <motion.span
                              animate={{ rotate: isOpen ? 45 : 0 }}
                              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                              className="inline-flex items-center justify-center"
                            >
                              <Plus className="w-3.5 h-3.5" />
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
                            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 sm:px-5 pb-4 pt-1 border-t border-[#D7E2EA]/10">
                              <p className="text-xs sm:text-sm font-light text-[#D7E2EA]/85 leading-[1.7] text-pretty">
                                {rule.content}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Converge>
                );
              })}
            </div>
          )}

          {/* Show All / Show Less Toggle Button (Only when browsing all rules without search) */}
          {!isFilterActive && filteredRules.length > 8 && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setIsExpandedAll((prev) => !prev)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#D7E2EA]/20 bg-surface/80 hover:bg-surface hover:border-fuchsia-400/50 text-[#D7E2EA] hover:text-white text-xs font-mono uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer focus-visible:outline-2 focus-visible:outline-[#BBCCD7]"
              >
                <span>
                  {isExpandedAll ? 'Show Less' : `View All 20 Rules (${remainingCount} more)`}
                </span>
                {isExpandedAll ? (
                  <ChevronUp className="w-3.5 h-3.5 text-fuchsia-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-fuchsia-400" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-10 sm:mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official rules enforced by the Lakshya 2026 Organizing Committee & Jury</span>
          </div>
        </div>
      </div>
    </section>
  );
};
