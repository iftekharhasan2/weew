export type SystemNodeId = 'institutions' | 'policy' | 'evidence' | 'technology' | 'finance' | 'core';

export interface SystemNodeInfo {
  id: SystemNodeId;
  label: string;
  category: string;
  tagline: string;
  description: string;
  extendedOverview: string;
  color: string;
  connections: SystemNodeId[];
  keyCapabilities: string[];
  metrics: {
    label: string;
    value: string;
    subtext: string;
  }[];
  caseStudyHighlight: {
    title: string;
    context: string;
    outcome: string;
  };
}

export interface WorkflowStage {
  step: string;
  subtitle: string;
  title: string;
  description: string;
  output: string;
  tools: string[];
}

export interface OverlapItem {
  id: string;
  title: string;
  source: SystemNodeId;
  target: SystemNodeId;
  architectureFocus: string;
  description: string;
  deliverables: string[];
}

export const SYSTEM_NODES: Record<SystemNodeId, SystemNodeInfo> = {
  core: {
    id: 'core',
    label: 'IP3 Core',
    category: 'System Overlaps Nexus',
    tagline: 'The Convergence of Policy, Evidence, Tech, Finance & Institutions',
    description: 'The core integrative engine where policy intelligence meets technical implementation. IP3 bridges systemic silos to convert high-level mandates into operational, resilient public and private infrastructures.',
    extendedOverview: 'Traditional consulting stops at policy recommendations or technical specifications. IP3 operates as a unified systems integrator, translating abstract legislation and economic goals into production-grade governance architectures, data pipelines, and funding mechanisms.',
    color: '#ff7e67',
    connections: ['institutions', 'policy', 'evidence', 'technology', 'finance'],
    keyCapabilities: [
      'Cross-Domain Systems Integration',
      'End-to-End Implementation Architecture',
      'Multilateral Governance Orchestration',
      'Policy-to-Execution Stress Testing',
      'Institutional Resilience Engineering'
    ],
    metrics: [
      { label: 'System Interoperability', value: '99.4%', subtext: 'Cross-pillar protocol compliance' },
      { label: 'Implementation Velocity', value: '3.4x', subtext: 'Faster from policy draft to deployment' },
      { label: 'Capital Absorption Rate', value: '92%', subtext: 'Targeted institutional capital deployment' }
    ],
    caseStudyHighlight: {
      title: 'National Inclusive Digital Economy Architecture',
      context: 'Multi-ministerial reform requiring coordinated policy, sovereign identity, and micro-finance rails.',
      outcome: 'Reduced inter-agency processing latency by 78% while onboarding 14 million citizens.'
    }
  },
  institutions: {
    id: 'institutions',
    label: 'From poly-crises to poly-solutions',
    category: 'Systemic Resolution Engine',
    tagline: 'Translating complex systemic crises into coordinated actionable architectures',
    description: 'Transforming institutional capacity, organizational structures, and regulatory mandates to execute modern complex public missions.',
    extendedOverview: 'We architect institutional operating models that eliminate bureaucratic gridlock. Through restructuring workflows, establishing change coalitions, and building sovereign digital capabilities, we prepare ministries, regulators, and civic bodies for continuous systemic adaptation.',
    color: '#ff7e67',
    connections: ['policy', 'evidence', 'core'],
    keyCapabilities: [
      'Public Sector Organizational Redesign',
      'Civil Service Digital Capability Upskilling',
      'Inter-Agency Taskforce Governance Frameworks',
      'Regulatory Authority Modernization',
      'Crisis Response Institutional Hardening'
    ],
    metrics: [
      { label: 'Agency Alignment', value: '+65%', subtext: 'Inter-ministerial coordination efficiency' },
      { label: 'Capacity Retention', value: '94%', subtext: 'Knowledge retained post-program handover' },
      { label: 'Decision Cycle Time', value: '-48%', subtext: 'Accelerated executive governance loops' }
    ],
    caseStudyHighlight: {
      title: 'Ministry of Environment & Climate Modernization',
      context: 'Restructuring regulatory oversight bodies across regional jurisdictions.',
      outcome: 'Streamlined permitting and compliance enforcement down from 18 months to 45 days with automated audit trails.'
    }
  },
  policy: {
    id: 'policy',
    label: 'Translation not theory',
    category: 'Implementation Framework',
    tagline: 'Foresight, Regulatory Design & Legislative Engineering',
    description: 'Translating political and societal priorities into precise, actionable policy frameworks engineered for real-world viability.',
    extendedOverview: 'Policy without implementation architecture remains wishful thinking. IP3 crafts policy documents that incorporate regulatory tech specs, economic impact simulations, and legal enforcement roadmaps from day one.',
    color: '#ff7e67',
    connections: ['institutions', 'technology', 'core'],
    keyCapabilities: [
      'Legislative Drafting & Regulatory Sandboxes',
      'Geopolitical & Macro-Risk Strategic Foresight',
      'Market Mechanism Design & Incentive Engineering',
      'Cross-Border Policy Harmonization',
      'Public Consultation & Consensus Synthesis'
    ],
    metrics: [
      { label: 'Policy Adherence', value: '96.8%', subtext: 'Regulatory compliance across target cohorts' },
      { label: 'Stakeholder Buy-in', value: '89%', subtext: 'Cross-party & civic sector alignment' },
      { label: 'Draft-to-Statute Time', value: '4.2mo', subtext: 'Accelerated legislative development' }
    ],
    caseStudyHighlight: {
      title: 'Cross-Border Digital Asset & Payments Sandbox',
      context: 'Harmonizing cross-border fintech licensing rules across central bank jurisdictions.',
      outcome: 'Drafted and ratified unified regulatory guidelines enabling instant multi-currency settlement.'
    }
  },
  evidence: {
    id: 'evidence',
    label: 'A convenor between worlds.',
    category: 'Neutral Convening Ecosystem',
    tagline: 'Multi-Stakeholder Alignment, Institutional Coalitions & Global South Bridges',
    description: 'Reform never belongs to a single actor. IP3 sits between governments, development partners, civil society, academia, the private sector, communities, and technology providers — aligning incentives, evidence, and delivery capacity around shared outcomes.',
    extendedOverview: 'IP3 functions as a neutral, trusted bridge across sectors, ministries, and jurisdictions. We convene working groups, policy labs, and international coalitions to overcome coordination failure and turn fractured agendas into cohesive national movements.',
    color: '#34d399',
    connections: ['institutions', 'finance', 'core'],
    keyCapabilities: [
      'Multi-Stakeholder Accord Compacts',
      'Neutral Working Group Charters',
      'Cross-Ministerial Alignment Frameworks',
      'Public-Private Coalition Engineering',
      'Evidence-to-Action Bilateral Bridges'
    ],
    metrics: [
      { label: 'Convening Depth', value: '7+ Sectors', subtext: 'Public, private, civic, multilateral' },
      { label: 'Alliance Speed', value: '45-Day', subtext: 'Coalition formulation sprints' },
      { label: 'Consensus Rate', value: '94%', subtext: 'Cross-ministerial alignment index' }
    ],
    caseStudyHighlight: {
      title: 'Tripartite National Energy Transition Coalition',
      context: 'Aligning sovereign ministries, independent power producers, and global climate funds.',
      outcome: 'Brokered 15-year clean energy transition pact unblocking $3.2B in blended capital commitments.'
    }
  },
  technology: {
    id: 'technology',
    label: 'Thinking that ships.',
    category: 'Digital Public Infrastructure',
    tagline: 'Open Protocols, Digital Identity & Sovereign Cloud Systems',
    description: 'Engineering the digital backbone for modern state capacity, interoperable public data rails, and citizen-centric services.',
    extendedOverview: 'We design and deploy open, vendor-neutral digital public infrastructure (DPI). By leveraging modular open-source protocols, secure APIs, and sovereign cloud architectures, we prevent vendor lock-in and democratize digital access.',
    color: '#ff7e67',
    connections: ['policy', 'finance', 'core'],
    keyCapabilities: [
      'Digital Public Infrastructure (DPI) Blueprinting',
      'Sovereign Identity & Verifiable Credentials',
      'Interoperable API & Data Exchange Gateways',
      'Zero-Trust Cybersecurity Architecture',
      'AI & Automated Decision System Governance'
    ],
    metrics: [
      { label: 'Uptime SLA', value: '99.99%', subtext: 'Mission-critical national rails reliability' },
      { label: 'Throughput', value: '15k TPS', subtext: 'Scalable citizen transaction processing' },
      { label: 'API Interoperability', value: '100%', subtext: 'Open standard compliance (REST/gRPC)' }
    ],
    caseStudyHighlight: {
      title: 'Unified Health Data Exchange Protocol',
      context: 'Connecting 400+ public clinics and 80 private hospital systems through an encrypted ledger.',
      outcome: 'Universal patient record access within 2 seconds with cryptographic citizen consent verification.'
    }
  },
  finance: {
    id: 'finance',
    label: 'Thinking that ships.',
    category: 'Capital Orchestration',
    tagline: 'Blended Finance, Green Transition & Public Investment Strategy',
    description: 'Structuring innovative financing vehicles, catalytic public-private partnerships, and ESG-aligned capital pipelines.',
    extendedOverview: 'Capital allocation must match long-term systemic impact. We structure blended finance facilities, green transition bonds, and performance-based procurement models that derisk private institutional capital for public good.',
    color: '#ff7e67',
    connections: ['evidence', 'technology', 'core'],
    keyCapabilities: [
      'Blended Finance & Risk-Mitigation Facilities',
      'Sovereign Green Bond & Sukuk Structuring',
      'Results-Based & Outcomes-Linked Financing',
      'Public-Private Partnership (PPP) Feasibility',
      'Multilateral Development Bank (MDB) Co-Financing'
    ],
    metrics: [
      { label: 'Capital Mobilized', value: '$8.4B+', subtext: 'Private & institutional capital unlocked' },
      { label: 'Leverage Ratio', value: '1:5.8', subtext: 'Private dollars per public dollar committed' },
      { label: 'ESG Compliance', value: 'AAA', subtext: 'Certified Green Taxonomy alignment' }
    ],
    caseStudyHighlight: {
      title: 'Decarbonization Blended Capital Facility',
      context: 'Financing the conversion of 5,000 public municipal transit vehicles to clean battery electric.',
      outcome: 'Secured $620M in commercial syndicated debt backed by a $110M sovereign climate guarantee.'
    }
  }
};

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    step: '01',
    subtitle: 'DIAGNOSTIC & STRATEGIC FORESIGHT',
    title: 'System Boundary Mapping & Root Cause Discovery',
    description: 'We deploy econometric simulations, stakeholder network graph analysis, and legislative audit frameworks to map hidden institutional friction points and structural market failures.',
    output: 'Systemic Diagnostic Dossier & Macro Policy Sandbox Blueprint',
    tools: ['Spatial Econometrics', 'Agent-Based Policy Modeling', 'Statutory Gap Analysis', 'Institutional Risk Topology']
  },
  {
    step: '02',
    subtitle: 'REGULATORY & INSTITUTIONAL DESIGN',
    title: 'Statutory Drafting, Mandate Engineering & Governance Architecture',
    description: 'We draft statutory instruments, ministerial operational charters, and inter-agency coordination protocols with integrated compliance validation mechanisms.',
    output: 'Enactable Statutory Frameworks & Executive Delivery Mandates',
    tools: ['Regulatory Sandbox Rulebooks', 'Inter-Ministerial RACI Matrices', 'Compliance API Schemas', 'Public Deliberation Protocols']
  },
  {
    step: '03',
    subtitle: 'TECHNICAL & CAPITAL SPECIFICATION',
    title: 'Digital Public Infrastructure (DPI) & Blended Finance Structuring',
    description: 'We convert ratified policy mandates into technical API schemas, open data exchange rails, and de-risked capital mobilization facilities in partnership with development finance institutions.',
    output: 'Production-Ready Technical Specifications & Syndicated Financing Vehicles',
    tools: ['OpenAPI & Verifiable Credentials Specs', 'Blended Guarantee Mechanism Models', 'Procurement Tender Architecture', 'Security & Zero-Trust Audits']
  },
  {
    step: '04',
    subtitle: 'EXECUTION & MERLA TELEMETRY',
    title: 'Continuous Delivery, Telemetry Dashboards & Iterative Scaling',
    description: 'We embed multidisciplinary implementation units within government bodies to oversee pilot deployment, live sensor data aggregation, and real-time policy impact adaptation.',
    output: 'Live National Policy Telemetry Dashboard & Long-Term Sovereign Handover Protocol',
    tools: ['Real-Time Epidemiological/Economic Dashboards', 'Longitudinal Impact Regressions', 'Institutional Knowledge Handover Protocols', 'Sovereign DevSecOps Rails']
  }
];

