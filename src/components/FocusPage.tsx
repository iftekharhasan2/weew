import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  Leaf,
  GraduationCap,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Play,
  X,
  BookOpen,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Target,
  BarChart3,
  Globe2,
  FileCheck2,
  TrendingUp,
  Building2,
  Cpu,
  Compass,
  FileText,
  Activity,
  Workflow,
  CheckCircle2,
  Users
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { FOCUS_AREAS, FocusArea } from '../data/policyData';
import ClimateActionPage from './climate/ClimateActionPage';

interface FocusPageProps {
  darkMode?: boolean;
  setDarkMode?: (val: boolean | ((prev: boolean) => boolean)) => void;
  initialSection?: string;
  onOpenTalk?: () => void;
  onOpenCollaborate?: (area?: string) => void;
  onNavigateHome?: () => void;
  onNavigateContact?: () => void;
  onNavigateApproach?: () => void;
  onNavigateAbout?: () => void;
}

// In-Depth Case & Video Presentation Modal
const FocusAreaDetailModal: React.FC<{
  area: FocusArea | null;
  onClose: () => void;
  onOpenContact: () => void;
}> = ({ area, onClose, onOpenContact }) => {
  if (!area) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#081220] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#050a12]/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700 transition-all cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3.5 py-1 rounded-full bg-[#ff7e67]/10 text-[#ff7e67] border border-[#ff7e67]/30 text-xs font-mono font-bold uppercase tracking-wider">
            {area.badge}
          </span>
          <span className="text-xs font-mono text-slate-400">
            Case Dossier: {area.id}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mb-2">
          {area.title}
        </h2>
        <p className="text-sm font-semibold text-[#ff7e67] mb-6">
          {area.subtitle}
        </p>

        {/* Video or Image Showcase */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#050a12] mb-8 relative shadow-inner">
          {area.videoUrl ? (
            <div className="relative aspect-video w-full">
              <video
                src={area.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="relative aspect-video w-full">
              <img
                src={area.imageUrl}
                alt={area.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081220] via-transparent to-transparent" />
            </div>
          )}
        </div>

        {/* Extended Case Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-xs text-slate-300">
          <div className="space-y-4 bg-[#050a12] p-5 rounded-2xl border border-slate-800">
            <h4 className="font-mono font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4 text-[#ff7e67]" />
              Systemic Problem Formulation
            </h4>
            <p className="leading-relaxed text-slate-400">
              {area.extendedProblem}
            </p>
          </div>

          <div className="space-y-4 bg-[#050a12] p-5 rounded-2xl border border-slate-800">
            <h4 className="font-mono font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#ff7e67]" />
              Empirical Methodology & Delivery
            </h4>
            <p className="leading-relaxed text-slate-400">
              {area.extendedMethodology}
            </p>
          </div>
        </div>

        {/* Impact Matrix & Outcomes */}
        <div className="bg-[#050a12] p-6 rounded-2xl border border-slate-800 mb-8 space-y-4">
          <h4 className="font-mono font-bold text-slate-100 uppercase tracking-wider text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#ff7e67]" />
            Measurable Institutional Outcomes
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(area.measurableOutcomes || []).map((outcome, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#081220] border border-slate-800/80">
                <div className="text-lg font-extrabold text-[#ff7e67]">{outcome.value}</div>
                <div className="text-[11px] font-semibold text-slate-200 mt-0.5">{outcome.label}</div>
                <div className="text-[10px] text-slate-400 mt-1 leading-snug">{outcome.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-[#050a12] text-slate-300 border border-slate-700 text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Dossier
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="px-6 py-2.5 rounded-full bg-[#ff7e67] hover:bg-[#ff8f7b] text-[#050a12] font-bold text-xs shadow-lg shadow-[#ff7e67]/25 flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>Commission Policy Advisory for This Domain</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const FocusPage: React.FC<FocusPageProps> = ({
  darkMode = true,
  setDarkMode,
  initialSection,
  onOpenTalk,
  onOpenCollaborate,
  onNavigateHome,
  onNavigateContact,
  onNavigateApproach,
  onNavigateAbout,
}) => {
  const { data } = useCMS();
  const [selectedArea, setSelectedArea] = useState<FocusArea | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'climate' | 'education' | 'governance'>('overview');

  const focusList = (data.focusAreas && data.focusAreas.length > 0)
    ? data.focusAreas
    : FOCUS_AREAS;

  useEffect(() => {
    if (initialSection) {
      if (initialSection.includes('climate') || initialSection.includes('focus-branch-0')) {
        setActiveTab('climate');
      } else if (initialSection.includes('education') || initialSection.includes('focus-branch-1')) {
        setActiveTab('education');
      } else if (initialSection.includes('governance') || initialSection.includes('focus-branch-2')) {
        setActiveTab('governance');
      } else {
        setActiveTab('overview');
      }
    }
  }, [initialSection]);

  const getPillarAccent = (index: number) => {
    return { 
      border: 'hover:border-[#ff7e67]', 
      tagBg: 'bg-[#ff7e67]/10 text-[#ff7e67] border-[#ff7e67]/30', 
      dot: 'bg-[#ff7e67]' 
    };
  };

  return (
    <div className="min-h-screen bg-[#050a12] text-slate-100 font-sans antialiased">
      
      {/* 1. Page Header & Institutional Breadcrumb */}
      <div className="border-b border-slate-800 bg-[#050a12]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <button
              onClick={onNavigateHome}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <button
              onClick={() => {
                setActiveTab('overview');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Focus Areas
            </button>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-[#ff7e67] font-bold">
              {activeTab === 'overview' && 'Strategic Pillars Overview'}
              {activeTab === 'climate' && 'Climate Action, ESG & Sustainability'}
              {activeTab === 'education' && 'Educational Innovation & Pedagogy'}
              {activeTab === 'governance' && 'Data & Digital Governance'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
            <button
              onClick={onNavigateAbout}
              className="hover:text-white transition-colors cursor-pointer hidden sm:inline"
            >
              About IP3
            </button>
            <span className="hidden sm:inline">•</span>
            <button
              onClick={onNavigateApproach}
              className="hover:text-white transition-colors cursor-pointer hidden sm:inline"
            >
              Approach
            </button>
            <span className="hidden sm:inline">•</span>
            <button
              onClick={onNavigateContact}
              className="text-[#ff7e67] hover:underline cursor-pointer"
            >
              Advisory Desk
            </button>
          </div>
        </div>

        {/* Tab Navigation Strip */}
        <div className="border-t border-slate-800/80 bg-[#081220]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1.5 shrink-0">
              {[
                { id: 'overview', label: 'All Focus Areas', icon: Layers, number: '00' },
                { id: 'climate', label: 'Climate Action & ESG', icon: Leaf, number: '01', badge: 'Featured' },
                { id: 'education', label: 'Educational Innovation', icon: GraduationCap, number: '02' },
                { id: 'governance', label: 'Data & Digital Governance', icon: ShieldCheck, number: '03' },
              ].map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`relative px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                      isActive
                        ? 'text-[#050a12] shadow-md shadow-black/40'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="focusPagePill"
                        className="absolute inset-0 bg-[#ff7e67] rounded-full"
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                      />
                    )}
                    <span className={`relative z-10 font-mono text-[10px] font-bold ${isActive ? 'text-[#050a12]' : 'text-[#ff7e67]'}`}>
                      {tab.number}
                    </span>
                    <TabIcon className="w-3.5 h-3.5 relative z-10" />
                    <span className="relative z-10">{tab.label}</span>
                    {tab.badge && !isActive && (
                      <span className="relative z-10 text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-[#ff7e67]/20 text-[#ff7e67] border border-[#ff7e67]/40 uppercase">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* RENDER DEDICATED CLIMATE ACTION PAGE WHEN CLIMATE TAB IS ACTIVE */}
      {activeTab === 'climate' ? (
        <ClimateActionPage
          onNavigateHome={onNavigateHome}
          onNavigateContact={onNavigateContact}
          onNavigateAbout={onNavigateAbout}
          onNavigateApproach={onNavigateApproach}
          onNavigateFocus={() => {
            setActiveTab('overview');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenTalk={onOpenTalk}
          onOpenCollaborate={onOpenCollaborate}
        />
      ) : activeTab === 'education' ? (
        /* Educational Innovation Sub-Page */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5" />
              Pillar 02
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
              Educational Innovation, Skills &amp; Pedagogy
            </h1>
            <p className="text-base text-slate-400 leading-relaxed">
              Transforming human capital pipelines through adaptive learning systems, STEM curriculum modernization, institutional capability benchmarking, and digital pedagogy across emerging economies.
            </p>
          </div>

          {/* Core Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#081220] p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">01</div>
              <h3 className="text-lg font-bold text-slate-100">Digital Learning Architecture</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Nationwide deployment of blended classroom infrastructure, localized LMS platforms, and real-time student learning outcome analytics.</p>
            </div>
            <div className="bg-[#081220] p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">02</div>
              <h3 className="text-lg font-bold text-slate-100">ADB Secondary Education Reform</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Pedagogical assessment frameworks, continuous teacher professional development (CPD), and decentralized school performance tracking.</p>
            </div>
            <div className="bg-[#081220] p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">03</div>
              <h3 className="text-lg font-bold text-slate-100">TVET &amp; Future Skills Matching</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Aligning vocational credentials and engineering curricula with industrial robotics, automated manufacturing, and high-value export services.</p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-[#081220] to-[#081220] border border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-slate-100">Inquire About Educational Reform Advisory</h3>
              <p className="text-xs text-slate-400 mt-1">Connect with our education economists and institutional design specialists.</p>
            </div>
            <button
              onClick={() => onOpenCollaborate ? onOpenCollaborate('Educational Innovation & Pedagogy') : onNavigateContact?.()}
              className="px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs shadow-lg transition-colors cursor-pointer shrink-0"
            >
              Request Advisory Briefing
            </button>
          </div>
        </div>
      ) : activeTab === 'governance' ? (
        /* Data & Digital Governance Sub-Page */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              Pillar 03
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
              Data &amp; Digital Governance
            </h1>
            <p className="text-base text-slate-400 leading-relaxed">
              Future-proofing sovereign institutions through municipal administrative capability, public financial management (PFM) modernization, automated data ecosystems, and regulatory policy architecture.
            </p>
          </div>

          {/* Core Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#081220] p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">01</div>
              <h3 className="text-lg font-bold text-slate-100">BMDF Municipal Modernization</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Strengthening municipal governance, automated property tax assessment, revenue mobilization, and capital investment planning across secondary cities.</p>
            </div>
            <div className="bg-[#081220] p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">02</div>
              <h3 className="text-lg font-bold text-slate-100">National Data Architecture</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Interoperable data registries, statistical pipeline modernization, and cryptographic data sovereignty governance for ministerial workflows.</p>
            </div>
            <div className="bg-[#081220] p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">03</div>
              <h3 className="text-lg font-bold text-slate-100">Regulatory Impact Assessment</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Empirical RIA toolkits, cross-border trade compliance modeling, and legislative drafting for competitive emerging market jurisdictions.</p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-[#081220] to-[#081220] border border-emerald-900/40 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-slate-100">Inquire About Digital Governance &amp; PFM</h3>
              <p className="text-xs text-slate-400 mt-1">Engage our public finance, municipal governance, and digital policy specialists.</p>
            </div>
            <button
              onClick={() => onOpenCollaborate ? onOpenCollaborate('Data & Digital Governance') : onNavigateContact?.()}
              className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition-colors cursor-pointer shrink-0"
            >
              Request Advisory Briefing
            </button>
          </div>
        </div>
      ) : (
        /* 00. OVERVIEW: 3 CORE STRATEGIC PILLARS */
        <>
          {/* Hero Section */}
          <section className="relative pt-16 pb-16 overflow-hidden bg-gradient-to-b from-[#081220] via-[#050a12] to-[#050a12]">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#ff7e67]/10 blur-[140px] rounded-full pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-[450px] h-[300px] bg-[#2dd4bf]/5 blur-[130px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-4xl mx-auto text-center space-y-5">
                
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff7e67]/10 border border-[#ff7e67]/30 text-[#ff7e67] text-xs font-mono font-bold uppercase tracking-widest">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Core Pillars of Institutional Practice</span>
                </div>

                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-100 tracking-tight leading-[1.1]">
                  Strategic Focus Areas
                </h1>

                <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
                  We design and execute empirical research, macroeconomic modeling, and policy architecture across three interlocked pillars: <strong className="text-slate-100">Green Transitions</strong>, <strong className="text-slate-100">Educational Innovation</strong>, and <strong className="text-slate-100">Digital Governance</strong>.
                </p>

                {/* Quick Metrics Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 max-w-3xl mx-auto">
                  <div className="p-3.5 rounded-2xl bg-[#081220] border border-slate-800 text-left">
                    <div className="text-xl font-extrabold text-[#ff7e67]">3</div>
                    <div className="text-[11px] text-slate-400 font-medium">Core Strategic Pillars</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#081220] border border-slate-800 text-left">
                    <div className="text-xl font-extrabold text-[#ff7e67]">$140M+</div>
                    <div className="text-[11px] text-slate-400 font-medium">Capital Mobilized</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#081220] border border-slate-800 text-left">
                    <div className="text-xl font-extrabold text-[#ff7e67]">12+</div>
                    <div className="text-[11px] text-slate-400 font-medium">Sovereign Jurisdictions</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#081220] border border-slate-800 text-left">
                    <div className="text-xl font-extrabold text-slate-100">40+</div>
                    <div className="text-[11px] text-slate-400 font-medium">Action Research Programs</div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Prominent Featured Climate Action Spotlight Banner */}
          <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-[#0E1A22] via-[#12202B] to-[#0A131A] rounded-3xl p-8 sm:p-10 border border-[#EF715A]/40 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="absolute right-0 top-0 w-96 h-96 bg-[#EF715A]/15 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-4 relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EF715A]/20 border border-[#EF715A]/40 text-[#EF715A] text-xs font-mono font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Primary Focus Initiative
                </div>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">
                  Climate Action, ESG Strategy &amp; Circular Solutions
                </h2>
                <p className="text-sm text-[#AEB0AE] leading-relaxed">
                  Explore our comprehensive suite: Decarbonization pathways, Climate Finance mobilization, The Circular Economist Magazine, ESG Enterprise Roadmap, and closed-loop circular solutions.
                </p>
              </div>

              <div className="relative z-10 shrink-0 flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <button
                  onClick={() => {
                    setActiveTab('climate');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-full bg-[#EF715A] hover:bg-[#E05E47] text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Open Full Climate Focus Suite</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>

          {/* The 3 Main Focus Areas Cards */}
          <section id="focus-areas" className="py-12 sm:py-20 relative bg-[#050a12]">
            <div id="focus-area" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="space-y-12">
                {focusList.map((area, index) => {
                  const originalIndex = focusList.findIndex((f) => f.id === area.id);
                  const accent = getPillarAccent(originalIndex >= 0 ? originalIndex : index);
                  const isEven = index % 2 === 0;

                  return (
                    <div
                      key={area.id}
                      id={`focus-branch-${originalIndex >= 0 ? originalIndex : index}`}
                      data-area-id={area.id}
                      className={`bg-[#081220] p-6 sm:p-10 rounded-3xl border border-slate-800 relative overflow-hidden shadow-2xl transition-all ${accent.border}`}
                    >
                      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                        
                        {/* Left Details Column */}
                        <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                          
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-0.5 rounded-full border ${accent.tagBg}`}>
                                {area.badge}
                              </span>
                              <span className="text-xs font-mono text-slate-400">
                                Pillar 0{originalIndex + 1}
                              </span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-1.5 tracking-tight">
                              {area.title}
                            </h2>
                          </div>

                          <p className="text-sm font-semibold text-[#ff7e67]">
                            {area.subtitle}
                          </p>

                          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                            {area.description}
                          </p>

                          {/* Key Solutions & Action Initiatives */}
                          <div className="space-y-3 pt-2">
                            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                              <Target className="w-3.5 h-3.5 text-[#ff7e67]" />
                              <span>Key Solutions &amp; Action Initiatives</span>
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {area.keySolutions.map((sol, i) => (
                                <div key={i} className="flex items-center gap-2.5 text-xs text-slate-200 bg-[#050a12] p-3 rounded-xl border border-slate-800 hover:border-[#ff7e67]/40 transition-colors">
                                  <CheckCircle className="w-4 h-4 text-[#ff7e67] shrink-0" />
                                  <span className="text-[11.5px] leading-snug">{sol}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* SDGs Tags */}
                          <div className="pt-2">
                            <span className="text-[11px] font-mono text-slate-400 block mb-2">Sustainable Development Alignment:</span>
                            <div className="flex flex-wrap gap-2">
                              {(area.targetSDGs || []).map((sdg, sIdx) => (
                                <span key={sIdx} className="px-2.5 py-1 rounded-lg bg-[#050a12] border border-slate-800 text-[11px] text-slate-300 font-mono">
                                  {sdg}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-4 flex flex-wrap items-center gap-3">
                            {area.id === 'green-transitions' ? (
                              <button
                                onClick={() => {
                                  setActiveTab('climate');
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="px-5 py-2.5 rounded-full bg-[#ff7e67] hover:bg-[#ff8f7b] text-[#050a12] font-bold text-xs shadow-md shadow-[#ff7e67]/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                              >
                                <span>Open Dedicated Climate Action Focus Page</span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() => setSelectedArea(area)}
                                className="px-5 py-2.5 rounded-full bg-[#ff7e67] hover:bg-[#ff8f7b] text-[#050a12] font-bold text-xs shadow-md shadow-[#ff7e67]/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                              >
                                <span>Explore In-Depth Case &amp; Presentation</span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            )}

                            <button
                              onClick={() => {
                                if (onOpenCollaborate) {
                                  onOpenCollaborate(area.title);
                                } else if (onNavigateContact) {
                                  onNavigateContact();
                                }
                              }}
                              className="px-5 py-2.5 rounded-full bg-[#050a12] hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                            >
                              Request Advisory
                            </button>
                          </div>
                        </div>

                        {/* Right Media / Benchmark Card */}
                        <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#050a12] shadow-2xl group">
                            
                            {area.videoUrl ? (
                              <div className="relative aspect-video bg-black">
                                <video
                                  src={area.videoUrl}
                                  controls
                                  muted
                                  loop
                                  playsInline
                                  preload="metadata"
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute top-3 left-3 bg-[#081220]/95 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono font-bold text-[#ff7e67] border border-[#ff7e67]/30 flex items-center gap-1.5 shadow-md">
                                  <Play className="w-3 h-3 text-[#ff7e67] fill-[#ff7e67]" />
                                  <span>IP3 Institutional Presentation</span>
                                </div>
                              </div>
                            ) : (
                              <div className="relative aspect-video overflow-hidden">
                                <img
                                  src={area.imageUrl}
                                  alt={area.title}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050a12] via-transparent to-transparent" />
                              </div>
                            )}

                            {/* Benchmark Showcase Banner */}
                            <div className="p-4 sm:p-5 bg-[#050a12] border-t border-slate-800 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] uppercase font-mono font-bold text-[#ff7e67] tracking-wider flex items-center gap-1.5">
                                  <BookOpen className="w-3.5 h-3.5" />
                                  <span>Featured Benchmark Project</span>
                                </span>
                                <span className="text-[10px] font-mono text-[#2dd4bf]">Active</span>
                              </div>

                              <h3 className="text-sm font-bold text-slate-100 line-clamp-1 group-hover:text-[#ff7e67] transition-colors">
                                {area.featuredProjectTitle}
                              </h3>

                              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                                {area.featuredProjectSummary}
                              </p>

                              <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-800/80">
                                <button
                                  onClick={() => {
                                    if (area.id === 'green-transitions') {
                                      setActiveTab('climate');
                                      window.scrollTo({ top: 0, behavior: 'smooth' });
                                    } else {
                                      setSelectedArea(area);
                                    }
                                  }}
                                  className="text-[#ff7e67] hover:underline font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                                >
                                  <span>View Detailed Solution</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                                <span className="text-[10px] font-mono text-slate-400">
                                  Verified
                                </span>
                              </div>
                            </div>

                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </section>
        </>
      )}

      {/* Case Study Deep Dive Modal */}
      <FocusAreaDetailModal
        area={selectedArea}
        onClose={() => setSelectedArea(null)}
        onOpenContact={() => {
          if (onOpenCollaborate && selectedArea) {
            onOpenCollaborate(selectedArea.title);
          } else if (onNavigateContact) {
            onNavigateContact();
          }
        }}
      />
    </div>
  );
};
