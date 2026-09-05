import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronDown, ChevronRight, Search, ArrowRight, ShieldCheck, Mail, Phone } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { defaultNavbarConfig } from '../data/navigationData';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
  onNavigate?: (page: 'home' | 'about' | 'approach' | 'focus' | 'services', sectionId?: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  open,
  onClose,
  onOpenSearch,
  onNavigate,
}) => {
  const { data } = useCMS();
  const primaryNav = data.navigation || [];
  const navbar = {
    ...defaultNavbarConfig,
    ...(data.navbar || {}),
    brand: { ...defaultNavbarConfig.brand, ...(data.navbar?.brand || {}) },
    cta: { ...defaultNavbarConfig.cta, ...(data.navbar?.cta || {}) },
  };
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedItem((prev) => (prev === id ? null : id));
  };

  const handleLinkClick = (e: React.MouseEvent, href: string, sectionId?: string, page?: 'home' | 'about' | 'approach' | 'focus' | 'services') => {
    e.preventDefault();
    onClose();

    if (page && onNavigate) {
      onNavigate(page, sectionId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = sectionId || href;
    if (targetId.startsWith('#')) {
      const el = document.querySelector(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#050a12]/80 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-sm h-full bg-[#081220] border-l border-slate-800 shadow-2xl flex flex-col z-10 overflow-hidden font-sans"
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#050a12]">
              <div className="flex items-center gap-2.5">
                {navbar.brand.logoImage ? (
                  <img src={navbar.brand.logoImage} alt={navbar.brand.name} className="w-8 h-8 rounded-lg object-cover shadow-md" />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-[#ff7e67] flex items-center justify-center font-mono font-bold italic text-slate-950 text-xs shadow-md">
                    {navbar.brand.badgeText}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-mono font-bold text-xs uppercase tracking-wider text-slate-100">
                    {navbar.brand.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{navbar.brand.tagline}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Search Bar */}
            {navbar.searchEnabled && (
            <div className="p-4 border-b border-slate-800 bg-[#081220]">
              <button
                onClick={() => {
                  onClose();
                  onOpenSearch();
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#050a12] border border-slate-800 text-xs text-slate-400 hover:border-[#ff7e67]/60 transition-colors font-mono"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#ff7e67]" />
                  <span>{navbar.searchPlaceholder}</span>
                </span>
                <span className="text-[10px] font-mono bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">
                  FIND
                </span>
              </button>
            </div>
            )}

            {/* Nav Accordion List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 divide-y divide-slate-800">
              {primaryNav.map((item) => {
                const isExpanded = expandedItem === item.id;

                return (
                  <div key={item.id} className="pt-2 first:pt-0">
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="w-full flex items-center justify-between py-2 text-left text-xs font-bold font-mono uppercase tracking-wider text-slate-200 hover:text-[#ff7e67] transition-colors"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-[#ff7e67]' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-2 pr-1 pb-3 space-y-3"
                        >
                          <div className="space-y-1 pt-1">
                            {item.links.map((link) => (
                              <a
                                key={link.label}
                                href={link.href}
                                onClick={(e) => handleLinkClick(e, link.href, link.sectionId, link.page)}
                                className="block p-2 rounded-lg text-xs text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
                              >
                                <span className="font-semibold block text-slate-200">{link.label}</span>
                                {link.desc && <span className="text-[11px] text-slate-400 line-clamp-1">{link.desc}</span>}
                              </a>
                            ))}
                          </div>

                          {/* Columns sub-links */}
                          {item.columns.map((col, idx) => (
                            <div key={idx} className="pt-1 border-t border-slate-800">
                              {col.title && (
                                <span className="text-[10px] uppercase font-mono font-bold text-[#ff7e67] block mb-1">
                                  {col.title}
                                </span>
                              )}
                              <div className="grid grid-cols-1 gap-1">
                                {col.links.map((cl) => (
                                  <a
                                    key={cl.label}
                                    href={cl.href}
                                    onClick={(e) => handleLinkClick(e, cl.href, cl.sectionId, cl.page)}
                                    className="text-xs text-slate-400 hover:text-[#ff7e67] py-1 flex items-center gap-1.5 font-mono"
                                  >
                                    <ChevronRight className="w-3 h-3 text-slate-600" />
                                    <span>{cl.label}</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions: CTA */}
            {navbar.cta.enabled && (
            <div className="p-4 bg-[#050a12] border-t border-slate-800 space-y-3">

              <a
                href={navbar.cta.targetId}
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  const target = document.querySelector(navbar.cta.targetId);
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#ff7e67] hover:bg-[#ff694f] text-slate-950 text-xs font-mono font-bold shadow-lg shadow-[#ff7e67]/20 transition-all"
              >
                <span>{navbar.cta.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
              </a>
            </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
