import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  BadgeCheck, 
  ScrollText, 
  Workflow, 
  ChevronRight, 
  Sparkles, 
  Users,
  Building2,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  Quote,
  Target,
  Layers,
  FileCheck,
  GraduationCap,
  Briefcase,
  Globe2,
  Award,
  BookOpen,
  History,
  Compass,
  Scale,
  Calendar,
  ExternalLink,
  PhoneCall
} from 'lucide-react';
import { TeamSection } from './TeamSection';
import { ExecutiveCard } from './ExecutiveCard';
import { TestimonialCard } from './TestimonialCard';
import { AboutOverviewView } from './about-overview/AboutOverviewView';

export const PRINCIPLES = [
  {
    icon: ScrollText,
    tag: 'Evidence Standard',
    index: '01',
    title: 'We publish what we can evidence',
    body: 'Engagements, figures and quotations appear on this site only when they can be substantiated and disclosure is permitted. Where an engagement is confidential we describe the institution and context rather than naming it.',
  },
  {
    icon: Workflow,
    tag: 'Delivery Model',
    index: '02',
    title: 'We stay past the recommendation',
    body: 'Analysis that nobody can implement is not a deliverable. Our model carries a reform through policy design, financing structure, delivery systems and measurement.',
  },
  {
    icon: BadgeCheck,
    tag: 'Operational Realism',
    index: '03',
    title: 'We design for the institution that exists',
    body: 'Policy that assumes data an agency does not hold, or capacity it does not have, will not survive contact with reality. We design against administrative and political facts.',
  },
  {
    icon: Scale,
    tag: 'Data Fidelity',
    index: '04',
    title: 'Zero-tolerance for simulated metrics',
    body: 'Our econometric and field models rely exclusively on ground-truth CAPI surveys, verified institutional logs, and reproducible econometric pipelines.',
  },
];

const CLIENT_ECOSYSTEM = [
  { label: 'Governments & Ministries', icon: Landmark, desc: 'Cabinet offices, finance, energy & planning ministries across emerging economies' },
  { label: 'Development Partners & MDBs', icon: Building2, desc: 'World Bank, ADB, UN agencies & bilateral development finance institutions' },
  { label: 'Financial Institutions & Enterprises', icon: ShieldCheck, desc: 'Central banks, sovereign wealth funds, commercial lenders & green bond issuers' },
  { label: 'Research Institutes & Think Tanks', icon: Layers, desc: 'Global universities, economic policy institutes & independent non-profits' },
];

const DELIVERY_JOINS = [
  {
    step: '01',
    title: 'Policy Research & Empirical Modeling',
    desc: 'Econometric forecasts, micro-simulations, and field baseline data gathering using secure CAPI pipelines.',
  },
  {
    step: '02',
    title: 'Institutional Design & Regulatory Frameworks',
    desc: 'Statutory drafting, institutional governance blueprints, and inter-agency coordination mechanisms.',
  },
  {
    step: '03',
    title: 'Financing Structures & Green Capital',
    desc: 'Blended finance vehicles, sovereign green bond frameworks, and multi-tier public investment appraisals.',
  },
  {
    step: '04',
    title: 'Field Implementation & MERLA Support',
    desc: 'Longitudinal monitoring, evaluation, research, learning and institutional capacity handoff.',
  }
];

const TIMELINE_MILESTONES = [
  {
    year: '2008',
    badge: 'Founding',
    title: 'Establishment of IP3 Consulting',
    description: 'Founded in Dhaka with a core mission to bridge macro policy analysis and operational public sector delivery.',
  },
  {
    year: '2014',
    badge: 'Expansion',
    title: 'Multilateral Accord Integration',
    description: 'Appointed as strategic advisory partner for major World Bank and Asian Development Bank governance initiatives.',
  },
  {
    year: '2019',
    badge: 'Innovation',
    title: 'Computational Research & CAPI Lab',
    description: 'Pioneered custom high-frequency CAPI survey platforms and spatial econometric models across 64 districts.',
  },
  {
    year: '2023',
    badge: 'Sovereign Impact',
    title: 'Climate Resilience & Sustainable Finance',
    description: 'Structured national green financing roadmaps, sovereign bond advisory, and cross-ministerial climate action plans.',
  },
  {
    year: '2026',
    badge: 'Current Era',
    title: 'Global Policy Faculty & Field Network',
    description: 'Deploying senior faculty, visiting scholars, and specialized implementation task forces across multiple jurisdictions.',
  }
];

