import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ActorNode } from '../types';
import { X, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ActorDetailCardProps {
  actor: ActorNode | null;
  onClose: () => void;
  onSelectNext: () => void;
}

export const ActorDetailCard: React.FC<ActorDetailCardProps> = ({
  actor,
  onClose,
  onSelectNext,
}) => {
  if (!actor) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="actor-detail-card"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-full mt-6 bg-[#0a121f]/90 border border-slate-800/90 rounded-xl p-4 sm:p-5 backdrop-blur-xl shadow-2xl relative overflow-hidden text-slate-100"
        style={{
          borderLeft: `3px solid ${actor.accentColor}`,
        }}
      >
        {/* Subtle accent corner glow */}
        <div
          className="absolute -right-10 -bottom-10 w-36 h-36 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: actor.accentColor }}
        />

        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded border font-semibold"
                style={{
                  color: actor.accentColor,
                  borderColor: `${actor.accentColor}40`,
                  backgroundColor: `${actor.accentColor}10`,
                }}
              >
                {actor.category}
              </span>
              <span className="text-xs text-slate-400 capitalize">
                · {actor.ring} Orbit
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-slate-100 mt-1 font-semibold">
              {actor.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#ff7e67] font-medium mt-0.5">
              {actor.role}
            </p>
          </div>

          <button
            id="close-detail-button"
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800/60 transition-colors"
            title="Close details"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Convening Mechanism */}
        <div className="text-xs sm:text-[13px] text-slate-300 leading-relaxed mb-3.5 bg-[#050a12]/80 p-3 rounded-lg border border-slate-800/80">
          <p className="font-medium text-slate-400 text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1.5 font-mono">
            <Sparkles className="w-3 h-3 text-[#2dd4bf]" />
            IP³ Convening Alignment
          </p>
          {actor.conveningMechanism}
        </div>

        {/* Deliverables / Core Contributions */}
        <div className="space-y-1.5 mb-3.5">
          <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            Shared Delivery Outcomes:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {actor.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-1.5 text-xs text-slate-300 bg-slate-900/60 p-2 rounded border border-slate-800/60"
              >
                <CheckCircle2
                  className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                  style={{ color: actor.accentColor }}
                />
                <span className="leading-tight">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
          <span className="text-slate-400 text-[11px]">
            Aligned through IP³ Neutral Governance Architecture
          </span>
          <button
            type="button"
            onClick={onSelectNext}
            className="flex items-center gap-1 text-[#ff7e67] hover:text-[#ff9d8c] font-medium transition-colors cursor-pointer"
          >
            Next Stakeholder <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
