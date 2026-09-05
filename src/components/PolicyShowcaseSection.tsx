import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GlowBackdrop } from './GlowBackdrop';
import { PillSlitGallery } from './PillSlitGallery';
import { PhoneMockup } from './PhoneMockup';

export const PolicyShowcaseSection: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse tracking for fluid parallax glow & perspective
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="policy-showcase" className="relative w-full bg-[#081220] text-slate-100 font-sans antialiased overflow-hidden flex flex-col justify-center selection:bg-[#ff7e67]/30 selection:text-slate-100 py-12 sm:py-16 lg:py-24 border-b border-slate-800/80">
      {/* Dynamic Background Glow Halos */}
      <GlowBackdrop mousePos={mousePos} />

      {/* Main Showcase Section Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 py-4 sm:py-8 flex flex-col justify-center gap-16 lg:gap-24">
        
        {/* UPPER ROW: Policy Advisory & Action Research + Angled Pill Slit Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading & Consultancy Paragraph */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col max-w-2xl"
          >
            {/* Eyebrow */}
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff7e67] font-semibold mb-2 sm:mb-3">
              An Institution for
            </span>

            {/* Main Serif Display Headline */}
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.08] font-normal tracking-tight text-[#ff7e67] mb-6">
              Policy Advisory<br />
              and Action<br />
              Research
            </h2>

            {/* Description Paragraph */}
            <p className="text-slate-300 text-sm sm:text-[15px] lg:text-base leading-[1.7] font-normal text-left max-w-xl text-pretty">
              We deliver expert consultancy in Economic and Environmental Policy, Government Services, and Education, advancing innovation through sound research, creative data models, and tailored digital strategies. Our multidisciplinary services cover the full lifecycle of public policy, program delivery, and organizational design—from strategic planning and implementation to evaluation—ensuring sustainable and impactful results.
            </p>
          </motion.div>

          {/* Right Column: 4-Pill Slit Mask Photographic Gallery */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <PillSlitGallery />
          </div>

        </div>

        {/* LOWER ROW: 3D White Smartphone Mockup + Hub for Innovation & Global Expertise */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Tilted White Smartphone Mockup */}
          <div className="hidden lg:flex lg:col-span-5 justify-center lg:justify-start order-2 lg:order-1">
            <PhoneMockup />
          </div>

          {/* Right Column: IP3 Consulting + Dark Container Heading & Planetary Health Paragraph */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-7 flex flex-col max-w-2xl order-1 lg:order-2"
          >
            {/* Eyebrow */}
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff7e67] font-semibold mb-3">
              IP3 Consulting
            </span>

            {/* Heading enclosed in Surface Card with Border Default */}
            <div className="mb-6 inline-block">
              <div className="bg-[#081220] border border-slate-800 rounded-xl px-5 py-3.5 sm:px-7 sm:py-4 shadow-xl">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] font-serif font-semibold text-slate-100 tracking-tight leading-[1.25]">
                  A Hub for Innovation and<br className="hidden sm:inline" /> Global Expertise
                </h3>
              </div>
            </div>

            {/* Description Paragraph */}
            <p className="text-slate-300 text-sm sm:text-[15px] lg:text-base leading-[1.7] font-normal text-left max-w-xl text-pretty">
              Bringing together experts from a range of disciplines who understand the intricate balance between prosperity and the planet. Our multi-sectoral expertise empowers governments, development agencies, philanthropies, the private sector, and local communities to co-create actionable policies and investable programs that center human well-being and planetary health. We help our partners reimagine economic policy as a tool for sustainable development, social justice, and ecological regeneration.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
