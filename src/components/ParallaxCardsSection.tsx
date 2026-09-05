import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Search,
  SlidersHorizontal,
  X,
  Copy,
  Check,
  Shield,
  Info,
  Layers,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export interface BorderConfig {
  borderTopBehind?: boolean;
  borderBottomBehind?: boolean;
  borderLeftBehind?: boolean;
  borderRightBehind?: boolean;
}

export interface CardData {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  badge?: string;
  backgroundUrl: string;
  cutoutUrl?: string;
  shadowUrl?: string;
  frameColor?: string;
  borderConfig?: BorderConfig;
}

export interface AppSettings {
  maxAngle: number;
  lerpFactor: number;
  perspective: number;
  cardScale: number;
}

type FilterBadge = 'All' | 'Legendary' | 'Mythic' | 'Rare' | 'Exotic' | 'Special';

class SoundManager {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  playWhoosh() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {
      // Audio fallback
    }
  }
}

const soundManager = new SoundManager();

const ALL_CARDS: CardData[] = [
  {
    id: 'cyber-samurai',
    title: 'Cyber Samurai',
    subtitle: 'Neon Sector 9',
    description: 'Master of the High-Frequency Blade roaming the electric glow of dystopian sector 9.',
    badge: 'LEGENDARY',
    backgroundUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop',
    shadowUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop',
    frameColor: '#dc2626',
  },
  {
    id: 'cosmic-voyager',
    title: 'Cosmic Voyager',
    subtitle: 'Event Horizon Ops',
    description: 'Pioneering beyond the Event Horizon into uncharted star nurseries and quantum anomalies.',
    badge: 'MYTHIC',
    backgroundUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    shadowUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    frameColor: '#2563eb',
  },
  {
    id: 'forest-guardian',
    title: 'Forest Guardian',
    subtitle: 'Ancient Druid Realm',
    description: 'Channeling ancient druid sigils to protect the sacred luminescent canopy from corruption.',
    badge: 'RARE',
    backgroundUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop',
    shadowUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop',
    frameColor: '#10b981',
  },
  {
    id: 'infernal-wyrm',
    title: 'Infernal Wyrm',
    subtitle: 'Volcanic Abyssal Drake',
    description: 'Awakened from subterranean obsidian chambers, breathing liquid solar fire.',
    badge: 'EXOTIC',
    backgroundUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop',
    shadowUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop',
    frameColor: '#f59e0b',
  },
  {
    id: 'neon-horizon',
    title: 'Neon Horizon',
    subtitle: 'Retrowave Grid Unit',
    description: 'Screaming down the 80s grid line at mach speed under a perpetual retro magenta sun.',
    badge: 'SPECIAL',
    backgroundUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop',
    shadowUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop',
    frameColor: '#eab308',
  },
  {
    id: 'void-sorcerer',
    title: 'Void Sorcerer',
    subtitle: 'Deep Space Galaxy',
    description: 'Bending black hole singularities to cast forbidden spatial transmutation magic.',
    badge: 'LEGENDARY',
    backgroundUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop',
    shadowUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop',
    frameColor: '#a855f7',
  },
];

interface ParallaxCardProps {
  card: CardData;
  settings: AppSettings;
  onShowDetails?: (card: CardData) => void;
}

