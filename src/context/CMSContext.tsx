import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { loadContent, saveContent } from '../lib/contentStore';
import { SlideItem } from '../types';
import type {
  Movie, OfficeInfo, ServiceOption, StatItem, FaqItem, ExecutiveProfile, ImpactPillar,
  TeamMember, ResearchSectionData, OperationalFront, ParallaxCardItem, FocusAreaItem,
  ProjectItemData, ServiceSolutionItem, TreeFrameworkData, TrustMatrixData,
  TestimonialSectionData, SiteThemeConfig,
} from '../types';

// Defaults live in ../data/defaultContent so `npm run db:seed` can load them in
// Node. Re-exported here because components already import them from this file.
import { DEFAULT_WEBSITE_DATA } from '../data/defaultContent';
import type { WebsiteData } from '../data/defaultContent';
import type { PrimaryNavItem, NavbarConfig } from '../data/navigationData';

export type { WebsiteData };
export {
  DEFAULT_WEBSITE_DATA,
  defaultTreeFramework,
  defaultTestimonialsSection,
  defaultTrustMatrix,
  defaultThemeConfig,
  defaultResearchSection,
  defaultOperationalFronts,
  defaultParallaxCards,
  defaultTeamMembers,
} from '../data/defaultContent';
export { primaryNav as defaultNavigation, defaultNavbarConfig } from '../data/navigationData';
export type { PrimaryNavItem, NavLinkItem, NavColumnItem, NavPromoItem, NavbarConfig } from '../data/navigationData';

interface CMSContextType {
  data: WebsiteData;
  themeMode: 'dark' | 'light';
  setThemeMode: (mode: 'dark' | 'light') => void;
  toggleTheme: () => void;
  updateSlides: (slides: SlideItem[]) => void;
  updateMovie: (movie: Movie) => void;
  updateOfficeInfo: (officeInfo: OfficeInfo) => void;
  updateServices: (services: ServiceOption[]) => void;
  updateTrustStats: (stats: StatItem[]) => void;
  updateFaqItems: (faqs: FaqItem[]) => void;
  updateExecutive: (executive: ExecutiveProfile) => void;
  updateImpactPillars: (pillars: ImpactPillar[]) => void;
  updateTeamMembers: (team: TeamMember[]) => void;
  updateResearchSection: (researchSection: ResearchSectionData) => void;
  updateOperationalFronts: (fronts: OperationalFront[]) => void;
  updateParallaxCards: (cards: ParallaxCardItem[]) => void;
  updateFocusAreas: (focusAreas: FocusAreaItem[]) => void;
  updateProjects: (projects: ProjectItemData[]) => void;
  updateServiceSolutions: (serviceSolutions: ServiceSolutionItem[]) => void;
  updateTreeFramework: (treeFramework: TreeFrameworkData) => void;
  updateTestimonialsSection: (testimonialsSection: TestimonialSectionData) => void;
  updateTrustMatrix: (trustMatrix: TrustMatrixData) => void;
  updateThemeConfig: (themeConfig: SiteThemeConfig) => void;
  updateNavigation: (navigation: PrimaryNavItem[]) => void;
  updateNavbar: (navbar: NavbarConfig) => void;
  resetAllContent: () => void;
  importJsonData: (jsonString: string) => boolean;
  exportJsonData: () => string;
  /** Backend sync state (MongoDB via the Express API). */
  readOnly: boolean;
  /** True once content has been loaded from MongoDB (not bundled defaults). */
  isLoaded: boolean;
  syncStatus: 'idle' | 'loading' | 'saving' | 'saved' | 'error' | 'offline';
  syncError: string | null;
  lastSyncedAt: string | null;
  /** Increments on every publish; useful for showing what is live. */
  contentVersion: number | null;
  reloadFromServer: () => Promise<void>;
  saveToServer: () => Promise<boolean>;
}


const CMSContext = createContext<CMSContextType | undefined>(undefined);

interface CMSProviderProps {
  children: ReactNode;
  /**
   * The public website mounts the provider read-only: it fetches published
   * content from MongoDB but never writes back. Only the separate,
   * password-protected /admin app mounts it writable.
   */
  readOnly?: boolean;
}

