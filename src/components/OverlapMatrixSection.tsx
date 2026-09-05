import React, { useState } from 'react';
import { OVERLAP_MATRIX, SystemNodeId } from '../data/systemsData';
import { Sparkles, Check, Zap } from 'lucide-react';

interface OverlapMatrixProps {
  onSelectNode: (nodeId: SystemNodeId) => void;
}

export const OverlapMatrixSection: React.FC<OverlapMatrixProps> = ({ onSelectNode }) => {
  const [selectedIntersectionId, setSelectedIntersectionId] = useState<string>(OVERLAP_MATRIX[0].id);

  const activeIntersection =
    OVERLAP_MATRIX.find((item) => item.id === selectedIntersectionId) || OVERLAP_MATRIX[0];

  return (
    <section
      id="overlap-matrix"
      className="relative py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-t border-slate-800/80"
    >
      {/* Section Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ff7e67]" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff7e67] font-semibold">
            THE IP3 INTEGRATION ENGINE
          </span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
          System Overlaps &{' '}
          <span className="italic font-normal bg-clip-text text-transparent bg-gradient-to-r from-[#ff7e67] to-[#ffa190]">
            Cross-Domain Convergence.
          </span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
          The true power of IP3 lies at the intersections. Explore how combining multiple disciplines creates non-linear breakthroughs in state capacity and economic resilience.
        </p>
      </div>

      {/* Interactive Matrix Selector */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Overlap Intersections */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
            SELECT SYSTEM INTERSECTION:
          </div>
          {OVERLAP_MATRIX.map((item) => {
            const isSelected = selectedIntersectionId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedIntersectionId(item.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#1a0f0d] border-[#ff7e67]/80 shadow-[0_0_20px_rgba(255,126,103,0.2)] ring-1 ring-[#ff7e67]'
                    : 'bg-[#07111e]/70 border-slate-800 hover:bg-[#0b1b2f] text-slate-400'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-[#ff7e67]">
                      {item.title.split('(')[1]?.replace(')', '') || item.title}
                    </span>
                  </div>
                  <div
                    className={`font-serif text-base sm:text-lg font-semibold ${
                      isSelected ? 'text-white' : 'text-slate-300'
                    }`}
                  >
                    {item.title.split('(')[0]}
                  </div>
                </div>
                <Zap
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isSelected ? 'text-[#ff7e67]' : 'text-slate-600'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right Column: Intersecting Synthesis View */}
        <div className="lg:col-span-7 bg-gradient-to-b from-[#0a1728] to-[#040912] border border-slate-700/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ff7e67]" />
              <span className="font-mono text-xs text-[#ff7e67] font-bold uppercase tracking-widest">
                CONVERGENCE BLUEPRINT
              </span>
            </div>
            <span className="font-mono text-[11px] text-slate-400 bg-[#ff7e67]/10 border border-[#ff7e67]/20 px-2.5 py-1 rounded-full">
              {activeIntersection.architectureFocus}
            </span>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              {activeIntersection.title}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              {activeIntersection.description}
            </p>
          </div>

          {/* Intersecting Pillars Badge display */}
          <div className="flex flex-wrap items-center gap-3 p-3.5 bg-[#060e1a] border border-slate-800 rounded-xl">
            <button
              onClick={() => onSelectNode(activeIntersection.source)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a1626] border border-slate-700 text-xs font-mono text-slate-200 hover:text-white hover:border-slate-500 transition-colors cursor-pointer"
            >
              <span>{activeIntersection.source.toUpperCase()}</span>
            </button>
            <span className="text-[#ff7e67] font-mono text-xs font-bold">✕</span>
            <button
              onClick={() => onSelectNode(activeIntersection.target)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a1626] border border-slate-700 text-xs font-mono text-slate-200 hover:text-white hover:border-slate-500 transition-colors cursor-pointer"
            >
              <span>{activeIntersection.target.toUpperCase()}</span>
            </button>
            <span className="text-slate-500 font-mono text-xs">=</span>
            <span className="text-[#ff7e67] text-xs font-mono font-semibold">
              IP3 System Overlap Solution
            </span>
          </div>

          {/* Key Deliverables */}
          <div className="space-y-3">
            <span className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Engineered Deliverables & Implementation Outputs
            </span>
            <div className="space-y-2">
              {activeIntersection.deliverables.map((deliv, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-lg bg-[#071322] border border-slate-800/80 text-xs sm:text-sm text-slate-200"
                >
                  <Check className="w-4 h-4 text-[#ff7e67] shrink-0" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
