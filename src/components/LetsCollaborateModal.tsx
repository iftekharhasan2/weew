import React, { useState } from 'react';
import { saveLead } from '../lib/contentStore';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, CheckCircle2, Building2, User, Mail, Globe, Layers, Clock } from 'lucide-react';
import { CollaborationFormData } from '../types';

interface LetsCollaborateModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode?: boolean;
  preselectedArea?: string;
}

export const LetsCollaborateModal: React.FC<LetsCollaborateModalProps> = ({
  isOpen,
  onClose,
  darkMode = true,
  preselectedArea = 'Multi-Domain System Transformation',
}) => {
  const [formData, setFormData] = useState<CollaborationFormData>({
    organizationName: '',
    contactName: '',
    email: '',
    organizationType: 'Multilateral Agency',
    focusArea: preselectedArea,
    projectOverview: '',
    estimatedTimeline: '6-12 Months',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await saveLead({
      source: 'lets-collaborate',
      inquiryType: 'collaboration',
      name: formData.contactName,
      email: formData.email,
      organisation: formData.organizationName,
      orgType: formData.organizationType,
      focusArea: formData.focusArea,
      outline: formData.projectOverview,
      timeline: formData.estimatedTimeline,
    });
    setLoading(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      organizationName: '',
      contactName: '',
      email: '',
      organizationType: 'Multilateral Agency',
      focusArea: preselectedArea,
      projectOverview: '',
      estimatedTimeline: '6-12 Months',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-[#050a12]/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl rounded-3xl border border-slate-800 shadow-2xl overflow-hidden my-8 bg-[#081220] text-slate-100 font-sans"
        >
          {/* Top Bar */}
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#050a12]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#ff7e67]/10 border border-[#ff7e67]/30 text-[#ff7e67]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base tracking-tight text-slate-100">Systemic Impact Partnership</h3>
                <p className="text-xs text-slate-400 font-mono font-medium">IP3 Institutional Co-Creation & Action Research</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#ff7e67]/10 border border-[#ff7e67]/30 text-[#ff7e67] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-100">Partnership Proposal Received</h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Your collaboration framework proposal for <span className="text-[#ff7e67] font-semibold">{formData.organizationName || 'your institution'}</span> has been routed directly to the IP3 Executive Steering Group. We look forward to scaling tangible, evidence-based impact together.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#ff7e67] hover:bg-[#ff694f] text-slate-950 font-mono font-bold text-sm shadow-lg shadow-[#ff7e67]/20 transition-all cursor-pointer"
                >
                  Return to Briefing
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#ff7e67]" /> Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. World Development Fund"
                      value={formData.organizationName}
                      onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700/80 bg-[#050a12] text-slate-100 placeholder-slate-600 focus:border-[#ff7e67] text-sm outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#2dd4bf]" /> Institution Type *
                    </label>
                    <select
                      value={formData.organizationType}
                      onChange={(e) => setFormData({ ...formData, organizationType: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700/80 bg-[#050a12] text-slate-100 focus:border-[#ff7e67] text-sm outline-none transition-colors"
                    >
                      <option value="Government" className="bg-[#081220]">Government / Public Agency</option>
                      <option value="Multilateral Agency" className="bg-[#081220]">Multilateral Agency / Development Bank</option>
                      <option value="Private Enterprise" className="bg-[#081220]">Private Enterprise / Sovereign Fund</option>
                      <option value="Academic / NGO" className="bg-[#081220]">Academic / NGO Research Hub</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#ff7e67]" /> Lead Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Director General David Chen"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700/80 bg-[#050a12] text-slate-100 placeholder-slate-600 focus:border-[#ff7e67] text-sm outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#2dd4bf]" /> Contact Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="d.chen@wdf-global.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700/80 bg-[#050a12] text-slate-100 placeholder-slate-600 focus:border-[#ff7e67] text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#ff7e67]" /> Collaboration Focus Area *
                    </label>
                    <select
                      value={formData.focusArea}
                      onChange={(e) => setFormData({ ...formData, focusArea: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700/80 bg-[#050a12] text-slate-100 focus:border-[#ff7e67] text-sm outline-none transition-colors"
                    >
                      <option value="Economic Reform & Growth" className="bg-[#081220]">Economic Reform & Macroeconomic Modeling</option>
                      <option value="Institutional Resilience & Governance" className="bg-[#081220]">Institutional Resilience & Digital Governance</option>
                      <option value="Sustainability & Climate Strategy" className="bg-[#081220]">Sustainability & Climate Risk Analytics</option>
                      <option value="Educational Equity & Skills" className="bg-[#081220]">Educational Equity & Frontier EdTech</option>
                      <option value="Multi-Domain System Transformation" className="bg-[#081220]">Multi-Domain System Transformation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#2dd4bf]" /> Estimated Timeline
                    </label>
                    <select
                      value={formData.estimatedTimeline}
                      onChange={(e) => setFormData({ ...formData, estimatedTimeline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700/80 bg-[#050a12] text-slate-100 focus:border-[#ff7e67] text-sm outline-none transition-colors"
                    >
                      <option value="1-3 Months (Rapid Deployment)" className="bg-[#081220]">1-3 Months (Rapid Assessment)</option>
                      <option value="3-6 Months" className="bg-[#081220]">3-6 Months (Policy Design & Prototyping)</option>
                      <option value="6-12 Months" className="bg-[#081220]">6-12 Months (Full Strategic Implementation)</option>
                      <option value="Multi-Year Strategic Alliance" className="bg-[#081220]">Multi-Year Strategic Alliance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">
                    Project Overview & Expected Objectives *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the scope, regional focus, and key target outcomes of this collaborative initiative..."
                    value={formData.projectOverview}
                    onChange={(e) => setFormData({ ...formData, projectOverview: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700/80 bg-[#050a12] text-slate-100 placeholder-slate-600 focus:border-[#ff7e67] text-sm outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#ff7e67] hover:bg-[#ff694f] text-slate-950 font-mono text-xs font-bold shadow-lg shadow-[#ff7e67]/20 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Submitting Proposal...</span>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                        <span>Submit Partnership Proposal</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
