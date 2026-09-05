import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SYSTEM_NODES, SystemNodeId } from '../data/systemsData';

interface OrbitalSystemProps {
  onSelectNode: (nodeId: SystemNodeId) => void;
  selectedNodeId?: SystemNodeId | null;
  className?: string;
}

export const OrbitalSystem: React.FC<OrbitalSystemProps> = ({
  onSelectNode,
  selectedNodeId,
  className = '',
}) => {
  const [hoveredNode, setHoveredNode] = useState<SystemNodeId | null>(null);

  // Exact positions mapped for orbital layout
  // Canvas coordinate system (0 to 100% center at 50, 50)
  const nodePositions: Record<SystemNodeId, { x: number; y: number; ring: number }> = {
    institutions: { x: 50, y: 11, ring: 3 },
    policy: { x: 15, y: 50, ring: 3 },
    evidence: { x: 85, y: 50, ring: 3 },
    technology: { x: 50, y: 89, ring: 3 },
    finance: { x: 50, y: 89, ring: 3 },
    core: { x: 50, y: 50, ring: 0 },
  };

  const handleNodeClick = (nodeId: SystemNodeId) => {
    onSelectNode(nodeId);
    const targetMap: Record<SystemNodeId, string> = {
      institutions: '#polysolutions-section',
      policy: '#polysolutions-section',
      technology: '#polysolutions-section',
      evidence: '#polysolutions-section',
      finance: '#about',
      core: '#methodology',
    };
    const targetSelector = targetMap[nodeId];
    if (targetSelector) {
      const el = document.querySelector(targetSelector);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const activeNodeData = hoveredNode ? SYSTEM_NODES[hoveredNode] : null;

  return (
    <div
      id="orbital-system-container"
      className={`relative w-full max-w-[640px] aspect-square mx-auto flex items-center justify-center select-none ${className}`}
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[85%] h-[85%] rounded-full bg-teal-950/20 blur-3xl opacity-70" />
        <div className="w-[50%] h-[50%] rounded-full bg-teal-500/10 blur-2xl opacity-40" />
      </div>

      {/* SVG Vector Connections & Orbital Rings */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-1000"
        viewBox="0 0 500 500"
      >
        <defs>
          <radialGradient id="centerGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#0f766e" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#050a12" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="laserLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Outer Orbit Ring */}
        <ellipse
          cx="250"
          cy="250"
          rx="210"
          ry="195"
          fill="none"
          stroke="rgba(45, 212, 191, 0.16)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />

        {/* Middle Orbit Ring */}
        <ellipse
          cx="250"
          cy="250"
          rx="155"
          ry="142"
          fill="none"
          stroke="rgba(45, 212, 191, 0.22)"
          strokeWidth="1.2"
        />

        {/* Inner Orbit Ring */}
        <ellipse
          cx="250"
          cy="250"
          rx="105"
          ry="96"
          fill="none"
          stroke="rgba(45, 212, 191, 0.28)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />

        {/* Radial Center Ambient Fill */}
        <circle cx="250" cy="250" r="130" fill="url(#centerGlowGrad)" />

        {/* Active connection rays when hovering a node */}
        {hoveredNode && hoveredNode !== 'core' && (
          <g className="transition-all duration-300">
            {/* Ray from node to IP3 Center Core */}
            <line
              x1={nodePositions[hoveredNode].x * 5}
              y1={nodePositions[hoveredNode].y * 5}
              x2="250"
              y2="250"
              stroke="#2dd4bf"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              className="animate-pulse"
            />
            {/* Ray to secondary interconnected nodes */}
            {SYSTEM_NODES[hoveredNode].connections.map((targetId) => {
              if (targetId === 'core' || targetId === 'finance') return null;
              const targetPos = nodePositions[targetId];
              if (!targetPos) return null;
              return (
                <line
                  key={`ray-${hoveredNode}-${targetId}`}
                  x1={nodePositions[hoveredNode].x * 5}
                  y1={nodePositions[hoveredNode].y * 5}
                  x2={targetPos.x * 5}
                  y2={targetPos.y * 5}
                  stroke="rgba(56, 189, 248, 0.4)"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />
              );
            })}
          </g>
        )}
      </svg>

      {/* 1. TOP NODE: From poly-crises to poly-solutions */}
      <div
        style={{
          left: `${nodePositions.institutions.x}%`,
          top: `${nodePositions.institutions.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
        className="absolute z-10"
      >
        <motion.button
          id="node-institutions-btn"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onMouseEnter={() => setHoveredNode('institutions')}
          onMouseLeave={() => setHoveredNode(null)}
          onClick={() => handleNodeClick('institutions')}
          className={`group max-w-[130px] sm:max-w-[155px] px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-[9.5px] sm:text-[10.5px] font-mono tracking-tight sm:tracking-normal uppercase transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer text-center leading-tight shadow-sm ${
            hoveredNode === 'institutions' || selectedNodeId === 'institutions'
              ? 'bg-[#0b1d33] border-cyan-400 text-cyan-200 ring-1 ring-cyan-400/60'
              : 'bg-[#071322]/95 border border-slate-700/80 text-slate-200 hover:text-white hover:border-slate-500 hover:bg-[#0b1b2d]'
          }`}
        >
          <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-400 transition-transform duration-200 group-hover:scale-125" />
          <span className="leading-tight text-center">From poly-crises to poly-solutions</span>
        </motion.button>
      </div>

      {/* 2. LEFT NODE: Translation not theory */}
      <div
        style={{
          left: `${nodePositions.policy.x}%`,
          top: `${nodePositions.policy.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
        className="absolute z-10"
      >
        <motion.button
          id="node-policy-btn"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onMouseEnter={() => setHoveredNode('policy')}
          onMouseLeave={() => setHoveredNode(null)}
          onClick={() => handleNodeClick('policy')}
          className={`group max-w-[115px] sm:max-w-[140px] px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-[9.5px] sm:text-[10.5px] font-mono tracking-tight sm:tracking-normal uppercase transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer text-center leading-tight shadow-sm ${
            hoveredNode === 'policy' || selectedNodeId === 'policy'
              ? 'bg-[#261313] border-[#ff7e67] text-[#ffa190] ring-1 ring-[#ff7e67]/60'
              : 'bg-[#071322]/95 border border-slate-700/80 text-slate-200 hover:text-white hover:border-slate-500 hover:bg-[#0b1b2d]'
          }`}
        >
          <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#ff7e67] transition-transform duration-200 group-hover:scale-125" />
          <span className="leading-tight text-center">Translation not theory</span>
        </motion.button>
      </div>

      {/* 3. RIGHT NODE: A convenor between worlds. */}
      <div
        style={{
          left: `${nodePositions.evidence.x}%`,
          top: `${nodePositions.evidence.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
        className="absolute z-10"
      >
        <motion.button
          id="node-evidence-btn"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onMouseEnter={() => setHoveredNode('evidence')}
          onMouseLeave={() => setHoveredNode(null)}
          onClick={() => handleNodeClick('evidence')}
          className={`group w-[141.675px] px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-[9.5px] sm:text-[10.5px] font-mono tracking-tight sm:tracking-normal uppercase transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer text-center leading-tight shadow-sm ${
            hoveredNode === 'evidence' || selectedNodeId === 'evidence'
              ? 'bg-[#0d221c] border-emerald-400 text-emerald-200 ring-1 ring-emerald-400/60'
              : 'bg-[#071322]/95 border border-slate-700/80 text-slate-200 hover:text-white hover:border-slate-500 hover:bg-[#0b1b2d]'
          }`}
        >
          <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-400 transition-transform duration-200 group-hover:scale-125" />
          <span className="leading-tight text-center">A convenor between worlds.</span>
        </motion.button>
      </div>

      {/* 4. BOTTOM NODE: Thinking that ships. */}
      <div
        style={{
          left: `${nodePositions.technology.x}%`,
          top: `${nodePositions.technology.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
        className="absolute z-10"
      >
        <motion.button
          id="node-technology-btn"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onMouseEnter={() => setHoveredNode('technology')}
          onMouseLeave={() => setHoveredNode(null)}
          onClick={() => handleNodeClick('technology')}
          className={`group max-w-[115px] sm:max-w-[140px] px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-[9.5px] sm:text-[10.5px] font-mono tracking-tight sm:tracking-normal uppercase transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer text-center leading-tight shadow-sm ${
            hoveredNode === 'technology' || selectedNodeId === 'technology'
              ? 'bg-[#151532] border-indigo-400 text-indigo-200 ring-1 ring-indigo-400/60'
              : 'bg-[#071322]/95 border border-slate-700/80 text-slate-200 hover:text-white hover:border-slate-500 hover:bg-[#0b1b2d]'
          }`}
        >
          <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-400 transition-transform duration-200 group-hover:scale-125" />
          <span className="leading-tight text-center">Thinking that ships.</span>
        </motion.button>
      </div>

      {/* CENTER CORE: IP3 + SYSTEM OVERLAPS */}
      <div className="absolute z-15 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.button
          id="node-core-btn"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onMouseEnter={() => setHoveredNode('core')}
          onMouseLeave={() => setHoveredNode(null)}
          onClick={() => onSelectNode('core')}
          className="relative w-[140px] h-[140px] rounded-full flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-all duration-300 group"
        >
          {/* Subtle Radial Core Background */}
          <div className="absolute inset-0 w-[140px] h-[140px] rounded-full bg-gradient-to-b from-[#08182b] via-[#040e1b] to-[#02060c] border border-teal-500/40 group-hover:border-teal-400/80 transition-all duration-300 shadow-lg" />

          {/* Internal rotating subtle ring */}
          <div className="absolute inset-2 rounded-full border border-teal-400/20 border-dashed animate-spin [animation-duration:30s] pointer-events-none" />

          {/* Core Content */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <span className="font-serif font-bold text-3xl md:text-4xl text-white tracking-wide group-hover:text-teal-200 transition-colors drop-shadow-sm">
              IP3
            </span>
            <span className="mt-1 font-mono text-[8.5px] md:text-[9.5px] text-teal-300/90 tracking-[0.2em] uppercase font-semibold">
              SYSTEM OVERLAPS
            </span>
          </div>

          {/* Solid subtle center beacon */}
          <div className="absolute bottom-4 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400/80" />
          </div>
        </motion.button>
      </div>

      {/* Floating Hover Context Preview Card */}
      <AnimatePresence>
        {activeNodeData && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute -bottom-14 left-1/2 -translate-x-1/2 z-30 pointer-events-none w-72 bg-[#081424]/95 backdrop-blur-md border border-teal-500/30 rounded-xl p-2.5 shadow-2xl text-center"
          >
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-white">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: activeNodeData.color }}
              />
              <span>{activeNodeData.label}</span>
              <span className="text-[10px] text-slate-400 font-normal">
                • {activeNodeData.category}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1 line-clamp-2 leading-relaxed font-light">
              {activeNodeData.tagline}
            </p>
            <div className="text-[9px] font-mono text-teal-400 mt-1 uppercase tracking-wider">
              Click node for full system architecture
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
