import React, { useState, useMemo } from 'react';
import { SystemItem } from '../types';
import { Layers, Zap, Info } from 'lucide-react';

interface OverlapNetworkGraphProps {
  systems: SystemItem[];
  selectedSystemId: string | null;
  onSelectSystem: (system: SystemItem) => void;
}

export const OverlapNetworkGraph: React.FC<OverlapNetworkGraphProps> = ({
  systems,
  selectedSystemId,
  onSelectSystem,
}) => {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Center and dimensions for SVG
  const width = 800;
  const height = 540;
  const cx = width / 2;
  const cy = height / 2;
  const radius = 200;

  // Calculate coordinates for the 8 nodes in a circle
  const nodePositions = useMemo(() => {
    return systems.map((sys, idx) => {
      const angle = (idx * 2 * Math.PI) / systems.length - Math.PI / 2;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      return {
        ...sys,
        x,
        y,
        angle,
      };
    });
  }, [systems, cx, cy, radius]);

  // Derive all unique edges/connections
  const edges = useMemo(() => {
    const edgeList: {
      id: string;
      source: typeof nodePositions[0];
      target: typeof nodePositions[0];
      overlapTitle: string;
      synergyDescription: string;
    }[] = [];

    nodePositions.forEach((sourceNode) => {
      sourceNode.overlaps.forEach((overlap) => {
        const targetNode = nodePositions.find(
          (n) => n.id === overlap.targetSystemId
        );
        if (targetNode) {
          const edgeKey = [sourceNode.id, targetNode.id].sort().join('--');
          if (!edgeList.some((e) => e.id === edgeKey)) {
            edgeList.push({
              id: edgeKey,
              source: sourceNode,
              target: targetNode,
              overlapTitle: overlap.overlapTitle,
              synergyDescription: overlap.synergyDescription,
            });
          }
        }
      });
    });

    return edgeList;
  }, [nodePositions]);

  const activeFocusId = hoveredNodeId || selectedSystemId;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <Layers className="w-4 h-4" />
            Constellation Topology
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal font-serif-newsreader text-white tracking-tight pt-1">
            Overlapping Systems Matrix &amp; Feedback Loops
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800 self-start sm:self-auto">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          Hover or click any node to illuminate its cross-system nexus
        </div>
      </div>

      {/* Network Canvas */}
      <div className="relative w-full rounded-2xl bg-[#080d1a] border border-slate-800/90 overflow-hidden shadow-2xl p-4 flex flex-col items-center justify-center">
        {/* Background Grid & Radial Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

        {/* Central Core Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center z-0">
          <div className="w-28 h-28 rounded-full border border-slate-800/80 bg-slate-950/60 backdrop-blur flex flex-col items-center justify-center p-2 shadow-inner">
            <Zap className="w-5 h-5 text-amber-400/80 mb-1" />
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
              Single
            </span>
            <span className="text-xs font-serif italic text-slate-200">
              Reality
            </span>
          </div>
        </div>

        {/* SVG Container */}
        <div className="w-full max-w-3xl aspect-[800/540] relative z-10">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-full overflow-visible"
          >
            <defs>
              {/* Radial gradient masks for glowing edges */}
              {edges.map((edge) => (
                <linearGradient
                  key={`grad-${edge.id}`}
                  id={`grad-${edge.id}`}
                  gradientUnits="userSpaceOnUse"
                  x1={edge.source.x}
                  y1={edge.source.y}
                  x2={edge.target.x}
                  y2={edge.target.y}
                >
                  <stop offset="0%" stopColor={edge.source.color} stopOpacity="0.8" />
                  <stop offset="100%" stopColor={edge.target.color} stopOpacity="0.8" />
                </linearGradient>
              ))}
            </defs>

            {/* Orbit Guides */}
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke="#1e293b"
              strokeWidth="1"
              strokeDasharray="4 6"
              className="opacity-40"
            />
            <circle
              cx={cx}
              cy={cy}
              r={radius - 60}
              fill="none"
              stroke="#1e293b"
              strokeWidth="0.75"
              strokeDasharray="2 4"
              className="opacity-25"
            />

            {/* Edges / Overlapping Lines */}
            {edges.map((edge) => {
              const isSourceActive = activeFocusId === edge.source.id;
              const isTargetActive = activeFocusId === edge.target.id;
              const isConnected = isSourceActive || isTargetActive;
              const isDimmed = activeFocusId !== null && !isConnected;

              return (
                <g key={edge.id}>
                  {/* Subtle background line */}
                  <line
                    x1={edge.source.x}
                    y1={edge.source.y}
                    x2={edge.target.x}
                    y2={edge.target.y}
                    stroke={isConnected ? `url(#grad-${edge.id})` : '#334155'}
                    strokeWidth={isConnected ? 2.5 : 1}
                    strokeOpacity={isConnected ? 0.9 : isDimmed ? 0.08 : 0.25}
                    className="transition-all duration-300"
                  />

                  {/* Flowing animated particle if connected */}
                  {isConnected && (
                    <circle r="3.5" fill="#ffffff">
                      <animateMotion
                        dur="3s"
                        repeatCount="indefinite"
                        path={`M ${edge.source.x} ${edge.source.y} L ${edge.target.x} ${edge.target.y}`}
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {nodePositions.map((node) => {
              const isSelected = selectedSystemId === node.id;
              const isHovered = hoveredNodeId === node.id;
              const isActive = isSelected || isHovered;
              const isConnectedToActive =
                activeFocusId !== null &&
                (node.id === activeFocusId ||
                  node.overlaps.some((o) => o.targetSystemId === activeFocusId));
              const isDimmed = activeFocusId !== null && !isConnectedToActive;

              return (
                <g
                  key={node.id}
                  className="cursor-pointer"
                  onClick={() => onSelectSystem(node)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                >
                  {/* Glowing aura */}
                  {isActive && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="32"
                      fill={node.color}
                      className="opacity-20 animate-pulse"
                    />
                  )}

                  {/* Outer ring */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isActive ? 22 : 18}
                    fill="#090f1d"
                    stroke={isActive ? '#ffffff' : node.color}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    opacity={isDimmed ? 0.3 : 1}
                    className="transition-all duration-300"
                  />

                  {/* Inner dot */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isActive ? 7 : 5}
                    fill={node.color}
                    opacity={isDimmed ? 0.3 : 1}
                    style={{
                      filter: `drop-shadow(0 0 6px ${node.color})`,
                    }}
                  />

                  {/* Node Label Text */}
                  <text
                    x={node.x}
                    y={node.y > cy ? node.y + 32 : node.y - 26}
                    textAnchor="middle"
                    fill={isActive ? '#ffffff' : '#94a3b8'}
                    fontSize={isActive ? 13 : 12}
                    fontWeight={isActive ? '600' : '400'}
                    opacity={isDimmed ? 0.25 : 1}
                    className="select-none font-sans-body transition-all duration-300 pointer-events-none"
                  >
                    {node.shortName}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Dynamic active info banner */}
        <div className="w-full mt-2 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Active Lens:</span>
            {activeFocusId ? (
              <span className="text-white font-medium flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor:
                      systems.find((s) => s.id === activeFocusId)?.color || '#fff',
                  }}
                />
                {systems.find((s) => s.id === activeFocusId)?.name} (
                {systems.find((s) => s.id === activeFocusId)?.overlaps.length}{' '}
                direct overlaps)
              </span>
            ) : (
              <span className="text-slate-500 italic">Select any system above</span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> 8 Macro Domains
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" /> 16+ Overlapping Synergies
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
