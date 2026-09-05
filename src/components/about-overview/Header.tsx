import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Menu, X, Globe, ArrowRight } from 'lucide-react';
import { NAV_MENU_ITEMS } from '../../data/aboutOverviewData';

interface HeaderProps {
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      }
      setIsScrolled(currentScroll > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSubmenu = (id: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href === '#contact') {
      onOpenContact();
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#0d6efd] via-[#0654c4] to-[#0367bf] z-[100] transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
        id="hfe-reading-progress-bar"
      />

      {/* Main Sticky Navigation Bar */}
      <header
        id="masthead"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3.5 border-b border-neutral-100'
            : 'bg-white py-5 border-b border-neutral-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Branding */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group focus:outline-none"
            id="brand-logo"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0654c4] to-[#0367bf] flex items-center justify-center text-white font-bold text-xl shadow-sm tracking-tighter group-hover:scale-105 transition-transform">
              <span className="font-serif">IP³</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-neutral-900 font-cardo leading-none">
                IP3 Consulting
              </span>
              <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium mt-0.5">
                Institute for Public Policy &amp; Practice
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {NAV_MENU_ITEMS.map((item) => {
              if (item.children) {
                return (
                  <div key={item.id} className="relative group">
                    <button
                      className="px-3.5 py-2 text-[15px] font-medium text-neutral-700 hover:text-[#0654c4] transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer"
                      onClick={() => handleNavClick(item.href)}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-4 h-4 text-neutral-400 group-hover:text-[#0654c4] group-hover:rotate-180 transition-transform duration-200" />
                    </button>

                    {/* Level 1 Dropdown */}
                    <div className="absolute left-0 top-full pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                      <div className="w-72 bg-white rounded-xl shadow-xl border border-neutral-100 py-2.5 px-1.5">
                        {item.children.map((subItem) => {
                          if (subItem.children) {
                            return (
                              <div key={subItem.id} className="relative group/sub">
                                <button
                                  className="w-full text-left px-3.5 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-[#0654c4] rounded-lg transition-colors flex items-center justify-between font-medium cursor-pointer"
                                  onClick={() => handleNavClick(subItem.href)}
                                >
                                  <span>{subItem.label}</span>
                                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                                </button>

                                {/* Level 2 Dropdown */}
                                <div className="absolute left-full top-0 pl-1.5 opacity-0 -translate-x-2 pointer-events-none group-hover/sub:opacity-100 group-hover/sub:translate-x-0 group-hover/sub:pointer-events-auto transition-all duration-200">
                                  <div className="w-80 bg-white rounded-xl shadow-xl border border-neutral-100 py-2.5 px-1.5">
                                    {subItem.children.map((nestedItem) => (
                                      <button
                                        key={nestedItem.id}
                                        onClick={() => handleNavClick(nestedItem.href)}
                                        className="w-full text-left px-3.5 py-2 text-sm text-neutral-600 hover:bg-blue-50/50 hover:text-[#0654c4] rounded-lg transition-colors leading-snug block cursor-pointer"
                                      >
                                        {nestedItem.label}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return (
                            <button
                              key={subItem.id}
                              onClick={() => handleNavClick(subItem.href)}
                              className="w-full text-left px-3.5 py-2 text-sm text-neutral-700 hover:bg-blue-50/50 hover:text-[#0654c4] rounded-lg transition-colors leading-snug block font-normal cursor-pointer"
                            >
                              {subItem.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-3.5 py-2 text-[15px] font-medium transition-colors relative cursor-pointer ${
                    item.isActive
                      ? 'text-[#0654c4] font-semibold'
                      : 'text-neutral-700 hover:text-[#0654c4]'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#0654c4] rounded-full" />
                  )}
                </button>
              );
            })}

            <button
              onClick={onOpenContact}
              className="ml-3 px-4 py-2 text-sm font-medium text-white bg-[#0654c4] hover:bg-[#0367bf] rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </nav>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
              id="mobile-menu-button"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-100 bg-white max-h-[80vh] overflow-y-auto px-4 py-4 space-y-1 shadow-2xl animate-in slide-in-from-top duration-200">
            {NAV_MENU_ITEMS.map((item) => (
              <div key={item.id} className="py-1">
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.id)}
                      className="w-full flex items-center justify-between py-2 text-[16px] font-medium text-neutral-800 hover:text-[#0654c4]"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-neutral-500 transition-transform ${
                          openSubmenus[item.id] ? 'rotate-180 text-[#0654c4]' : ''
                        }`}
                      />
                    </button>
                    {openSubmenus[item.id] && (
                      <div className="pl-4 pr-1 py-1 space-y-1 bg-neutral-50 rounded-lg my-1">
                        {item.children.map((subItem) => (
                          <div key={subItem.id}>
                            {subItem.children ? (
                              <div>
                                <button
                                  onClick={() => toggleSubmenu(subItem.id)}
                                  className="w-full flex items-center justify-between py-2 text-sm font-medium text-neutral-700"
                                >
                                  <span>{subItem.label}</span>
                                  <ChevronDown
                                    className={`w-3.5 h-3.5 transition-transform ${
                                      openSubmenus[subItem.id] ? 'rotate-180 text-[#0654c4]' : ''
                                    }`}
                                  />
                                </button>
                                {openSubmenus[subItem.id] && (
                                  <div className="pl-3 py-1 space-y-1 border-l-2 border-blue-200 ml-1">
                                    {subItem.children.map((nested) => (
                                      <button
                                        key={nested.id}
                                        onClick={() => handleNavClick(nested.href)}
                                        className="block w-full text-left py-1.5 text-xs text-neutral-600 hover:text-[#0654c4]"
                                      >
                                        {nested.label}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <button
                                onClick={() => handleNavClick(subItem.href)}
                                className="block w-full text-left py-2 text-sm text-neutral-600 hover:text-[#0654c4]"
                              >
                                {subItem.label}
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`block w-full text-left py-2 text-[16px] ${
                      item.isActive
                        ? 'text-[#0654c4] font-semibold'
                        : 'text-neutral-800 hover:text-[#0654c4]'
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-neutral-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-2.5 text-center text-sm font-medium text-white bg-[#0654c4] rounded-lg shadow"
              >
                Contact IP3 Consulting
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
