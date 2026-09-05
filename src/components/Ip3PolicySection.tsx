import React, { useState, useEffect } from 'react';
import {
  Shield, Menu, X, ArrowUpRight, Globe, Layers, BookOpen, Compass,
  Leaf, GraduationCap, ShieldCheck, Play, ArrowRight, CheckCircle,
  Sparkles, SunMedium, Calculator, Activity, FileSpreadsheet, CheckCircle2,
  FileCheck, ExternalLink, Filter, Building, Send, Network, GitBranch,
  ChevronRight, ChevronLeft, RotateCcw, Search, SlidersHorizontal
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';

// ==========================================
// 1. TYPES & INTERFACES
// ==========================================

// Data lives in ../data/policyData so Node scripts can read it without React.
// Re-exported here so existing imports of this module keep working.
export type { FocusArea, ServiceSolution, ProjectItem, SectorCategory } from '../data/policyData';
export { FOCUS_AREAS, SERVICES, PROJECTS } from '../data/policyData';

import { FOCUS_AREAS, SERVICES, PROJECTS } from '../data/policyData';
import type { FocusArea, ServiceSolution, ProjectItem, SectorCategory } from '../data/policyData';
import { SystemsArchitectureSection } from './SystemsArchitectureSection';
import { MethodologyTranslationSection } from './MethodologyTranslationSection';


interface HeroTreeProps {
  onExploreFocus: () => void;
  onOpenContact: () => void;
  onNavigateFocus?: (sectionId?: string) => void;
}

const HeroTreeSection: React.FC<HeroTreeProps> = ({ onExploreFocus, onOpenContact, onNavigateFocus }) => {
  const scrollToBranch = (branchKey: string | number) => {
    if (onNavigateFocus) {
      if (typeof branchKey === 'number') {
        onNavigateFocus(`#focus-branch-${branchKey}`);
      } else {
        onNavigateFocus(branchKey);
      }
      return;
    }
    let el: HTMLElement | null = null;
    if (typeof branchKey === 'number') {
      el = document.getElementById(`focus-branch-${branchKey}`);
    } else {
      el = document.getElementById(branchKey);
    }
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      onExploreFocus();
    }
  };

  return (
    <section className="relative pt-16 pb-16 overflow-hidden bg-gradient-to-b from-[#081220] via-[#050a12] to-[#081220] border-t border-slate-800">
      {/* Background Ambient Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#ff7e67]/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[300px] bg-[#2dd4bf]/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Headline & Identity */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div>
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#ff7e67] uppercase">
              INSTITUTE FOR PUBLIC POLICY &amp; PRACTICE (IP3)
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-100 tracking-tight leading-[1.15]">
            Advancing <span className="text-[#ff7e67]">Public Policy</span> Through Empirical Rigor & Action
          </h2>

          <p className="text-sm sm:text-base text-slate-400 font-normal max-w-3xl mx-auto leading-relaxed">
            We provide strategic consultations, empirical research, and fit-for-purpose impact solutions across <strong className="text-slate-100 font-semibold">Green Transitions</strong>, <strong className="text-slate-100 font-semibold">Educational Innovation</strong>, and <strong className="text-slate-100 font-semibold">Future-Ready Digital Governance</strong>.
          </p>

          {/* Quick Institutional Highlights Strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#081220] border border-slate-800 text-xs text-slate-400">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf]" />
              <span className="text-slate-100 font-bold">3</span>
              <span>Interlocked Pillars</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#081220] border border-slate-800 text-xs text-slate-400">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ff7e67]" />
              <span className="text-slate-100 font-bold">100+</span>
              <span>Global Economists & Thinkers</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#081220] border border-slate-800 text-xs text-slate-400">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="text-slate-100 font-bold">40+</span>
              <span>Action Research Programs</span>
            </div>
          </div>
        </div>

        {/* --- TREE HIERARCHY STRUCTURE --- */}
        <div className="mt-14 max-w-5xl mx-auto relative">
          
          {/* Root Tree Node (Center Top) */}
          <div className="flex flex-col items-center justify-center relative z-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#081220] border-2 border-[#ff7e67]/40 text-xs font-bold text-slate-100 shadow-2xl shadow-black/80 hover:border-[#ff7e67] transition-colors group">
              <div className="p-2 rounded-xl bg-[#ff7e67]/10 text-[#ff7e67] border border-[#ff7e67]/30 group-hover:scale-105 transition-transform">
                <Network className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] uppercase font-mono tracking-widest text-[#ff7e67]">
                  Systemic Architecture Core
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-slate-100">
                  IP3 Policy Architecture Framework
                </span>
              </div>
            </div>
            
            {/* Trunk Vertical Stem Connector */}
            <div className="w-0.5 h-10 bg-gradient-to-b from-[#ff7e67] via-[#ff7e67]/70 to-slate-800" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#ff7e67] shadow-lg shadow-[#ff7e67]/50 border-2 border-[#081220]" />
          </div>

          {/* SVG Connector Lines (Desktop Branching Tree Lines) */}
          <div className="hidden md:block relative w-full h-14 -mt-1.5 z-10 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 56">
              {/* Left Branch */}
              <path d="M 500,0 C 500,28 166,28 166,56" fill="none" stroke="url(#tree-grad-unified)" strokeWidth="2.5" strokeDasharray="5 3" />
              {/* Middle Branch */}
              <path d="M 500,0 L 500,56" fill="none" stroke="url(#tree-grad-unified)" strokeWidth="2.5" />
              {/* Right Branch */}
              <path d="M 500,0 C 500,28 833,28 833,56" fill="none" stroke="url(#tree-grad-unified)" strokeWidth="2.5" strokeDasharray="5 3" />

              <defs>
                <linearGradient id="tree-grad-unified" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff7e67" />
                  <stop offset="100%" stopColor="#ff7e67" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Tree Leaf Nodes Grid (3 Pillars) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20 mt-4 md:mt-0">
            
            {/* Tree Branch 01: Green Transitions */}
            <div 
              onClick={() => scrollToBranch(0)}
              className="bg-[#081220] rounded-3xl border border-slate-800 group overflow-hidden flex flex-col justify-between shadow-xl hover:border-[#ff7e67] hover:shadow-2xl hover:shadow-[#ff7e67]/10 transition-all duration-300 relative cursor-pointer"
            >
              <div className="relative h-40 overflow-hidden bg-[#050a12]/60 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=800"
                  alt="Climate Action & ESG"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081220] via-[#081220]/40 to-transparent" />
                
                {/* Pillar Icon Badge */}
                <div className="absolute top-3 left-3 w-10 h-10 rounded-2xl flex items-center justify-center text-[#ff7e67] border border-[#ff7e67]/30 bg-[#081220]/95 backdrop-blur-md shadow-md">
                  <Leaf className="w-5 h-5" />
                </div>
                
                {/* Branch Number */}
                <span className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-[#081220]/95 text-[#ff7e67] border border-[#ff7e67]/30 backdrop-blur-md shadow-xs flex items-center gap-1.5 font-mono">
                  <GitBranch className="w-3 h-3 text-[#ff7e67]" />
                  <span>Branch 01</span>
                </span>

                {/* Metric Chip */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-lg bg-black/60 text-slate-100 border border-white/10 backdrop-blur-sm">
                    ESG Decarbonization
                  </span>
                  <span className="text-[10px] font-mono text-[#ff7e67] font-bold">
                    Empirical CBA
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 bg-[#081220]">
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#ff7e67] flex items-center gap-1.5">
                    <span>Green Transition Engine</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-[#ff7e67] transition-colors leading-snug">
                    Climate Action & ESG
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Green economics, firm-level tech adoption, circular economy, industrial decarbonization, and ESG compliance.
                  </p>
                </div>

                {/* Tags */}
                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400 group-hover:text-slate-100 transition-colors flex items-center gap-1">
                    <span>Explore Focus</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#ff7e67] group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    4 Programs
                  </span>
                </div>
              </div>
            </div>

            {/* Tree Branch 02: Educational Innovation */}
            <div 
              onClick={() => scrollToBranch(1)}
              className="bg-[#081220] rounded-3xl border border-slate-800 group overflow-hidden flex flex-col justify-between shadow-xl hover:border-[#ff7e67] hover:shadow-2xl hover:shadow-[#ff7e67]/10 transition-all duration-300 relative cursor-pointer"
            >
              <div className="relative h-40 overflow-hidden bg-[#050a12]/60 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
                  alt="Educational Innovation"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081220] via-[#081220]/40 to-transparent" />
                
                {/* Pillar Icon Badge */}
                <div className="absolute top-3 left-3 w-10 h-10 rounded-2xl flex items-center justify-center text-[#ff7e67] border border-[#ff7e67]/30 bg-[#081220]/95 backdrop-blur-md shadow-md">
                  <GraduationCap className="w-5 h-5" />
                </div>
                
                {/* Branch Number */}
                <span className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-[#081220]/95 text-[#ff7e67] border border-[#ff7e67]/30 backdrop-blur-md shadow-xs flex items-center gap-1.5 font-mono">
                  <GitBranch className="w-3 h-3 text-[#ff7e67]" />
                  <span>Branch 02</span>
                </span>

                {/* Metric Chip */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-lg bg-black/60 text-slate-100 border border-white/10 backdrop-blur-sm">
                    Human Capital & Skills
                  </span>
                  <span className="text-[10px] font-mono text-[#ff7e67] font-bold">
                    ADB Feasibility
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 bg-[#081220]">
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#ff7e67] flex items-center gap-1.5">
                    <span>Human Capital & Pedagogy</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-[#ff7e67] transition-colors leading-snug">
                    Educational Innovation
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Human developmental science, datafication of learning, blended learning rails, and TVET modernizations.
                  </p>
                </div>

                {/* Tags */}
                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400 group-hover:text-slate-100 transition-colors flex items-center gap-1">
                    <span>Explore Focus</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#ff7e67] group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    6 Programs
                  </span>
                </div>
              </div>
            </div>

            {/* Tree Branch 03: Data & Digital Governance */}
            <div 
              onClick={() => scrollToBranch(2)}
              className="bg-[#081220] rounded-3xl border border-slate-800 group overflow-hidden flex flex-col justify-between shadow-xl hover:border-[#ff7e67] hover:shadow-2xl hover:shadow-[#ff7e67]/10 transition-all duration-300 relative cursor-pointer"
            >
              <div className="relative h-40 overflow-hidden bg-[#050a12]/60 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
                  alt="Data & Digital Governance"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081220] via-[#081220]/40 to-transparent" />
                
                {/* Pillar Icon Badge */}
                <div className="absolute top-3 left-3 w-10 h-10 rounded-2xl flex items-center justify-center text-[#ff7e67] border border-[#ff7e67]/30 bg-[#081220]/95 backdrop-blur-md shadow-md">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                
                {/* Branch Number */}
                <span className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-[#081220]/95 text-[#ff7e67] border border-[#ff7e67]/30 backdrop-blur-md shadow-xs flex items-center gap-1.5 font-mono">
                  <GitBranch className="w-3 h-3 text-[#ff7e67]" />
                  <span>Branch 03</span>
                </span>

                {/* Metric Chip */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-lg bg-black/60 text-slate-100 border border-white/10 backdrop-blur-sm">
                    Municipal Capacity
                  </span>
                  <span className="text-[10px] font-mono text-[#ff7e67] font-bold">
                    BMDF Data Trust
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 bg-[#081220]">
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#ff7e67] flex items-center gap-1.5">
                    <span>Institutional Ecosystems</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-[#ff7e67] transition-colors leading-snug">
                    Data & Digital Governance
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Future-ready governance, municipal development (BMDF), sovereign data trust, and regulatory architecture.
                  </p>
                </div>

                {/* Tags */}
                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400 group-hover:text-slate-100 transition-colors flex items-center gap-1">
                    <span>Explore Focus</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#ff7e67] group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    5 Programs
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

// ==========================================
// 4. FOCUS AREA MODAL
// ==========================================

const FocusAreaModal: React.FC<{
  area: FocusArea | null;
  onClose: () => void;
  onOpenContact: () => void;
}> = ({ area, onClose, onOpenContact }) => {
  if (!area) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050a12]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#081220] rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-colors cursor-pointer border border-slate-700"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-3 mb-6 pr-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#ff7e67]/10 text-[#ff7e67] border border-[#ff7e67]/30">
            {area.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            {area.title}
          </h2>
          <p className="text-sm font-semibold text-[#ff7e67]">
            {area.subtitle}
          </p>
        </div>

        {area.videoUrl ? (
          <div className="mb-6 rounded-2xl overflow-hidden border border-slate-800 bg-[#050a12] shadow-lg">
            <video
              src={area.videoUrl}
              controls
              muted
              autoPlay
              loop
              playsInline
              className="w-full aspect-video object-cover"
            />
          </div>
        ) : (
          <div className="mb-6 h-56 rounded-2xl overflow-hidden border border-slate-800">
            <img src={area.imageUrl} alt={area.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="space-y-6 text-slate-400 text-sm leading-relaxed">
          <p className="text-slate-100 text-base leading-relaxed">
            {area.description}
          </p>
          <p className="bg-[#050a12]/80 p-4 rounded-2xl border border-slate-800 text-slate-400">
            {area.detailedBody}
          </p>

          <div>
            <h3 className="text-base font-bold text-slate-100 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#ff7e67]" />
              <span>Core Strategic Interventions & Solutions</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {area.keySolutions.map((sol, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#050a12] border border-slate-800 text-xs text-slate-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ff7e67] mt-1.5 shrink-0" />
                  <span>{sol}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#050a12] border border-slate-800">
            {area.keyStats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-xs text-slate-400 font-medium mb-1">{stat.label}</div>
                <div className="text-sm font-bold text-[#ff7e67]">{stat.value}</div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Sustainable Development Goals (SDGs) Alignment
            </h4>
            <div className="flex flex-wrap gap-2">
              {area.targetSDGs.map((sdg, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-xl bg-[#ff7e67]/10 text-[#ff7e67] border border-[#ff7e67]/30 text-xs font-semibold">
                  {sdg}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#050a12] border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-[#ff7e67] mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Featured Engagement Benchmark</span>
            </div>
            <h4 className="font-bold text-slate-100 text-sm mb-1">{area.featuredProjectTitle}</h4>
            <p className="text-xs text-slate-400">{area.featuredProjectSummary}</p>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-700 border border-slate-700 text-xs font-semibold cursor-pointer"
          >
            Close Overview
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#ff7e67] hover:bg-[#e06a54] text-white font-bold text-xs shadow-md shadow-[#ff7e67]/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <span>Inquire About {area.title} Advisory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. FOCUS AREAS SECTION COMPONENT
// ==========================================

const FocusAreasSection: React.FC<{ onOpenContact: () => void }> = ({ onOpenContact }) => {
  const { data } = useCMS();
  const focusList = (data.focusAreas && data.focusAreas.length > 0 ? data.focusAreas : FOCUS_AREAS) as FocusArea[];
  const [selectedArea, setSelectedArea] = useState<FocusArea | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Leaf':
        return <Leaf className="w-6 h-6 text-[#2dd4bf]" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-[#ff7e67]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#38bdf8]" />;
      default:
        return <Layers className="w-6 h-6 text-[#ff7e67]" />;
    }
  };

  return (
    <section id="focus-areas" className="py-20 bg-[#081220] relative border-t border-slate-800">
      <div id="focus-area" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div>
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#ff7e67] uppercase">
              CORE PILLARS OF EXPERTISE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
            Our Strategic Focus Areas
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            We deliver empirical research, policy analysis, and fit-for-purpose impact solutions across Green Economies, Educational Systems, and Digital Governance.
          </p>
        </div>

        <div className="space-y-12">
          {focusList.map((area, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={area.id}
                id={`focus-branch-${index}`}
                data-area-id={area.id}
                className="bg-[#050a12] p-6 sm:p-8 rounded-3xl border border-slate-800 relative overflow-hidden shadow-xl hover:border-[#ff7e67]/50 transition-all"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  
                  <div className={`lg:col-span-7 space-y-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-[#081220] border border-slate-800 shadow-xs">
                        {getIcon(area.iconName)}
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#ff7e67] bg-[#ff7e67]/10 px-3 py-0.5 rounded-full border border-[#ff7e67]/30">
                          {area.badge}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100 mt-1">
                          {area.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-[#ff7e67]">
                      {area.subtitle}
                    </p>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {area.description}
                    </p>

                    <div className="space-y-2 pt-1">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Key Solutions & Action Initiatives
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {area.keySolutions.slice(0, 4).map((sol, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-100 bg-[#081220] p-2.5 rounded-xl border border-slate-800">
                            <CheckCircle className="w-3.5 h-3.5 text-[#ff7e67] shrink-0" />
                            <span className="truncate text-[11px]">{sol}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setSelectedArea(area)}
                        className="px-4 py-2 rounded-xl bg-[#ff7e67] hover:bg-[#e06a54] text-white font-bold text-xs shadow-md shadow-[#ff7e67]/20 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        <span>Explore In-Depth Case & Video</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={onOpenContact}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Request Advisory
                      </button>
                    </div>
                  </div>

                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#081220] shadow-lg group">
                      {area.videoUrl ? (
                        <div className="relative aspect-video bg-[#081220]">
                          <video
                            src={area.videoUrl}
                            controls
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 left-3 bg-[#081220]/95 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-[#ff7e67] border border-[#ff7e67]/30 flex items-center gap-1.5 shadow-sm">
                            <Play className="w-3 h-3 text-[#ff7e67] fill-[#ff7e67]" />
                            <span>IP3 Video Presentation</span>
                          </div>
                        </div>
                      ) : (
                        <div className="relative aspect-video">
                          <img src={area.imageUrl} alt={area.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}

                      <div className="p-3 bg-[#081220] border-t border-slate-800">
                        <div className="text-[10px] uppercase font-bold text-[#ff7e67] mb-0.5">
                          Benchmark Action Project
                        </div>
                        <div className="text-xs font-bold text-slate-100 line-clamp-1">
                          {area.featuredProjectTitle}
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                          {area.featuredProjectSummary}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      <FocusAreaModal
        area={selectedArea}
        onClose={() => setSelectedArea(null)}
        onOpenContact={onOpenContact}
      />
    </section>
  );
};

// ==========================================
// 6. SERVICES SECTION COMPONENT
// ==========================================

const ServicesSection: React.FC<{ onOpenContact: () => void }> = ({ onOpenContact }) => {
  const { data } = useCMS();
  const serviceList = (data.serviceSolutions && data.serviceSolutions.length > 0 ? data.serviceSolutions : SERVICES) as ServiceSolution[];
  const [activeServiceId, setActiveServiceId] = useState<string>(serviceList[0]?.id || SERVICES[0].id);

  // Sync active id if list changes
  useEffect(() => {
    if (!serviceList.some(s => s.id === activeServiceId) && serviceList.length > 0) {
      setActiveServiceId(serviceList[0].id);
    }
  }, [serviceList, activeServiceId]);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#ff7e67]" />;
      case 'SunMedium':
      case 'Sun':
        return <SunMedium className="w-5 h-5 text-[#ff7e67]" />;
      case 'Calculator':
        return <Calculator className="w-5 h-5 text-[#ff7e67]" />;
      case 'Activity':
      case 'TrendingUp':
        return <Activity className="w-5 h-5 text-[#ff7e67]" />;
      case 'FileSpreadsheet':
      case 'FileText':
        return <FileSpreadsheet className="w-5 h-5 text-[#ff7e67]" />;
      case 'Leaf':
        return <Leaf className="w-5 h-5 text-[#ff7e67]" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-[#ff7e67]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#ff7e67]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#ff7e67]" />;
      default:
        return <Compass className="w-5 h-5 text-[#ff7e67]" />;
    }
  };

  const activeService = serviceList.find((s) => s.id === activeServiceId) || serviceList[0] || SERVICES[0];

  return (
    <section id="services" className="py-24 bg-[#081220] relative border-t border-slate-800">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#ff7e67]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#2dd4bf]/5 rounded-full blur-[130px] pointer-events-none" />

      <div id="solution" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div>
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#ff7e67] uppercase">
              INTEGRATED SOLUTIONS MATRIX
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
            Our Services &amp; Advisory Solutions
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            From rigorous economic feasibility and MERLA design to full-scale survey execution and climate action strategy, we empower public and private institutions.
          </p>
        </div>

        {/* Interactive Layout: Left Selector, Right Detailed Blueprint */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Navigation Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-2.5 sm:gap-3 h-full">
            {serviceList.map((srv, idx) => {
              const isActive = srv.id === activeServiceId;
              return (
                <button
                  key={srv.id}
                  onClick={() => setActiveServiceId(srv.id)}
                  className={`w-full flex-1 text-left py-3 px-4 sm:py-3.5 sm:px-5 rounded-2xl border transition-all flex items-center justify-between gap-3 group overflow-hidden cursor-pointer ${
                    isActive
                      ? 'bg-[#09131f] border-[#ff7e67] shadow-sm ring-1 ring-[#ff7e67]/30'
                      : 'bg-[#09131f]/75 border-slate-800/80 hover:border-slate-700 hover:bg-[#0c1827]'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] sm:text-[11px] uppercase font-mono font-bold text-slate-400 tracking-wider mb-0.5">
                      Solution 0{idx + 1} &bull; {srv.shortTag}
                    </div>
                    <div className={`text-base sm:text-lg lg:text-xl font-bold leading-snug transition-colors ${
                      isActive 
                        ? 'text-[#ff7e67]' 
                        : 'text-slate-100 group-hover:text-[#ff7e67]'
                    }`}>
                      {srv.title}
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isActive 
                      ? 'text-[#ff7e67] translate-x-1' 
                      : 'text-slate-500 group-hover:text-slate-300'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right Selected Service Detail View */}
          <div className="lg:col-span-7 bg-[#050a12] p-5 sm:p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between h-full space-y-4">
            
            <div className="space-y-4">
              {/* Service Cover Photography */}
              {activeService.imageUrl && (
                <div className="relative h-36 sm:h-44 rounded-2xl overflow-hidden border border-slate-800/90 shadow-md bg-[#081220] group shrink-0">
                  <img
                    src={activeService.imageUrl}
                    alt={activeService.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050a12] via-[#050a12]/20 to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff7e67] bg-[#081220]/95 backdrop-blur-md px-3 py-1 rounded-full border border-[#ff7e67]/30 font-mono">
                      IP3 Methodological Solution
                    </span>
                    <span className="text-xs font-semibold text-slate-100 bg-[#081220]/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 font-mono">
                      {activeService.shortTag}
                    </span>
                  </div>
                </div>
              )}

              {!activeService.imageUrl && (
                /* Top Tag Badges fallback */
                <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-slate-800/80">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#ff7e67] bg-[#ff7e67]/10 px-3 py-1 rounded-full border border-[#ff7e67]/30 font-mono">
                    IP3 Methodological Solution
                  </span>
                  <span className="text-xs font-semibold text-slate-300 bg-[#081220] px-3 py-1 rounded-lg border border-slate-800 font-mono">
                    {activeService.shortTag}
                  </span>
                </div>
              )}

              {/* Service Title */}
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-slate-100 leading-tight">
                  {activeService.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {activeService.description}
              </p>
            </div>

            {/* Key Deliverables Grid */}
            <div className="pt-2 border-t border-slate-800/60">
              <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2 font-mono">
                <FileCheck className="w-3.5 h-3.5 text-[#ff7e67]" />
                <span>Core Tangible Deliverables</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeService.deliverables.map((del, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-[#081220] border border-slate-800 text-xs text-slate-200 shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#ff7e67] shrink-0" />
                    <span className="truncate">{del}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

// ==========================================
// 7. PROJECTS SECTION COMPONENT
// ==========================================

const ProjectsSection: React.FC = () => {
  const { data } = useCMS();
  const projectList = (data.projects && data.projects.length > 0 ? data.projects : PROJECTS) as ProjectItem[];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const projectsPerPage = 6;

  // Reset pagination when category, search, or project list changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, projectList.length]);

  const categories = [
    { id: 'all', label: 'All Engagements' },
    { id: 'education', label: 'Education Reform' },
    { id: 'climate', label: 'Climate Action & ESG' },
    { id: 'governance', label: 'Digital Governance' },
    { id: 'feasibility', label: 'Firm Surveys' },
  ];

  const filteredProjects = projectList.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch =
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.partner.toLowerCase().includes(query) ||
      p.location.toLowerCase().includes(query) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(query)));

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const displayedProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  return (
    <section id="projects" className="pt-4 sm:pt-6 pb-24 bg-[#050a12] relative border-t-0 overflow-hidden">
      {/* Background ambient lighting matching translation framework */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#ff7e67]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div>
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#ff7e67] uppercase">
              PROVEN ACTION RESEARCH PORTFOLIO
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
            Recent Engagements &amp; Impact Projects
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Through a diverse portfolio of engagements with global development partners and national ministries, IP3 Experts have built a reputation for meaningful policy outcomes.
          </p>
        </div>

        {/* Content Filter & Search Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 sm:p-4 bg-[#081220]/90 rounded-2xl border border-slate-800/80 shadow-xl">
          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <div className="flex items-center gap-1.5 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#ff7e67] mr-1 hidden sm:inline-block shrink-0" />
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                const count = cat.id === 'all'
                  ? projectList.length
                  : projectList.filter(p => p.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-[#ff7e67] text-[#050a12] font-bold shadow-md shadow-[#ff7e67]/30 scale-[1.02]'
                        : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-[#050a12]/30 text-[#050a12]' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Input Box */}
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-8 pr-8 py-1.5 bg-slate-900/90 border border-slate-800 focus:border-[#ff7e67] rounded-xl text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid or Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-[#081220]/80 rounded-3xl border border-slate-800/80 p-8">
            <p className="text-slate-400 text-sm">No engagements match the current filter or search criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#ff7e67] hover:bg-[#e06a54] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProjects.map((project) => (
              <div
                key={project.id}
                className="bg-[#081220]/75 hover:bg-[#0b1626] rounded-3xl border border-slate-800/80 flex flex-col overflow-hidden group shadow-lg hover:border-[#ff7e67]/50 transition-all duration-300"
              >
                {/* Image Banner */}
                <div className="relative h-48 overflow-hidden bg-[#081220]">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050a12] via-transparent to-transparent opacity-80" />
                  
                  {/* Partner Badge */}
                  <div className="absolute top-3 left-3 bg-[#081220]/95 backdrop-blur-md px-2.5 py-1 rounded-xl text-[10px] font-bold text-[#ff7e67] border border-[#ff7e67]/30 flex items-center gap-1.5 shadow-sm">
                    <Building className="w-3 h-3 text-[#ff7e67]" />
                    <span>{project.partnerLogoText || project.partner}</span>
                  </div>

                  <div className="absolute bottom-3 right-3 text-[10px] font-semibold text-slate-400 bg-[#081220]/90 px-2 py-0.5 rounded-md border border-slate-800 shadow-xs">
                    {project.year}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#ff7e67]">
                      {project.categoryLabel}
                    </div>
                    <h3 className="text-[26px] font-bold text-slate-100 group-hover:text-[#ff7e67] transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Scope Button */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full mt-2 py-2.5 px-3 rounded-xl bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>View Project Scope & Details</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* See More Projects / Pagination Bar */}
        {totalPages > 1 && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 bg-[#081220]/80 rounded-3xl border border-slate-800/80 shadow-sm">
            <div className="text-xs text-slate-400 font-medium">
              Showing projects <span className="font-bold text-slate-100">{(currentPage - 1) * projectsPerPage + 1}</span> - <span className="font-bold text-slate-100">{Math.min(currentPage * projectsPerPage, filteredProjects.length)}</span> of <span className="font-bold text-slate-100">{filteredProjects.length}</span> (Page {currentPage} of {totalPages})
            </div>

            <div className="flex items-center gap-2.5">
              {/* Page Numbers */}
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-[#ff7e67] text-white shadow-md shadow-[#ff7e67]/20 scale-105'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700'
                    }`}
                    title={`Go to Page ${pageNum}`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              {/* See More Projects Button */}
              {currentPage < totalPages ? (
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="px-4 py-2.5 bg-[#ff7e67] hover:bg-[#e06a54] text-white font-extrabold text-xs rounded-2xl shadow-md shadow-[#ff7e67]/20 transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
                >
                  <span>See More Projects (Page {currentPage + 1})</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setCurrentPage(1)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer border border-slate-700"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#ff7e67]" />
                  <span>Back to Page 1</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050a12]/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#081220] rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-colors cursor-pointer border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 pr-8">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#ff7e67]/10 text-[#ff7e67] border border-[#ff7e67]/30">
                {selectedProject.categoryLabel}
              </span>
              <h3 className="text-2xl font-extrabold text-slate-100">
                {selectedProject.title}
              </h3>
              <p className="text-xs text-[#ff7e67] font-semibold flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-[#ff7e67]" />
                <span>Partner: {selectedProject.partner}</span>
                <span>•</span>
                <Globe className="w-3.5 h-3.5 text-[#ff7e67]" />
                <span>{selectedProject.location}</span>
              </p>
            </div>

            <div className="h-52 rounded-2xl overflow-hidden border border-slate-800">
              <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-full object-cover opacity-80" />
            </div>

            <div className="space-y-4 text-xs text-slate-400 leading-relaxed">
              <p className="text-sm text-slate-100">
                {selectedProject.description}
              </p>

              {selectedProject.detailedScope && (
                <div className="p-4 rounded-2xl bg-[#050a12] border border-slate-800 space-y-1">
                  <h4 className="font-bold text-[#ff7e67] text-xs">Detailed Scope of Work</h4>
                  <p className="text-slate-400 text-xs">{selectedProject.detailedScope}</p>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-[#050a12] border border-slate-800 space-y-1">
                <h4 className="font-bold text-[#ff7e67] text-xs">Strategic Impact & Outcome</h4>
                <p className="text-slate-400 text-xs">{selectedProject.keyOutcome}</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {selectedProject.tags.map((tag, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-400 border border-slate-700 text-xs font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-700 border border-slate-700 text-xs font-semibold cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// ==========================================
// 8. CONTACT ADVISORY MODAL
// ==========================================

const ContactModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [advisoryType, setAdvisoryType] = useState('Feasibility Study & Economic CBA');
  const [scopeDetails, setScopeDetails] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    const code = 'IP3-' + Math.floor(100000 + Math.random() * 900000);
    setTrackingCode(code);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFullName('');
    setEmail('');
    setOrganization('');
    setScopeDetails('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050a12]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#081220] rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-colors cursor-pointer border border-slate-700"
          aria-label="Close form"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <div className="space-y-2 pr-8">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#ff7e67]/10 text-[#ff7e67] border border-[#ff7e67]/30">
                IP3 Strategic Engagement
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
                Schedule Strategic Advisory & Policy Consultation
              </h3>
              <p className="text-xs text-slate-400">
                Submit your project parameters or feasibility inquiry. An IP3 Principal Advisor will respond within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dr. Aris Thorne"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050a12] border border-slate-800 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-[#ff7e67]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. thorne@dev-partner.org"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050a12] border border-slate-800 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-[#ff7e67]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    Organization / Ministry / Entity
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Asian Development Bank / Ministry"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050a12] border border-slate-800 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-[#ff7e67]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    Primary Advisory Service Needed
                  </label>
                  <select
                    value={advisoryType}
                    onChange={(e) => setAdvisoryType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#050a12] border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-[#ff7e67]"
                  >
                    <option value="Feasibility Study & Economic CBA">Feasibility Study & Economic CBA</option>
                    <option value="MERLA Framework & Evaluation">MERLA Framework & Program Evaluation</option>
                    <option value="Climate Action & ESG Strategy">Climate Action & ESG Decarbonization</option>
                    <option value="Digital Governance & Data Ecosystem">Digital Governance & Data Ecosystem</option>
                    <option value="Firm-Level Survey Management">Firm-Level Survey Management</option>
                    <option value="General Strategic Partnership">General Executive Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">
                  Project Scope or Specific Objectives
                </label>
                <textarea
                  rows={3}
                  value={scopeDetails}
                  onChange={(e) => setScopeDetails(e.target.value)}
                  placeholder="Provide brief context regarding project budget, target region, or feasibility timeline..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#050a12] border border-slate-800 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-[#ff7e67]"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-[#050a12] border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#ff7e67] shrink-0" />
                <span>All consultation details are protected under IP3 non-disclosure and institutional compliance guidelines.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-[#ff7e67] hover:bg-[#e06a54] text-white font-extrabold text-xs shadow-md shadow-[#ff7e67]/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Strategic Advisory Request</span>
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6 space-y-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-[#ff7e67]/10 border border-[#ff7e67]/30 flex items-center justify-center text-[#ff7e67] mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold text-slate-100">
                Advisory Inquiry Logged
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Thank you, <strong className="text-slate-100">{fullName}</strong>. Your request for <strong className="text-[#ff7e67]">{advisoryType}</strong> has been routed to the IP3 Executive Committee.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#050a12] border border-slate-800 max-w-md mx-auto text-left space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Institutional Reference ID:</span>
                <span className="font-mono font-bold text-[#ff7e67]">{trackingCode}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Assigned Advisory Group:</span>
                <span className="font-semibold text-slate-100">IP3 Principal Directorate</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Expected Initial Review:</span>
                <span className="font-semibold text-[#ff7e67]">Within 24 Hours</span>
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700 text-xs font-semibold cursor-pointer"
              >
                Return to Overview
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// ==========================================
// 9. MAIN EXPORTED SECTION COMPONENT
// ==========================================

interface Ip3PolicySectionProps {
  onNavigateFocus?: (sectionId?: string) => void;
}

export const Ip3PolicySection: React.FC<Ip3PolicySectionProps> = ({ onNavigateFocus }) => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleExploreFocus = () => {
    if (onNavigateFocus) {
      onNavigateFocus('#focus-areas');
    } else {
      const el = document.getElementById('focus-areas');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div id="methodology" className="w-full bg-[#081220] text-slate-100 font-sans selection:bg-[#ff7e67]/30 selection:text-white">
      {/* Policy Framework Tree Section */}
      <HeroTreeSection
        onExploreFocus={handleExploreFocus}
        onOpenContact={() => setIsContactOpen(true)}
        onNavigateFocus={onNavigateFocus}
      />

      {/* Systems Architecture & Implementation Engine Suite */}
      <SystemsArchitectureSection />

      {/* Interactive Services & Solutions Matrix */}
      <ServicesSection
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Translation, Not Theory: Implementation Architecture Framework Suite */}
      <MethodologyTranslationSection />

      {/* Action Research Projects Portfolio */}
      <ProjectsSection />

      {/* Strategic Consultation Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
};

export default Ip3PolicySection;
