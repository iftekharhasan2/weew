import { Star, ArrowRight, ShieldCheck, RefreshCw, Trees } from 'lucide-react';
import { ESG_FOCUS_AREAS } from '../../data/climateData';

interface ESGStrategySectionProps {
  onOpenContact: () => void;
}

export default function ESGStrategySection({ onOpenContact }: ESGStrategySectionProps) {
  const icons = [
    <ShieldCheck className="w-5 h-5 text-[#1c3d2e]" />,
    <RefreshCw className="w-5 h-5 text-[#1c3d2e]" />,
    <Trees className="w-5 h-5 text-[#1c3d2e]" />
  ];

  return (
    <section id="esg-strategy" className="py-16 sm:py-20 bg-[#0E1A22] border-b border-[#3C3F45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Card */}
        <div className="bg-[#12202B] rounded-2xl p-8 sm:p-12 shadow-xl border border-[#3C3F45] mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F3F0E8] font-normal leading-tight">
                ESG &amp; Circular Strategy, <br />
                and Biodiversity <br />
                Conservation
              </h2>
            </div>

            <div className="lg:col-span-7">
              <p className="text-[#AEB0AE] text-sm sm:text-base leading-relaxed font-light">
                IP3 Consulting delivers tailored ESG solutions, blending global sustainability strategies with local expertise to address climate action, circular economy, and biodiversity challenges. We empower businesses to integrate sustainable practices, decouple growth from environmental impact, and enhance resource efficiency. By aligning operations with global standards, we drive measurable impact, fostering social equity, resilience, and profitable, sustainable futures.
              </p>
            </div>

          </div>
        </div>

        {/* 3 Large Featured Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {ESG_FOCUS_AREAS.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#12202B] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#3C3F45] hover:border-[#EF715A]/60 flex flex-col justify-between group"
            >
              {/* Image banner */}
              <div className="relative h-60 overflow-hidden bg-[#0E1A22]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12202B] via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-[11px] text-[#F59E0B] uppercase font-semibold">
                    Domain 0{idx + 1}
                  </div>
                  <h3 className="font-serif text-2xl font-bold leading-tight text-[#F3F0E8] group-hover:text-[#EF715A] transition-colors mt-0.5">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Text content & CTA */}
              <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                <p className="text-xs sm:text-sm text-[#AEB0AE] font-light leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-4 border-t border-[#3C3F45] flex items-center justify-between">
                  <button
                    onClick={onOpenContact}
                    className="text-xs font-semibold text-[#EF715A] hover:text-[#E05E47] flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                  >
                    <span>Request Materiality Matrix</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
