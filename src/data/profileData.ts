import { ExecutiveProfile, ImpactPillar } from '../types';

const executiveImg = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800";

export const executiveData: ExecutiveProfile = {
  name: "Dr. Julian Sterling, Ph.D.",
  title: "Director of Agronomic Science & Soil Biogeochemistry",
  organization: "IP3 Agriscience & Precision Research Farm",
  shortOrg: "IP3 Research Farm",
  email: "agronomy.director@ip3-farm.org",
  image: executiveImg,
  headline: "Living Soil Systems & Empirical Crop Science in Practice",
  paragraphs: [
    "Dr. Julian Sterling brings over 20 years of field-scale agronomic leadership, specialized in soil metagenomics, high-throughput phenomics, and sustainable agricultural intensification. Overseeing 1,200 hectares of active research testbeds, his research bridges subterranean microbial dynamics with canopy yield optimization.",
    "He has directed over 60 multi-season agricultural research trials in partnership with the CGIAR, FAO, Horizon Europe, and international agriscience institutes, pioneering zero-runoff nutrient management and drought-tolerant seed cultivars.",
    "His mission is to empower farmers, agronomists, and policymakers with unvarnished, empirical field trial data to secure resilient, regenerative food systems for the next century."
  ],
  closingStatement: "Bridging fundamental plant biochemistry with 1,200 hectares of living field trial validation."
};

export const impactPillars: ImpactPillar[] = [
  {
    id: 'precision-agronomy',
    title: 'Precision Agronomy & Crop Genomics',
    tagline: 'Empirical breeding trials and high-throughput phenotyping for climate resilience.',
    description: 'We evaluate multi-line cereal, legume, and oilseed cultivars across diverse soil ecotypes, optimizing water-use efficiency and drought resistance through quantitative phenomics.',
    iconName: 'Leaf',
    keyMetrics: ['1,200 Hectares of Trials', 'Multi-Season Cereal Varieties', 'Zero-Waste Biomass'],
    targetAudience: ['Seed Breeders', 'Agricultural Ministries', 'Commercial Farm Collectives']
  },
  {
    id: 'soil-carbon',
    title: 'Soil Metagenomics & Deep Carbon Sequestration',
    tagline: 'Unlocking the subterranean biome to accelerate soil organic matter formation.',
    description: 'Deploying in-situ CO2 and methane gas flux chambers, mycorrhizal fungal inoculants, and deep soil core metagenomics to verify durable carbon drawdown.',
    iconName: 'ShieldCheck',
    keyMetrics: ['Long-Term Carbon Monitoring', 'Microbiome Biodiversity Index', 'Sub-Surface Sensor Grids'],
    targetAudience: ['Carbon Project Developers', 'Soil Scientists', 'Environmental Authorities']
  },
  {
    id: 'agtech-robotics',
    title: 'Autonomous AgTech & Telemetry Networks',
    tagline: 'Integrating autonomous drone imaging, microclimate IoT, and robotic scouting.',
    description: 'Eliminating guesswork through centimeter-accurate RTK field mapping, automated variable-rate micro-irrigation, and AI pest diagnostics across test quadrants.',
    iconName: 'TrendingUp',
    keyMetrics: ['4K Multispectral Drone Surveys', 'Sub-Minute Telemetry Alerts', 'Precision Variable-Rate Delivery'],
    targetAudience: ['AgTech Innovators', 'Equipment Manufacturers', 'Precision Agronomists']
  },
  {
    id: 'bio-circular-ecology',
    title: 'Bio-Circular Agro-Ecosystems & Watershed Care',
    tagline: 'Restoring natural pollinator bio-corridors and closed-loop nutrient cycles.',
    description: 'Engineering buffer hedgerows, anaerobic digestate recovery systems, and biochar filtration swales to eliminate synthetic runoffs and enhance biodiversity.',
    iconName: 'Sparkles',
    keyMetrics: ['100% On-Farm Nutrient Cycling', 'Zero-Leaching Riparian Buffers', 'Native Pollinator Habitats'],
    targetAudience: ['Ecological Foundations', 'Watershed Management Boards', 'Regenerative Farm Networks']
  }
];

export const keyImpactStats = [
  { value: "1,200+", label: "Research Hectares" },
  { value: "98.7%", label: "Trial Traceability" },
  { value: "450+", label: "Soil Sensor Arrays" },
  { value: "Global", label: "Agriscience Partnerships" }
];

