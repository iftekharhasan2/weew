import { useCMS } from '../context/CMSContext';
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, BookOpen, Layers, Users, Sparkles, Shield, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
  onNavigate?: (page: 'home' | 'about' | 'approach' | 'focus', sectionId?: string) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ open, onClose, onNavigate }) => {
  const { data } = useCMS();
  const primaryNav = data.navigation;
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'services' | 'focus' | 'research' | 'people'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Flattened searchable items from navigation and platform modules
  const allSearchable = [
    { title: 'Executive Leadership & Founder', category: 'About', type: 'people', desc: 'Managing Director & Advisory Practice Leaders', href: '#executive', sectionId: '#executive', page: 'about' as const },
    { title: 'Macro & Sector Policy Advisory', category: 'Services', type: 'services', desc: 'Fiscal frameworks, industrial policy & trade reform', href: '#services', sectionId: '#services', page: 'home' as const },
    { title: 'MERLA Monitoring & Evaluation', category: 'Services', type: 'services', desc: 'Real-time performance indicators and governance dashboards', href: '#services', sectionId: '#services', page: 'home' as const },
    { title: 'Program & Survey Design (CAPI)', category: 'Services', type: 'services', desc: 'Large-scale socio-economic & institutional field surveys', href: '#services', sectionId: '#services', page: 'home' as const },
    { title: 'Climate Action & ESG Strategy', category: 'Focus Areas', type: 'focus', desc: 'Decarbonization audits, circular economy & ESG roadmaps', href: '/focus#focus-branch-0', sectionId: '#focus-branch-0', page: 'focus' as const },
    { title: 'Education & Human Capacity', category: 'Focus Areas', type: 'focus', desc: 'Digital learning systems, ADB NSEP & curriculum reform', href: '/focus#focus-branch-1', sectionId: '#focus-branch-1', page: 'focus' as const },
    { title: 'Institutional Governance & Reform', category: 'Focus Areas', type: 'focus', desc: 'Municipal support, data ecosystems & public infrastructure', href: '/focus#focus-branch-2', sectionId: '#focus-branch-2', page: 'focus' as const },
    { title: 'IP3 Policy Architecture (Tree Framework)', category: 'Research', type: 'research', desc: 'Roots, Trunk, and 4 Policy Branch nodes', href: '#tree', sectionId: '#tree', page: 'home' as const },
    { title: 'The Policy Shift Paradigm (Trailer Film)', category: 'Research', type: 'research', desc: 'Interactive macroeconomic systemic transformation overview', href: '#trailer', sectionId: '#trailer', page: 'approach' as const },
    { title: 'Municipal Debt Financing & Green Bonds', category: 'Focus Areas', type: 'focus', desc: 'Mobilizing $140M in green municipal bonds with BMDF', href: '/focus#focus-branch-2', sectionId: '#focus-branch-2', page: 'focus' as const },
    { title: 'Institutional Testimonials & Endorsements', category: 'People', type: 'people', desc: 'Quotes and endorsements from World Bank, ADB, and Mayors', href: '#testimonials', sectionId: '#testimonials', page: 'home' as const },
    { title: 'Client Consultation & Advisory Inquiries', category: 'Contact', type: 'services', desc: 'Direct engagement booking and RFP submission desk', href: '#connect', sectionId: '#connect', page: 'home' as const },
  ];

  const filteredResults = allSearchable.filter((item) => {
    const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
    const matchesQuery = query.trim() === '' || 
      item.title.toLowerCase().includes(query.toLowerCase()) || 
      item.desc.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  const handleSelect = (item: typeof allSearchable[0]) => {
    onClose();
    if (onNavigate && item.page) {
      onNavigate(item.page, item.sectionId);
    } else {
      const target = document.querySelector(item.sectionId || item.href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-12 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#050a12]/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-[#081220] border border-slate-800 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden z-10 my-auto font-sans"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 sm:px-6 py-4 border-b border-slate-800 bg-[#050a12]">
              <Search className="w-5 h-5 text-[#ff7e67] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search policy frameworks, services, publications, team..."
                className="w-full bg-transparent px-3.5 py-1 text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none font-mono"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-slate-400 hover:text-slate-100 rounded-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="ml-2 px-2.5 py-1 text-xs text-slate-400 hover:text-slate-100 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors border border-slate-700 font-mono"
              >
                ESC
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 px-4 sm:px-6 py-3 border-b border-slate-800/80 bg-[#081220] overflow-x-auto text-xs">
              <span className="text-slate-400 font-mono font-medium mr-1 text-[11px] uppercase tracking-wider">Filter:</span>
              {[
                { id: 'all', label: 'All Results' },
                { id: 'services', label: 'Services & Advisory' },
                { id: 'focus', label: 'Focus Areas' },
                { id: 'research', label: 'Research & Policy' },
                { id: 'people', label: 'People & Leadership' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeFilter === tab.id
                      ? 'bg-[#ff7e67] text-slate-950 shadow-md shadow-[#ff7e67]/30'
                      : 'bg-slate-800/60 text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Results List */}
            <div className="p-4 sm:p-6 max-h-[55vh] overflow-y-auto space-y-2">
              {filteredResults.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <Compass className="w-10 h-10 text-slate-600 mx-auto mb-3 stroke-[1.5]" />
                  <p className="text-sm font-semibold text-slate-200">No matching policy assets found</p>
                  <p className="text-xs text-slate-500 mt-1">Try querying "Climate", "MERLA", "Tree", or "Leadership"</p>
                </div>
              ) : (
                filteredResults.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(item)}
                    className="w-full text-left p-3.5 rounded-xl bg-[#050a12]/70 hover:bg-slate-800/80 border border-slate-800/80 hover:border-[#ff7e67]/60 transition-all flex items-start justify-between gap-3 group cursor-pointer"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#ff7e67]/15 text-[#ff7e67] border border-[#ff7e67]/30">
                          {item.category}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-[#ff7e67] transition-colors truncate">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">
                        {item.desc}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#ff7e67] group-hover:translate-x-1 transition-all shrink-0 mt-2" />
                  </button>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-4 sm:px-6 py-3 bg-[#050a12] border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Search across 4 Strategic Fronts & Global Impact Systems</span>
              <button
                onClick={() => {
                  onClose();
                  const target = document.querySelector('#contact-advisory');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[#ff7e67] hover:underline font-semibold flex items-center gap-1"
              >
                <span>Direct Advisory Inquiries</span>
                <ArrowRight className="w-3 h-3 text-[#ff7e67]" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
