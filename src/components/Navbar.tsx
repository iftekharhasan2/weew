import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Search, Menu, X, ArrowRight, ShieldCheck, ChevronDown } from 'lucide-react';
import { TopBar } from './TopBar';
import { MegaMenu } from './MegaMenu';
import { MobileNav } from './MobileNav';
import { SearchOverlay } from './SearchOverlay';
import type { PrimaryNavItem } from '../data/navigationData';
import { defaultNavbarConfig } from '../data/navigationData';
import { useCMS } from '../context/CMSContext';

interface NavbarProps {
  currentPage?: 'home' | 'about' | 'approach' | 'focus' | 'services';
  onNavigate?: (page: 'home' | 'about' | 'approach' | 'focus' | 'services', sectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage = 'home',
  onNavigate,
}) => {
  const { data } = useCMS();
  const primaryNav = data.navigation || [];
  const navbar = {
    ...defaultNavbarConfig,
    ...(data.navbar || {}),
    brand: { ...defaultNavbarConfig.brand, ...(data.navbar?.brand || {}) },
    cta: { ...defaultNavbarConfig.cta, ...(data.navbar?.cta || {}) },
  };
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const headerRef = useRef<HTMLElement>(null);
  const condensed = scrollY > 24;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setOpenMenu(null);
  }, []);

  // Handle click outside to close mega menu
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    if (openMenu) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [openMenu, closeMenu]);

  const handleEnter = (id: string) => {
    // Only on larger screens
    if (window.innerWidth >= 901) {
      setOpenMenu(id);
    }
  };

  const handleNavClick = (
    e: React.MouseEvent,
    item: PrimaryNavItem
  ) => {
    e.preventDefault();
    closeMenu();

    if (item.page && onNavigate) {
      onNavigate(item.page, item.sectionId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentPage !== 'home' && onNavigate) {
      onNavigate('home', item.sectionId);
      setTimeout(() => {
        const el = document.querySelector(item.sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const target = document.querySelector(item.sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else if (item.sectionId === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const activeItemData = primaryNav.find((i) => i.id === openMenu);

  return (
    <>
      <a className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#ff7e67] focus:text-[#050a12] focus:font-bold focus:rounded-md" href="#main">
        {navbar.skipLinkLabel}
      </a>

      <header
        ref={headerRef}
        className={`sticky top-0 z-50 bg-[#050a12]/95 backdrop-blur-md border-b transition-all duration-300 font-sans ${
          condensed
            ? 'border-slate-800/90 shadow-2xl shadow-black/40 py-0'
            : 'border-slate-800/50 shadow-lg py-0'
        }`}
        onMouseLeave={closeMenu}
      >
        {/* Top Info Bar */}
        <TopBar />

        {/* Main Navbar Bar */}
        <div className={`transition-all duration-200 ${condensed ? 'h-16' : 'h-18'}`}>
          <div className="_container_47fnf_1 _barInner_aes6y_20 max-w-7xl mx-auto px-4 sm:px-8 h-full flex items-center justify-between gap-4 lg:gap-8">
            
            {/* Brand Logo */}
            <a
              className="_brand_aes6y_28 flex items-center gap-3 group cursor-pointer shrink-0"
              href="#hero"
              aria-label="IP3 home"
              onClick={(e) => {
                e.preventDefault();
                closeMenu();
                if (currentPage !== 'home' && onNavigate) {
                  onNavigate('home', '#hero');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <span className={`_logo_19f3y_1 ${condensed ? '_compact_19f3y_26' : ''} flex items-center gap-2.5`}>
                <div className="relative">
                  {navbar.brand.logoImage ? (
                    <img
                      src={navbar.brand.logoImage}
                      alt={navbar.brand.name}
                      className="w-9 h-9 rounded-xl object-cover shadow-md shadow-[#ff7e67]/30 group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff7e67] to-[#e05e47] flex items-center justify-center font-bold text-[#050a12] shadow-md shadow-[#ff7e67]/30 group-hover:scale-105 transition-transform">
                      <span className="font-extrabold italic text-sm tracking-tighter">{navbar.brand.badgeText}</span>
                    </div>
                  )}
                  {navbar.brand.showStatusDot && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#050a12]"></div>
                  )}
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm sm:text-base tracking-tight uppercase text-slate-100 group-hover:text-[#ff7e67] transition-colors leading-none">
                      {navbar.brand.name}
                    </span>
                  </div>
                  {navbar.brand.tagline && (
                    <span className="text-[10px] text-slate-400 tracking-normal font-medium leading-tight mt-0.5 hidden sm:inline-block">
                      {navbar.brand.tagline}
                    </span>
                  )}
                </div>
              </span>
            </a>

            {/* Primary Desktop Navigation Links */}
            <nav className="_nav_aes6y_32 hidden lg:flex flex-1 justify-center" aria-label="Primary">
              <ul className="_navList_aes6y_38 flex items-center gap-2 xl:gap-5 h-full">
                {primaryNav.map((item) => {
                  const isOpen = openMenu === item.id;
                  const isCurrentPage = 
                    (item.id === 'about' && currentPage === 'about') ||
                    (item.id === 'focus-areas' && currentPage === 'focus') ||
                    (item.id === 'services' && currentPage === 'services') ||
                    (item.id === 'approach' && currentPage === 'approach') ||
                    (item.id === 'research' && currentPage === 'approach');

                  return (
                    <li
                      key={item.id}
                      onMouseEnter={() => handleEnter(item.id)}
                      className="relative h-full flex items-center"
                    >
                      <button
                        className={`_navLink_aes6y_45 relative px-2.5 py-2 text-xs xl:text-sm font-semibold tracking-normal transition-colors cursor-pointer flex items-center gap-1 rounded-lg ${
                          isOpen || isCurrentPage
                            ? 'text-[#ff7e67] font-bold bg-slate-800/50'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800/30'
                        }`}
                        type="button"
                        aria-expanded={isOpen}
                        onFocus={() => handleEnter(item.id)}
                        onClick={(e) => {
                          if (openMenu === item.id) {
                            handleNavClick(e, item);
                          } else {
                            setOpenMenu(item.id);
                          }
                        }}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-[#ff7e67]' : 'opacity-60'
                          }`}
                        />
                        {/* Active indicator bar */}
                        {(isOpen || isCurrentPage) && (
                          <motion.span
                            layoutId="navUnderline"
                            className="absolute left-2 right-2 bottom-0 h-0.5 bg-[#ff7e67] rounded-full"
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Actions: Search, Get In Touch CTA, Burger */}
            <div className="_actions_aes6y_77 flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Search Button */}
              {navbar.searchEnabled && (
              <button
                className="_iconButton_aes6y_84 w-9 h-9 rounded-full flex items-center justify-center text-slate-300 hover:text-[#ff7e67] hover:bg-slate-800/60 border border-transparent hover:border-slate-700 transition-all cursor-pointer"
                type="button"
                onClick={() => setSearchOpen(true)}
                title={navbar.searchPlaceholder}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" role="presentation" aria-hidden="true" focusable="false">
                  <path d="M9 3a6 6 0 1 0 3.7 10.7l4.3 4.3 1.4-1.4-4.3-4.3A6 6 0 0 0 9 3Zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" fill="currentColor" stroke="none"></path>
                </svg>
                <span className="sr-only">Open search</span>
              </button>
              )}


              {/* Get In Touch CTA Button */}
              {navbar.cta.enabled && (
              <a
                className="_button_4cnjm_1 _primary_4cnjm_45 _size-sm_4cnjm_139 _contact_aes6y_105 hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-full bg-[#ff7e67] hover:bg-[#ff8f7b] active:bg-[#f26249] text-[#070d18] text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-[#ff7e67]/30 transition-all hover:scale-102 cursor-pointer"
                href={navbar.cta.targetId}
                onClick={(e) => {
                  e.preventDefault();
                  closeMenu();
                  const scrollToCta = () => {
                    const target = document.querySelector(navbar.cta.targetId);
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                  };
                  if (currentPage !== 'home' && onNavigate) {
                    onNavigate('home', navbar.cta.targetId);
                    setTimeout(scrollToCta, 100);
                  } else {
                    scrollToCta();
                  }
                }}
              >
                <span className="_label_4cnjm_88">{navbar.cta.label}</span>
              </a>
              )}

              {/* Mobile Burger Menu Button */}
              <button
                className="_iconButton_aes6y_84 _burger_aes6y_99 lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-slate-200 hover:bg-slate-800/80 transition-colors cursor-pointer"
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
              >
                <svg width="22" height="22" viewBox="0 0 20 20" role="presentation" aria-hidden="true" focusable="false">
                  <path d="M3 5h14v2H3V5Zm0 4h14v2H3V9Zm0 4h14v2H3v-2Z" fill="currentColor" stroke="none"></path>
                </svg>
                <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Mega Menu Dropdown */}
        <AnimatePresence>
          {openMenu && activeItemData && (
            <MegaMenu
              key={openMenu}
              item={activeItemData}
              onClose={closeMenu}
              onNavigate={onNavigate}
            />
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onOpenSearch={() => setSearchOpen(true)}
        onNavigate={onNavigate}
      />

      {/* Search Overlay Modal */}
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
};
