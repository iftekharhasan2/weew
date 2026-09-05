import React from 'react';
import { ArrowRight, CheckCircle2, Compass, ShieldCheck, Database, FileText, Layers, Users, BarChart3 } from 'lucide-react';

interface ESGJourneyRoadmapSectionProps {
  onOpenContact?: () => void;
}

export default function ESGJourneyRoadmapSection({ onOpenContact }: ESGJourneyRoadmapSectionProps) {
  const leftItems = [
    {
      title: 'Strategic Alignment',
      text: 'Craft custom ESG roadmaps that align with SDGs, global regulatory frameworks',
      icon: <Compass className="w-4 h-4 text-[#EF715A]" />,
    },
    {
      title: 'Data & Measurement',
      text: 'Leverage big data and AI-driven tools to measure ESG impact, track KPIs',
      icon: <Database className="w-4 h-4 text-[#EF715A]" />,
    },
    {
      title: 'Materiality & Risk',
      text: 'Materiality Assessments & Develop actionable risk management frameworks',
      icon: <Layers className="w-4 h-4 text-[#EF715A]" />,
    },
  ];

  const rightItems = [
    {
      title: 'Issue Prioritization',
      text: 'Identify and prioritize key ESG issues aligned with organizational goals, stakeholder interests, and operational risks.',
      icon: <CheckCircle2 className="w-4 h-4 text-[#EF715A]" />,
    },
    {
      title: 'Resilience Architecture',
      text: 'Develop actionable risk management frameworks to mitigate ESG-related challenges and enhance resilience.',
      icon: <ShieldCheck className="w-4 h-4 text-[#EF715A]" />,
    },
    {
      title: 'Data Systems Integration',
      text: 'Integrate advanced ESG data systems for efficient data collection, reporting, and performance tracking.',
      icon: <BarChart3 className="w-4 h-4 text-[#EF715A]" />,
    },
  ];

  const bottomColumns = [
    {
      id: '01',
      title: 'Disclosure & Compliance',
      description: 'Prepare businesses to comply with mandatory disclosures and reporting regulations including IFRS, SDGs, CSRD, and emerging sustainability mandates.',
      highlight: 'Mandatory Standards (IFRS, CSRD)',
    },
    {
      id: '02',
      title: 'Climate & Nature Stewardship',
      description: 'Align ESG strategy with climate and biodiversity goals, ensuring long-term environmental stewardship and corporate resilience.',
      highlight: 'Net Zero & TNFD Pathways',
    },
    {
      id: '03',
      title: 'Stakeholder Integration',
      description: 'Conduct comprehensive stakeholder mapping to align ESG priorities with internal and external stakeholder expectations.',
      highlight: 'Multi-Stakeholder Consensus',
    },
    {
      id: '04',
      title: 'Governance & Ethics',
      description: 'Develop robust governance structures that promote accountability, transparency, and ethical leadership.',
      highlight: 'Board-Level Oversight',
    },
    {
      id: '05',
      title: 'Market Leadership',
      description: 'Enable institutions to lead in ESG strategy evolution, meeting investor and compliance demands.',
      highlight: 'Capital Allocation Advantage',
    },
  ];

  return (
    <section id="esg-journey" className="py-20 lg:py-28 bg-[#0A131A] text-[#F3F0E8] border-b border-[#3C3F45] relative overflow-hidden">
      {/* Background Ambience / Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#EF715A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tagline */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#152735] border border-[#3C3F45] text-xs font-semibold uppercase tracking-widest text-[#EF715A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF715A]" />
            Enterprise Transformation Blueprint
          </span>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP / LARGE SCREEN MINDMAP DIAGRAM (lg and up) */}
        {/* ========================================================= */}
        <div className="hidden lg:block relative py-6">
          
          {/* Main Top Tree: Left Wing - Center Hub - Right Wing */}
          <div className="grid grid-cols-12 items-center gap-4 relative">
            
            {/* LEFT WING: 3 Callouts */}
            <div className="col-span-3 space-y-4">
              {leftItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#12202B] hover:bg-[#152735] border border-[#3C3F45] hover:border-[#EF715A]/60 p-4 rounded-xl shadow-lg transition-all duration-300 group text-right"
                >
                  <p className="text-xs text-[#AEB0AE] group-hover:text-[#F3F0E8] font-light leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* LEFT CONNECTOR & SUB-NODE */}
            <div className="col-span-2 flex items-center justify-end relative">
              {/* Bracket lines */}
              <div className="flex items-center w-full">
                {/* Fork Bracket SVG on Left */}
                <svg className="w-6 h-48 text-[#3C3F45]" viewBox="0 0 24 180" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M0 20 H12 Q24 20 24 45 V75 Q24 90 24 90 Q24 90 24 105 V135 Q24 160 12 160 H0" />
                  <path d="M24 90 H0" />
                </svg>

                {/* Sub-node pill */}
                <div className="bg-[#12202B] border-2 border-[#EF715A] px-4 py-3 rounded-xl shadow-xl text-center w-full ml-1">
                  <div className="font-serif font-bold text-xs uppercase tracking-tight text-[#F3F0E8] leading-tight">
                    Comprehensive ESG Strategy <br />
                    <span className="text-[#EF715A]">Design &amp; Implementation</span>
                  </div>
                </div>

                {/* Connection line to center with coral dot */}
                <div className="w-8 h-[2px] bg-[#3C3F45] relative flex items-center justify-center shrink-0">
                  <div className="w-2.5 h-2.5 bg-[#EF715A] rotate-45 shadow" />
                </div>
              </div>
            </div>

            {/* CENTER HUB: Big Title */}
            <div className="col-span-2 text-center px-2">
              <div className="bg-[#12202B]/90 border border-[#3C3F45] rounded-2xl p-6 shadow-2xl backdrop-blur-xs relative group hover:border-[#EF715A]/50 transition-colors">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-[#EF715A] text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow">
                  IP3 Framework
                </div>
                <h2 className="font-serif text-2xl xl:text-3xl font-normal text-[#F3F0E8] leading-tight pt-1">
                  For Companies <br />
                  <span className="italic font-light text-[#EF715A]">Starting Their</span> <br />
                  ESG Journey
                </h2>
              </div>
            </div>

            {/* RIGHT CONNECTOR & SUB-NODE */}
            <div className="col-span-2 flex items-center justify-start relative">
              <div className="flex items-center w-full">
                {/* Connection line from center with coral dot */}
                <div className="w-8 h-[2px] bg-[#3C3F45] relative flex items-center justify-center shrink-0">
                  <div className="w-2.5 h-2.5 bg-[#EF715A] rotate-45 shadow" />
                </div>

                {/* Sub-node pill */}
                <div className="bg-[#12202B] border-2 border-[#EF715A] px-4 py-3 rounded-xl shadow-xl text-center w-full mr-1">
                  <div className="font-serif font-bold text-xs uppercase tracking-tight text-[#F3F0E8] leading-tight">
                    Comprehensive ESG <br />
                    <span className="text-[#EF715A]">Integration &amp; Execution</span>
                  </div>
                </div>

                {/* Fork Bracket SVG on Right */}
                <svg className="w-6 h-48 text-[#3C3F45]" viewBox="0 0 24 180" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M24 20 H12 Q0 20 0 45 V75 Q0 90 0 90 Q0 90 0 105 V135 Q0 160 12 160 H24" />
                  <path d="M0 90 H24" />
                </svg>
              </div>
            </div>

            {/* RIGHT WING: 3 Callouts */}
            <div className="col-span-3 space-y-4">
              {rightItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#12202B] hover:bg-[#152735] border border-[#3C3F45] hover:border-[#EF715A]/60 p-4 rounded-xl shadow-lg transition-all duration-300 group text-left"
                >
                  <p className="text-xs text-[#AEB0AE] group-hover:text-[#F3F0E8] font-light leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* ========================================================= */}
          {/* VERTICAL STEM TO BOTTOM BRANCH */}
          {/* ========================================================= */}
          <div className="flex flex-col items-center mt-6">
            {/* Vertical connector */}
            <div className="w-[2px] h-8 bg-[#3C3F45] relative flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-[#EF715A] rotate-45 shadow" />
            </div>

            {/* Bottom Mid Node: Regulatory Compliance & Alignment */}
            <div className="bg-[#152735] border-2 border-[#F59E0B] px-6 py-2.5 rounded-xl shadow-xl text-center z-10 mb-4">
              <div className="font-serif font-bold text-sm uppercase tracking-wider text-[#F3F0E8]">
                Regulatory Compliance &amp; Alignment
              </div>
            </div>

            {/* Horizontal Multi-Branch Tree Bar */}
            <div className="w-full relative px-6">
              {/* Vertical connector down from badge */}
              <div className="w-[2px] h-5 bg-[#3C3F45] mx-auto" />

              {/* Horizontal Bar spanning across all 5 columns */}
              <div className="w-[84%] mx-auto h-[2px] bg-[#3C3F45] relative">
                {/* 5 Drop lines */}
                <div className="absolute top-0 left-0 w-[2px] h-5 bg-[#3C3F45]" />
                <div className="absolute top-0 left-[25%] w-[2px] h-5 bg-[#3C3F45]" />
                <div className="absolute top-0 left-[50%] w-[2px] h-5 bg-[#3C3F45]" />
                <div className="absolute top-0 left-[75%] w-[2px] h-5 bg-[#3C3F45]" />
                <div className="absolute top-0 right-0 w-[2px] h-5 bg-[#3C3F45]" />
              </div>
            </div>

            {/* 5 Bottom Foundation Cards */}
            <div className="grid grid-cols-5 gap-4 w-full mt-4">
              {bottomColumns.map((col) => (
                <div
                  key={col.id}
                  className="bg-[#12202B] hover:bg-[#152735] border border-[#3C3F45] hover:border-[#EF715A]/60 rounded-xl p-4 shadow-lg flex flex-col justify-between transition-all duration-300 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#F59E0B] border-b border-[#3C3F45] pb-1.5">
                      <span>Phase {col.id}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EF715A]" />
                    </div>
                    <div className="font-serif text-xs font-bold text-[#F3F0E8] group-hover:text-[#EF715A] transition-colors leading-tight">
                      {col.title}
                    </div>
                    <p className="text-[11px] text-[#AEB0AE] group-hover:text-[#F3F0E8] font-light leading-relaxed">
                      {col.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* ========================================================= */}
        {/* MOBILE / TABLET RESPONSIVE VIEW (< lg) */}
        {/* ========================================================= */}
        <div className="block lg:hidden space-y-8">
          {/* Header Card */}
          <div className="bg-[#12202B] border border-[#3C3F45] rounded-2xl p-6 text-center shadow-xl">
            <div className="inline-block px-3 py-1 bg-[#EF715A] text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-3 shadow">
              IP3 Roadmap
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#F3F0E8]">
              For Companies Starting Their ESG Journey
            </h2>
            <p className="text-xs text-[#AEB0AE] font-light mt-2 max-w-lg mx-auto">
              A comprehensive three-pillar strategy connecting roadmap design, execution data systems, and regulatory alignment.
            </p>
          </div>

          {/* Section 1: Strategy Design & Implementation */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-wider text-[#EF715A] border-b border-[#3C3F45] pb-2">
              <span className="w-2 h-2 bg-[#EF715A] rotate-45" />
              <span>1. Strategy Design &amp; Implementation</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {leftItems.map((item, idx) => (
                <div key={idx} className="bg-[#12202B] border border-[#3C3F45] p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-1.5 font-bold text-xs text-[#F3F0E8]">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-[#AEB0AE] font-light leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Integration & Execution */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-wider text-[#EF715A] border-b border-[#3C3F45] pb-2">
              <span className="w-2 h-2 bg-[#EF715A] rotate-45" />
              <span>2. ESG Integration &amp; Execution</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {rightItems.map((item, idx) => (
                <div key={idx} className="bg-[#12202B] border border-[#3C3F45] p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-1.5 font-bold text-xs text-[#F3F0E8]">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-[#AEB0AE] font-light leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Regulatory Compliance & Alignment */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-wider text-[#F59E0B] border-b border-[#3C3F45] pb-2">
              <span className="w-2 h-2 bg-[#F59E0B] rotate-45" />
              <span>3. Regulatory Compliance &amp; Alignment</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bottomColumns.map((col) => (
                <div key={col.id} className="bg-[#12202B] border border-[#3C3F45] p-4 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-[#F59E0B] font-mono">
                    <span>Phase {col.id}</span>
                    <span className="text-[10px] text-[#EF715A]">{col.highlight}</span>
                  </div>
                  <h4 className="font-serif font-bold text-xs text-[#F3F0E8]">{col.title}</h4>
                  <p className="text-xs text-[#AEB0AE] font-light leading-relaxed">{col.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-12 pt-8 border-t border-[#3C3F45] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#EF715A]">
              Ready to Kickstart Your ESG Journey?
            </div>
            <div className="text-xs sm:text-sm text-[#AEB0AE] font-light">
              Our lead advisors will conduct a preliminary materiality &amp; compliance gap assessment.
            </div>
          </div>

          {onOpenContact && (
            <button
              onClick={onOpenContact}
              className="px-6 py-3 bg-[#EF715A] hover:bg-[#E05E47] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-lg flex items-center gap-2 cursor-pointer transition-all hover:gap-3 shrink-0"
            >
              <span>Schedule ESG Scoping Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </section>
  );
}
