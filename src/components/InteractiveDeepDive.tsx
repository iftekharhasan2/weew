import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Layers,
  Sparkles,
  FileText,
  Activity,
  Cpu,
  RefreshCw,
  X
} from 'lucide-react';
import { LayerData } from '../types';

interface InteractiveDeepDiveProps {
  layer: LayerData;
  onClose?: () => void;
  onSelectNext: () => void;
}

export const InteractiveDeepDive: React.FC<InteractiveDeepDiveProps> = ({
  layer,
  onClose,
  onSelectNext,
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={layer.id}
        id={`deepdive-panel-${layer.id}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="mt-12 w-full rounded-2xl bg-[#12202B] border border-[#3C3F45] p-6 sm:p-8 backdrop-blur-md relative overflow-hidden"
        style={{
          boxShadow: `0 25px 50px -12px ${layer.glowColor}`,
        }}
      >
        {/* Ambient Top Glow */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-32 blur-3xl opacity-20 pointer-events-none rounded-full"
          style={{ backgroundColor: layer.accentColor }}
        />

        <div className="relative z-10">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#3C3F45]/60">
            <div className="flex items-center gap-3">
              <span
                className="font-mono text-xs font-bold tracking-widest px-2.5 py-1 rounded-md bg-[#0E1A22] border border-[#3C3F45]"
                style={{ color: layer.accentColor }}
              >
                {layer.layerNumber} SPECIFICATION
              </span>
              <h4 className="font-serif-custom text-2xl text-[#F3F0E8] font-normal">
                {layer.title} Engine & Operational Framework
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="btn-next-layer"
                onClick={onSelectNext}
                className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#AEB0AE] hover:text-[#F3F0E8] bg-[#152735] hover:bg-[#1c3345] px-3.5 py-1.5 rounded-lg border border-[#3C3F45] transition-all cursor-pointer"
              >
                <span>NEXT STAGE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {onClose && (
                <button
                  id="btn-close-deepdive"
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-[#AEB0AE] hover:text-[#F3F0E8] hover:bg-[#152735] transition-colors cursor-pointer"
                  aria-label="Close detailed view"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Grid Content: Capabilities & Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Core Capabilities */}
            <div className="lg:col-span-2 space-y-4">
              <h5 className="text-xs font-mono uppercase tracking-widest text-[#AEB0AE] flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" style={{ color: layer.accentColor }} />
                Core System Modules & Interventions
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {layer.capabilities.map((cap, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-[#0E1A22] border border-[#3C3F45]/80 text-xs text-[#AEB0AE]"
                  >
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: layer.accentColor }}
                    />
                    <span className="leading-snug text-[#F3F0E8]/90">{cap}</span>
                  </div>
                ))}
              </div>

              {/* Real World Application Snapshot */}
              <div className="p-4 rounded-xl bg-[#0E1A22] border border-[#3C3F45]/80">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-3.5 h-3.5 text-[#AEB0AE]" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#AEB0AE]">
                    Deployment Example: {layer.caseExample.title}
                  </span>
                </div>
                <p className="text-xs text-[#AEB0AE] font-light leading-relaxed">
                  {layer.caseExample.summary}
                </p>
                <div className="mt-2.5 pt-2 border-t border-[#3C3F45]/60 flex items-center gap-2">
                  <span className="text-[10px] font-mono text-[#5A6267] uppercase">Primary Artifact:</span>
                  <span className="text-[11px] font-medium text-[#F3F0E8]">
                    {layer.caseExample.deliverable}
                  </span>
                </div>
              </div>
            </div>

            {/* Live Metrics Column */}
            <div className="space-y-4">
              <h5 className="text-xs font-mono uppercase tracking-widest text-[#AEB0AE] flex items-center gap-2">
                <Activity className="w-3.5 h-3.5" style={{ color: layer.accentColor }} />
                Impact Telemetry
              </h5>

              <div className="grid grid-cols-1 gap-3">
                {layer.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-[#0E1A22] border border-[#3C3F45]/80 flex items-center justify-between"
                  >
                    <span className="text-xs text-[#AEB0AE] font-light">{m.label}</span>
                    <span
                      className="text-lg font-mono font-bold"
                      style={{ color: layer.accentColor }}
                    >
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-[#152735] border border-[#3C3F45]/80 flex items-center gap-2.5 text-[11px] text-[#AEB0AE]">
                <Cpu className="w-4 h-4 text-[#EF715A] shrink-0" />
                <span>Synchronized with active institutional adoption feedback loop</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
