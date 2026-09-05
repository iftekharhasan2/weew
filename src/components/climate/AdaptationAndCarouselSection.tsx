import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, Play, Sparkles } from 'lucide-react';

interface AdaptationAndCarouselProps {
  onOpenVideo: (videoId: string) => void;
  onOpenContact: () => void;
}

const CAROUSEL_SLIDES = [
  {
    title: 'Climate Vulnerability Mapping',
    subtitle: 'High-resolution GIS modeling for coastal & delta flood zones',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    tag: 'Adaptation'
  },
  {
    title: 'Industrial Energy & Water Audits',
    subtitle: 'Decarbonizing supply chains & textile manufacturing',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    tag: 'Resource Efficiency'
  },
  {
    title: 'Biogas & Circular Bio-Waste',
    subtitle: 'Decentralized municipal and rural clean energy systems',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    tag: 'Renewables'
  }
];

export default function AdaptationAndCarouselSection({ onOpenVideo, onOpenContact }: AdaptationAndCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);

  return (
    <section id="climate-adaptation" className="py-16 sm:py-20 bg-[#0E1A22] border-b border-[#3C3F45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Two Column Block: Adaptation Card & Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Comprehensive Adaptation Card */}
          <div className="lg:col-span-6 bg-[#12202B] border border-[#3C3F45] rounded-2xl p-8 sm:p-10 text-[#F3F0E8] shadow-xl flex flex-col justify-between relative overflow-hidden">
            {/* Background organic shape */}
            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#EF715A]/10 blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-snug tracking-tight text-[#F3F0E8]">
                Climate Adaptation, and Resilience Building Solutions
              </h3>

              <p className="text-[#AEB0AE] text-sm sm:text-base leading-relaxed font-light">
                At IP3 Consulting, we specialize in delivering comprehensive Climate Action, Adaptation, and Resilience Building Solutions tailored to the unique challenges faced by developing countries.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="text-xs uppercase tracking-widest text-[#F59E0B] font-semibold">Our core services include:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#AEB0AE] font-light">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#EF715A] shrink-0" />
                    <span>Climate Finance Mobilization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#EF715A] shrink-0" />
                    <span>Climate Risk &amp; Vulnerability</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#EF715A] shrink-0" />
                    <span>Adaptation Planning &amp; Rollout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#EF715A] shrink-0" />
                    <span>Resilient Infrastructure Design</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-full">
                    <CheckCircle2 className="w-4 h-4 text-[#EF715A] shrink-0" />
                    <span>Institutional Capacity Building &amp; Training</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-[#3C3F45] relative z-10 flex items-center justify-between">
              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 text-[#EF715A] hover:text-[#E05E47] font-medium text-sm transition-colors group cursor-pointer"
              >
                <span>Inquire About Climate Resilience Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Image Carousel */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-[#12202B] rounded-2xl p-6 sm:p-8 border border-[#3C3F45] shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-serif text-xl font-bold text-[#F3F0E8]">Projects in Practice</h4>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="w-8 h-8 rounded-full border border-[#3C3F45] bg-[#152735] hover:bg-[#3C3F45] flex items-center justify-center text-[#F3F0E8] transition-colors cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-8 h-8 rounded-full border border-[#3C3F45] bg-[#152735] hover:bg-[#3C3F45] flex items-center justify-center text-[#F3F0E8] transition-colors cursor-pointer"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Slide Active Container */}
            <div className="relative rounded-xl overflow-hidden h-[260px] sm:h-[300px] shadow-inner bg-[#0E1A22] border border-[#3C3F45]/60 group">
              <img
                src={CAROUSEL_SLIDES[currentSlide].image}
                alt={CAROUSEL_SLIDES[currentSlide].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A22]/90 via-[#0E1A22]/30 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#F59E0B] mb-1">
                  {CAROUSEL_SLIDES[currentSlide].tag}
                </span>
                <h5 className="font-serif text-lg sm:text-xl font-bold text-[#F3F0E8] mb-1">
                  {CAROUSEL_SLIDES[currentSlide].title}
                </h5>
                <p className="text-xs text-[#AEB0AE] font-light">
                  {CAROUSEL_SLIDES[currentSlide].subtitle}
                </p>
              </div>
            </div>

            {/* Carousel indicator dots */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {CAROUSEL_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentSlide === idx ? 'w-6 bg-[#EF715A]' : 'w-2 bg-[#3C3F45]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>

        {/* IP3 Insights & Video Section */}
        <div className="mt-14 pt-12 border-t border-[#3C3F45]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading, description & CTA */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F3F0E8] font-normal leading-tight">
                IP3 Insights
              </h2>
              <p className="text-sm text-[#AEB0AE] font-light leading-relaxed">
                Watch our lead policy economists and ESG consultants break down regulatory transitions, circular economic models, and actionable decarbonization pathways.
              </p>
              
              <div className="pt-2">
                <button
                  onClick={onOpenContact}
                  className="px-6 py-3 bg-[#EF715A] hover:bg-[#E05E47] text-white text-xs sm:text-sm font-semibold rounded-md shadow-md transition-all duration-200 flex items-center gap-2 cursor-pointer"
                >
                  <span>Upgrade Your Sustainable Operation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column: 2 Video Preview Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Video 1 */}
              <div
                onClick={() => onOpenVideo('video-1')}
                className="group relative rounded-xl overflow-hidden bg-[#12202B] shadow-md cursor-pointer border border-[#3C3F45] hover:border-[#EF715A]/60 transition-all duration-300"
              >
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80"
                  alt="IP3 Insight Video 1"
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300 opacity-75 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A22]/90 via-[#0E1A22]/30 to-transparent flex flex-col justify-between p-4 text-white">
                  <div className="self-end w-8 h-8 rounded-full bg-[#152735]/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#EF715A] group-hover:scale-110 transition-all border border-[#3C3F45]">
                    <Play className="w-3.5 h-3.5 text-[#F3F0E8] fill-[#F3F0E8] ml-0.5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#F59E0B]">Brief 01</span>
                    <h5 className="font-serif text-sm font-bold text-[#F3F0E8] leading-snug">
                      Climate Risk Impact &amp; Sustainable Underwriting
                    </h5>
                  </div>
                </div>
              </div>

              {/* Video 2 */}
              <div
                onClick={() => onOpenVideo('video-2')}
                className="group relative rounded-xl overflow-hidden bg-[#12202B] shadow-md cursor-pointer border border-[#3C3F45] hover:border-[#EF715A]/60 transition-all duration-300"
              >
                <img
                  src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80"
                  alt="IP3 Insight Video 2"
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300 opacity-75 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A22]/90 via-[#0E1A22]/30 to-transparent flex flex-col justify-between p-4 text-white">
                  <div className="self-end w-8 h-8 rounded-full bg-[#152735]/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#EF715A] group-hover:scale-110 transition-all border border-[#3C3F45]">
                    <Play className="w-3.5 h-3.5 text-[#F3F0E8] fill-[#F3F0E8] ml-0.5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#F59E0B]">Brief 02</span>
                    <h5 className="font-serif text-sm font-bold text-[#F3F0E8] leading-snug">
                      Circular Economy &amp; Waste-to-Resource Blueprint
                    </h5>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
