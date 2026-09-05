import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface WhoWeAreProps {
  onLearnMore: () => void;
}

export const WhoWeAre: React.FC<WhoWeAreProps> = ({ onLearnMore }) => {
  return (
    <section id="whoweare" className="py-16 md:py-24 bg-[#0E1A22] border-b border-[#3C3F45] scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-cardo text-[#F3F0E8] leading-tight">
                A Strategic Policy &amp; Management Solutions firm for a Sustainable Future
              </h2>
            </div>

            <div className="space-y-4 text-[#AEB0AE] text-[15px] sm:text-base leading-relaxed">
              <p className="border-l-4 border-[#EF715A] pl-4 py-3 bg-[#12202B] border-y border-r border-[#3C3F45] rounded-r-lg">
                As a <strong className="text-[#F3F0E8] font-semibold">translational policy studio</strong>, IP3 bridges visionary ideas and grounded execution. We accelerate <strong className="text-[#F3F0E8] font-semibold">policy design</strong>, <strong className="text-[#F3F0E8] font-semibold">co-implementation</strong>, and <strong className="text-[#F3F0E8] font-semibold">continuous learning</strong> through cross-sectoral innovation and locally-anchored practice—turning evidence and insight into measurable impact.
              </p>

              <p className="font-medium text-[#F3F0E8] italic">
                Join IP3 in redefining public policy for the complexity of now—and shaping the transformation of what’s next.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onLearnMore}
                className="px-6 py-3 bg-[#EF715A] hover:bg-[#E05E47] text-[#F3F0E8] font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer group"
              >
                <span>Learn More</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right Visual: Policy Report Artwork */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Decorative background glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#EF715A]/20 to-[#F59E0B]/10 rounded-2xl blur-xl opacity-70 -z-10" />

              {/* Image Display */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#3C3F45] bg-[#12202B] group">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop"
                  alt="IP3 Strategic Policy Research and Practice"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                {/* Subtle dark gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A22] via-[#0E1A22]/30 to-transparent" />
                
                {/* Image caption badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0E1A22]/90 backdrop-blur-md border border-[#3C3F45] text-[#F3F0E8] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#EF715A] block">
                      Policy &amp; Practice Studio
                    </span>
                    <p className="text-xs font-semibold text-[#F3F0E8] line-clamp-1">
                      Translational Research &amp; Advisory
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-[#F59E0B] px-2 py-0.5 rounded bg-[#152735] border border-[#3C3F45] font-semibold shrink-0">
                    EST. 2018
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
