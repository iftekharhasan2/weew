import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles } from 'lucide-react';
import { SystemItem } from '../types';

interface EightSystemsHeroProps {
  systems: SystemItem[];
  selectedSystemId: string | null;
  onSelectSystem: (system: SystemItem) => void;
  fontFamily: 'newsreader' | 'playfair' | 'cormorant' | 'instrument';
  glowIntensity: number; // 0 to 1
  hoveredSystemId: string | null;
  setHoveredSystemId: (id: string | null) => void;
}

export const EightSystemsHero: React.FC<EightSystemsHeroProps> = ({
  systems,
  selectedSystemId,
  onSelectSystem,
  fontFamily,
  glowIntensity,
  hoveredSystemId,
  setHoveredSystemId,
}) => {
  // Active system to display in extended preview
  const previewSystem =
    systems.find((s) => s.id === hoveredSystemId) || null;

  const getFontClass = () => {
    switch (fontFamily) {
      case 'playfair':
        return 'font-serif-playfair';
      case 'cormorant':
        return 'font-serif-cormorant';
      case 'instrument':
        return 'font-serif-instrument';
      case 'newsreader':
      default:
        return 'font-serif-newsreader';
    }
  };

  const getDotGlowClass = (systemId: string) => {
    switch (systemId) {
      case 'climate-sustainability':
        return 'glow-dot-emerald';
      case 'education-human-capital':
        return 'glow-dot-blue';
      case 'health-social-protection':
        return 'glow-dot-teal';
      case 'data-digital-governance':
        return 'glow-dot-sky';
      case 'institutional-effectiveness':
        return 'glow-dot-orange';
      case 'economic-transition':
        return 'glow-dot-amber';
      case 'esg-circular-economy':
        return 'glow-dot-mint';
      case 'ai-public-systems':
        return 'glow-dot-purple';
      default:
        return '';
    }
  };

  const renderPill = (system: SystemItem, index: number) => {
    const isSelected = selectedSystemId === system.id;
    const isHovered = hoveredSystemId === system.id;
    const glowClass = getDotGlowClass(system.id);

    return (
      <button
        key={system.id}
        id={`system-pill-${system.id}`}
        type="button"
        onClick={() => onSelectSystem(system)}
        onMouseEnter={() => {
          if (!isSelected) {
            setHoveredSystemId(system.id);
          }
        }}
        onMouseLeave={() => {
          if (!isSelected) {
            setHoveredSystemId(null);
          }
        }}
        className={`relative w-full flex flex-col justify-between text-left p-4 sm:p-5 rounded-2xl transition-all duration-200 cursor-pointer select-none outline-none border ${
          isSelected
            ? 'bg-[#0f1d33] border-[#ff7e67] shadow-xl ring-1 ring-[#ff7e67]/40 text-white'
            : isHovered
            ? 'group bg-[#0d1a2d] border-slate-700 text-white shadow-lg -translate-y-0.5'
            : 'group bg-[#081324]/85 hover:bg-[#0c182b] border-slate-800/90 text-slate-200 hover:text-white'
        }`}
        style={{
          boxShadow: isSelected
            ? `0 0 28px ${system.glowColor.replace('0.7', '0.22')}, inset 0 1px 1px rgba(255,255,255,0.12)`
            : isHovered
            ? `0 10px 24px -6px rgba(5,10,18,0.7), 0 0 18px ${system.glowColor.replace('0.7', '0.2')}`
            : '0 2px 8px rgba(0,0,0,0.2)',
        }}
      >
        {/* Card Header: Category & Glowing Indicator */}
        <div className="flex items-center justify-between w-full mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2.5 w-2.5 items-center justify-center shrink-0">
              {isSelected ? (
                <span
                  className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                  style={{
                    backgroundColor: system.color,
                    animationDuration: '2.5s',
                  }}
                />
              ) : isHovered ? (
                <span
                  className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                  style={{
                    backgroundColor: system.color,
                    animationDuration: '1.5s',
                  }}
                />
              ) : null}
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${glowClass}`}
                style={{
                  backgroundColor: system.color,
                  filter: `drop-shadow(0 0 ${4 * glowIntensity}px ${system.color})`,
                }}
              />
            </span>
            <span className="font-mono text-[10px] font-bold tracking-wider text-slate-400 uppercase truncate">
              0{index + 1} • {system.category}
            </span>
          </div>

          <div className="shrink-0 ml-2">
            {isSelected ? (
              <span className="text-[9px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#ff7e67]/20 text-[#ff7e67] border border-[#ff7e67]/30">
                ACTIVE
              </span>
            ) : (
              <span className="text-[9px] font-mono text-slate-500 uppercase group-hover:text-slate-300 transition-colors">
                EXPLORE
              </span>
            )}
          </div>
        </div>

        {/* Card Title */}
        <h4 className={`font-sans text-sm sm:text-base font-bold leading-snug tracking-tight ${
          isSelected ? 'text-white' : 'text-slate-100 group-hover:text-white'
        }`}>
          {system.name}
        </h4>

        {/* Card Summary Description */}
        <p className={`text-[11.5px] font-light leading-relaxed mt-2 line-clamp-2 ${
          isSelected ? 'text-slate-300' : 'text-slate-400 group-hover:text-slate-300'
        }`}>
          {system.summary}
        </p>
      </button>
    );
  };

  return (
    <div className="relative w-full select-text transition-all duration-300">
      {/* Background ambient lighting subtle glow */}
      <div
        className="pointer-events-none absolute -left-20 top-24 w-72 h-72 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(255,126,103,0.2) 0%, rgba(45,212,191,0.1) 70%, transparent 100%)',
        }}
      />

      {/* Main Section Header */}
      <div className="space-y-6 sm:space-y-8 pt-[20px] pb-[28px] px-0 mx-0">
        {/* Exact Typography Clone */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-1 w-[710px] pl-[29px] pt-[29px] pb-[11px] max-w-full"
        >
          <h1
            className={`${getFontClass()} text-4xl sm:text-5xl md:text-6xl lg:text-[70px] leading-[1.08] sm:leading-[1.06] tracking-[-0.025em] text-slate-100 font-normal`}
          >
            <span className="block">Eight systems. One</span>
            <span className="block text-slate-300">overlapping reality.</span>
          </h1>
        </motion.div>

        {/* 8 Systems Pills Grid / Equalized Grid Layout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="pt-2 sm:pt-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
            {systems.map(renderPill)}
          </div>
        </motion.div>

        {/* Extended Section on Hover ONLY */}
        <AnimatePresence>
          {previewSystem && (
            <motion.div
              key={previewSystem.id}
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredSystemId(previewSystem.id)}
              onMouseLeave={() => setHoveredSystemId(null)}
              className="overflow-hidden pt-4"
            >
              <div
                className="p-5 sm:p-6 rounded-2xl bg-[#081220]/95 backdrop-blur-md border transition-all shadow-2xl space-y-4 border-slate-800"
                style={{
                  borderColor: `${previewSystem.color}50`,
                  boxShadow: `0 12px 36px -8px rgba(5,10,18,0.8), 0 0 28px ${previewSystem.glowColor.replace('0.7', '0.15')}`,
                }}
              >
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                      style={{
                        backgroundColor: previewSystem.color,
                        boxShadow: `0 0 10px ${previewSystem.color}`,
                      }}
                    />
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium text-slate-100 tracking-tight">
                        {previewSystem.name}
                      </h3>
                      <span className="text-xs text-[#ff7e67] font-mono uppercase tracking-wider">
                        {previewSystem.category}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs text-slate-500 font-mono">
                    System 0{systems.indexOf(previewSystem) + 1} of 08
                  </span>
                </div>

                {/* Core Strategic Mandate Only */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <Compass className="w-4 h-4 text-[#ff7e67]" />
                    Core Strategic Mandate
                  </div>
                  <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-sans-body font-light">
                    {previewSystem.coreMandate}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
