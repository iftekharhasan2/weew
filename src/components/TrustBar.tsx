import { useCMS } from '../context/CMSContext';
import React from 'react';
import { Briefcase, Clock, Award, Users, ShieldCheck, Star } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const { data } = useCMS();
  const trustStats = data.trustStats;
  const clientTestimonials = data.clientTestimonials;
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-[#ff7e67]" />;
      case 'Clock': return <Clock className="w-5 h-5 text-[#ff7e67]" />;
      case 'Award': return <Award className="w-5 h-5 text-[#ff7e67]" />;
      case 'Users': return <Users className="w-5 h-5 text-[#ff7e67]" />;
      default: return <ShieldCheck className="w-5 h-5 text-[#ff7e67]" />;
    }
  };

  return (
    <div className="my-10 space-y-6 font-sans">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {trustStats.map((stat, idx) => (
          <div 
            key={idx}
            className="p-5 rounded-2xl bg-[#081220] border border-slate-800 shadow-xs hover:border-[#ff7e67]/60 transition-all duration-200 group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-slate-800 group-hover:scale-105 transition-transform">
                {getIcon(stat.iconName)}
              </div>
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#ff7e67] bg-[#ff7e67]/10 px-2 py-0.5 rounded border border-[#ff7e67]/30">
                Verified
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-100 tracking-tight mb-0.5">
              {stat.value}
            </div>
            <div className="text-xs font-mono font-bold text-slate-200 mb-1">
              {stat.label}
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clientTestimonials.map((t) => (
          <div 
            key={t.id}
            className="p-5 rounded-2xl bg-[#081220] text-slate-100 border border-slate-800 relative overflow-hidden shadow-xs"
          >
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#ff7e67] text-[#ff7e67]" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed mb-4">
              "{t.quote}"
            </p>
            <div className="flex items-center justify-between border-t border-slate-800 pt-3 text-xs">
              <div>
                <span className="font-bold text-slate-100 block">{t.author || t.authorName}</span>
                <span className="text-[#ff7e67] font-mono text-[11px]">
                  {t.designation || t.authorTitle}{t.organization ? `, ${t.organization}` : ''}
                </span>
              </div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 bg-slate-800 px-2 py-1 rounded">
                Executive Partner
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
