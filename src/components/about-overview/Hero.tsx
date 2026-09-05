import React from 'react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-[440px] md:min-h-[500px] flex items-center justify-center overflow-hidden py-16 md:py-24 bg-[#0E1A22] text-[#F3F0E8] border-b border-[#3C3F45]"
    >
      {/* Dummy Background Image with Atmospheric Gradient Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
          alt="Architectural Policy Institution Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-20 filter saturate-50 contrast-125 transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E1A22]/95 via-[#0E1A22]/85 to-[#0E1A22]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E1A22] via-transparent to-[#0E1A22] opacity-80" />
      </div>

      {/* Background Graphic Grid / Ambient Overlay */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(#AEB0AE 1px, transparent 1px), radial-gradient(#AEB0AE 1px, #0E1A22 1px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px',
          }}
        />
      </div>

      {/* Subtle Gradient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[360px] bg-gradient-to-tr from-[#EF715A]/25 via-[#F59E0B]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        {/* Animated Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-3"
        >
          <span className="inline-block text-sm md:text-base font-semibold tracking-widest uppercase text-[#EF715A] font-sans px-4 py-1.5 rounded-full bg-[#12202B] border border-[#3C3F45] shadow-sm backdrop-blur-sm">
            IP3 Consulting
          </span>
        </motion.div>

        {/* Animated Main Title */}
        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-cardo font-normal tracking-tight text-[#F3F0E8] mb-6"
        >
          About Us
        </motion.h1>

        {/* Subtitle / Breadcrumb hint */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="max-w-2xl mx-auto text-[#AEB0AE] text-base md:text-lg font-light leading-relaxed"
        >
          Pioneering translational policy solutions, strategic governance innovation, and sustainable development across the Global South.
        </motion.p>
      </div>
    </section>
  );
};
