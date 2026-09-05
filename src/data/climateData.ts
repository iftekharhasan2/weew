export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  socials: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface MagazineArticle {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  summary: string;
  readTime: string;
  date: string;
}

export interface ExpertiseItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface PolicyFocusItem {
  title: string;
  tag: string;
  imageUrl: string;
}

export interface CircularOfferingItem {
  title: string;
  description: string;
  iconNumber: string;
  imageUrl: string;
}

export interface IndustrySolution {
  title: string;
  description: string;
  iconName?: string;
}

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  {
    label: 'Focus Areas',
    href: '#focus',
    active: true,
    children: [
      { label: 'Our Focus', href: '#focus' },
      { label: 'Climate Action, ESG Strategy, & Sustainability Solutions', href: '#home', current: true },
      { label: 'Educational Innovation', href: '#education' },
      { label: 'Data & Digital Governance', href: '#data' }
    ]
  },
  {
    label: 'Our Services',
    href: '#services',
    children: [
      {
        label: 'Our Solutions',
        href: '#services',
        children: [
          { label: 'Public Policy Innovation and Action Research', href: '#policy' },
          { label: 'Climate Action, Sustainability analysis and Solutions', href: '#climate' },
          { label: 'Economic, Financial, and Environmental Assessment, and Feasibility Studies', href: '#assessment' },
          { label: 'Monitoring, Evaluation, Research, Learning, and Adaptation (MERLA)', href: '#merla' },
          { label: 'Program and Survey Design and Management', href: '#survey' }
        ]
      }
    ]
  },
  { label: 'IP3 People', href: '#team' },
  { label: 'Contact', href: '#contact' }
];

export const POLICY_FOCUS_ITEMS: PolicyFocusItem[] = [
  {
    title: 'Transformative Green Transition Policy and Governance Frameworks',
    tag: 'Policy & Governance',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'ESG, Circularity, Biodiversity, and Regenerative Economy Pathways',
    tag: 'Regenerative Economy',
    imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Sustainable Market Solutions and Global Integration',
    tag: 'Market Solutions',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80'
  }
];

export const EXPERTISE_ITEMS: ExpertiseItem[] = [
  {
    id: 'exp-1',
    title: 'Driving Responsible Growth and Sustainability Transformation',
    description: 'We partner with organizations to decouple economic growth from environmental degradation by embedding sustainability into core operations. Our strategies focus on enhancing resource productivity, minimizing waste, and aligning growth initiatives with global sustainability frameworks such as the SDGs and Paris Agreement targets.',
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'exp-2',
    title: 'Creating Supportive Regulatory and Policy Frameworks',
    description: 'We bridge gaps between policy ambition and practical implementation by developing supportive regulatory frameworks that enable businesses, governments, and industries to meet evolving sustainability standards. Our expertise lies in delivering feasibility studies, policy reviews, and sectoral strategies that drive systemic change.',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'exp-3',
    title: 'Developing and Deploying Educational, Financial, and Investment Instruments',
    description: 'Recognizing the role of education and finance in driving systemic transformation, we design and implement capacity-building programs, sustainable financial instruments, and impact investment strategies. By enabling access to funding, knowledge, and skills, we empower clients to achieve measurable social and environmental outcomes.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'exp-4',
    title: 'ESG & Circular Strategy, and Biodiversity Conservation',
    description: 'We provide comprehensive ESG roadmaps, materiality assessments, and circular economy strategies that empower businesses to meet regulatory compliance while driving long-term value. By integrating biodiversity conservation into strategic planning, we help clients preserve natural ecosystems, protect biodiversity, and unlock opportunities for sustainable development.',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'exp-5',
    title: 'Climate Adaptation, and Resilience Building Solutions',
    description: 'At IP3 Consulting, we specialize in delivering comprehensive Climate Adaptation, and Resilience Building Solutions tailored to the unique challenges faced by developing countries. Our services include: Climate Finance Mobilization, Climate Risk Assessment and Vulnerability Analysis, Adaptation Planning and Implementation, Resilient Infrastructure Design, Capacity Building and Training.',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80'
  }
];

export const MAGAZINE_ARTICLES: MagazineArticle[] = [
  {
    id: 'art-1',
    title: 'Urban Planning for Resilient Infrastructure',
    category: 'Climate Action',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    summary: 'Developing adaptive municipal spatial frameworks to withstand extreme climate events, water surges, and urban heat islands in high-density delta cities.',
    readTime: '6 min read',
    date: 'February 2025'
  },
  {
    id: 'art-2',
    title: 'Biogas Production for Renewable Energy',
    category: 'Climate Action',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    summary: 'Decentralized waste-to-energy models converting agricultural and organic urban biomass into clean, reliable power and bio-fertilizers.',
    readTime: '5 min read',
    date: 'February 2025'
  },
  {
    id: 'art-3',
    title: 'Sustainable Agriculture Practices for Food Security',
    category: 'Climate Action',
    imageUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80',
    summary: 'Regenerative farming methods, saline-tolerant crop varieties, and smart irrigation mechanisms supporting climate-impacted agrarian communities.',
    readTime: '7 min read',
    date: 'February 2025'
  },
  {
    id: 'art-4',
    title: 'Biodiversity Conservation and Ecosystem Management',
    category: 'Climate Action',
    imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    summary: 'Protecting vulnerable wetland and mangrove ecosystems with market-based biodiversity credits and community co-management models.',
    readTime: '8 min read',
    date: 'February 2025'
  },
  {
    id: 'art-5',
    title: 'Waste-to-Energy Circular Economy',
    category: 'Climate Action',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    summary: 'Transforming industrial and municipal solid waste into closed-loop thermal and electrical energy systems for scalable urban decarbonization.',
    readTime: '6 min read',
    date: 'February 2025'
  }
];

