import { useState } from 'react';
import { Play, ArrowRight, CheckCircle2, Shield, Sparkles } from 'lucide-react';

interface StrategicPartnerSectionProps {
  onOpenContact: () => void;
  onOpenVideo: (videoId: string) => void;
}

export default function StrategicPartnerSection({ onOpenContact, onOpenVideo }: StrategicPartnerSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="strategic-partner" className="py-16 sm:py-20 bg-[#0E1A22] border-b border-[#3C3F45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-4xl text-[#F3F0E8] font-normal leading-tight">
                Driving Responsible Growth for a Sustainable and Equitable Future
              </h2>
            </div>

            <div className="space-y-4 text-[#AEB0AE] text-sm sm:text-base font-light leading-relaxed">
              <p className="font-normal text-[#EF715A]">
                Endless pursuit of economic growth is destroying our planet.
              </p>
              <p>
                From public sector institutions to private sector organizations, we partner with clients who want to reimagine responsible growth and sustainable future. Our team delivers bespoke support grounded in complex economic theories, insight into industry trends, and the political and regulatory environment.
              </p>
              <p>
                We design context-specific strategic frameworks to integrate sustainability into economic policy, ensuring that development goals align with environmental preservation and social equity. We complement our tailored, integrated expertise with a vibrant ecosystem of data &amp; digital innovators to deliver better, faster, and more enduring sustainability solutions.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenContact}
                className="px-6 py-3 bg-[#EF715A] hover:bg-[#E05E47] text-white text-xs sm:text-sm font-semibold rounded-md shadow flex items-center gap-2 cursor-pointer transition-colors"
              >
                <span>How We Ensure Responsible Growth?</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenVideo('sustainable-future')}
                className="px-5 py-3 border border-[#3C3F45] bg-[#12202B] hover:bg-[#152735] text-[#F3F0E8] text-xs sm:text-sm font-semibold rounded-md flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-[#EF715A] text-[#EF715A]" />
                <span>Watch Overview</span>
              </button>
            </div>
          </div>

          {/* Right Video / Visual Column */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#3C3F45] bg-[#12202B] group">
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80"
                alt="Sustainable Future Video"
                className="w-full h-[340px] sm:h-[400px] object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A22]/90 via-black/40 to-transparent flex flex-col justify-between p-6 sm:p-8 text-white">
                
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded bg-[#0E1A22]/80 backdrop-blur-md border border-[#3C3F45] text-[11px] font-semibold uppercase tracking-wider text-[#F59E0B]">
                    Featured Documentary
                  </span>
                  <div className="w-3 h-3 rounded-full bg-[#EF715A] animate-ping" />
                </div>

                <div className="text-center my-auto">
                  <button
                    onClick={() => onOpenVideo('sustainable-future')}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#EF715A]/90 hover:bg-[#EF715A] backdrop-blur-md border-2 border-white/80 text-white flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-all cursor-pointer"
                  >
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-white ml-1" />
                  </button>
                  <div className="mt-3 text-xs uppercase tracking-widest text-[#F3F0E8] font-semibold">
                    Click to Play Documentary
                  </div>
                </div>

                <div className="text-xs text-[#AEB0AE] font-light text-center">
                  Topic: Aligning Macroeconomic Transition with Planetary Boundaries
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Wide Quote / Callout Banner */}
        <div className="mt-14 p-8 sm:p-10 rounded-2xl bg-[#12202B] border border-[#3C3F45] shadow-xl text-center">
          <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#F3F0E8] font-normal leading-relaxed max-w-4xl mx-auto">
            “Transforming markets, resources, and governance through ESG innovation, equitable transitions, and global collaboration.”
          </h3>
          <div className="mt-4 text-xs font-semibold uppercase tracking-widest text-[#EF715A]">
            — Institute for Public Policy &amp; Practice (IP3) Strategic Commitment
          </div>
        </div>

      </div>
    </section>
  );
}
