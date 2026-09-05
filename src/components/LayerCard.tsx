import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { LayerData } from '../types';

interface LayerCardProps {
  layer: LayerData;
  index: number;
  isSelected: boolean;
  onSelect: (layer: LayerData) => void;
  onCycle?: () => void;
  isCycling?: boolean;
}

export const LayerCard: React.FC<LayerCardProps> = ({
  layer,
  isSelected,
  onSelect,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped((prev) => !prev);
    onSelect(layer);
  };

  return (
    <div
      id={`card-${layer.id}`}
      style={{ perspective: 1200 }}
      className="w-full min-h-[380px] h-full"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
        onClick={handleClick}
        className="relative w-full h-full min-h-[380px] cursor-pointer"
      >
        {/* ================= CARD FRONT ================= */}
        <div
          style={{ backfaceVisibility: 'hidden' }}
          className={`absolute inset-0 rounded-2xl p-6 sm:p-7 border flex flex-col justify-between transition-colors duration-300 overflow-hidden ${
            isSelected
              ? 'bg-[#0b1728] border-[#ff7e67]/60 ring-1 ring-[#ff7e67]/30 shadow-2xl'
              : 'bg-[#081220] border-slate-800 hover:border-slate-700 hover:bg-[#0b1728]'
          }`}
        >
          {/* Subtle Corner Glow when selected */}
          {isSelected && (
            <div
              className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-40 pointer-events-none"
              style={{ backgroundColor: layer.accentColor }}
            />
          )}

          {/* Top Dash Sequence Indicator */}
          <div id={`dash-indicator-${layer.id}`} className="flex items-center gap-1.5 mb-6">
            {[0, 1, 2].map((dashIdx) => {
              const isActive = dashIdx === layer.activeIndex;
              return (
                <div
                  key={dashIdx}
                  className="h-1 rounded-full transition-all duration-500"
                  style={{
                    width: isActive ? '28px' : '10px',
                    backgroundColor: isActive ? layer.activeDashColor : layer.inactiveDashColor,
                    boxShadow: isActive ? `0 0 8px ${layer.activeDashColor}60` : 'none',
                  }}
                />
              );
            })}
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-between space-y-4">
            <div>
              <span
                id={`layer-tag-${layer.id}`}
                className="font-mono text-[11px] uppercase tracking-widest block mb-2 transition-colors"
                style={{ color: isSelected ? layer.accentColor : '#94a3b8' }}
              >
                {layer.layerNumber}
              </span>
              <h3
                id={`layer-title-${layer.id}`}
                className="text-[26px] sm:text-[33px] text-slate-100 font-semibold leading-snug tracking-tight mb-3"
              >
                {layer.title}
              </h3>
              <p
                id={`layer-desc-${layer.id}`}
                className="text-[16px] text-slate-400 font-light leading-relaxed"
              >
                {layer.description}
              </p>
            </div>
          </div>
        </div>

        {/* ================= CARD BACK (MESSAGE & DETAILS) ================= */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          className="absolute inset-0 rounded-2xl p-6 sm:p-7 bg-[#0b1728] border border-[#ff7e67]/50 ring-1 ring-[#ff7e67]/20 shadow-2xl flex flex-col justify-between overflow-hidden"
        >
          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span
                className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${layer.accentColor}20`, color: layer.accentColor }}
              >
                {layer.layerNumber} • ARCHITECTURE DETAILS
              </span>
            </div>
            <button
              onClick={handleClick}
              className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Flip Back</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="space-y-3.5 py-3 overflow-y-auto pr-1">
            <h4 className="text-sm font-serif font-bold text-slate-100 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: layer.accentColor }} />
              {layer.title} Strategic Capabilities
            </h4>

            {/* Capabilities List */}
            <div className="space-y-1.5">
              {layer.capabilities?.map((cap, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#ff7e67] mt-0.5" style={{ color: layer.accentColor }} />
                  <span>{cap}</span>
                </div>
              ))}
            </div>

            {/* Case Example Highlight */}
            {layer.caseExample && (
              <div className="bg-[#050a12]/90 rounded-xl p-3 border border-slate-800/80 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                  Implementation Impact:
                </span>
                <p className="text-xs text-slate-300 font-medium">
                  {layer.caseExample.summary}
                </p>
                <div className="text-[11px] font-mono text-[#ff7e67] pt-1" style={{ color: layer.accentColor }}>
                  Deliverable: {layer.caseExample.deliverable}
                </div>
              </div>
            )}
          </div>

          {/* Footer Flip Back Action */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-[10px] text-slate-400">Click anywhere to flip back</span>
            <div className="flex items-center gap-1 text-[#ff7e67]" style={{ color: layer.accentColor }}>
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold">Return</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

