import React, { useState } from 'react';
import { ACTORS_DATA, ORBIT_RINGS } from '../data/actorsData';
import { ActorNode } from '../types';
import { OrbitDiagram } from './OrbitDiagram';
import { ActorDetailCard } from './ActorDetailCard';

export interface ConveningSectionProps {
  embedded?: boolean;
}

export const ConveningSection: React.FC<ConveningSectionProps> = ({ embedded = false }) => {
  const [selectedActor, setSelectedActor] = useState<ActorNode | null>(null);
  const [convenePulse, setConvenePulse] = useState<boolean>(false);

  const handleTriggerConvene = () => {
    setConvenePulse(true);
    setTimeout(() => setConvenePulse(false), 2000);
  };

  const handleSelectNext = () => {
    if (!selectedActor) {
      setSelectedActor(ACTORS_DATA[0]);
      return;
    }
    const currentIndex = ACTORS_DATA.findIndex((a) => a.id === selectedActor.id);
    const nextIndex = (currentIndex + 1) % ACTORS_DATA.length;
    setSelectedActor(ACTORS_DATA[nextIndex]);
  };

  return (
    <section
      id="convening-role-section"
      className={`relative w-full text-slate-100 flex flex-col justify-center items-center overflow-hidden ${
        embedded
          ? 'bg-transparent px-0 py-2 border-0'
          : 'min-h-[600px] bg-[#050a12] px-4 sm:px-8 lg:px-16 py-16 lg:py-24 border-t border-slate-800'
      }`}
    >
      {/* Top subtle atmosphere ambient lighting */}
      {!embedded && (
        <>
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#ff7e67]/5 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#2dd4bf]/5 rounded-full blur-[120px] pointer-events-none" />
        </>
      )}

      {/* Main Container */}
      <div className={`w-full ${embedded ? 'w-full' : 'max-w-7xl mx-auto'} relative z-10`}>
        
        {/* Core Layout Grid: Left Text Block & Right Orbit Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typography and Context */}
          <div className="lg:col-span-5 flex flex-col justify-center z-20">
            {!embedded && (
              <>
                <div className="mb-2">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff7e67] font-semibold">
                    NEUTRAL CONVENING ECOSYSTEM
                  </span>
                </div>

                {/* Main Headline in Display Serif */}
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight text-slate-100 mb-6">
                  A convenor between worlds.
                </h2>
              </>
            )}

            {/* Body Description */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal mb-4">
              Reform never belongs to a single actor. IP³ sits between governments,
              development partners, civil society, academia, the private sector,
              communities, and technology providers — aligning incentives, evidence,
              and delivery capacity around shared outcomes.
            </p>

            {/* Detail card under description if selected */}
            <ActorDetailCard
              actor={selectedActor}
              onClose={() => setSelectedActor(null)}
              onSelectNext={handleSelectNext}
            />
          </div>

          {/* Right Column: Orbit System Canvas */}
          <div className="lg:col-span-7 flex items-center justify-center relative">
            <OrbitDiagram
              actors={ACTORS_DATA}
              rings={ORBIT_RINGS}
              selectedActor={selectedActor}
              onSelectActor={setSelectedActor}
              isRotating={true}
              showOrbitRings={true}
              convenePulse={convenePulse}
              onTriggerConvene={handleTriggerConvene}
            />
          </div>
        </div>

      </div>
    </section>
  );
};
