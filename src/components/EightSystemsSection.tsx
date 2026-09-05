import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { SYSTEMS_DATA } from '../data/systems';
import { SystemItem, SystemOverlap } from '../types';
import { EightSystemsHero } from './EightSystemsHero';
import { OverlapModal } from './OverlapModal';
import { SystemDetailPanel } from './SystemDetailPanel';

export const EightSystemsSection: React.FC = () => {
  const [selectedSystemId, setSelectedSystemId] = useState<string | null>(null);
  const [hoveredSystemId, setHoveredSystemId] = useState<string | null>(null);

  // Overlap Modal State
  const [activeOverlap, setActiveOverlap] = useState<{
    primary: SystemItem;
    overlap: SystemOverlap;
    target: SystemItem;
  } | null>(null);

  const selectedSystem = SYSTEMS_DATA.find((s) => s.id === selectedSystemId) || null;

  const handleSelectSystem = (system: SystemItem) => {
    if (selectedSystemId === system.id) {
      setSelectedSystemId(null);
      setHoveredSystemId(null);
    } else {
      setSelectedSystemId(system.id);
      setHoveredSystemId(system.id);
    }
  };

  const handleSelectOverlap = (
    primary: SystemItem,
    overlap: SystemOverlap,
    target: SystemItem
  ) => {
    setActiveOverlap({ primary, overlap, target });
  };

  const handlePivotToTarget = (targetId: string) => {
    setSelectedSystemId(targetId);
    setHoveredSystemId(targetId);
  };

  return (
    <div
      id="eight-systems-master-section"
      className="w-full text-slate-100 flex flex-col relative overflow-hidden"
    >
      {/* Main View Display */}
      <div className="w-full relative z-10">
        <EightSystemsHero
          systems={SYSTEMS_DATA}
          selectedSystemId={selectedSystemId}
          onSelectSystem={handleSelectSystem}
          fontFamily="newsreader"
          glowIntensity={1}
          hoveredSystemId={hoveredSystemId}
          setHoveredSystemId={setHoveredSystemId}
        />

        {/* System Detail Panel when selected */}
        {selectedSystem && (
          <SystemDetailPanel
            system={selectedSystem}
            allSystems={SYSTEMS_DATA}
            onClose={() => setSelectedSystemId(null)}
            onSelectOverlap={handleSelectOverlap}
          />
        )}
      </div>

      {/* Cross-Domain Overlap Modal */}
      <AnimatePresence>
        {activeOverlap && (
          <OverlapModal
            primarySystem={activeOverlap.primary}
            overlap={activeOverlap.overlap}
            targetSystem={activeOverlap.target}
            onClose={() => setActiveOverlap(null)}
            onPivotToTarget={handlePivotToTarget}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EightSystemsSection;
