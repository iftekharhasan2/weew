import React, { useState, useEffect } from 'react';
import { Users, Filter, Search, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { TeamMember } from '../types';
import { TeamCard } from './TeamCard';
import { useCMS } from '../context/CMSContext';

const SAMPLE_TEAM: TeamMember[] = [
  {
    id: 'm-1',
    name: 'Dr. Elena Rostova',
    role: 'Senior Director of Policy Strategy',
    division: 'Advisory & Strategy',
    expertise: ['Multilateral Governance', 'IP3 Policy Frameworks', 'Sovereign AI Ethics'],
    education: ['Ph.D. International Relations, Oxford University', 'M.Sc. Public Policy, LSE'],
    bio: 'Pioneered systemic frameworks for international data diplomacy and AI governance across OECD nations. Directs strategic advisory for multilateral bodies.',
    projects: ['Global AI Ethics Protocol', 'IP3 Institutional Blueprint'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'e.rostova@institution.org',
      web: 'https://institution.org'
    },
    stats: {
      experienceYears: 18,
      projectsLed: 34,
      publications: 22
    }
  },
  {
    id: 'm-2',
    name: 'Marcus Vance',
    role: 'Chief Policy Researcher',
    division: 'Research & Analysis',
    expertise: ['Action Research', 'Socio-Technical Modeling', 'Algorithmic Auditing'],
    education: ['Ph.D. Computational Social Science, MIT', 'B.S. Mathematics, Stanford'],
    bio: 'Lead architect behind empirical validation models for large-scale institutional transformation. Specializes in predictive policy simulation.',
    projects: ['Socio-Technical Risk Index', 'Public Sector AI Sandbox'],
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'm.vance@institution.org'
    },
    stats: {
      experienceYears: 14,
      projectsLed: 28,
      publications: 19
    }
  },
  {
    id: 'm-3',
    name: 'Aisha Al-Hassan',
    role: 'Head of Public Health & Equity',
    division: 'Public Health & Social',
    expertise: ['Epidemiological Governance', 'Health Data Equity', 'Community Resilience'],
    education: ['M.D. / MPH, Johns Hopkins University', 'B.S. Bioethics, Yale'],
    bio: 'Dedicated to deploying equitable health systems and community-centered policy frameworks across developing and transitioning economies.',
    projects: ['Global Health Equity Tracker', 'Bio-Resilience Directive'],
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800',
    socials: {
      linkedin: 'https://linkedin.com',
      email: 'a.alhassan@institution.org',
      web: 'https://institution.org'
    },
    stats: {
      experienceYears: 16,
      projectsLed: 42,
      publications: 31
    }
  },
  {
    id: 'm-4',
    name: 'David Chen',
    role: 'Director of Tech Operations',
    division: 'Operations & Tech',
    expertise: ['Secure Cloud Architecture', 'Zero-Trust Networks', 'Distributed Systems'],
    education: ['M.S. Computer Science, UC Berkeley', 'B.S. Software Engineering, CMU'],
    bio: 'Oversees technical architecture and high-assurance compute environments for secure policy simulation and real-time data streaming.',
    projects: ['Federated Policy Engine', 'Quantum-Safe Data Pipeline'],
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'd.chen@institution.org'
    },
    stats: {
      experienceYears: 15,
      projectsLed: 50,
      publications: 11
    }
  },
  {
    id: 'm-5',
    name: 'Sophia Sterling',
    role: 'Senior Institutional Advisor',
    division: 'Advisory & Strategy',
    expertise: ['Public-Private Partnerships', 'Regulatory Compliance', 'Strategic Foresight'],
    education: ['J.D. Harvard Law School', 'M.P.A. Harvard Kennedy School'],
    bio: 'Advises cabinet-level ministers and corporate executive boards on regulatory alignment for emerging computational capabilities.',
    projects: ['Transatlantic Data Pact', 'National AI Strategy Framework'],
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800',
    socials: {
      linkedin: 'https://linkedin.com',
      email: 's.sterling@institution.org'
    },
    stats: {
      experienceYears: 20,
      projectsLed: 39,
      publications: 15
    }
  },
  {
    id: 'm-6',
    name: 'Dr. Tariq Mahmood',
    role: 'Lead Data & Analytics Scientist',
    division: 'Research & Analysis',
    expertise: ['Machine Learning Systems', 'Causal Inference', 'Econometric Modeling'],
    education: ['Ph.D. Statistics, Columbia University', 'M.S. Applied Math, ETH Zurich'],
    bio: 'Develops mathematical models evaluating societal impacts of algorithmic decisioning in public administration.',
    projects: ['Algorithmic Fairness Benchmark', 'Macro-Economic Simulator'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 't.mahmood@institution.org'
    },
    stats: {
      experienceYears: 12,
      projectsLed: 24,
      publications: 27
    }
  },
  {
    id: 'm-7',
    name: 'Dr. Miriam Osei',
    role: 'Lead Sovereign Debt Strategist',
    division: 'Advisory & Strategy',
    expertise: ['Sovereign Debt Structuring', 'Fiscal Governance', 'Brady Bond Mechanics'],
    education: ['Ph.D. Economics, Cambridge University', 'M.Phil Development Studies, Sussex'],
    bio: 'Advises finance ministries across sub-Saharan Africa and Southeast Asia on debt restructuring and sustainability frameworks.',
    projects: ['Sovereign Debt Restructuring Accord', 'Green Bond Verification Suite'],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    socials: {
      linkedin: 'https://linkedin.com',
      email: 'm.osei@institution.org'
    },
    stats: {
      experienceYears: 17,
      projectsLed: 31,
      publications: 20
    }
  },
  {
    id: 'm-8',
    name: 'Carlos Mendez',
    role: 'Chief Architect of DPI Systems',
    division: 'Operations & Tech',
    expertise: ['Digital Public Infrastructure', 'Open Identity Protocols', 'Interoperable Rails'],
    education: ['M.Eng Software Systems, Cornell', 'B.S. Computer Engineering, UNAM'],
    bio: 'Specialist in national digital ID, public payments switches, and sovereign data exchange architecture with zero vendor lock-in.',
    projects: ['National Interoperable Switch', 'Consensual Data Exchange Stack'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'c.mendez@institution.org'
    },
    stats: {
      experienceYears: 13,
      projectsLed: 45,
      publications: 9
    }
  },
  {
    id: 'm-9',
    name: 'Helena Lindqvist',
    role: 'Director of Climate Transition',
    division: 'Research & Analysis',
    expertise: ['Blended Climate Finance', 'Article 6 Carbon Governance', 'Loss & Damage Facilities'],
    education: ['M.Sc. Environmental Economics, Stockholm School of Economics'],
    bio: 'Structures sovereign climate funds and carbon market mechanisms for vulnerable delta and coastal economies.',
    projects: ['Delta Resilience Facility', 'Sovereign Carbon Integrity Index'],
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
    socials: {
      linkedin: 'https://linkedin.com',
      email: 'h.lindqvist@institution.org'
    },
    stats: {
      experienceYears: 15,
      projectsLed: 37,
      publications: 18
    }
  },
  {
    id: 'm-10',
    name: 'Dr. Junichi Tanaka',
    role: 'Senior Governance Fellow',
    division: 'Advisory & Strategy',
    expertise: ['Cabinet Delivery Units', 'Institutional Performance', 'Administrative Law'],
    education: ['Ph.D. Public Administration, University of Tokyo', 'LL.M. Harvard Law School'],
    bio: 'Designs Prime Minister and Presidential delivery unit mechanisms to break ministerial silos and drive urgent national mandates.',
    projects: ['Executive Delivery Unit Protocol', 'Cross-Ministerial Key Performance Framework'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800',
    socials: {
      linkedin: 'https://linkedin.com',
      email: 'j.tanaka@institution.org'
    },
    stats: {
      experienceYears: 22,
      projectsLed: 53,
      publications: 35
    }
  },
  {
    id: 'm-11',
    name: 'Fatima Zahra',
    role: 'Head of Social Protection Architecture',
    division: 'Public Health & Social',
    expertise: ['Cash Transfer Systems', 'Dynamic Social Registries', 'Vulnerability Indexing'],
    education: ['M.P.P. Georgetown University', 'B.A. Economics, Mohammed V University'],
    bio: 'Designs end-to-end shock-responsive social protection safety nets with biometric registry and mobile wallet integration.',
    projects: ['Adaptive Social Safety Net', 'Urban Vulnerability Mapping'],
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=800',
    socials: {
      linkedin: 'https://linkedin.com',
      email: 'f.zahra@institution.org'
    },
    stats: {
      experienceYears: 11,
      projectsLed: 29,
      publications: 14
    }
  },
  {
    id: 'm-12',
    name: 'Vikramaditya Rao',
    role: 'Senior Quantitative Systems Engineer',
    division: 'Operations & Tech',
    expertise: ['Agent-Based Simulation', 'High-Performance Computing', 'Macro Econometrics'],
    education: ['Ph.D. Operations Research, IIT Bombay', 'M.S. Computer Science, Georgia Tech'],
    bio: 'Builds stochastic simulation engines for stress-testing sovereign fiscal budgets and supply chain interruptions.',
    projects: ['Sovereign Macro Simulator', 'Tariff Shock Analysis Tool'],
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'v.rao@institution.org'
    },
    stats: {
      experienceYears: 14,
      projectsLed: 33,
      publications: 21
    }
  },
  {
    id: 'm-13',
    name: 'Claire Beauchamp',
    role: 'Principal Evaluator & MERLA Lead',
    division: 'Research & Analysis',
    expertise: ['Real-Time Policy Evaluation', 'Counterfactual Analysis', 'MERLA Architecture'],
    education: ['Ph.D. Applied Economics, Sciences Po Paris'],
    bio: 'Leads randomized and quasi-experimental evaluation loops for sovereign reform programs to guarantee empirical traceability.',
    projects: ['Public Sector Performance MERLA', 'Evidence-Based Reform Index'],
    image: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80&w=800',
    socials: {
      linkedin: 'https://linkedin.com',
      email: 'c.beauchamp@institution.org'
    },
    stats: {
      experienceYears: 16,
      projectsLed: 40,
      publications: 26
    }
  },
  {
    id: 'm-14',
    name: 'Kofi Mensah',
    role: 'Director of Blended Capital Structuring',
    division: 'Advisory & Strategy',
    expertise: ['Concessional Co-Investment', 'Guarantees & First-Loss Tranches', 'DFI Engagement'],
    education: ['M.B.A. INSEAD', 'B.Sc. Banking & Finance, University of Ghana'],
    bio: 'Structures multi-million dollar blended capital vehicles blending sovereign grant funding, multilateral loans, and private equity.',
    projects: ['National Infrastructure Blended Fund', 'Sovereign Guarantee Framework'],
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=800',
    socials: {
      linkedin: 'https://linkedin.com',
      email: 'k.mensah@institution.org'
    },
    stats: {
      experienceYears: 19,
      projectsLed: 46,
      publications: 12
    }
  },
  {
    id: 'm-15',
    name: 'Dr. Anya Petrova',
    role: 'Principal Epidemiologist',
    division: 'Public Health & Social',
    expertise: ['Syndromic Surveillance', 'Health System Resiliency', 'Vaccine Logistics'],
    education: ['Ph.D. Epidemiology, Karolinska Institute', 'M.D. Moscow State Medical'],
    bio: 'Architect of early-warning disease surveillance networks and cold-chain distribution models for low-resource environments.',
    projects: ['National Biosurveillance Mesh', 'Pandemic Surge Protocols'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
    socials: {
      linkedin: 'https://linkedin.com',
      email: 'a.petrova@institution.org'
    },
    stats: {
      experienceYears: 15,
      projectsLed: 38,
      publications: 29
    }
  }
];

