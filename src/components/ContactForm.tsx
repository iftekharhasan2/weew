import React, { useState } from 'react';
import { ExternalLink, CheckCircle2, AlertCircle, RefreshCw, Send, Check } from 'lucide-react';
import { saveLead, nowLabel } from '../lib/contentStore';

interface ContactFormProps {
  onSwitchToConsultation?: () => void;
}

export type InquiryType = 'enquiry' | 'consultation' | 'collaboration';

export const ContactForm: React.FC<ContactFormProps> = ({ onSwitchToConsultation }) => {
  const [inquiryType, setInquiryType] = useState<InquiryType>('collaboration');
  
  const [formData, setFormData] = useState({
    organisation: '',
    orgType: 'Government / ministry',
    name: '',
    email: '',
    focusArea: '',
    outline: '',
    timeline: '',
    agreedToTerms: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<{ id: string; timestamp: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleTypeSelect = (type: InquiryType) => {
    setInquiryType(type);
    if (type === 'consultation' && onSwitchToConsultation) {
      onSwitchToConsultation();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!formData.outline.trim()) {
      setErrorMsg('Please provide a brief outline of the problem and desired outcomes.');
      return;
    }
    if (!formData.agreedToTerms) {
      setErrorMsg('Please agree to data storage and communication terms.');
      return;
    }

    setIsSubmitting(true);

    const res = await saveLead({
      source: 'contact-form',
      inquiryType,
      name: formData.name.trim(),
      email: formData.email.trim(),
      organisation: formData.organisation.trim(),
      orgType: formData.orgType,
      focusArea: formData.focusArea.trim(),
      outline: formData.outline.trim(),
      timeline: formData.timeline.trim(),
      meta: { agreedToTerms: formData.agreedToTerms }
    });

    setIsSubmitting(false);

    if (!res.ok) {
      setErrorMsg(res.error || 'We could not submit your enquiry. Please try again.');
      return;
    }

    setSubmittedTicket({
      id: res.ticketId,
      timestamp: res.timestamp || nowLabel()
    });
  };

  const handleReset = () => {
    setFormData({
      organisation: '',
      orgType: 'Government / ministry',
      name: '',
      email: '',
      focusArea: '',
      outline: '',
      timeline: '',
      agreedToTerms: true
    });
    setSubmittedTicket(null);
    setErrorMsg(null);
  };

  return (
    <div className="font-sans">
      {/* 3 Inquiry Type Toggle Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
        <button
          type="button"
          onClick={() => handleTypeSelect('enquiry')}
          className={`p-4 rounded-2xl text-left transition-all border cursor-pointer ${
            inquiryType === 'enquiry'
              ? 'bg-[#081220] border-[#ff7e67] shadow-lg shadow-[#ff7e67]/10 ring-1 ring-[#ff7e67]'
              : 'bg-[#081220]/60 hover:bg-[#081220] border-slate-800 text-slate-300'
          }`}
        >
          <div className="font-bold text-sm text-slate-100 mb-1">General enquiry</div>
          <div className="text-xs text-slate-400 leading-snug">
            Ask a question or describe a problem.
          </div>
        </button>

        <button
          type="button"
          onClick={() => handleTypeSelect('consultation')}
          className={`p-4 rounded-2xl text-left transition-all border cursor-pointer ${
            inquiryType === 'consultation'
              ? 'bg-[#081220] border-[#ff7e67] shadow-lg shadow-[#ff7e67]/10 ring-1 ring-[#ff7e67]'
              : 'bg-[#081220]/60 hover:bg-[#081220] border-slate-800 text-slate-300'
          }`}
        >
          <div className="font-bold text-sm text-slate-100 mb-1">Request a consultation</div>
          <div className="text-xs text-slate-400 leading-snug">
            Propose a time to speak with our team.
          </div>
        </button>

        <button
          type="button"
          onClick={() => handleTypeSelect('collaboration')}
          className={`p-4 rounded-2xl text-left transition-all border cursor-pointer ${
            inquiryType === 'collaboration'
              ? 'bg-[#081220] border-[#ff7e67] shadow-lg shadow-[#ff7e67]/10 ring-1 ring-[#ff7e67]'
              : 'bg-[#081220]/60 hover:bg-[#081220] border-slate-800 text-slate-300'
          }`}
        >
          <div className="font-bold text-sm text-slate-100 mb-1">Propose a collaboration</div>
          <div className="text-xs text-slate-400 leading-snug">
            Outline a partnership or joint programme.
          </div>
        </button>
      </div>

      {submittedTicket ? (
        <div className="bg-[#081220] rounded-2xl border border-slate-800 p-8 text-center shadow-lg">
          <div className="w-14 h-14 rounded-full bg-teal-950 text-[#2dd4bf] flex items-center justify-center mx-auto mb-4 border border-teal-800/40">
            <CheckCircle2 className="w-8 h-8 text-[#2dd4bf]" />
          </div>
          <span className="px-3 py-1 rounded-full bg-teal-950/80 text-[#2dd4bf] text-xs font-mono font-bold uppercase tracking-wider mb-2 inline-block border border-teal-800/50">
            Proposal Received
          </span>
          <h3 className="text-2xl font-bold text-slate-100 mb-2">
            Thank you, {formData.name}!
          </h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
            Your submission has been recorded with reference number <span className="font-mono font-bold text-[#ff7e67]">#{submittedTicket.id}</span>. Our advisory team will review and respond within one business day.
          </p>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 rounded-xl bg-[#ff7e67] hover:bg-[#ff694f] text-slate-950 font-mono text-xs font-bold transition-all inline-flex items-center gap-2 cursor-pointer shadow-md shadow-[#ff7e67]/20"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Submit Another Proposal</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/50 text-red-300 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Row 1: Organisation & Type of organisation (for collaboration & consultation) */}
          {inquiryType !== 'enquiry' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 font-mono">
                  ORGANISATION <span className="text-[#ff7e67]">*</span>
                </label>
                <input
                  type="text"
                  name="organisation"
                  value={formData.organisation}
                  onChange={handleChange}
                  placeholder="Ministry / Enterprise / Agency"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#081220] border border-slate-700/80 text-slate-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#ff7e67]/30 focus:border-[#ff7e67] transition-all placeholder:text-slate-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 font-mono">
                  ORGANISATION TYPE <span className="text-[#ff7e67]">*</span>
                </label>
                <select
                  name="orgType"
                  value={formData.orgType}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#081220] border border-slate-700/80 text-slate-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#ff7e67]/30 focus:border-[#ff7e67] transition-all cursor-pointer"
                >
                  <option value="Government / ministry" className="bg-[#081220] text-slate-100">Government / ministry</option>
                  <option value="Multilateral / Development Bank" className="bg-[#081220] text-slate-100">Multilateral / Development Bank</option>
                  <option value="Private Sector / Corporate" className="bg-[#081220] text-slate-100">Private Sector / Corporate</option>
                  <option value="Academic / Think Tank" className="bg-[#081220] text-slate-100">Academic / Think Tank</option>
                  <option value="NGO / Civil Society" className="bg-[#081220] text-slate-100">NGO / Civil Society</option>
                  <option value="Other" className="bg-[#081220] text-slate-100">Other</option>
                </select>
              </div>
            </div>
          )}

          {/* Row 2: Your name & Email address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 font-mono">
                YOUR NAME <span className="text-[#ff7e67]">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081220] border border-slate-700/80 text-slate-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#ff7e67]/30 focus:border-[#ff7e67] transition-all placeholder:text-slate-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 font-mono">
                EMAIL ADDRESS <span className="text-[#ff7e67]">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@domain.gov"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081220] border border-slate-700/80 text-slate-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#ff7e67]/30 focus:border-[#ff7e67] transition-all placeholder:text-slate-600"
                required
              />
            </div>
          </div>

          {/* Row 3: Focus area (for collaboration & consultation) */}
          {inquiryType !== 'enquiry' && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 font-mono">
                FOCUS AREA <span className="text-[#ff7e67]">*</span>
              </label>
              <select
                name="focusArea"
                value={formData.focusArea}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081220] border border-slate-700/80 text-slate-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#ff7e67]/30 focus:border-[#ff7e67] transition-all cursor-pointer"
                required
              >
                <option value="" className="bg-[#081220] text-slate-400">Select the closest domain</option>
                <option value="Climate & Green Transition" className="bg-[#081220] text-slate-100">Climate & Green Transition</option>
                <option value="Education & Human Capital" className="bg-[#081220] text-slate-100">Education & Human Capital</option>
                <option value="Institutional Governance & Reform" className="bg-[#081220] text-slate-100">Institutional Governance & Reform</option>
                <option value="MERLA Frameworks" className="bg-[#081220] text-slate-100">MERLA Frameworks</option>
                <option value="Macro & Sector Policy Advisory" className="bg-[#081220] text-slate-100">Macro & Sector Policy Advisory</option>
                <option value="General Strategic Advisory" className="bg-[#081220] text-slate-100">General Strategic Advisory</option>
              </select>
            </div>
          )}

          {/* Row 4: Outline / Message */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-0.5 font-mono">
              {inquiryType === 'enquiry' ? 'YOUR MESSAGE / QUESTION' : 'PROJECT OUTLINE & TARGET IMPACT'} <span className="text-[#ff7e67]">*</span>
            </label>
            <div className="text-[11px] text-slate-400 mb-1.5">
              {inquiryType === 'enquiry'
                ? 'Describe your question, inquiry, or topic of interest...'
                : 'What is the core institutional challenge, affected population, and intended outcome?'}
            </div>
            <textarea
              name="outline"
              rows={4}
              value={formData.outline}
              onChange={handleChange}
              placeholder={inquiryType === 'enquiry' ? 'Type your message or question here...' : 'Detail your initiative requirements and scope...'}
              className="w-full p-3.5 rounded-xl bg-[#081220] border border-slate-700/80 text-slate-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#ff7e67]/30 focus:border-[#ff7e67] transition-all placeholder:text-slate-600 resize-none"
              required
            ></textarea>
          </div>

          {/* Row 5: Indicative timeline (for collaboration & consultation) */}
          {inquiryType !== 'enquiry' && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 font-mono">
                INDICATIVE TIMELINE <span className="text-slate-500 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                placeholder="e.g. 6-month deployment from Q2"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081220] border border-slate-700/80 text-slate-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#ff7e67]/30 focus:border-[#ff7e67] transition-all placeholder:text-slate-600"
              />
            </div>
          )}

          {/* Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-400 select-none">
              <input
                type="checkbox"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleChange}
                className="mt-0.5 w-4 h-4 rounded border-slate-700 text-[#ff7e67] focus:ring-[#ff7e67] cursor-pointer bg-[#081220]"
              />
              <span className="leading-snug">
                I agree that IP3 Consulting Limited may securely store these details and contact me regarding this advisory proposal.
              </span>
            </label>
          </div>

          {/* Submit button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-[#ff7e67] hover:bg-[#ff694f] active:bg-[#e05e47] text-slate-950 font-mono font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-[#ff7e67]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Recording submission...</span>
                </>
              ) : (
                <>
                  <span>Submit proposal</span>
                  <ExternalLink className="w-4 h-4 text-slate-950" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
