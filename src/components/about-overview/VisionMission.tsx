import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface VisionMissionProps {
  onLearnMoreAI: () => void;
}

export const VisionMission: React.FC<VisionMissionProps> = ({ onLearnMoreAI }) => {
  return (
    <section id="ourpurpose" className="py-16 md:py-24 bg-[#0E1A22] border-b border-[#3C3F45] scroll-mt-24 space-y-20">
      {/* Block 1: OUR VISION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Vision Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-4"
          >
            <div>
              <h2 className="text-sm font-mono font-semibold tracking-wider uppercase text-[#EF715A]">
                OUR VISION
              </h2>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-cardo text-[#F3F0E8] leading-tight">
              Policy Innovation for Transformative Growth
            </h3>
            <p className="text-[#AEB0AE] text-base md:text-lg leading-relaxed pt-2">
              We envision a future where governments, private organizations, and communities thrive through systemic transformation and innovative solutions that drive sustainable economic development, social equity, and environmental resilience.
            </p>
          </motion.div>

          {/* Right Vision Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-2xl bg-[#12202B] p-6 sm:p-8 shadow-xl border border-[#3C3F45] overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#EF715A]/10 rounded-full blur-2xl -z-0" />
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-[#3C3F45] pb-4">
                  <span className="font-bold text-sm text-[#F3F0E8] uppercase tracking-wider font-sans">
                    IP3 Policy Architecture Matrix
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#152735] text-[#F59E0B] border border-[#3C3F45] font-medium">
                    Integrated 2025
                  </span>
                </div>

                {/* Single unified picture display */}
                <div className="relative rounded-xl overflow-hidden border border-[#3C3F45] bg-[#0E1A22] group">
                  <img
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
                    alt="IP3 Policy Architecture Matrix & Systems Transformation"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-64 sm:h-72 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A22] via-[#0E1A22]/40 to-transparent" />
                  
                  {/* Overlay information badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-lg bg-[#0E1A22]/90 backdrop-blur-md border border-[#3C3F45] flex items-center justify-between text-[#F3F0E8]">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#EF715A] block">
                        Core Pillars
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-[#F3F0E8]">
                        Climate &amp; ESG • Digital Gov • Educational Innovation
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-[#F59E0B] px-2 py-0.5 rounded bg-[#152735] border border-[#3C3F45] font-semibold shrink-0">
                      Matrix
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Block 2: OUR MISSION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Mission Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#3C3F45]">
              <img
                src="https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1000&auto=format&fit=crop"
                alt="Transformative Public Policy Research"
                className="w-full h-72 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A22] via-[#0E1A22]/40 to-transparent flex items-end p-6">
                <div className="text-[#F3F0E8] space-y-1">
                  <span className="text-xs uppercase tracking-widest text-[#EF715A] font-mono">Empowering The Global South</span>
                  <h4 className="text-lg sm:text-xl font-cardo text-[#F3F0E8] font-semibold">
                    Translating Visionary Policies into Measurable Real-World Impact
                  </h4>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Mission Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-5 order-1 lg:order-2"
          >
            <div>
              <h2 className="text-sm font-mono font-semibold tracking-wider uppercase text-[#EF715A]">
                OUR MISSION
              </h2>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-cardo text-[#F3F0E8] leading-tight">
              Transformative Impact through Strategic Innovation
            </h3>

            <p className="text-[#AEB0AE] text-base md:text-lg leading-relaxed">
              <span className="font-semibold text-[#F3F0E8]">Driving growth</span> through purposeful, sustainable, equitable, and resilient systemic transformation. We empower governments, organizations, and communities to build resilient institutions, elevate education systems through digital innovation, optimize governance with data-driven strategies, and drive impactful climate action.
            </p>

            <p className="text-[#AEB0AE] text-sm sm:text-base leading-relaxed">
              Our work enhances systemic efficiency, advances equitable service delivery, and achieves measurable sustainability outcomes for people and the planet.
            </p>

            <div className="pt-2">
              <button
                onClick={onLearnMoreAI}
                className="px-6 py-3 bg-[#EF715A] hover:bg-[#E05E47] text-[#F3F0E8] font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer group"
              >
                <span>Learn More About AI in Policy</span>
                <ArrowUpRight className="w-4 h-4 text-[#F3F0E8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
