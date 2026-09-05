/**
 * Pure data for the IP3 Policy Architecture section.
 *
 * Extracted out of Ip3PolicySection.tsx to break a circular import
 * (CMSContext -> Ip3PolicySection -> CMSContext) and, more importantly, so the
 * seed script can import the defaults in Node without pulling in React.
 * This module must stay free of React and of any browser-only API.
 */

export type SectorCategory = 'climate' | 'education' | 'governance' | 'merla' | 'feasibility';

export interface FocusArea {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  detailedBody: string;
  iconName: string;
  videoUrl?: string;
  imageUrl: string;
  keyStats: { label: string; value: string }[];
  keySolutions: string[];
  targetSDGs: string[];
  featuredProjectTitle: string;
  featuredProjectSummary: string;
  extendedProblem?: string;
  extendedMethodology?: string;
  measurableOutcomes?: { value: string; label: string; description: string }[];
}

export interface ServiceSolution {
  id: string;
  title: string;
  shortTag: string;
  iconName: string;
  description: string;
  deliverables: string[];
  methodology: string;
  caseStudyHighlight: string;
  imageUrl?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: SectorCategory;
  categoryLabel: string;
  partner: string;
  partnerLogoText?: string;
  year: string;
  location: string;
  description: string;
  keyOutcome: string;
  tags: string[];
  imageUrl: string;
  featured?: boolean;
  detailedScope?: string;
  methodology?: string;
}

// ==========================================
// 2. DATA CONSTANTS - RESEARCH FARM
// ==========================================