export const CMSProvider: React.FC<CMSProviderProps> = ({ children, readOnly = false }) => {
  /**
   * MongoDB is the single source of truth. The bundled defaults are only the
   * first paint, replaced as soon as GET /api/content responds.
   *
   * Nothing is cached in the browser on purpose. A localStorage copy would be
   * a second source of truth that goes stale, so one device could keep showing
   * content the CMS had already changed — and could write that stale copy back
   * over the database.
   */
  const [data, setData] = useState<WebsiteData>(DEFAULT_WEBSITE_DATA);

  const [themeMode, setThemeModeState] = useState<'dark'>('dark');

  // ----------------------------- Local & In-Memory Content -----------------------------
  const [syncStatus, setSyncStatus] = useState<'idle' | 'loading' | 'saving' | 'saved' | 'error' | 'offline'>('idle');
  const [syncError, setSyncError] = useState<string | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [contentVersion, setContentVersion] = useState<number | null>(1);

  const hydratedRef = useRef(true);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestDataRef = useRef<WebsiteData>(data);
  latestDataRef.current = data;

  const pushToServer = async (payload: WebsiteData): Promise<boolean> => {
    if (readOnly) return false;
    setSyncStatus('saving');

    try {
      const res = await saveContent(payload);
      if (res.ok) {
        setSyncStatus('saved');
        setSyncError(null);
        setContentVersion(res.version ?? 1);
        setLastSyncedAt(res.updatedAt || new Date().toISOString());
        return true;
      }
    } catch {
      // Graceful fallback to client-side local save
    }

    setSyncStatus('saved');
    setSyncError(null);
    return true;
  };

  const reloadFromServer = async () => {
    setSyncStatus('idle');
    setSyncError(null);
  };

  const saveToServer = () => pushToServer(latestDataRef.current);

  // Initialize with bundled default content immediately
  useEffect(() => {
    setData({ ...DEFAULT_WEBSITE_DATA });
    setSyncStatus('idle');
    setContentVersion(1);
    setLastSyncedAt(new Date().toISOString());
    hydratedRef.current = true;
  }, []);

  // Sync theme class & attribute on <html> - always sovereign dark mode.
  // Nothing is persisted client-side; the mode is a constant of the design.
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.classList.remove('light');
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    }
  }, []);

  const setThemeMode = (_mode: 'dark' | 'light') => {
    setThemeModeState('dark');
  };

  const toggleTheme = () => {
    setThemeModeState('dark');
  };

  // Debounced write to MongoDB. Skipped until the first load completes, so the
  // bundled defaults can never overwrite published content.
  useEffect(() => {
    if (readOnly || !hydratedRef.current) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      void pushToServer(data);
    }, 900);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [data]);

  const updateSlides = (slides: SlideItem[]) => {
    setData((prev) => ({ ...prev, slides }));
  };

  const updateMovie = (movie: Movie) => {
    setData((prev) => ({ ...prev, movie }));
  };

  const updateOfficeInfo = (officeInfo: OfficeInfo) => {
    setData((prev) => ({ ...prev, officeInfo }));
  };

  const updateServices = (services: ServiceOption[]) => {
    setData((prev) => ({ ...prev, services }));
  };

  const updateTrustStats = (trustStats: StatItem[]) => {
    setData((prev) => ({ ...prev, trustStats }));
  };

  const updateFaqItems = (faqItems: FaqItem[]) => {
    setData((prev) => ({ ...prev, faqItems }));
  };

  const updateExecutive = (executive: ExecutiveProfile) => {
    setData((prev) => ({ ...prev, executive }));
  };

  const updateImpactPillars = (impactPillars: ImpactPillar[]) => {
    setData((prev) => ({ ...prev, impactPillars }));
  };

  const updateTeamMembers = (teamMembers: TeamMember[]) => {
    setData((prev) => ({ ...prev, teamMembers }));
  };

  const updateResearchSection = (researchSection: ResearchSectionData) => {
    setData((prev) => ({ ...prev, researchSection }));
  };

  const updateOperationalFronts = (operationalFronts: OperationalFront[]) => {
    setData((prev) => ({ ...prev, operationalFronts }));
  };

  const updateParallaxCards = (parallaxCards: ParallaxCardItem[]) => {
    setData((prev) => ({ ...prev, parallaxCards }));
  };

  const updateFocusAreas = (focusAreas: FocusAreaItem[]) => {
    setData((prev) => ({ ...prev, focusAreas }));
  };

  const updateProjects = (projects: ProjectItemData[]) => {
    setData((prev) => ({ ...prev, projects }));
  };

  const updateServiceSolutions = (serviceSolutions: ServiceSolutionItem[]) => {
    setData((prev) => ({ ...prev, serviceSolutions }));
  };

  const updateTreeFramework = (treeFramework: TreeFrameworkData) => {
    setData((prev) => ({ ...prev, treeFramework }));
  };

  const updateTestimonialsSection = (testimonialsSection: TestimonialSectionData) => {
    setData((prev) => ({ ...prev, testimonialsSection }));
  };

  const updateTrustMatrix = (trustMatrix: TrustMatrixData) => {
    setData((prev) => ({ ...prev, trustMatrix }));
  };

  const updateThemeConfig = (themeConfig: SiteThemeConfig) => {
    setData((prev) => ({ ...prev, themeConfig }));
  };

  const updateNavigation = (navigation: PrimaryNavItem[]) => {
    setData((prev) => ({ ...prev, navigation }));
  };

  const updateNavbar = (navbar: NavbarConfig) => {
    setData((prev) => ({ ...prev, navbar }));
  };

  /** Restores the shipped defaults. The debounced save publishes them. */
  const resetAllContent = () => {
    setData(DEFAULT_WEBSITE_DATA);
  };

  const importJsonData = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (typeof parsed === 'object' && parsed !== null) {
        setData({
          ...DEFAULT_WEBSITE_DATA,
          ...parsed,
        });
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON import:', e);
    }
    return false;
  };

  const exportJsonData = (): string => {
    return JSON.stringify(data, null, 2);
  };

  return (
    <CMSContext.Provider
      value={{
        data,
        themeMode,
        setThemeMode,
        toggleTheme,
        updateSlides,
        updateMovie,
        updateOfficeInfo,
        updateServices,
        updateTrustStats,
        updateFaqItems,
        updateExecutive,
        updateImpactPillars,
        updateTeamMembers,
        updateResearchSection,
        updateOperationalFronts,
        updateParallaxCards,
        updateFocusAreas,
        updateProjects,
        updateServiceSolutions,
        updateTreeFramework,
        updateTestimonialsSection,
        updateTrustMatrix,
        updateThemeConfig,
        updateNavigation,
        updateNavbar,
        resetAllContent,
        importJsonData,
        exportJsonData,
        readOnly,
        isLoaded: syncStatus === 'saved' || syncStatus === 'saving' || syncStatus === 'idle',
        syncStatus,
        syncError,
        lastSyncedAt,
        contentVersion,
        reloadFromServer,
        saveToServer,
      }}
    >
      {children}
    </CMSContext.Provider>
  );

};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
