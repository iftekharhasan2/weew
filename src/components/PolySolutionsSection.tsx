import React, { useState, useRef, useEffect, useCallback } from 'react';
import { EightSystemsSection } from './EightSystemsSection';
import { MethodologyTranslationSection } from './MethodologyTranslationSection';
import { ProjectsSection } from './ProjectsSection';
import { FourFrontsSection } from './FourFrontsSection';
import { ConveningSection } from './ConveningSection';
import { TrustMatrixMarquee } from './TrustMatrixMarquee';
import { TestimonialCard } from './TestimonialCard';

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

  const sectionRef = useRef<HTMLElement>(null);
  const masterCardRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScrollRef = useRef<boolean>(false);

  // Sync with external controlled index
  useEffect(() => {
    if (controlledThemeIndex !== undefined) {
      setInternalThemeIndex(controlledThemeIndex);
      const targetEl = document.getElementById(`theme-horizon-${controlledThemeIndex + 1}`);
      if (targetEl) {
        isProgrammaticScrollRef.current = true;
        const topOffset = 85;
        const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - topOffset,
          behavior: 'smooth',
        });
        setTimeout(() => {
          isProgrammaticScrollRef.current = false;
        }, 800);
      }
    }
  }, [controlledThemeIndex]);

  // Observer to track which theme is currently in the viewport as user scrolls the page
  useEffect(() => {
    const horizonElements = STORY_THEMES.map((_, idx) =>
      document.getElementById(`theme-horizon-${idx + 1}`)
    ).filter(Boolean) as HTMLElement[];

    if (horizonElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScrollRef.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const indexAttr = entry.target.getAttribute('data-theme-index');
            if (indexAttr !== null) {
              const idx = parseInt(indexAttr, 10);
              setInternalThemeIndex(idx);
              if (onThemeChange) {
                onThemeChange(idx);
              }
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-15% 0px -55% 0px',
        threshold: 0.05,
      }
    );

    horizonElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onThemeChange]);

  const handleSelectTheme = useCallback(
    (index: number) => {
      setInternalThemeIndex(index);
      if (onThemeChange) {
        onThemeChange(index);
      }
      const targetEl = document.getElementById(`theme-horizon-${index + 1}`);
      if (targetEl) {
        isProgrammaticScrollRef.current = true;
        const topOffset = 85;
        const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - topOffset,
          behavior: 'smooth',
        });
        setTimeout(() => {
          isProgrammaticScrollRef.current = false;
        }, 800);
      }
    },
    [onThemeChange]
  );

  return (
    <section
      id="polysolutions-section"
      ref={sectionRef}
      className="relative w-full bg-[#050a12] pt-8 sm:pt-14 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-10 border-t-0 select-text"
    >
      {/* Background Ambient Glow Gradients */}
      <div className="absolute top-1/6 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#ff7e67]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#2dd4bf]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-[#ff7e67]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full relative z-10">
        {/* Full-width Unified Poly-Solutions Section Container - Seamlessly Part of the Section */}
        <div
          id="polysolutions-master-card"
          ref={masterCardRef}
          className="container-fluid w-full max-w-full bg-transparent border-0 rounded-none p-0 flex flex-col relative shadow-none"
        >
          {/* Active Story Layout: Left Sticky Navigation & Natural Page Content */}
          <div
            id="active-story-scene-card"
            className="w-full grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-12 items-start"
          >
            {/* Left Column: Sticky Navigation & Thematic Horizon Selector */}
            <div className="w-full lg:w-[220px] lg:sticky lg:top-24 lg:self-start flex flex-col gap-3.5 pb-6 lg:pb-0 pr-0 lg:pr-6 border-b lg:border-b-0 lg:border-r border-slate-800/80 shrink-0 z-20">
              {/* Top Utility Indicator */}
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-slate-300 font-medium tracking-wide uppercase">
                  Thematic Horizons
                </span>
                <span className="text-[11px] font-mono text-[#ff7e67] font-semibold">
                  {activeIndex + 1} / 4
                </span>
              </div>

              {/* Vertical Horizon Selector Stack */}
              <div className="flex flex-col gap-2 w-full mt-1">
                {STORY_THEMES.map((theme, idx) => {
                  const isActive = activeIndex === idx;

                  return (
                    <button
                      key={theme.id}
                      id={`btn-theme-${idx + 1}`}
                      onClick={() => handleSelectTheme(idx)}
                      className={`w-full text-left px-3.5 py-3 rounded-xl transition-all duration-200 border relative select-none cursor-pointer ${
                        isActive
                          ? 'bg-[#ea6955] text-slate-950 font-bold border-[#ea6955] shadow-md shadow-[#ea6955]/15'
                          : 'bg-[#0e1726]/80 hover:bg-[#152338] text-slate-300 border-slate-800/80 hover:border-slate-700 hover:text-white font-medium'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[18px] sm:text-[20px] leading-snug block font-serif">
                          {theme.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: All 4 Thematic Horizons rendered naturally in page stream */}
            <div
              id="active-theme-scroll-pane"
              className="w-full min-w-0 flex flex-col space-y-20 sm:space-y-28"
            >
              {STORY_THEMES.map((theme, idx) => (
                <div
                  key={theme.id}
                  id={`theme-horizon-${idx + 1}`}
                  data-theme-index={idx}
                  className="theme-horizon-block w-full flex flex-col space-y-6 sm:space-y-8 pt-2 pb-14 sm:pb-20 border-b border-slate-800/60 last:border-b-0"
                >
                  {/* Horizon Header */}
                  <div className="flex flex-col space-y-3 max-w-4xl">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#ff7e67] font-semibold px-2.5 py-1 rounded-md bg-[#ff7e67]/10 border border-[#ff7e67]/20">
                        {theme.themeNumber} • {theme.category}
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl sm:text-4xl lg:text-[52px] font-bold text-slate-100 tracking-tight leading-[1.12]">
                      {theme.headline}
                    </h3>

                    <p className="font-serif italic text-slate-300/90 text-lg sm:text-xl lg:text-[22px] font-normal leading-relaxed">
                      {theme.quote}
                    </p>
                  </div>

                  {/* Theme 1 Specific: Eight Systems Architecture */}
                  {theme.id === 'polysolutions' && (
                    <div className="flex flex-col space-y-4 w-full">
                      <span className="text-xs font-mono text-[#ff7e67] uppercase tracking-wider font-semibold">
                        Operationalized Across 8 Interconnected Realities
                      </span>
                      <EightSystemsSection />
                    </div>
                  )}

                  {/* Theme 2 Specific: Translation Framework & Projects */}
                  {theme.id === 'translation' && (
                    <div className="w-full space-y-8">
                      <MethodologyTranslationSection embedded />
                      <ProjectsSection embedded />
                    </div>
                  )}

                  {/* Theme 3 Specific: Thinking that Shifts (Publications & Four Fronts) */}
                  {theme.id === 'thinking' && (
                    <div className="w-full space-y-8">
                      <FourFrontsSection embedded />
                    </div>
                  )}

                  {/* Theme 4 Specific: Multilateral Platform, Ecosystem & Testimonials */}
                  {theme.id === 'convener' && (
                    <div className="w-full space-y-10">
                      <ConveningSection embedded />

                      <div className="w-full border-t border-slate-800/80 pt-8">
                        <TrustMatrixMarquee embedded />
                      </div>

                      <div className="w-full border-t border-slate-800/80 pt-8">
                        <TestimonialCard embedded />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PolySolutionsSection;

