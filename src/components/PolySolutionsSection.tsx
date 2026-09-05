import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, Wrench, Sparkles, Users, ArrowUp, X } from 'lucide-react';
import { EightSystemsSection } from './EightSystemsSection';

export interface StoryTheme {
  id: string;
  themeNumber: string;
  title: string;
  icon: 'network' | 'wrench' | 'sparkles' | 'users';
  badge: string;
  category: string;
  headline: string;
  quote: string;
  cards: {
    tag: string;
    tagColor: string;
    title: string;
    description: string;
  }[];
}

export const STORY_THEMES: StoryTheme[] = [
  {
    id: 'polysolutions',
    themeNumber: 'THEME 01',
    title: 'From Polycrisis to Polysolutions',
    icon: 'network',
    badge: 'THEME 01 • ACTIVE SCENE',
    category: 'Whole-Systems Architecture',
    headline: 'From Polycrisis to Polysolutions',
    quote:
      '"The world’s challenges are interconnected, overlapping, and cascading. We help leaders see the whole system and act across it."',
    cards: [
      {
        tag: '01 / DIAGNOSIS',
        tagColor: 'text-[#ff7e67]',
        title: 'Cascading Failure Modes',
        description:
          'Supply shocks, climate volatility, and fiscal drag reinforce one another in compounding cycles.',
      },
      {
        tag: '02 / SYNTHESIS',
        tagColor: 'text-[#f59e0b]',
        title: 'Cross-System Levers',
        description:
          'Identifying singular institutional levers that unlock simultaneous gains across health, debt, and climate.',
      },
      {
        tag: '03 / EXECUTION',
        tagColor: 'text-[#ff7e67]',
        title: 'Polysolution Compacts',
        description:
          'Multi-stakeholder accords funded by blended capital and deployed with statutory safeguards.',
      },
    ],
  },
  {
    id: 'translation',
    themeNumber: 'THEME 02',
    title: 'Translation, Not Theory',
    icon: 'wrench',
    badge: 'THEME 02 • ACTIVE SCENE',
    category: 'Statutory & Implementation Architecture',
    headline: 'Translation, Not Theory',
    quote:
      '"Bridging the chasm between visionary global treaties and operational municipal & national enforcement."',
    cards: [
      {
        tag: '01 / CODIFICATION',
        tagColor: 'text-[#ff7e67]',
        title: 'Statutory Alignment',
        description:
          'Transforming multilateral declarations into binding legislative mandates, procurement codes, and fiscal appropriations.',
      },
      {
        tag: '02 / RISK SHARING',
        tagColor: 'text-[#f59e0b]',
        title: 'De-risking Frameworks',
        description:
          'Blended finance syndication with multilateral guarantee facilities that crowd in institutional private balance sheets.',
      },
      {
        tag: '03 / DEPLOYMENT',
        tagColor: 'text-[#ff7e67]',
        title: 'Delivery Task Forces',
        description:
          'Dedicated cross-agency operational task forces tracking real-time KPI metrics, supply chain milestones, and statutory deadlines.',
      },
    ],
  },
  {
    id: 'thinking',
    themeNumber: 'THEME 03',
    title: 'Thinking that Shifts',
    icon: 'sparkles',
    badge: 'THEME 03 • ACTIVE SCENE',
    category: 'Cognitive & Paradigm Transitions',
    headline: 'Thinking that Shifts',
    quote:
      '"Linear solutions cannot cure non-linear failures. We rewire institutional decision models for exponential complexity."',
    cards: [
      {
        tag: '01 / DYNAMICS',
        tagColor: 'text-[#ff7e67]',
        title: 'Feedback Loop Forensics',
        description:
          'Identifying vicious cycles and hidden tail-risks before they tip into systemic breakdown across sovereign balance sheets.',
      },
      {
        tag: '02 / PARADIGMS',
        tagColor: 'text-[#f59e0b]',
        title: 'Regenerative Economics',
        description:
          'Moving from extractive remediation to self-reinforcing regenerative capital, circular materials, and human capacity growth.',
      },
      {
        tag: '03 / RESILIENCE',
        tagColor: 'text-[#ff7e67]',
        title: 'Antifragile Governance',
        description:
          'Engineering governance architectures that absorb systemic volatility and emerge stronger through stress and crisis.',
      },
    ],
  },
  {
    id: 'convener',
    themeNumber: 'THEME 04',
    title: 'A Convener Between Worlds',
    icon: 'users',
    badge: 'THEME 04 • ACTIVE SCENE',
    category: 'Multilateral Coalition Platform',
    headline: 'A Convener Between Worlds',
    quote:
      '"Neutral ground for unlikely coalitions: unifying sovereigns, capital allocators, scientific innovators, and civic stewards."',
    cards: [
      {
        tag: '01 / NEUTRALITY',
        tagColor: 'text-[#ff7e67]',
        title: 'Trusted Safe Harbors',
        description:
          'Chatham House rule deliberation spaces resolving long-standing deadlocks between regulators, innovators, and market makers.',
      },
      {
        tag: '02 / SYNTHESIS',
        tagColor: 'text-[#f59e0b]',
        title: 'Cross-Sector Compacts',
        description:
          'Binding mutual-aid pacts and joint accountability mechanisms across public, private, and philanthropic partners.',
      },
      {
        tag: '03 / ACCOUNTABILITY',
        tagColor: 'text-[#ff7e67]',
        title: 'Independent Impact Audits',
        description:
          'Verifiable cryptographic and institutional monitoring protocols that guarantee multi-year delivery of shared mandates.',
      },
    ],
  },
];

