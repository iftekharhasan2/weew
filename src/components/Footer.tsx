import { useCMS } from '../context/CMSContext';
import React from 'react';
import { ShieldCheck, Shield, Lock, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data } = useCMS();
  const ip3OfficeInfo = data.officeInfo;
  return (
    <footer className="bg-[#050a12] text-slate-100 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 border-b border-slate-800/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-400">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[#081220] text-[#ff7e67] shrink-0 border border-slate-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold font-serif text-slate-100 text-sm mb-1">{ip3OfficeInfo.companyName}</h4>
              <p className="leading-relaxed text-slate-400">
                Dedicated to providing strategic advisory and client services to address complex enterprise issues.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[#081220] text-[#ff7e67] shrink-0 border border-slate-800">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold font-serif text-slate-100 text-sm mb-1">Strict Confidentiality</h4>
              <p className="leading-relaxed text-slate-400">
                All client communications and consultation details are governed by strict non-disclosure policies.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[#081220] text-[#ff7e67] shrink-0 border border-slate-800">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold font-serif text-slate-100 text-sm mb-1">Gulshan-2 Advisory Center</h4>
              <p className="leading-relaxed text-slate-400">
                {ip3OfficeInfo.address.fullAddress}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#050a12] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-0">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="bg-[#ff7e67] hover:bg-[#ff8f7b] transition-colors p-3.5 sm:p-4 flex items-center justify-center shrink-0 shadow-inner">
              <div className="w-6 h-6 rounded-full border-2 border-[#050a12]/40 flex items-center justify-center">
                <Shield className="w-3.5 h-3.5 text-[#050a12] fill-[#050a12]/20" />
              </div>
            </div>

            <div className="py-3 px-2">
              <span className="font-mono font-bold text-xs uppercase tracking-widest text-slate-200">
                ALL RIGHTS RESERVED BY IP3 CONSULTING
              </span>
            </div>
          </div>

          <div className="py-3 px-4 sm:px-8 text-[11px] font-mono text-slate-400 flex items-center gap-6">
            <span className="hover:text-slate-200 transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-200 transition-colors cursor-pointer">Terms of Advisory</span>
            <span>•</span>
            <span className="text-slate-500">© 2026 IP3 Consulting</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