export const APPROACH_STAGES = [
  {
    step: '01',
    id: 'complexity',
    name: 'Complexity Diagnostics',
    tag: 'Problem Framing',
    title: 'Pressures arrive together, not one at a time',
    desc: 'Fiscal constraints, climate exposure, institutional capacity, and technological friction interact simultaneously. We map compounding vulnerabilities across sectors.',
    deliverable: 'Cross-Sector Vulnerability Matrix & Stress Testing',
    focus: 'Institutional stress mapping & multi-variable friction modeling'
  },
  {
    step: '02',
    id: 'evidence',
    name: 'Empirical Evidence',
    tag: 'Ground Truth',
    title: 'Establish what is actually happening on the ground',
    desc: 'We gather primary field evidence where secondary data is thin, deploy high-frequency CAPI pipelines, and model the economics against administrative facts.',
    deliverable: 'CAPI Field Baseline & Econometric Counterfactuals',
    focus: 'Statistically powered household surveys & micro-simulations'
  },
  {
    step: '03',
    id: 'architecture',
    name: 'Policy Architecture',
    tag: 'Statutory Design',
    title: 'Turn findings into statutory instruments somebody owns',
    desc: 'Evidence becomes regulatory architecture, operating decrees, and institutional charters designed directly for the agency that will administer them.',
    deliverable: 'Statutory Drafts & Inter-Agency Governance Charters',
    focus: 'Administrative protocols & compliance frameworks'
  },
  {
    step: '04',
    id: 'mobilisation',
    name: 'Capital Mobilisation',
    tag: 'Financing Vehicles',
    title: 'Structure the financing alongside the reform design',
    desc: 'We align public expenditure, development finance, sovereign green bonds, and private co-investment so the reform is fully bankable from day one.',
    deliverable: 'Blended Finance Vehicles & Sovereign Risk Allocations',
    focus: 'MDB co-financing tranches & fiscal sustainability'
  },
  {
    step: '05',
    id: 'delivery',
    name: 'Systems & Delivery',
    tag: 'Execution Units',
    title: 'Stand the digital and operational systems up and run them',
    desc: 'We deploy cabinet-level Delivery Units, public financial management telemetry, and real-time MERLA monitoring platforms to guide live execution.',
    deliverable: 'National MERLA Telemetry & PFM Execution Dashboards',
    focus: 'Real-time indicators across 64 administrative districts'
  },
  {
    step: '06',
    id: 'transfer',
    name: 'Capability Transfer',
    tag: 'Sovereign Autonomy',
    title: 'Deliberate institutional handoff and autonomous governance',
    desc: 'We transfer full analytical models, codebases, and operational control to permanent civil servants so success does not depend on external presence.',
    deliverable: 'Civil Service Fellowship Curricula & Codebase Repositories',
    focus: 'Masterclasses, simulation war-rooms & policy handbooks'
  }
];

