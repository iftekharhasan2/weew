import { BookOpen, ArrowRight, Sparkles, RefreshCw, Scissors, Building, Utensils, Scale } from 'lucide-react';
import { CIRCULAR_OFFERINGS } from '../../data/climateData';

interface CircularEconomistSectionProps {
  onOpenContact: () => void;
}

export default function CircularEconomistSection({ onOpenContact }: CircularEconomistSectionProps) {
  const icons = [
    <Scissors className="w-5 h-5 text-[#1c3d2e]" />,
    <Building className="w-5 h-5 text-[#1c3d2e]" />,
    <Utensils className="w-5 h-5 text-[#1c3d2e]" />,
    <Scale className="w-5 h-5 text-[#1c3d2e]" />
  ];

  return (
    <section id="circular-economy" className="py-16 sm:py-20 bg-[#0E1A22] border-b border-[#3C3F45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Feature: Circular Economist Magazine Banner */}
        <div className="bg-[#12202B] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-[#3C3F45] overflow-hidden relative">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#EF715A]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Cover Graphic */}
            <div className="lg:col-span-5">
              <div className="bg-[#0E1A22] rounded-2xl p-6 sm:p-7 border border-[#3C3F45] shadow-2xl relative overflow-hidden flex flex-col justify-between">
                <div className="absolute inset-0 opacity-40">
                  <img
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
                    alt="The Circular Economist Magazine"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A22] via-[#0E1A22]/70 to-transparent" />
                </div>

                <div className="relative z-10 space-y-3">
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#F3F0E8] leading-tight">
                    THE <br />
                    CIRCULAR <br />
                    ECONOMIST <br />
                    MAGAZINE
                  </h2>
                  <p className="text-xs sm:text-sm text-[#F59E0B] italic font-light">
                    “Taking care of the earth, because we only have one.”
                  </p>
                </div>

                <div className="pt-6 relative z-10">
                  <button
                    onClick={onOpenContact}
                    className="px-5 py-2.5 bg-[#EF715A] hover:bg-[#E05E47] text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-colors cursor-pointer"
                  >
                    Subscribe to Journal
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Group Vision & Narrative */}
            <div className="lg:col-span-7 space-y-4 lg:pl-6 border-t lg:border-t-0 lg:border-l border-[#3C3F45] pt-6 lg:pt-0">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-snug text-[#F3F0E8]">
                The Circular Economist and Sustainability Transformation Group
              </h3>
              <div className="text-sm font-medium text-[#F59E0B]">
                Driving Policy &amp; Economic Renewal, Your Catalyst for Sustainable Transformation
              </div>
              <p className="text-xs sm:text-sm text-[#AEB0AE] font-light leading-relaxed">
                At IP3 Consulting, we connect research rigor with actionable industry roadmaps. Our specialized task forces partner with factories, city corporations, and financial groups to turn waste streams into high-value regenerative economic assets.
              </p>
            </div>

          </div>
        </div>

        {/* Section 2: Key Service Offerings for Bangladesh */}
        <div className="space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F3F0E8] font-normal">
              Accelerating Bangladesh’s Circular Transition
            </h2>
            <p className="text-xs sm:text-sm text-[#AEB0AE] font-light max-w-xl mx-auto">
              Bridging Policy, Industry, and Innovation for Sustainable Resource Systems
            </p>
          </div>

          {/* 4 Circular Offerings Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {CIRCULAR_OFFERINGS.map((offer, idx) => (
              <div
                key={idx}
                className="bg-[#12202B] rounded-2xl overflow-hidden border border-[#3C3F45] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:border-[#EF715A]/60 cursor-pointer"
              >
                <div>
                  <div className="h-40 w-full overflow-hidden relative">
                    <img
                      src={offer.imageUrl}
                      alt={offer.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12202B] via-transparent to-transparent" />
                    <div className="absolute top-3 right-3 bg-[#152735] border border-[#3C3F45] px-2 py-0.5 rounded text-xs font-serif font-bold text-[#F59E0B] shadow-xs">
                      0{idx + 1}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-serif text-lg font-bold text-[#F3F0E8] leading-snug group-hover:text-[#EF715A] transition-colors">
                      {offer.title}
                    </h3>

                    <p className="text-xs text-[#AEB0AE] font-light leading-relaxed">
                      {offer.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-[#3C3F45] flex items-center justify-between text-xs text-[#EF715A] font-semibold mt-auto">
                  <span className="group-hover:underline">Explore Workflow</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
