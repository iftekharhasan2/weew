import { LayerData } from '../types';

export const LAYERS_DATA: LayerData[] = [
  {
    id: 'layer-01',
    activeIndex: 0,
    glowColor: 'rgba(255, 126, 103, 0.25)',
    activeDashColor: '#ff7e67',
    inactiveDashColor: '#1e293b',
    accentColor: '#ff7e67',
    layerNumber: 'LAYER 01',
    title: 'System Diagnostics',
    description: 'Granular stress testing across sovereign debt, fiscal pressure, climate exposure, and institutional capacity vectors.',
    capabilities: [
      'Multi-domain vulnerability stress testing (Debt + Climate + DPI)',
      'Cross-ministerial workflow and bottleneck forensics',
      'Macro-fiscal shock resilience simulation',
      'Field-level revenue & expenditure counterfactual modeling'
    ],
    caseExample: {
      title: 'Sovereign Vulnerability & Fiscal Stress Assessment',
      summary: 'Comprehensive diagnostic mapping 14 critical debt and climate vulnerability vectors for a national Ministry of Finance to unlock concessionary multilateral funding.',
      deliverable: 'Integrated Sovereign Risk & Transition Matrix'
    },
    metrics: [
      { label: 'Diagnostic Vectors Analyzed', value: '14 Vectors' },
      { label: 'Institutional Bottlenecks Identified', value: '38 Gaps' },
      { label: 'Decision Impact Velocity', value: '< 90 Days' }
    ]
  },
  {
    id: 'layer-02',
    activeIndex: 1,
    glowColor: 'rgba(45, 212, 191, 0.25)',
    activeDashColor: '#2dd4bf',
    inactiveDashColor: '#1e293b',
    accentColor: '#2dd4bf',
    layerNumber: 'LAYER 02',
    title: 'Policy Architecture',
    description: 'Translating empirical evidence into legally sound statutory instruments, operating charters, and blended finance structures.',
    capabilities: [
      'Statutory instrument drafting & regulatory framework design',
      'Civil service operating charter and KPI mandate formalization',
      'Blended finance & sovereign risk allocation structuring',
      'Multilateral Development Bank (MDB) co-financing models'
    ],
    caseExample: {
      title: 'Green Municipal Bond & Infrastructure Facility',
      summary: 'Structured a $140M blended municipal financing vehicle with first-loss credit guarantees and green taxonomy compliance for subnational climate resilience.',
      deliverable: 'Statutory Operating Charter & Bond Issuance Framework'
    },
    metrics: [
      { label: 'Blended Capital Structured', value: '$140M Mobilized' },
      { label: 'Regulatory Frameworks Drafted', value: '6 Enacted' },
      { label: 'Domestic Institutional Ownership', value: '100%' }
    ]
  },
  {
    id: 'layer-03',
    activeIndex: 2,
    glowColor: 'rgba(56, 189, 248, 0.25)',
    activeDashColor: '#38bdf8',
    inactiveDashColor: '#1e293b',
    accentColor: '#38bdf8',
    layerNumber: 'LAYER 03',
    title: 'Digital Delivery & MERLA',
    description: 'Deploying sovereign delivery platforms and adaptive real-time feedback loops to guarantee durable domestic execution.',
    capabilities: [
      'Cabinet-level Delivery Unit dashboard & telemetry deployment',
      'Domestic civil servant competency upskilling program',
      'Real-time execution telemetry and automated warning alerts',
      'Adaptive MERLA feedback loops & policy revision triggers'
    ],
    caseExample: {
      title: 'National Delivery & Performance Telemetry Platform',
      summary: 'Deployed an executive dashboard tracking 12 inter-ministerial reform workstreams with automated bottleneck escalation triggers and sovereign knowledge codification.',
      deliverable: 'Digital Delivery Unit & National Monitoring Platform'
    },
    metrics: [
      { label: 'Active Workstreams Monitored', value: '12 Units' },
      { label: 'Civil Servants Upskilled', value: '2,400+ Leaders' },
      { label: 'On-Time Execution Velocity', value: '+42% Gain' }
    ]
  }
];
