import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { SlideItem } from '../types';
import { VideoModal } from './VideoModal';
import { GetStartedModal } from './GetStartedModal';
import { useCMS } from '../context/CMSContext';

interface PresentationSliderProps {
  slides?: SlideItem[];
  currentSlideId: number;
  onChangeSlide: (id: number) => void;
  autoplayInterval?: number;
}

export const PresentationSlider: React.FC<PresentationSliderProps> = ({
  slides: slidesProp,
  currentSlideId,
  onChangeSlide,
  autoplayInterval = 5000,
}) => {
  const { data } = useCMS();
  // Slides come from MongoDB; the prop is only an explicit override.
  const slides = slidesProp && slidesProp.length > 0 ? slidesProp : data.slides;
  const theme = data.themeConfig || {
    primaryColor: '#ff7e67',
    accentColor: '#2dd4bf',
    heroTitleColor: '#f8fafc',
    heroSubtitleColor: '#94a3b8',
    heroTagColor: '#ff7e67',
    heroButtonBgColor: '#ff7e67',
    heroButtonTextColor: '#070d18',
    heroOverlayStyle: 'none',
  };

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // Modal states
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  const currentIndex = slides.findIndex((s) => s.id === currentSlideId);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const currentSlide = slides[safeIndex] || slides[0];

  // Dynamic colors resolved from slide-level overrides or global CMS theme settings
  const activeTagColor = currentSlide.tagColor || currentSlide.accentColor || theme.heroTagColor || '#ff7e67';
  const activeTitleColor = currentSlide.titleColor || theme.heroTitleColor || '#f8fafc';
  const activeSubtitleColor = currentSlide.subtitleColor || theme.heroSubtitleColor || '#94a3b8';
  const activeButtonBg = currentSlide.ctaBgColor || currentSlide.accentColor || theme.heroButtonBgColor || '#ff7e67';
  const activeButtonText = currentSlide.ctaTextColor || theme.heroButtonTextColor || '#070d18';

  const handleNext = () => {
    setIsAnimating(true);
    const idx = slides.findIndex((s) => s.id === currentSlideId);
    const nxtIdx = (idx + 1) % slides.length;
    onChangeSlide(slides[nxtIdx].id);
    setProgress(0);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handlePrev = () => {
    setIsAnimating(true);
    const idx = slides.findIndex((s) => s.id === currentSlideId);
    const prvIdx = (idx - 1 + slides.length) % slides.length;
    onChangeSlide(slides[prvIdx].id);
    setProgress(0);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handleSelectSlide = (id: number) => {
    if (id === currentSlideId) return;
    setIsAnimating(true);
    onChangeSlide(id);
    setProgress(0);
    setTimeout(() => setIsAnimating(false), 400);
  };

  // Autoplay timer with visual progress
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    let stepTimer: ReturnType<typeof setInterval>;

    if (isPlaying && !isVideoOpen && !isGetStartedOpen) {
      const stepMs = 50;
      const increment = (stepMs / autoplayInterval) * 100;

      stepTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + increment;
        });
      }, stepMs);

      timer = setInterval(() => {
        handleNext();
      }, autoplayInterval);
    } else {
      setProgress(0);
    }

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
    };
  }, [isPlaying, currentSlideId, isVideoOpen, isGetStartedOpen, autoplayInterval, slides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'p' || e.key === 'P') {
        setIsPlaying((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideId, slides]);

  return (
    <div className="relative w-full h-full min-h-screen bg-[#050a12] overflow-hidden select-none font-sans text-slate-100">
      
      {/* Background Image with Smooth Transition */}
      <div
        key={currentSlide.id}
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out transform ${
          isAnimating ? 'scale-105 opacity-90' : 'scale-100 opacity-100'
        }`}
        style={{ backgroundImage: `url(${currentSlide.bgImage})` }}
      />

      {/* Main Hero Content Area */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-start">
        <div 
          className={`max-w-2xl text-left p-6 sm:p-8 md:p-10 rounded-2xl bg-[#081220]/85 backdrop-blur-xl border border-slate-700/60 shadow-2xl shadow-black/60 space-y-5 transition-all duration-500 ease-out transform ${
            isAnimating ? 'scale-[0.98] opacity-0 translate-y-3' : 'scale-100 opacity-100 translate-y-0'
          }`}
        >
          {/* Hero Title */}
          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight leading-[1.2] transition-colors duration-300"
            style={{ color: activeTitleColor }}
          >
            {currentSlide.title}
          </h1>

          {/* Subtitle */}
          {currentSlide.subtitle && (
            <p
              className="text-sm sm:text-base font-sans font-normal text-slate-300 leading-relaxed max-w-lg transition-colors duration-300"
              style={{ color: activeSubtitleColor }}
            >
              {currentSlide.subtitle}
            </p>
          )}

          {/* Action Button */}
          <div className="pt-2 flex flex-wrap items-center justify-start gap-3">
            <button
              onClick={() => setIsGetStartedOpen(true)}
              style={{
                backgroundColor: activeButtonBg,
                color: activeButtonText,
              }}
              className="group px-6 py-3 rounded-xl flex items-center gap-2 transition-all hover:brightness-105 active:translate-y-0 text-xs font-mono font-bold uppercase tracking-wider cursor-pointer border border-[#ff7e67]/50 shadow-lg shadow-black/30"
            >
              <span>{currentSlide.ctaText || 'Get Started'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrow Controls */}
      <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20">
        <button
          onClick={handlePrev}
          className="w-11 h-11 flex items-center justify-center rounded-full border border-slate-700/80 bg-[#081220]/90 hover:bg-[#0d1e33] text-slate-200 shadow-xl shadow-black/40 hover:scale-105 active:scale-95 transition-all group backdrop-blur-md cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 text-slate-200 group-hover:text-[#ff7e67] transition-colors" />
        </button>
      </div>

      <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20">
        <button
          onClick={handleNext}
          className="w-11 h-11 flex items-center justify-center rounded-full border border-slate-700/80 bg-[#081220]/90 hover:bg-[#0d1e33] text-slate-200 shadow-xl shadow-black/40 hover:scale-105 active:scale-95 transition-all group backdrop-blur-md cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-[#ff7e67] transition-colors" />
        </button>
      </div>

      {/* Bottom Bar: Indicators */}
      <footer className="absolute bottom-6 sm:bottom-8 inset-x-6 sm:inset-x-12 z-20 flex justify-between items-center gap-6 pointer-events-none">
        {/* Slide Indicators with Progress Bar */}
        <div className="flex items-center gap-3 bg-[#081220]/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700/80 shadow-md pointer-events-auto">
          {slides.map((slide) => {
            const isActive = slide.id === currentSlideId;
            return (
              <button
                key={slide.id}
                onClick={() => handleSelectSlide(slide.id)}
                className={`group relative h-2 transition-all duration-300 rounded-full overflow-hidden cursor-pointer ${
                  isActive ? 'w-12 bg-slate-700' : 'w-3 bg-slate-600 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${slide.id}`}
              >
                {isActive && (
                  <div
                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%`, backgroundColor: activeTagColor }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </footer>

      {/* Video Modal */}
      <VideoModal
        slide={currentSlide}
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />

      {/* Get Started Modal */}
      <GetStartedModal
        slide={currentSlide}
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
      />

    </div>
  );
};

export default PresentationSlider;

