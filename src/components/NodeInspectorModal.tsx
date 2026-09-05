import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ShieldCheck, Sparkles, Network, CheckCircle2 } from 'lucide-react';
import { SYSTEM_NODES, SystemNodeId } from '../data/systemsData';

interface NodeInspectorModalProps {
  nodeId: SystemNodeId | null;
  onClose: () => void;
  onSelectAnotherNode: (nodeId: SystemNodeId) => void;
  onConsultDomain: (nodeId: SystemNodeId) => void;
}

export const NodeInspectorModal: React.FC<NodeInspectorModalProps> = ({
  nodeId,
  onClose,
  onSelectAnotherNode,
  onConsultDomain,
}) => {
  if (!nodeId) return null;

  const node = SYSTEM_NODES[nodeId];
  if (!node) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#02050a]/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#081220] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Top Header Banner */}
          <div className="relative px-6 sm:px-8 py-6 border-b border-slate-800 bg-gradient-to-r from-[#0b1b30] to-[#060e1a] flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: node.color }}
                />
                <span className="font-mono text-xs uppercase tracking-widest text-slate-400 font-semibold">
                  SYSTEM PILLAR • {node.category}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {node.label}
              </h2>
              <p className="text-sm text-slate-300 font-light">
                {node.tagline}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body Content */}
          <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
            {/* Overview Section */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-wider text-teal-300 font-semibold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                Strategic Mandate & Architecture
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                {node.extendedOverview}
              </p>
            </div>

            {/* Key Performance Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {node.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-[#050d18] border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-1"
                >
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    {m.label}
                  </span>
                  <span
                    className="font-serif text-3xl font-bold"
                    style={{ color: node.color }}
                  >
                    {m.value}
                  </span>
                  <span className="text-[11px] text-slate-500 font-light">
                    {m.subtext}
                  </span>
                </div>
              ))}
            </div>

            {/* Core Capabilities */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Core Capabilities & Deliverables
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {node.keyCapabilities.map((cap, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 bg-[#0a1728]/60 border border-slate-800/80 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Case Study Highlight */}
            <div className="bg-gradient-to-br from-[#0c1c30] to-[#06101c] border border-teal-500/30 rounded-xl p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-mono text-teal-300 font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                Featured Deployment Highlight
              </div>
              <h4 className="font-serif text-xl font-bold text-white">
                {node.caseStudyHighlight.title}
              </h4>
              <p className="text-xs text-slate-300">
                <span className="text-slate-400 font-semibold">Context: </span>
                {node.caseStudyHighlight.context}
              </p>
              <p className="text-xs text-teal-200">
                <span className="text-teal-400 font-semibold">Outcome: </span>
                {node.caseStudyHighlight.outcome}
              </p>
            </div>

            {/* Interconnected System Overlaps */}
            <div className="space-y-3 pt-2">
              <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-2">
                <Network className="w-3.5 h-3.5" />
                Interconnected System Overlaps
              </h3>
              <div className="flex flex-wrap gap-2">
                {node.connections.map((connId) => {
                  const target = SYSTEM_NODES[connId];
                  if (!target) return null;
                  return (
                    <button
                      key={connId}
                      onClick={() => onSelectAnotherNode(connId)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#091524] hover:bg-[#0f243d] border border-slate-700 hover:border-slate-500 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: target.color }}
                      />
                      <span>{target.label}</span>
                      <ArrowRight className="w-3 h-3 text-slate-500" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="px-6 sm:px-8 py-4 bg-[#050c16] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs font-mono text-slate-500">
              IP3 Implementation Architecture Framework
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2 rounded-full border border-slate-700 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-500 transition-colors cursor-pointer"
              >
                Close Inspector
              </button>
              <button
                onClick={() => {
                  onClose();
                  onConsultDomain(nodeId);
                }}
                className="flex-1 sm:flex-none px-5 py-2 rounded-full bg-[#ff7e67] hover:bg-[#ff8f7b] text-[#080d17] text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
              >
                Consult on {node.label}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
