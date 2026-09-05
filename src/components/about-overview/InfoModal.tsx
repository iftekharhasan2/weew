import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface InfoModalProps {
  data: {
    title: string;
    description: string;
    details?: string[];
  } | null;
  onClose: () => void;
  onAction?: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ data, onClose, onAction }) => {
  if (!data) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-[#12202B] border border-[#3C3F45] text-[#F3F0E8] rounded-2xl shadow-2xl overflow-hidden my-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#EF715A] to-[#E05E47] text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-xs font-mono uppercase tracking-wider text-white">
                IP3 Practice Overview
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 space-y-5">
            <h3 className="text-2xl font-cardo font-bold text-[#F3F0E8] leading-tight">
              {data.title}
            </h3>

            <p className="text-[#AEB0AE] text-sm sm:text-base leading-relaxed">
              {data.description}
            </p>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#AEB0AE]">
                Methodological Highlights
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#F3F0E8]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#EF715A] shrink-0 mt-0.5" />
                  <span>Translational policy loop connecting evidence with field implementation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#EF715A] shrink-0 mt-0.5" />
                  <span>Interdisciplinary team architecture uniting economists, technologists &amp; practitioners.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#EF715A] shrink-0 mt-0.5" />
                  <span>Custom analytical models tailored to the socioeconomic contexts of the Global South.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-[#3C3F45] flex items-center justify-between">
              <button
                onClick={() => {
                  onClose();
                  if (onAction) onAction();
                }}
                className="px-5 py-2.5 bg-[#EF715A] hover:bg-[#E05E47] text-white text-xs font-semibold rounded-lg shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Discuss with Our Team</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onClose}
                className="text-xs text-[#AEB0AE] hover:text-[#F3F0E8] font-medium cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
