import React, { useState } from 'react';
import { WORKFLOW_STAGES } from '../data/systemsData';
import { ArrowRight, CheckCircle2, FileText, ChevronRight } from 'lucide-react';

interface HowWeWorkProps {
  onExploreArchitecture: () => void;
}

export const HowWeWorkSection: React.FC<HowWeWorkProps> = ({ onExploreArchitecture }) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeStage = WORKFLOW_STAGES[activeStageIndex];

  return (
    <section
      id="how-we-work"
      className="relative py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-t border-slate-800/80"
    >
      {/* Section Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-400" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-teal-300 font-semibold">
            IMPLEMENTATION ARCHITECTURE METHODOLOGY
          </span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
          How we transform policy intent into{' '}
          <span className="italic font-normal bg-clip-text text-transparent bg-gradient-to-r from-[#ff7e67] to-[#ffa190]">
            operational reality.
          </span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
          Most strategic transformations fail during the handover between policy advisory and technical execution. IP3 integrates the entire lifecycle through a continuous architecture framework.
        </p>
      </div>

      {/* 4-Stage Interactive Pipeline */}
      <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Step Navigation List */}
        <div className="lg:col-span-5 space-y-3">
          {WORKFLOW_STAGES.map((stage, idx) => {
            const isActive = activeStageIndex === idx;
            return (
              <button
                key={stage.step}
                onClick={() => setActiveStageIndex(idx)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-start justify-between cursor-pointer ${
                  isActive
                    ? 'bg-[#0a182b] border-teal-500/60 shadow-[0_0_30px_rgba(20,184,166,0.15)] ring-1 ring-teal-500/40'
                    : 'bg-[#060e19]/60 border-slate-800/80 hover:bg-[#091524] hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className="space-y-1 pr-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                        isActive
                          ? 'bg-teal-400/20 text-teal-300 border border-teal-400/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      PHASE {stage.step}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {stage.subtitle}
                    </span>
                  </div>
                  <h3
                    className={`font-serif text-xl font-semibold mt-1 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-300'
                    }`}
                  >
                    {stage.title}
                  </h3>
                </div>
                <ChevronRight
                  className={`w-5 h-5 mt-2 shrink-0 transition-transform ${
                    isActive ? 'text-teal-400 translate-x-1' : 'text-slate-600'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right Side: Active Phase Deep Dive Panel */}
        <div className="lg:col-span-7 bg-gradient-to-br from-[#0a1626] to-[#040a12] border border-slate-700/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Background Grid */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-teal-400 font-bold uppercase tracking-widest">
                  STAGE SPECIFICATION
                </span>
              </div>
              <span className="font-mono text-xs text-slate-500">
                PHASE {activeStage.step} OF 04
              </span>
            </div>

            {/* Title & Description */}
            <div className="space-y-3">
              <h3 className="font-serif text-3xl font-bold text-white">
                {activeStage.title}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                {activeStage.description}
              </p>
            </div>

            {/* Concrete Deliverable Box */}
            <div className="bg-[#050c17] border border-teal-500/30 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-teal-300 uppercase tracking-wider font-semibold">
                <FileText className="w-4 h-4 text-teal-400" />
                Primary Institutional Deliverable
              </div>
              <p className="text-white font-medium text-sm sm:text-base">
                {activeStage.output}
              </p>
            </div>

            {/* Architecture Tooling & Frameworks */}
            <div className="space-y-2.5">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Integrated Systems & Analysis Tooling
              </span>
              <div className="flex flex-wrap gap-2">
                {activeStage.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0d1f33] border border-slate-700/80 text-xs font-mono text-slate-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500">
              Rigorous, empirical, and institution-ready.
            </span>
            <button
              onClick={onExploreArchitecture}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-teal-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>Explore Full Systems Overview</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