interface AboutPageProps {
  darkMode?: boolean;
  setDarkMode?: (val: boolean) => void;
  initialSection?: string;
  onOpenTalk?: () => void;
  onOpenCollaborate?: (area?: string) => void;
  onNavigateHome?: () => void;
  onNavigateContact?: () => void;
  onNavigateApproach?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  darkMode = false,
  setDarkMode = () => {},
  initialSection,
  onOpenTalk = () => {},
  onOpenCollaborate = () => {},
  onNavigateHome = () => {},
  onNavigateContact = () => {},
  onNavigateApproach = () => {},
}) => {
  // Available 3 core sub-pages within About Us: overview, people, approach
  const [activeTab, setActiveTab] = useState<'overview' | 'people' | 'approach'>('overview');
  const [activeApproachStage, setActiveApproachStage] = useState<number>(0);

  useEffect(() => {
    if (initialSection) {
      if (initialSection.includes('people') || initialSection.includes('team') || initialSection.includes('faculty') || initialSection.includes('executive')) {
        setActiveTab('people');
      } else if (initialSection.includes('approach') || initialSection.includes('methodology') || initialSection.includes('lifecycle')) {
        setActiveTab('approach');
      } else {
        setActiveTab('overview');
      }

      setTimeout(() => {
        const el = document.querySelector(initialSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  }, [initialSection]);

  return (
    <div className="w-full min-h-screen bg-[#050a12] text-slate-100 font-sans">
      {/* Page Header / Sub-Page Banner with Navigation Switcher */}
      <section className="relative w-full pt-12 pb-10 sm:pt-16 sm:pb-14 px-6 sm:px-12 lg:px-16 border-b border-slate-800 overflow-hidden bg-gradient-to-b from-[#050a12] via-[#081220] to-[#050a12]">
        {/* Subtle Background Blueprint Grid */}
        <div 
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ff7e67 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
            <button 
              onClick={onNavigateHome}
              className="hover:text-[#ff7e67] transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-slate-400">About Us</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-[#ff7e67] font-semibold capitalize">
              {activeTab === 'overview' ? '01. Institutional Overview' : activeTab === 'people' ? '02. IP3 People & Faculty' : '03. Methodological Approach'}
            </span>
          </nav>

          {/* Header Title and Navigation Pill Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-3 mb-2.5">
                <span className="h-[2px] w-8 bg-[#ff7e67]" />
                <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#ff7e67]">
                  ABOUT IP3 CONSULTING
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 leading-[1.1]">
                {activeTab === 'overview' && 'An Advisory Firm Built for Institutional Longevity'}
                {activeTab === 'people' && 'IP3 People, Faculty & Leadership'}
                {activeTab === 'approach' && 'Empirical Research, Policy Design & Delivery'}
              </h1>
            </div>

            {/* Sub-Page Navigation Tabs (Overview, IP3 People, Approach) */}
            <div className="flex items-center flex-wrap p-1.5 rounded-full bg-[#081220] border border-slate-800 shadow-inner shrink-0 gap-1">
              {[
                { id: 'overview', label: 'Overview', icon: Landmark, number: '01' },
                { id: 'people', label: 'IP3 People', icon: Users, number: '02' },
                { id: 'approach', label: 'Approach', icon: Compass, number: '03' },
              ].map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`relative px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? 'text-[#050a12] shadow-md shadow-black/40'
                        : 'text-slate-400 hover:text-slate-100'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="aboutPagePill"
                        className="absolute inset-0 bg-[#ff7e67] rounded-full"
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                      />
                    )}
                    <span className={`relative z-10 font-mono text-[11px] font-bold ${isActive ? 'text-[#050a12]' : 'text-[#ff7e67]'}`}>
                      {tab.number}
                    </span>
                    <TabIcon className="w-3.5 h-3.5 relative z-10" />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subtitle Description */}
          <p className="text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed font-normal mt-6 mb-8">
            {activeTab === 'overview' && 'IP3 Consulting Limited works with sovereign governments, multilateral development institutions, and enterprise leaders to transform systemic risk into durable institutional capacity through empirical research, policy design, financing structures, and public delivery.'}
            {activeTab === 'people' && 'Meet the economists, public policy researchers, data architects, and executive advisors driving systemic reform and empirical policy analysis across global jurisdictions.'}
            {activeTab === 'approach' && 'Our 6-stage delivery lifecycle bridges the gap between high-level analytical modeling and operational civil service implementation, ensuring long-term sovereign autonomy.'}
          </p>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-slate-800/80">
            <div className="p-4 rounded-2xl bg-[#081220] border border-slate-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#ff7e67] mb-1">18+ Yrs</div>
              <div className="text-xs text-slate-400 font-medium">Sovereign Advisory Record</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#081220] border border-slate-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-100 mb-1">$2.4B+</div>
              <div className="text-xs text-slate-400 font-medium">Mobilized Program Value</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#081220] border border-slate-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#2dd4bf] mb-1">40+</div>
              <div className="text-xs text-slate-400 font-medium">Specialists, Economists & Fellows</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#081220] border border-slate-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-100 mb-1">12</div>
              <div className="text-xs text-slate-400 font-medium">Multilateral & State Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tabbed Content Area */}
      <AnimatePresence mode="wait">
        {/* ========================================================================= */}
        {/* SUB-PAGE 01: OVERVIEW                                                    */}
        {/* ========================================================================= */}
        {activeTab === 'overview' && (
          <motion.div
            key="tab-overview"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            id="overview"
          >
            {/* Integrated Full About Us Overview Experience */}
            <AboutOverviewView
              onOpenTalk={onOpenTalk}
              onOpenCollaborate={onOpenCollaborate}
              onNavigateContact={onNavigateContact}
              onNavigateApproach={() => {
                setActiveTab('approach');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Strategic Leadership Spotlight Card */}
            <div id="executive" className="border-t border-[#3C3F45]">
              <ExecutiveCard
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                onOpenTalk={onOpenTalk}
                onOpenCollaborate={onOpenCollaborate}
              />
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* SUB-PAGE 02: IP3 PEOPLE                                                  */}
        {/* ========================================================================= */}
        {activeTab === 'people' && (
          <motion.div
            key="tab-people"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            id="people"
          >
            {/* Full Team Roster Component */}
            <div id="team">
              <TeamSection />
            </div>

            {/* Strategic Leadership & Executive Briefing */}
            <div id="executive">
              <ExecutiveCard
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                onOpenTalk={onOpenTalk}
                onOpenCollaborate={onOpenCollaborate}
              />
            </div>

            {/* Visiting Scholars & Fellowships Callout */}
            <section className="py-16 sm:py-20 px-6 sm:px-12 lg:px-16 border-t border-slate-800 bg-[#050a12]">
              <div className="max-w-7xl mx-auto">
                <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#081220] via-[#0a182b] to-[#050a12] border border-slate-800 shadow-2xl relative overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-8 space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff7e67]/10 border border-[#ff7e67]/30 text-xs font-mono font-bold text-[#ff7e67]">
                        <GraduationCap className="w-4 h-4" />
                        <span>GLOBAL FELLOWSHIPS & VISITING SCHOLARS</span>
                      </div>
                      <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 leading-tight">
                        Join IP3's Multidisciplinary Research Faculty
                      </h2>
                      <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
                        We host senior policy fellows, doctoral researchers, and visiting economists from international universities and multilateral development institutions. Collaborate on cutting-edge macroeconomic modeling, CAPI field architectures, and sovereign climate governance.
                      </p>
                    </div>

                    <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                      <button
                        onClick={onNavigateContact}
                        className="px-6 py-3.5 rounded-full bg-[#ff7e67] hover:bg-[#ff8f7b] text-[#050a12] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-[#ff7e67]/20 cursor-pointer flex items-center justify-center gap-2 text-center"
                      >
                        <Briefcase className="w-4 h-4" />
                        <span>Apply for 2026 Fellowship</span>
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab('overview');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-6 py-3.5 rounded-full bg-[#050a12] hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 text-center"
                      >
                        <Landmark className="w-4 h-4 text-slate-400" />
                        <span>Explore Institutional Model</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials & Endorsements */}
            <div id="testimonials">
              <TestimonialCard />
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* SUB-PAGE 03: APPROACH                                                    */}
        {/* ========================================================================= */}
        {activeTab === 'approach' && (
          <motion.div
            key="tab-approach"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            id="approach"
            className="py-16 sm:py-24 px-6 sm:px-12 lg:px-16"
          >
            <div className="max-w-7xl mx-auto space-y-16">
              {/* Top Approach Intro Banner */}
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff7e67]/10 border border-[#ff7e67]/30 text-xs font-mono font-bold text-[#ff7e67]">
                  <Compass className="w-4 h-4" />
                  <span>THE 6-STAGE DELIVERY METHODOLOGY</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100">
                  How We Deliver Across The Joins
                </h2>
                <p className="text-sm sm:text-base text-slate-400">
                  Sovereign reform fails when analysis is decoupled from statutory reality, money, and operational capacity. Our structured lifecycle ensures seamless execution.
                </p>
              </div>

              {/* Interactive 6-Stage Lifecycle Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {APPROACH_STAGES.map((stage, idx) => {
                  const isSelected = activeApproachStage === idx;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => setActiveApproachStage(idx)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                        isSelected 
                          ? 'bg-[#ff7e67] border-[#ff7e67] text-[#050a12] shadow-xl shadow-[#ff7e67]/20 scale-[1.02]' 
                          : 'bg-[#081220] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-mono text-xs font-bold ${isSelected ? 'text-[#050a12]' : 'text-[#ff7e67]'}`}>
                          STAGE {stage.step}
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#050a12]" />}
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${isSelected ? 'text-[#050a12]' : 'text-slate-100'}`}>
                          {stage.name}
                        </div>
                        <div className={`text-[10px] font-mono mt-1 ${isSelected ? 'text-[#050a12]/80' : 'text-slate-400'}`}>
                          {stage.tag}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Stage Deep-Dive Card */}
              {(() => {
                const currentStage = APPROACH_STAGES[activeApproachStage];
                return (
                  <div className="p-8 sm:p-12 rounded-3xl bg-[#081220] border border-slate-800 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff7e67]/5 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                      <div className="lg:col-span-7 space-y-6">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-[#ff7e67] text-[#050a12] font-mono text-sm font-bold flex items-center justify-center">
                            {currentStage.step}
                          </span>
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#ff7e67]">
                            {currentStage.tag}
                          </span>
                        </div>

                        <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-100 leading-tight">
                          {currentStage.title}
                        </h3>

                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                          {currentStage.desc}
                        </p>

                        <div className="p-4 rounded-2xl bg-[#050a12] border border-slate-800 space-y-2">
                          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                            Empirical Focus Area
                          </div>
                          <div className="text-sm font-semibold text-slate-200">
                            {currentStage.focus}
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-5 space-y-4">
                        <div className="p-6 rounded-2xl bg-[#050a12] border border-[#ff7e67]/30 space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold uppercase text-[#ff7e67]">
                              PRIMARY DELIVERABLE
                            </span>
                            <FileCheck className="w-4 h-4 text-[#ff7e67]" />
                          </div>
                          <h4 className="text-base sm:text-lg font-bold text-slate-100">
                            {currentStage.deliverable}
                          </h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Formally verified and handed over with complete technical documentation, data scripts, and executive briefings.
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => setActiveApproachStage((prev) => (prev > 0 ? prev - 1 : APPROACH_STAGES.length - 1))}
                            className="px-4 py-2.5 rounded-full bg-[#050a12] hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
                          >
                            ← Previous Stage
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveApproachStage((prev) => (prev < APPROACH_STAGES.length - 1 ? prev + 1 : 0))}
                            className="px-4 py-2.5 rounded-full bg-[#ff7e67] hover:bg-[#ff8f7b] text-[#050a12] text-xs font-mono font-bold transition-colors cursor-pointer"
                          >
                            Next Stage →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* 4 Strategic Delivery Joins Detailed Grid */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#ff7e67] mb-1">
                      INTEGRATED JOIN ARCHITECTURE
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
                      Where Reform Programs Typically Fail
                    </h3>
                  </div>
                  <button
                    onClick={onNavigateContact}
                    className="hidden sm:flex items-center gap-2 text-xs font-mono font-bold text-[#ff7e67] hover:underline"
                  >
                    <span>Request Methodology Brief</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {DELIVERY_JOINS.map((join, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-3xl bg-[#081220] border border-slate-800 hover:border-[#ff7e67]/50 transition-all flex flex-col justify-between gap-4"
                    >
                      <div className="space-y-3">
                        <div className="w-8 h-8 rounded-xl bg-[#ff7e67]/10 border border-[#ff7e67]/30 text-[#ff7e67] font-mono text-xs font-bold flex items-center justify-center">
                          {join.step}
                        </div>
                        <h4 className="text-base font-bold text-slate-100 leading-snug">
                          {join.title}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {join.desc}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-slate-800/80 text-[11px] font-mono text-[#ff7e67]">
                        Verified Delivery Join
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Call to Action */}
      <section className="py-16 sm:py-20 px-6 sm:px-12 border-t border-slate-800 bg-[#050a12]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ff7e67] uppercase tracking-wider mb-2">
              <PhoneCall className="w-4 h-4" />
              <span>Direct Advisory Engagement</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mb-2">
              Ready to structure systemic reform?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Connect with our Managing Director and Practice Leads for an initial confidential institutional briefing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenTalk}
              className="px-6 py-3.5 rounded-full bg-[#ff7e67] hover:bg-[#ff8f7b] text-[#050a12] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-[#ff7e67]/20 cursor-pointer flex items-center gap-2"
            >
              <span>Schedule Briefing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onNavigateHome}
              className="px-6 py-3.5 rounded-full bg-[#081220] hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium text-xs sm:text-sm transition-all cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