export const OVERLAP_MATRIX: OverlapItem[] = [
  {
    id: 'dpi-finance',
    title: 'Digital Public Infrastructure × Blended Capital (FinTech DPI)',
    source: 'technology',
    target: 'finance',
    architectureFocus: 'Scalable Micro-Financing & Sovereign Rails',
    description: 'Deploying open-source verifiable identity protocols linked with automated micro-credit de-risking facilities to onboard unbanked micro-enterprises.',
    deliverables: [
      'Interoperable Instant Payment Gateway (UPI-equivalent)',
      'Automated Credit Scoring on Open Telemetry Data',
      'Multilateral First-Loss Guarantee Smart Contracts'
    ]
  },
  {
    id: 'policy-institutions',
    title: 'Statutory Design × Institutional Modernization (State Capacity)',
    source: 'policy',
    target: 'institutions',
    architectureFocus: 'Agile Public Administration Frameworks',
    description: 'Drafting agile regulatory sandboxes coupled with dedicated executive delivery units (EDUs) to accelerate bureaucratic reform without political deadlock.',
    deliverables: [
      'Cross-Ministerial Delivery Unit Charters',
      'Performance-Linked Civil Service KPI Matrices',
      'Fast-Track Regulatory Sandbox Protocols'
    ]
  },
  {
    id: 'evidence-finance',
    title: 'Spatial Econometrics × Climate Transition Finance (Green Bonds)',
    source: 'evidence',
    target: 'finance',
    architectureFocus: 'Empirical Decarbonization Underwriting',
    description: 'Structuring sovereign green bonds verified by real-time satellite remote sensing telemetry and parametric climate impact triggers.',
    deliverables: [
      'Satellite-Ground Truth Automated ESG Audits',
      'Parametric Disaster Relief Bond Triggers',
      'Blended MDB Capital De-risking Facility'
    ]
  },
  {
    id: 'tech-evidence',
    title: 'Open Data Rails × Longitudinal Telemetry (MERLA Engine)',
    source: 'technology',
    target: 'evidence',
    architectureFocus: 'Real-Time Evidence-Based Governance',
    description: 'Constructing unified health and educational data exchange pipelines that feed automated machine-learning causal impact evaluators.',
    deliverables: [
      'Zero-Trust Data Interoperability Exchange',
      'Automated Econometric Causal Inference Pipeline',
      'National Executive Decision Support Dashboard'
    ]
  }
];
