import React, { useState } from 'react';
import {
  X,
  Upload,
  Lock,
  Unlock,
  Save,
  RotateCcw,
  Download,
  Plus,
  Trash2,
  Film,
  Sliders,
  Users,
  Briefcase,
  BookOpen,
  Building,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Info,
  Palette,
  Sun,
  Moon,
  Handshake,
  GitBranch,
  MessageSquareQuote,
  Menu as MenuIcon,
} from 'lucide-react';
import { useCMS, defaultThemeConfig, defaultTrustMatrix, defaultTreeFramework, defaultTestimonialsSection } from '../context/CMSContext';
import { SlideItem, TeamMember, ServiceOption, ImpactPillar, SiteThemeConfig, ServiceSolutionItem, PartnerBrandItem, TrustMatrixData, TreeFrameworkData, TestimonialSectionData, TestimonialItem } from '../types';
import { ImageField } from './ImageField';
import { NavigationManager } from './NavigationManager';
import { MediaField } from './MediaField';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  const {
    data,
    themeMode,
    setThemeMode,
    updateSlides,
    updateMovie,
    updateOfficeInfo,
    updateServices,
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
    resetAllContent,
    importJsonData,
    exportJsonData,
  } = useCMS();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // default true for ease of use
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'slides' | 'navigation' | 'colors' | 'movie' | 'trustMatrix' | 'tree' | 'testimonials' | 'executive' | 'team' | 'services' | 'research' | 'projects' | 'parallax' | 'backup'
  >('slides');


  // Status message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === 'admin') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Incorrect PIN. (Default PIN: 1234)');
    }
  };

  // Export JSON helper
  const handleExport = () => {
    const jsonStr = exportJsonData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ip3_website_content_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Website content exported successfully!');
  };

  // Import JSON helper
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importJsonData(content);
        if (success) {
          showToast('Content imported & applied successfully!');
        } else {
          alert('Failed to parse JSON content file.');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-hidden font-sans">
      <div className="relative w-full max-w-6xl h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Modal Top Header Bar */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                IP3 Website Content Admin Panel
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
                  LIVE CMS
                </span>
              </h2>
              <p className="text-xs text-slate-400">Control and customize all text, images, slides, and services across the website</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast Alert Banner */}
        {toastMessage && (
          <div className="bg-emerald-600/90 text-white text-xs font-semibold px-6 py-2.5 flex items-center justify-center gap-2 animate-fadeIn shrink-0">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* PIN Authentication Screen */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 text-center">
            <form onSubmit={handlePinSubmit} className="max-w-sm w-full p-8 bg-slate-950 border border-slate-800 rounded-2xl space-y-5 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Admin Authentication</h3>
                <p className="text-xs text-slate-400">Enter the PIN code to access the content editor</p>
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Enter PIN (Default: 1234)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm text-center focus:outline-none focus:border-blue-500"
                />
                {pinError && <p className="text-xs text-rose-400 mt-2 font-medium">{pinError}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
              >
                Unlock CMS
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Navigation Tabs */}
            <div className="w-full md:w-64 bg-slate-950/60 border-r border-slate-800/80 p-3 space-y-1.5 shrink-0 overflow-y-auto">
              <button
                onClick={() => setActiveTab('slides')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                  activeTab === 'slides'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>Hero Presentation Slides</span>
              </button>

              <button
                onClick={() => setActiveTab('navigation')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                  activeTab === 'navigation'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <MenuIcon className="w-4 h-4 text-sky-400" />
                <span>Navigation & Header</span>
              </button>

              <button
                onClick={() => setActiveTab('colors')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                  activeTab === 'colors'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Palette className="w-4 h-4 text-amber-400" />
                <span>Theme & Color Studio</span>
              </button>

              <button
                onClick={() => setActiveTab('movie')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                  activeTab === 'movie'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Film className="w-4 h-4" />
                <span>Cinematic Intro Reel</span>
              </button>

              <button
                onClick={() => setActiveTab('trustMatrix')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                  activeTab === 'trustMatrix'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Handshake className="w-4 h-4 text-emerald-400" />
                <span>Clients & Partners Marquee</span>
              </button>

              <button
                onClick={() => setActiveTab('tree')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                  activeTab === 'tree'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <GitBranch className="w-4 h-4 text-sky-400" />
                <span>Tree Framework (Roots/Trunk)</span>
              </button>

              <button
                onClick={() => setActiveTab('testimonials')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                  activeTab === 'testimonials'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <MessageSquareQuote className="w-4 h-4 text-amber-400" />
                <span>Testimonials & Endorsements</span>
              </button>

              <button
                onClick={() => setActiveTab('executive')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                  activeTab === 'executive'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Executive & Pillars</span>
              </button>

              <button
                onClick={() => setActiveTab('team')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                  activeTab === 'team'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Team & Leadership</span>
              </button>

              <button
                onClick={() => setActiveTab('research')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                  activeTab === 'research'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Research & Four Fronts</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                  activeTab === 'projects'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Projects & Focus Areas</span>
              </button>

              <button
                onClick={() => setActiveTab('parallax')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                  activeTab === 'parallax'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Parallax Research Cards</span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                  activeTab === 'services'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Building className="w-4 h-4" />
                <span>Services & Contact</span>
              </button>


              <button
                onClick={() => setActiveTab('backup')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                  activeTab === 'backup'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Export / Import & Reset</span>
              </button>
            </div>

            {/* Main Content Form Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">

              {/* TAB 1: HERO SLIDES */}
              {activeTab === 'slides' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">Hero Presentation Slides</h3>
                      <p className="text-xs text-slate-400">Edit hero carousel slides displayed on the main landing page</p>
                    </div>
                    <button
                      onClick={() => {
                        const newSlide: SlideItem = {
                          id: Date.now(),
                          name: `Slide ${data.slides.length + 1}`,
                          title: 'New Headline Title',
                          subtitle: 'Enter a compelling subtitle for this slide.',
                          bgImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80',
                          ctaText: 'Explore More',
                        };
                        updateSlides([...data.slides, newSlide]);
                        showToast('New slide added!');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Slide</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {data.slides.map((slide, index) => (
                      <div key={slide.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
                          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                            Slide #{index + 1}
                          </span>
                          <button
                            onClick={() => {
                              if (data.slides.length <= 1) {
                                alert('At least one slide is required.');
                                return;
                              }
                              updateSlides(data.slides.filter((s) => s.id !== slide.id));
                              showToast('Slide deleted.');
                            }}
                            className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                            title="Delete Slide"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">Headline Title</label>
                            <input
                              type="text"
                              value={slide.title}
                              onChange={(e) => {
                                const newSlides = [...data.slides];
                                newSlides[index].title = e.target.value;
                                updateSlides(newSlides);
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">Button CTA Text</label>
                            <input
                              type="text"
                              value={slide.ctaText || ''}
                              onChange={(e) => {
                                const newSlides = [...data.slides];
                                newSlides[index].ctaText = e.target.value;
                                updateSlides(newSlides);
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-xs font-medium text-slate-400 mb-1">Subtitle / Body Text</label>
                            <textarea
                              rows={2}
                              value={slide.subtitle || ''}
                              onChange={(e) => {
                                const newSlides = [...data.slides];
                                newSlides[index].subtitle = e.target.value;
                                updateSlides(newSlides);
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>

                          <div>
                            <ImageField
                              label="Background Image (URL or File Upload)"
                              value={slide.bgImage}
                              onChange={(val) => {
                                const newSlides = [...data.slides];
                                newSlides[index].bgImage = val;
                                updateSlides(newSlides);
                              }}
                            />
                          </div>

                          <div>
                            <MediaField
                              kind="video"
                              folder="slides"
                              label="Background Video (Optional)"
                              value={slide.videoUrl || ''}
                              onChange={(val) => {
                                const newSlides = [...data.slides];
                                newSlides[index].videoUrl = val;
                                updateSlides(newSlides);
                              }}
                            />
                          </div>
                        </div>

                        {/* Slide-Specific Color Customization Bar */}
                        <div className="pt-3 border-t border-slate-800/80">
                          <label className="block text-xs font-semibold text-blue-400 mb-2 flex items-center gap-1.5">
                            <Palette className="w-3.5 h-3.5" />
                            <span>Custom Slide Colors & Overlay (Optional Overrides)</span>
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
                            <div>
                              <span className="block text-[10px] text-slate-400 mb-1">Accent / Tag</span>
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="color"
                                  value={slide.accentColor || '#2563eb'}
                                  onChange={(e) => {
                                    const newSlides = [...data.slides];
                                    newSlides[index].accentColor = e.target.value;
                                    newSlides[index].tagColor = e.target.value;
                                    updateSlides(newSlides);
                                  }}
                                  className="w-6 h-6 rounded border border-slate-700 bg-transparent cursor-pointer"
                                />
                                <span className="text-[10px] text-slate-300 font-mono">{slide.accentColor || '#2563eb'}</span>
                              </div>
                            </div>

                            <div>
                              <span className="block text-[10px] text-slate-400 mb-1">Headline Color</span>
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="color"
                                  value={slide.titleColor || '#0f172a'}
                                  onChange={(e) => {
                                    const newSlides = [...data.slides];
                                    newSlides[index].titleColor = e.target.value;
                                    updateSlides(newSlides);
                                  }}
                                  className="w-6 h-6 rounded border border-slate-700 bg-transparent cursor-pointer"
                                />
                                <span className="text-[10px] text-slate-300 font-mono">{slide.titleColor || '#0f172a'}</span>
                              </div>
                            </div>

                            <div>
                              <span className="block text-[10px] text-slate-400 mb-1">Subtitle Color</span>
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="color"
                                  value={slide.subtitleColor || '#334155'}
                                  onChange={(e) => {
                                    const newSlides = [...data.slides];
                                    newSlides[index].subtitleColor = e.target.value;
                                    updateSlides(newSlides);
                                  }}
                                  className="w-6 h-6 rounded border border-slate-700 bg-transparent cursor-pointer"
                                />
                                <span className="text-[10px] text-slate-300 font-mono">{slide.subtitleColor || '#334155'}</span>
                              </div>
                            </div>

                            <div>
                              <span className="block text-[10px] text-slate-400 mb-1">Button Color</span>
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="color"
                                  value={slide.ctaBgColor || '#2563eb'}
                                  onChange={(e) => {
                                    const newSlides = [...data.slides];
                                    newSlides[index].ctaBgColor = e.target.value;
                                    updateSlides(newSlides);
                                  }}
                                  className="w-6 h-6 rounded border border-slate-700 bg-transparent cursor-pointer"
                                />
                                <span className="text-[10px] text-slate-300 font-mono">{slide.ctaBgColor || '#2563eb'}</span>
                              </div>
                            </div>

                            <div>
                              <span className="block text-[10px] text-slate-400 mb-1">Backdrop Overlay</span>
                              <select
                                value={slide.overlayTint || 'light'}
                                onChange={(e) => {
                                  const newSlides = [...data.slides];
                                  newSlides[index].overlayTint = e.target.value as any;
                                  updateSlides(newSlides);
                                }}
                                className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-[10px] text-white"
                              >
                                <option value="light">Light Frost</option>
                                <option value="dark">Dark Vignette</option>
                                <option value="gradient">Gradient Soft</option>
                                <option value="glass">Glass Blur</option>
                                <option value="none">None (Clean)</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: THEME & COLOR STUDIO */}
              {activeTab === 'navigation' && <NavigationManager />}

              {activeTab === 'colors' && (
                <div className="space-y-6">
                  <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Palette className="w-5 h-5 text-amber-400" />
                        CMS Theme & Color Studio
                      </h3>
                      <p className="text-xs text-slate-400">
                        Customize global brand colors, hero slide typography, CTA button styling, and backdrop overlays.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const currentTheme = data.themeConfig || defaultThemeConfig;
                          const updatedSlides = data.slides.map((s) => ({
                            ...s,
                            accentColor: currentTheme.heroTagColor,
                            tagColor: currentTheme.heroTagColor,
                            titleColor: currentTheme.heroTitleColor,
                            subtitleColor: currentTheme.heroSubtitleColor,
                            ctaBgColor: currentTheme.heroButtonBgColor,
                            ctaTextColor: currentTheme.heroButtonTextColor,
                            overlayTint: currentTheme.heroOverlayStyle,
                          }));
                          updateSlides(updatedSlides);
                          showToast('Theme colors applied across all slides!');
                        }}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Apply to All Slides</span>
                      </button>

                      <button
                        onClick={() => {
                          updateThemeConfig(defaultThemeConfig);
                          showToast('Reset theme to default IP3 palette.');
                        }}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset Colors</span>
                      </button>
                    </div>
                  </div>

                  {/* Active Site Appearance (Locked Sovereign Dark Mode) */}
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                          Active Site Theme Mode
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          The platform is styled in sovereign executive dark mode.
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-sky-400">
                        <Moon className="w-3.5 h-3.5" />
                        <span>Sovereign Dark</span>
                      </div>
                    </div>
                  </div>

                  {/* Preset Color Palettes */}
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Quick Preset Color Palettes
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                      {[
                        {
                          name: 'IP3 Classic Cobalt',
                          primary: '#2563eb',
                          accent: '#0284c7',
                          tag: '#2563eb',
                          title: '#0f172a',
                          subtitle: '#334155',
                          btnBg: '#2563eb',
                          btnText: '#ffffff',
                          overlay: 'light' as const,
                          swatch: ['#2563eb', '#0284c7', '#0f172a'],
                        },
                        {
                          name: 'Emerald Climate',
                          primary: '#059669',
                          accent: '#10b981',
                          tag: '#059669',
                          title: '#064e3b',
                          subtitle: '#065f46',
                          btnBg: '#059669',
                          btnText: '#ffffff',
                          overlay: 'light' as const,
                          swatch: ['#059669', '#10b981', '#064e3b'],
                        },
                        {
                          name: 'Royal Navy & Gold',
                          primary: '#1e3a8a',
                          accent: '#d97706',
                          tag: '#d97706',
                          title: '#0f172a',
                          subtitle: '#1e293b',
                          btnBg: '#1e3a8a',
                          btnText: '#ffffff',
                          overlay: 'light' as const,
                          swatch: ['#1e3a8a', '#d97706', '#0f172a'],
                        },
                        {
                          name: 'Modern Cyber Violet',
                          primary: '#7c3aed',
                          accent: '#a855f7',
                          tag: '#7c3aed',
                          title: '#1e1b4b',
                          subtitle: '#312e81',
                          btnBg: '#7c3aed',
                          btnText: '#ffffff',
                          overlay: 'light' as const,
                          swatch: ['#7c3aed', '#a855f7', '#1e1b4b'],
                        },
                        {
                          name: 'Sovereign Obsidian',
                          primary: '#3b82f6',
                          accent: '#60a5fa',
                          tag: '#60a5fa',
                          title: '#ffffff',
                          subtitle: '#cbd5e1',
                          btnBg: '#3b82f6',
                          btnText: '#ffffff',
                          overlay: 'dark' as const,
                          swatch: ['#0f172a', '#3b82f6', '#ffffff'],
                        },
                        {
                          name: 'Executive Crimson',
                          primary: '#dc2626',
                          accent: '#f87171',
                          tag: '#dc2626',
                          title: '#450a0a',
                          subtitle: '#7f1d1d',
                          btnBg: '#dc2626',
                          btnText: '#ffffff',
                          overlay: 'light' as const,
                          swatch: ['#dc2626', '#f87171', '#450a0a'],
                        },
                      ].map((preset) => (
                        <button
                          key={preset.name}
                          onClick={() => {
                            const newTheme: SiteThemeConfig = {
                              primaryColor: preset.primary,
                              accentColor: preset.accent,
                              heroTagColor: preset.tag,
                              heroTitleColor: preset.title,
                              heroSubtitleColor: preset.subtitle,
                              heroButtonBgColor: preset.btnBg,
                              heroButtonTextColor: preset.btnText,
                              heroOverlayStyle: preset.overlay,
                            };
                            updateThemeConfig(newTheme);
                            showToast(`Loaded palette: ${preset.name}`);
                          }}
                          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 text-left transition-all hover:scale-[1.02] cursor-pointer group"
                        >
                          <div className="flex items-center gap-1 mb-1.5">
                            {preset.swatch.map((c, i) => (
                              <span
                                key={i}
                                className="w-3.5 h-3.5 rounded-full border border-white/20"
                                style={{ backgroundColor: c }}
                              />
                            ))}
                          </div>
                          <span className="text-[11px] font-bold text-slate-200 block truncate group-hover:text-blue-400">
                            {preset.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Individual Color Control Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Hero Typography Colors */}
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-2">
                        Hero Text & Typography Colors
                      </h4>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1">
                            Headline Title Color
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={data.themeConfig?.heroTitleColor || '#0f172a'}
                              onChange={(e) =>
                                updateThemeConfig({
                                  ...(data.themeConfig || defaultThemeConfig),
                                  heroTitleColor: e.target.value,
                                })
                              }
                              className="w-9 h-9 rounded-lg border border-slate-700 bg-transparent cursor-pointer"
                            />
                            <input
                              type="text"
                              value={data.themeConfig?.heroTitleColor || '#0f172a'}
                              onChange={(e) =>
                                updateThemeConfig({
                                  ...(data.themeConfig || defaultThemeConfig),
                                  heroTitleColor: e.target.value,
                                })
                              }
                              className="w-32 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white"
                            />
                            <span className="text-[11px] text-slate-400">Main slide headline text</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1">
                            Subtitle / Body Color
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={data.themeConfig?.heroSubtitleColor || '#334155'}
                              onChange={(e) =>
                                updateThemeConfig({
                                  ...(data.themeConfig || defaultThemeConfig),
                                  heroSubtitleColor: e.target.value,
                                })
                              }
                              className="w-9 h-9 rounded-lg border border-slate-700 bg-transparent cursor-pointer"
                            />
                            <input
                              type="text"
                              value={data.themeConfig?.heroSubtitleColor || '#334155'}
                              onChange={(e) =>
                                updateThemeConfig({
                                  ...(data.themeConfig || defaultThemeConfig),
                                  heroSubtitleColor: e.target.value,
                                })
                              }
                              className="w-32 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white"
                            />
                            <span className="text-[11px] text-slate-400">Supporting description</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1">
                            Category Pill & Tag Accent Color
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={data.themeConfig?.heroTagColor || '#2563eb'}
                              onChange={(e) =>
                                updateThemeConfig({
                                  ...(data.themeConfig || defaultThemeConfig),
                                  heroTagColor: e.target.value,
                                })
                              }
                              className="w-9 h-9 rounded-lg border border-slate-700 bg-transparent cursor-pointer"
                            />
                            <input
                              type="text"
                              value={data.themeConfig?.heroTagColor || '#2563eb'}
                              onChange={(e) =>
                                updateThemeConfig({
                                  ...(data.themeConfig || defaultThemeConfig),
                                  heroTagColor: e.target.value,
                                })
                              }
                              className="w-32 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white"
                            />
                            <span className="text-[11px] text-slate-400">Section indicator bar & tag</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button & Overlay Styling */}
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-2">
                        Hero CTA Button & Backdrop Filter
                      </h4>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1">
                            CTA Button Background Color
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={data.themeConfig?.heroButtonBgColor || '#2563eb'}
                              onChange={(e) =>
                                updateThemeConfig({
                                  ...(data.themeConfig || defaultThemeConfig),
                                  heroButtonBgColor: e.target.value,
                                })
                              }
                              className="w-9 h-9 rounded-lg border border-slate-700 bg-transparent cursor-pointer"
                            />
                            <input
                              type="text"
                              value={data.themeConfig?.heroButtonBgColor || '#2563eb'}
                              onChange={(e) =>
                                updateThemeConfig({
                                  ...(data.themeConfig || defaultThemeConfig),
                                  heroButtonBgColor: e.target.value,
                                })
                              }
                              className="w-32 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white"
                            />
                            <span className="text-[11px] text-slate-400">Primary action button</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1">
                            CTA Button Text Color
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={data.themeConfig?.heroButtonTextColor || '#ffffff'}
                              onChange={(e) =>
                                updateThemeConfig({
                                  ...(data.themeConfig || defaultThemeConfig),
                                  heroButtonTextColor: e.target.value,
                                })
                              }
                              className="w-9 h-9 rounded-lg border border-slate-700 bg-transparent cursor-pointer"
                            />
                            <input
                              type="text"
                              value={data.themeConfig?.heroButtonTextColor || '#ffffff'}
                              onChange={(e) =>
                                updateThemeConfig({
                                  ...(data.themeConfig || defaultThemeConfig),
                                  heroButtonTextColor: e.target.value,
                                })
                              }
                              className="w-32 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white"
                            />
                            <span className="text-[11px] text-slate-400">Button label font color</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1">
                            Hero Background Overlay Tint
                          </label>
                          <select
                            value={data.themeConfig?.heroOverlayStyle || 'light'}
                            onChange={(e) =>
                              updateThemeConfig({
                                ...(data.themeConfig || defaultThemeConfig),
                                heroOverlayStyle: e.target.value as any,
                              })
                            }
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                          >
                            <option value="light">Light Frost (Optimal for dark text on bright images)</option>
                            <option value="dark">Dark Cinematic Vignette (Great for white/neon text)</option>
                            <option value="gradient">Soft Left-to-Right White Gradient</option>
                            <option value="glass">Subtle Glassmorphism Blur</option>
                            <option value="none">None (Clean Raw Photography)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Live Hero Color Preview Box */}
                  <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Live Color Simulation Preview
                    </h4>
                    <div className="p-6 rounded-xl border border-slate-800 bg-slate-100 relative overflow-hidden">
                      <div className="max-w-md space-y-3">
                        <div className="flex items-center gap-3">
                          <span
                            className="h-[2px] w-8"
                            style={{ backgroundColor: data.themeConfig?.heroTagColor || '#2563eb' }}
                          />
                          <span
                            className="text-[11px] font-bold uppercase tracking-widest"
                            style={{ color: data.themeConfig?.heroTagColor || '#2563eb' }}
                          >
                            Section 1 — Overview
                          </span>
                        </div>

                        <h3
                          className="text-2xl font-bold font-sans tracking-tight"
                          style={{ color: data.themeConfig?.heroTitleColor || '#0f172a' }}
                        >
                          {data.slides[0]?.title || 'Institutional Strategy Framework'}
                        </h3>

                        <p
                          className="text-xs font-sans leading-relaxed"
                          style={{ color: data.themeConfig?.heroSubtitleColor || '#334155' }}
                        >
                          {data.slides[0]?.subtitle ||
                            'Delivering systemic architecture and advisory for global infrastructure.'}
                        </p>

                        <div className="pt-1">
                          <span
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold shadow-md"
                            style={{
                              backgroundColor: data.themeConfig?.heroButtonBgColor || '#2563eb',
                              color: data.themeConfig?.heroButtonTextColor || '#ffffff',
                            }}
                          >
                            <span>Get Started</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: CINEMATIC INTRO REEL */}
              {activeTab === 'movie' && (
                <div className="space-y-6">
                  <div className="border-b border-slate-800 pb-4">
                    <h3 className="text-lg font-bold text-white">Cinematic Intro Reel & Showcase</h3>
                    <p className="text-xs text-slate-400">Edit the intro documentary reel titles, story synopsis, and media assets</p>
                  </div>

                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Main Movie / Reel Title</label>
                        <input
                          type="text"
                          value={data.movie.title}
                          onChange={(e) => updateMovie({ ...data.movie, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Release Year</label>
                        <input
                          type="text"
                          value={data.movie.releaseYear}
                          onChange={(e) => updateMovie({ ...data.movie, releaseYear: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-slate-400 mb-1">Subtitle / Tagline</label>
                        <input
                          type="text"
                          value={data.movie.subtitle || ''}
                          onChange={(e) => updateMovie({ ...data.movie, subtitle: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-slate-400 mb-1">Story / Synopsis</label>
                        <textarea
                          rows={3}
                          value={data.movie.story}
                          onChange={(e) => updateMovie({ ...data.movie, story: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-slate-400 mb-1">Featured Quote</label>
                        <input
                          type="text"
                          value={data.movie.quote || ''}
                          onChange={(e) => updateMovie({ ...data.movie, quote: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <ImageField
                          label="Backdrop Image (URL or Upload File)"
                          value={data.movie.backdropUrl}
                          onChange={(val) => updateMovie({ ...data.movie, backdropUrl: val })}
                        />
                      </div>

                      <div className="sm:col-span-2 p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                              <Film className="w-3.5 h-3.5" />
                              Official Trailer Video Media Source
                            </span>
                            <p className="text-[11px] text-slate-400">
                              Upload an MP4 to the CDN, or paste a direct video stream URL. The
                              player reads whatever URL is stored here.
                            </p>
                          </div>
                          {data.movie.videoUrl && (
                            <button
                              type="button"
                              onClick={() => updateMovie({ ...data.movie, videoUrl: '' })}
                              className="text-[10px] text-rose-400 hover:text-rose-300 font-mono underline cursor-pointer"
                            >
                              Reset / Clear Video
                            </button>
                          )}
                        </div>

                        <div className="pt-1">
                          <MediaField
                            kind="video"
                            folder="trailer"
                            label="Trailer Video (MP4 / WebM — uploaded to the CDN)"
                            placeholder="https://res.cloudinary.com/…/trailer.mp4"
                            value={data.movie.videoUrl || ''}
                            onChange={(val) => updateMovie({ ...data.movie, videoUrl: val })}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Trailer YouTube Video ID (Optional)</label>
                        <input
                          type="text"
                          value={data.movie.trailerYoutubeId || ''}
                          onChange={(e) => updateMovie({ ...data.movie, trailerYoutubeId: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Director / Chair</label>
                        <input
                          type="text"
                          value={data.movie.director}
                          onChange={(e) => updateMovie({ ...data.movie, director: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Awards & Recognition</label>
                        <input
                          type="text"
                          value={data.movie.awards || ''}
                          onChange={(e) => updateMovie({ ...data.movie, awards: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: CLIENTS & PARTNERS MARQUEE */}
              {activeTab === 'trustMatrix' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">Clients & Strategic Partners Marquee</h3>
                      <p className="text-xs text-slate-400">Manage client logos, partner emblems, and infinite marquee scroll velocity</p>
                    </div>
                    <button
                      onClick={() => {
                        const current = data.trustMatrix || defaultTrustMatrix;
                        const newBrand: PartnerBrandItem = {
                          id: `partner-${Date.now()}`,
                          name: 'New Partner Organization',
                          logoUrl: 'https://api.iconify.design/lucide:building.svg',
                          category: 'Partner',
                          description: 'Strategic Institutional Partner',
                        };
                        updateTrustMatrix({
                          ...current,
                          brands: [...(current.brands || []), newBrand],
                        });
                        showToast('New partner brand added!');
                      }}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 shadow-lg shadow-emerald-600/20"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Partner Brand</span>
                    </button>
                  </div>

                  {/* General Marquee Settings */}
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Section Heading & Velocity Settings</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Section Badge</label>
                        <input
                          type="text"
                          value={data.trustMatrix?.sectionBadge || ''}
                          onChange={(e) => {
                            const current = data.trustMatrix || defaultTrustMatrix;
                            updateTrustMatrix({ ...current, sectionBadge: e.target.value });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                          placeholder="Global Strategic Partners"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Section Main Title</label>
                        <input
                          type="text"
                          value={data.trustMatrix?.sectionTitle || ''}
                          onChange={(e) => {
                            const current = data.trustMatrix || defaultTrustMatrix;
                            updateTrustMatrix({ ...current, sectionTitle: e.target.value });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                          placeholder="Clients Who Trust Us"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">
                          Scroll Speed (Seconds: {data.trustMatrix?.scrollSpeed || 35}s)
                        </label>
                        <input
                          type="range"
                          min={15}
                          max={70}
                          step={5}
                          value={data.trustMatrix?.scrollSpeed || 35}
                          onChange={(e) => {
                            const current = data.trustMatrix || defaultTrustMatrix;
                            updateTrustMatrix({ ...current, scrollSpeed: Number(e.target.value) });
                          }}
                          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                        <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                          <span>Fast (15s)</span>
                          <span>Default (35s)</span>
                          <span>Slow (70s)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Partner Brand Items List */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Partner Brands ({data.trustMatrix?.brands?.length || defaultTrustMatrix.brands.length} Total)
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(data.trustMatrix?.brands || defaultTrustMatrix.brands).map((brand, bIdx) => (
                        <div key={brand.id || bIdx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 relative group">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 text-[11px] font-mono flex items-center justify-center font-bold">
                                {bIdx + 1}
                              </span>
                              <span className="text-xs font-bold text-white truncate max-w-[160px]">
                                {brand.name}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => {
                                  const current = data.trustMatrix || defaultTrustMatrix;
                                  const list = [...(current.brands || defaultTrustMatrix.brands)];
                                  if (bIdx > 0) {
                                    const temp = list[bIdx];
                                    list[bIdx] = list[bIdx - 1];
                                    list[bIdx - 1] = temp;
                                    updateTrustMatrix({ ...current, brands: list });
                                  }
                                }}
                                disabled={bIdx === 0}
                                className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-300 rounded disabled:opacity-30 cursor-pointer"
                                title="Move up"
                              >
                                ↑
                              </button>
                              <button
                                onClick={() => {
                                  const current = data.trustMatrix || defaultTrustMatrix;
                                  const list = [...(current.brands || defaultTrustMatrix.brands)];
                                  if (bIdx < list.length - 1) {
                                    const temp = list[bIdx];
                                    list[bIdx] = list[bIdx + 1];
                                    list[bIdx + 1] = temp;
                                    updateTrustMatrix({ ...current, brands: list });
                                  }
                                }}
                                disabled={bIdx === (data.trustMatrix?.brands?.length || defaultTrustMatrix.brands.length) - 1}
                                className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-300 rounded disabled:opacity-30 cursor-pointer"
                                title="Move down"
                              >
                                ↓
                              </button>
                              <button
                                onClick={() => {
                                  const current = data.trustMatrix || defaultTrustMatrix;
                                  const list = (current.brands || defaultTrustMatrix.brands).filter((_, i) => i !== bIdx);
                                  updateTrustMatrix({ ...current, brands: list });
                                  showToast('Partner brand removed.');
                                }}
                                className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
                                title="Delete partner"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] text-slate-400 mb-1">Brand / Entity Name</label>
                              <input
                                type="text"
                                value={brand.name}
                                onChange={(e) => {
                                  const current = data.trustMatrix || defaultTrustMatrix;
                                  const list = [...(current.brands || defaultTrustMatrix.brands)];
                                  list[bIdx] = { ...list[bIdx], name: e.target.value };
                                  updateTrustMatrix({ ...current, brands: list });
                                }}
                                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] text-slate-400 mb-1">Category / Tag</label>
                              <input
                                type="text"
                                value={brand.category || ''}
                                onChange={(e) => {
                                  const current = data.trustMatrix || defaultTrustMatrix;
                                  const list = [...(current.brands || defaultTrustMatrix.brands)];
                                  list[bIdx] = { ...list[bIdx], category: e.target.value };
                                  updateTrustMatrix({ ...current, brands: list });
                                }}
                                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                                placeholder="Port Authority / Multilateral"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-[11px] text-slate-400 mb-1">Description / Tooltip</label>
                              <input
                                type="text"
                                value={brand.description || ''}
                                onChange={(e) => {
                                  const current = data.trustMatrix || defaultTrustMatrix;
                                  const list = [...(current.brands || defaultTrustMatrix.brands)];
                                  list[bIdx] = { ...list[bIdx], description: e.target.value };
                                  updateTrustMatrix({ ...current, brands: list });
                                }}
                                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <ImageField
                                label="Brand Logo Emblem (URL or Upload Image)"
                                value={brand.logoUrl}
                                onChange={(val) => {
                                  const current = data.trustMatrix || defaultTrustMatrix;
                                  const list = [...(current.brands || defaultTrustMatrix.brands)];
                                  list[bIdx] = { ...list[bIdx], logoUrl: val };
                                  updateTrustMatrix({ ...current, brands: list });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: TREE FRAMEWORK */}
              {activeTab === 'tree' && (
                <div className="space-y-6">
                  <div className="border-b border-slate-800 pb-4">
                    <h3 className="text-lg font-bold text-white">Tree Framework (IP3 Policy Architecture)</h3>
                    <p className="text-xs text-slate-400">Edit Roots, Trunk, and 4 Policy Branch nodes on the Tree diagram</p>
                  </div>

                  {/* Section Headings */}
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                    <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider">Section Header & Overview</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Section Badge</label>
                        <input
                          type="text"
                          value={data.treeFramework?.sectionBadge || ''}
                          onChange={(e) => {
                            const current = data.treeFramework || defaultTreeFramework;
                            updateTreeFramework({ ...current, sectionBadge: e.target.value });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-slate-400 mb-1">Section Title</label>
                        <input
                          type="text"
                          value={data.treeFramework?.sectionTitle || ''}
                          onChange={(e) => {
                            const current = data.treeFramework || defaultTreeFramework;
                            updateTreeFramework({ ...current, sectionTitle: e.target.value });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-xs font-medium text-slate-400 mb-1">Section Subtitle</label>
                        <textarea
                          rows={2}
                          value={data.treeFramework?.sectionSubtitle || ''}
                          onChange={(e) => {
                            const current = data.treeFramework || defaultTreeFramework;
                            updateTreeFramework({ ...current, sectionSubtitle: e.target.value });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Trunk & Roots Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Trunk */}
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                      <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Trunk: Core Operational Engine</h4>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Headline</label>
                        <input
                          type="text"
                          value={data.treeFramework?.trunkHeadline || ''}
                          onChange={(e) => {
                            const current = data.treeFramework || defaultTreeFramework;
                            updateTreeFramework({ ...current, trunkHeadline: e.target.value });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Summary Description</label>
                        <textarea
                          rows={3}
                          value={data.treeFramework?.trunkSummary || ''}
                          onChange={(e) => {
                            const current = data.treeFramework || defaultTreeFramework;
                            updateTreeFramework({ ...current, trunkSummary: e.target.value });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>

                    {/* Roots */}
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                      <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Roots: Foundational Underpinnings</h4>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Headline</label>
                        <input
                          type="text"
                          value={data.treeFramework?.rootsHeadline || ''}
                          onChange={(e) => {
                            const current = data.treeFramework || defaultTreeFramework;
                            updateTreeFramework({ ...current, rootsHeadline: e.target.value });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Summary Description</label>
                        <textarea
                          rows={3}
                          value={data.treeFramework?.rootsSummary || ''}
                          onChange={(e) => {
                            const current = data.treeFramework || defaultTreeFramework;
                            updateTreeFramework({ ...current, rootsSummary: e.target.value });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 4 Branches */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      The 4 Framework Branches (Leaves / Impact Areas)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(data.treeFramework?.branches || defaultTreeFramework.branches).map((branch, brIdx) => (
                        <div key={branch.id || brIdx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-sky-400">Branch #{brIdx + 1}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                              {branch.badge}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] text-slate-400 mb-1">Badge</label>
                              <input
                                type="text"
                                value={branch.badge}
                                onChange={(e) => {
                                  const current = data.treeFramework || defaultTreeFramework;
                                  const list = [...(current.branches || defaultTreeFramework.branches)];
                                  list[brIdx] = { ...list[brIdx], badge: e.target.value };
                                  updateTreeFramework({ ...current, branches: list });
                                }}
                                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] text-slate-400 mb-1">Title</label>
                              <input
                                type="text"
                                value={branch.title}
                                onChange={(e) => {
                                  const current = data.treeFramework || defaultTreeFramework;
                                  const list = [...(current.branches || defaultTreeFramework.branches)];
                                  list[brIdx] = { ...list[brIdx], title: e.target.value };
                                  updateTreeFramework({ ...current, branches: list });
                                }}
                                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[11px] text-slate-400 mb-1">Subtitle</label>
                              <input
                                type="text"
                                value={branch.subtitle}
                                onChange={(e) => {
                                  const current = data.treeFramework || defaultTreeFramework;
                                  const list = [...(current.branches || defaultTreeFramework.branches)];
                                  list[brIdx] = { ...list[brIdx], subtitle: e.target.value };
                                  updateTreeFramework({ ...current, branches: list });
                                }}
                                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[11px] text-slate-400 mb-1">Description</label>
                              <textarea
                                rows={2}
                                value={branch.desc}
                                onChange={(e) => {
                                  const current = data.treeFramework || defaultTreeFramework;
                                  const list = [...(current.branches || defaultTreeFramework.branches)];
                                  list[brIdx] = { ...list[brIdx], desc: e.target.value };
                                  updateTreeFramework({ ...current, branches: list });
                                }}
                                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[11px] text-slate-400 mb-1">Leaf Items (Comma-separated)</label>
                              <input
                                type="text"
                                value={(branch.leaves || []).join(', ')}
                                onChange={(e) => {
                                  const current = data.treeFramework || defaultTreeFramework;
                                  const list = [...(current.branches || defaultTreeFramework.branches)];
                                  list[brIdx] = {
                                    ...list[brIdx],
                                    leaves: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                                  };
                                  updateTreeFramework({ ...current, branches: list });
                                }}
                                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: TESTIMONIALS & ENDORSEMENTS */}
              {activeTab === 'testimonials' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">Institutional Endorsements & Testimonials</h3>
                      <p className="text-xs text-slate-400">Manage executive testimonials, client quotes, partner headshots, and badges</p>
                    </div>
                    <button
                      onClick={() => {
                        const current = data.testimonialsSection || defaultTestimonialsSection;
                        const newTestimonial: TestimonialItem = {
                          id: `testimonial-${Date.now()}`,
                          quote: '"IP3 advisory and institutional strategic models provided actionable frameworks that delivered measurable outcomes across our programs."',
                          authorName: 'New Partner Executive',
                          authorTitle: 'Executive Director / Senior Advisor',
                          organization: 'Global Infrastructure & Development Agency',
                          photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
                          logoUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><circle cx='60' cy='60' r='50' fill='%230f172a' stroke='%233b82f6' stroke-width='6'/></svg>",
                        };
                        updateTestimonialsSection({
                          ...current,
                          items: [...(current.items || defaultTestimonialsSection.items), newTestimonial],
                        });
                        showToast('New testimonial added!');
                      }}
                      className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 shadow-lg shadow-amber-600/20"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Testimonial</span>
                    </button>
                  </div>

                  {/* Section Headings */}
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Section Header Settings</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Section Badge</label>
                        <input
                          type="text"
                          value={data.testimonialsSection?.sectionBadge || ''}
                          onChange={(e) => {
                            const current = data.testimonialsSection || defaultTestimonialsSection;
                            updateTestimonialsSection({ ...current, sectionBadge: e.target.value });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-slate-400 mb-1">Section Title</label>
                        <input
                          type="text"
                          value={data.testimonialsSection?.sectionTitle || ''}
                          onChange={(e) => {
                            const current = data.testimonialsSection || defaultTestimonialsSection;
                            updateTestimonialsSection({ ...current, sectionTitle: e.target.value });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-xs font-medium text-slate-400 mb-1">Section Subtitle</label>
                        <textarea
                          rows={2}
                          value={data.testimonialsSection?.sectionSubtitle || ''}
                          onChange={(e) => {
                            const current = data.testimonialsSection || defaultTestimonialsSection;
                            updateTestimonialsSection({ ...current, sectionSubtitle: e.target.value });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Testimonial Cards */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Testimonial Endorsement Cards ({(data.testimonialsSection?.items || defaultTestimonialsSection.items).length} Total)
                    </h4>

                    <div className="space-y-4">
                      {(data.testimonialsSection?.items || defaultTestimonialsSection.items).map((item, tIdx) => (
                        <div key={item.id || tIdx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-amber-400">Testimonial #{tIdx + 1} — {item.authorName}</span>
                            <button
                              onClick={() => {
                                const current = data.testimonialsSection || defaultTestimonialsSection;
                                const list = (current.items || defaultTestimonialsSection.items).filter((_, i) => i !== tIdx);
                                updateTestimonialsSection({ ...current, items: list });
                                showToast('Testimonial removed.');
                              }}
                              className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[11px] text-slate-400 mb-1">Author Name</label>
                              <input
                                type="text"
                                value={item.authorName}
                                onChange={(e) => {
                                  const current = data.testimonialsSection || defaultTestimonialsSection;
                                  const list = [...(current.items || defaultTestimonialsSection.items)];
                                  list[tIdx] = { ...list[tIdx], authorName: e.target.value };
                                  updateTestimonialsSection({ ...current, items: list });
                                }}
                                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] text-slate-400 mb-1">Author Title / Role</label>
                              <input
                                type="text"
                                value={item.authorTitle}
                                onChange={(e) => {
                                  const current = data.testimonialsSection || defaultTestimonialsSection;
                                  const list = [...(current.items || defaultTestimonialsSection.items)];
                                  list[tIdx] = { ...list[tIdx], authorTitle: e.target.value };
                                  updateTestimonialsSection({ ...current, items: list });
                                }}
                                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] text-slate-400 mb-1">Organization</label>
                              <input
                                type="text"
                                value={item.organization}
                                onChange={(e) => {
                                  const current = data.testimonialsSection || defaultTestimonialsSection;
                                  const list = [...(current.items || defaultTestimonialsSection.items)];
                                  list[tIdx] = { ...list[tIdx], organization: e.target.value };
                                  updateTestimonialsSection({ ...current, items: list });
                                }}
                                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                              />
                            </div>

                            <div className="sm:col-span-3">
                              <label className="block text-[11px] text-slate-400 mb-1">Quote Statement</label>
                              <textarea
                                rows={3}
                                value={item.quote}
                                onChange={(e) => {
                                  const current = data.testimonialsSection || defaultTestimonialsSection;
                                  const list = [...(current.items || defaultTestimonialsSection.items)];
                                  list[tIdx] = { ...list[tIdx], quote: e.target.value };
                                  updateTestimonialsSection({ ...current, items: list });
                                }}
                                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <ImageField
                                label="Author Headshot Photo (URL or Upload Image)"
                                value={item.photoUrl}
                                onChange={(val) => {
                                  const current = data.testimonialsSection || defaultTestimonialsSection;
                                  const list = [...(current.items || defaultTestimonialsSection.items)];
                                  list[tIdx] = { ...list[tIdx], photoUrl: val };
                                  updateTestimonialsSection({ ...current, items: list });
                                }}
                              />
                            </div>

                            <div>
                              <ImageField
                                label="Organization Logo"
                                value={item.logoUrl}
                                onChange={(val) => {
                                  const current = data.testimonialsSection || defaultTestimonialsSection;
                                  const list = [...(current.items || defaultTestimonialsSection.items)];
                                  list[tIdx] = { ...list[tIdx], logoUrl: val };
                                  updateTestimonialsSection({ ...current, items: list });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: EXECUTIVE & PILLARS */}
              {activeTab === 'executive' && (
                <div className="space-y-6">
                  <div className="border-b border-slate-800 pb-4">
                    <h3 className="text-lg font-bold text-white">Executive Profile & Impact Pillars</h3>
                    <p className="text-xs text-slate-400">Edit the Executive Chairman message and strategic pillars</p>
                  </div>

                  {/* Executive Info Form */}
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                    <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Executive Leader Profile</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Executive Name</label>
                        <input
                          type="text"
                          value={data.executive.name}
                          onChange={(e) => updateExecutive({ ...data.executive, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Title</label>
                        <input
                          type="text"
                          value={data.executive.title}
                          onChange={(e) => updateExecutive({ ...data.executive, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Organization</label>
                        <input
                          type="text"
                          value={data.executive.organization}
                          onChange={(e) => updateExecutive({ ...data.executive, organization: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Email Address</label>
                        <input
                          type="email"
                          value={data.executive.email}
                          onChange={(e) => updateExecutive({ ...data.executive, email: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <ImageField
                          label="Headshot Image (URL or Upload File)"
                          value={data.executive.image}
                          onChange={(val) => updateExecutive({ ...data.executive, image: val })}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-slate-400 mb-1">Headline</label>
                        <input
                          type="text"
                          value={data.executive.headline}
                          onChange={(e) => updateExecutive({ ...data.executive, headline: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      {data.executive.paragraphs.map((para, pIdx) => (
                        <div key={pIdx} className="sm:col-span-2">
                          <label className="block text-xs font-medium text-slate-400 mb-1">Message Paragraph {pIdx + 1}</label>
                          <textarea
                            rows={3}
                            value={para}
                            onChange={(e) => {
                              const newParas = [...data.executive.paragraphs];
                              newParas[pIdx] = e.target.value;
                              updateExecutive({ ...data.executive, paragraphs: newParas });
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                          />
                        </div>
                      ))}

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-slate-400 mb-1">Closing Statement</label>
                        <input
                          type="text"
                          value={data.executive.closingStatement}
                          onChange={(e) => updateExecutive({ ...data.executive, closingStatement: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Impact Pillars Editor */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-white">Impact Pillars</h4>
                    {data.impactPillars.map((pillar, pIndex) => (
                      <div key={pillar.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
                          <span className="text-xs font-bold text-amber-400 uppercase">Pillar #{pIndex + 1}: {pillar.title}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">Title</label>
                            <input
                              type="text"
                              value={pillar.title}
                              onChange={(e) => {
                                const newPillars = [...data.impactPillars];
                                newPillars[pIndex].title = e.target.value;
                                updateImpactPillars(newPillars);
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">Tagline</label>
                            <input
                              type="text"
                              value={pillar.tagline}
                              onChange={(e) => {
                                const newPillars = [...data.impactPillars];
                                newPillars[pIndex].tagline = e.target.value;
                                updateImpactPillars(newPillars);
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-xs font-medium text-slate-400 mb-1">Description</label>
                            <textarea
                              rows={2}
                              value={pillar.description}
                              onChange={(e) => {
                                const newPillars = [...data.impactPillars];
                                newPillars[pIndex].description = e.target.value;
                                updateImpactPillars(newPillars);
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: TEAM & LEADERSHIP */}
              {activeTab === 'team' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">Team & Expert Leadership</h3>
                      <p className="text-xs text-slate-400">Manage expert directors, researchers, and specialists</p>
                    </div>
                    <button
                      onClick={() => {
                        const newMember: TeamMember = {
                          id: `m-${Date.now()}`,
                          name: 'New Senior Associate',
                          role: 'Policy Consultant',
                          division: 'Advisory & Strategy',
                          expertise: ['Public Policy', 'Strategy'],
                          education: ['M.A. Public Administration'],
                          bio: 'Expert in strategic policy reform and advisory execution.',
                          projects: ['Institutional Growth Framework'],
                          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
                          socials: { email: 'consultant@ip3-bd.org' },
                          stats: { experienceYears: 10, projectsLed: 15, publications: 8 },
                        };
                        updateTeamMembers([...data.teamMembers, newMember]);
                        showToast('New team member added!');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Team Member</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {data.teamMembers.map((member, mIdx) => (
                      <div key={member.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
                          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                            {member.name} — {member.role}
                          </span>
                          <button
                            onClick={() => {
                              updateTeamMembers(data.teamMembers.filter((tm) => tm.id !== member.id));
                              showToast('Team member deleted.');
                            }}
                            className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                            title="Delete Team Member"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">Full Name</label>
                            <input
                              type="text"
                              value={member.name}
                              onChange={(e) => {
                                const newTeam = [...data.teamMembers];
                                newTeam[mIdx].name = e.target.value;
                                updateTeamMembers(newTeam);
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">Role / Designation</label>
                            <input
                              type="text"
                              value={member.role}
                              onChange={(e) => {
                                const newTeam = [...data.teamMembers];
                                newTeam[mIdx].role = e.target.value;
                                updateTeamMembers(newTeam);
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">Division</label>
                            <select
                              value={member.division}
                              onChange={(e) => {
                                const newTeam = [...data.teamMembers];
                                newTeam[mIdx].division = e.target.value as any;
                                updateTeamMembers(newTeam);
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                            >
                              <option value="Advisory & Strategy">Advisory & Strategy</option>
                              <option value="Research & Analysis">Research & Analysis</option>
                              <option value="Public Health & Social">Public Health & Social</option>
                              <option value="Operations & Tech">Operations & Tech</option>
                            </select>
                          </div>

                          <div>
                            <ImageField
                              label="Photo Image (URL or Upload File)"
                              value={member.image}
                              onChange={(val) => {
                                const newTeam = [...data.teamMembers];
                                newTeam[mIdx].image = val;
                                updateTeamMembers(newTeam);
                              }}
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-xs font-medium text-slate-400 mb-1">Biography</label>
                            <textarea
                              rows={2}
                              value={member.bio}
                              onChange={(e) => {
                                const newTeam = [...data.teamMembers];
                                newTeam[mIdx].bio = e.target.value;
                                updateTeamMembers(newTeam);
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: SERVICES & CONTACT INFO */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <span>Solutions Matrix & Advisory Services</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#ff7e67]/20 border border-[#ff7e67]/30 text-[#ff7e67]">
                          #services / #solution
                        </span>
                      </h3>
                      <p className="text-xs text-slate-400">
                        Full live CMS control for the Solutions Matrix section (titles, tags, icons, descriptions, deliverables, methodology, case studies & images)
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const current = data.serviceSolutions || [];
                        const newSol: ServiceSolutionItem = {
                          id: `sol-${Date.now()}`,
                          title: 'New Advisory Solution',
                          shortTag: 'Advisory & Reform',
                          iconName: 'Compass',
                          description: 'Strategic advisory and empirical methodology crafted for institutional transformation.',
                          deliverables: [
                            'Analytical Framework Report',
                            'Implementation Roadmap',
                            'Stakeholder Engagement Blueprint',
                            'Compliance & Verification Matrix',
                          ],
                          methodology: 'Integrated qualitative and quantitative systems dynamics modeling.',
                          caseStudyHighlight: 'Delivered institutional advisory and policy guidance for national partners.',
                          imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000',
                        };
                        updateServiceSolutions([...current, newSol]);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-[#ff7e67] hover:bg-[#e06a54] text-slate-900 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#ff7e67]/20 cursor-pointer self-start sm:self-auto"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Solution Item</span>
                    </button>
                  </div>

                  {/* Solutions Matrix List Editor */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-emerald-400">
                        Integrated Solutions Matrix Items ({(data.serviceSolutions || []).length})
                      </h4>
                    </div>

                    {(data.serviceSolutions || []).map((srv, sIdx) => (
                      <div key={srv.id || sIdx} className="p-4 sm:p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-4 relative">
                        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-[#ff7e67] px-2 py-0.5 rounded bg-[#ff7e67]/10 border border-[#ff7e67]/20">
                              Solution 0{sIdx + 1}
                            </span>
                            <span className="text-xs font-bold text-slate-200 truncate max-w-[200px] sm:max-w-md">
                              {srv.title || 'Untitled Solution'}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              const updated = [...(data.serviceSolutions || [])];
                              updated.splice(sIdx, 1);
                              updateServiceSolutions(updated);
                            }}
                            className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
                            title="Delete Solution"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          <div className="sm:col-span-2">
                            <label className="block text-xs font-medium text-slate-400 mb-1">Title</label>
                            <input
                              type="text"
                              value={srv.title}
                              onChange={(e) => {
                                const updated = [...(data.serviceSolutions || [])];
                                updated[sIdx].title = e.target.value;
                                updateServiceSolutions(updated);
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">Short Tag / Badge</label>
                            <input
                              type="text"
                              value={srv.shortTag}
                              onChange={(e) => {
                                const updated = [...(data.serviceSolutions || [])];
                                updated[sIdx].shortTag = e.target.value;
                                updateServiceSolutions(updated);
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">Icon Name</label>
                            <select
                              value={srv.iconName}
                              onChange={(e) => {
                                const updated = [...(data.serviceSolutions || [])];
                                updated[sIdx].iconName = e.target.value;
                                updateServiceSolutions(updated);
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                            >
                              <option value="Compass">Compass</option>
                              <option value="SunMedium">SunMedium (Climate/ESG)</option>
                              <option value="Calculator">Calculator (Feasibility)</option>
                              <option value="Activity">Activity (MERLA)</option>
                              <option value="FileSpreadsheet">FileSpreadsheet (Survey)</option>
                              <option value="Leaf">Leaf</option>
                              <option value="GraduationCap">GraduationCap</option>
                              <option value="ShieldCheck">ShieldCheck</option>
                            </select>
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-xs font-medium text-slate-400 mb-1">Banner Image URL</label>
                            <input
                              type="text"
                              value={srv.imageUrl || ''}
                              onChange={(e) => {
                                const updated = [...(data.serviceSolutions || [])];
                                updated[sIdx].imageUrl = e.target.value;
                                updateServiceSolutions(updated);
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono text-[11px]"
                            />
                          </div>

                          <div className="sm:col-span-2 lg:col-span-3">
                            <label className="block text-xs font-medium text-slate-400 mb-1">Solution Description</label>
                            <textarea
                              rows={2}
                              value={srv.description}
                              onChange={(e) => {
                                const updated = [...(data.serviceSolutions || [])];
                                updated[sIdx].description = e.target.value;
                                updateServiceSolutions(updated);
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>

                          <div className="sm:col-span-2 lg:col-span-3">
                            <label className="block text-xs font-medium text-slate-400 mb-1">Analytical & Operational Methodology</label>
                            <textarea
                              rows={2}
                              value={srv.methodology}
                              onChange={(e) => {
                                const updated = [...(data.serviceSolutions || [])];
                                updated[sIdx].methodology = e.target.value;
                                updateServiceSolutions(updated);
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>

                          <div className="sm:col-span-2 lg:col-span-3">
                            <label className="block text-xs font-medium text-slate-400 mb-1">Verified Impact Benchmark / Case Study Highlight</label>
                            <input
                              type="text"
                              value={srv.caseStudyHighlight}
                              onChange={(e) => {
                                const updated = [...(data.serviceSolutions || [])];
                                updated[sIdx].caseStudyHighlight = e.target.value;
                                updateServiceSolutions(updated);
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>

                          <div className="sm:col-span-2 lg:col-span-3">
                            <label className="block text-xs font-medium text-slate-400 mb-1">
                              Deliverables (one per line)
                            </label>
                            <textarea
                              rows={3}
                              value={Array.isArray(srv.deliverables) ? srv.deliverables.join('\n') : ''}
                              onChange={(e) => {
                                const updated = [...(data.serviceSolutions || [])];
                                updated[sIdx].deliverables = e.target.value
                                  .split('\n')
                                  .map((item) => item.trim())
                                  .filter(Boolean);
                                updateServiceSolutions(updated);
                              }}
                              placeholder="Enter each deliverable on a new line"
                              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono text-[11px]"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Office Info Form */}
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-4 mt-8">
                    <h4 className="text-sm font-bold text-amber-400">Office & General Contact Details</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Company Name</label>
                        <input
                          type="text"
                          value={data.officeInfo.companyName}
                          onChange={(e) => updateOfficeInfo({ ...data.officeInfo, companyName: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Tagline</label>
                        <input
                          type="text"
                          value={data.officeInfo.tagline}
                          onChange={(e) => updateOfficeInfo({ ...data.officeInfo, tagline: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Primary Email</label>
                        <input
                          type="email"
                          value={data.officeInfo.email}
                          onChange={(e) => updateOfficeInfo({ ...data.officeInfo, email: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Phone Number</label>
                        <input
                          type="text"
                          value={data.officeInfo.phone}
                          onChange={(e) => updateOfficeInfo({ ...data.officeInfo, phone: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-slate-400 mb-1">Full Office Address</label>
                        <input
                          type="text"
                          value={data.officeInfo.address.fullAddress}
                          onChange={(e) =>
                            updateOfficeInfo({
                              ...data.officeInfo,
                              address: { ...data.officeInfo.address, fullAddress: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Office Hours</label>
                        <input
                          type="text"
                          value={data.officeInfo.officeHours}
                          onChange={(e) => updateOfficeInfo({ ...data.officeInfo, officeHours: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Time Zone</label>
                        <input
                          type="text"
                          value={data.officeInfo.timeZone}
                          onChange={(e) => updateOfficeInfo({ ...data.officeInfo, timeZone: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: RESEARCH & FOUR FRONTS */}
              {activeTab === 'research' && (
                <div className="space-y-6">
                  <div className="border-b border-slate-800 pb-4">
                    <h3 className="text-lg font-bold text-white">Research & Insights Section</h3>
                    <p className="text-xs text-slate-400">Manage heading, quote narrative, and operational fronts tabs (section#reform)</p>
                  </div>

                  {/* Research Main Content */}
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
                    <h4 className="text-sm font-bold text-emerald-400">Header & Narrative Text</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Section Title (e.g. H1)</label>
                        <input
                          type="text"
                          value={data.researchSection?.sectionTitle || ''}
                          onChange={(e) => updateResearchSection({ ...data.researchSection, sectionTitle: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Main Headline</label>
                        <input
                          type="text"
                          value={data.researchSection?.headline || ''}
                          onChange={(e) => updateResearchSection({ ...data.researchSection, headline: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-slate-400 mb-1">Quote Narrative</label>
                        <input
                          type="text"
                          value={data.researchSection?.quote || ''}
                          onChange={(e) => updateResearchSection({ ...data.researchSection, quote: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-slate-400 mb-1">Body Text</label>
                        <textarea
                          rows={2}
                          value={data.researchSection?.bodyText || ''}
                          onChange={(e) => updateResearchSection({ ...data.researchSection, bodyText: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Operational Fronts List */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">Operational Engine Fronts ({data.operationalFronts?.length || 0})</h4>
                      <button
                        onClick={() => {
                          const current = data.operationalFronts || [];
                          const newFront = {
                            id: `front-${Date.now()}`,
                            tabLabel: `0${current.length + 1} NEW`,
                            title: 'New Operational Front',
                            focusVector: 'Strategic Vectors & Scenarios',
                            desc: 'Description of the new operational front.',
                            deliverable: 'NEW DELIVERABLE SPEC',
                            status: 'READY',
                            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
                          };
                          updateOperationalFronts([...current, newFront]);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Operational Front</span>
                      </button>
                    </div>

                    {(data.operationalFronts || []).map((front, fIdx) => (
                      <div key={front.id || fIdx} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 relative">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-xs font-bold text-emerald-400 font-mono">Front #{fIdx + 1}: {front.tabLabel}</span>
                          <button
                            onClick={() => {
                              const updated = [...data.operationalFronts];
                              updated.splice(fIdx, 1);
                              updateOperationalFronts(updated);
                            }}
                            className="p-1 rounded text-rose-400 hover:bg-rose-500/20"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Tab Label</label>
                            <input
                              type="text"
                              value={front.tabLabel}
                              onChange={(e) => {
                                const updated = [...data.operationalFronts];
                                updated[fIdx].tabLabel = e.target.value;
                                updateOperationalFronts(updated);
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Title</label>
                            <input
                              type="text"
                              value={front.title}
                              onChange={(e) => {
                                const updated = [...data.operationalFronts];
                                updated[fIdx].title = e.target.value;
                                updateOperationalFronts(updated);
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Status Badge</label>
                            <input
                              type="text"
                              value={front.status}
                              onChange={(e) => {
                                const updated = [...data.operationalFronts];
                                updated[fIdx].status = e.target.value;
                                updateOperationalFronts(updated);
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Focus Vector</label>
                            <input
                              type="text"
                              value={front.focusVector}
                              onChange={(e) => {
                                const updated = [...data.operationalFronts];
                                updated[fIdx].focusVector = e.target.value;
                                updateOperationalFronts(updated);
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Deliverable</label>
                            <input
                              type="text"
                              value={front.deliverable}
                              onChange={(e) => {
                                const updated = [...data.operationalFronts];
                                updated[fIdx].deliverable = e.target.value;
                                updateOperationalFronts(updated);
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>
                          <div className="sm:col-span-3">
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Description</label>
                            <textarea
                              rows={2}
                              value={front.desc}
                              onChange={(e) => {
                                const updated = [...data.operationalFronts];
                                updated[fIdx].desc = e.target.value;
                                updateOperationalFronts(updated);
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>
                          <div className="sm:col-span-3">
                            <ImageField
                              label="Image (URL or Upload File)"
                              value={front.image}
                              onChange={(val) => {
                                const updated = [...data.operationalFronts];
                                updated[fIdx].image = val;
                                updateOperationalFronts(updated);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: PROJECTS & FOCUS AREAS */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="border-b border-slate-800 pb-4">
                    <h3 className="text-lg font-bold text-white">Projects & Strategic Focus Areas</h3>
                    <p className="text-xs text-slate-400">Manage portfolio items, client partners, and strategic focus area pillars (section#projects)</p>
                  </div>

                  {/* Projects List */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">Portfolio Projects ({data.projects?.length || 0})</h4>
                      <button
                        onClick={() => {
                          const current = data.projects || [];
                          const newProj = {
                            id: `proj-${Date.now()}`,
                            title: 'New Advisory Engagement Project',
                            category: 'governance',
                            categoryLabel: 'Data & Digital Governance',
                            partner: 'Ministry / Partner Organization',
                            partnerLogoText: 'Partner Entity',
                            year: '2024-2025',
                            location: 'National / Regional Region',
                            description: 'Comprehensive technical assistance, policy formulation, and digital execution.',
                            keyOutcome: 'Measured improvement in institutional performance and policy deployment.',
                            tags: ['Governance', 'Policy', 'Digital'],
                            imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
                            featured: true,
                            detailedScope: 'Full technical roadmap and capacity building implementation.',
                          };
                          updateProjects([...current, newProj]);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Project</span>
                      </button>
                    </div>

                    {(data.projects || []).map((proj, pIdx) => (
                      <div key={proj.id || pIdx} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-xs font-bold text-sky-400">Project #{pIdx + 1}: {proj.title}</span>
                          <button
                            onClick={() => {
                              const updated = [...data.projects];
                              updated.splice(pIdx, 1);
                              updateProjects(updated);
                            }}
                            className="p-1 rounded text-rose-400 hover:bg-rose-500/20"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Project Title</label>
                            <input
                              type="text"
                              value={proj.title}
                              onChange={(e) => {
                                const updated = [...data.projects];
                                updated[pIdx].title = e.target.value;
                                updateProjects(updated);
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Category</label>
                            <select
                              value={proj.category}
                              onChange={(e) => {
                                const updated = [...data.projects];
                                updated[pIdx].category = e.target.value;
                                updateProjects(updated);
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                            >
                              <option value="education">Education</option>
                              <option value="climate">Climate</option>
                              <option value="governance">Governance</option>
                              <option value="feasibility">Feasibility</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Partner Name</label>
                            <input
                              type="text"
                              value={proj.partner}
                              onChange={(e) => {
                                const updated = [...data.projects];
                                updated[pIdx].partner = e.target.value;
                                updateProjects(updated);
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Year / Period</label>
                            <input
                              type="text"
                              value={proj.year}
                              onChange={(e) => {
                                const updated = [...data.projects];
                                updated[pIdx].year = e.target.value;
                                updateProjects(updated);
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Location</label>
                            <input
                              type="text"
                              value={proj.location}
                              onChange={(e) => {
                                const updated = [...data.projects];
                                updated[pIdx].location = e.target.value;
                                updateProjects(updated);
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>
                          <div className="sm:col-span-3">
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Description</label>
                            <textarea
                              rows={2}
                              value={proj.description}
                              onChange={(e) => {
                                const updated = [...data.projects];
                                updated[pIdx].description = e.target.value;
                                updateProjects(updated);
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>
                          <div className="sm:col-span-3">
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Key Verified Outcome</label>
                            <input
                              type="text"
                              value={proj.keyOutcome}
                              onChange={(e) => {
                                const updated = [...data.projects];
                                updated[pIdx].keyOutcome = e.target.value;
                                updateProjects(updated);
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>
                          <div className="sm:col-span-3">
                            <ImageField
                              label="Image (URL or Upload File)"
                              value={proj.imageUrl}
                              onChange={(val) => {
                                const updated = [...data.projects];
                                updated[pIdx].imageUrl = val;
                                updateProjects(updated);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Focus Areas List */}
                  <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-sm font-bold text-white">Strategic Focus Areas ({data.focusAreas?.length || 0})</h4>
                    {(data.focusAreas || []).map((area, aIdx) => (
                      <div key={area.id || aIdx} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-xs font-bold text-emerald-400">Pillar #{aIdx + 1}: {area.title}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Pillar Title</label>
                            <input
                              type="text"
                              value={area.title}
                              onChange={(e) => {
                                const updated = [...data.focusAreas];
                                updated[aIdx].title = e.target.value;
                                updateFocusAreas(updated);
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Badge</label>
                            <input
                              type="text"
                              value={area.badge}
                              onChange={(e) => {
                                const updated = [...data.focusAreas];
                                updated[aIdx].badge = e.target.value;
                                updateFocusAreas(updated);
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Subtitle</label>
                            <input
                              type="text"
                              value={area.subtitle}
                              onChange={(e) => {
                                const updated = [...data.focusAreas];
                                updated[aIdx].subtitle = e.target.value;
                                updateFocusAreas(updated);
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Description</label>
                            <textarea
                              rows={2}
                              value={area.description}
                              onChange={(e) => {
                                const updated = [...data.focusAreas];
                                updated[aIdx].description = e.target.value;
                                updateFocusAreas(updated);
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: PARALLAX CARDS */}
              {activeTab === 'parallax' && (
                <div className="space-y-6">
                  <div className="border-b border-slate-800 pb-4">
                    <h3 className="text-lg font-bold text-white">Parallax Research Cards</h3>
                    <p className="text-xs text-slate-400">Manage interactive cards, images, badges, and project descriptions</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">Research Cards ({data.parallaxCards?.length || 0})</h4>
                      <button
                        onClick={() => {
                          const current = data.parallaxCards || [];
                          const newCard = {
                            id: `card-${Date.now()}`,
                            title: 'New Research Focus',
                            category: 'policy' as const,
                            categoryLabel: 'Policy Architecture',
                            badge: 'NEW FOCUS',
                            description: 'Description of the new research focus card.',
                            backgroundUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
                          };
                          updateParallaxCards([...current, newCard]);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Card</span>
                      </button>
                    </div>

                    {(data.parallaxCards || []).map((card, cIdx) => (
                      <div key={card.id || cIdx} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-xs font-bold text-amber-400">Card #{cIdx + 1}: {card.title}</span>
                          <button
                            onClick={() => {
                              const updated = [...data.parallaxCards];
                              updated.splice(cIdx, 1);
                              updateParallaxCards(updated);
                            }}
                            className="p-1 rounded text-rose-400 hover:bg-rose-500/20"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Title</label>
                            <input
                              type="text"
                              value={card.title}
                              onChange={(e) => {
                                const updated = [...data.parallaxCards];
                                updated[cIdx].title = e.target.value;
                                updateParallaxCards(updated);
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Badge</label>
                            <input
                              type="text"
                              value={card.badge || ''}
                              onChange={(e) => {
                                const updated = [...data.parallaxCards];
                                updated[cIdx].badge = e.target.value;
                                updateParallaxCards(updated);
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Category Label</label>
                            <input
                              type="text"
                              value={card.categoryLabel || ''}
                              onChange={(e) => {
                                const updated = [...data.parallaxCards];
                                updated[cIdx].categoryLabel = e.target.value;
                                updateParallaxCards(updated);
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>
                          <div className="sm:col-span-3">
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Description / Project Summary</label>
                            <textarea
                              rows={2}
                              value={card.description}
                              onChange={(e) => {
                                const updated = [...data.parallaxCards];
                                updated[cIdx].description = e.target.value;
                                updateParallaxCards(updated);
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>
                          <div className="sm:col-span-3">
                            <ImageField
                              label="Background Image (URL or Upload File)"
                              value={card.backgroundUrl}
                              onChange={(val) => {
                                const updated = [...data.parallaxCards];
                                updated[cIdx].backgroundUrl = val;
                                updateParallaxCards(updated);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: EXPORT / IMPORT & RESET */}
              {activeTab === 'backup' && (

                <div className="space-y-6">
                  <div className="border-b border-slate-800 pb-4">
                    <h3 className="text-lg font-bold text-white">Content Backup & Data Management</h3>
                    <p className="text-xs text-slate-400">Export a full backup of all website data, import custom JSON, or reset to original defaults</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Export JSON Card */}
                    <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                          <Download className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-white">Export Website JSON</h4>
                        <p className="text-xs text-slate-400">Download a full JSON backup file containing all text, images, slides, and services.</p>
                      </div>

                      <button
                        onClick={handleExport}
                        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export Backup JSON</span>
                      </button>
                    </div>

                    {/* Import JSON Card */}
                    <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                          <Upload className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-white">Import Custom Content</h4>
                        <p className="text-xs text-slate-400">Upload a previously exported JSON backup to instantly update all content across the site.</p>
                      </div>

                      <label className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer">
                        <Upload className="w-4 h-4" />
                        <span>Upload JSON File</span>
                        <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
                      </label>
                    </div>

                    {/* Reset Defaults Card */}
                    <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-rose-600/20 border border-rose-500/30 text-rose-400 flex items-center justify-center">
                          <RotateCcw className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-white">Reset to Defaults</h4>
                        <p className="text-xs text-slate-400">Wipe all custom modifications and restore the original factory default data.</p>
                      </div>

                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to reset all content to default settings?')) {
                            resetAllContent();
                            showToast('Website content reset to default!');
                          }
                        }}
                        className="w-full py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600 border border-rose-500/40 text-rose-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Reset All Content</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Modal Bottom Footer Bar */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Changes take effect live on the site immediately upon editing.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Done Editing
          </button>
        </div>

      </div>
    </div>
  );
};
