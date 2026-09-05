import React, { useState } from 'react';
import { saveLead } from '../lib/contentStore';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle, MessageSquare, Calendar, Building, User, Mail } from 'lucide-react';
import { TalkFormData } from '../types';

interface LetsTalkModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode?: boolean;
}

export const LetsTalkModal: React.FC<LetsTalkModalProps> = ({ isOpen, onClose, darkMode = true }) => {
  const [formData, setFormData] = useState<TalkFormData>({
    name: '',
    email: '',
    organization: '',
    topic: 'Systemic Economic & Fiscal Reform',
    message: '',
    preferredDate: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await saveLead({
      source: 'lets-talk',
      inquiryType: 'consultation',
      name: formData.name,
      email: formData.email,
      organisation: formData.organization,
      topic: formData.topic,
      outline: formData.message,
      preferredDate: formData.preferredDate,
    });
    setLoading(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      organization: '',
      topic: 'Systemic Economic & Fiscal Reform',
      message: '',
      preferredDate: '',
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
          className="relative w-full max-w-xl rounded-3xl border border-slate-800 shadow-2xl overflow-hidden my-8 bg-[#081220] text-slate-100 font-sans"
        >
          {/* Top Bar */}
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#050a12]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#ff7e67]/10 border border-[#ff7e67]/30 text-[#ff7e67]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base tracking-tight text-slate-100">Executive Consultation</h3>
                <p className="text-xs text-slate-400 font-mono font-medium">Direct line to Executive Chairman & IP3 Policy Team</p>
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
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-100">Inquiry Dispatched</h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for connecting with IP3. Your consultation briefing request has been securely dispatched to <span className="text-[#ff7e67] font-semibold">Exec.Chair@ip3-bd.org</span>. Our executive office will review your inquiry within 24 hours.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#ff7e67] hover:bg-[#ff694f] text-slate-950 font-mono font-bold text-sm shadow-lg shadow-[#ff7e67]/20 transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#ff7e67]" /> Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700/80 bg-[#050a12] text-slate-100 placeholder-slate-600 focus:border-[#ff7e67] text-sm outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#2dd4bf]" /> Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="s.jenkins@ministry.gov"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700/80 bg-[#050a12] text-slate-100 placeholder-slate-600 focus:border-[#ff7e67] text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-[#ff7e67]" /> Organization / Ministry *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ministry of Finance"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700/80 bg-[#050a12] text-slate-100 placeholder-slate-600 focus:border-[#ff7e67] text-sm outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#2dd4bf]" /> Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700/80 bg-[#050a12] text-slate-100 focus:border-[#ff7e67] text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">
                    Primary Strategic Topic *
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700/80 bg-[#050a12] text-slate-100 focus:border-[#ff7e67] text-sm outline-none transition-colors"
                  >
                    <option value="Systemic Economic & Fiscal Reform" className="bg-[#081220]">Systemic Economic & Fiscal Reform</option>
                    <option value="Institutional Resilience & Modernization" className="bg-[#081220]">Institutional Resilience & Modernization</option>
                    <option value="Climate Strategy & ESG Frameworks" className="bg-[#081220]">Climate Strategy & ESG Frameworks</option>
                    <option value="Educational Equity & EdTech Networks" className="bg-[#081220]">Educational Equity & EdTech Networks</option>
                    <option value="Executive Advisory & Policy Dialogue" className="bg-[#081220]">Executive Advisory & Policy Dialogue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">
                    Brief Overview / Executive Context *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide a short synopsis of your institutional requirements or discussion goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
                      <span>Processing...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-slate-950" />
                        <span>Dispatch Inquiry</span>
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
