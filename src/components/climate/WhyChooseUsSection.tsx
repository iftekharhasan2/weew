import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface WhyChooseUsSectionProps {
  onOpenContact: () => void;
}

export default function WhyChooseUsSection({ onOpenContact }: WhyChooseUsSectionProps) {
  const reasons = [
    {
      id: '01',
      title: 'Policy Precision & Governance Mastery',
      subtitle: 'Bridging Ambition with Enforceable Systems',
      description:
        'We develop high-impact public policy frameworks, regulatory roadmaps, and governance mechanisms that translate national climate commitments and global sustainability directives into enforceable, measurable outcomes.',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      highlights: ['UN SDG & Paris Agreement alignment', 'Sectoral policy reviews & feasibility', 'Institutional capacity governance']
    },
    {
      id: '02',
      title: 'Circularity & Decoupled Economic Growth',
      subtitle: 'Unlocking Value from Resource Efficiency',
      description:
        'Our circular economy architectures decouple industrial expansion from environmental degradation—identifying closed-loop supply chain models, secondary material recovery, and high-ROI decarbonization pathways.',
      imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
      highlights: ['Closed-loop supply chain architecture', 'Industrial waste valorization audits', 'Materiality & lifecycle assessment']
    },
    {
      id: '03',
      title: 'Global ESG Benchmarks, Grounded Realities',
      subtitle: 'Seamless Cross-Border Compliance',
      description:
        'We help enterprises and financial institutions navigate evolving global disclosure standards—including CSRD, ISSB, GRI, and EU CSDDD—while ensuring operational strategies remain pragmatic and resilient on the ground.',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
      highlights: ['CSRD, ISSB & GRI disclosure roadmaps', 'Climate risk vulnerability modeling', 'Carbon accounting & Scope 1-3 audit']
    },
    {
      id: '04',
      title: 'End-to-End Multidisciplinary Advisory',
      subtitle: 'From Macro Modeling to Field Execution',
      description:
        'Our bench of economists, policy specialists, and climate scientists delivers holistic solutions: sustainable finance mobilization, impact investment structuring, MERLA monitoring systems, and executive capacity building.',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      highlights: ['Blended climate finance mobilization', 'Comprehensive MERLA frameworks', 'Multi-stakeholder executive workshops']
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-[#0E1A22] border-b border-[#3C3F45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F3F0E8] tracking-tight">
            Why Choose IP3 Consulting
          </h2>
          <p className="text-sm sm:text-base text-[#AEB0AE] font-light leading-relaxed">
            We partner with governments, multinational organizations, and industry leaders to deliver actionable strategies that drive systemic sustainability transformation and long-term economic resilience.
          </p>
        </div>

        {/* 4 Pillars Grid with Photographic Headers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason) => (
            <div
              key={reason.id}
              className="bg-[#12202B] rounded-2xl overflow-hidden border border-[#3C3F45] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:border-[#EF715A]/60"
            >
              <div>
                {/* Visual Header */}
                <div className="h-52 w-full overflow-hidden relative">
                  <img
                    src={reason.imageUrl}
                    alt={reason.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12202B] via-transparent to-transparent" />
                  
                  <div className="absolute top-4 right-4 bg-[#152735] border border-[#3C3F45] px-3 py-1 rounded text-xs font-serif font-bold text-[#F59E0B] shadow">
                    Pillar {reason.id}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="space-y-1">
                    <div className="text-[11px] uppercase tracking-wider text-[#EF715A] font-semibold">
                      {reason.subtitle}
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#F3F0E8] group-hover:text-[#EF715A] transition-colors leading-snug">
                      {reason.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#AEB0AE] font-light leading-relaxed">
                    {reason.description}
                  </p>

                  {/* Highlights Checklist */}
                  <div className="space-y-2 pt-2 border-t border-[#3C3F45]">
                    {reason.highlights.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2 text-xs text-[#F3F0E8]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#EF715A] shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA trigger */}
              <div className="px-6 sm:px-8 pb-6 pt-3 border-t border-[#3C3F45] flex items-center justify-between text-xs text-[#EF715A] font-semibold mt-auto">
                <button
                  onClick={onOpenContact}
                  className="inline-flex items-center gap-1.5 hover:underline cursor-pointer"
                >
                  <span>Inquire for Advisory Partnership</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