const DIVISIONS = [
  'All Divisions',
  'Advisory & Strategy',
  'Research & Analysis',
  'Public Health & Social',
  'Operations & Tech'
] as const;

// 5 columns x 2 rows = exactly 10 items per page
const ITEMS_PER_PAGE = 10;

export const TeamSection: React.FC = () => {
  const { data } = useCMS();
  const teamList = data.teamMembers && data.teamMembers.length >= 6 ? data.teamMembers : SAMPLE_TEAM;
  
  const [selectedDivision, setSelectedDivision] = useState<string>('All Divisions');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter members based on selected division and search query
  const filteredMembers = teamList.filter((member) => {
    const matchesDivision = selectedDivision === 'All Divisions' || member.division === selectedDivision;
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.expertise.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDivision && matchesSearch;
  });

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDivision, searchQuery]);

  const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentMembers = filteredMembers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const teamSection = document.getElementById('team');
      if (teamSection) {
        teamSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section id="team" className="w-full py-16 sm:py-20 bg-[#050a12] text-slate-100 relative overflow-hidden border-t border-slate-800 font-sans">
      {/* Subtle Background Lighting Effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#ff7e67]/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#2dd4bf]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff7e67]/10 border border-[#ff7e67]/30 text-[#ff7e67] text-xs font-mono font-bold uppercase tracking-widest shadow-xs">
            <Users className="w-3.5 h-3.5" />
            <span>Institutional Leadership & Specialists</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight font-serif">
            Expert Advisory & Practice <span className="text-[#ff7e67] italic">Faculty</span>
          </h2>
          
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            Distinguished sovereign architects, computational researchers, and technical strategists shaping high-assurance public frameworks. Click any card to inspect full dossiers.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
          
          {/* Division Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {DIVISIONS.map((division) => (
              <button
                key={division}
                onClick={() => setSelectedDivision(division)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer font-mono ${
                  selectedDivision === division
                    ? 'bg-[#ff7e67] text-slate-950 font-bold shadow-md shadow-[#ff7e67]/20 border border-[#ff7e67]'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-100 hover:bg-slate-800 border border-slate-700'
                }`}
              >
                {division}
              </button>
            ))}
          </div>

          {/* Search Bar & Result Counter */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search faculty by name..."
                className="w-full bg-[#081220] border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#ff7e67] transition-all shadow-xs font-mono"
              />
            </div>
            <span className="text-[11px] font-mono text-slate-400 shrink-0 hidden sm:inline">
              {filteredMembers.length} Profiles
            </span>
          </div>
        </div>

        {/* 5 Columns x 2 Rows Grid Container */}
        {currentMembers.length > 0 ? (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
              {currentMembers.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>

            {/* Multi-Page Pagination Bar */}
            {totalPages > 1 && (
              <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs font-mono text-slate-400">
                  Showing <span className="text-slate-100 font-bold">{startIndex + 1}</span>–<span className="text-slate-100 font-bold">{Math.min(startIndex + ITEMS_PER_PAGE, filteredMembers.length)}</span> of <span className="text-[#ff7e67] font-bold">{filteredMembers.length}</span> Faculty Members (Page {currentPage} of {totalPages})
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Previous Page Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 hover:bg-[#ff7e67] hover:text-slate-950 hover:border-[#ff7e67] disabled:opacity-30 disabled:hover:bg-slate-800 disabled:hover:text-slate-100 disabled:hover:border-slate-700 transition-all cursor-pointer disabled:cursor-not-allowed flex items-center justify-center"
                    title="Previous Page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Page Number Buttons */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-8 h-8 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center ${
                        currentPage === pageNum
                          ? 'bg-[#ff7e67] text-slate-950 border border-[#ff7e67] shadow-md shadow-[#ff7e67]/20 scale-105'
                          : 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-100 hover:bg-slate-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  {/* Next Page Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 hover:bg-[#ff7e67] hover:text-slate-950 hover:border-[#ff7e67] disabled:opacity-30 disabled:hover:bg-slate-800 disabled:hover:text-slate-100 disabled:hover:border-slate-700 transition-all cursor-pointer disabled:cursor-not-allowed flex items-center justify-center"
                    title="Next Page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#081220] rounded-2xl border border-slate-800 p-8">
            <Filter className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-100 mb-1">No Team Members Found</h3>
            <p className="text-xs text-slate-400">Try adjusting your division filter or search terms.</p>
          </div>
        )}

      </div>
    </section>
  );
};
