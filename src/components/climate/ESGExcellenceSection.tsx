import { INDUSTRY_SOLUTIONS } from '../../data/climateData';
import { ArrowRight, Factory, Landmark, PiggyBank, Briefcase, CheckCircle2 } from 'lucide-react';

interface ESGExcellenceSectionProps {
  onOpenContact: () => void;
}

export default function ESGExcellenceSection({ onOpenContact }: ESGExcellenceSectionProps) {
  const icons = [
    <Factory className="w-5 h-5 text-[#1c3d2e]" />,
    <Landmark className="w-5 h-5 text-[#1c3d2e]" />,
    <PiggyBank className="w-5 h-5 text-[#1c3d2e]" />,
    <Briefcase className="w-5 h-5 text-[#1c3d2e]" />
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#0E1A22] border-b border-[#3C3F45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Split: Leading with Purpose & ESG Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F3F0E8] font-normal leading-tight">
              Leading with Purpose: <br />
              <span className="text-[#EF715A] font-semibold">Our ESG Excellence</span>
            </h2>
            <p className="text-[#AEB0AE] text-sm sm:text-base leading-relaxed font-light">
              At IP3 Consulting, we combine deep expertise in ESG strategies and sustainability services to help organizations integrate sustainability into corporate strategy and business models, helping organizations unlock financial value, drive innovation, and create lasting societal impact. By embracing sustainability transformation, businesses can access new markets, boost resilience, and establish a competitive edge for the future.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-[#3C3F45] bg-[#12202B]">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=700&q=80"
                alt="ESG Excellence in Action"
                className="w-full h-72 sm:h-80 object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A22]/95 via-[#0E1A22]/40 to-transparent flex items-end p-6 text-white">
                <div>
                  <div className="text-xs text-[#F59E0B] font-bold uppercase tracking-wider">
                    ESG Integration Lifecycle
                  </div>
                  <div className="font-serif text-lg font-bold text-[#F3F0E8]">
                    Compliance • Value Creation • Resilient Supply Chains
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mid Callout Banner */}
        <div className="bg-[#12202B] rounded-2xl p-8 sm:p-10 border border-[#3C3F45] shadow-xl text-center max-w-4xl mx-auto mb-16">
          <h3 className="font-serif text-2xl sm:text-3xl text-[#F3F0E8] font-normal leading-snug">
            We Help You Create a World Where Your Journey to ESG Transformation is Never an Obstacle.
          </h3>
          <p className="text-xs sm:text-sm text-[#AEB0AE] font-light leading-relaxed mt-4 max-w-2xl mx-auto">
            We provide comprehensive ESG roadmaps, materiality assessments, and circular economy strategies that empower businesses to meet regulatory compliance while driving long-term value. By integrating biodiversity conservation into strategic planning, we help clients preserve natural ecosystems, protect biodiversity, and unlock opportunities for sustainable development.
          </p>
        </div>

        {/* Specialized Industry Solutions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Graphic illustration / Photo */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#3C3F45] bg-[#12202B]">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
                alt="Specialized Sector Solutions"
                className="w-full h-[440px] object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A22]/90 via-[#0E1A22]/30 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs uppercase tracking-widest text-[#F59E0B] font-semibold">
                  Sectoral Depth
                </span>
                <h4 className="font-serif text-xl font-bold text-[#F3F0E8] mt-1">
                  Tailored Frameworks for High-Emitting &amp; Financial Sectors
                </h4>
              </div>
            </div>
          </div>

          {/* Right: 4 Sectors Breakdown */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#EF715A] font-bold">
                Specialized Industry Solutions
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#F3F0E8] mt-1">
                Custom ESG Strategies for Diverse Sectors
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {INDUSTRY_SOLUTIONS.map((sec, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-[#12202B] border border-[#3C3F45] shadow-md hover:border-[#EF715A]/60 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-md bg-[#152735] border border-[#3C3F45] flex items-center justify-center">
                      <span className="text-[#EF715A]">{icons[idx]}</span>
                    </div>
                    <h5 className="font-bold text-xs sm:text-sm text-[#F3F0E8] leading-tight">
                      {sec.title}
                    </h5>
                  </div>
                  <p className="text-xs text-[#AEB0AE] font-light leading-relaxed">
                    {sec.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenContact}
                className="px-7 py-3.5 bg-[#EF715A] hover:bg-[#E05E47] text-white text-xs sm:text-sm font-semibold rounded-md shadow flex items-center gap-2 cursor-pointer transition-colors"
              >
                <span>Contact Our ESG Experts</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
