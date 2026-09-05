import React from 'react';
import { motion } from 'motion/react';
import { SystemItem } from '../types';

interface EightSystemsHeroProps {
  systems: SystemItem[];
  selectedSystemId: string | null;
  onSelectSystem: (system: SystemItem) => void;
  fontFamily: 'newsreader' | 'playfair' | 'cormorant' | 'instrument';
  glowIntensity?: number; // 0 to 1
  hoveredSystemId: string | null;
  setHoveredSystemId: (id: string | null) => void;
}

export const EightSystemsHero: React.FC<EightSystemsHeroProps> = ({
  systems,
  selectedSystemId,
  onSelectSystem,
  fontFamily,
  hoveredSystemId,
  setHoveredSystemId,
}) => {
  const hasActive = selectedSystemId !== null;

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

  const renderPill = (system: SystemItem) => {
    const isSelected = selectedSystemId === system.id;
    const isHovered = !hasActive && hoveredSystemId === system.id;

    return (
      <button
        key={system.id}
        id={`system-pill-${system.id}`}
        type="button"
        onClick={() => onSelectSystem(system)}
        onMouseEnter={() => {
          if (!hasActive) {
            setHoveredSystemId(system.id);
          }
        }}
        onMouseLeave={() => {
          if (!hasActive) {
            setHoveredSystemId(null);
          }
        }}
        className={`relative w-full flex flex-col justify-between text-left p-4 sm:p-5 rounded-2xl transition-all duration-200 cursor-pointer select-none outline-none border ${
          isSelected
            ? 'bg-[#0f1d33] border-[#ff7e67] shadow-xl ring-1 ring-[#ff7e67]/40 text-white'
            : hasActive
            ? 'bg-[#081324]/60 border-slate-800/60 text-slate-400 opacity-75'
            : isHovered
            ? 'group bg-[#0d1a2d] border-slate-700 text-white shadow-lg -translate-y-0.5'
            : 'group bg-[#081324]/85 hover:bg-[#0c182b] border-slate-800/90 text-slate-200 hover:text-white'
        }`}
        style={{
          boxShadow: isSelected
            ? `0 0 28px ${system.glowColor.replace('0.7', '0.22')}, inset 0 1px 1px rgba(255,255,255,0.12)`
            : (!hasActive && isHovered)
            ? `0 10px 24px -6px rgba(5,10,18,0.7), 0 0 18px ${system.glowColor.replace('0.7', '0.2')}`
            : '0 2px 8px rgba(0,0,0,0.2)',
        }}
      >
        {/* Card Title */}
        <h4 className={`font-sans text-sm sm:text-base font-bold leading-snug tracking-tight ${
          isSelected
            ? 'text-white'
            : hasActive
            ? 'text-slate-300'
            : 'text-slate-100 group-hover:text-white'
        }`}>
          {system.name}
        </h4>

        {/* Card Summary Description */}
        <p className={`text-[11.5px] font-light leading-relaxed mt-2 line-clamp-2 ${
          isSelected
            ? 'text-slate-300'
            : hasActive
            ? 'text-slate-500'
            : 'text-slate-400 group-hover:text-slate-300'
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
        {/* 8 Systems Pills Grid / Equalized Grid Layout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
            {systems.map(renderPill)}
          </div>
        </motion.div>

        {/* Exact Typography Clone */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-1 w-[710px] pl-[29px] pt-[20px] pb-[11px] max-w-full"
        >
          <h1
            className={`${getFontClass()} text-4xl sm:text-5xl md:text-6xl lg:text-[70px] leading-[1.08] sm:leading-[1.06] tracking-[-0.025em] text-slate-100 font-normal`}
          >
            <span className="block">Eight systems. One</span>
            <span className="block text-slate-300">overlapping reality.</span>
          </h1>
        </motion.div>
      </div>
    </div>
  );
};
