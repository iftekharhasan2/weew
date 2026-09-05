import { ArrowRight, Compass, ShieldCheck, TrendingUp, Layers } from 'lucide-react';
import { POLICY_FOCUS_ITEMS } from '../../data/climateData';

interface PolicyFocusSectionProps {
  onScrollToExpertise: () => void;
}

export default function PolicyFocusSection({ onScrollToExpertise }: PolicyFocusSectionProps) {
  const icons = [
    <Compass className="w-5 h-5 text-[#1c3d2e]" />,
    <Layers className="w-5 h-5 text-[#1c3d2e]" />,
    <TrendingUp className="w-5 h-5 text-[#1c3d2e]" />
  ];

  return (
    <section id="policy-focus" className="py-14 bg-[#0E1A22] border-b border-[#3C3F45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#F3F0E8]">
              Our Policy Focus
            </h2>
          </div>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          
          {POLICY_FOCUS_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#12202B] rounded-xl overflow-hidden border border-[#3C3F45] shadow-lg hover:shadow-2xl transition-all duration-200 flex flex-col justify-between group hover:border-[#EF715A]/60"
            >
              <div>
                <div className="h-40 w-full overflow-hidden relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A22]/70 via-transparent to-transparent" />
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="text-[11px] uppercase tracking-wider text-[#F59E0B] font-semibold">
                    {item.tag}
                  </div>
                  <p className="font-serif text-base sm:text-lg font-normal text-[#F3F0E8] leading-snug group-hover:text-[#EF715A] transition-colors">
                    {item.title}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs text-[#EF715A] font-medium border-t border-[#3C3F45] mt-auto">
                <span>Core Domain 0{idx + 1}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF715A]" />
              </div>
            </div>
          ))}

          {/* 4th Column: CTA Box */}
          <div className="bg-[#152735] border border-[#3C3F45] rounded-xl p-6 text-[#F3F0E8] shadow-lg flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-3 relative z-10">
              <div className="w-10 h-10 rounded-lg bg-[#0E1A22] border border-[#3C3F45] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#EF715A]" />
              </div>
              <div className="text-xs uppercase tracking-wider text-[#F59E0B] font-semibold">
                Explore Capabilities
              </div>
              <h3 className="font-serif text-xl font-normal leading-snug text-[#F3F0E8]">
                Comprehensive Technical &amp; Policy Solutions
              </h3>
            </div>

            <div className="pt-4 mt-4 border-t border-[#3C3F45] relative z-10">
              <button
                onClick={onScrollToExpertise}
                className="w-full py-2.5 px-4 bg-[#EF715A] hover:bg-[#E05E47] text-white font-semibold text-xs sm:text-sm rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Our Expertize</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