export const FOCUS_AREAS: FocusArea[] = [
  {
    id: 'soil-carbon-microbiome',
    title: 'Living Soil Health, Metagenomics & Deep Carbon Sequestration',
    subtitle: 'Unlocking the Subterranean Biome for Durable Carbon Mineralization and Natural Fertility',
    badge: 'Soil Metagenomics & Carbon',
    description: 'At IP3 Agriscience Research Farm, we treat soil not as an inert substrate, but as a living biological engine. Through deep core metagenomics, gas flux calorimetry, and multi-year biochar integration trials, we quantify and accelerate true biological soil carbon drawdown.',
    detailedBody: 'Our living laboratories monitor 450+ continuous subterranean sensors measuring moisture potentials, active microbial respiration, mycorrhizal fungi biomass, and nitrogen mineralization across diverse soil textures from silty clay loams to riverine alluvial terraces.',
    iconName: 'Leaf',
    videoUrl: 'https://ip3-bd.org/wp-content/uploads/2025/02/Green-Economies.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1000',
    keyStats: [
      { label: 'Carbon Sequestration', value: '3.8 t/CO2e/ha/yr Verified Flux' },
      { label: 'Microbiome Genomics', value: '16S & ITS Metagenome Profiling' },
      { label: 'Sensor Grid Depth', value: 'Continuous 1.5m Subsurface Arrays' },
    ],
    keySolutions: [
      'Multi-Year Deep Soil Carbon Flux & Gas Chamber Auditing',
      'Indigenous Mycorrhizal Inoculant Cultivation & Field Inoculation',
      'Biochar Matrix Optimization for Long-Term Nutrient Retention',
      'Subsurface Soil Salinity & Heavy Metal Remediation Trials',
      'Microbial Community Metagenomic Diversity Mapping'
    ],
    targetSDGs: ['SDG 2 Zero Hunger', 'SDG 13 Climate Action', 'SDG 15 Life on Land'],
    featuredProjectTitle: 'Multi-Decade Nitrogen Efficiency & Subsurface Soil Carbon Trial',
    featuredProjectSummary: 'Continuous longitudinal trial monitoring soil organic carbon mineralization and active root exudate dynamics under diverse rotational cover crops.'
  },
  {
    id: 'crop-phenomics-breeding',
    title: 'Climate-Resilient Crop Genomics & High-Throughput Phenomics',
    subtitle: 'Accelerating Drought-Tolerant, High-Yield Seed Innovation Across Living Testbeds',
    badge: 'Crop Genomics & Phenomics',
    description: 'We evaluate multi-line cereal, legume, and forage cultivars across 1,200 contiguous field hectares and hyper-monitored computational greenhouses. Our research isolates genetic traits responsible for deep root penetrance, heat shock tolerance, and rapid canopy photosynthesis.',
    detailedBody: 'Combining high-resolution multispectral LiDAR drone arrays with ground-based robotic rovers, our team captures non-destructive plant morphology data daily, correlating canopy temperature depression with harvest grain yield.',
    iconName: 'GraduationCap',
    videoUrl: 'https://ip3-bd.org/wp-content/uploads/2025/02/Educational-Innovation.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1000',
    keyStats: [
      { label: 'Cultivar Screening', value: '180+ Cereal & Legume Lines/Yr' },
      { label: 'Phenomics Precision', value: 'Sub-Millimeter 3D Plant Meshes' },
      { label: 'Drought Adaptation', value: '35% Water-Use Reduction' },
    ],
    keySolutions: [
      'Randomized Complete Block Design (RCBD) Cultivar Trials',
      'High-Throughput Multispectral UAV Canopy Diagnostics',
      'Root Architecture Phenotyping via Rhizotron Minirhizotrons',
      'Drought & Heat Stress Kinetic Response Testing',
      'Nutrient-Dense Heritage Grain Restoration & Selection'
    ],
    targetSDGs: ['SDG 2 Zero Hunger', 'SDG 9 Industry & Innovation', 'SDG 12 Responsible Production'],
    featuredProjectTitle: 'Next-Generation Drought-Tolerant Sorghum & Spring Wheat Trials',
    featuredProjectSummary: 'Field-scale phenotyping initiative validating low-water grain cultivars in partnership with global university genetics consortiums.'
  },
  {
    id: 'autonomous-agtech-telemetry',
    title: 'Autonomous AgTech, Robotics & Microclimate Telemetry',
    subtitle: 'Deploying Robotic Scouting, RTK Automated Machinery and Sensor-Grid Telemetry',
    badge: 'AgTech & Autonomous Systems',
    description: 'The farm serves as a premier real-world testbed for autonomous tractors, smart micro-dosing sprayers, and solar-powered edge-AI field stations. We validate technology under punishing real-world mud, dust, and variable light conditions.',
    detailedBody: 'Our mesh telemetry network links over 450 weather stations, soil capacitance probes, and optical cameras, streaming real-time agronomic data to an open API used by resident scientists and collaborating agtech startups.',
    iconName: 'ShieldCheck',
    videoUrl: 'https://ip3-bd.org/wp-content/uploads/2025/02/Future-Ready-Governance.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=1000',
    keyStats: [
      { label: 'Field IoT Coverage', value: '100% Wireless Mesh across 1,200 Ha' },
      { label: 'RTK Accuracy', value: '±2 cm GPS Boundary Guidance' },
      { label: 'Telemetry Uptime', value: '99.9% 24/7 Automated Logging' },
    ],
    keySolutions: [
      'Real-World Autonomous Ag-Machinery Verification & Safety Audits',
      'Precision Variable-Rate Fertilizer & Bio-Pesticide Micro-Dosing',
      'LoRaWAN & Cellular Field Telemetry Grid Deployment',
      'Computer Vision Edge-AI Weed & Pest Detection Systems',
      'Automated Subsurface Drip & Micro-Sprinkler Optimization'
    ],
    targetSDGs: ['SDG 9 Innovation & Infrastructure', 'SDG 12 Responsible Consumption', 'SDG 13 Climate Action'],
    featuredProjectTitle: 'Autonomous Robotic Scouting & Micro-Weeding in Row Crops',
    featuredProjectSummary: 'Continuous field validation of solar-powered agricultural robots executing targeted mechanical weed extraction with 92% chemical reduction.'
  }
];

