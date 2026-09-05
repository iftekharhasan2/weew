import React from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, AlertTriangle, ShieldCheck, BarChart3, ArrowRight } from 'lucide-react';
import { SystemItem, SystemOverlap } from '../types';

interface OverlapModalProps {
  primarySystem: SystemItem;
  overlap: SystemOverlap;
  targetSystem: SystemItem;
  onClose: () => void;
  onPivotToTarget: (targetId: string) => void;
}

export const OverlapModal: React.FC<OverlapModalProps> = ({
  primarySystem,
  overlap,
  targetSystem,
  onClose,
  onPivotToTarget,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl rounded-2xl bg-[#090f1d] border border-slate-700/80 shadow-2xl p-6 sm:p-8 overflow-hidden"
      >
        {/* Glowing dual-color header line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, ${primarySystem.color}, ${targetSystem.color})`,
          }}
        />

        {/* Top bar */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-200">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: primarySystem.color }}
                />
                {primarySystem.name}
              </span>
              <ArrowRight className="w-3 h-3 text-slate-500" />
              <span className="flex items-center gap-1.5 text-slate-200">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: targetSystem.color }}
                />
                {targetSystem.name}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight pt-1 font-sans-body">
              {overlap.overlapTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content sections */}
        <div className="space-y-4 py-5 max-h-[70vh] overflow-y-auto pr-1">
          {/* Synergy Overview */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              Systemic Nexus & Synergy
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans-body">
              {overlap.synergyDescription}
            </p>
          </div>

          {/* Compound Risk */}
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-400">
              <AlertTriangle className="w-3.5 h-3.5" />
              Compound Vulnerability If Unaddressed
            </div>
            <p className="text-xs sm:text-sm text-rose-200/90 leading-relaxed">
              {overlap.compoundRisk}
            </p>
          </div>

          {/* Joint Strategic Intervention */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Recommended Joint Policy Intervention
            </div>
            <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
              {overlap.jointIntervention}
            </p>
          </div>

          {/* Shared Metrics */}
          {overlap.sharedMetrics && overlap.sharedMetrics.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <BarChart3 className="w-3.5 h-3.5 text-slate-400" />
                Cross-System Verification Metrics
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {overlap.sharedMetrics.map((m, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-slate-800 text-xs font-mono text-slate-300 border border-slate-700/50"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={() => {
              onClose();
              onPivotToTarget(targetSystem.id);
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs sm:text-sm font-medium text-white transition-colors cursor-pointer"
          >
            Explore {targetSystem.name}
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
