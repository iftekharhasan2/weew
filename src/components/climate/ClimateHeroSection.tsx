import { motion } from 'motion/react';
import { ArrowRight, Leaf, Shield, Globe2, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onScrollToSolutions: () => void;
  onOpenContact: () => void;
}

export default function HeroSection({ onScrollToSolutions, onOpenContact }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-[#0E1A22] via-[#12202B] to-[#0E1A22] pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-[#3C3F45]"
    >
      {/* Decorative background grid subtle overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#EF715A_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.05] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-6 xl:col-span-7 space-y-6"
          >
            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F3F0E8] font-normal leading-[1.1] tracking-tight">
              Climate Action, <br />
              <span className="text-[#EF715A] font-semibold">ESG Strategy,</span> <br />
              &amp; Sustainability <br />
              <span className="italic text-[#F59E0B]">Solutions</span>
            </h1>

            {/* Description Paragraph */}
            <p className="text-lg sm:text-xl text-[#AEB0AE] font-light leading-relaxed max-w-2xl">
              Fostering responsible economic growth with consideration of environmental constraints and social equity
            </p>

            {/* CTA Buttons & Highlights */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onScrollToSolutions}
                className="px-7 py-3.5 bg-[#EF715A] hover:bg-[#E05E47] text-white font-medium text-sm sm:text-base rounded-md shadow-lg shadow-[#EF715A]/25 hover:shadow-xl transition-all duration-200 flex items-center gap-2 group cursor-pointer"
              >
                <span>Our Solutions</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenContact}
                className="px-6 py-3.5 bg-[#12202B] hover:bg-[#152735] text-[#F3F0E8] font-medium text-sm sm:text-base rounded-md border border-[#3C3F45] shadow-sm transition-all duration-200 cursor-pointer"
              >
                Request Advisory Brief
              </button>
            </div>

            {/* Key Micro Metrics Badges */}
            <div className="pt-6 border-t border-[#3C3F45] grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <div className="font-serif text-2xl font-bold text-[#EF715A]">$12B+</div>
                <div className="text-xs text-[#AEB0AE] font-medium">Circular Economy Potential</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-[#F59E0B]">100%</div>
                <div className="text-xs text-[#AEB0AE] font-medium">SDG &amp; Paris Aligned</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-[#EF715A]">50+</div>
                <div className="text-xs text-[#AEB0AE] font-medium">Policy &amp; ESG Frameworks</div>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Banner / Illustration Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 xl:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Card framing */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#3C3F45] bg-[#12202B]">
                <img
                  src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1000&q=80"
                  alt="Climate Action & Sustainability Solutions Area of Work"
                  className="w-full h-[400px] sm:h-[460px] object-cover"
                />

                {/* Overlaid graphic gradient & highlights */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A22]/95 via-[#0E1A22]/40 to-transparent flex flex-col justify-end p-6 sm:p-8 text-[#F3F0E8]">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight mb-2 text-[#F3F0E8]">
                    Integrated Policy &amp; Corporate Sustainability
                  </h3>
                  <p className="text-xs sm:text-sm text-[#AEB0AE] leading-relaxed font-light">
                    Transforming economies, industrial sectors, and vulnerable ecosystems through actionable science and resilient governance.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
