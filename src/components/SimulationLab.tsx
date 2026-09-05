import React, { useState } from 'react';
import { SystemItem } from '../types';
import { Cpu, CheckCircle2, RefreshCw, Zap, Shield, ArrowUpRight } from 'lucide-react';

interface SimulationLabProps {
  systems: SystemItem[];
}

export const SimulationLab: React.FC<SimulationLabProps> = ({ systems }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'climate-sustainability',
    'economic-transition',
  ]);

  const toggleSystem = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
    } else {
      if (selectedIds.length < 4) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const activeSystems = systems.filter((s) => selectedIds.includes(s.id));

  // Compute systemic synergy score
  const synergyScore = Math.min(
    98,
    Math.round(45 + selectedIds.length * 12 + (selectedIds.includes('ai-public-systems') ? 8 : 0))
  );

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
            <Cpu className="w-4 h-4" />
            Poly-Crisis &amp; Policy Synthesis Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal font-serif-newsreader text-white tracking-tight pt-1">
            Compound Systemic Simulation Sandbox
          </h2>
        </div>
        <div className="text-xs text-slate-400 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800">
          Select 2 to 4 systems to compute dynamic multiplier interventions
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Selector Cards */}
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Active Scenario Systems ({selectedIds.length}/4)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
            {systems.map((s) => {
              const isSelected = selectedIds.includes(s.id);
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggleSystem(s.id)}
                  className={`p-3 rounded-xl text-left border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-white/20 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: s.color }}
                    />
                    <span className="text-xs sm:text-sm font-medium">
                      {s.name}
                    </span>
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Compound Strategy Output Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-[#090f1d] border border-slate-800 space-y-6 shadow-2xl">
            {/* Header with Score */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Scenario Synthesis
                </div>
                <h3 className="text-xl font-semibold text-white tracking-tight pt-0.5">
                  Integrated {activeSystems.map((s) => s.shortName).join(' + ')}{' '}
                  Nexus
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[11px] text-slate-400 uppercase">
                    Systemic Multiplier
                  </div>
                  <div className="text-xl font-bold font-mono text-emerald-400">
                    {synergyScore}%
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
            </div>

            {/* Compound Policy Interventions */}
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Joint Strategic Architecture
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                    Catalytic Co-Benefit
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Synchronizing investments across{' '}
                    {activeSystems.map((s) => s.name).join(' and ')} mitigates
                    redundant agency spending by an estimated 22-35% through unified
                    regulatory and procurement frameworks.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                    Feedback Dampening
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Cross-domain monitoring detects early transmission of financial
                    or ecological stress into public safety nets before systemic
                    defaults trigger.
                  </p>
                </div>
              </div>

              {/* Active Systems Tags in the Scenario */}
              <div className="pt-2">
                <div className="text-xs text-slate-400 mb-2">
                  Integrated Domain Directives:
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeSystems.map((s) => (
                    <div
                      key={s.id}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/60 text-xs text-slate-200 flex items-center gap-2"
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                      <span className="font-medium">{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