const ParallaxCard: React.FC<ParallaxCardProps> = ({ card, settings, onShowDetails }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const targetAngleRef = useRef({ x: 0, y: 0 });
  const currentAngleRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateRotation = () => {
      const lerp = settings.lerpFactor;
      currentAngleRef.current.x += (targetAngleRef.current.x - currentAngleRef.current.x) * lerp;
      currentAngleRef.current.y += (targetAngleRef.current.y - currentAngleRef.current.y) * lerp;

      if (cardRef.current) {
        cardRef.current.style.setProperty('--angle-x', `${currentAngleRef.current.x.toFixed(2)}deg`);
        cardRef.current.style.setProperty('--angle-y', `${currentAngleRef.current.y.toFixed(2)}deg`);
      }

      animFrameRef.current = requestAnimationFrame(updateRotation);
    };

    animFrameRef.current = requestAnimationFrame(updateRotation);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [settings.lerpFactor]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = x / rect.width;
    const py = y / rect.height;

    const max = settings.maxAngle;
    targetAngleRef.current = {
      x: (py - 0.5) * -2 * max,
      y: (px - 0.5) * 2 * max,
    };
  };

  const handlePointerEnter = () => {
    soundManager.playWhoosh();
  };

  const handlePointerLeave = () => {
    targetAngleRef.current = { x: 0, y: 0 };
  };

  const borderClasses = [
    card.borderConfig?.borderTopBehind ? 'border-top-behind' : '',
    card.borderConfig?.borderBottomBehind ? 'border-bottom-behind' : '',
    card.borderConfig?.borderLeftBehind ? 'border-left-behind' : '',
    card.borderConfig?.borderRightBehind ? 'border-right-behind' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const scale = settings.cardScale || 1;

  return (
    <div
      className="relative group flex items-center justify-center shrink-0"
      style={{
        width: `calc(20rem * ${scale} + 1rem)`,
        height: `calc(28rem * ${scale} + 2rem)`,
      }}
    >
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={() => onShowDetails?.(card)}
        className={`parallax-card ${borderClasses} cursor-pointer origin-center`}
        style={
          {
            '--card-perspective': `${settings.perspective}rem`,
            '--z-factor': 1,
            transform: `scale(${scale})`,
          } as React.CSSProperties
        }
      >
        <div className="card-layer layer-shadow">
          <img
            src={card.shadowUrl || card.backgroundUrl}
            alt="shadow"
            className="w-full h-full object-cover filter blur-xl opacity-50"
          />
        </div>

        <div className="card-layer layer-bg rounded-[20px] overflow-hidden">
          <img
            src={card.backgroundUrl}
            alt={card.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80" />
        </div>

        {/* Layer 3: Cutout Image Layer removed */}

        {/* Layer 4: Frame Border (Removed frame border) */}

        <div className="card-layer layer-content p-3.5 flex flex-col justify-end pointer-events-none">
          <div className="bg-[#081220]/95 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-2xl space-y-2 text-slate-100">
            {card.badge && (
              <span className="inline-block px-2.5 py-0.5 rounded text-[13px] font-mono font-bold uppercase tracking-wider bg-[#ff7e67]/15 text-[#ff7e67] border border-[#ff7e67]/30">
                {card.badge}
              </span>
            )}
            <h3 className="text-[21px] sm:text-[22px] font-bold tracking-tight text-slate-100 leading-tight">
              {card.title}
            </h3>
            <p className="text-[14px] text-slate-300 leading-relaxed line-clamp-2 font-normal">
              {card.description}
            </p>
            <div className="pt-1">
              <span className="text-[15px] font-mono font-bold text-[#ff7e67] flex items-center gap-1">
                More Details &gt;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CardDetailsModalProps {
  card: CardData;
  onClose: () => void;
}

const CardDetailsModal: React.FC<CardDetailsModalProps> = ({ card, onClose }) => {
  const [copiedSummary, setCopiedSummary] = useState(false);

  const handleCopySummary = () => {
    const summaryText = `[PROJECT SUMMARY]\nTitle: ${card.title}${card.subtitle ? `\nSubtitle: ${card.subtitle}` : ''}${card.badge ? `\nClassification: ${card.badge}` : ''}\n\nSummary & Scope:\n${card.description}`;
    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-[#081220] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-[#050a12]/95">
          <div className="flex items-center gap-2.5">
            <span
              className="w-3 h-3 rounded-full shadow-sm bg-[#ff7e67]"
            />
            <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              {card.title}
              {card.badge && (
                <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-bold rounded-full bg-[#ff7e67]/15 text-[#ff7e67] border border-[#ff7e67]/30">
                  {card.badge}
                </span>
              )}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto">
          <div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden border border-slate-800 bg-[#050a12] flex items-center justify-center">
            <img
              src={card.backgroundUrl}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081220] via-[#081220]/40 to-transparent" />
            {card.cutoutUrl && (
              <img
                src={card.cutoutUrl}
                alt={card.title}
                className="relative z-10 h-36 sm:h-44 object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
              />
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#ff7e67]" /> Project Description & Summary
            </h3>
            <div className="p-4 bg-[#050a12]/80 border border-slate-800 rounded-2xl text-xs text-slate-300 leading-relaxed font-sans">
              {card.description}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800 bg-[#050a12]/90 flex items-center justify-between">
          <button
            onClick={handleCopySummary}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
              copiedSummary 
                ? 'bg-[#ff7e67]/20 border border-[#ff7e67] text-[#ff7e67]' 
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            {copiedSummary ? <Check className="w-3.5 h-3.5 text-[#ff7e67]" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            {copiedSummary ? 'Summary Copied!' : 'Copy Project Summary'}
          </button>
        </div>
      </div>
    </div>
  );
};

interface ParallaxCardsSectionProps {
  embedded?: boolean;
}

const BADGE_FILTERS: { label: string; value: FilterBadge }[] = [
  { label: 'All Artifacts', value: 'All' },
  { label: 'Legendary', value: 'Legendary' },
  { label: 'Mythic', value: 'Mythic' },
  { label: 'Rare', value: 'Rare' },
  { label: 'Exotic', value: 'Exotic' },
  { label: 'Special', value: 'Special' },
];

export const ParallaxCardsSection: React.FC<ParallaxCardsSectionProps> = ({ embedded = false }) => {
  const { data } = useCMS();
  const cards = (data.parallaxCards && data.parallaxCards.length > 0 ? data.parallaxCards : ALL_CARDS) as CardData[];
  const [activeCategory, setActiveCategory] = useState<FilterBadge>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [detailsCard, setDetailsCard] = useState<CardData | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const cardsPerPage = 4;

  // Reset page when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);

  const customSettings: AppSettings = useMemo(
    () => ({
      maxAngle: 20,
      lerpFactor: 0.06,
      perspective: 50,
      cardScale: 0.88,
    }),
    []
  );

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchesSearch =
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesBadge =
        activeCategory === 'All' || card.badge?.toLowerCase() === activeCategory.toLowerCase();

      return matchesSearch && matchesBadge;
    });
  }, [cards, searchQuery, activeCategory]);

  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

  const displayedCards = useMemo(() => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    return filteredCards.slice(startIndex, startIndex + cardsPerPage);
  }, [filteredCards, currentPage, cardsPerPage]);

  return (
    <div className={`w-full ${embedded ? 'pt-0' : 'max-w-7xl mx-auto pt-2'} space-y-5`}>
      {/* Content Filter & Search Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 sm:p-4 bg-[#050a12]/80 rounded-2xl border border-slate-800 shadow-lg">
        {/* Category Badge Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <div className="flex items-center gap-1.5 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#ff7e67] mr-1 hidden sm:inline-block shrink-0" />
            {BADGE_FILTERS.map((filter) => {
              const isActive = activeCategory === filter.value;
              const count = filter.value === 'All'
                ? cards.length
                : cards.filter(c => c.badge?.toLowerCase() === filter.value.toLowerCase()).length;

              return (
                <button
                  key={filter.value}
                  onClick={() => setActiveCategory(filter.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-[#ff7e67] text-[#050a12] font-bold shadow-md shadow-[#ff7e67]/30 scale-[1.02]'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{filter.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-[#050a12]/30 text-[#050a12]' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Input Box */}
        <div className="relative min-w-[200px] sm:min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search publications..."
            className="w-full pl-8 pr-8 py-1.5 bg-slate-900/90 border border-slate-800 focus:border-[#ff7e67] rounded-xl text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Matrix Grid of Parallax Cards */}
      {filteredCards.length === 0 ? (
        <div className="py-12 text-center space-y-3">
          <Search className="w-8 h-8 mx-auto text-slate-400" />
          <h3 className="text-base font-medium text-slate-400">No cards found matching filter</h3>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('All');
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-[#ff7e67] font-mono rounded-xl transition-colors cursor-pointer border border-slate-700"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <div className={`${embedded ? 'bg-[#050a12]/60' : 'bg-[#081220]/90'} border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-inner overflow-hidden`}>
            {/* 4 Bigger Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center items-center py-2 px-1">
              {displayedCards.map((card, index) => (
                <div
                  key={card.id || index}
                  style={{ zIndex: index + 1 }}
                  className="transition-all duration-300 hover:scale-[1.04] hover:!z-50 shrink-0 cursor-pointer w-full flex justify-center"
                >
                  <ParallaxCard
                    card={card}
                    settings={customSettings}
                    onShowDetails={(c) => setDetailsCard(c)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-3.5 bg-[#081220] border border-slate-800 rounded-2xl shadow-md">
              <div className="text-xs text-slate-400 font-medium font-sans flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ff7e67]" />
                <span>
                  Showing cards <span className="font-bold text-slate-100">{(currentPage - 1) * cardsPerPage + 1}</span> - <span className="font-bold text-slate-100">{Math.min(currentPage * cardsPerPage, filteredCards.length)}</span> of <span className="font-bold text-slate-100">{filteredCards.length}</span> (Page {currentPage} of {totalPages})
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                {/* Previous Page Button */}
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                    currentPage === 1
                      ? 'opacity-40 cursor-not-allowed bg-transparent border-slate-800 text-slate-500'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  }`}
                  title="Previous Page"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>

                {/* Page Number Buttons */}
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                        currentPage === pageNum
                          ? 'bg-[#ff7e67] text-[#050a12] shadow-md shadow-[#ff7e67]/30 scale-105'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700'
                      }`}
                      title={`Go to Page ${pageNum}`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                {/* Next Page Button */}
                {currentPage < totalPages ? (
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className="px-4 py-1.5 bg-[#ff7e67] hover:bg-[#ff8f7b] text-[#050a12] font-bold text-xs font-mono rounded-xl shadow-md shadow-[#ff7e67]/20 transition-all hover:scale-105 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next (Page {currentPage + 1})</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentPage(1)}
                    className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs font-mono rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer border border-slate-700"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#ff7e67]" />
                    <span>Back to Page 1</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Card Details Modal */}
      {detailsCard && (
        <CardDetailsModal
          card={detailsCard}
          onClose={() => setDetailsCard(null)}
        />
      )}
    </div>
  );
};
