export interface NavPromoItem {
  eyebrow: string;
  title: string;
  image: string;
  href: string;
}

export interface NavLinkItem {
  label: string;
  href: string;
  sectionId?: string;
  desc?: string;
  page?: 'home' | 'about' | 'approach' | 'focus' | 'services';
}

export interface NavColumnItem {
  title?: string;
  links: NavLinkItem[];
}

export interface PrimaryNavItem {
  id: string;
  label: string;
  href: string;
  sectionId: string;
  page?: 'home' | 'about' | 'approach' | 'focus' | 'services';
  links: NavLinkItem[];
  columns: NavColumnItem[];
  promos: NavPromoItem[];
}

export const primaryNav: PrimaryNavItem[] = [
  {
    id: 'about',
    label: 'About Us',
    href: '/about',
    sectionId: '#overview',
    page: 'about',
    links: [
      { label: 'Overview', href: '/about#overview', sectionId: '#overview', page: 'about', desc: 'Mission, institutional heritage, ecosystem & four strategic fronts' },
      { label: 'IP3 People', href: '/about#people', sectionId: '#people', page: 'about', desc: 'Global faculty of economists, researchers, fellows & executive leadership' },
      { label: 'Approach', href: '/about#approach', sectionId: '#approach', page: 'about', desc: '6-stage delivery lifecycle from complexity & evidence to sustainable handover' },
    ],
    columns: [
      {
        title: 'About Sub-Pages',
        links: [
          { label: '01. Overview', href: '/about#overview', sectionId: '#overview', page: 'about' },
          { label: '02. IP3 People', href: '/about#people', sectionId: '#people', page: 'about' },
          { label: '03. Approach', href: '/about#approach', sectionId: '#approach', page: 'about' },
        ],
      },
      {
        title: 'Institutional Governance',
        links: [
          { label: 'Mission & Operating Model', href: '/about#overview', sectionId: '#overview', page: 'about' },
          { label: 'Faculty & Global Fellows', href: '/about#people', sectionId: '#people', page: 'about' },
          { label: 'Delivery Lifecycle', href: '/about#approach', sectionId: '#approach', page: 'about' },
        ],
      },
    ],
    promos: [
      {
        eyebrow: 'IP3 PEOPLE',
        title: 'Meet our global faculty of economists, researchers, and policy practitioners',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
        href: '/about#people',
      },
      {
        eyebrow: 'OUR APPROACH',
        title: 'The 6-stage lifecycle from systemic complexity to sustainable sovereign delivery',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
        href: '/about#approach',
      },
    ],
  },
  {
    id: 'focus-areas',
    label: 'Focus Areas',
    href: '/focus',
    sectionId: '#focus-areas',
    page: 'focus',
    links: [
      { label: 'Climate Action, ESG & Sustainability', href: '/focus#climate', sectionId: '#climate', page: 'focus', desc: 'Decarbonization audits, circular economy & industrial ESG roadmaps' },
      { label: 'Educational Innovation & Pedagogy', href: '/focus#education', sectionId: '#education', page: 'focus', desc: 'Digital learning platforms, ADB secondary education & curriculum reform' },
      { label: 'Data & Digital Governance', href: '/focus#governance', sectionId: '#governance', page: 'focus', desc: 'Future-ready governance, municipal capacity (BMDF) & data ecosystems' },
    ],
    columns: [
      {
        title: 'Focus Area Sub-Pages',
        links: [
          { label: '01. Climate Action & ESG', href: '/focus#climate', sectionId: '#climate', page: 'focus' },
          { label: '02. Educational Innovation', href: '/focus#education', sectionId: '#education', page: 'focus' },
          { label: '03. Digital Governance', href: '/focus#governance', sectionId: '#governance', page: 'focus' },
          { label: '00. All Strategic Pillars', href: '/focus#overview', sectionId: '#overview', page: 'focus' },
        ],
      },
      {
        title: 'Climate & Sustainability',
        links: [
          { label: 'Decarbonization Pathways', href: '/focus#climate', sectionId: '#climate', page: 'focus' },
          { label: 'The Circular Economist', href: '/focus#climate', sectionId: '#climate', page: 'focus' },
          { label: 'ESG Enterprise Roadmap', href: '/focus#climate', sectionId: '#climate', page: 'focus' },
          { label: 'Closed-Loop Textile Recycling', href: '/focus#climate', sectionId: '#climate', page: 'focus' },
        ],
      },
    ],
    promos: [
      {
        eyebrow: 'FEATURED FOCUS',
        title: 'Climate Action, ESG Strategy & Circular Economy Solutions',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
        href: '/focus#climate',
      },
      {
        eyebrow: 'CASE STUDY',
        title: 'Mobilizing $140M in Green Municipal Bonds with BMDF',
        image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=800',
        href: '/focus',
      },
    ],
  },
  {
    id: 'services',
    label: 'Our Services',
    href: '/services',
    sectionId: '#services',
    page: 'services',
    links: [
      { label: 'Macro & Sector Policy Advisory', href: '/services#macro-policy', sectionId: '#macro-policy', page: 'services', desc: 'Fiscal frameworks, industrial policy & sovereign debt modeling' },
      { label: 'MERLA Monitoring & Evaluation', href: '/services#merla', sectionId: '#merla', page: 'services', desc: 'Impact measurement, telemetry dashboards & adaptive learning' },
      { label: 'CAPI & Field Survey Architecture', href: '/services#capi-surveys', sectionId: '#capi-surveys', page: 'services', desc: 'Large-scale socio-economic censuses & high-frequency data pipelines' },
      { label: 'Digital Transformation & Civic Systems', href: '/services#digital-systems', sectionId: '#digital-systems', page: 'services', desc: 'PFM modernization, civic registries & municipal automation' },
      { label: 'Institutional Capacity & Executive Training', href: '/services#capacity-building', sectionId: '#capacity-building', page: 'services', desc: 'Ministerial crisis simulations & leadership fellowships' },
    ],
    columns: [
      {
        title: 'Analytical & Advisory Practices',
        links: [
          { label: 'Macro & Sector Policy Advisory', href: '/services#macro-policy', sectionId: '#macro-policy', page: 'services' },
          { label: 'MERLA Monitoring & Evaluation', href: '/services#merla', sectionId: '#merla', page: 'services' },
          { label: 'CAPI & Field Survey Architecture', href: '/services#capi-surveys', sectionId: '#capi-surveys', page: 'services' },
        ],
      },
      {
        title: 'Systems & Human Capital',
        links: [
          { label: 'Digital Transformation & Civic Systems', href: '/services#digital-systems', sectionId: '#digital-systems', page: 'services' },
          { label: 'Institutional Capacity & Training', href: '/services#capacity-building', sectionId: '#capacity-building', page: 'services' },
          { label: 'All 5 Practice Deliverables', href: '/services', sectionId: '#services', page: 'services' },
        ],
      },
    ],
    promos: [
      {
        eyebrow: 'PRACTICE 01 • MACRO ADVISORY',
        title: 'Sovereign Macro-Fiscal Realignment and DSGE Modeling Suites',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
        href: '/services#macro-policy',
      },
      {
        eyebrow: 'PRACTICE 03 • FIELD CAPI',
        title: 'High-Frequency CAPI Field Survey Architecture in 12 Regions',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
        href: '/services#capi-surveys',
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Navbar chrome (brand, CTA, top bar) — CMS controlled                */
/* ------------------------------------------------------------------ */

export interface NavbarBrandConfig {
  /** Short mark shown inside the coloured logo tile, e.g. "IP3". */
  badgeText: string;
  /** Wordmark next to the logo tile. */
  name: string;
  /** Small line under the wordmark. */
  tagline: string;
  /** Green "live" dot on the logo tile. */
  showStatusDot: boolean;
  /** Optional image URL; replaces the badge tile when set. */
  logoImage?: string;
}

export interface NavbarCtaConfig {
  enabled: boolean;
  label: string;
  /** Section id to scroll to, e.g. "#contact-advisory". */
  targetId: string;
}

export interface NavbarTopBarConfig {
  enabled: boolean;
  showEmail: boolean;
  showPhone: boolean;
  showLocation: boolean;
  /** Pulsing-dot label on the right, e.g. "Global Policy Advisory Desk". */
  statusLabel: string;
}

export interface NavbarConfig {
  brand: NavbarBrandConfig;
  cta: NavbarCtaConfig;
  topBar: NavbarTopBarConfig;
  searchEnabled: boolean;
  searchPlaceholder: string;
  /** Badge in the top-right of every mega menu panel. */
  megaMenuBadge: string;
  skipLinkLabel: string;
}

export const defaultNavbarConfig: NavbarConfig = {
  brand: {
    badgeText: 'IP3',
    name: 'IP3 AGRISCIENCE',
    tagline: 'Precision Research Farm',
    showStatusDot: true,
    logoImage: '',
  },
  cta: {
    enabled: true,
    label: 'Field Trials & Contact',
    targetId: '#contact-advisory',
  },
  topBar: {
    enabled: true,
    showEmail: true,
    showPhone: true,
    showLocation: true,
    statusLabel: 'Research Farm Operations Active',
  },
  searchEnabled: true,
  searchPlaceholder: 'Search field trials, soil science & research data...',
  megaMenuBadge: 'IP3 AGRISCIENCE',
  skipLinkLabel: 'Skip to main content',
};

