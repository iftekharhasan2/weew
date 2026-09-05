import { useCMS } from '../context/CMSContext';
import React from 'react';
import { Phone, Mail, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

interface HeaderNavbarProps {
  activeTab: 'message' | 'consultation';
  setActiveTab: (tab: 'message' | 'consultation') => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({ activeTab, setActiveTab }) => {
  const { data } = useCMS();
  const ip3OfficeInfo = data.officeInfo;
  return (
    <header className="sticky top-0 z-40 bg-[#081220]/95 backdrop-blur-md border-b border-slate-800 shadow-xs">
      <div className="bg-[#050a12] text-slate-400 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <a href={`mailto:${ip3OfficeInfo.email}`} className="flex items-center gap-1.5 hover:text-[#ff7e67] transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#ff7e67]" />
              <span>{ip3OfficeInfo.email}</span>
            </a>
            <span className="text-slate-800 hidden sm:inline">•</span>
            <a href={`tel:${ip3OfficeInfo.phone}`} className="flex items-center gap-1.5 hover:text-[#ff7e67] transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#ff7e67]" />
              <span>{ip3OfficeInfo.phone}</span>
            </a>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#ff7e67] animate-pulse"></span>
              Office: {ip3OfficeInfo.address.area}, {ip3OfficeInfo.address.city}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#ff7e67] flex items-center justify-center text-slate-100 font-bold shadow-md relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#ff7e67]"></div>
            <div className="relative z-10 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full border-2 border-slate-100 flex items-center justify-center bg-[#081220]/40">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-100" />
              </div>
            </div>
          </div>
          <div>
            <span className="font-serif font-bold text-xl text-slate-100 tracking-tight block leading-tight">
              IP3 CONSULTING
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#ff7e67] block">
              Client Services & Advisory
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setActiveTab('message')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
              activeTab === 'message'
                ? 'bg-[#ff7e67] text-slate-100 border-[#ff7e67] shadow-sm'
                : 'text-slate-400 border-transparent hover:text-slate-100 hover:bg-slate-800'
            }`}
          >
            Send Message
          </button>
          
          <button
            onClick={() => setActiveTab('consultation')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'consultation'
                ? 'bg-[#ff7e67] hover:bg-[#e06a54] text-slate-100 shadow-sm ring-2 ring-[#ff7e67]/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-100 shadow-sm border border-slate-700'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Consultation</span>
            <ArrowRight className="w-3 h-3 ml-0.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
