import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, 
  Search, 
  Compass, 
  DollarSign, 
  Cpu, 
  Activity, 
  CheckCircle2, 
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Check,
  Send,
  FileText,
  Building,
  Mail,
  User,
  HelpCircle
} from 'lucide-react';

interface Chapter {
  id: string;
  label: string;
  title: string;
  body: string;
  icon: React.ElementType;
  deliverable: string;
  keyQuestion: string;
  actionItems: string[];
}

const CHAPTERS: Chapter[] = [
  {
    id: 'complexity',
    label: 'Complexity',
    title: 'Pressures arrive together, not one at a time',
    body: 'Fiscal constraint, climate exposure, institutional capacity and technological change rarely present as separate problems. They interact, and a response designed against only one of them tends to shift the cost somewhere else.',
    icon: Layers,
    deliverable: 'Cross-System Diagnostic & Stress-Testing Matrix',
    keyQuestion: 'Where do institutional and economic stress factors compound each other?',
    actionItems: [
      'Multi-domain vulnerability modeling (Debt + Climate + DPI)',
      'Cross-ministerial bottleneck identification',
      'Macro-fiscal shock resilience simulation'
    ]
  },
  {
    id: 'evidence',
    label: 'Evidence',
    title: 'Establish what is actually happening',
    body: 'We gather primary evidence where secondary evidence is thin, map the institutions and incentives that govern the outcome, and model the economics. The test is whether the analysis could change the decision.',
    icon: Search,
    deliverable: 'Empirical Evidence Baseline & Incentive Map',
    keyQuestion: 'Does the empirical data alter the decision path for key stakeholders?',
    actionItems: [
      'Field-level revenue & expenditure forensic audit',
      'Stakeholder incentive & institutional resistance mapping',
      'Econometric counterfactual policy modeling'
    ]
  },
  {
    id: 'architecture',
    label: 'Architecture',
    title: 'Turn findings into instruments somebody owns',
    body: 'Evidence becomes policy architecture, regulation, and the governance and operating model that will carry it. Designing the instrument and the administering institution together is what makes it survivable.',
    icon: Compass,
    deliverable: 'Actionable Policy Architecture & Operating Charter',
    keyQuestion: 'Which institution has legal ownership and operational incentive to maintain the instrument?',
    actionItems: [
      'Statutory instrument drafting & regulatory frameworks',
      'Civil service operating charter and KPI mandate',
      'Inter-agency steering council protocol setup'
    ]
  },
  {
    id: 'mobilisation',
    label: 'Mobilisation',
    title: 'Structure the money alongside the design',
    body: 'Public finance, development finance and private capital each constrain what a programme can look like. Structuring the investment case and the risk allocation in parallel produces something that can actually be funded.',
    icon: DollarSign,
    deliverable: 'Blended Finance Structure & Sovereign Risk Allocation',
    keyQuestion: 'How is sovereign and development capital aligned to crowd-in private investment?',
    actionItems: [
      'Concessional tranche and first-loss guarantee structuring',
      'Multilateral Development Bank (MDB) co-financing terms',
      'Green/Sustainability-linked sovereign bond issuance framework'
    ]
  },
  {
    id: 'delivery',
    label: 'Delivery',
    title: 'Stand the work up and run it',
    body: 'Delivery units, programme management, and the digital and data systems that operate the reform day to day. Capability is transferred deliberately, so delivery does not depend on us remaining.',
    icon: Cpu,
    deliverable: 'Digital Delivery Unit & National Monitoring Platform',
    keyQuestion: 'Is domestic administrative capability built to run the system autonomously?',
    actionItems: [
      'Cabinet-level Delivery Unit dashboard deployment',
      'Domestic civil servant competency upskilling program',
      'Real-time execution telemetry and milestone triggers'
    ]
  },
  {
    id: 'learning',
    label: 'Learning',
    title: 'Measure in time to change something',
    body: 'Monitoring and evaluation designed around the decisions it informs, with agreement in advance about what evidence would tell you to stop. Findings feed back into policy and delivery rather than into a final report.',
    icon: Activity,
    deliverable: 'Adaptive MERLA Feedback Loop & Policy Revision Triggers',
    keyQuestion: 'What pre-agreed signals will trigger policy iteration or corrective pivot?',
    actionItems: [
      'Dynamic threshold monitoring with automated warning alerts',
      'Iterative policy recalibration sprint cycles (90-day)',
      'Institutional sovereign memory & knowledge codification'
    ]
  },
];

