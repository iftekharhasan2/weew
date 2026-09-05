import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, Mail, Building, User, FileText } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    practiceArea: 'Climate Action & ESG',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // auto-reset after delay
    }, 4000);
  };

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
            <div>
              <h3 className="text-lg font-cardo font-semibold">Initiate an Engagement</h3>
              <p className="text-xs text-white/90">Institute for Public Policy &amp; Practice (IP3)</p>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#152735] text-[#EF715A] border border-[#3C3F45] mx-auto flex items-center justify-center shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-cardo text-[#F3F0E8] font-bold">
                  Engagement Request Sent
                </h4>
                <p className="text-xs sm:text-sm text-[#AEB0AE] max-w-md mx-auto">
                  Thank you, <strong>{formData.name || 'Partner'}</strong>. An IP3 Principal Advisor will review your query and reach out within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="mt-4 px-6 py-2.5 bg-[#EF715A] text-white text-xs font-semibold rounded-lg hover:bg-[#E05E47] transition-colors cursor-pointer"
                >
                  Done
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#AEB0AE] uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#EF715A]" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Ayesha Siddiqua"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#3C3F45] bg-[#152735] text-[#F3F0E8] placeholder:text-[#5A6267] text-sm focus:outline-none focus:ring-2 focus:ring-[#EF715A] focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#AEB0AE] uppercase tracking-wider flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#EF715A]" />
                      <span>Email Address *</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. ayesha@ministry.gov"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#3C3F45] bg-[#152735] text-[#F3F0E8] placeholder:text-[#5A6267] text-sm focus:outline-none focus:ring-2 focus:ring-[#EF715A] focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#AEB0AE] uppercase tracking-wider flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-[#EF715A]" />
                      <span>Organization / Ministry</span>
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Planning Commission"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#3C3F45] bg-[#152735] text-[#F3F0E8] placeholder:text-[#5A6267] text-sm focus:outline-none focus:ring-2 focus:ring-[#EF715A] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#AEB0AE] uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#EF715A]" />
                    <span>Practice Area Interest</span>
                  </label>
                  <select
                    value={formData.practiceArea}
                    onChange={(e) => setFormData({ ...formData, practiceArea: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#3C3F45] bg-[#152735] text-[#F3F0E8] text-sm focus:outline-none focus:ring-2 focus:ring-[#EF715A] focus:border-transparent"
                  >
                    <option value="Climate Action, ESG Strategy & Sustainability Solutions" className="bg-[#152735] text-[#F3F0E8]">Climate Action, ESG Strategy &amp; Sustainability Solutions</option>
                    <option value="Public Policy Innovation & Action Research" className="bg-[#152735] text-[#F3F0E8]">Public Policy Innovation &amp; Action Research</option>
                    <option value="Educational Innovation & EdTech" className="bg-[#152735] text-[#F3F0E8]">Educational Innovation &amp; EdTech</option>
                    <option value="Data & Digital Governance" className="bg-[#152735] text-[#F3F0E8]">Data &amp; Digital Governance</option>
                    <option value="Monitoring, Evaluation & Learning (MERLA)" className="bg-[#152735] text-[#F3F0E8]">Monitoring, Evaluation &amp; Learning (MERLA)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#AEB0AE] uppercase tracking-wider">
                    Scope of Advisory or Research Need *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your objectives, timelines, or institutional challenges..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#3C3F45] bg-[#152735] text-[#F3F0E8] placeholder:text-[#5A6267] text-sm focus:outline-none focus:ring-2 focus:ring-[#EF715A] focus:border-transparent resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#EF715A] hover:bg-[#E05E47] text-white font-medium text-sm rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
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