export const SERVICES: ServiceSolution[] = [
  {
    id: 'public-policy-innovation',
    title: 'Public Policy Innovation & Action Research',
    shortTag: 'Policy & Research',
    iconName: 'Compass',
    description: 'Groundbreaking policy formulation using systems dynamics, empirical political economy analysis, and action research designed for actionable governance reform.',
    deliverables: [
      'Regulatory Impact Analysis (RIA)',
      'Political Economy Assessments',
      'Policy Whitepapers & Legislative Blueprints',
      'Stakeholder Consultation Frameworks'
    ],
    methodology: 'Iterative systems dynamics combined with rigorous field-level qualitative and quantitative data collection.',
    caseStudyHighlight: 'Formulated policy action frameworks for national digital governance and industrial ESG standards.',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'climate-action-sustainability',
    title: 'Climate Action & Sustainability Solutions',
    shortTag: 'Climate & ESG',
    iconName: 'SunMedium',
    description: 'Strategic decarbonization roadmaps, carbon accounting, climate resilience frameworks, and ESG disclosure mechanisms aligned with international standards.',
    deliverables: [
      'Corporate Decarbonization Pathways',
      'Climate Risk & Vulnerability Assessments',
      'ESG Reporting & Compliance Frameworks',
      'Green Finance & Taxonomy Verification'
    ],
    methodology: 'Life-cycle greenhouse gas assessments, climate risk modeling (TCFD), and ecological systems auditing.',
    caseStudyHighlight: 'Guided sovereign and industrial clients in developing verifiable net-zero transition roadmaps.',
    imageUrl: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'economic-feasibility-studies',
    title: 'Economic, Financial & Environmental Feasibility Studies',
    shortTag: 'Feasibility Assessment',
    iconName: 'Calculator',
    description: 'Rigorous multi-criteria project evaluation blending cost-benefit analysis, discounted cash flow modeling, and environmental impact assessments.',
    deliverables: [
      'Bankable Feasibility Studies & DPRs',
      'Discounted Cash Flow & Sensitivity Models',
      'Environmental & Social Impact Studies (ESIA)',
      'Capital Expenditure & Risk Mitigation Blueprints'
    ],
    methodology: 'Comprehensive socio-economic cost-benefit analysis (CBA), stochastic financial modeling, and environmental impact screening.',
    caseStudyHighlight: 'Assessed over $2.4B in public-private capital infrastructure and municipal modernization programs.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'merla-frameworks',
    title: 'Monitoring, Evaluation, Research, Learning & Adaptation (MERLA)',
    shortTag: 'MERLA Frameworks',
    iconName: 'Activity',
    description: 'Adaptive management frameworks integrating real-time telemetry, quantitative indicators, and counterfactual evaluation for iterative policy course correction.',
    deliverables: [
      'Real-Time Policy Evaluation Systems',
      'Experimental & Quasi-Experimental MERLA',
      'Automated KPI Telemetry Dashboards',
      'Evidence-Based Policy Feedback Loops'
    ],
    methodology: 'Theory of change mapping, quasi-experimental counterfactual evaluations, and automated telemetry dashboards.',
    caseStudyHighlight: 'Deployed across 35 nationwide social intervention and infrastructure programs with automated reporting.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'program-survey-design',
    title: 'Program & Survey Design & Management',
    shortTag: 'Survey & Field Operations',
    iconName: 'FileText',
    description: 'End-to-end design and deployment of large-scale socio-economic field surveys, institutional censuses, and automated Computer-Assisted Personal Interviewing (CAPI) systems.',
    deliverables: [
      'Statistically Stratified Survey Protocols',
      'CAPI Digital Field Data Architectures',
      'Enumerator Capacity & Quality Auditing',
      'Cleaned Longitudinal Data Products'
    ],
    methodology: 'Stratified probabilistic sampling, digital CAPI tool engineering, and real-time field data quality verification protocols.',
    caseStudyHighlight: 'Successfully surveyed over 120,000 households and 4,500 industrial enterprises with 99.4% data integrity.',
    imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=1200'
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'long-term-carbon-trial',
    title: 'Long-Term Nitrogen Efficiency & Soil Carbon Sequestration Trial (2020–2026)',
    category: 'climate',
    categoryLabel: 'Soil Carbon Science',
    partner: 'Global Soil Health Initiative & USDA-ARS Co-op',
    partnerLogoText: 'USDA / Co-op',
    year: '2020-2026',
    location: 'Research Quadrant Alpha, 1,200 Ha Farm Station',
    description: 'A 6-year continuous trial comparing zero-till cover-cropped cereal rotations against conventional baselines, utilizing continuous gas flux chambers and deep core metagenomics.',
    keyOutcome: 'Demonstrated 3.8 tons CO2e/ha/yr stable carbon sequestration with a 42% reduction in synthetic nitrogen requirements.',
    tags: ['Soil Carbon', 'Nitrogen Efficiency', 'Microbiome', 'Long-Term Trials', 'Regenerative'],
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=800',
    featured: true,
    detailedScope: 'Continuous sampling of 120 dedicated plots with permanent subsurface sensor telemetry.'
  },
  {
    id: 'sorghum-drought-phenotyping',
    title: 'High-Throughput Canopy Phenotyping for Climate-Resilient Sorghum',
    category: 'education',
    categoryLabel: 'Crop Phenomics',
    partner: 'International Dryland Crop Research Consortium',
    partnerLogoText: 'IDCRC',
    year: '2024-2025',
    location: 'Field Sector Gamma & Phenomics Glasshouse',
    description: 'Utilizing daily UAV multispectral surveys to measure NDVI, thermal canopy depression, and chlorophyll fluorescence across 180 genetic sorghum lines.',
    keyOutcome: 'Identified 4 superior drought-tolerant cultivars maintaining 88% yield under severe moisture deficit.',
    tags: ['Phenomics', 'Sorghum', 'Drought Resilience', 'UAV Multispectral', 'Genetics'],
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800',
    featured: true,
    detailedScope: 'Automated 3D plant canopy reconstruction and correlation with root depth architecture.'
  },
  {
    id: 'autonomous-robotics-trial',
    title: 'Autonomous Multi-Sensor Robotic Scouting in Organic Brassicas & Legumes',
    category: 'feasibility',
    categoryLabel: 'AgTech & Robotics',
    partner: 'TerraRobotics & Agricultural Engineering Society',
    partnerLogoText: 'TerraRobotics',
    year: '2024',
    location: 'Plot Quadrant Delta, Central Valley Station',
    description: 'Testing autonomous solar-powered field rovers equipped with edge-AI optical cameras for non-chemical weed management and microclimate sensing.',
    keyOutcome: 'Achieved 94.6% weed eradication without soil compaction and reduced chemical inputs to absolute zero.',
    tags: ['AgTech', 'Robotics', 'Edge AI', 'Zero-Chemical', 'Autonomous Scouting'],
    imageUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=800',
    featured: true,
    detailedScope: 'Continuous 500-hour endurance trials under varying moisture, mud, and dust conditions.'
  },
  {
    id: 'bio-corridor-pollinator',
    title: 'Integrated Agroforestry & Indigenous Pollinator Bio-Corridors',
    category: 'climate',
    categoryLabel: 'Bio-Circular Ecology',
    partner: 'Ecological Agriculture Alliance & Conservation Board',
    partnerLogoText: 'EcoAg Alliance',
    year: '2023-2025',
    location: 'Boundary Buffers & Riparian Zones (12 km)',
    description: 'Establishing perennial native flowering hedgerows and biochar filtration swales along agricultural waterways to restore pollinator biomass and eliminate nutrient runoff.',
    keyOutcome: 'Recorded 310% increase in native solitary bee density and zero detectable nitrate leaching in riparian buffer outflows.',
    tags: ['Biodiversity', 'Pollinators', 'Riparian Swales', 'Zero-Leach', 'Agroforestry'],
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=800',
    featured: true,
    detailedScope: 'Monitored insect population traps, water quality sensors, and soil organic matter in buffer zones.'
  }
];

