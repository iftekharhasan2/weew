import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp,
  BarChart3,
  ClipboardCheck,
  Cpu,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Mail,
  FileText,
  Layers,
  ChevronRight,
  ExternalLink,
  Target,
  Sparkles,
  Phone,
  Clock,
  Award,
  Globe2,
  Building2,
  Database
} from 'lucide-react';
import { SERVICES_SUB_PAGES, ServiceSubPage } from '../data/servicesData';
import { useCMS } from '../context/CMSContext';

interface ServicesPageProps {
  initialSubPageId?: string;
  onOpenTalk?: () => void;
  onOpenCollaborate?: (area?: string) => void;
  onNavigateHome?: () => void;
  onNavigateContact?: () => void;
  onNavigateAbout?: () => void;
  onNavigateApproach?: () => void;
  onNavigateFocus?: () => void;
}

const SERVICE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  'macro-policy': TrendingUp,
  'merla': BarChart3,
  'capi-surveys': ClipboardCheck,
  'digital-systems': Cpu,
  'capacity-building': GraduationCap,
};

export const ServicesPage: React.FC<ServicesPageProps> = ({
  initialSubPageId,
  onOpenTalk,
  onOpenCollaborate,
  onNavigateHome,
  onNavigateContact,
  onNavigateAbout,
  onNavigateApproach,
  onNavigateFocus,
}) => {
  const { data } = useCMS();
  const [activeSubPageId, setActiveSubPageId] = useState<string>(() => {
    if (initialSubPageId) {
      const cleanId = initialSubPageId.replace(/^#/, '');
      const matched = SERVICES_SUB_PAGES.find(s => s.id === cleanId || s.slug === cleanId);
      if (matched) return matched.id;
    }
    return SERVICES_SUB_PAGES[0].id;
  });

  useEffect(() => {
    if (initialSubPageId) {
      const cleanId = initialSubPageId.replace(/^#/, '');
      const matched = SERVICES_SUB_PAGES.find(s => s.id === cleanId || s.slug === cleanId);
      if (matched) {
        setActiveSubPageId(matched.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [initialSubPageId]);

  const activeService: ServiceSubPage =
    SERVICES_SUB_PAGES.find(s => s.id === activeSubPageId) || SERVICES_SUB_PAGES[0];

  const IconComponent = SERVICE_ICONS[activeService.id] || Layers;

  return (
    <div className="min-h-screen bg-[#050a12] text-slate-100 font-sans selection:bg-[#ff7e67]/30 selection:text-[#ff9d8c] pb-24">
      {/* Top Header Banner */}
      <section className="relative pt-12 pb-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-[#081220] overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div 
          className="absolute top-0 right-1/4 w-[600px] h-[350px] rounded-full blur-[140px] pointer-events-none opacity-20"
          style={{ backgroundColor: activeService.accentColor }}
        />
        <div className="max-w-7xl mx-auto relative z-10 space-y-6">
          {/* Breadcrumb & Global Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <button 
                onClick={onNavigateHome}
                className="hover:text-[#ff7e67] transition-colors cursor-pointer"
              >
                HOME
              </button>
              <span>/</span>
              <span className="text-slate-200">OUR SERVICES & PRACTICES</span>
              <span>/</span>
              <span className="text-[#ff7e67] font-bold uppercase">{activeService.tabLabel}</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#050a12] border border-slate-700/80 text-xs font-mono text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ff7e67]" />
              <span>5 Integrated Sovereign Advisory Practices</span>
            </div>
          </div>

          {/* Section Main Title */}
          <div className="max-w-4xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff7e67]/10 border border-[#ff7e67]/30 text-[#ff7e67] text-xs font-mono font-bold tracking-wider uppercase">
              <span>{activeService.badge}</span>
              <span>•</span>
              <span>{activeService.tabLabel}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-serif tracking-tight text-slate-100 leading-tight">
              {activeService.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed">
              {activeService.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* 5 Sub-Pages Switcher Bar (Sticky navigation) */}
      <div className="sticky top-16 sm:top-18 z-30 bg-[#050a12]/95 backdrop-blur-xl border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 overflow-x-auto no-scrollbar scroll-smooth">
            {SERVICES_SUB_PAGES.map((subPage, index) => {
              const isActive = subPage.id === activeSubPageId;
              const SubIcon = SERVICE_ICONS[subPage.id] || Layers;
              return (
                <button
                  key={subPage.id}
                  onClick={() => {
                    setActiveSubPageId(subPage.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer border shrink-0 ${
                    isActive
                      ? 'bg-[#ff7e67] text-[#050a12] font-bold border-[#ff7e67] shadow-md shadow-[#ff7e67]/25 scale-102'
                      : 'bg-[#081220]/90 text-slate-300 hover:text-white hover:bg-slate-800/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold ${
                    isActive ? 'bg-[#050a12] text-[#ff7e67]' : 'bg-slate-800 text-slate-400'
                  }`}>
                    0{index + 1}
                  </span>
                  <SubIcon className="w-4 h-4" />
                  <span>{subPage.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Sub-Page Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-16 sm:space-y-20">
        
        {/* Overview & Key Stats Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Summary & Image */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#081220] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#ff7e67]/15 border border-[#ff7e67]/30 flex items-center justify-center text-[#ff7e67]">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#ff7e67] font-bold block">
                    PRACTICE OVERVIEW
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
                    Institutional Mandate & Mission
                  </h2>
                </div>
              </div>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
                {activeService.summary}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    if (onOpenCollaborate) {
                      onOpenCollaborate(activeService.title);
                    } else if (onOpenTalk) {
                      onOpenTalk();
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#ff7e67] hover:bg-[#ff8f7b] text-[#050a12] text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-[#ff7e67]/25 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Advisory Briefing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    if (onOpenTalk) onOpenTalk();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold uppercase tracking-wider border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#ff7e67]" />
                  <span>Direct Inquiries</span>
                </button>
              </div>
            </div>

            {/* Featured Visual Image Banner */}
            <div className="rounded-3xl overflow-hidden border border-slate-800 relative aspect-video bg-[#050a12] group shadow-2xl">
              <img
                src={activeService.heroImage}
                alt={activeService.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 opacity-85"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050a12] via-[#050a12]/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="bg-[#050a12]/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700">
                  Sub-Page Practice: 0{SERVICES_SUB_PAGES.findIndex(s => s.id === activeService.id) + 1} of 05
                </span>
                <span className="text-[#ff7e67] font-bold">
                  IP3 RIGOR STANDARDS
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Quantitative Stats & Verification */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold block">
                PRACTICE BENCHMARKS & SCALE
              </span>
              <div className="space-y-4">
                {activeService.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="p-5 sm:p-6 rounded-2xl bg-[#081220] border border-slate-800 hover:border-slate-700 transition-colors space-y-2 shadow-lg"
                  >
                    <div className="text-3xl sm:text-4xl font-extrabold font-serif text-[#ff7e67] tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-sm font-bold text-slate-100">
                      {stat.label}
                    </div>
                    <div className="text-xs text-slate-400 leading-relaxed">
                      {stat.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Practice Index */}
            <div className="p-5 rounded-2xl bg-[#081220]/60 border border-slate-800/80 space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                ALL 5 SERVICE PRACTICES
              </span>
              <div className="space-y-1.5">
                {SERVICES_SUB_PAGES.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setActiveSubPageId(s.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                      s.id === activeSubPageId
                        ? 'bg-[#ff7e67]/15 text-[#ff7e67] font-bold border border-[#ff7e67]/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                    }`}
                  >
                    <span className="truncate">0{idx + 1}. {s.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Core Capabilities & Deliverables Matrix */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#ff7e67] font-bold block mb-1">
                PRACTICE CAPABILITIES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-serif">
                Specific Workstreams & Concrete Deliverables
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Verified Methodological Protocols
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeService.keyCapabilities.map((cap, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-[#081220] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-6 group shadow-xl"
              >
                <div className="space-y-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-[11px] font-mono text-slate-300 border border-slate-700">
                    {cap.tag}
                  </span>
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-[#ff7e67] transition-colors leading-snug">
                    {cap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {cap.description}
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-800/80">
                  <span className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                    KEY DELIVERABLES:
                  </span>
                  <ul className="space-y-2">
                    {cap.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#ff7e67] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4-Step Methodological Architecture */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#081220] border border-slate-800 space-y-8 shadow-2xl relative overflow-hidden">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#ff7e67] font-bold block mb-1">
              OPERATING PROTOCOL
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-serif">
              Four-Phase Execution Lifecycle
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {activeService.methodologySteps.map((step, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#050a12] border border-slate-800/90 space-y-3 relative group">
                <div className="w-9 h-9 rounded-xl bg-[#ff7e67]/15 border border-[#ff7e67]/30 flex items-center justify-center font-mono font-bold text-[#ff7e67] text-sm">
                  {step.step}
                </div>
                <h4 className="text-sm font-bold text-slate-100 leading-snug">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Case Study Deep-Dive */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-8 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#081220] to-[#0a182d] border border-slate-800 space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#ff7e67]/15 text-[#ff7e67] border border-[#ff7e67]/30 text-xs font-mono font-bold uppercase tracking-wider">
                  FEATURED CASE STUDY
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {activeService.featuredCaseStudy.client} • {activeService.featuredCaseStudy.region}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                    THE INSTITUTIONAL CHALLENGE:
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {activeService.featuredCaseStudy.challenge}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#ff7e67] mb-1">
                    IP3 STRATEGIC INTERVENTION:
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed font-light">
                    {activeService.featuredCaseStudy.intervention}
                  </p>
                </div>
              </div>

              {/* Quantified Outcomes */}
              <div className="pt-4 border-t border-slate-800 space-y-2.5">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  MEASURED IMPACT & OUTCOMES:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeService.featuredCaseStudy.results.map((res, rIdx) => (
                    <div key={rIdx} className="p-3.5 rounded-xl bg-[#050a12] border border-slate-800 text-xs text-slate-300 leading-snug">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ff7e67] mb-1.5" />
                      {res}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            {activeService.featuredCaseStudy.quote && (
              <div className="mt-6 p-4 rounded-2xl bg-[#050a12]/80 border border-slate-800 italic text-xs sm:text-sm text-slate-300">
                "{activeService.featuredCaseStudy.quote}"
                <div className="text-[11px] font-mono text-[#ff7e67] not-italic mt-1.5 font-semibold">
                  — {activeService.featuredCaseStudy.quoteAuthor}
                </div>
              </div>
            )}
          </div>

          {/* Artifacts & Publications Download Box */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-[#081220] border border-slate-800 space-y-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#ff7e67] font-bold uppercase">
                <FileText className="w-4 h-4" />
                <span>PRACTICE ARTIFACTS</span>
              </div>
              <h3 className="text-lg font-bold text-slate-100">
                Methodological Dossiers & Publications
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Request verified working papers, toolkits, and anonymized datasets produced by this practice.
              </p>

              <div className="space-y-3 pt-2">
                {activeService.artifacts.map((art, aIdx) => (
                  <div key={aIdx} className="p-3.5 rounded-xl bg-[#050a12] border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-200">{art.title}</span>
                      <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-[#ff7e67]">
                        {art.format}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{art.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                if (onOpenCollaborate) {
                  onOpenCollaborate(`Artifact Request: ${activeService.title}`);
                } else if (onOpenTalk) {
                  onOpenTalk();
                }
              }}
              className="w-full py-3 rounded-xl bg-[#ff7e67] hover:bg-[#ff8f7b] text-[#050a12] text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-[#ff7e67]/25 transition-all text-center cursor-pointer"
            >
              Request Practice Toolkits
            </button>
          </div>
        </section>

        {/* Global Cross-Practice Footer Navigation */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[#081220] border border-slate-800 text-center space-y-6 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#ff7e67] font-bold">
              ENGAGE WITH OUR LEADERSHIP
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-serif">
              Ready to deploy institutional advisory for your organization?
            </h2>
            <p className="text-sm text-slate-300 font-light">
              Connect with our practice directors, principal economists, and field survey architects.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                if (onOpenCollaborate) onOpenCollaborate(activeService.title);
              }}
              className="px-6 py-3 rounded-xl bg-[#ff7e67] hover:bg-[#ff8f7b] text-[#050a12] text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-[#ff7e67]/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Schedule Practice Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateHome}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold uppercase tracking-wider border border-slate-700 transition-all cursor-pointer"
            >
              Back to Home Experience
            </button>
          </div>
        </section>

      </main>
    </div>
  );
};
