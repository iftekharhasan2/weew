import React from 'react';

export const CaseStudiesSection: React.FC = () => {
  const caseStudies = [
    {
      domain: 'DIGITAL PUBLIC INFRASTRUCTURE',
      title: 'Unified Sovereign Digital Identity & Payments Gateway',
      region: 'Southeast Asia & East Africa',
      impact: '14M+ Citizens Onboarded',
      description: 'Engineered open-source verifiable credential rails and automated clearance protocols bridging 24 national banks and social safety registries.',
      tags: ['Policy Sandbox', 'Open API Protocols', 'Zero-Trust Architecture'],
      metric: '78% Latency Reduction',
    },
    {
      domain: 'CLIMATE TRANSITION FINANCE',
      title: 'Sovereign Green Bond & Municipal Decarbonization Facility',
      region: 'Latin America & Caribbean',
      impact: '$620M Syndicated Capital',
      description: 'Structured a blended risk-guarantee mechanism with multilateral development banks to convert 5,000 diesel municipal buses to electric fleets.',
      tags: ['Blended Finance', 'Smart Carbon Audits', 'MDB Co-Financing'],
      metric: '1:5.8 Capital Leverage',
    },
    {
      domain: 'INSTITUTIONAL MODERNIZATION',
      title: 'National Ministry of Health Interoperability Framework',
      region: 'Sub-Saharan Africa',
      impact: '480 Hospitals & Clinics Linked',
      description: 'Drafted machine-readable health data governance regulations and deployed real-time epidemiological telemetry dashboards for crisis response.',
      tags: ['Data Governance', 'Inter-Agency Delivery', 'Epidemic Telemetry'],
      metric: '99.9% Data Fidelity',
    },
  ];

  return (
    <section
      id="case-studies"
      className="relative py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-t border-slate-800/80"
    >
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300 font-semibold">
            DEPLOYMENT PROVENANCE
          </span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
          Selected implementation{' '}
          <span className="italic font-normal bg-clip-text text-transparent bg-gradient-to-r from-[#ff7e67] to-[#ffa190]">
            architectures.
          </span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
          From national cabinet resolutions to production-grade data pipelines, see how IP3 brings mission-critical systems into reality.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
        {caseStudies.map((cs, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-b from-[#081524] to-[#040a12] border border-slate-800 hover:border-cyan-500/40 rounded-3xl p-7 flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 font-semibold px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                  {cs.domain}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {cs.region}
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-white leading-snug">
                {cs.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {cs.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {cs.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-[#091522] border border-slate-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Impact Metric Bar */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">
                  Verified Outcome
                </div>
                <div className="text-sm font-bold font-serif text-teal-300">
                  {cs.impact}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-400 uppercase">
                  Efficiency Gain
                </div>
                <div className="text-xs font-mono text-[#ff7e67] font-semibold">
                  {cs.metric}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
