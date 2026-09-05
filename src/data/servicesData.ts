export interface ServiceSubPage {
  id: string;
  slug: string;
  badge: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  summary: string;
  heroImage: string;
  accentColor: string;
  stats: Array<{ label: string; value: string; detail: string }>;
  keyCapabilities: Array<{
    title: string;
    description: string;
    deliverables: string[];
    tag: string;
  }>;
  methodologySteps: Array<{
    step: string;
    title: string;
    description: string;
  }>;
  featuredCaseStudy: {
    client: string;
    region: string;
    challenge: string;
    intervention: string;
    results: string[];
    quote?: string;
    quoteAuthor?: string;
  };
  artifacts: Array<{
    title: string;
    format: string;
    description: string;
  }>;
}

export const SERVICES_SUB_PAGES: ServiceSubPage[] = [
  {
    id: 'macro-policy',
    slug: 'macro-policy-advisory',
    badge: 'PRACTICE 01',
    tabLabel: 'Macro & Sector Policy',
    title: 'Macroeconomic & Sector Policy Advisory',
    subtitle: 'Evidence-Grounded Sovereign Frameworks, Trade Strategy & Structural Reforms',
    summary:
      'We guide finance ministries, central banking authorities, and multilateral lenders through high-stakes fiscal restructuring, industrial policy formulation, and bilateral trade competitiveness modeling using empirical DSGE and micro-simulation frameworks.',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    accentColor: '#ff7e67',
    stats: [
      { value: '$4.8B+', label: 'Sovereign Portfolios Advised', detail: 'Across 14 emerging and middle-income finance ministries' },
      { value: '18+', label: 'National Industrial Roadmaps', detail: 'Endorsed by cabinet-level economic planning commissions' },
      { value: '99.2%', label: 'DSGE Model Calibration Accuracy', detail: 'Benchmarked against post-shock empirical central bank data' },
    ],
    keyCapabilities: [
      {
        title: 'Fiscal Modeling & Medium-Term Expenditure Frameworks (MTEF)',
        description: 'Dynamic stochastic general equilibrium (DSGE) and microsimulation modeling to assess revenue elasticity, subsidy rationalization, and debt sustainability.',
        deliverables: ['Custom Dynamic DSGE Model Suites', 'Sovereign Debt Sustainability Audits', 'Fiscal Consolidation Blueprints'],
        tag: 'Econometrics & Fiscal Systems',
      },
      {
        title: 'Industrial Strategy & Export Competitiveness Architecture',
        description: 'Value-chain diagnostics and tariff optimization models designed to accelerate domestic value addition and attract foreign direct investment.',
        deliverables: ['Export Basket Diversification Roadmaps', 'Special Economic Zone (SEZ) Regulatory Charters', 'Trade Elasticity Reports'],
        tag: 'Trade & Industrial Policy',
      },
      {
        title: 'Regulatory Impact Assessments (RIA) & Antitrust',
        description: 'Quantifying market power, pro-competitive regulatory barriers, and consumer welfare implications across utilities, telecoms, and financial services.',
        deliverables: ['Statutory RIA Briefings for Parliaments', 'Market Concentration Indices', 'Merger Welfare Simulations'],
        tag: 'Market Regulation',
      },
    ],
    methodologySteps: [
      { step: '01', title: 'Empirical Baseline & Diagnostic Calibration', description: 'Integrating national accounts, customs transaction logs, and household surveys into custom macroeconomic baselines.' },
      { step: '02', title: 'Scenario Stress-Testing & Shock Modeling', description: 'Simulating commodity volatility, currency devaluation, interest rate shocks, and global tariff adjustments.' },
      { step: '03', title: 'Policy Instrument Harmonization', description: 'Synthesizing legislative drafts, executive decrees, and ministerial implementation guidelines.' },
      { step: '04', title: 'Institutional Handover & Model Transfer', description: 'Training civil service economists and establishing automated continuous monitoring dashboards.' },
    ],
    featuredCaseStudy: {
      client: 'Ministry of Finance & Planning',
      region: 'Southeast Asia & Pacific Rim',
      challenge: 'Rapid fiscal deficit expansion following supply-chain disruption and currency depreciation, requiring a credible 5-year consolidation path without stifling capital expenditures.',
      intervention: 'Engineered a multi-sector structural reform model that identified $1.2B in inefficient fuel subsidies while establishing targeted cash transfers for the bottom 40% income deciles.',
      results: [
        'Reduced structural deficit by 2.4 percentage points over 36 months',
        'Preserved 94% of planned infrastructure and public health capital outlays',
        'Upgraded sovereign credit outlook to Positive by leading rating agencies',
      ],
      quote: 'IP3 provided the empirical rigor and political feasibility modeling needed to steer our cabinet through historic fiscal realignment.',
      quoteAuthor: 'Former Permanent Secretary of Treasury',
    },
    artifacts: [
      { title: 'Sovereign Debt Sustainability Whitepaper', format: 'PDF (Analytical Brief)', description: 'Macro-fiscal sensitivity framework under volatile global capital markets.' },
      { title: 'Dynamic Macroeconomic Forecasting Engine', format: 'R / Python / Stata Package', description: 'Institutional econometric modeling suite calibrated to national accounts.' },
      { title: 'Industrial Tariff Restructuring Dossier', format: 'Executive Memo', description: 'Bilateral trade negotiation positions with scenario sensitivity curves.' },
    ],
  },
  {
    id: 'merla',
    slug: 'merla-monitoring-evaluation',
    badge: 'PRACTICE 02',
    tabLabel: 'MERLA & Analytics',
    title: 'MERLA: Monitoring, Evaluation, Research, Learning & Adapting',
    subtitle: 'Quasi-Experimental Impact Evaluations, Real-Time Telemetry & Adaptive Loops',
    summary:
      'We design and deploy rigorous empirical monitoring and evaluation frameworks that transform international development initiatives into adaptive, data-driven systems capable of rapid pivot and verified causal attribution.',
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    accentColor: '#2dd4bf',
    stats: [
      { value: '450+', label: 'Active Telemetry Indicators', detail: 'Real-time monitoring across 64 administrative districts' },
      { value: '120+', label: 'Peer-Reviewed Impact Evaluations', detail: 'Published with World Bank, ADB, and bilateral donors' },
      { value: '98.4%', label: 'Empirical Data Verification Rate', detail: 'Triple-audited via geospatial and high-frequency algorithms' },
    ],
    keyCapabilities: [
      {
        title: 'Quasi-Experimental & Counterfactual Impact Evaluations',
        description: 'Randomized Controlled Trials (RCTs), Difference-in-Differences (DiD), and Propensity Score Matching to isolate true programmatic causality.',
        deliverables: ['Pre-Analysis Plans & Registration', 'Midline/Endline Impact Reports', 'Cost-Effectiveness & ROI Audits'],
        tag: 'Causal Inference',
      },
      {
        title: 'Real-Time Telemetry & Cloud Indicator Pipelines',
        description: 'Automated ingestion pipelines connecting field tablets directly to executive analytics dashboards with anomaly detection algorithms.',
        deliverables: ['Live Cloud MERLA Portals', 'Automated Indicator Alert Webhooks', 'Spatial GIS Geo-Mapping Layers'],
        tag: 'Telemetry Infrastructure',
      },
      {
        title: 'Adaptive Management & Rapid Feedback Sprints',
        description: 'Quarterly learning loops and pause-and-reflect frameworks to recalibrate program allocation based on real-time evidence.',
        deliverables: ['Quarterly Adaptive Learning Logs', 'Theory of Change Pivot Matrix', 'Implementation Fidelity Benchmarks'],
        tag: 'Adaptive Governance',
      },
    ],
    methodologySteps: [
      { step: '01', title: 'Theory of Change & Indicator Taxonomy', description: 'Mapping causal pathways, identifying transmission channels, and defining measurable, high-signal KPIs.' },
      { step: '02', title: 'Experimental & Sampling Architecture', description: 'Designing statistically powered sample allocations with robust treatment and control stratifications.' },
      { step: '03', title: 'Continuous Real-Time Data Ingestion', description: 'Deploying high-frequency data audits and spatial checks to guarantee zero data drift in field reporting.' },
      { step: '04', title: 'Causal Attribution & Policy Synthesis', description: 'Executing econometric estimation and delivering actionable, board-ready governance recommendations.' },
    ],
    featuredCaseStudy: {
      client: 'Multilateral Climate Resilience Facility',
      region: 'South Asia & Coastal Deltas',
      challenge: 'Evaluating the true adaptive capacity gains of a $180M coastal flood infrastructure program across 2,400 vulnerable rural communities.',
      intervention: 'Constructed a quasi-experimental Synthetic Control framework combining satellite SAR flood imagery, ground telemetry sensors, and 12,000 household panel surveys.',
      results: [
        'Established causal proof of 42% reduction in household post-disaster recovery duration',
        'Identified 6 bottleneck sub-districts requiring immediate infrastructure reinforcement',
        'Facilitated unlocked $85M in additional concessional climate financing',
      ],
      quote: 'IP3’s MERLA architecture provided our board with undeniable causal proof and the live telemetry needed to direct emergency funding.',
      quoteAuthor: 'Chief Evaluation Officer, Multilateral Climate Fund',
    },
    artifacts: [
      { title: 'Comprehensive MERLA Framework Blueprint', format: 'Standard Operating Protocol', description: 'Complete indicator dictionary, reporting frequencies, and verification protocols.' },
      { title: 'Interactive Multi-Tiered Telemetry Dashboard', format: 'Web App / PowerBI / Tableau', description: 'Live district-level disaggregated analytics with geospatial layers.' },
      { title: 'Causal Impact Evaluation Final Monograph', format: 'Academic / Policy Report', description: 'Peer-reviewed econometric methodology and policy translation memo.' },
    ],
  },
  {
    id: 'capi-surveys',
    slug: 'capi-field-surveys',
    badge: 'PRACTICE 03',
    tabLabel: 'CAPI & Field Surveys',
    title: 'CAPI & Large-Scale Field Survey Architecture',
    subtitle: 'High-Velocity Computer-Assisted Field Enumeration & Geospatial Verification',
    summary:
      'We engineer industrial-scale field enumeration systems utilizing Computer-Assisted Personal Interviewing (CAPI), multi-stage stratified cluster sampling, biometric auditing, and offline-first mobile survey engines for rigorous primary data collection.',
    heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200',
    accentColor: '#38bdf8',
    stats: [
      { value: '250K+', label: 'Household Interviews Conducted', detail: 'Across remote rural, urban informal, and conflict-affected zones' },
      { value: '< 0.15%', label: 'Field Data Error Tolerance', detail: 'Maintained via automated nightly validation scripts' },
      { value: '1,200+', label: 'Trained & Certified Enumerators', detail: 'Managed through standardized biometric quality protocols' },
    ],
    keyCapabilities: [
      {
        title: 'CAPI Script Architecture & Logic Validation',
        description: 'Building ultra-robust survey instruments in SurveyCTO, ODK, and CommCare with multi-level roster checks, audio audits, and dynamic calculation fields.',
        deliverables: ['Custom CAPI Form Repositories', 'Syntax & Script Verification Handbooks', 'Offline Field Device Images'],
        tag: 'Instrument Design',
      },
      {
        title: 'Complex Multi-Stage Stratified Sampling',
        description: 'Designing master sample frames utilizing satellite imagery, census enumeration areas, and probability proportional to size (PPS) sampling.',
        deliverables: ['Sample Weighting Protocols', 'Spatial Geo-Boundary Clusters', 'Non-Response Replacement Rubrics'],
        tag: 'Sampling Science',
      },
      {
        title: 'High-Frequency Auditing & Anomaly Detection',
        description: 'Nightly statistical audits identifying enumerator fabrication, speeder interviews, GPS boundary discrepancies, and distribution anomalies.',
        deliverables: ['Automated Data Cleansing Pipelines', 'Daily Enumerator Scorecards', 'Clean De-Identified Microdata Files'],
        tag: 'Quality Assurance',
      },
    ],
    methodologySteps: [
      { step: '01', title: 'Survey Instrument Translation & Cognitive Pre-Testing', description: 'Translating concepts into local dialects and conducting iterative cognitive debriefings with pilot respondents.' },
      { step: '02', title: 'Rigorous Enumerator Bootcamp & Certification', description: 'Simulated field interviewing, ethical consent compliance, and objective exam-based interviewer accreditation.' },
      { step: '03', title: 'Full Field Mobilization & GPS Tracking', description: 'Supervised deployment with real-time GPS breadcrumb tracking and random spot-checks by quality auditors.' },
      { step: '04', title: 'Anonymization, Codebooks & Archive', description: 'Differential privacy sanitization, variable labeling, and complete Stata/R/CSV data packaging.' },
    ],
    featuredCaseStudy: {
      client: 'National Bureau of Statistics & World Bank',
      region: 'Central & Eastern Africa',
      challenge: 'Executing a nationally representative 45,000-household living standards and informal enterprise survey across 8 provinces during seasonal monsoon conditions.',
      intervention: 'Deployed a fleet of 350 ruggedized tablets equipped with IP3 custom offline CAPI scripts, satellite base-maps, solar charging field hubs, and automated nightly cloud sync.',
      results: [
        'Completed full enumeration in 42 days with 99.1% response rate',
        'Identified and corrected 1,200+ geo-boundary mismatches in real time',
        'Delivered fully coded, anonymized microdata 3 weeks ahead of statutory deadline',
      ],
      quote: 'IP3’s field survey orchestration set a new benchmark for data velocity and integrity in our national statistical system.',
      quoteAuthor: 'Director of National Surveys',
    },
    artifacts: [
      { title: 'Cleaned Microdata Package (Stata / R / SPSS)', format: 'Anonymized Datasets', description: 'Fully documented codebooks with sampling weights and variance strata.' },
      { title: 'Field Enumerator Quality Control Handbook', format: 'Field Manual', description: 'Standard operating procedures for interview conduct, ethics, and device security.' },
      { title: 'Automated High-Frequency Audit Scripts', format: 'Python / Stata Syntax', description: 'Reproducible algorithms for outlier and speeder detection.' },
    ],
  },
  {
    id: 'digital-systems',
    slug: 'digital-transformation-civic-systems',
    badge: 'PRACTICE 04',
    tabLabel: 'Digital Transformation',
    title: 'Digital Transformation & Civic Systems',
    subtitle: 'Public Financial Management Automation, E-Governance & Data Sovereignty',
    summary:
      'We modernize public sector operations by architecting secure, interoperable digital platforms, automating public financial management (PFM) workflows, and deploying resilient e-governance infrastructure for sovereign clients.',
    heroImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=1200',
    accentColor: '#a78bfa',
    stats: [
      { value: '340%', label: 'Municipal Revenue Velocity Increase', detail: 'Post-implementation of automated billing and e-tax portals' },
      { value: '4.2M+', label: 'Citizens Served by Digital Registries', detail: 'Integrated into unified social protection and civil service hubs' },
      { value: 'Zero', label: 'Security Breaches on Sovereign Clouds', detail: 'Engineered to ISO 27001 and sovereign data residency mandates' },
    ],
    keyCapabilities: [
      {
        title: 'Public Financial Management (PFM) Modernization',
        description: 'Digitizing budget allocation, treasury single accounts (TSA), automated procurement tracking, and municipal revenue collection.',
        deliverables: ['Automated Revenue Assessment Engines', 'Procurement Transparency Portals', 'Integrated Financial Management Systems (IFMIS)'],
        tag: 'PFM & Treasury',
      },
      {
        title: 'Interoperable Civil Registry & Social Protection APIs',
        description: 'Building secure API bridges between national identity systems, health registries, and conditional cash transfer registries.',
        deliverables: ['Microservice API Gateway Blueprints', 'Data Exchange Standards & Specs', 'Zero-Trust Citizen Identity Protocols'],
        tag: 'E-Governance',
      },
      {
        title: 'Sovereign Data Governance & Cloud Security Architecture',
        description: 'Frameworks to ensure local cloud hosting compliance, differential privacy enforcement, and institutional cyber-resilience.',
        deliverables: ['National Data Sovereignty Frameworks', 'Cybersecurity Threat Modeling', 'Cloud Migration & Disaster Recovery Plans'],
        tag: 'Data Architecture',
      },
    ],
    methodologySteps: [
      { step: '01', title: 'Institutional Workflow Audit & Gap Analysis', description: 'Deconstructing legacy manual processes, paper bottlenecks, and institutional data silos across ministries.' },
      { step: '02', title: 'Secure Enterprise Architecture Design', description: 'Drafting open-standard, modular system architectures prioritizing high availability and data sovereignty.' },
      { step: '03', title: 'Agile Sandbox Deployment & Pilot Trials', description: 'Deploying prototype systems in municipal sandboxes with end-user testing and security penetration audits.' },
      { step: '04', title: 'Full Scale Cutover & Institutional Training', description: 'Executing seamless data migration and certifying civil servant administrators across all target departments.' },
    ],
    featuredCaseStudy: {
      client: 'Municipal Development Authority',
      region: 'Middle East & North Africa',
      challenge: 'Fragmented property tax records, 6-month permitting backlogs, and an estimated 45% leakage in municipal license fee collections.',
      intervention: 'Architected and deployed an integrated Municipal E-Service Portal with automated GIS parcel verification and real-time digital bank clearing.',
      results: [
        'Reduced business permit issuance turnaround from 180 days to 72 hours',
        'Increased municipal own-source tax collection by 340% in year one',
        'Digitized 280,000 commercial and residential land titles',
      ],
      quote: 'The digital civic infrastructure built by IP3 brought transparency and fiscal autonomy to our entire municipal administration.',
      quoteAuthor: 'Director General of Municipal Affairs',
    },
    artifacts: [
      { title: 'Enterprise Digital System Architecture (TOGAF Compliant)', format: 'Technical Blueprint', description: 'Comprehensive microservices topology, API schemas, and security layers.' },
      { title: 'Municipal Revenue Automation Playbook', format: 'Implementation Guide', description: 'Step-by-step change management guide for municipal revenue commissioners.' },
      { title: 'Cybersecurity & Data Sovereignty Charter', format: 'Regulatory Document', description: 'Statutory rules for public cloud deployment and encryption standard operating procedures.' },
    ],
  },
  {
    id: 'capacity-building',
    slug: 'institutional-capacity-executive-training',
    badge: 'PRACTICE 05',
    tabLabel: 'Capacity & Training',
    title: 'Institutional Capacity Building & Executive Training',
    subtitle: 'Ministerial Crisis Simulations, Evidence-To-Policy Sprints & Leadership Fellowships',
    summary:
      'We cultivate the next generation of institutional leaders and senior civil servants through experiential policy simulations, data literacy masterclasses, and executive fellowship programs designed to build lasting sovereign autonomy.',
    heroImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200',
    accentColor: '#f59e0b',
    stats: [
      { value: '1,850+', label: 'Senior Officials Trained', detail: 'Ministers, permanent secretaries, directors, and lead economists' },
      { value: '96%', label: 'Long-Term Institutional Retention', detail: 'Graduates actively serving in senior decision-making roles' },
      { value: '24+', label: 'Custom Simulation Exercises', detail: 'Covering debt crisis management, supply-chain shocks & climate emergencies' },
    ],
    keyCapabilities: [
      {
        title: 'Ministerial War-Room Simulations & Crisis Response',
        description: 'Immersive multi-stakeholder scenario simulations where leaders manage escalating macroeconomic shocks, sovereign rating downgrades, and supply shocks.',
        deliverables: ['Custom Crisis Simulation Scenarios', 'Decision-Tree After-Action Reviews', 'Executive Crisis Management Playbooks'],
        tag: 'Crisis Preparedness',
      },
      {
        title: 'Evidence-to-Policy Translation Sprints',
        description: 'Intensive 2-week technical sprints equipping senior analysts to translate econometric microdata into concise, actionable ministerial cabinet memos.',
        deliverables: ['Cabinet Memo Writing Standards', 'Policy Synthesis Toolkits', 'Executive Presentation Workshops'],
        tag: 'Policy Translation',
      },
      {
        title: 'Applied Econometrics & Data Literacy Masterclasses',
        description: 'Practical training for civil service statistical teams in Stata, R, Python, GIS spatial mapping, and causal inference techniques.',
        deliverables: ['Accredited Statistical Courseware', 'Reproducible Code Repositories', 'Certification Examinations'],
        tag: 'Technical Upskilling',
      },
    ],
    methodologySteps: [
      { step: '01', title: 'Institutional Competency Diagnostics', description: 'Assessing existing capability gaps across analytical, operational, and strategic leadership dimensions.' },
      { step: '02', title: 'Customized Curriculum & Simulation Design', description: 'Developing bespoke case studies and war-room scenarios anchored in the client country’s actual economic realities.' },
      { step: '03', title: 'Experiential Delivery & Peer Problem Solving', description: 'Facilitating high-intensity workshops led by former senior ministers, renowned academics, and technical experts.' },
      { step: '04', title: 'Ongoing Mentorship & Knowledge Communities', description: 'Embedding graduates into peer advisory networks with quarterly masterclasses and ongoing technical helpdesks.' },
    ],
    featuredCaseStudy: {
      client: 'National Civil Service Academy & Prime Minister’s Office',
      region: 'Central Asia & Caucasus',
      challenge: 'A newly appointed cohort of 120 deputy ministers and director generals required rapid upskilling in data-driven governance and international capital negotiation.',
      intervention: 'Delivered an intensive 6-month Executive Leadership & Policy Fellowship featuring 4 crisis war-room simulations, econometrics labs, and bilateral negotiation drills.',
      results: [
        '100% of participants certified across all 6 core governance competencies',
        'Fellows authored 14 policy reform proposals subsequently adopted by Cabinet',
        'Established permanent in-house Institutional Simulation Lab at the national academy',
      ],
      quote: 'The simulations were extraordinarily realistic. It gave our executive leadership the exact muscle memory needed for sovereign negotiations.',
      quoteAuthor: 'Dean of the Civil Service Academy',
    },
    artifacts: [
      { title: 'Executive Policy War-Room Simulation Handbook', format: 'Simulation Engine', description: 'Role profiles, inject scenarios, and decision matrices for crisis training.' },
      { title: 'Civil Service Analytical Competency Framework', format: 'Standardization Guide', description: 'Skills rubrics for policy analysts from Junior Researcher to Chief Economist.' },
      { title: 'Applied Data Literacy Curriculum (Modules 1–8)', format: 'Courseware & Code Labs', description: 'Full syllabus, real-world case datasets, and solution codebases.' },
    ],
  },
];
