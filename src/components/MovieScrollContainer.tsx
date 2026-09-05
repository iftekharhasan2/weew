import React, { useEffect, useRef, useState } from 'react';
import { Movie } from '../types';
import { Play, Award, Quote, Film } from 'lucide-react';

interface MovieScrollContainerProps {
  movie: Movie;
  currentStep: number;
  onStepChange: (step: number) => void;
  onOpenTrailer: () => void;
  onProgressChange: (progress: number) => void;
  onRedirectToLanding?: () => void;
}

export const MovieScrollContainer: React.FC<MovieScrollContainerProps> = ({
  movie,
  currentStep,
  onStepChange,
  onOpenTrailer,
  onProgressChange,
  onRedirectToLanding,
}) => {
  const containerRef = useRef<HTMLUListElement>(null);
  const [scrollPct, setScrollPct] = useState<number>(0);
  const redirectedRef = useRef<boolean>(false);

  // Reset redirect ref when movie changes or step resets
  useEffect(() => {
    redirectedRef.current = false;
  }, [movie.id]);

  // Scroll listener to compute step and percentage
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight - windowHeight;

      // Calculate continuous progress percentage starting from 0% at top to 100% at bottom
      const rawPct = totalHeight > 0 ? Math.min(100, Math.max(0, Math.round((scrollPos / totalHeight) * 100))) : 0;

      // Determine step chunk index (Chunk 1: 0-24%, Chunk 2: 25-49%, Chunk 3: 50-74%, Chunk 4: 75-100%)
      let stepIndex = 1;
      if (rawPct >= 75) {
        stepIndex = 4;
      } else if (rawPct >= 50) {
        stepIndex = 3;
      } else if (rawPct >= 25) {
        stepIndex = 2;
      } else {
        stepIndex = 1;
      }

      if (stepIndex !== currentStep) {
        onStepChange(stepIndex);
      }

      setScrollPct(rawPct);
      onProgressChange(rawPct);

      // Trigger automatic redirection when reaching 100% (or >= 98%)
      if (rawPct >= 98 && !redirectedRef.current) {
        redirectedRef.current = true;
        setTimeout(() => {
          if (onRedirectToLanding) {
            onRedirectToLanding();
          }
        }, 800);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentStep, movie.id, onStepChange, onProgressChange, onRedirectToLanding]);

  // Dynamic calculations for progress-driven slide transitions
  const p = scrollPct;

  // Background Image transform
  const bgScale = (1.25 - 0.25 * (p / 100)).toFixed(3);
  const bgBrightness = (1 - 0.35 * (p / 100)).toFixed(2);
  const bgBlur = p > 65 ? (((p - 65) / 35) * 3).toFixed(1) : '0';

  // Slide 1 (Hero Banner)
  let heroOpacity = 0;
  let heroScale = 1;
  let heroY = 0;
  if (p <= 28) {
    const t = p / 28;
    heroOpacity = 1 - t;
    heroScale = 1 + 0.08 * t;
    heroY = -35 * t;
  }

  // Slide 2 (Story Synopsis)
  let storyOpacity = 0;
  let storyScale = 1.2;
  let storyY = 40;
  if (p >= 10 && p <= 25) {
    const t = (p - 10) / 15;
    storyOpacity = t;
    storyScale = 1.2 - 0.2 * t;
    storyY = 40 * (1 - t);
  } else if (p > 25 && p <= 48) {
    storyOpacity = 1;
    storyScale = 1.0;
    storyY = 0;
  } else if (p > 48 && p <= 65) {
    const t = (p - 48) / 17;
    storyOpacity = 1 - t;
    storyScale = 1.0 - 0.3 * t;
    storyY = -50 * t;
  }

  // Slide 3 (Cast & Visionaries)
  let castOpacity = 0;
  let castScale = 1.2;
  let castY = 40;
  if (p >= 42 && p <= 55) {
    const t = (p - 42) / 13;
    castOpacity = t;
    castScale = 1.2 - 0.2 * t;
    castY = 40 * (1 - t);
  } else if (p > 55 && p <= 75) {
    castOpacity = 1;
    castScale = 1.0;
    castY = 0;
  } else if (p > 75 && p <= 88) {
    const t = (p - 75) / 13;
    castOpacity = 1 - t;
    castScale = 1.0 - 0.2 * t;
    castY = -40 * t;
  }

  // Slide 4 (Gallery & Climax)
  let galleryOpacity = 0;
  let galleryScale = 1.15;
  let galleryY = 30;
  if (p >= 72 && p <= 88) {
    const t = (p - 72) / 16;
    galleryOpacity = t;
    galleryScale = 1.15 - 0.15 * t;
    galleryY = 30 * (1 - t);
  } else if (p > 88) {
    galleryOpacity = 1;
    galleryScale = 1.0;
    galleryY = 0;
  }

  return (
    <>
      {/* Fixed Movie Viewport Canvas (.movie step-1 / step-2 / step-3 / step-4) */}
      <div
        id="movie-fixed-viewport"
        className={`movie movie-showcase step-${currentStep}`}
      >
        {/* Background Image Layer (.bg img) */}
        <div className="bg absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
          <img
            src={movie.backdropUrl}
            alt={movie.title}
            className="movie-bg-image w-full h-full object-cover select-none pointer-events-none"
            style={{
              transform: `scale(${bgScale})`,
              filter: `brightness(${bgBrightness}) blur(${bgBlur}px)`,
              transition: 'transform 0.15s ease-out, filter 0.15s ease-out',
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2000&auto=format&fit=crop';
            }}
          />

          {/* Light Backdrop Overlay for contrast */}
          <div className="absolute inset-0 bg-slate-900/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />
        </div>

        {/* STEP 1: Hero Banner Header Overlay */}
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center"
          style={{
            opacity: heroOpacity,
            transform: `scale(${heroScale}) translateY(${heroY}px)`,
            pointerEvents: heroOpacity > 0.3 ? 'auto' : 'none',
            transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
          }}
        >
          <div className="max-w-3xl space-y-4 text-white">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight uppercase text-glow drop-shadow-2xl font-serif">
              {movie.title}
            </h1>

            {movie.subtitle && (
              <p className="text-lg sm:text-2xl font-light text-amber-200 tracking-wide italic gold-glow">
                "{movie.subtitle}"
              </p>
            )}

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {movie.genres.map((g) => (
                <span
                  key={g}
                  className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium rounded-lg"
                >
                  {g}
                </span>
              ))}
            </div>

            {movie.trailerYoutubeId && (
              <div className="pt-6 flex items-center justify-center gap-4">
                <button
                  onClick={onOpenTrailer}
                  className="inline-flex items-center gap-2.5 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Watch Official Trailer</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* STEP 2: Story Section */}
        <div
          className="story story-layer"
          style={{
            opacity: storyOpacity,
            pointerEvents: storyOpacity > 0.3 ? 'auto' : 'none',
            transition: 'opacity 0.15s ease-out',
          }}
        >
          <div
            className="story-content story-content-box px-6 sm:px-12 py-8 max-w-3xl mx-auto bg-white/95 border border-slate-200/90 rounded-3xl backdrop-blur-2xl shadow-2xl text-left text-slate-900"
            style={{
              transform: `scale(${storyScale}) translateY(${storyY}px)`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            <div className="flex items-center gap-2 text-amber-600 text-xs font-bold uppercase tracking-widest mb-2">
              <Film className="w-4 h-4" />
              <span>Chapter II: Storyline Synopsis</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight font-serif">
              {movie.title}
            </h2>

            <h4 className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              {movie.story}
            </h4>

            {movie.quote && (
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-start gap-3 text-amber-800 italic text-sm font-medium">
                <Quote className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>"{movie.quote}"</span>
              </div>
            )}
          </div>
        </div>

        {/* STEP 3: Actor & Crew Section */}
        <div
          className="actor actor-layer"
          style={{
            opacity: castOpacity,
            pointerEvents: castOpacity > 0.3 ? 'auto' : 'none',
            transition: 'opacity 0.15s ease-out',
          }}
        >
          <div
            className="actor-content-box px-6 sm:px-10 py-8 max-w-4xl mx-auto bg-white/95 border border-slate-200/90 rounded-3xl backdrop-blur-2xl shadow-2xl text-left w-full text-slate-900"
            style={{
              transform: `scale(${castScale}) translateY(${castY}px)`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            <div className="text-amber-600 text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-slate-200 pb-3">
              <Award className="w-4 h-4" />
              <span>Chapter III: Visionaries & Cast</span>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <li className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-amber-500/50 transition-all">
                <h2 className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">
                  Director
                </h2>
                <h4 className="text-xl font-bold text-slate-900 tracking-wide">
                  {movie.director}
                </h4>
                <p className="text-xs text-slate-500 mt-2">Visionary Filmmaker</p>
              </li>

              <li className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-amber-500/50 transition-all">
                <h2 className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">
                  Writers
                </h2>
                <h4 className="text-lg font-semibold text-slate-900 leading-snug">
                  {movie.writers.join(', ')}
                </h4>
                <p className="text-xs text-slate-500 mt-2">Screenplay & Story</p>
              </li>

              <li className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-amber-500/50 transition-all">
                <h2 className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">
                  Stars
                </h2>
                <h4 className="text-lg font-semibold text-slate-900 leading-snug">
                  {movie.stars.join(', ')}
                </h4>
                <p className="text-xs text-slate-500 mt-2">Lead Cast</p>
              </li>
            </ul>

            {movie.awards && (
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold text-amber-800 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  {movie.awards}
                </span>
                <span className="text-slate-500">Rated {movie.rating}</span>
              </div>
            )}
          </div>
        </div>

        {/* STEP 4: Gallery & Completion Modal (100% Redirection) */}
        <div
          className="absolute inset-0 z-30 flex items-center justify-center p-6"
          style={{
            opacity: galleryOpacity,
            pointerEvents: galleryOpacity > 0.3 ? 'auto' : 'none',
            transition: 'opacity 0.15s ease-out',
          }}
        >
          <div
            className="max-w-4xl w-full bg-white/95 border border-slate-200 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative text-slate-900"
            style={{
              transform: `scale(${galleryScale}) translateY(${galleryY}px)`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-3 font-serif">
                  <span>{movie.title}</span>
                  <span className="text-xs font-mono font-normal text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                    Chapter IV: Climax & Media
                  </span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Storyline Completion: <strong className="text-amber-600">{scrollPct}%</strong>
                </p>
              </div>

              {movie.trailerYoutubeId && (
                <button
                  onClick={onOpenTrailer}
                  className="hidden sm:flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Trailer</span>
                </button>
              )}
            </div>

            {/* Stills Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {movie.stills && movie.stills.length > 0 ? (
                movie.stills.map((still, idx) => (
                  <div
                    key={idx}
                    className="group relative rounded-2xl overflow-hidden border border-slate-200 aspect-video bg-slate-100 shadow-sm"
                  >
                    <img
                      src={still.url}
                      alt={still.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-xs font-semibold text-white">{still.caption}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-8 text-slate-500 text-sm">
                  Cinematic stills loaded from primary backdrop
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Wrap Container matching scroll height sections */}
      <ul ref={containerRef} className="scroll-wrap relative z-10 pointer-events-none">
        <li className="h-screen" id="step-section-1" />
        <li className="h-screen" id="step-section-2" />
        <li className="h-screen" id="step-section-3" />
        <li className="h-screen" id="step-section-4" />
      </ul>
    </>
  );
};
