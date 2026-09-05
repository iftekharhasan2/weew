import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, ExternalLink, ChevronRight } from 'lucide-react';
import { PrimaryNavItem, defaultNavbarConfig } from '../data/navigationData';
import { useCMS } from '../context/CMSContext';

interface MegaMenuProps {
  item: PrimaryNavItem;
  onClose: () => void;
  onNavigate?: (page: 'home' | 'about' | 'approach' | 'focus' | 'services', sectionId?: string) => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ item, onClose, onNavigate }) => {
  const { data } = useCMS();
  const badge = data.navbar?.megaMenuBadge ?? defaultNavbarConfig.megaMenuBadge;

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
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      onMouseLeave={onClose}
      className="absolute top-full left-0 right-0 z-40 bg-[#050a12]/98 backdrop-blur-2xl border-b border-slate-800 shadow-2xl shadow-black/90 font-sans select-none"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Primary Column / Main Links */}
          <div className="lg:col-span-4 border-r border-slate-800/80 pr-0 lg:pr-8 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ff7e67] flex items-center gap-1.5 font-mono">
                <span>{item.label}</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 border border-slate-700/60 px-2 py-0.5 rounded">
                {badge}
              </span>
            </div>

            <ul className="space-y-2">
              {item.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href, link.sectionId, link.page)}
                    className="group block p-2.5 rounded-xl hover:bg-slate-800/50 transition-all border border-transparent hover:border-slate-700/70 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-[#ff7e67] transition-colors">
                        {link.label}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                    {link.desc && (
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {link.desc}
                      </p>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Grouped Columns */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {item.columns.map((column, i) => (
              <div key={column.title || `col-${i}`} className="space-y-3">
                {column.title && (
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block pb-1 border-b border-slate-800/80">
                    {column.title}
                  </span>
                )}
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href, link.sectionId, link.page)}
                        className="text-xs text-slate-300 hover:text-[#ff7e67] transition-colors flex items-center gap-1.5 group py-1 cursor-pointer"
                      >
                        <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#ff7e67] group-hover:translate-x-0.5 transition-all" />
                        <span className="truncate">{link.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Editorial Promos */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {item.promos.map((promo, i) => (
              <a
                key={promo.title}
                href={promo.href}
                onClick={(e) => handleLinkClick(e, promo.href)}
                className="group relative flex items-center gap-3.5 p-3 rounded-xl bg-[#081220] border border-slate-800 hover:border-[#ff7e67]/60 shadow-md transition-all overflow-hidden cursor-pointer"
              >
                <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-[#0a182b] relative">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-[#050a12]/30"></div>
                </div>

                <div className="min-w-0 flex-1">
                  <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#ff7e67] font-bold block mb-1">
                    {promo.eyebrow}
                  </span>
                  <h4 className="text-xs font-bold text-slate-100 group-hover:text-[#ff7e67] transition-colors line-clamp-2 leading-snug">
                    {promo.title}
                  </h4>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#ff7e67] group-hover:translate-x-1 transition-all shrink-0" />
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* MegaMenu Footer */}
      <div className="bg-[#081220] border-t border-slate-800 py-3 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff7e67]"></span>
            <span className="font-medium text-slate-300">Not sure where to start with institutional reform?</span>
          </div>
          <a
            href="#connect"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              const target = document.querySelector('#contact-advisory');
              if (target) target.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-[#ff7e67] hover:text-[#ffa190] font-bold flex items-center gap-1.5 transition-colors cursor-pointer group font-mono text-xs"
          >
            <span>Talk to an IP3 Practice Specialist</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};
