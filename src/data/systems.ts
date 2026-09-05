import { SystemItem } from '../types';

export const SYSTEMS_DATA: SystemItem[] = [
  {
    id: 'climate-sustainability',
    name: 'Climate & Sustainability',
    shortName: 'Climate',
    row: 1,
    color: '#10B981', // Emerald green
    glowColor: 'rgba(16, 185, 129, 0.7)',
    bgGlow: 'rgba(16, 185, 129, 0.12)',
    dotClass: 'bg-emerald-400',
    borderClass: 'border-emerald-500/40',
    category: 'Biophysical Boundaries',
    summary: 'Decarbonization, planetary boundaries, natural capital valuation, and climate-resilient infrastructure.',
    coreMandate: 'Aligning macroeconomic policy and infrastructure investment with ecological limits and net-zero trajectories.',
    keyDrivers: [
      'Renewable energy transition & grid flexibility',
      'Nature-based carbon sinks & biodiversity corridors',
      'Urban climate adaptation & extreme weather resilience',
      'Global carbon border adjustment mechanisms'
    ],
    systemicRisks: [
      'Cascading climate tipping points',
      'Resource scarcity & stranded fossil assets',
      'Disproportionate displacement of vulnerable populations'
    ],
    interventions: [
      'Ecosystem service payments & sovereign green bonds',
      'Mandatory physical climate risk disclosure frameworks',
      'Cross-jurisdictional watershed & biome management'
    ],
    metrics: [
      { label: 'Global Carbon Budget Used', value: '87%', trend: 'up' },
      { label: 'Clean Energy CapEx', value: '$1.8T/yr', trend: 'up' },
      { label: 'Protected Biomes Coverage', value: '17.2%', trend: 'stable' }
    ],
    overlaps: [
      {
        targetSystemId: 'economic-transition',
        targetSystemName: 'Economic Transition',
        overlapTitle: 'Green Industrial Strategy & Stranded Assets',
        synergyDescription: 'Repurposing legacy industrial subsidies toward clean hydrogen, battery supply chains, and green steel manufacturing.',
        compoundRisk: 'Unmanaged fossil asset depreciation destabilizing regional banking balances.',
        jointIntervention: 'Just transition transition funds coupled with regional sovereign re-skilling grants.',
        sharedMetrics: ['Carbon Intensity of GDP', 'Clean Tech Job Growth']
      },
      {
        targetSystemId: 'health-social-protection',
        targetSystemName: 'Health & Social Protection',
        overlapTitle: 'Environmental Health & Thermal Safety',
        synergyDescription: 'Urban cooling corridors and clean air zones directly mitigating respiratory disease and thermal morbidity.',
        compoundRisk: 'Extreme heat waves collapsing hospital capacity and productivity simultaneously.',
        jointIntervention: 'Integrated municipal heat action plans with community cooling hubs.',
        sharedMetrics: ['Air Quality Index Correlated Hospital Admissions', 'Urban Canopy Heat Offset']
      },
      {
        targetSystemId: 'data-digital-governance',
        targetSystemName: 'Data & Digital Governance',
        overlapTitle: 'Geospatial Climate Intelligence & Carbon Ledgers',
        synergyDescription: 'High-resolution satellite telemetry verifying reforestation credits and methane leak detection.',
        compoundRisk: 'Greenwashing through unverified proprietary carbon accounting models.',
        jointIntervention: 'Open-access sovereign climate telemetry registries.',
        sharedMetrics: ['Verified Sensor Coverage', 'Real-time Emissions Detection Latency']
      },
      {
        targetSystemId: 'ai-public-systems',
        targetSystemName: 'AI for Public Systems',
        overlapTitle: 'Predictive Climate Modeling & Grid Dispatch',
        synergyDescription: 'AI-driven dynamic grid balancing for 90%+ variable renewable energy penetration.',
        compoundRisk: 'Massive energy and water footprints of hyperscale AI compute clusters.',
        jointIntervention: 'Zero-carbon compute mandates and grid-interactive data center standards.',
        sharedMetrics: ['Grid Curtailment Reduction', 'AI Data Center PUE Efficiency']
      }
    ]
  },
  {
    id: 'education-human-capital',
    name: 'Education & Human Capital',
    shortName: 'Education',
    row: 1,
    color: '#3B82F6', // Royal blue
    glowColor: 'rgba(59, 130, 246, 0.7)',
    bgGlow: 'rgba(59, 130, 246, 0.12)',
    dotClass: 'bg-blue-400',
    borderClass: 'border-blue-500/40',
    category: 'Capability Building',
    summary: 'Lifelong learning architectures, cognitive resilience, foundational literacy, and skills for modern economies.',
    coreMandate: 'Cultivating adaptable human capabilities capable of navigating exponential technological and ecological shifts.',
    keyDrivers: [
      'Adaptive AI-assisted curriculum personalization',
      'Micro-credentialing and portable vocational credits',
      'Early childhood cognitive development access',
      'Critical thinking & digital literacy in public schools'
    ],
    systemicRisks: [
      'Generational human capital erosion post-disruptions',
      'Widening digital divide in educational quality',
      'Rapid skills obsolescence caused by cognitive automation'
    ],
    interventions: [
      'Public lifelong learning entitlement accounts',
      'STEM-to-sustainability applied education tracks',
      'Universal digital infrastructure for rural schools'
    ],
    metrics: [
      { label: 'Tertiary Tech Literacy', value: '62%', trend: 'up' },
      { label: 'Workforce Re-skilling Rate', value: '28%', trend: 'stable' },
      { label: 'Early Education Enrolment', value: '79%', trend: 'up' }
    ],
    overlaps: [
      {
        targetSystemId: 'ai-public-systems',
        targetSystemName: 'AI for Public Systems',
        overlapTitle: 'Cognitive Augmentation & Pedagogical AI',
        synergyDescription: 'Deploying equitable pedagogical AI tutors to bridge teacher shortages in underserved school districts.',
        compoundRisk: 'Algorithmic bias reinforcing structural inequalities in student assessment.',
        jointIntervention: 'Open-weights educational models audited for cognitive diversity and bias.',
        sharedMetrics: ['Adaptive Learning Gain Delta', 'Socioeconomic Score Convergence']
      },
      {
        targetSystemId: 'institutional-effectiveness',
        targetSystemName: 'Institutional Effectiveness',
        overlapTitle: 'Public Sector Talent Pipeline & Civic Capacity',
        synergyDescription: 'Modernizing civil service recruitment with continuous digital and strategic foresight competencies.',
        compoundRisk: 'Brain drain of top computational talent away from vital public agencies.',
        jointIntervention: 'National digital service fellowships with fast-track executive mobility.',
        sharedMetrics: ['Civil Service Tech Retention', 'Public Digital Capability Index']
      },
      {
        targetSystemId: 'economic-transition',
        targetSystemName: 'Economic Transition',
        overlapTitle: 'Skills Supply for Decarbonized Value Chains',
        synergyDescription: 'Aligning vocational polytechnics with emerging circular economy, solar, and grid maintenance demands.',
        compoundRisk: 'Structural unemployment bottlenecks stalling large-scale green infrastructure rollouts.',
        jointIntervention: 'Tripartite industry-government apprenticeship subsidies.',
        sharedMetrics: ['Green Job Placement Velocity', 'Vocational Graduate Wage Premium']
      }
    ]
  },
  {
    id: 'health-social-protection',
    name: 'Health & Social Protection',
    shortName: 'Health',
    row: 1,
    color: '#06B6D4', // Teal/Cyan
    glowColor: 'rgba(6, 182, 212, 0.7)',
    bgGlow: 'rgba(6, 182, 212, 0.12)',
    dotClass: 'bg-teal-400',
    borderClass: 'border-teal-500/40',
    category: 'Human Resilience',
    summary: 'Universal healthcare delivery, preventive wellness, dynamic social safety nets, and demographic aging support.',
    coreMandate: 'Ensuring universal baseline security against idiosyncratic and systemic health and economic shocks.',
    keyDrivers: [
      'Preventive community primary care networks',
      'Dynamic social registries with automated benefit payouts',
      'Care economy infrastructure & elderly support services',
      'Mental health integration into universal health coverage'
    ],
    systemicRisks: [
      'Antimicrobial resistance & zoonotic pandemic spillover',
      'Fiscal stress from non-communicable disease burdens',
      'Informal economy workers falling outside safety nets'
    ],
    interventions: [
      'Parametric social cash transfers linked to climate alerts',
      'Decentralized telemedicine & diagnostic kiosks',
      'Caregiver wage subsidies and pension recognition'
    ],
    metrics: [
      { label: 'Universal Health Coverage Index', value: '74/100', trend: 'up' },
      { label: 'Social Safety Net Floor', value: '68%', trend: 'up' },
      { label: 'Preventive Healthcare Ratio', value: '31%', trend: 'stable' }
    ],
    overlaps: [
      {
        targetSystemId: 'data-digital-governance',
        targetSystemName: 'Data & Digital Governance',
        overlapTitle: 'Interoperable Health Records & Biosurveillance',
        synergyDescription: 'Federated health data architectures enabling real-time pathogen tracking without compromising patient privacy.',
        compoundRisk: 'Cyberattacks breaching national hospital records and diagnostic networks.',
        jointIntervention: 'Zero-trust architecture standards for public health infrastructure.',
        sharedMetrics: ['Federated Health Query Latency', 'Privacy Preservation Benchmark']
      },
      {
        targetSystemId: 'esg-circular-economy',
        targetSystemName: 'ESG & Circular Economy',
        overlapTitle: 'Occupational Safety & Toxic Remediation',
        synergyDescription: 'Eliminating hazardous chemical runoff and microplastics to reduce chronic immunological and endocrine disorders.',
        compoundRisk: 'Informal e-waste recycling poisoning surrounding community groundwater.',
        jointIntervention: 'Extended producer responsibility covering end-of-life health externalities.',
        sharedMetrics: ['Industrial Heavy Metal Exposure Index', 'Clean Water Access in Industrial Zones']
      }
    ]
  },
  {
    id: 'data-digital-governance',
    name: 'Data & Digital Governance',
    shortName: 'Digital Gov',
    row: 1,
    color: '#0284C7', // Sky Blue/Cyan
    glowColor: 'rgba(2, 132, 199, 0.7)',
    bgGlow: 'rgba(2, 132, 199, 0.12)',
    dotClass: 'bg-sky-400',
    borderClass: 'border-sky-500/40',
    category: 'Digital Commons',
    summary: 'Digital public infrastructure (DPI), data sovereignty, open data protocols, and citizen privacy charters.',
    coreMandate: 'Architecting inclusive, secure, and sovereign digital foundations for societal transactions and democratic agency.',
    keyDrivers: [
      'Interoperable digital identity & fast payment rails',
      'Data trusts, federated analytics, and citizen consent layers',
      'Critical infrastructure cybersecurity & resilience',
      'Open government data standards and API gateways'
    ],
    systemicRisks: [
      'Digital authoritarianism & surveillance overreach',
      'Monopolistic platform capture of public digital spaces',
      'Critical supply chain vulnerabilities in semiconductor stacks'
    ],
    interventions: [
      'Modular open-source digital public goods (DPGs)',
      'Algorithmic transparency and automated audit registers',
      'Decentralized data exchange protocols with verifiable credentials'
    ],
    metrics: [
      { label: 'DPI Adoption Population', value: '4.2B', trend: 'up' },
      { label: 'Open Data Maturity', value: '65%', trend: 'up' },
      { label: 'Cyber Threat Resilience Index', value: '81/100', trend: 'up' }
    ],
    overlaps: [
      {
        targetSystemId: 'institutional-effectiveness',
        targetSystemName: 'Institutional Effectiveness',
        overlapTitle: 'Frictionless Citizen Service Delivery',
        synergyDescription: 'Once-only principle in digital government: citizens enter documentation once for seamless multi-agency services.',
        compoundRisk: 'Digital redlining and exclusion of elderly/unconnected populations from vital services.',
        jointIntervention: 'Omnichannel service portals paired with physical assisted-access desks.',
        sharedMetrics: ['Average Transaction Time for Permits', 'Citizen Public Trust Score']
      },
      {
        targetSystemId: 'ai-public-systems',
        targetSystemName: 'AI for Public Systems',
        overlapTitle: 'Trustworthy AI & Sovereign Compute Infrastructure',
        synergyDescription: 'Establishing national compute clusters and curated public data repositories for local AI fine-tuning.',
        compoundRisk: 'Dependence on closed proprietary foreign frontier AI systems for sensitive public functions.',
        jointIntervention: 'National AI sandbox frameworks with mandatory red-teaming protocols.',
        sharedMetrics: ['Sovereign Compute Capacity (PFLOPS)', 'Open Scientific Benchmark Coverage']
      }
    ]
  },
  {
    id: 'institutional-effectiveness',
    name: 'Institutional Effectiveness',
    shortName: 'Institutions',
    row: 2,
    color: '#F97316', // Orange
    glowColor: 'rgba(249, 115, 22, 0.7)',
    bgGlow: 'rgba(249, 115, 22, 0.12)',
    dotClass: 'bg-orange-400',
    borderClass: 'border-orange-500/40',
    category: 'Governance & State Capacity',
    summary: 'Public sector agility, anti-corruption safeguards, rule of law, participatory budgeting, and strategic foresight.',
    coreMandate: 'Strengthening state capability, democratic legitimacy, and institutional trust to execute complex structural reforms.',
    keyDrivers: [
      'Evidence-based policy formulation & regulatory sandboxes',
      'Open procurement transparency & anti-graft analytics',
      'Inter-agency coordination mechanisms & silo busting',
      'Participatory democracy and deliberative citizen assemblies'
    ],
    systemicRisks: [
      'Institutional inertia & regulatory capture by special interests',
      'Erosion of public trust in democratic bodies',
      'Fragmented bureaucratic execution leading to policy failure'
    ],
    interventions: [
      'Independent fiscal councils & dynamic performance audits',
      'Citizen jury deliberation on long-term infrastructure choices',
      'Agile procurement rules allowing rapid startup experimentation'
    ],
    metrics: [
      { label: 'Public Trust in Institutions', value: '54%', trend: 'stable' },
      { label: 'Government Effectiveness Index', value: '78/100', trend: 'up' },
      { label: 'Open Procurement Ratio', value: '88%', trend: 'up' }
    ],
    overlaps: [
      {
        targetSystemId: 'economic-transition',
        targetSystemName: 'Economic Transition',
        overlapTitle: 'Strategic Industrial Policy & Anti-Monopoly Enforcement',
        synergyDescription: 'Coordinating state capital with market incentives to nurture strategic clean industries without cronyism.',
        compoundRisk: 'Regulatory capture leading to excessive market concentration and price-gouging.',
        jointIntervention: 'Performance-tied state equity stakes and competitive market design.',
        sharedMetrics: ['Market Competitiveness HHI Index', 'Public R&D Multiplier on Private CapEx']
      },
      {
        targetSystemId: 'climate-sustainability',
        targetSystemName: 'Climate & Sustainability',
        overlapTitle: 'Permitting Reform & Spatial Planning Agility',
        synergyDescription: 'Accelerating clean energy transmission siting while honoring environmental stewardship and local community consultation.',
        compoundRisk: 'Endless bureaucratic litigation causing critical grid modernization to fail.',
        jointIntervention: 'One-stop environmental impact clearinghouses with strict statutory decision windows.',
        sharedMetrics: ['Permitting Approval Cycle Time', 'Community Concurrence Rate']
      }
    ]
  },
  {
    id: 'economic-transition',
    name: 'Economic Transition',
    shortName: 'Economics',
    row: 2,
    color: '#F59E0B', // Warm Gold / Amber
    glowColor: 'rgba(245, 158, 11, 0.7)',
    bgGlow: 'rgba(245, 158, 11, 0.12)',
    dotClass: 'bg-amber-400',
    borderClass: 'border-amber-500/40',
    category: 'Macroeconomic Transformation',
    summary: 'Productive diversification, fiscal sustainability, resilient supply chains, and equitable wealth generation.',
    coreMandate: 'Restructuring industrial architecture, capital flows, and labor markets toward durable, inclusive prosperity.',
    keyDrivers: [
      'Strategic value chain onshoring and nearshoring partnerships',
      'Blended finance de-risking for frontier clean technologies',
      'Progressive taxation and wealth distribution mechanisms',
      'Small and medium enterprise (SME) productivity upgrading'
    ],
    systemicRisks: [
      'Sovereign debt overhang in emerging markets',
      'Supply chain bottlenecks in critical minerals and components',
      'Inflationary wage-price spirals during green capital shifts'
    ],
    interventions: [
      'Debt-for-nature and debt-for-climate swap instruments',
      'Strategic national mineral reserves and recycling mandates',
      'Direct capital grants for industrial heat decarbonization'
    ],
    metrics: [
      { label: 'Global Green CapEx Share', value: '34%', trend: 'up' },
      { label: 'Supply Chain Diversification', value: '59%', trend: 'up' },
      { label: 'Sovereign Debt Sustainability', value: '62/100', trend: 'down' }
    ],
    overlaps: [
      {
        targetSystemId: 'esg-circular-economy',
        targetSystemName: 'ESG & Circular Economy',
        overlapTitle: 'Circular Material Flow & Secondary Market Creation',
        synergyDescription: 'Shifting macroeconomic incentives from linear extraction (take-make-waste) to perpetual resource loops.',
        compoundRisk: 'Virgin resource dumping undercutting recycled material economics.',
        jointIntervention: 'Virgin material taxes paired with recycled content mandate quotas.',
        sharedMetrics: ['Circularity Metric (% Recycled Inputs)', 'Virgin Resource Demand Index']
      },
      {
        targetSystemId: 'health-social-protection',
        targetSystemName: 'Health & Social Protection',
        overlapTitle: 'Living Wage Standards & Social Security Solvency',
        synergyDescription: 'Higher labor productivity enabling sustainably financed universal pension systems and living wage guarantees.',
        compoundRisk: 'Informalization of the gig economy eroding national payroll tax bases.',
        jointIntervention: 'Portable benefits platforms for independent and platform workers.',
        sharedMetrics: ['Social Security Contribution Compliance', 'Real Median Wage Growth']
      }
    ]
  },
  {
    id: 'esg-circular-economy',
    name: 'ESG & Circular Economy',
    shortName: 'ESG & Circular',
    row: 2,
    color: '#10B981', // Mint/Emerald
    glowColor: 'rgba(16, 185, 129, 0.7)',
    bgGlow: 'rgba(16, 185, 129, 0.12)',
    dotClass: 'bg-emerald-400',
    borderClass: 'border-emerald-500/40',
    category: 'Resource Stewardship',
    summary: 'Material circularity, lifecycle sustainability disclosures, regenerative supply chains, and zero-waste logistics.',
    coreMandate: 'Decoupling economic value creation from virgin natural resource consumption through closed-loop loops.',
    keyDrivers: [
      'Product digital passports and material traceability systems',
      'Modular design for repairability, remanufacture, and disassembly',
      'Industrial symbiosis networks (by-product exchange hubs)',
      'Harmonized Scope 1, 2, and 3 global sustainability reporting'
    ],
    systemicRisks: [
      'Greenwashing and fragmented regulatory reporting taxonomies',
      'Downcycling of critical high-grade alloys and polymers',
      'Export of hazardous plastic waste to unregulated jurisdictions'
    ],
    interventions: [
      'Right-to-repair statutory warranties and spare part mandates',
      'Deposit return schemes and secondary raw material marketplaces',
      'Mandatory double-materiality ESG audit requirements'
    ],
    metrics: [
      { label: 'Global Material Circularity', value: '7.2%', trend: 'up' },
      { label: 'Digital Product Passport Coverage', value: '24%', trend: 'up' },
      { label: 'Corporate Scope 3 Disclosures', value: '49%', trend: 'up' }
    ],
    overlaps: [
      {
        targetSystemId: 'climate-sustainability',
        targetSystemName: 'Climate & Sustainability',
        overlapTitle: 'Embodied Carbon Abatement in Heavy Industry',
        synergyDescription: 'Using scrap metal and bio-based resins to eliminate 80%+ of manufacturing emissions in automotive and construction.',
        compoundRisk: 'Leakage of high-carbon goods into markets without carbon border adjustments.',
        jointIntervention: 'Harmonized carbon border taxes with embodied life-cycle standards.',
        sharedMetrics: ['Embodied Carbon per m² Built Area', 'Recycled Steel Utilization']
      },
      {
        targetSystemId: 'data-digital-governance',
        targetSystemName: 'Data & Digital Governance',
        overlapTitle: 'Digital Product Passports & Blockchain Provenance',
        synergyDescription: 'QR-coded digital product passports allowing recyclers to identify alloy compositions instantly at end-of-life.',
        compoundRisk: 'Counterfeiting and fraudulent eco-certifications across multi-tier suppliers.',
        jointIntervention: 'Interoperable public ledger for battery and material provenance.',
        sharedMetrics: ['Scrap Identification Accuracy', 'Supplier Traceability Audit Pass Rate']
      }
    ]
  },
  {
    id: 'ai-public-systems',
    name: 'AI for Public Systems',
    shortName: 'Public AI',
    row: 2,
    color: '#8B5CF6', // Violet/Purple
    glowColor: 'rgba(139, 92, 246, 0.7)',
    bgGlow: 'rgba(139, 92, 246, 0.12)',
    dotClass: 'bg-purple-400',
    borderClass: 'border-purple-500/40',
    category: 'Cognitive Infrastructure',
    summary: 'Autonomous public service optimization, algorithmic accountability, civic co-pilots, and safety assurance.',
    coreMandate: 'Directing artificial intelligence safely and equitably to multiply the problem-solving capacity of public institutions.',
    keyDrivers: [
      'Specialized foundational models trained on open legal & scientific corpora',
      'Continuous algorithmic bias auditing and red-teaming pipelines',
      'Automated triage for public emergency dispatch and social assistance',
      'Explainable AI standards for judicial and welfare entitlement decisions'
    ],
    systemicRisks: [
      'Hallucinatory policy advice and compounding systemic errors',
      'Monopoly vendor lock-in of national administrative cores',
      'Disinformation destabilizing public health and election integrity'
    ],
    interventions: [
      'Open-source civic foundation models with transparent weights',
      'Human-in-the-loop statutory mandates for high-stakes decisions',
      'National AI safety evaluation institutes and compute testbeds'
    ],
    metrics: [
      { label: 'Public Sector AI Deployments', value: '1,420', trend: 'up' },
      { label: 'Audited Model Compliance', value: '71%', trend: 'up' },
      { label: 'Citizen AI Query Accuracy', value: '94.6%', trend: 'up' }
    ],
    overlaps: [
      {
        targetSystemId: 'climate-sustainability',
        targetSystemName: 'Climate & Sustainability',
        overlapTitle: 'Earth Observation AI & Extreme Weather Prediction',
        synergyDescription: 'Forecasting flood and wildfire propagation 72 hours earlier with physics-informed neural operators.',
        compoundRisk: 'Critical infrastructure failure due to out-of-distribution climate shock blind spots in models.',
        jointIntervention: 'Ensemble modeling combining physical fluid dynamics with generative weather models.',
        sharedMetrics: ['Early Warning Lead Time', 'Evacuation Pre-alert Accuracy']
      },
      {
        targetSystemId: 'institutional-effectiveness',
        targetSystemName: 'Institutional Effectiveness',
        overlapTitle: 'Autonomous Bureaucratic Workflow Acceleration',
        synergyDescription: 'Condensing 6-month regulatory compliance reviews into minutes while highlighting subtle legal conflicts.',
        compoundRisk: 'Loss of human institutional memory and critical review capabilities.',
        jointIntervention: 'Dual-approval human verification protocols for all AI-drafted legislation.',
        sharedMetrics: ['Regulatory Review Velocity', 'Administrative Error Rate Reduction']
      }
    ]
  }
];
