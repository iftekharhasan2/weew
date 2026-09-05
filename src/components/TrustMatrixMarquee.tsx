import React from 'react';
import { useCMS, defaultTrustMatrix } from '../context/CMSContext';

export const TrustMatrixMarquee: React.FC = () => {
  const { data } = useCMS();
  const trustMatrix = data.trustMatrix || defaultTrustMatrix;
  const brands = trustMatrix.brands && trustMatrix.brands.length > 0 ? trustMatrix.brands : defaultTrustMatrix.brands;
  const speed = trustMatrix.scrollSpeed || 35;

  return (
    <div className="relative w-full overflow-hidden bg-[var(--bg)] py-12 select-none transition-colors duration-250 font-sans">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto px-4 mb-8 space-y-2">
        <div>
          <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#ff7e67] uppercase">
            {trustMatrix.sectionBadge || "STRATEGIC PARTNERS & CLIENT ECOSYSTEM"}
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
          {trustMatrix.sectionTitle || "Clients & Strategic Development Partners Who Trust Us"}
        </h3>
      </div>

      {/* Edge Fade Overlay Masks */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-[14%] bg-gradient-to-r from-[#050a12] to-transparent" />
      <div className="pointer-events-none absolute top-0 bottom-0 right-0 z-10 w-[14%] bg-gradient-to-l from-[#050a12] to-transparent" />

      {/* Marquee Track */}
      <div className="flex w-full overflow-hidden">
        <div 
          className="flex shrink-0 items-center animate-marquee hover:[animation-play-state:paused]"
          style={{ gap: '32px', animationDuration: `${speed}s` }}
        >
          {brands.map((brand) => (
            <div 
              key={brand.id}
              className="flex items-center justify-center px-6 py-3.5 rounded-2xl bg-[#081220] border border-slate-800 shrink-0 hover:border-[#ff7e67] hover:shadow-lg hover:shadow-[#ff7e67]/10 transition-all duration-300 group cursor-default shadow-xs"
              title={brand.description || brand.name}
            >
              <img 
                src={brand.logoUrl} 
                alt={brand.name} 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  if (brand.fallbackUrl) {
                    (e.currentTarget as HTMLImageElement).src = brand.fallbackUrl;
                  }
                }}
                className="h-[44px] w-auto max-w-[170px] object-contain transition-all duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Duplicated Track for Seamless Loop */}
        <div 
          aria-hidden="true"
          className="flex shrink-0 items-center animate-marquee hover:[animation-play-state:paused]"
          style={{ gap: '32px', animationDuration: `${speed}s`, paddingLeft: '32px' }}
        >
          {brands.map((brand) => (
            <div 
              key={`dupe-${brand.id}`}
              className="flex items-center justify-center px-6 py-3.5 rounded-2xl bg-[#081220] border border-slate-800 shrink-0 hover:border-[#ff7e67] hover:shadow-lg hover:shadow-[#ff7e67]/10 transition-all duration-300 group cursor-default shadow-xs"
              title={brand.description || brand.name}
            >
              <img 
                src={brand.logoUrl} 
                alt={brand.name} 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  if (brand.fallbackUrl) {
                    (e.currentTarget as HTMLImageElement).src = brand.fallbackUrl;
                  }
                }}
                className="h-[44px] w-auto max-w-[170px] object-contain transition-all duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

