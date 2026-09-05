import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface QuickNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const QuickNav: React.FC<QuickNavProps> = ({ activeSection, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navButtons = [
    { id: 'whoweare', label: 'Who we are' },
    { id: 'ourpurpose', label: 'Our Purpose' },
    { id: 'wearedifferent', label: 'We Are Different' },
  ];

  return (
    <div
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
        scrolled
          ? 'bg-[#0E1A22]/95 backdrop-blur-md shadow-lg border-[#3C3F45] py-2.5'
          : 'bg-[#12202B] border-[#3C3F45] py-3.5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {navButtons.map((btn, idx) => {
            const isActive = activeSection === btn.id;
            return (
              <motion.button
                key={btn.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onClick={() => onNavigate(btn.id)}
                className={`py-2.5 px-3 text-center text-xs sm:text-sm font-medium tracking-wide uppercase rounded-md transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#EF715A] text-[#F3F0E8] shadow-md ring-2 ring-[#EF715A]/40 font-semibold'
                    : 'bg-[#152735] hover:bg-[#12202B] text-[#AEB0AE] hover:text-[#F3F0E8] border border-[#3C3F45] hover:border-[#EF715A]/50'
                }`}
              >
                <span>{btn.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
