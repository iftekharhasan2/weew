import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Copy,
  Check,
  Award,
  ArrowRight,
  Phone,
  Globe2,
  Shield,
  Leaf,
  TreeDeciduous,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface ExecutiveCardProps {
  darkMode: boolean;
  setDarkMode?: (val: boolean) => void;
  onOpenTalk: () => void;
  onOpenCollaborate: () => void;
}

export const ExecutiveCard: React.FC<ExecutiveCardProps> = ({
  darkMode,
  setDarkMode,
  onOpenTalk,
  onOpenCollaborate,
}) => {
  const { data } = useCMS();
  const executiveData = data.executive;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('Econpolicy&SusTransGroup@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+88019174011329');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const multilateralPartners = [
    'World Bank',
    'IFC (World Bank Group)',
    'Asian Development Bank (ADB)',
    'SIDA',
    'W.T.O. (World Trade Org)',
    'European Commission'
  ];

  return (
    <section id="executive-briefing" className="py-12 md:py-20 bg-[#050a12] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          id="executive-card-container"
          className="relative rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl transition-all duration-300 bg-gradient-to-br from-[#081220] via-[#0d1b2a] to-[#050a12] text-slate-100"
        >
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#ff7e67]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#2dd4bf]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Institutional Header Tag & Direct Contact Bar */}
          <div className="px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold bg-[#050a12]/80 text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff7e67]" />
              <span className="tracking-widest uppercase text-xs font-mono font-bold text-[#ff7e67]">
                Institutional Executive Briefing
              </span>
            </div>
            
            {/* Direct Contact Links */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <a
                href="tel:+88019174011329"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 transition-colors"
                title="Call Mohammad Syful Hoque"
              >
                <Phone className="w-3.5 h-3.5 text-[#ff7e67]" />
                <span>+88019174011329</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 transition-colors cursor-pointer"
                title="Email Econpolicy & Sustainability Transformation Group"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#2dd4bf]" /> : <Mail className="w-3.5 h-3.5 text-[#ff7e67]" />}
                <span>Econpolicy&SusTransGroup@gmail.com</span>
                {copiedEmail && <span className="text-[10px] text-[#2dd4bf] font-bold">(Copied!)</span>}
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              
              {/* LEFT COLUMN: Executive Portrait & Pillars */}
              <div className="lg:col-span-5 flex flex-col items-center text-center">
                <div className="relative group w-full max-w-sm">
                  <div className="relative rounded-2xl overflow-hidden border-2 border-slate-800 shadow-lg bg-[#081220] aspect-[3/4]">
                    <img
                      src={executiveData.image}
                      alt={executiveData.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081220] via-transparent to-transparent opacity-85" />
                    <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl backdrop-blur-md bg-[#081220]/90 text-slate-100 border border-slate-800 text-left shadow-lg">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-sm tracking-tight text-slate-100 flex items-center gap-1.5">
                          {executiveData.name}
                          <CheckCircle2 className="w-4 h-4 text-[#ff7e67]" />
                        </p>
                        <span className="text-[10px] bg-[#ff7e67]/15 text-[#ff7e67] border border-[#ff7e67]/30 px-2 py-0.5 rounded-full font-mono font-medium">
                          Expert Advisor
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 font-medium">
                        Economic Policy & Sustainability Transformation Expert
                      </p>
                      <p className="text-[11px] text-[#ff7e67] font-mono mt-0.5">
                        Institute for Public policy and Practice (IP3)
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4 Core Focus Transformation Tags */}
                <div className="mt-6 w-full max-w-sm grid grid-cols-2 gap-2 text-left">
                  <div className="p-2.5 rounded-xl bg-[#081220]/80 border border-slate-800 flex items-center gap-2">
                    <Leaf className="w-3.5 h-3.5 text-[#2dd4bf] shrink-0" />
                    <span className="text-[10px] font-mono font-bold text-slate-100 leading-tight">CLIMATE ACTION</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#081220]/80 border border-slate-800 flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                    <span className="text-[10px] font-mono font-bold text-slate-100 leading-tight">ESG GOVERNANCE</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#081220]/80 border border-slate-800 flex items-center gap-2">
                    <TreeDeciduous className="w-3.5 h-3.5 text-[#2dd4bf] shrink-0" />
                    <span className="text-[10px] font-mono font-bold text-slate-100 leading-tight">BIODIVERSITY</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#081220]/80 border border-slate-800 flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 text-[#ff7e67] shrink-0" />
                    <span className="text-[10px] font-mono font-bold text-slate-100 leading-tight">CIRCULAR ECONOMY</span>
                  </div>
                </div>

                {/* Direct Channel Box */}
                <div className="mt-4 w-full max-w-sm p-4 rounded-2xl border border-slate-800 text-left transition-all bg-[#081220]/70 text-slate-100 space-y-2">
                  <p className="text-[11px] uppercase font-mono tracking-wider text-slate-400 font-bold">
                    Direct Advisory Communications
                  </p>
                  
                  <div className="space-y-1.5 font-mono text-xs">
                    <a
                      href="mailto:Econpolicy&SusTransGroup@gmail.com"
                      className="text-[#ff7e67] hover:underline flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Econpolicy&SusTransGroup@gmail.com</span>
                    </a>
                    <a
                      href="tel:+88019174011329"
                      className="text-slate-400 hover:text-slate-100 flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#ff7e67]" />
                      <span>+88019174011329</span>
                    </a>
                  </div>

                  <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between font-mono">
                    <span className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-[#ff7e67]" />
                      Policy Innovation & Growth
                    </span>
                    <span className="text-slate-500">IP3 Global</span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Executive Narrative, Bio & Track Record */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="mb-4 space-y-1.5">
                    <div>
                      <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#ff7e67] uppercase">
                        EXECUTIVE LEADERSHIP PROFILE
                      </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-slate-100 font-serif">
                      Mohammad Syful Hoque
                    </h2>
                    <p className="text-xs sm:text-sm font-mono font-bold text-[#ff7e67] uppercase tracking-wider mt-1.5">
                      ECONOMIC POLICY AND SUSTAINABILITY TRANSFORMATION EXPERT
                    </p>
                  </div>

                  {/* Narrative Bio */}
                  <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-400">
                    <p>
                      Syful has <span className="text-slate-100 font-bold">17 years of experience</span> in economic policy & sustainability transformation, solving sustainability challenges in Policy & Practice. His work is characterized by deep knowledge of economic and development policy and sustainability consulting — championing the forefront of <span className="text-slate-100 font-medium">climate solutions</span>, <span className="text-slate-100 font-medium">ESG excellence</span>, and the principles of a <span className="text-slate-100 font-medium">circular economy</span> for long-term value creation.
                    </p>

                    <p>
                      He has underpinned <span className="text-[#ff7e67] font-bold">75+ high-impact projects</span> for global entities such as the <span className="text-slate-100 font-semibold">World Bank, IFC, ADB, SIDA, W.T.O., and the European Commission</span>. Esteemed for his ability to forge strategic partnerships, Syful has collaborated with over <span className="text-slate-100 font-semibold">30 international development organizations</span>, driving significant, transformative outcomes.
                    </p>

                    <div className="p-4 rounded-2xl bg-[#081220]/90 border border-slate-800 text-xs text-slate-300 italic font-serif leading-relaxed">
                      "Syful's research aims to apply rigorous economic theories and analytic tools to investigate questions of relevance to practitioners and policymakers. He is passionate about communicating complex ideas in non-technical language to a general audience."
                    </div>
                  </div>

                  {/* Multilateral Track Record Badges */}
                  <div className="mt-5 pt-4 border-t border-slate-800">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block mb-2.5 font-bold">
                      Underpinned High-Impact Projects For:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {multilateralPartners.map((org) => (
                        <span 
                          key={org}
                          className="px-3 py-1.5 rounded-xl bg-[#081220] border border-slate-800 text-xs font-mono text-slate-200 font-medium hover:border-[#ff7e67] transition-colors"
                        >
                          {org}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats Counters */}
                  <div className="grid grid-cols-3 gap-3 mt-5">
                    <div className="p-3.5 rounded-2xl bg-[#081220] border border-slate-800 text-center">
                      <div className="text-2xl sm:text-3xl font-mono font-extrabold text-[#ff7e67]">17+</div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">Years Experience</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[#081220] border border-slate-800 text-center">
                      <div className="text-2xl sm:text-3xl font-mono font-extrabold text-slate-100">75+</div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">Projects Led</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[#081220] border border-slate-800 text-center">
                      <div className="text-2xl sm:text-3xl font-mono font-extrabold text-[#2dd4bf]">30+</div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">Global Partners</div>
                    </div>
                  </div>
                </div>

                {/* Call to Action Buttons */}
                <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    onClick={onOpenTalk}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-100 bg-slate-800 hover:bg-slate-700 border border-slate-700 shadow-sm transition-all cursor-pointer font-mono"
                  >
                    <MessageSquare className="w-4 h-4 text-[#ff7e67]" />
                    <span>Let's Talk</span>
                  </button>

                  <button
                    onClick={onOpenCollaborate}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-extrabold text-slate-950 bg-[#ff7e67] hover:bg-[#ff6547] shadow-md shadow-[#ff7e67]/20 transition-all cursor-pointer font-mono"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Let's Collaborate</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
