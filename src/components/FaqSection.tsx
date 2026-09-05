import { useCMS } from '../context/CMSContext';
import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare, Sparkles } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const { data } = useCMS();
  const faqItems = data.faqItems;
  const [openId, setOpenId] = useState<string | null>(faqItems[0].id);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="my-10 bg-[#081220] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ff7e67]/10 text-[#ff7e67] text-[11px] font-mono font-bold tracking-wider uppercase mb-2 border border-[#ff7e67]/30">
            <Sparkles className="w-3 h-3 text-[#ff7e67]" />
            Advisory Clarity
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-100">
            Frequently Asked Questions
          </h3>
        </div>
        <div className="w-10 h-10 rounded-xl bg-slate-800 text-[#ff7e67] flex items-center justify-center font-bold shadow-xs border border-slate-700">
          <HelpCircle className="w-5 h-5 text-[#ff7e67]" />
        </div>
      </div>

      <div className="space-y-3">
        {faqItems.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div 
              key={faq.id}
              className={`rounded-2xl border transition-all duration-200 ${
                isOpen 
                  ? 'border-[#ff7e67]/60 bg-[#050a12] shadow-lg shadow-[#ff7e67]/5 ring-1 ring-[#ff7e67]/30' 
                  : 'border-slate-800 hover:border-slate-700 bg-[#050a12]/60'
              }`}
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full text-left p-4 flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="p-1.5 rounded-lg bg-slate-800 text-[#ff7e67] shrink-0 border border-slate-700">
                    <MessageSquare className="w-4 h-4 text-[#ff7e67]" />
                  </span>
                  <span className="font-bold text-sm text-slate-100">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#ff7e67]' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800 ml-10">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
