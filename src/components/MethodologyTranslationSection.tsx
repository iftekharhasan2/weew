import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Maximize2,
  Layers,
  BookOpen,
  Play,
  Pause,
  RotateCcw,
  Copy,
  Check,
  Eye,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  X,
  Activity,
  FileText,
  Compass,
} from 'lucide-react';
import { MethodologyStep } from '../types';
import { methodologySteps as defaultSteps } from '../data/methodologyData';

// ==========================================
// 1. FRAMEWORK MATRIX COMPONENT
// ==========================================

interface FrameworkMatrixProps {
  steps: MethodologyStep[];
  onSelectStep: (step: MethodologyStep) => void;
}

export const FrameworkMatrix: React.FC<FrameworkMatrixProps> = ({ steps, onSelectStep }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="border border-slate-800 rounded-3xl bg-[#070c17] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-0.5 w-5 bg-[#ff7e67]" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#ff7e67]">
                Implementation Architecture Matrix
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              End-to-End Sovereign Delivery Continuum
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Translating diagnostics and intelligence into institutionalized national scale.
            </p>
          </div>
          <span className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[#ff7e67] font-semibold self-start sm:self-auto shadow-inner">
            IP3 Delivery Engine
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((s, idx) => {
            return (
              <div
                key={s.id}
                onClick={() => onSelectStep(s)}
                className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/40 hover:bg-slate-800/60 p-5 sm:p-6 transition-all duration-200 hover:border-[#ff7e67]/50 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="w-9 h-9 rounded-full border flex items-center justify-center font-mono font-bold text-xs border-[#ff7e67]/40 text-[#ff7e67] bg-[#ff7e67]/10"
                    >
                      {s.code}
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      Step 0{idx + 1}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-[#ff7e67] transition-colors">
                    {s.name}
                  </h4>
                  <p className="text-xs text-[#ff7e67] mt-0.5 font-medium">{s.subtitle}</p>

                  <p className="text-xs text-slate-400 mt-3 line-clamp-3 leading-relaxed font-light">
                    {s.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">
                    {s.deliverables.length} Key Deliverables
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400 group-hover:text-white transition-colors">
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#ff7e67]" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. INTERACTIVE EXPLORER COMPONENT
// ==========================================

interface InteractiveExplorerProps {
  steps: MethodologyStep[];
  selectedStep: MethodologyStep | null;
  onSelectStep: (step: MethodologyStep) => void;
  isPlayingTour: boolean;
  onToggleTour: () => void;
  onResetTour: () => void;
  activePhaseFilter: 'all' | 'discovery' | 'architecture' | 'execution';
  onChangePhaseFilter: (filter: 'all' | 'discovery' | 'architecture' | 'execution') => void;
}

export const InteractiveExplorer: React.FC<InteractiveExplorerProps> = ({
  steps,
  selectedStep,
  onSelectStep,
  isPlayingTour,
  onToggleTour,
  activePhaseFilter,
  onChangePhaseFilter,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyMarkdown = () => {
    const md = `# IP3 Methodology: Translation, not theory.

> "We convert evidence, policy intelligence, and institutional diagnostics into implementation architecture — the operating models, digital platforms, delivery roadmaps, financing logic, monitoring systems, and capacity pathways that make reform executable."

## The 6 Execution Pillars:
${steps
  .map(
    (s, idx) => `### ${idx + 1}. [${s.code}] ${s.name} (${s.subtitle})
- **Focus**: ${s.tagline}
- **Description**: ${s.description}
- **Deliverables**: ${s.deliverables.join(', ')}
- **Key Methods**: ${s.keyActivities.join('; ')}
`
  )
  .join('\n')}
`;
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-12">
      {/* Action and Control Bar */}
      <div className="bg-[#090f1d] border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Phase Filter Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-mono uppercase text-slate-400 mr-2 flex items-center gap-1.5 shrink-0">
            <Layers className="w-3.5 h-3.5 text-[#ff7e67]" /> Filter:
          </span>
          <button
            id="filter-all"
            onClick={() => onChangePhaseFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activePhaseFilter === 'all'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            All 6 Stages
          </button>
          <button
            id="filter-discovery"
            onClick={() => onChangePhaseFilter('discovery')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activePhaseFilter === 'discovery'
                ? 'bg-cyan-950/80 border border-cyan-500/40 text-cyan-300'
                : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-800/50'
            }`}
          >
            Discovery (R, PI)
          </button>
          <button
            id="filter-architecture"
            onClick={() => onChangePhaseFilter('architecture')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activePhaseFilter === 'architecture'
                ? 'bg-amber-950/80 border border-amber-500/40 text-amber-300'
                : 'text-slate-400 hover:text-amber-300 hover:bg-slate-800/50'
            }`}
          >
            Architecture (SD, DA)
          </button>
          <button
            id="filter-execution"
            onClick={() => onChangePhaseFilter('execution')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activePhaseFilter === 'execution'
                ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300'
                : 'text-slate-400 hover:text-emerald-300 hover:bg-slate-800/50'
            }`}
          >
            Execution (IM, LS)
          </button>
        </div>

        {/* Guided Tour and Export Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            id="toggle-tour-btn"
            onClick={onToggleTour}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isPlayingTour
                ? 'bg-[#ff7e67]/20 text-[#ff7e67] border border-[#ff7e67]/40 animate-pulse'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60'
            }`}
          >
            {isPlayingTour ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlayingTour ? 'Pause Walkthrough' : 'Auto Walkthrough'}</span>
          </button>

          <button
            id="copy-framework-btn"
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 text-xs font-semibold transition-all cursor-pointer"
            title="Copy Framework Markdown to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Markdown' : 'Copy Spec'}</span>
          </button>
        </div>
      </div>

      {/* Active Stage Quick View Card if a stage is selected */}
      {selectedStep && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#090f1d] to-[#0d172a] border border-slate-800 shadow-xl"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-full border flex items-center justify-center font-mono font-bold text-lg shrink-0 ${
                  selectedStep.colorTheme === 'cyan'
                    ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300'
                    : selectedStep.colorTheme === 'amber'
                    ? 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                    : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                }`}
              >
                {selectedStep.code}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-lg font-bold text-white">{selectedStep.name}</h4>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-[#ff7e67] font-mono border border-slate-700">
                    {selectedStep.subtitle}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 font-light leading-relaxed">
                  {selectedStep.tagline}
                </p>
              </div>
            </div>

            <button
              id="view-full-step-btn"
              onClick={() => onSelectStep(selectedStep)}
              className="self-end md:self-center px-4 py-2 bg-[#ff7e67] hover:bg-[#e06a54] text-white rounded-xl text-xs font-bold shadow-md shadow-[#ff7e67]/20 flex items-center gap-2 transition-all cursor-pointer shrink-0"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect Full Specifications</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// ==========================================
// 3. RECREATION SECTION (TRANSLATION, NOT THEORY)
// ==========================================

export interface RecreationSectionProps {
  steps: MethodologyStep[];
  onSelectStep?: (step: MethodologyStep) => void;
}

export const RecreationSection: React.FC<RecreationSectionProps> = ({ steps, onSelectStep }) => {
  const [activeFlowIndex, setActiveFlowIndex] = useState<number>(0);

  // Smooth continuous flow loop through all stages
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFlowIndex((prev) => (prev + 1) % steps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [steps.length]);

  const getNodeColorStyles = (step: MethodologyStep) => {
    return {
      textColor: '#ff7e67',
      accentHex: '#ff7e67',
      glowShadow: '0 0 24px rgba(255, 126, 103, 0.45)',
    };
  };

  return (
    <div
      id="translation-section"
      className="relative w-full text-slate-100 pt-12 sm:pt-16 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden select-none bg-[#050a12]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Editorial Headline */}
        <div className="space-y-4 md:space-y-6">
          <div>
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#ff7e67] uppercase">
              IMPLEMENTATION FRAMEWORK
            </span>
          </div>
          <h2
            id="editorial-title-header"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight font-serif text-slate-100"
          >
            Translation,{' '}
            <span className="italic text-[#ff7e67] font-serif font-normal">
              not theory.
            </span>
          </h2>

          {/* Body description */}
          <p
            id="main-editorial-paragraph"
            className="text-sm sm:text-base md:text-lg leading-relaxed text-slate-300 font-normal max-w-4xl tracking-normal font-sans"
          >
            IP3 turns analysis into action. We convert evidence, policy intelligence, and institutional
            diagnostics into implementation architecture — the operating models, digital platforms,
            delivery roadmaps, financing logic, monitoring systems, and capacity pathways that make
            reform executable.
          </p>
        </div>

        {/* Process Flow Diagram */}
        <div className="mt-14 sm:mt-18 md:mt-24 w-full relative">
          <div
            className="w-full overflow-x-auto pb-6 pt-[23px] h-[150px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden no-scrollbar relative z-10"
            style={{ height: '150px', paddingTop: '23px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="min-w-[780px] lg:min-w-0 w-full flex items-start justify-between relative px-2">
              {steps.map((step, idx) => {
                const isLast = idx === steps.length - 1;
                const styles = getNodeColorStyles(step);
                const isNodeActive = activeFlowIndex === idx;
                const isConnectorActive = activeFlowIndex === idx;

                const nextStep = !isLast ? steps[idx + 1] : null;
                const nextStyles = nextStep ? getNodeColorStyles(nextStep) : null;
                const pattern = idx % 2 === 0 ? 'two-dash' : 'three-dash';

                return (
                  <React.Fragment key={step.id}>
                    <div className="flex items-center flex-1 relative">
                      {/* Animated Node Circle */}
                      <NodeItem
                        step={step}
                        styles={styles}
                        isActive={isNodeActive}
                        onClick={() => onSelectStep?.(step)}
                      />

                      {/* Animated connector dashes representing the flow */}
                      {!isLast && (
                        <ConnectorSegment
                          fromColor={styles.accentHex}
                          toColor={nextStyles?.accentHex || styles.accentHex}
                          defaultConnectorColor="#1e293b"
                          isActive={isConnectorActive}
                          pattern={pattern}
                        />
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface NodeItemProps {
  step: MethodologyStep;
  styles: {
    textColor: string;
    accentHex: string;
    glowShadow: string;
  };
  isActive: boolean;
  onClick?: () => void;
}

const NodeItem: React.FC<NodeItemProps> = ({ step, styles, isActive, onClick }) => {
  return (
    <div
      id={`node-${step.id}`}
      onClick={onClick}
      className="flex flex-col items-center relative z-10 cursor-pointer group"
    >
      {/* Outer wrapper with pulse ring animation */}
      <div className="relative flex items-center justify-center">
        {/* Gentle radial beacon ripple when node is active in the flow */}
        {isActive && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1.45, opacity: 0 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            className="absolute inset-0 rounded-full border pointer-events-none"
            style={{ borderColor: styles.accentHex }}
          />
        )}

        {/* Animated Circular Badge */}
        <motion.div
          animate={
            isActive
              ? {
                  scale: 1.08,
                  borderColor: styles.accentHex,
                  boxShadow: styles.glowShadow,
                }
              : {
                  scale: 1,
                  borderColor: '#1e293b',
                  boxShadow: '0 0 0px transparent',
                }
          }
          transition={{ duration: 0.4 }}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-slate-800 bg-[#09131f] flex items-center justify-center relative transition-colors group-hover:border-[#ff7e67]/80"
        >
          {/* Subtle inner ambient glow */}
          {isActive && (
            <div
              className="absolute inset-0 rounded-full opacity-20 blur-[3px]"
              style={{ backgroundColor: styles.accentHex }}
            />
          )}

          {/* Acronym Text */}
          <span
            className="font-mono text-sm sm:text-base tracking-wider z-10 transition-all font-bold"
            style={{
              color: styles.textColor,
              textShadow: isActive ? `0 0 10px ${styles.accentHex}` : 'none',
            }}
          >
            {step.code}
          </span>
        </motion.div>
      </div>

      {/* Label under the circle */}
      <div className="mt-4 text-center max-w-[110px] sm:max-w-[130px] min-h-[36px] flex items-start justify-center">
        <span
          className={`text-xs sm:text-[13px] font-bold tracking-tight leading-snug transition-colors ${
            isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
          }`}
        >
          {step.name}
        </span>
      </div>
    </div>
  );
};

interface ConnectorSegmentProps {
  fromColor: string;
  toColor: string;
  defaultConnectorColor: string;
  isActive: boolean;
  pattern: 'two-dash' | 'three-dash';
}

const ConnectorSegment: React.FC<ConnectorSegmentProps> = ({
  fromColor,
  toColor,
  defaultConnectorColor,
  isActive,
  pattern,
}) => {
  return (
    <div className="flex-1 flex items-center justify-center px-1 sm:px-2.5 mb-9 min-w-[32px] sm:min-w-[50px] relative">
      {pattern === 'two-dash' ? (
        <div className="w-full flex items-center justify-between gap-1.5 sm:gap-2">
          <DashTick
            defaultColor={defaultConnectorColor}
            activeColor={fromColor}
            isActive={isActive}
            delay={0}
            widthClass="w-3 sm:w-4.5"
          />
          <DashTick
            defaultColor={defaultConnectorColor}
            activeColor={toColor}
            isActive={isActive}
            delay={0.3}
            widthClass="w-3 sm:w-4.5"
          />
        </div>
      ) : (
        <div className="w-full flex items-center justify-between gap-1 sm:gap-1.5">
          <DashTick
            defaultColor={defaultConnectorColor}
            activeColor={fromColor}
            isActive={isActive}
            delay={0}
            widthClass="w-2.5 sm:w-3.5"
          />
          <DashTick
            defaultColor={defaultConnectorColor}
            activeColor={fromColor}
            isActive={isActive}
            delay={0.2}
            widthClass="w-2.5 sm:w-3.5"
          />
          <DashTick
            defaultColor={defaultConnectorColor}
            activeColor={toColor}
            isActive={isActive}
            delay={0.4}
            widthClass="w-2.5 sm:w-3.5"
          />
        </div>
      )}
    </div>
  );
};

interface DashTickProps {
  defaultColor: string;
  activeColor: string;
  isActive: boolean;
  delay: number;
  widthClass: string;
}

const DashTick: React.FC<DashTickProps> = ({
  defaultColor,
  activeColor,
  isActive,
  delay,
  widthClass,
}) => {
  return (
    <motion.span
      animate={
        isActive
          ? {
              backgroundColor: activeColor,
              boxShadow: `0 0 8px ${activeColor}`,
              opacity: [0.5, 1, 0.5],
            }
          : {
              backgroundColor: defaultColor,
              boxShadow: '0 0 0px transparent',
              opacity: 0.65,
            }
      }
      transition={
        isActive
          ? {
              duration: 0.7,
              repeat: Infinity,
              delay: delay,
            }
          : { duration: 0.25 }
      }
      className={`h-[2px] ${widthClass} rounded-full transition-colors`}
      style={{
        backgroundColor: isActive ? activeColor : defaultColor,
      }}
    />
  );
};

// ==========================================
// 4. STEP DETAIL MODAL COMPONENT
// ==========================================

interface StepDetailModalProps {
  step: MethodologyStep | null;
  allSteps: MethodologyStep[];
  onClose: () => void;
  onSelectStep: (step: MethodologyStep) => void;
}

export const StepDetailModal: React.FC<StepDetailModalProps> = ({
  step,
  allSteps,
  onClose,
  onSelectStep,
}) => {
  if (!step) return null;

  const currentIndex = allSteps.findIndex((s) => s.id === step.id);
  const prevStep = currentIndex > 0 ? allSteps[currentIndex - 1] : null;
  const nextStep = currentIndex < allSteps.length - 1 ? allSteps[currentIndex + 1] : null;

  const getThemeColors = () => {
    return {
      bgBadge: 'bg-[#ff7e67]/20 border-[#ff7e67]/50 text-[#ff7e67]',
      glow: 'from-[#ff7e67]/20 via-transparent to-transparent',
      accent: 'text-[#ff7e67]',
      bullet: 'bg-[#ff7e67]',
      border: 'border-[#ff7e67]/30',
    };
  };

  const colors = getThemeColors();

  return (
    <AnimatePresence>
      <div
        id="modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          id="modal-content-container"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-[#080d19] border border-slate-800/80 rounded-3xl shadow-2xl overflow-hidden my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-48 bg-gradient-to-b ${colors.glow} pointer-events-none opacity-40 blur-2xl`}
          />

          {/* Modal Header */}
          <div className="relative px-6 pt-6 pb-4 sm:px-8 sm:pt-8 border-b border-slate-800/80 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-bold text-xl border ${colors.bgBadge} shadow-lg`}
              >
                {step.code}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-widest font-mono text-slate-400">
                    Phase {currentIndex + 1} of {allSteps.length} &bull; {step.phaseGroup.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
                  {step.name}
                </h3>
              </div>
            </div>

            <button
              id="close-modal-btn"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors focus:outline-none cursor-pointer border border-slate-700"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="px-6 py-6 sm:px-8 sm:py-7 space-y-6 max-h-[68vh] overflow-y-auto">
            {/* Tagline */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <p className="text-base text-slate-200 font-medium leading-relaxed italic font-serif">
                &ldquo;{step.tagline}&rdquo;
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed font-sans">
                {step.description}
              </p>
            </div>

            {/* Grid for Activities & Deliverables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Key Activities */}
              <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-slate-900/40 border border-slate-800/60">
                <div className="flex items-center gap-2 text-slate-200 font-bold text-xs uppercase tracking-wider font-mono">
                  <Activity className={`w-4 h-4 ${colors.accent}`} />
                  <span>Key Activities & Methods</span>
                </div>
                <ul className="space-y-2.5">
                  {step.keyActivities.map((act, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${colors.bullet}`} />
                      <span className="leading-snug">{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverables */}
              <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-slate-900/40 border border-slate-800/60">
                <div className="flex items-center gap-2 text-slate-200 font-bold text-xs uppercase tracking-wider font-mono">
                  <FileText className={`w-4 h-4 ${colors.accent}`} />
                  <span>Tangible Deliverables</span>
                </div>
                <ul className="space-y-2.5">
                  {step.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${colors.accent}`} />
                      <span className="leading-snug font-medium text-slate-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
                <Sparkles className={`w-4 h-4 ${colors.accent}`} />
                <span>Performance Benchmark</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-300">
                {step.metrics.map((m, i) => (
                  <span key={i} className="bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer / Navigation */}
          <div className="px-6 py-4 sm:px-8 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between">
            <button
              id="prev-step-btn"
              disabled={!prevStep}
              onClick={() => prevStep && onSelectStep(prevStep)}
              className={`flex items-center gap-2 text-xs sm:text-sm font-semibold px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                prevStep
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  : 'text-slate-600 cursor-not-allowed'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{prevStep ? `Previous: ${prevStep.code}` : 'Start'}</span>
            </button>

            <button
              id="next-step-btn"
              disabled={!nextStep}
              onClick={() => nextStep && onSelectStep(nextStep)}
              className={`flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer ${
                nextStep
                  ? 'bg-[#ff7e67] hover:bg-[#e06a54] text-white shadow-md shadow-[#ff7e67]/20'
                  : 'text-slate-600 cursor-not-allowed bg-slate-900'
              }`}
            >
              <span>{nextStep ? `Next: ${nextStep.code} (${nextStep.name})` : 'Final Phase'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// ==========================================
// 5. MAIN SECTION CONTAINER
// ==========================================

export const MethodologyTranslationSection: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<MethodologyStep | null>(null);
  const [activePhaseFilter, setActivePhaseFilter] = useState<'all' | 'discovery' | 'architecture' | 'execution'>('all');
  const [isPlayingTour, setIsPlayingTour] = useState(false);
  const [showMatrix, setShowMatrix] = useState(true);

  const steps = defaultSteps;

  const filteredSteps =
    activePhaseFilter === 'all'
      ? steps
      : steps.filter((s) => s.phaseGroup === activePhaseFilter);

  // Auto walkthrough cycle
  useEffect(() => {
    if (!isPlayingTour) return;
    const interval = setInterval(() => {
      setSelectedStep((prev) => {
        if (!prev) return steps[0];
        const idx = steps.findIndex((s) => s.id === prev.id);
        const nextIdx = (idx + 1) % steps.length;
        return steps[nextIdx];
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isPlayingTour, steps]);

  return (
    <section id="translation-architecture-suite" className="relative w-full bg-[#050a12] border-t border-slate-800 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#ff7e67]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Recreation Editorial + Flow Visualizer */}
      <RecreationSection
        steps={steps}
        onSelectStep={(st) => setSelectedStep(st)}
      />

      {/* Step Detail Deep Inspection Modal */}
      <StepDetailModal
        step={selectedStep}
        allSteps={steps}
        onClose={() => setSelectedStep(null)}
        onSelectStep={(st) => setSelectedStep(st)}
      />
    </section>
  );
};

export default MethodologyTranslationSection;
