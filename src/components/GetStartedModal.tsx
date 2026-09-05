import React, { useState } from 'react';
import { saveLead } from '../lib/contentStore';
import { X, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { SlideItem } from '../types';

interface GetStartedModalProps {
  slide: SlideItem;
  isOpen: boolean;
  onClose: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ slide, isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await saveLead({
      source: 'get-started',
      inquiryType: 'enquiry',
      email,
      focusArea: slide?.title || '',
      outline: `Get Started request from the "${slide?.name || 'hero'}" slide.`,
      meta: { slideId: slide?.id, cta: slide?.ctaText || 'Get Started' },
    });
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050a12]/85 backdrop-blur-md transition-opacity">
      <div className="relative w-full max-w-lg bg-[#081220] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8">
        
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-xl transition-colors border border-slate-800"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff7e67]/10 border border-[#ff7e67]/30 text-[#ff7e67] text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Section: {slide.name.toUpperCase()}</span>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
                {slide.ctaText || 'Get Started'} with {slide.title}
              </h2>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                {slide.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-medium text-slate-400 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#050a12] border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-hidden focus:border-[#ff7e67] focus:ring-1 focus:ring-[#ff7e67] text-sm font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-[#ff7e67] hover:bg-[#ff694f] text-slate-950 font-mono font-bold text-sm rounded-xl transition-all shadow-lg shadow-[#ff7e67]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <p className="text-xs text-center text-slate-500 font-mono">
              Direct executive inquiry. No spam guaranteed.
            </p>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-[#ff7e67]/10 text-[#ff7e67] rounded-full flex items-center justify-center mx-auto border border-[#ff7e67]/30">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">Welcome Aboard!</h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto">
              We've sent your access details to <span className="text-slate-100 font-medium font-mono">{email}</span> for section <span className="text-[#ff7e67] font-semibold">{slide.title}</span>.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-mono font-medium rounded-xl transition-colors cursor-pointer border border-slate-700"
            >
              Back to Presentation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
