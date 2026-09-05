import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface WeAreDifferentProps {
  onActionClick: (title: string) => void;
}

export const WeAreDifferent: React.FC<WeAreDifferentProps> = ({ onActionClick }) => {
  return (
    <div id="wearedifferent" className="scroll-mt-24">
      {/* 1. Dark Statement Section */}
      <section className="py-20 md:py-28 bg-[#0E1A22] text-[#F3F0E8] relative overflow-hidden border-b border-[#3C3F45]">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#EF715A]/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-cardo text-[#F3F0E8] tracking-wide">
              We are different
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto text-[#AEB0AE] text-base sm:text-lg md:text-xl font-light leading-relaxed space-y-4"
          >
            <p>
              We drive a holistic and inclusive approach to advance policies, processes, and programs.
            </p>
            <p className="text-[#EF715A] font-medium">
              We take a systemic perspective to policy research and develop new ideas and feasible solutions that put the needs of people and the health of the planet at the core of economic and development policy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. What Sets Us Apart - Rich Alternating Rows */}
      <section className="py-16 md:py-24 bg-[#0E1A22] border-b border-[#3C3F45]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {/* Main Section Heading */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-cardo text-[#F3F0E8] leading-tight">
              What Sets Us Apart?
            </h2>
          </div>

          {/* Row 1: Beyond Advice */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-5"
            >
              <h3 className="text-2xl sm:text-3xl font-cardo text-[#F3F0E8] leading-snug">
                Beyond Advice: Expertise that Drives Real Transformation
              </h3>
              <p className="text-[#AEB0AE] text-sm sm:text-base leading-relaxed">
                At IP3 Consulting, we go beyond conventional consulting by combining strategic insights with actionable, impact-driven solutions tailored to each client’s unique challenges. Our expertise lies in creating transformative opportunities that balance economic growth, social equity, and environmental sustainability—anchored in rigorous analysis, creative problem-solving, and a forward-thinking approach.
              </p>
              <p className="text-[#AEB0AE] text-sm sm:text-base leading-relaxed">
                Our commitment to excellence, integrity, and client success defines our approach, allowing us to offer more than just advice: we help you shape dynamic transformation that is anchored in purpose and sustainable over time.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onActionClick('Beyond Advice: Expertise that Drives Real Transformation')}
                  className="px-6 py-2.5 bg-[#EF715A] hover:bg-[#E05E47] text-[#F3F0E8] text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-md shadow-md transition-all cursor-pointer inline-flex items-center gap-2 group"
                >
                  <span>EXPLORE HOW</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl border border-[#3C3F45] bg-[#12202B] group">
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000&auto=format&fit=crop"
                  alt="Strategic Policy Consultation"
                  className="w-full h-72 sm:h-84 object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>

          {/* Row 2: Dynamic Network Model with 3-Image Collage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* 3-Image Collage */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 grid grid-cols-3 gap-3"
            >
              <div className="rounded-xl overflow-hidden shadow-md h-60 sm:h-72 border border-[#3C3F45] bg-[#12202B]">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop"
                  alt="Multidisciplinary Policy Team"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-md h-60 sm:h-72 translate-y-3 border border-[#3C3F45] bg-[#12202B]">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop"
                  alt="Collaborative Research"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-md h-60 sm:h-72 border border-[#3C3F45] bg-[#12202B]">
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop"
                  alt="Global Knowledge Exchange"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-5"
            >
              <h3 className="text-2xl sm:text-3xl font-cardo text-[#F3F0E8] leading-snug">
                Bringing together interesting and complementary skills and expertise
              </h3>
              <p className="text-[#AEB0AE] text-sm sm:text-base leading-relaxed">
                By leveraging a global network of experts with localized knowledge, we can seamlessly align international best practices with the realities on the ground, delivering custom-fit solutions for complex challenges – solutions that are both globally relevant and locally effective.
              </p>
              <p className="text-[#AEB0AE] text-sm sm:text-base leading-relaxed">
                Through our Dynamic Network Model, we bring together visionary economists, policy experts, data and technology professionals, and entrepreneurial leaders from diverse disciplines and geographies. This multidisciplinary approach helps us combining the rigor of research with the agility of entrepreneurial leadership, ensuring your projects are driven by evidence, expertise and innovation that others might miss.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onActionClick('Our Dynamic Network Model')}
                  className="px-6 py-2.5 bg-[#EF715A] hover:bg-[#E05E47] text-[#F3F0E8] text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-md shadow-md transition-all cursor-pointer inline-flex items-center gap-2 group"
                >
                  <span>Our Dynamic Network Model</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Row 3: Rigor and Imagination */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-5"
            >
              <h3 className="text-2xl sm:text-3xl font-cardo text-[#F3F0E8] leading-snug">
                Rigor and Imagination: Innovation with Purpose
              </h3>
              <p className="text-[#AEB0AE] text-sm sm:text-base leading-relaxed">
                What sets IP3 apart is our unique blend of rigorous analysis and bold, creative thinking. By merging data-driven insights with technology-led impact solutions, we bring imagination and precision to every project.
              </p>
              <p className="text-[#AEB0AE] text-sm sm:text-base leading-relaxed">
                Our empathy and deep understanding of economics and diverse branches of social sciences drive original solutions that speak to the real needs of our clients, helping them achieve transformative growth that is rooted in purpose, sustainability, and resilience.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onActionClick('Rigor and Imagination')}
                  className="px-6 py-2.5 bg-[#EF715A] hover:bg-[#E05E47] text-[#F3F0E8] text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-md shadow-md transition-all cursor-pointer inline-flex items-center gap-2 group"
                >
                  <span>Explore Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl border border-[#3C3F45] bg-[#12202B] group">
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop"
                  alt="Data-Driven Innovation and Analytics"
                  className="w-full h-72 sm:h-84 object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>

          {/* Row 4: One Assignment, One Interdisciplinary Approach */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 order-2 lg:order-1"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl border border-[#3C3F45] bg-[#12202B] group">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000&auto=format&fit=crop"
                  alt="Interdisciplinary Policy Practice"
                  className="w-full h-72 sm:h-84 object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-5 order-1 lg:order-2"
            >
              <h3 className="text-2xl sm:text-3xl font-cardo text-[#F3F0E8] leading-snug">
                One Assignment, One Interdisciplinary Approach
              </h3>
              <p className="text-[#AEB0AE] text-sm sm:text-base leading-relaxed">
                IP3’s strength lies in our interdisciplinary approach. Each assignment benefits from a wealth of diverse perspectives drawn from an open, collaborative ecosystem of in-house experts and global partners.
              </p>
              <p className="text-[#AEB0AE] text-sm sm:text-base leading-relaxed">
                This collective mindset enables us to challenge conventional thinking, uncover disruptive ideas, and deliver the very best to our clients. By blending insight, creativity, and strategic foresight, we create solutions that are not only innovative but also carry systemic, lasting impact.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onActionClick('One Assignment, One Interdisciplinary Approach')}
                  className="px-6 py-2.5 bg-[#EF715A] hover:bg-[#E05E47] text-[#F3F0E8] text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-md shadow-md transition-all cursor-pointer inline-flex items-center gap-2 group"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Row 5: Lasting Partnerships, Real Impact */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-5"
            >
              <h3 className="text-2xl sm:text-3xl font-cardo text-[#F3F0E8] leading-snug">
                Lasting Partnerships, Real Impact
              </h3>
              <p className="text-[#AEB0AE] text-sm sm:text-base leading-relaxed">
                At IP3, we don’t just consult; we co-create. Our partnerships are built on trust, collaboration, and a shared mission to drive sustainable growth. Walking alongside our clients every step of the way, we foster environments that integrate policymakers, practitioners, and communities to ensure each solution is grounded in the realities of those it serves.
              </p>
              <p className="text-[#AEB0AE] text-sm sm:text-base leading-relaxed">
                With IP3, you gain a partner who prioritizes your success and is as committed to your goals as you are.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onActionClick('Lasting Partnerships, Real Impact')}
                  className="px-6 py-2.5 bg-[#EF715A] hover:bg-[#E05E47] text-[#F3F0E8] text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-md shadow-md transition-all cursor-pointer inline-flex items-center gap-2 group"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl border border-[#3C3F45] bg-[#12202B] group">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop"
                  alt="Co-Creating Lasting Partnerships"
                  className="w-full h-72 sm:h-84 object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>

          {/* Row 6: Transforming Vision into Lasting Impact */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 order-2 lg:order-1"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl border border-[#3C3F45] bg-[#12202B] group">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop"
                  alt="Translational Policy Impact"
                  className="w-full h-72 sm:h-84 object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-5 order-1 lg:order-2"
            >
              <h3 className="text-2xl sm:text-3xl font-cardo text-[#F3F0E8] leading-snug">
                Transforming Vision into Lasting Impact
              </h3>
              <p className="text-[#AEB0AE] text-sm sm:text-base leading-relaxed">
                We are equipped to navigate complexity, unlocking new opportunities that are transformative and create sustainable impact. We blend systemic, data-driven and research-led policy innovation with impact solutions at every step pairing a rigorous, empathetic approach to problem-solving with bold creativity.
              </p>
              <p className="text-[#AEB0AE] text-sm sm:text-base leading-relaxed">
                We don’t merely respond to change; we anticipate it—crafting purpose-driven, transformative and scalable strategies that align with global sustainability standards and deliver long-term value.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onActionClick('Transforming Vision into Lasting Impact')}
                  className="px-6 py-2.5 bg-[#EF715A] hover:bg-[#E05E47] text-[#F3F0E8] text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-md shadow-md transition-all cursor-pointer inline-flex items-center gap-2 group"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
