import React, { useState } from 'react';
import { SystemItem, SystemOverlap } from '../types';
import { Grid, Sparkles, AlertCircle } from 'lucide-react';

interface OverlapMatrixProps {
  systems: SystemItem[];
  onSelectOverlap: (
    primary: SystemItem,
    overlap: SystemOverlap,
    target: SystemItem
  ) => void;
}

export const OverlapMatrix: React.FC<OverlapMatrixProps> = ({
  systems,
  onSelectOverlap,
}) => {
  const [hoveredCell, setHoveredCell] = useState<{
    row: string;
    col: string;
  } | null>(null);

  // Helper to find overlap between system A and system B
  const getOverlap = (sysA: SystemItem, sysB: SystemItem) => {
    if (sysA.id === sysB.id) return null;
    const direct = sysA.overlaps.find((o) => o.targetSystemId === sysB.id);
    if (direct) return { primary: sysA, target: sysB, overlap: direct };
    const reverse = sysB.overlaps.find((o) => o.targetSystemId === sysA.id);
    if (reverse) return { primary: sysB, target: sysA, overlap: reverse };
    return null;
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <Grid className="w-4 h-4" />
            Cross-Domain Synthesis
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal font-serif-newsreader text-white tracking-tight pt-1">
            8 × 8 Interconnection &amp; Overlap Matrix
          </h2>
        </div>
        <div className="text-xs text-slate-400 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800">
          Click any active cell to open the dual-system policy synthesis
        </div>
      </div>

      {/* Matrix Table Container */}
      <div className="rounded-2xl bg-[#080d1a] border border-slate-800/90 overflow-hidden shadow-2xl p-4 sm:p-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr>
                <th className="p-2 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-40">
                  System
                </th>
                {systems.map((s) => (
                  <th
                    key={s.id}
                    className="p-2 text-center text-xs font-semibold text-slate-300 w-16"
                    title={s.name}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                      <span className="text-[11px] truncate max-w-[60px]">
                        {s.shortName}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {systems.map((rowSys) => (
                <tr key={rowSys.id} className="border-t border-slate-800/50">
                  <td className="p-2.5 text-xs font-medium text-slate-300 flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: rowSys.color }}
                    />
                    <span className="truncate">{rowSys.name}</span>
                  </td>
                  {systems.map((colSys) => {
                    const isSelf = rowSys.id === colSys.id;
                    const overlapData = getOverlap(rowSys, colSys);
                    const isHovered =
                      hoveredCell?.row === rowSys.id ||
                      hoveredCell?.col === colSys.id;

                    if (isSelf) {
                      return (
                        <td
                          key={colSys.id}
                          className="p-1.5 text-center bg-slate-900/40"
                        >
                          <div className="w-full h-8 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                          </div>
                        </td>
                      );
                    }

                    if (overlapData) {
                      return (
                        <td
                          key={colSys.id}
                          className={`p-1.5 text-center transition-colors ${
                            isHovered ? 'bg-slate-800/30' : ''
                          }`}
                          onMouseEnter={() =>
                            setHoveredCell({ row: rowSys.id, col: colSys.id })
                          }
                          onMouseLeave={() => setHoveredCell(null)}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              onSelectOverlap(
                                overlapData.primary,
                                overlapData.overlap,
                                overlapData.target
                              )
                            }
                            className="w-full h-8 rounded-lg border border-cyan-500/30 bg-cyan-950/20 hover:bg-cyan-900/40 hover:border-cyan-400 flex items-center justify-center transition-all group cursor-pointer"
                            title={`${rowSys.name} ↔ ${colSys.name}: ${overlapData.overlap.overlapTitle}`}
                          >
                            <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                          </button>
                        </td>
                      );
                    }

                    return (
                      <td
                        key={colSys.id}
                        className={`p-1.5 text-center ${
                          isHovered ? 'bg-slate-800/20' : ''
                        }`}
                        onMouseEnter={() =>
                          setHoveredCell({ row: rowSys.id, col: colSys.id })
                        }
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        <div className="w-full h-8 rounded-lg bg-slate-950/40 border border-slate-900 flex items-center justify-center text-[10px] text-slate-700">
                          -
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/70 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded bg-cyan-950 border border-cyan-500/40 inline-flex items-center justify-center">
              <Sparkles className="w-2 h-2 text-cyan-400" />
            </span>
            <span>Mapped Systemic Synergy</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Click any glowing tile to inspect cross-impact mechanisms</span>
          </div>
        </div>
      </div>
    </section>
  );
};
