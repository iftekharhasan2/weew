import { Quote, Sparkles, Building, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

interface TestimonialAndHighlightsProps {
  onOpenContact: () => void;
}

export default function TestimonialAndHighlightsSection({ onOpenContact }: TestimonialAndHighlightsProps) {
  const insights = [
    'RMG Sector Transformation',
    'Policy Integration & Governance',
    'Urban Waste Revolution',
    'Food Waste Valorization'
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#0E1A22] border-b border-[#3C3F45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Split: City Circularity & Testimonial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Box: Insights Checklist Card */}
          <div className="lg:col-span-6 bg-[#12202B] rounded-2xl p-8 sm:p-10 border border-[#3C3F45] shadow-xl flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <div className="text-xs uppercase tracking-widest text-[#EF715A] font-bold">
                  City &amp; Sectoral Circularity
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#F3F0E8] leading-tight mt-1">
                  Eliminate Waste and Turn Waste into Resources. Again and Again.
                </h3>
              </div>

              <div className="space-y-3 pt-2">
                <div className="text-xs uppercase tracking-wider text-[#F59E0B] font-bold">
                  Featured IP3 Insights:
                </div>
                {insights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2.5 rounded-lg bg-[#152735] border border-[#3C3F45] shadow-2xs">
                    <CheckCircle className="w-4 h-4 text-[#EF715A] shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-[#F3F0E8]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#3C3F45] flex items-center justify-between">
              <div className="text-xs text-[#AEB0AE] font-medium">Prepared by: <span className="font-bold text-[#F3F0E8]">IP3 CONSULTING</span></div>
              <button
                onClick={onOpenContact}
                className="text-xs font-semibold text-[#EF715A] hover:underline flex items-center gap-1 cursor-pointer"
              >
                Want to Collaborate? <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Right Box: Testimonial Quote with background visual & portrait */}
          <div className="lg:col-span-6 bg-[#12202B] rounded-2xl p-8 sm:p-10 text-white shadow-xl border border-[#3C3F45] flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute inset-0 opacity-20">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80"
                alt="RMG Factory Circularity"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A22] via-[#12202B]/85 to-[#12202B]/60" />
            </div>

            <div className="absolute top-4 right-6 text-white/5 pointer-events-none">
              <Quote className="w-24 h-24" />
            </div>

            <div className="space-y-6 relative z-10">
              <h4 className="font-serif text-xl font-bold text-[#F59E0B]">
                Tailored Solutions for Bangladesh’s Challenges
              </h4>

              <blockquote className="font-serif text-lg sm:text-xl font-light italic leading-relaxed text-[#F3F0E8]">
                “IP3 Consultant&apos;s ‘Circular Economist’ Team’s systemic approach helped us redesign waste workflows in our garment factory. Their mentorship bridged global best practices with local realities.”
              </blockquote>
            </div>

            <div className="pt-6 mt-6 border-t border-[#3C3F45] relative z-10 flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                alt="Shakib Ahmed"
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#EF715A] shadow"
              />
              <div>
                <div className="font-bold text-sm text-[#F3F0E8] tracking-wide uppercase">
                  Shakib Ahmed
                </div>
                <div className="text-xs text-[#AEB0AE] font-light">
                  Managing Director, RMG Factory Owner, Dhaka
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Highlights: $12 Billion Economic Opportunity Banner */}
        <div className="bg-[#12202B] rounded-2xl p-8 sm:p-12 border border-[#3C3F45] text-[#F3F0E8] space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#3C3F45] pb-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#EF715A] font-bold">
                Highlights
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#F3F0E8] mt-1">
                Transform Systems, Not Just Strategies
              </h3>
            </div>
            <div className="text-xs sm:text-sm font-medium text-[#F59E0B] bg-[#152735] px-4 py-2 rounded-lg border border-[#3C3F45] shadow-2xs">
              Guiding Cities, Corporations, and Communities Toward Regenerative Futures
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 text-xs sm:text-sm text-[#AEB0AE] font-light leading-relaxed space-y-3">
              <p>
                Bangladesh’s rapid urbanization, industrial growth, and climate vulnerabilities demand urgent shifts to circularity. With Ready-Made Garments (RMG) contributing 84% of exports and cities like Dhaka generating 6,500+ tons of daily waste, circular strategies can unlock <strong className="font-semibold text-[#EF715A]">$12 billion in economic opportunities</strong> while reducing environmental strain.
              </p>
              <p>
                Yet gaps in policy alignment, waste infrastructure, and sector-specific expertise slow progress. IP3 bridges this gap through localized technical frameworks, policy advisory, and multi-donor blended finance facilities.
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#152735] p-6 rounded-xl border border-[#3C3F45] shadow-sm text-center space-y-3">
              <div className="text-xs text-[#AEB0AE] font-semibold uppercase tracking-wider">
                Circularity Value Unlock
              </div>
              <div className="font-serif text-4xl font-bold text-[#EF715A]">
                $12 Billion
              </div>
              <div className="text-xs text-[#AEB0AE] font-light">
                Economic potential across industrial textile recycling, municipal bio-waste, and clean energy.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