interface ApproachPageProps {
  onNavigateHome?: () => void;
  onNavigateContact?: () => void;
}

export const ApproachPage: React.FC<ApproachPageProps> = ({
  onNavigateHome = () => {},
  onNavigateContact = () => {},
}) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [visitedPhases, setVisitedPhases] = useState<Set<number>>(new Set([0]));
  const [lastScrollDirection, setLastScrollDirection] = useState<'down' | 'up' | null>(null);

  // Submit Proposal form state
  const [proposalForm, setProposalForm] = useState({
    name: '',
    email: '',
    organization: '',
    country: '',
    domain: 'Macro-Fiscal & Sovereign Debt',
    movementFocus: 'Movement 01: Diagnostic & Complexity',
    timeline: 'Immediate (1-3 months)',
    budgetScale: '$100k - $500k',
    brief: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const pathwaySectionRef = useRef<HTMLElement>(null);
  const touchStartYRef = useRef<number | null>(null);
  const isThrottledRef = useRef<boolean>(false);

  const currentChapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0];

  // Mark phase as visited
  const markPhaseVisited = useCallback((idx: number) => {
    setVisitedPhases(prev => {
      const next = new Set(prev);
      next.add(idx);
      return next;
    });
  }, []);

  const handleNextChapter = useCallback(() => {
    setActiveChapterIndex(prev => {
      if (prev < CHAPTERS.length - 1) {
        const nextIdx = prev + 1;
        setLastScrollDirection('down');
        markPhaseVisited(nextIdx);
        return nextIdx;
      }
      return prev;
    });
  }, [markPhaseVisited]);

  const handlePrevChapter = useCallback(() => {
    setActiveChapterIndex(prev => {
      if (prev > 0) {
        setLastScrollDirection('up');
        return prev - 1;
      }
      return prev;
    });
  }, []);

  const handleSelectChapter = (idx: number) => {
    if (idx === activeChapterIndex) return;
    setLastScrollDirection(idx > activeChapterIndex ? 'down' : 'up');
    setActiveChapterIndex(idx);
    markPhaseVisited(idx);
  };

  // Mouse Wheel scroll listener strictly scoped to this section element
  useEffect(() => {
    const sectionEl = pathwaySectionRef.current;
    if (!sectionEl) return;

    const handleWheel = (e: WheelEvent) => {
      const delta = e.deltaY;
      if (Math.abs(delta) < 15) return; // ignore micro jitters

      // If user is at Movement 01 (Phase 0) and scrolling UP, allow default smooth page scroll back up
      if (activeChapterIndex === 0 && delta < 0) {
        return;
      }

      // If user is at Movement 06 and scrolling DOWN, allow default page scroll
      if (activeChapterIndex === CHAPTERS.length - 1 && delta > 0) {
        return;
      }

      // Intercept wheel event ONLY within this element to drive the phase carousel smoothly
      e.preventDefault();

      if (isThrottledRef.current) return;

      if (delta > 0) {
        // Scrolling down -> Step forward through phases
        if (activeChapterIndex < CHAPTERS.length - 1) {
          isThrottledRef.current = true;
          handleNextChapter();
          setTimeout(() => {
            isThrottledRef.current = false;
          }, 280);
        }
      } else {
        // Scrolling up -> Step backward through phases
        if (activeChapterIndex > 0) {
          isThrottledRef.current = true;
          handlePrevChapter();
          setTimeout(() => {
            isThrottledRef.current = false;
          }, 280);
        }
      }
    };

    // Attach non-passive wheel event listener ONLY to this specific section container
    sectionEl.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      sectionEl.removeEventListener('wheel', handleWheel);
    };
  }, [activeChapterIndex, handleNextChapter, handlePrevChapter]);

  // Touch Swipe gestures for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartYRef.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartYRef.current - touchEndY;

    if (Math.abs(diff) > 30) {
      if (diff > 0) {
        // Swiped up (scrolling down) -> Next Phase
        if (activeChapterIndex < CHAPTERS.length - 1) {
          handleNextChapter();
        }
      } else {
        // Swiped down (scrolling up) -> Prev Phase
        if (activeChapterIndex > 0) {
          handlePrevChapter();
        } else {
          // At Movement 01, smoothly scroll to top of page
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }
    touchStartYRef.current = null;
  };

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        if (activeChapterIndex < CHAPTERS.length - 1) {
          e.preventDefault();
          handleNextChapter();
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        if (activeChapterIndex > 0) {
          e.preventDefault();
          handlePrevChapter();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeChapterIndex, handleNextChapter, handlePrevChapter]);

  const progressPercent = Math.round(((activeChapterIndex + 1) / CHAPTERS.length) * 100);

  return (
    <div className="w-full min-h-screen bg-[#050a12] text-slate-100 font-sans selection:bg-[#ff7e67] selection:text-[#050a12]">
      {/* Fixed Global Pathway Progress Bar on Viewport Top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-800/50 backdrop-blur-xs pointer-events-none">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#ff7e67] via-[#ff7e67] to-[#2dd4bf] shadow-[0_0_8px_rgba(255,126,103,0.8)]"
          style={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      </div>

      {/* Top Hero Banner */}
      <section className="relative w-full py-16 sm:py-24 px-6 sm:px-12 lg:px-16 border-b border-slate-800 overflow-hidden bg-gradient-to-b from-[#050a12] via-[#081220] to-[#050a12]">
        {/* Blueprint Grid Texture */}
        <div 
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ff7e67 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[2px] w-8 bg-[#ff7e67]" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#ff7e67]">
              The IP3 Approach
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 leading-[1.1] mb-6 max-w-4xl">
            From complexity to measurable change
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed font-normal mb-8">
            Six deliberate movements that describe how an IP3 engagement actually runs. We eliminate fragmented consulting silos by connecting evidence, policy design, capital mobilisation, and digital delivery into a single continuous loop.
          </p>

          {/* Quick Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
            <div className="p-4 rounded-2xl bg-[#081220] border border-slate-800">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#ff7e67] mb-1">01. Integrated</div>
              <div className="text-sm font-semibold text-slate-100 mb-1">Simultaneous Design</div>
              <div className="text-xs text-slate-400">Policy, finance, and delivery are built in parallel.</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#081220] border border-slate-800">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#2dd4bf] mb-1">02. Transferable</div>
              <div className="text-sm font-semibold text-slate-100 mb-1">Institutional Ownership</div>
              <div className="text-xs text-slate-400">Capability is deliberately transferred to local institutions.</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#081220] border border-slate-800">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#ff7e67] mb-1">03. Adaptive</div>
              <div className="text-sm font-semibold text-slate-100 mb-1">Real-time Learning</div>
              <div className="text-xs text-slate-400">Data feedback loops enable decisions before programs fail.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main ImpactStory Narrative Section - Interactive Scroll Driven */}
      <section 
        ref={pathwaySectionRef}
        id="pathway-interactive-section"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative min-h-[calc(100vh-4.5rem)] flex flex-col justify-center py-4 sm:py-6 lg:py-6 px-4 sm:px-6 lg:px-8 border-b border-slate-800 overflow-hidden bg-[#050a12]"
      >
        <div className="max-w-7xl mx-auto w-full flex flex-col justify-center">
          
          {/* Main Grid: Left Sidebar Navigation & Right Presenter */}
          <div 
            id="pathway-grid"
            className="grid grid-cols-1 md:grid-cols-[16.5rem_1fr] lg:grid-cols-[18rem_1fr] gap-3 md:gap-5 items-stretch"
          >
            
            {/* Left Sidebar Navigation with Step Selector */}
            <div className="flex flex-col justify-between space-y-2.5 z-20">
              <div className="p-3.5 sm:p-4 rounded-3xl bg-[#081220] border border-slate-800 shadow-lg shadow-black/30 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#ff7e67] mb-1 flex items-center justify-between">
                    <span>The Pathway</span>
                    <span className="font-mono text-[9px] text-[#ff7e67] bg-[#ff7e67]/10 px-1.5 py-0.2 rounded border border-[#ff7e67]/20">
                      0{activeChapterIndex + 1} / 06
                    </span>
                  </div>
                  <h2 className="text-sm sm:text-base font-extrabold text-slate-100 leading-tight mb-1">
                    Six Movements of Reform
                  </h2>

                  {/* Dynamic Progress Indicator */}
                  <div className="p-2 rounded-2xl bg-[#050a12] border border-slate-800 shadow-inner mb-2.5">
                    <div className="flex items-center justify-between text-[9.5px] font-semibold text-slate-100 mb-1">
                      <span className="text-slate-400">Pathway Progress</span>
                      <span className="text-[#ff7e67] font-mono font-bold">
                        {progressPercent}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#081220] overflow-hidden relative border border-slate-800">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-[#ff7e67] via-[#ff7e67] to-[#2dd4bf] rounded-full shadow-[0_0_8px_rgba(255,126,103,0.6)]"
                        style={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                      />
                    </div>
                  </div>

                  {/* Navigation Jump List with Step Nodes */}
                  <ol className="flex flex-col space-y-1 border-t border-slate-800 pt-2 relative">
                    {CHAPTERS.map((chapter, index) => {
                      const isActive = activeChapterIndex === index;
                      const isPassed = activeChapterIndex > index;

                      return (
                        <li key={chapter.id} className="relative">
                          <button
                            type="button"
                            onClick={() => handleSelectChapter(index)}
                            className={`w-full group flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer relative overflow-hidden text-left ${
                              isActive
                                ? 'bg-[#ff7e67]/15 text-[#ff7e67] border border-[#ff7e67]/50 font-bold shadow-sm shadow-[#ff7e67]/10'
                                : isPassed
                                ? 'text-slate-100 hover:bg-slate-800/40'
                                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
                            }`}
                          >
                            {/* Active Indicator Left Accent Bar */}
                            {isActive && (
                              <motion.span
                                layoutId="activeSidebarIndicator"
                                className="absolute left-0 top-0 bottom-0 w-1 bg-[#ff7e67] rounded-r"
                              />
                            )}

                            <div className="flex items-center gap-2">
                              <span 
                                className={`w-4 h-4 rounded-full flex items-center justify-center font-mono text-[9px] shrink-0 transition-colors ${
                                  isActive 
                                    ? 'bg-[#ff7e67] text-[#050a12] font-bold shadow-sm shadow-[#ff7e67]/40' 
                                    : isPassed || visitedPhases.has(index)
                                    ? 'bg-[#ff7e67]/20 text-[#ff7e67] border border-[#ff7e67]/40 font-semibold'
                                    : 'bg-slate-800 text-slate-400'
                                }`}
                              >
                                {index + 1}
                              </span>
                              <span className="truncate text-[11px]">{chapter.label}</span>
                            </div>

                            {/* Status Badge */}
                            {isActive ? (
                              <span className="text-[8px] uppercase tracking-wider font-mono text-[#ff7e67] bg-[#ff7e67]/15 px-1 py-0.2 rounded border border-[#ff7e67]/30">
                                Active
                              </span>
                            ) : isPassed || visitedPhases.has(index) ? (
                              <CheckCircle2 className="w-3 h-3 text-[#ff7e67]/70" />
                            ) : null}
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            </div>

            {/* One-by-One Phase View with Animated Presenter */}
            <div className="relative w-full flex flex-col justify-between">
              
              {/* Stepper Tabs Bar on Top of Presenter */}
              <div className="flex items-center justify-between gap-1 p-1 rounded-2xl bg-[#081220] border border-slate-800 mb-2 overflow-x-auto">
                {CHAPTERS.map((ch, idx) => {
                  const isCurrent = activeChapterIndex === idx;
                  const isDone = activeChapterIndex > idx || visitedPhases.has(idx);
                  return (
                    <button
                      key={ch.id}
                      onClick={() => handleSelectChapter(idx)}
                      className={`flex-1 min-w-[50px] py-1 px-1.5 rounded-xl text-center transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
                        isCurrent
                          ? 'bg-[#ff7e67] text-[#050a12] font-bold shadow-sm shadow-[#ff7e67]/30'
                          : isDone
                          ? 'bg-[#050a12] text-[#ff7e67] hover:bg-slate-800'
                          : 'bg-transparent text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
                      }`}
                    >
                      <span className="font-mono text-[9px] font-bold">
                        P0{idx + 1}
                      </span>
                      <span className="text-[10px] truncate max-w-[70px] hidden sm:inline">
                        {ch.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Main Presentation Stage */}
              <ol className="list-none p-0 m-0 flex-1 flex flex-col min-h-[460px] sm:min-h-[440px]">
                <AnimatePresence mode="wait">
                  <motion.li
                    key={currentChapter.id}
                    id={`story-${currentChapter.id}`}
                    className="p-4 sm:p-6 lg:p-6 rounded-3xl border border-slate-800 bg-[#081220] shadow-xl shadow-black/50 relative overflow-hidden flex-1 flex flex-col justify-between"
                    initial={{ opacity: 0, y: lastScrollDirection === 'up' ? -8 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: lastScrollDirection === 'up' ? 8 : -8 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Background Radial Glow */}
                    <div 
                      className="absolute -right-20 -top-20 w-56 h-56 rounded-full bg-[#ff7e67]/10 blur-3xl pointer-events-none" 
                    />

                    <div>
                      {/* Phase Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 relative z-10">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#ff7e67] text-[#050a12] flex items-center justify-center font-bold shadow-md shadow-[#ff7e67]/30 shrink-0">
                            {React.createElement(currentChapter.icon, { className: 'w-4 h-4' })}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-[9.5px] tracking-widest font-bold text-[#ff7e67]">
                                MOVEMENT 0{activeChapterIndex + 1} OF 06
                              </span>
                              <span className="text-[9.5px] font-mono font-bold uppercase tracking-[0.15em] text-slate-400">
                                • {currentChapter.label}
                              </span>
                            </div>
                            <div className="text-[9.5px] text-slate-400 font-mono">
                              IP3 Sovereign Reform Architecture
                            </div>
                          </div>
                        </div>

                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase bg-[#ff7e67]/20 text-[#ff7e67] border border-[#ff7e67]/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff7e67] animate-ping" />
                          <span>Interactive Focus</span>
                        </div>
                      </div>

                      {/* Main Title */}
                      <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-slate-100 leading-tight mb-1.5 relative z-10">
                        {currentChapter.title}
                      </h3>

                      {/* Body Narrative */}
                      <p className="text-xs sm:text-[13px] leading-relaxed text-slate-400 mb-3 relative z-10 font-normal">
                        {currentChapter.body}
                      </p>

                      {/* Key Question & Primary Deliverable */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 border-t border-slate-800 relative z-10 mb-2.5">
                        <div className="p-2 sm:p-2.5 rounded-2xl bg-[#050a12] border border-slate-800">
                          <div className="text-[8.5px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-0.5 flex items-center gap-1">
                            <Search className="w-3 h-3 text-[#ff7e67]" />
                            <span>Core Diagnostic Question</span>
                          </div>
                          <div className="text-[11px] sm:text-xs font-medium text-slate-200 italic leading-snug">
                            "{currentChapter.keyQuestion}"
                          </div>
                        </div>

                        <div className="p-2 sm:p-2.5 rounded-2xl bg-[#050a12] border border-[#ff7e67]/40">
                          <div className="text-[8.5px] font-mono font-bold uppercase tracking-wider text-[#ff7e67] mb-0.5 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-[#ff7e67]" />
                            <span>Primary Deliverable</span>
                          </div>
                          <div className="text-[11px] sm:text-xs font-semibold text-slate-100 leading-snug">
                            {currentChapter.deliverable}
                          </div>
                        </div>
                      </div>

                      {/* Core Operational Protocols in this Phase */}
                      <div className="p-2 sm:p-2.5 rounded-2xl bg-[#050a12] border border-slate-800 relative z-10 mb-3">
                        <div className="text-[8.5px] font-mono font-bold uppercase tracking-wider text-[#ff7e67] mb-1">
                          Key Workstreams Executed in Movement 0{activeChapterIndex + 1}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                          {currentChapter.actionItems.map((item, i) => (
                            <div key={i} className="flex items-start gap-1 text-xs text-slate-200">
                              <Check className="w-3 h-3 text-[#ff7e67] shrink-0 mt-0.5" />
                              <span className="text-[10px] leading-tight text-slate-400">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Step Controller Footer */}
                    <div className="pt-2.5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 relative z-10">
                      <button
                        type="button"
                        onClick={handlePrevChapter}
                        disabled={activeChapterIndex === 0}
                        className={`px-3 py-1 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                          activeChapterIndex === 0
                            ? 'bg-[#050a12]/40 border-slate-800/40 text-slate-600 cursor-not-allowed'
                            : 'bg-[#050a12] border-slate-700 text-slate-200 hover:bg-slate-800'
                        }`}
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>Previous</span>
                      </button>

                      {/* Phase Navigation Dots with Scroll Hint */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-mono text-slate-400 hidden sm:inline">
                          Step {activeChapterIndex + 1}/6
                        </span>
                        <div className="flex items-center gap-1">
                          {CHAPTERS.map((_, dotIdx) => (
                            <button
                              key={dotIdx}
                              onClick={() => handleSelectChapter(dotIdx)}
                              aria-label={`Jump to Movement ${dotIdx + 1}`}
                              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                                activeChapterIndex === dotIdx
                                  ? 'w-5 bg-[#ff7e67] shadow-sm shadow-[#ff7e67]/50'
                                  : activeChapterIndex > dotIdx || visitedPhases.has(dotIdx)
                                  ? 'w-2 bg-[#ff7e67]/50'
                                  : 'w-1.5 bg-slate-700'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {activeChapterIndex < CHAPTERS.length - 1 ? (
                        <button
                          type="button"
                          onClick={handleNextChapter}
                          className="px-4 py-1.5 rounded-full bg-[#ff7e67] hover:bg-[#ff8f7b] text-[#050a12] font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#ff7e67]/20 cursor-pointer"
                        >
                          <span>Next: Movement 0{activeChapterIndex + 2}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveChapterIndex(0);
                            setLastScrollDirection('up');
                          }}
                          className="px-4 py-1.5 rounded-full bg-[#ff7e67] hover:bg-[#ff8f7b] text-[#050a12] font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#ff7e67]/20 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Restart Pathway</span>
                        </button>
                      )}
                    </div>
                  </motion.li>
                </AnimatePresence>
              </ol>
            </div>

          </div>
        </div>
      </section>

      {/* Submit a Proposal Section */}
      <section id="submit-proposal" className="relative w-full py-16 sm:py-20 px-4 sm:px-8 lg:px-12 bg-[#050a12] border-b border-slate-800 overflow-hidden">
        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ff7e67 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Context & Guidelines */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="h-0.5 w-6 bg-[#ff7e67]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#ff7e67]">
                    Engagement & Intake
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight mb-3">
                  Submit a Proposal
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Engage IP3 to diagnose institutional bottlenecks, co-architect policy instruments, structure blended capital, or deploy sovereign delivery platforms.
                </p>
              </div>

              {/* Engagement Pillars */}
              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-[#081220] border border-slate-800 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#ff7e67]/15 border border-[#ff7e67]/30 flex items-center justify-center shrink-0 text-[#ff7e67]">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider mb-0.5">Sovereign & Multilateral Mandates</h4>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      We support ministries of finance, central banks, state delivery units, and multilateral development banks.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#081220] border border-slate-800 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#ff7e67]/15 border border-[#ff7e67]/30 flex items-center justify-center shrink-0 text-[#ff7e67]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider mb-0.5">Rapid Diagnostic Review</h4>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Our partners triage institutional proposals within 5 business days and schedule a preliminary strategic briefing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Confidentiality Notice */}
              <div className="p-3 rounded-2xl bg-[#081220] border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2 font-mono">
                <HelpCircle className="w-4 h-4 text-[#ff7e67] shrink-0" />
                <span>All submitted briefs and data are protected under sovereign confidentiality protocols.</span>
              </div>
            </div>

            {/* Right Column: Interactive Proposal Submission Form */}
            <div className="lg:col-span-7">
              <div className="p-5 sm:p-7 rounded-3xl bg-[#081220] border border-slate-800 shadow-2xl shadow-black/40 relative">
                
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center space-y-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#ff7e67]/20 border border-[#ff7e67] text-[#ff7e67] flex items-center justify-center mx-auto shadow-lg shadow-[#ff7e67]/30">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-xl font-extrabold text-slate-100">Proposal Transmitted Successfully</h3>
                      <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                        Thank you, <span className="text-slate-100 font-bold">{proposalForm.name}</span>. Your brief regarding <span className="text-[#ff7e67]">{proposalForm.organization || 'your organization'}</span> has been logged in our partner triage queue.
                      </p>
                    </div>
                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmitted(false);
                          setProposalForm({
                            name: '',
                            email: '',
                            organization: '',
                            country: '',
                            domain: 'Macro-Fiscal & Sovereign Debt',
                            movementFocus: 'Movement 01: Diagnostic & Complexity',
                            timeline: 'Immediate (1-3 months)',
                            budgetScale: '$100k - $500k',
                            brief: ''
                          });
                        }}
                        className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-mono font-bold text-slate-100 transition-all cursor-pointer inline-flex items-center gap-2"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Submit Another Brief</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleProposalSubmit} className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-1">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#ff7e67]">
                        Institutional Intake Specification
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        Required Fields (*)
                      </span>
                    </div>

                    {/* Row 1: Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-slate-200 flex items-center gap-1.5">
                          <User className="w-3 h-3 text-[#ff7e67]" />
                          <span>Contact Name *</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={proposalForm.name}
                          onChange={(e) => setProposalForm({ ...proposalForm, name: e.target.value })}
                          placeholder="e.g. Dr. Amina Al-Mansoor"
                          className="w-full px-3.5 py-2 rounded-xl bg-[#050a12] border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-[#ff7e67] transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-slate-200 flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-[#ff7e67]" />
                          <span>Official Email *</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={proposalForm.email}
                          onChange={(e) => setProposalForm({ ...proposalForm, email: e.target.value })}
                          placeholder="name@ministry.gov.xx"
                          className="w-full px-3.5 py-2 rounded-xl bg-[#050a12] border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-[#ff7e67] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Row 2: Organization & Country */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-slate-200 flex items-center gap-1.5">
                          <Building className="w-3 h-3 text-[#ff7e67]" />
                          <span>Institution / Organization *</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={proposalForm.organization}
                          onChange={(e) => setProposalForm({ ...proposalForm, organization: e.target.value })}
                          placeholder="e.g. Ministry of Finance / Central Bank"
                          className="w-full px-3.5 py-2 rounded-xl bg-[#050a12] border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-[#ff7e67] transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-slate-200">
                          Jurisdiction / Country *
                        </label>
                        <input
                          type="text"
                          required
                          value={proposalForm.country}
                          onChange={(e) => setProposalForm({ ...proposalForm, country: e.target.value })}
                          placeholder="e.g. Ghana, Indonesia, Kenya"
                          className="w-full px-3.5 py-2 rounded-xl bg-[#050a12] border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-[#ff7e67] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Row 3: Domain & Primary Pathway Movement */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-slate-200">
                          Primary Sector / Domain
                        </label>
                        <select
                          value={proposalForm.domain}
                          onChange={(e) => setProposalForm({ ...proposalForm, domain: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-[#050a12] border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-[#ff7e67] transition-colors cursor-pointer"
                        >
                          <option value="Macro-Fiscal & Sovereign Debt">Macro-Fiscal & Sovereign Debt</option>
                          <option value="Climate Resilience & Green Finance">Climate Resilience & Green Finance</option>
                          <option value="Digital Public Infrastructure (DPI)">Digital Public Infrastructure (DPI)</option>
                          <option value="Cabinet Delivery & Performance Units">Cabinet Delivery & Performance Units</option>
                          <option value="Public Revenue Mobilization">Public Revenue Mobilization</option>
                          <option value="State-Owned Enterprise Restructuring">State-Owned Enterprise Restructuring</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-slate-200">
                          Requested Movement Focus
                        </label>
                        <select
                          value={proposalForm.movementFocus}
                          onChange={(e) => setProposalForm({ ...proposalForm, movementFocus: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-[#050a12] border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-[#ff7e67] transition-colors cursor-pointer"
                        >
                          <option value="Movement 01: Diagnostic & Complexity">Movement 01: Diagnostic & Complexity</option>
                          <option value="Movement 02: Evidence & Empirical Audit">Movement 02: Evidence & Empirical Audit</option>
                          <option value="Movement 03: Policy Architecture & Legal Charters">Movement 03: Policy Architecture & Legal Charters</option>
                          <option value="Movement 04: Capital Mobilisation & Blended Finance">Movement 04: Capital Mobilisation & Blended Finance</option>
                          <option value="Movement 05: Delivery Unit & Digital Execution">Movement 05: Delivery Unit & Digital Execution</option>
                          <option value="Movement 06: Adaptive Learning & MERLA Loop">Movement 06: Adaptive Learning & MERLA Loop</option>
                          <option value="Full End-to-End Sovereign Engagement">Full End-to-End Sovereign Engagement</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 4: Brief Description */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-200">
                        Mandate Summary / Project Brief *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={proposalForm.brief}
                        onChange={(e) => setProposalForm({ ...proposalForm, brief: e.target.value })}
                        placeholder="Describe the institutional bottleneck, policy objective, key stakeholders, and desired deliverable..."
                        className="w-full px-3.5 py-2 rounded-xl bg-[#050a12] border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-[#ff7e67] transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2 flex items-center justify-between gap-3">
                      <span className="text-[10px] text-slate-400 font-mono">
                        Direct transmission to IP3 Managing Partners
                      </span>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 rounded-full bg-[#ff7e67] hover:bg-[#ff8f7b] text-[#050a12] font-bold text-xs font-mono flex items-center gap-2 transition-all shadow-lg shadow-[#ff7e67]/20 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-[#050a12] border-t-transparent rounded-full animate-spin" />
                            <span>Transmitting...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Submit Proposal Brief</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ApproachPage;
