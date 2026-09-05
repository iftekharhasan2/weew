import React from 'react';
import { SYSTEM_NODES, SystemNodeId } from '../data/systemsData';
import { ArrowUpRight, Landmark, Scale, BarChart3, Binary, Coins, Layers } from 'lucide-react';

interface SystemsOverviewGridProps {
  onSelectNode: (nodeId: SystemNodeId) => void;
}

export const SystemsOverviewGrid: React.FC<SystemsOverviewGridProps> = ({ onSelectNode }) => {
  const nodes = Object.values(SYSTEM_NODES);

  const getIcon = (id: SystemNodeId) => {
    switch (id) {
      case 'institutions':
        return <Landmark className="w-5 h-5 text-[#ff7e67]" />;
      case 'policy':
        return <Scale className="w-5 h-5 text-[#ff7e67]" />;
      case 'evidence':
        return <BarChart3 className="w-5 h-5 text-[#ff7e67]" />;
      case 'technology':
        return <Binary className="w-5 h-5 text-[#ff7e67]" />;
      case 'finance':
        return <Coins className="w-5 h-5 text-[#ff7e67]" />;
      case 'core':
      default:
        return <Layers className="w-5 h-5 text-[#ff7e67]" />;
    }
  };

  return (
    <section
      id="systems-overview"
      className="relative py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-t border-slate-800/80"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff7e67]" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff7e67] font-semibold">
              COMPLETE SYSTEM SPECTRUM
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Integrated architecture across{' '}
            <span className="italic font-normal bg-clip-text text-transparent bg-gradient-to-r from-[#ff7e67] to-[#ffa190]">
              five strategic pillars.
            </span>
          </h2>
        </div>
        <p className="text-slate-400 text-sm max-w-md font-light">
          Explore each foundational domain to inspect its architectural specs, delivery units, and real-world implementation case studies.
        </p>
      </div>

      {/* Grid of 6 System Cards */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nodes.map((node) => (
          <div
            key={node.id}
            onClick={() => onSelectNode(node.id)}
            className="group bg-gradient-to-b from-[#091524] to-[#050b14] border border-slate-800 hover:border-[#ff7e67]/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,126,103,0.12)] cursor-pointer flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#0d1e33] border border-slate-700/80 flex items-center justify-center group-hover:border-[#ff7e67]/60 transition-colors">
                  {getIcon(node.id)}
                </div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-slate-400">
                  {node.category}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#ff7e67] transition-colors">
                  {node.label}
                </h3>
                <p className="text-xs font-mono text-[#ff7e67] font-medium line-clamp-1">
                  {node.tagline}
                </p>
              </div>

              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed font-light">
                {node.description}
              </p>
            </div>

            {/* Bottom Card CTA */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 group-hover:text-slate-200">
                {node.keyCapabilities.length} Core Capabilities
              </span>
              <span className="flex items-center gap-1 text-[#ff7e67] group-hover:translate-x-1 transition-transform">
                <span>Inspect Specs</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
