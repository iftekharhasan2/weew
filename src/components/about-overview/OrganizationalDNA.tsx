import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ArrowRight } from 'lucide-react';

interface OrganizationalDNAProps {
  onSelectPromo: (title: string, desc: string) => void;
  onCheckServices: () => void;
}

export const OrganizationalDNA: React.FC<OrganizationalDNAProps> = ({ onSelectPromo, onCheckServices }) => {
  const promoCards = [
    {
      id: 'poly-crisis',
      num: '01',
      title: 'Poly-Crisis, Poly-Solutions',
      highlight: 'Our founding principle: poly-crises demand poly-solutions.',
      description: 'In an era where AI intersects with climate, ESG overlaps biodiversity, and informal economies mesh with digital governance, single-axis approaches fail. Our integrated, evidence-based, and co-created strategies deliver sustainable, equitable, and transformative growth.',
      delay: 0.1,
    },
    {
      id: 'policy-design',
      num: '02',
      title: 'Rethinking Policy Design',
      highlight: 'Adaptive, systemic, and co-created policymaking.',
      description: 'Policymakers now face overlapping disruptions — in education, governance, environment, growth and equity. IP3 is not merely a consultancy, but a translational policy studio and systems integrator combining analytical rigor with real-time implementation support.',
      delay: 0.2,
    },
    {
      id: 'global-south',
      num: '03',
      title: 'Global South Focus',
      highlight: 'Grounded realities and cultural relevance.',
      description: 'Deep regional insights, local partnerships, and culturally attuned methodologies ensure our work drives genuine, scalable change that empowers communities throughout the Global South.',
      delay: 0.3,
    },
    {
      id: 'end-to-end',
      num: '04',
      title: 'End-to-End Expertise',
      highlight: 'Full-stack advisory across the entire value chain.',
      description: 'From market diagnostics and data modeling to policy co-design, pilot programs, and implementation support, we offer end-to-end advisory services built to endure.',
      delay: 0.4,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#0E1A22] border-b border-[#3C3F45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: DNA Intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 space-y-5 lg:sticky lg:top-28"
          >
            <h2 className="text-2xl sm:text-3xl font-cardo text-[#F3F0E8] leading-tight">
              Driving Transformation for Sustainable and Equitable Future
            </h2>

            <p className="text-[#AEB0AE] text-[15px] leading-relaxed">
              Our organizational DNA fuses economic intelligence, climate-smart foresight, data &amp; digital governance strategies, and inclusive development approaches — <strong className="text-[#F3F0E8]">focusing on all aspects of the policy advisory value chain – from market assessments up until policy design and implementation</strong>.
            </p>

            <p className="text-[#AEB0AE] text-sm leading-relaxed">
              Providing strategic consulting services for green transition, and innovative approaches to transform teaching, learning and governance systems for the digital age.
            </p>

            <div className="pt-2">
              <button
                onClick={onCheckServices}
                className="px-5 py-2.5 bg-[#EF715A] hover:bg-[#E05E47] text-[#F3F0E8] text-sm font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer group"
              >
                <span>Check All Services</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right Columns: 2x2 Grid of Promo Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {promoCards.map((card) => {
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: card.delay }}
                  className="bg-[#12202B] hover:bg-[#152735] p-6 sm:p-7 rounded-2xl border border-[#3C3F45] hover:border-[#EF715A]/60 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <span className="text-xs font-mono font-semibold text-[#EF715A] uppercase tracking-wider block">
                      Core Dimension {card.num}
                    </span>

                    <h3 className="text-xl font-cardo text-[#F3F0E8] font-semibold group-hover:text-[#EF715A] transition-colors leading-snug">
                      {card.title}
                    </h3>

                    <p className="text-xs text-[#EF715A] font-medium italic">
                      {card.highlight}
                    </p>

                    <p className="text-[#AEB0AE] text-sm leading-relaxed pt-1">
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-[#3C3F45] mt-5">
                    <button
                      onClick={() => onSelectPromo(card.title, card.description)}
                      className="text-xs font-semibold text-[#EF715A] hover:text-[#E05E47] flex items-center gap-1.5 cursor-pointer uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
