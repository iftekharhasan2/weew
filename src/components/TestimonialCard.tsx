import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useCMS, defaultTestimonialsSection } from '../context/CMSContext';
import { TestimonialItem } from '../types';

interface TestimonialCardProps {
  testimonials?: TestimonialItem[];
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonials: propsTestimonials
}) => {
  const { data } = useCMS();
  const sectionData = data.testimonialsSection || defaultTestimonialsSection;
  const testimonials = propsTestimonials || sectionData.items || defaultTestimonialsSection.items;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="w-full py-24 sm:py-28 lg:py-32 bg-[var(--bg)] text-[var(--white)] overflow-hidden relative transition-colors duration-250">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-[#ff7e67]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-8 sm:mb-12 relative z-20">
          <div>
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#ff7e67] uppercase">
              {sectionData.sectionBadge || "INSTITUTIONAL ENDORSEMENTS"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight">
            {sectionData.sectionTitle || "Trusted by Global Leaders & Development Partners"}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            {sectionData.sectionSubtitle || "See how our institutional advisory and systemic transformation strategies create lasting impact."}
          </p>
        </div>

        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
          {/* 3D Coverflow Container */}
          <div className="relative w-full min-h-[320px] sm:min-h-[290px] flex items-center justify-center perspective-[1200px] overflow-visible py-6 sm:py-8">
            {testimonials.map((item, index) => {
              let offset = index - activeIndex;
              if (offset > testimonials.length / 2) offset -= testimonials.length;
              if (offset < -testimonials.length / 2) offset += testimonials.length;

              const isCenter = offset === 0;
              const isVisible = Math.abs(offset) <= 1; // Center and side cards

              if (!isVisible) return null;

              const rotateY = offset * -28; // 3D rotation angle
              const translateX = offset * 180; // Offset on X-axis
              const translateZ = isCenter ? 30 : -90;
              const zIndex = 20 - Math.abs(offset);

              return (
                <motion.div
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  animate={{
                    rotateY,
                    x: translateX,
                    z: translateZ,
                    opacity: 1,
                    scale: isCenter ? 1 : 0.88
                  }}
                  transition={{ type: 'spring', stiffness: 220, damping: 25 }}
                  style={{ zIndex }}
                  className={`absolute cursor-pointer w-[86%] sm:w-[72%] max-w-[520px] bg-[#081220] text-slate-100 rounded-2xl p-3 sm:p-4 lg:p-5 shadow-2xl transition-all select-none opacity-100 ${
                    isCenter
                      ? 'ring-2 ring-[#ff7e67] border-2 border-[#ff7e67] shadow-[0_16px_36px_-8px_rgba(255,126,103,0.35)]'
                      : 'border border-slate-800 shadow-xl'
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-center">
                    
                    {/* Left Content Column */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-1.5 text-left">
                      
                      {/* Organization Badge / Logo */}
                      <div className="flex items-center gap-2">
                        {item.logoUrl ? (
                          <div className="h-7 px-2.5 bg-[#050a12] rounded-lg shadow-xs border border-slate-800 flex items-center justify-center shrink-0">
                            <img
                              src={item.logoUrl}
                              alt="Organization Logo"
                              className="h-full w-auto object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        ) : (
                          <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#ff7e67] bg-[#ff7e67]/10 px-2.5 py-0.5 rounded-md border border-[#ff7e67]/30">
                            {item.organization || "Verified Institutional Endorsement"}
                          </span>
                        )}
                      </div>

                      {/* Testimonial Quote */}
                      <div className="relative">
                        <Quote className="w-4 h-4 text-[#ff7e67]/60 mb-0.5" />
                        <p className="text-slate-200 font-medium text-[11px] sm:text-xs lg:text-sm leading-tight tracking-tight line-clamp-3 sm:line-clamp-4">
                          {item.quote}
                        </p>
                      </div>

                      {/* Decorative Accent Line */}
                      <div className="w-6 h-0.5 bg-[#ff7e67] rounded-full my-0.5" />

                      {/* Author Details */}
                      <div className="space-y-0.5">
                        <h3 className="text-xs sm:text-sm font-black text-slate-100 tracking-tight">
                          {item.authorName}
                        </h3>
                        <p className="text-[10px] sm:text-[11px] text-[#ff7e67] font-semibold leading-tight">
                          {item.authorTitle}
                        </p>
                        <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium leading-tight">
                          {item.organization}
                        </p>
                      </div>
                    </div>

                    {/* Right Photo Column */}
                    <div className="lg:col-span-5 flex justify-center items-center">
                      <div className="relative w-full h-[105px] sm:h-[120px] lg:h-[135px] rounded-xl overflow-hidden shadow-sm border border-slate-800 group bg-[#050a12]">
                        <img
                          src={item.photoUrl}
                          alt={item.authorName}
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-100"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800';
                          }}
                        />
                        <div className="absolute inset-0 ring-1 ring-slate-800 rounded-xl pointer-events-none" />
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Coverflow Navigation Controls */}
          <div className="relative z-30 flex items-center justify-center gap-5 mt-6 sm:mt-8">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-[#081220] border border-slate-800 text-slate-200 flex items-center justify-center hover:bg-[#ff7e67] hover:text-slate-950 hover:border-[#ff7e67] transition-all shadow-md active:scale-95 cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeIndex ? 'w-8 bg-[#ff7e67]' : 'w-2.5 bg-slate-800 hover:bg-[#ff7e67]/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-[#081220] border border-slate-800 text-slate-200 flex items-center justify-center hover:bg-[#ff7e67] hover:text-slate-950 hover:border-[#ff7e67] transition-all shadow-md active:scale-95 cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialCard;
