import { useState } from 'react';
import { Sparkles, CheckCircle2, ChevronRight, BarChart3, ShieldCheck, Leaf, ArrowRight, RefreshCw, FileText } from 'lucide-react';

interface IP3DiagnosticToolProps {
  onOpenContact: () => void;
}

export default function IP3DiagnosticTool({ onOpenContact }: IP3DiagnosticToolProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [sector, setSector] = useState('Manufacturing & RMG');
  const [answers, setAnswers] = useState<Record<number, number>>({
    0: 2,
    1: 2,
    2: 1,
    3: 2
  });
  const [isCalculated, setIsCalculated] = useState(false);

  const questions = [
    {
      id: 0,
      title: 'Decarbonization & Energy Transition',
      subtitle: 'How advanced is your energy transition and GHG emission accounting (Scope 1, 2, and 3)?',
      options: [
        { label: 'Basic baseline or initial energy audits underway', score: 1 },
        { label: 'Systematic Scope 1 & 2 tracked with active solar/biomass transition', score: 2 },
        { label: 'Comprehensive Net-Zero roadmap with supply chain Scope 3 integration', score: 3 }
      ]
    },
    {
      id: 1,
      title: 'Circular Economy & Resource Productivity',
      subtitle: 'To what extent are waste-to-resource, circular design, and water recycling embedded in operations?',
      options: [
        { label: 'Standard waste disposal with minimal material recovery', score: 1 },
        { label: 'Partial closed-loop recycling (e.g. textile pre-consumer scrap reuse or effluent recycling)', score: 2 },
        { label: 'Zero-waste-to-landfill verified with circular bio-economy partnerships', score: 3 }
      ]
    },
    {
      id: 2,
      title: 'ESG Governance & Regulatory Disclosure',
      subtitle: 'How prepared is your organization for global disclosure frameworks (CSRD, ISSB, GRI, TNFD)?',
      options: [
        { label: 'Ad-hoc compliance reports without standardized materiality', score: 1 },
        { label: 'Structured annual ESG reporting aligned with GRI/national mandates', score: 2 },
        { label: 'Audited double materiality assessments and board-level ESG oversight', score: 3 }
      ]
    },
    {
      id: 3,
      title: 'Climate Adaptation & Risk Resilience',
      subtitle: 'Have physical and transition climate risks been mapped across assets and supply routes?',
      options: [
        { label: 'Limited flood/heat contingency plans without climate modeling', score: 1 },
        { label: 'Regional vulnerability mapped with adaptive infrastructure investments', score: 2 },
        { label: 'Dynamic climate scenario analysis (TCFD/TNFD) integrated into capital allocation', score: 3 }
      ]
    }
  ];

  // Calculate score (out of 100)
  const totalPoints = (Object.values(answers) as number[]).reduce((a: number, b: number) => a + b, 0);
  const maturityScore = Math.round((totalPoints / 12) * 100);

  const getMaturityTier = (score: number) => {
    if (score >= 80) return { title: 'Pioneer (Tier 1)', color: 'text-emerald-700 bg-emerald-50 border-emerald-300', desc: 'Leading readiness with competitive advantages in global green supply chains.' };
    if (score >= 55) return { title: 'Advancing (Tier 2)', color: 'text-[#2d6a4f] bg-[#e3efe7] border-[#95d5b2]', desc: 'Solid foundation with key opportunities to optimize circularity and formalize ESG assurance.' };
    return { title: 'Emerging (Tier 3)', color: 'text-amber-800 bg-amber-50 border-amber-300', desc: 'Critical exposure to regulatory tightening and international buyer ESG mandates.' };
  };

  const tier = getMaturityTier(maturityScore);

  const handleOptionSelect = (qIdx: number, score: number) => {
    setAnswers(prev => ({ ...prev, [qIdx]: score }));
  };

  return (
    <section id="diagnostic-tool" className="w-full py-20 bg-gradient-to-b from-[#f7faf8] to-[#edf5f0] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#11241c] tracking-tight">
            IP3 Sustainability &amp; ESG Maturity Index
          </h2>
          <p className="text-sm sm:text-base text-[#3d5045] font-light">
            Evaluate your enterprise or public agency against global sustainability standards, circular economy benchmarks, and climate resilience frameworks.
          </p>
        </div>

        {/* Diagnostic Tool Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden max-w-4xl mx-auto">
          
          {/* Header Bar */}
          <div className="bg-[#11241c] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#a3c4b2]">
                Sector Diagnostic Tool
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold">
                Select Your Industry Sector:
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="bg-[#1c3d2e] text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#68d391] cursor-pointer"
              >
                <option value="Manufacturing & RMG">Manufacturing &amp; Ready-Made Garments (RMG)</option>
                <option value="Banking & Financial Institutions">Banking, Insurance &amp; ESG Underwriting</option>
                <option value="Municipalities & Urban Infrastructure">Municipalities &amp; Urban Infrastructure</option>
                <option value="Agri-Food & Bio-Economy">Agri-Food &amp; Bio-Economy</option>
                <option value="Energy & Utilities">Renewable Energy &amp; Waste-to-Energy</option>
              </select>
            </div>
          </div>

          {/* Stepper / Content Body */}
          <div className="p-6 sm:p-8">
            {!isCalculated ? (
              <div className="space-y-8">
                
                {/* Progress Indicators */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-2">
                    {questions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentStep(idx)}
                        className={`w-8 h-8 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          currentStep === idx
                            ? 'bg-[#1c3d2e] text-white scale-105 shadow'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    Dimension {currentStep + 1} of {questions.length}
                  </span>
                </div>

                {/* Active Question Box */}
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <span className="text-xs font-bold text-[#2d6a4f] uppercase tracking-wider">
                      {questions[currentStep].title}
                    </span>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-gray-900 mt-1">
                      {questions[currentStep].subtitle}
                    </h4>
                  </div>

                  <div className="space-y-3 pt-2">
                    {questions[currentStep].options.map((opt, oIdx) => {
                      const isSelected = answers[currentStep] === opt.score;
                      return (
                        <div
                          key={oIdx}
                          onClick={() => handleOptionSelect(currentStep, opt.score)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#edf5f0] border-[#1c3d2e] text-[#11241c] shadow-xs'
                              : 'bg-gray-50/70 hover:bg-gray-100/80 border-gray-200 text-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                                isSelected
                                  ? 'border-[#1c3d2e] bg-[#1c3d2e] text-white'
                                  : 'border-gray-300 bg-white'
                              }`}
                            >
                              {isSelected && <CheckCircle2 className="w-4 h-4" />}
                            </div>
                            <span className="text-xs sm:text-sm font-medium">{opt.label}</span>
                          </div>
                          <span className="text-[11px] font-semibold text-gray-400">
                            +{opt.score * 8.3}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <button
                    disabled={currentStep === 0}
                    onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                    className="px-4 py-2 rounded text-xs font-semibold text-gray-600 hover:text-gray-900 disabled:opacity-30 cursor-pointer"
                  >
                    Previous
                  </button>

                  {currentStep < questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentStep(prev => prev + 1)}
                      className="px-6 py-2.5 bg-[#1c3d2e] hover:bg-[#12281e] text-white text-xs font-bold uppercase tracking-wider rounded shadow flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <span>Next Dimension</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsCalculated(true)}
                      className="px-6 py-2.5 bg-[#2d6a4f] hover:bg-[#1c3d2e] text-white text-xs font-bold uppercase tracking-wider rounded shadow-md flex items-center gap-1.5 cursor-pointer transition-all"
                    >
                      <BarChart3 className="w-4 h-4" />
                      <span>Generate Full Maturity Report</span>
                    </button>
                  )}
                </div>

              </div>
            ) : (
              /* Results Report View */
              <div className="space-y-6 animate-in zoom-in-95 duration-200">
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#2d6a4f] uppercase tracking-wider">
                      Assessment Result for {sector}
                    </span>
                    <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#11241c]">
                      Sustainability Maturity Index
                    </h4>
                    <p className="text-xs text-gray-600 max-w-md">
                      {tier.desc}
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-[#1c3d2e] text-white flex flex-col items-center justify-center shadow-lg border-4 border-white">
                      <span className="font-serif text-3xl font-bold leading-none">{maturityScore}</span>
                      <span className="text-[10px] text-[#a3c4b2] uppercase tracking-widest mt-1">/ 100</span>
                    </div>
                    <div className={`mt-2 px-3 py-1 rounded-full text-xs font-bold border ${tier.color}`}>
                      {tier.title}
                    </div>
                  </div>
                </div>

                {/* Priority Next Steps */}
                <div className="space-y-3">
                  <h5 className="font-serif font-bold text-base text-gray-900">
                    Recommended Executive Action Roadmap:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-white border border-gray-200 shadow-2xs space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#1c3d2e]">
                        <Leaf className="w-4 h-4 text-[#2d6a4f]" />
                        <span>Circularity &amp; Resource Audits</span>
                      </div>
                      <p className="text-xs text-gray-600 font-light">
                        Deploy material-flow and water-energy efficiency audits to capture immediate cost savings.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-gray-200 shadow-2xs space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#1c3d2e]">
                        <ShieldCheck className="w-4 h-4 text-[#2d6a4f]" />
                        <span>Double Materiality ESG Roadmap</span>
                      </div>
                      <p className="text-xs text-gray-600 font-light">
                        Align ESG metrics with ISSB &amp; EU CSRD requirements to protect export access and qualify for green finance.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() => {
                      setIsCalculated(false);
                      setCurrentStep(0);
                    }}
                    className="text-xs text-gray-500 hover:text-gray-800 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retake Assessment</span>
                  </button>

                  <button
                    onClick={onOpenContact}
                    className="px-6 py-3 bg-[#1c3d2e] hover:bg-[#12281e] text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-[#68d391]" />
                    <span>Discuss Roadmap with IP3 Partner</span>
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
