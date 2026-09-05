import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Compass, Sparkles, AlertTriangle, ShieldCheck, Activity } from 'lucide-react';
import { SystemItem, SystemOverlap } from '../types';

interface SystemDetailPanelProps {
  system: SystemItem | null;
  allSystems?: SystemItem[];
  onClose: () => void;
  onSelectSystemById?: (id: string) => void;
  onSelectOverlap?: (system: SystemItem, overlap: SystemOverlap, target: SystemItem) => void;
}

export const SystemDetailPanel: React.FC<SystemDetailPanelProps> = ({
  system,
  allSystems,
  onClose,
  onSelectOverlap,
}) => {
  if (!system) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pb-12"
      >
        <div
          className="relative rounded-2xl bg-[#090f1d]/95 border border-slate-800/80 backdrop-blur-xl overflow-hidden shadow-2xl p-6 sm:p-8"
          style={{
            boxShadow: `0 20px 50px -10px rgba(0, 0, 0, 0.7), 0 0 40px -15px ${system.glowColor.replace(
              '0.7',
              '0.2'
            )}`,
          }}
        >
          {/* Ambient Top Glow Line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: `linear-gradient(90deg, transparent, ${system.color}, transparent)`,
            }}
          />

          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/70">
            <div className="flex items-center gap-3.5">
              <span
                className="w-3.5 h-3.5 rounded-full shrink-0"
                style={{
                  backgroundColor: system.color,
                  boxShadow: `0 0 14px ${system.color}`,
                }}
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold font-sans-body">
                    {system.category}
                  </span>
                  <span className="text-slate-600 text-xs">•</span>
                  <span className="text-xs text-slate-400 font-mono">
                    System {allSystems ? `0${allSystems.indexOf(system) + 1} of 08` : ''}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight font-sans-body">
                  {system.name}
                </h2>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-700/40 cursor-pointer"
                aria-label="Close panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Core Mandate Section */}
          <div className="pt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3.5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <Compass className="w-4 h-4 text-[#ff7e67]" />
                  Core Strategic Mandate
                </div>
                <p className="text-lg sm:text-xl text-slate-100 leading-relaxed font-sans-body font-light">
                  {system.coreMandate}
                </p>
                <p className="text-sm text-slate-400 leading-relaxed pt-1">
                  {system.summary}
                </p>
              </div>

              {/* Overlaps Links */}
              {system.overlaps && system.overlaps.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#2dd4bf]" />
                    Mapped Cross-System Interconnections
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {system.overlaps.map((overlap, idx) => {
                      const target = allSystems?.find((s) => s.id === overlap.targetSystemId);
                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            if (target && onSelectOverlap) {
                              onSelectOverlap(system, overlap, target);
                            }
                          }}
                          className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-[#ff7e67]/50 hover:bg-slate-900/80 transition-all cursor-pointer space-y-1.5 group"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-[#ff7e67] group-hover:underline">
                              ↔ {overlap.targetSystemName}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">Inspect</span>
                          </div>
                          <p className="text-xs text-slate-300 font-medium line-clamp-1">
                            {overlap.overlapTitle}
                          </p>
                          <p className="text-[11px] text-slate-400 line-clamp-2">
                            {overlap.synergyDescription}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Metrics & Drivers */}
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  Key Metrics
                </div>
                <div className="space-y-2">
                  {system.metrics.map((m, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between"
                    >
                      <span className="text-xs text-slate-400">{m.label}</span>
                      <span className="text-sm font-mono font-bold text-white">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  Key Drivers
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {system.keyDrivers.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: system.color }}
                      />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
