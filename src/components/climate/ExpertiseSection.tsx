import { Star, ArrowUpRight } from 'lucide-react';
import { EXPERTISE_ITEMS, ExpertiseItem } from '../../data/climateData';

interface ExpertiseSectionProps {
  onSelectExpertise?: (item: ExpertiseItem) => void;
}

export default function ExpertiseSection({ onSelectExpertise }: ExpertiseSectionProps) {
  return (
    <section id="expertise" className="py-16 sm:py-20 bg-[#0E1A22] border-b border-[#3C3F45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F3F0E8] uppercase tracking-wide">
            OUR EXpertize
          </h2>
          <div className="w-16 h-0.5 bg-[#EF715A] mx-auto mt-4" />
          <p className="text-[#AEB0AE] text-sm sm:text-base mt-4 font-light leading-relaxed">
            Bridging science, finance, and regulatory governance to drive measurable decarbonization and inclusive economic prosperity.
          </p>
        </div>

        {/* 6 Cards Grid (3 per row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {EXPERTISE_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => onSelectExpertise && onSelectExpertise(item)}
              className="bg-[#12202B] rounded-xl overflow-hidden border border-[#3C3F45] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:border-[#EF715A]/60 cursor-pointer"
            >
              <div>
                {/* Image Header */}
                <div className="h-44 w-full overflow-hidden relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A22]/70 via-[#0E1A22]/20 to-transparent" />
                  
                  <div className="absolute top-3.5 right-3.5 bg-[#152735]/90 backdrop-blur-md px-2.5 py-0.5 rounded text-xs font-serif font-bold text-[#F59E0B] shadow-sm border border-[#3C3F45]">
                    0{idx + 1}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  {/* Title */}
                  <h3 className="font-serif text-xl font-normal text-[#F3F0E8] leading-snug group-hover:text-[#EF715A] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#AEB0AE] leading-relaxed font-light line-clamp-4">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Bottom tag / indicator */}
              <div className="px-6 pb-6 pt-3 border-t border-[#3C3F45] flex items-center justify-between text-xs text-[#EF715A] font-medium mt-auto">
                <span className="group-hover:underline">Explore Framework</span>
                <ArrowUpRight className="w-4 h-4 text-[#AEB0AE] group-hover:text-[#EF715A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </div>
          ))}

          {/* 6th Slot: Special Custom Summary Card */}
          <div
            onClick={() => onSelectExpertise && onSelectExpertise({
              id: 'exp-6',
              title: 'Bespoke Consultations & Institutional Capacity',
              description: 'Tailored multi-stakeholder workshops, custom ESG materiality matrices, and macroeconomic green growth modeling tailored to the South Asian context.',
              imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80'
            })}
            className="bg-[#12202B] rounded-xl overflow-hidden border border-[#3C3F45] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:border-[#EF715A]/60 cursor-pointer"
          >
            <div>
              {/* Image Header */}
              <div className="h-44 w-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                  alt="Bespoke Consultations & Institutional Capacity"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A22]/70 via-[#0E1A22]/20 to-transparent" />
                <div className="absolute top-3.5 right-3.5 bg-[#152735]/90 backdrop-blur-md px-2.5 py-0.5 rounded text-xs font-serif font-bold text-[#F59E0B] shadow-sm border border-[#3C3F45]">
                  06
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-serif text-xl font-normal text-[#F3F0E8] leading-snug group-hover:text-[#EF715A] transition-colors">
                  Bespoke Consultations &amp; Institutional Capacity
                </h3>

                <p className="text-xs sm:text-sm text-[#AEB0AE] leading-relaxed font-light line-clamp-4">
                  Tailored multi-stakeholder workshops, custom ESG materiality matrices, and macroeconomic green growth modeling tailored to the South Asian context.
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-3 border-t border-[#3C3F45] flex items-center justify-between text-xs text-[#EF715A] font-medium mt-auto">
              <span className="group-hover:underline">Explore Roadmaps</span>
              <ArrowUpRight className="w-4 h-4 text-[#AEB0AE] group-hover:text-[#EF715A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
