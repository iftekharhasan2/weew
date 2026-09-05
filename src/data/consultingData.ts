import { OfficeInfo, ServiceOption, FaqItem, StatItem, TestimonialItem } from '../types';

export const ip3OfficeInfo: OfficeInfo = {
  companyName: "IP3 Agriscience & Research Farm",
  tagline: "Living Field Laboratories & Precision Agronomic Science",
  description: "IP3 Research Farm operates 1,200 hectares of living agro-ecological testbeds, computational phenomics glasshouses, and advanced soil metagenomics laboratories for sustainable crop science.",
  email: "field.trials@ip3-farm.org",
  phone: "+1 (541) 737-8920",
  alternatePhone: "+1 (541) 737-8925",
  address: {
    building: "Agronomic Innovation Station",
    road: "4200 Valley Research Parkway",
    area: "Willamette Agriscience Basin",
    city: "Corvallis, OR 97331",
    country: "United States",
    fullAddress: "Agronomic Innovation Station, 4200 Valley Research Parkway, Corvallis, OR 97331, United States"
  },
  googleMapsUrl: "https://maps.google.com/?q=Corvallis+Oregon+Agricultural+Research",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d91624.123!2d-123.3!3d44.56!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCorvallis!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
  officeHours: "Mon - Fri: 7:30 AM - 5:30 PM (PST)",
  timeZone: "America/Los_Angeles (PST)"
};

export const consultingServices: ServiceOption[] = [
  {
    id: "field-trials-design",
    title: "Field Trial Protocol Design & Execution",
    description: "Multi-plot randomized complete block designs (RCBD), climate-stress testing, cultivar evaluation, and harvest yield auditing.",
    iconName: "Leaf",
    estimatedDuration: "45 mins"
  },
  {
    id: "soil-carbon-profiling",
    title: "Soil Metagenomics & Carbon Accreditation",
    description: "Deep soil core sampling, microbial community DNA extraction, biochar mineral stability, and verified carbon credit baselines.",
    iconName: "ShieldCheck",
    estimatedDuration: "60 mins"
  },
  {
    id: "agtech-telemetry",
    title: "AgTech Sensor & Drone Telemetry Integration",
    description: "Sub-surface IoT sensor calibration, multispectral NDVI drone mapping, and predictive microclimate water modeling.",
    iconName: "TrendingUp",
    estimatedDuration: "60 mins"
  },
  {
    id: "regenerative-transition",
    title: "Regenerative Farm Transition & Advisory",
    description: "Cover-crop sequencing, biological pest suppression strategies, closed-loop fertility budgets, and organic transition plans.",
    iconName: "Sparkles",
    estimatedDuration: "45 mins"
  }
];

export const trustStats: StatItem[] = [
  {
    label: "Continuous Field Trials",
    value: "1,200 Ha",
    description: "Contiguous living research acreage",
    iconName: "Briefcase"
  },
  {
    label: "Data Telemetry Turnaround",
    value: "< 1 hr",
    description: "Real-time automated field sensor sync",
    iconName: "Clock"
  },
  {
    label: "Trial Repeatability",
    value: "99.8%",
    description: "Empirically audited field datasets",
    iconName: "Award"
  },
  {
    label: "Resident Agronomists",
    value: "35+",
    description: "Ph.D. soil scientists & agronomists",
    iconName: "Users"
  }
];

export const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "Can external academic institutions or agtech companies run trials at the IP3 Research Farm?",
    answer: "Yes. We host cooperative field research agreements across cereal breeding, biological inputs, autonomous machinery testing, and soil health monitoring. Our agronomy team handles plot staking, daily telemetry, randomized sampling, and statistical reporting.",
    category: "Field Research"
  },
  {
    id: "faq-2",
    question: "Where is the research farm located and are in-person site visits permitted?",
    answer: "Our main 1,200-hectare research station is located at 4200 Valley Research Parkway, Corvallis, Oregon. We host structured station tours, field demonstration days, and delegation briefings throughout the spring and harvest seasons.",
    category: "Station Visits"
  },
  {
    id: "faq-3",
    question: "How do you ensure scientific traceability in long-term carbon and soil health studies?",
    answer: "All research quadrants are georeferenced with RTK GPS (±2 cm accuracy) and monitored through permanent subsurface sensor nodes, gas flux chambers, and annual deep core metagenomic DNA sequencing.",
    category: "Data Integrity"
  },
  {
    id: "faq-4",
    question: "How do I schedule a technical advisory consultation or trial proposal review?",
    answer: "You can book directly via our online consultation scheduler or reach out via our executive field inquiry portal. Our agronomy directors review technical proposals within 24 business hours.",
    category: "Advisory"
  }
];

export const availableTimeSlots = [
  "08:30 AM",
  "10:00 AM",
  "11:30 AM",
  "01:30 PM",
  "03:00 PM",
  "04:30 PM"
];

export const clientTestimonials: TestimonialItem[] = [
  {
    id: "t1",
    quote: "The empirical precision of IP3 Farm's multi-season drought trials enabled our breeding consortium to fast-track climate-resilient wheat varieties by three full seasons.",
    author: "Dr. Marianne Weber",
    role: "Lead Crop Geneticist",
    organization: "Global Cereal Improvement Initiative",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    rating: 5
  },
  {
    id: "t2",
    quote: "Their subterranean sensor grid and metagenomic soil profiling gave us the verified scientific baseline required for our carbon mineralization accreditation.",
    author: "Arthur Pendelton",
    role: "Director of Natural Capital",
    organization: "AgroCarbon Research Network",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    rating: 5
  },
  {
    id: "t3",
    quote: "Operating on 1,200 real-world hectares gave our autonomous field robotics the exact edge-case validation we needed prior to commercial release.",
    author: "Dr. Kenshiro Tanaka",
    role: "Chief Robotics Engineer",
    organization: "TerraRobotics Systems",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    rating: 5
  }
];

