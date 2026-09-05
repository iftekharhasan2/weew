import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { SystemNodeId } from '../data/systemsData';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDomain?: SystemNodeId | null;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialDomain,
}) => {
  const [selectedPillar, setSelectedPillar] = useState<string>(initialDomain || 'core');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [mandateScope, setMandateScope] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#02050a]/80 backdrop-blur-md cursor-pointer"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#081220] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto p-6 sm:p-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-400" />
                  <span className="font-mono text-xs uppercase tracking-widest text-teal-300 font-semibold">
                    STRATEGIC ENGAGEMENT
                  </span>
                </div>
                <h3 className="font-serif text-3xl font-bold text-white">
                  Consult our Systems Architects
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light">
                  Direct inquiry with IP3 Managing Partners and Principal Systems Integrators.
                </p>
              </div>

              {/* Pillar Selection */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Primary Transformation Domain
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'core', label: 'All Systems' },
                    { id: 'institutions', label: 'Institutions' },
                    { id: 'policy', label: 'Policy' },
                    { id: 'evidence', label: 'Evidence' },
                    { id: 'technology', label: 'Technology' },
                    { id: 'finance', label: 'Finance' },
                  ].map((p) => (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => setSelectedPillar(p.id)}
                      className={`p-2.5 rounded-xl text-xs font-mono tracking-wider uppercase border transition-all cursor-pointer ${
                        selectedPillar === p.id
                          ? 'bg-[#0f243b] border-teal-400 text-teal-200 shadow-[0_0_15px_rgba(45,212,191,0.2)]'
                          : 'bg-[#050b14] border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Helena Vance"
                    className="w-full bg-[#050c17] border border-slate-700/80 focus:border-teal-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">Institutional Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. vance@ministry.gov"
                    className="w-full bg-[#050c17] border border-slate-700/80 focus:border-teal-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400">
                  Institution / Government Entity / Organization
                </label>
                <input
                  type="text"
                  required
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Ministry of Digital Transformation / Central Bank"
                  className="w-full bg-[#050c17] border border-slate-700/80 focus:border-teal-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400">
                  Strategic Scope & Mandate Brief
                </label>
                <textarea
                  rows={3}
                  required
                  value={mandateScope}
                  onChange={(e) => setMandateScope(e.target.value)}
                  placeholder="Briefly describe the policy intent, implementation bottleneck, or capital mobilization goal..."
                  className="w-full bg-[#050c17] border border-slate-700/80 focus:border-teal-400 rounded-xl p-3 text-sm text-white placeholder:text-slate-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#ff7e67] hover:bg-[#ff8f7b] text-[#070d18] font-mono font-bold text-xs tracking-wider uppercase py-3.5 rounded-full transition-all shadow-[0_4px_20px_rgba(255,126,103,0.3)] cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Strategic Inquiry</span>
              </button>
            </form>
          ) : (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-3xl font-bold text-white">
                Inquiry Logged into Protocol
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto font-light">
                Thank you, <span className="text-white font-semibold">{name}</span>. An IP3 Principal Systems Architect will review your brief for <span className="text-teal-300 font-semibold">{organization}</span> and respond within 24 hours.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#0d1f33] border border-slate-700 text-xs font-mono text-slate-300 hover:text-white uppercase tracking-wider cursor-pointer"
              >
                Close Window
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
