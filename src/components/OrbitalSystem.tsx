import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { SystemNodeId } from '../data/systemsData';

interface OrbitalSystemProps {
  onSelectNode: (nodeId: SystemNodeId) => void;
  selectedNodeId?: SystemNodeId | null;
  className?: string;
}

interface SpectrumCardData {
  id: SystemNodeId;
  themeIndex: number;
  number: string;
  topAccentColor: string;
  title: string;
  titleBreak?: string;
  description: string;
  hoverBorder: string;
  hoverGlow: string;
  lineColor: string;
}

export const OrbitalSystem: React.FC<OrbitalSystemProps> = ({
  onSelectNode,
  selectedNodeId,
  className = '',
}) => {
  const [hoveredNode, setHoveredNode] = useState<SystemNodeId | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const ip3Ref = useRef<HTMLButtonElement>(null);
  const card0Ref = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  const cardRefs = [card0Ref, card1Ref, card2Ref, card3Ref];
  const [paths, setPaths] = useState<string[]>([]);

  const cards: SpectrumCardData[] = [
    {
      id: 'institutions',
      themeIndex: 0,
      number: '01',
      topAccentColor: 'bg-[#ff7e67]',
      title: 'Poly–crises to',
      titleBreak: 'poly–solutions',
      description: 'Eight connected systems become one legible field for action.',
      hoverBorder: 'hover:border-[#ff7e67]/60',
      hoverGlow: 'hover:shadow-[0_12px_36px_rgba(255,126,103,0.14)]',
      lineColor: '#ff7e67',
    },
    {
      id: 'policy',
      themeIndex: 1,
      number: '02',
      topAccentColor: 'bg-[#2dd4bf]',
      title: 'Translation, not theory',
      description: 'Evidence moves through architecture, delivery and learning.',
      hoverBorder: 'hover:border-[#2dd4bf]/60',
      hoverGlow: 'hover:shadow-[0_12px_36px_rgba(45,212,191,0.14)]',
      lineColor: '#2dd4bf',
    },
    {
      id: 'technology',
      themeIndex: 2,
      number: '03',
      topAccentColor: 'bg-[#f59e0b]',
      title: 'Thinking that ships',
      description: 'Research and practical intelligence designed to move decisions.',
      hoverBorder: 'hover:border-[#f59e0b]/60',
      hoverGlow: 'hover:shadow-[0_12px_36px_rgba(245,158,11,0.14)]',
      lineColor: '#f59e0b',
    },
    {
      id: 'evidence',
      themeIndex: 3,
      number: '04',
      topAccentColor: 'bg-[#a855f7]',
      title: 'A convenor',
      titleBreak: 'between worlds',
      description: 'Authority, evidence, capital and lived experience meet around outcomes.',
      hoverBorder: 'hover:border-[#a855f7]/60',
      hoverGlow: 'hover:shadow-[0_12px_36px_rgba(168,85,247,0.14)]',
      lineColor: '#a855f7',
    },
  ];

  const handleNodeClick = (nodeId: SystemNodeId) => {
    onSelectNode(nodeId);
    const targetMap: Record<SystemNodeId, string> = {
      institutions: '#polysolutions-section',
      policy: '#polysolutions-section',
      technology: '#polysolutions-section',
      evidence: '#polysolutions-section',
      finance: '#about',
      core: '#polysolutions-section',
    };
    const targetSelector = targetMap[nodeId];
    if (targetSelector) {
      const el = document.querySelector(targetSelector);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Recalculate curved connector lines dynamically
  useEffect(() => {
    const updateCurves = () => {
      if (!containerRef.current || !ip3Ref.current) return;
      const cRect = containerRef.current.getBoundingClientRect();
      const iRect = ip3Ref.current.getBoundingClientRect();

      const startX = iRect.left - cRect.left + iRect.width / 2;
      const startY = iRect.bottom - cRect.top - 6;

      const newPaths: string[] = [];

      cardRefs.forEach((ref, index) => {
        if (!ref.current) return;
        const cardRect = ref.current.getBoundingClientRect();
        const cardLeft = cardRect.left - cRect.left;
        const cardTop = cardRect.top - cRect.top;
        const cardWidth = cardRect.width;

        // Custom entry X ratio and end arc offsets matching image.png
        let entryXRatio = 0.65;
        let endXRatio = 0.35;
        let endYOffset = 135;

        if (index === 0) {
          entryXRatio = 0.65;
          endXRatio = 0.35;
          endYOffset = 140;
        } else if (index === 1) {
          entryXRatio = 0.58;
          endXRatio = 0.36;
          endYOffset = 130;
        } else if (index === 2) {
          entryXRatio = 0.42;
          endXRatio = 0.64;
          endYOffset = 130;
        } else if (index === 3) {
          entryXRatio = 0.45;
          endXRatio = 0.70;
          endYOffset = 140;
        }

        const entryX = cardLeft + cardWidth * entryXRatio;
        const entryY = cardTop;
        const endX = cardLeft + cardWidth * endXRatio;
        const endY = cardTop + endYOffset;

        // Bezier curve from bottom of IP3 hub down to card top edge
        const deltaX = entryX - startX;
        const cp1X = startX + deltaX * 0.35;
        const cp1Y = startY + 30;
        const cp2X = entryX - deltaX * 0.1;
        const cp2Y = entryY - 25;

        // Continuation arc looping inside the card toward the title
        const innerCpX = entryX;
        const innerCpY = entryY + 45;

        const d = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${entryX} ${entryY} C ${innerCpX} ${innerCpY}, ${endX} ${endY - 30}, ${endX} ${endY}`;
        newPaths.push(d);
      });

      setPaths(newPaths);
    };

    updateCurves();

    const resizeObserver = new ResizeObserver(() => {
      updateCurves();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    window.addEventListener('resize', updateCurves);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateCurves);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="orbital-system-container"
      className={`relative w-full max-w-7xl mx-auto flex flex-col items-center select-none pt-2 pb-10 ${className}`}
    >
      {/* SVG Connector Rays & Inside-Card Loops Overlay */}
      <svg
        className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-10 transition-opacity duration-500"
      >
        <defs>
          <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {paths.map((pathString, index) => {
          const card = cards[index];
          const isHighlighted = hoveredNode === card.id || selectedNodeId === card.id;

          return (
            <g key={`connector-${card.id}`}>
              {/* Background ambient glow line */}
              <path
                d={pathString}
                fill="none"
                stroke={isHighlighted ? '#38d9c0' : '#2dd4bf'}
                strokeWidth={isHighlighted ? 2.5 : 1.2}
                strokeOpacity={isHighlighted ? 0.85 : 0.4}
                filter={isHighlighted ? 'url(#cyanGlow)' : undefined}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            </g>
          );
        })}
      </svg>

      {/* Center Top: IP3 Circle Node */}
      <div className="relative z-20 flex flex-col items-center">
        {/* Ambient Teal Backlight */}
        <div className="absolute -inset-6 bg-teal-500/20 rounded-full blur-2xl pointer-events-none opacity-70" />

        <motion.button
          ref={ip3Ref}
          id="node-core-btn"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onMouseEnter={() => setHoveredNode('core')}
          onMouseLeave={() => setHoveredNode(null)}
          onClick={() => handleNodeClick('core')}
          className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-all duration-300 border border-teal-400/40 hover:border-teal-300/80 bg-gradient-to-b from-[#081525] via-[#050e1a] to-[#02060c] shadow-[0_0_40px_rgba(45,212,191,0.25)] hover:shadow-[0_0_55px_rgba(45,212,191,0.45)] group"
        >
          {/* Subtle interior dashed ring */}
          <div className="absolute inset-1.5 rounded-full border border-teal-400/20 border-dashed animate-spin [animation-duration:45s] pointer-events-none" />

          <span className="font-serif font-bold text-3xl sm:text-4xl text-white tracking-wide group-hover:text-teal-200 transition-colors">
            IP3
          </span>
          <div className="mt-1 px-2.5 py-0.5 rounded-full border border-teal-400/50 bg-[#041722]/90 text-[#38d9c0] font-mono text-[8.5px] sm:text-[9px] tracking-[0.2em] font-semibold uppercase">
            BUILT FOR COMPLEXITY
          </div>
        </motion.button>
      </div>

      {/* 4 Cards Grid - Fully Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 w-full mt-10 sm:mt-14 z-20">
        {cards.map((card, index) => {
          const isSelected = selectedNodeId === card.id;
          const isHovered = hoveredNode === card.id;

          return (
            <motion.div
              key={card.id}
              ref={cardRefs[index]}
              id={`spectrum-card-${card.id}`}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              onClick={() => handleNodeClick(card.id)}
              onMouseEnter={() => setHoveredNode(card.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className={`relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#0b1524]/95 border transition-all duration-300 cursor-pointer overflow-hidden min-h-[330px] sm:min-h-[350px] group ${
                isSelected || isHovered
                  ? `${card.hoverBorder} ${card.hoverGlow} bg-[#0d1a2d]`
                  : 'border-slate-800/80 hover:border-slate-700 hover:bg-[#0e1a2b]'
              }`}
            >
              {/* Internal subtle arc for non-desktop / visual continuity */}
              <div className="lg:hidden absolute top-0 right-14 w-28 h-28 pointer-events-none opacity-40">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    d={index < 2 ? "M 80 0 C 80 30, 60 50, 40 70" : "M 20 0 C 20 30, 40 50, 60 70"}
                    fill="none"
                    stroke="#2dd4bf"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Top Accent Pill Bar */}
              <div className="flex items-center justify-start mb-5">
                <div className={`w-10 h-1 rounded-full ${card.topAccentColor}`} />
              </div>

              {/* Header: Number */}
              <div className="flex items-center justify-between w-full mb-6 relative z-10">
                <span className="font-mono text-xs font-semibold text-slate-400 tracking-wider">
                  {card.number}
                </span>
              </div>

              {/* Content: Title and Description */}
              <div className="space-y-3 mb-6 relative z-10">
                <h3 className="text-xl sm:text-[22px] font-bold text-white tracking-tight leading-snug group-hover:text-slate-100 transition-colors">
                  {card.title}
                  {card.titleBreak && (
                    <span className="block">{card.titleBreak}</span>
                  )}
                </h3>
                <p className="text-slate-400 text-sm sm:text-[14.5px] leading-relaxed font-normal">
                  {card.description}
                </p>
              </div>

              {/* Bottom Action: Enter spectrum */}
              <div className="mt-auto pt-4 flex items-center gap-1.5 text-sm font-medium text-slate-300 group-hover:text-white transition-colors relative z-10">
                <span>Enter spectrum</span>
                <span className="text-base transition-transform group-hover:translate-y-1">&darr;</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

