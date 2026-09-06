import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { OrbitalSystem } from './OrbitalSystem';
import { NodeInspectorModal } from './NodeInspectorModal';
import { ConsultationModal } from './ConsultationModal';
import { PolySolutionsSection } from './PolySolutionsSection';
import { SystemNodeId } from '../data/systemsData';

export const SystemsArchitectureSection: React.FC = () => {
  const [selectedStoryNodeId, setSelectedStoryNodeId] = useState<SystemNodeId | null>(null);
  const [inspectedNodeId, setInspectedNodeId] = useState<SystemNodeId | null>(null);
  const [activeStoryThemeIndex, setActiveStoryThemeIndex] = useState<number>(0);
  const [isStoryOpen, setIsStoryOpen] = useState<boolean>(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState<boolean>(false);
  const [consultationDomain, setConsultationDomain] = useState<SystemNodeId | null>(null);

  const themeNodeMap: Record<number, SystemNodeId> = {
    0: 'institutions',
    1: 'policy',
    2: 'technology',
    3: 'evidence',
  };

  const handleSelectNode = (nodeId: SystemNodeId) => {
    if (nodeId === 'institutions') {
      setSelectedStoryNodeId('institutions');
      setActiveStoryThemeIndex(0);
      setTimeout(() => {
        const el = document.getElementById('polysolutions-master-card') || document.getElementById('polysolutions-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }
    if (nodeId === 'policy') {
      setSelectedStoryNodeId('policy');
      setActiveStoryThemeIndex(1);
      setTimeout(() => {
        const el = document.getElementById('polysolutions-master-card') || document.getElementById('polysolutions-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }
    if (nodeId === 'technology') {
      setSelectedStoryNodeId('technology');
      setActiveStoryThemeIndex(2);
      setTimeout(() => {
        const el = document.getElementById('polysolutions-master-card') || document.getElementById('polysolutions-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }
    if (nodeId === 'evidence') {
      setSelectedStoryNodeId('evidence');
      setActiveStoryThemeIndex(3);
      setTimeout(() => {
        const el = document.getElementById('polysolutions-master-card') || document.getElementById('polysolutions-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }
    setInspectedNodeId(nodeId);
  };

  const handleThemeChange = (index: number) => {
    setActiveStoryThemeIndex(index);
    if (themeNodeMap[index]) {
      setSelectedStoryNodeId(themeNodeMap[index]);
    }
  };

  const handleCloseStory = () => {
    setIsStoryOpen(false);
    setSelectedStoryNodeId(null);
  };

  const handleOpenConsultation = (domain?: SystemNodeId) => {
    setConsultationDomain(domain || 'core');
    setIsConsultationOpen(true);
  };

  return (
    <div className="relative w-full bg-[#050a12] text-slate-100 selection:bg-[#ff7e67]/30 selection:text-[#ff9d8c] overflow-hidden">
      
      {/* Background Lighting Gradients */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 right-1/4 w-[650px] h-[650px] bg-teal-950/20 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#ff7e67]/5 rounded-full blur-[160px]" />
      </div>

      {/* Hero Systems Architecture & Orbital Section */}
      <section
        id="systems-hero"
        className="relative w-full min-h-[90vh] flex flex-col justify-center py-16 sm:py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto z-10 bg-[#050a12]"
      >
        <div className="flex flex-col items-center w-full my-auto py-4">
          {/* Header Block: Headline & Narrative */}
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-4 mb-8 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2"
            >
              <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#38d9c0] uppercase">
                POLICY STUDIO &bull; SYSTEMS INTEGRATOR &bull; IMPLEMENTATION ARCHITECTS
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-white tracking-normal sm:tracking-tight leading-snug sm:leading-[1.2] md:leading-[1.25] py-1.5 overflow-visible"
            >
              <span>Built for the</span>{' '}
              <span className="italic font-normal text-[#ff7e67] tracking-normal inline-block">
                complexity of now.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl pt-1 font-normal"
            >
              IP3 Consulting Limited translates policy intelligence, data, and digital
              transformation into implementation architecture for resilient institutions,
              inclusive systems, and a sustainable, equitable future.
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-2"
            >
              <button
                id="hero-explore-systems-btn"
                onClick={() => {
                  setActiveStoryThemeIndex(0);
                  setSelectedStoryNodeId('institutions');
                  setIsStoryOpen(true);
                  setTimeout(() => {
                    const el = document.getElementById('polysolutions-master-card') || document.getElementById('polysolutions-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="group relative inline-flex items-center gap-2.5 bg-[#ff7e67] hover:bg-[#ff8f7b] active:bg-[#f26249] text-[#070d18] font-mono font-bold text-xs sm:text-[13px] tracking-wider uppercase px-7 py-3.5 rounded-full transition-all duration-200 shadow-[0_4px_24px_rgba(255,126,103,0.35)] hover:shadow-[0_6px_30px_rgba(255,126,103,0.5)] cursor-pointer"
              >
                <span>EXPLORE OUR SYSTEMS</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </motion.div>
          </div>

          {/* Full-width Diagram: IP3 Center Hub + 4 Connected Cards (image.png layout) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full flex items-center justify-center relative"
          >
            <OrbitalSystem
              onSelectNode={handleSelectNode}
              selectedNodeId={selectedStoryNodeId}
            />
          </motion.div>
        </div>
      </section>

      {/* Unified Poly-Solutions Architecture & Eight Systems Master Section */}
      <PolySolutionsSection
        isOpen={isStoryOpen}
        onClose={handleCloseStory}
        activeThemeIndex={activeStoryThemeIndex}
        onThemeChange={handleThemeChange}
      />

      {/* Node Inspector Modal */}
      <NodeInspectorModal
        nodeId={inspectedNodeId}
        onClose={() => setInspectedNodeId(null)}
        onSelectAnotherNode={(nodeId) => setInspectedNodeId(nodeId)}
        onConsultDomain={(nodeId) => handleOpenConsultation(nodeId)}
      />

      {/* Strategic Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialDomain={consultationDomain}
      />
    </div>
  );
};