interface PolySolutionsSectionProps {
  activeThemeIndex?: number;
  onThemeChange?: (index: number) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const PolySolutionsSection: React.FC<PolySolutionsSectionProps> = ({
  activeThemeIndex: controlledThemeIndex,
  onThemeChange,
  isOpen = false,
  onClose,
}) => {
  const [internalThemeIndex, setInternalThemeIndex] = useState<number>(0);
  const activeIndex =
    controlledThemeIndex !== undefined ? controlledThemeIndex : internalThemeIndex;

  const handleSelectTheme = (index: number) => {
    if (onThemeChange) {
      onThemeChange(index);
    } else {
      setInternalThemeIndex(index);
    }
  };

  const handleReturnToTop = () => {
    const el = document.getElementById('orbital-system-container') || document.getElementById('systems-hero');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const activeTheme = STORY_THEMES[activeIndex] || STORY_THEMES[0];

  const renderThemeIcon = (icon: StoryTheme['icon'], isActive: boolean) => {
    if (icon === 'network') {
      return (
        <Network
          className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400 group-hover:text-white'}`}
        />
      );
    }
    if (icon === 'wrench') {
      return (
        <Wrench
          className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400 group-hover:text-white'}`}
        />
      );
    }
    if (icon === 'sparkles') {
      return (
        <Sparkles
          className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400 group-hover:text-white'}`}
        />
      );
    }
    return (
      <Users
        className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400 group-hover:text-white'}`}
      />
    );
  };

  return (
    <section
      id="polysolutions-section"
      className={`relative w-full bg-[#050a12] transition-all duration-300 overflow-hidden border-t-0 select-text ${
        isOpen ? 'pt-10 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8' : 'p-0 h-0 invisible pointer-events-none'
      }`}
    >
      {/* Background Ambient Glow Gradients */}
      {isOpen && (
        <>
          <div className="absolute top-1/6 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#ff7e67]/5 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#2dd4bf]/5 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-[#ff7e67]/5 rounded-full blur-[140px] pointer-events-none" />
        </>
      )}

      <div className="w-full relative z-10">
        {/* Unified Poly-Solutions & Eight Systems Master Architecture Card (Shown only when button is clicked) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="polysolutions-master-card"
              initial={{ opacity: 0, y: -24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full bg-[#0a121e] border border-slate-800/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col relative overflow-hidden shadow-2xl space-y-8 sm:space-y-10"
            >
              {/* Active Story Scene Card (Thematic Horizon & 3 Strategy Pillars) */}
              <div id="active-story-scene-card" className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Left Side: Navigation & Theme Selector Column */}
                <div className="lg:col-span-4 xl:col-span-3.5 flex flex-col gap-3.5 pb-6 lg:pb-0 lg:pr-6 border-b lg:border-b-0 lg:border-r border-slate-800/80 w-full shrink-0">
                  {/* Top Utility Row */}
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ea6955] animate-pulse" />
                      <span className="text-[11px] text-slate-400 font-mono font-medium tracking-wider uppercase">
                        Thematic Horizons
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        id="return-to-top-btn"
                        onClick={handleReturnToTop}
                        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-100 transition-colors font-mono cursor-pointer px-2 py-1 rounded-lg hover:bg-slate-800/50"
                        title="Back to Orbital Map"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Map</span>
                      </button>

                      {onClose && (
                        <button
                          id="close-story-btn"
                          onClick={onClose}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer border border-slate-700/60"
                          title="Close Master View"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Vertical Theme Selector Stack */}
                  <div className="flex flex-col gap-2 w-full mt-1">
                    {STORY_THEMES.map((theme, idx) => {
                      const isActive = activeIndex === idx;
                      return (
                        <button
                          key={theme.id}
                          id={`btn-theme-${idx + 1}`}
                          onClick={() => handleSelectTheme(idx)}
                          className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-mono font-medium tracking-wide transition-all duration-200 cursor-pointer flex flex-col gap-1.5 border ${
                            isActive
                              ? 'bg-[#ea6955] text-slate-950 font-bold border-[#ea6955] shadow-lg shadow-[#ea6955]/15'
                              : 'bg-[#0e1726]/80 hover:bg-[#152338] text-slate-300 border-slate-800/80 hover:border-slate-700 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span
                              className={`text-[10px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded ${
                                isActive ? 'bg-black/20 text-slate-950' : 'bg-slate-800/60 text-slate-400'
                              }`}
                            >
                              {theme.themeNumber}
                            </span>
                            {isActive ? (
                              <span className="text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/20 text-slate-950">
                                ACTIVE
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono text-slate-500 uppercase">
                                VIEW
                              </span>
                            )}
                          </div>
                          <span className="font-sans text-xs sm:text-sm font-semibold tracking-normal leading-snug">
                            {theme.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Side: Active Theme Scene Content */}
                <div className="lg:col-span-8 xl:col-span-8.5 w-full min-w-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTheme.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col justify-between h-full"
                    >
                      <div>
                        {/* Scene Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff7e67]/15 border border-[#ff7e67]/30 text-[#ff7e67] font-mono text-[11px] font-bold tracking-wider uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff7e67]" />
                          <span>{activeTheme.badge}</span>
                        </div>

                        {/* Headline */}
                        <h3 className="font-serif text-2xl sm:text-3xl lg:text-[38px] font-bold text-slate-100 tracking-tight leading-[1.18] mt-4">
                          {activeTheme.headline}
                        </h3>

                        {/* Quote */}
                        <p className="font-serif italic text-slate-300/90 text-sm sm:text-base lg:text-lg font-normal leading-relaxed mt-3 max-w-4xl">
                          {activeTheme.quote}
                        </p>
                      </div>

                      {/* Divider Line */}
                      <div className="w-full border-t border-slate-800/80 my-6" />

                      {/* 3 Pillars / Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 lg:gap-4 items-stretch">
                        {activeTheme.cards.map((card, cIdx) => (
                          <div
                            key={cIdx}
                            className="bg-[#0e1828]/70 hover:bg-[#111e32]/80 border border-slate-800/80 rounded-xl p-4 sm:p-5 transition-all duration-200 flex flex-col justify-start group"
                          >
                            <span
                              className={`font-mono text-xs font-bold tracking-wider ${card.tagColor} mb-2 block`}
                            >
                              {card.tag}
                            </span>
                            <h4 className="font-sans text-slate-100 font-bold text-sm sm:text-base mb-1.5 leading-snug group-hover:text-white">
                              {card.title}
                            </h4>
                            <p className="text-slate-400 text-xs leading-relaxed font-light">
                              {card.description}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Theme 1 Specific: Eight Systems Architecture */}
                      {activeTheme.id === 'polysolutions' && (
                        <div className="mt-8 pt-8 border-t border-slate-800/80 flex flex-col space-y-6">
                          <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[#ff7e67]/10 border border-[#ff7e67]/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ff7e67] animate-pulse" />
                            <span className="text-[11px] font-mono text-[#ff7e67] uppercase tracking-wider font-semibold">
                              Operationalized Across 8 Interconnected Realities
                            </span>
                          </div>
                          <EightSystemsSection />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PolySolutionsSection;

