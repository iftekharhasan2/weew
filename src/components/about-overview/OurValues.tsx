import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, Users, Lightbulb, ShieldCheck, HeartHandshake, Globe2 } from 'lucide-react';
import { VALUES_ACCORDION_ITEMS } from '../../data/aboutOverviewData';

export const OurValues: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'people':
        return <Users className="w-5 h-5" />;
      case 'innovation':
        return <Lightbulb className="w-5 h-5" />;
      case 'integrity':
        return <ShieldCheck className="w-5 h-5" />;
      case 'flourish':
        return <HeartHandshake className="w-5 h-5" />;
      case 'diversity':
        return <Globe2 className="w-5 h-5" />;
      default:
        return <Lightbulb className="w-5 h-5" />;
    }
  };

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-[#0E1A22] border-b border-[#3C3F45]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Watermark */}
        <div className="relative mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 0.05, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl md:text-7xl font-cardo uppercase font-bold text-[#AEB0AE] absolute left-0 right-0 -top-8 select-none pointer-events-none tracking-wider"
          >
            Diverse Minds, Shared Vision
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <h2 className="text-3xl sm:text-4xl font-cardo text-[#F3F0E8] capitalize">
              Our Values
            </h2>
          </motion.div>
        </div>

        {/* Advanced Accordion */}
        <div className="space-y-4">
          {VALUES_ACCORDION_ITEMS.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#EF715A] bg-[#152735] shadow-xl'
                    : 'border-[#3C3F45] bg-[#12202B] hover:bg-[#152735]'
                }`}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 sm:py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    {/* Item Image / Visual Icon */}
                    {item.imageUrl ? (
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-[#3C3F45] shrink-0 bg-[#0E1A22] shadow-sm">
                        <img
                          src={item.imageUrl}
                          alt={item.imageAlt || item.title}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-[#0E1A22]/20" />
                        <div className="absolute bottom-0 right-0 p-0.5 bg-[#0E1A22]/90 rounded-tl border-t border-l border-[#3C3F45] text-[#EF715A]">
                          <div className="scale-75 origin-bottom-right">
                            {getIcon(item.iconName)}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-200 ${
                          isOpen
                            ? 'bg-[#EF715A] text-white shadow-sm'
                            : 'bg-[#152735] text-[#AEB0AE] border border-[#3C3F45]'
                        }`}
                      >
                        {getIcon(item.iconName)}
                      </div>
                    )}

                    <div>
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase text-[#EF715A] tracking-wider block">
                        Principle 0{index + 1}
                      </span>
                      <h3 className="text-base sm:text-xl font-cardo font-semibold text-[#F3F0E8] group-hover:text-[#EF715A] transition-colors leading-snug">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0 ml-3 ${
                      isOpen ? 'bg-[#12202B] text-[#EF715A] border border-[#3C3F45]' : 'text-[#AEB0AE] bg-[#152735] border border-[#3C3F45]'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-3 border-t border-[#3C3F45]/60">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                          {item.imageUrl && (
                            <div className="md:col-span-4 rounded-xl overflow-hidden h-44 sm:h-48 border border-[#3C3F45] relative bg-[#0E1A22] shadow-md group">
                              <img
                                src={item.imageUrl}
                                alt={item.imageAlt || item.title}
                                referrerPolicy="no-referrer"
                                loading="lazy"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A22]/90 via-transparent to-transparent" />
                              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono text-[#F3F0E8] bg-[#0E1A22]/90 backdrop-blur-xs border border-[#3C3F45] px-2.5 py-1 rounded-lg">
                                <span className="text-[#EF715A] font-semibold">{item.title}</span>
                                <span className="text-[#AEB0AE]">IP3 Value</span>
                              </div>
                            </div>
                          )}
                          <div className={`${item.imageUrl ? 'md:col-span-8' : 'md:col-span-12'} space-y-3`}>
                            <p className="text-[#AEB0AE] text-sm sm:text-base leading-relaxed">
                              {item.content}
                            </p>
                            <div className="flex items-center gap-2 pt-1 text-xs">
                              <span className="text-[11px] font-mono text-[#EF715A] bg-[#0E1A22] border border-[#3C3F45] px-2.5 py-1 rounded">
                                Institutional Alignment
                              </span>
                              <span className="text-[#AEB0AE]">
                                Practice &amp; Advisory Standard
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
