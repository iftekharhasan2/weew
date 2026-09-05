import { Play, ArrowRight, BookOpen, Layers } from 'lucide-react';

interface ApproachSectionProps {
  onOpenContact: () => void;
  onOpenVideo: (id: string) => void;
}

export default function ApproachSection({ onOpenContact, onOpenVideo }: ApproachSectionProps) {
  return (
    <section id="approach" className="py-16 sm:py-20 bg-[#0E1A22] border-b border-[#3C3F45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Col 1: Book / Publication Feature (3 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
            <div className="text-xs uppercase tracking-widest text-[#EF715A] font-bold">
              IP3 CONSULTING
            </div>
            
            <div className="relative group rounded-xl overflow-hidden shadow-2xl border border-[#3C3F45] w-52 sm:w-60 bg-[#12202B]">
              <img
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80"
                alt="IP3 Approach Policy Manual"
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A22]/95 via-[#0E1A22]/30 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase font-bold text-[#F59E0B] tracking-wider">
                  Special Report
                </span>
                <h4 className="font-serif text-sm font-bold text-[#F3F0E8] leading-tight mt-1">
                  Decarbonization &amp; Green Policy Frameworks
                </h4>
              </div>
            </div>
            
            <div className="text-xs text-[#AEB0AE]">
              IP3 Operational Framework Edition
            </div>
          </div>

          {/* Col 2: IP3 Approach Title & Action (4 cols) */}
          <div className="lg:col-span-4 space-y-5 border-y lg:border-y-0 lg:border-x border-[#3C3F45] py-6 lg:py-0 lg:px-8">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#F3F0E8] leading-tight">
                Adopting a Holistic Approach to Sustainability Transformation
              </h3>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onOpenContact}
                className="px-6 py-3 bg-[#EF715A] hover:bg-[#E05E47] text-white text-xs sm:text-sm font-semibold rounded-md shadow flex items-center gap-2 cursor-pointer transition-colors"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onOpenVideo('approach-video')}
                className="w-11 h-11 rounded-md border border-[#3C3F45] bg-[#12202B] hover:bg-[#152735] text-[#EF715A] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Play approach briefing"
              >
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </button>
            </div>
          </div>

          {/* Col 3: Narrative Text (4 cols) */}
          <div className="lg:col-span-4 space-y-4 text-xs sm:text-sm text-[#AEB0AE] font-light leading-relaxed">
            <p>
              Our operational approach connects positive environmental and societal outcomes with economic value creation. We bring together technical subject matter expertise, sector-specific knowledge, and global best practices to develop actionable solutions that align with our clients’ sustainability goals.
            </p>
            <p>
              Through collaborative partnerships, we co-create consensus-driven strategies, delivering feasibility studies, policy frameworks, and practical interventions tailored to local and global contexts.
            </p>
            <p className="text-[#EF715A] font-normal">
              From addressing climate vulnerabilities to driving innovation through circular economy practices, our work ensures that sustainability goals are realized through measurable impact and scalable outcomes. Together with our partners, we turn challenges into opportunities—building a future where organizations thrive through resilience, equity, and environmental stewardship.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
