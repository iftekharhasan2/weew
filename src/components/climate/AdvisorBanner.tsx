import { ArrowRight, Building2, Landmark, Briefcase } from 'lucide-react';

interface AdvisorBannerProps {
  onOpenContact: () => void;
  onScrollToExpertise: () => void;
}

export default function AdvisorBanner({ onOpenContact, onScrollToExpertise }: AdvisorBannerProps) {
  return (
    <section className="py-16 bg-[#0E1A22] border-b border-[#3C3F45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#12202B] rounded-2xl p-8 sm:p-12 shadow-xl border border-[#3C3F45]">
          
          {/* Left Column: Headline & Image */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#F3F0E8] leading-tight">
              An advisor to the governments, <br className="hidden sm:inline" />
              corporates, and financial <br className="hidden sm:inline" />
              institutions on climate and <br className="hidden sm:inline" />
              sustainability.
            </h2>

            <div className="relative rounded-xl overflow-hidden shadow-md border border-[#3C3F45]">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80"
                alt="Advisory for Governments and Corporates"
                className="w-full h-48 sm:h-56 object-cover"
              />
            </div>
          </div>

          {/* Right Column: Narrative and View Menu Button */}
          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <p className="text-[#AEB0AE] text-sm sm:text-base leading-relaxed font-light">
              We develop and implement holistic strategies and solutions to transform society, industries and economies for a sustainable future. Our commitment to integrating sustainability into transformative economic and development policymaking, climate action and adaptation, tailored ESG strategy, biodiversity conservation, and the circular economy is not just a part of what we do; it is the core of who we are.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onScrollToExpertise}
                className="px-6 py-3 bg-[#EF715A] hover:bg-[#E05E47] text-white text-xs sm:text-sm font-semibold rounded-md shadow transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
                <span>View Menu &amp; Solutions</span>
              </button>

              <button
                onClick={onOpenContact}
                className="px-5 py-3 border border-[#3C3F45] hover:bg-[#152735] text-[#F3F0E8] text-xs sm:text-sm font-medium rounded-md transition-colors cursor-pointer"
              >
                Contact Lead Advisors
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