export const SIX_PILLARS = [
  {
    title: 'Market Transformation',
    subtitle: 'Redefining Economic Value and Resource Efficiency',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    description: 'Transforming supply chains and market incentives toward circular, decarbonized models.'
  },
  {
    title: 'Resource Productivity',
    subtitle: 'Localizing Solutions and Fostering Global Cooperation',
    imageUrl: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=600&q=80',
    description: 'Optimizing industrial material flows, reducing waste footprints, and scaling recycling tech.'
  },
  {
    title: 'Sustainability Integration',
    subtitle: 'Implementing Regenerative and Systemic Approaches',
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80',
    description: 'Embedding core ESG metrics directly into executive scorecards and operating models.'
  },
  {
    title: 'ESG Integration, Just Transition',
    subtitle: 'Championing ESG and Equitable Transitions',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    description: 'Ensuring green transitions protect worker livelihoods and generate quality green jobs.'
  },
  {
    title: 'Decoupling Growth',
    subtitle: 'Integrating Ecosystem Services and Inclusive Governance',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    description: 'Achieving economic advancement without proportional consumption of natural capital.'
  },
  {
    title: 'Finance and Education',
    subtitle: 'Advancing Learning and Impact Investing',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    description: 'Mobilizing green bonds, blended climate finance, and vocational sustainability curricula.'
  }
];

export const ESG_FOCUS_AREAS = [
  {
    title: 'ESG Integration',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    description: 'Aligning corporate governance with global ESG disclosure standards (GRI, ISSB, CSRD) to attract ESG capital.'
  },
  {
    title: 'Circularity Strategy',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    description: 'Closing the loop in manufacturing, post-consumer processing, and supply chain remanufacturing.'
  },
  {
    title: 'Biodiversity Conservation',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    description: 'Preserving critical natural habitats, assessing nature-related risks (TNFD), and restoring ecosystems.'
  }
];

export const INDUSTRY_SOLUTIONS: IndustrySolution[] = [
  {
    title: 'Manufacturing Industries and Enterprises',
    description: 'Empowering to integrate sustainable practices, decouple growth from environmental impact, and enhance resource efficiency.'
  },
  {
    title: 'Bank, Insurance and Re-Insurance Companies',
    description: 'Climate risk impact analysis and sustainable underwriting practices.'
  },
  {
    title: 'Wealth Management and Asset Management Companies',
    description: 'ESG-integrated investment strategies, risk assessments, and portfolio audits.'
  },
  {
    title: 'Private Equity Firms',
    description: 'Pre-investment due diligence, ESG auditing, and sustainability-focused portfolio management.'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Benjamin Shah',
    role: 'Founder',
    bio: 'Pioneering public policy strategist and sustainability economist leading global climate policy initiatives across South Asia.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    socials: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    name: 'Takehiro Kanegi',
    role: 'Graphic Designer',
    bio: 'Lead visual communicator specializing in environmental impact infographics, policy report visualization, and branding systems.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    socials: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    name: 'Rufus Stewart',
    role: 'Visual Designer',
    bio: 'Digital and publication designer crafting high-impact sustainability journals, interactive briefs, and multimedia campaigns.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    socials: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com'
    }
  }
];

export const CIRCULAR_OFFERINGS: CircularOfferingItem[] = [
  {
    title: 'Textile Sector Mentorship',
    description: 'Circular design, water-energy efficiency audits, and ESG reporting.',
    iconNumber: '01',
    imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Municipal CE Frameworks',
    description: 'Waste-to-resource systems, citizen engagement models, and PPP structuring.',
    iconNumber: '02',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Food Waste Valorization',
    description: 'Designing biogas plants, circular agro-industrial partnerships, and community composting programs.',
    iconNumber: '03',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Policy Advocacy on Circularity',
    description: 'Aligning national strategies with SDGs 11 (Sustainable Cities) and 12 (Responsible Consumption).',
    iconNumber: '04',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80'
  }
];

export const FOUR_VALUES = [
  {
    title: 'Proven Expertise',
    description: 'Combining social science research, policy innovation, and technical solutions.'
  },
  {
    title: 'Integrated Solutions',
    description: 'Bridging environmental, social, and economic priorities.'
  },
  {
    title: 'Actionable Impact',
    description: 'Delivering measurable, scalable, and locally tailored outcomes.'
  },
  {
    title: 'Collaborative Approach',
    description: 'Partnering with clients to co-create transformative strategies.'
  }
];
