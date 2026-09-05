import { RefreshCw } from 'lucide-react';

interface CircularEliminateWasteSectionProps {
  onOpenContact?: () => void;
}

export default function CircularEliminateWasteSection({ onOpenContact }: CircularEliminateWasteSectionProps) {
  return (
    <section id="eliminate-waste-circular" className="py-12 sm:py-16 bg-[#0E1A22] border-b border-[#3C3F45] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Split Editorial Poster Box */}
        <div className="relative rounded-3xl overflow-hidden border border-[#3C3F45] shadow-2xl min-h-[460px] lg:min-h-[520px] flex flex-col lg:flex-row">
          
          {/* LEFT WING: Warm Terracotta / Chocolate Burgundy Side with Recycled Collage Head Artwork */}
          <div className="lg:w-5/12 bg-[#422221] relative p-8 sm:p-10 flex flex-col justify-between overflow-hidden">
            
            {/* Top Label */}
            <div className="relative z-10">
              <span className="text-xs sm:text-sm font-sans font-light tracking-wide text-[#F3F0E8]/90">
                circular economists Magazine
              </span>
            </div>

            {/* Collage Head Silhouette Artwork */}
            <div className="relative my-6 flex items-center justify-center">
              {/* Decorative subtle aura glow */}
              <div className="absolute inset-0 bg-[#EF715A]/10 rounded-full blur-2xl pointer-events-none" />

              {/* Head Silhouette Image with Recycled Waste Collage Texture */}
              <div className="relative w-56 sm:w-64 md:w-72 aspect-[3/4] flex items-center justify-center">
                {/* Silhouette Mask with Waste collage photo */}
                <div className="relative w-full h-full drop-shadow-2xl transition-transform duration-700 hover:scale-105">
                  <img
                    src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=700&q=80"
                    alt="Recycled Materials Collage Profile"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-3xl"
                    style={{
                      clipPath: 'polygon(30% 0%, 70% 0%, 90% 15%, 95% 35%, 85% 55%, 95% 65%, 80% 80%, 70% 85%, 65% 100%, 25% 100%, 30% 85%, 15% 70%, 10% 50%, 15% 30%, 20% 10%)'
                    }}
                  />
                  
                  {/* Overlay collage blend */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 rounded-3xl pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Micro Badge */}
            <div className="relative z-10 flex items-center gap-2 text-[11px] text-[#F3F0E8]/70 font-mono">
              <RefreshCw className="w-3.5 h-3.5 text-[#EF715A] animate-spin-slow" />
              <span>Zero Waste • Closed-Loop Systems</span>
            </div>

          </div>

          {/* RIGHT WING: Deep Midnight Blue with Statement Banner & CTA */}
          <div className="lg:w-7/12 bg-[#1A2750] relative p-8 sm:p-12 lg:p-14 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-[#3C3F45]">
            
            {/* Editorial Thin Architectural Framing Lines */}
            <div className="absolute top-8 right-8 bottom-8 left-8 border-t border-r border-white/10 pointer-events-none hidden sm:block" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-white/20 pointer-events-none" />

            {/* Inner Content Stack */}
            <div className="relative z-10 max-w-xl">
              
              {/* High-Contrast Bold Black Statement Card with Serif Typography */}
              <div className="bg-[#0A0D14] border border-[#3C3F45] rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl transition-transform hover:-translate-y-1 duration-300">
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-4xl text-[#FFFFFF] font-normal leading-[1.25] tracking-tight">
                  Eliminate Waste and Turn Waste into Resources. Again and Again.
                </h2>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
