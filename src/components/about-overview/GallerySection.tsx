import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from 'lucide-react';
import { GALLERY_PHOTOS } from '../../data/aboutOverviewData';

export const GallerySection: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsZoomed(false);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setIsZoomed(false);
  };

  const nextPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % GALLERY_PHOTOS.length);
      setIsZoomed(false);
    }
  };

  const prevPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length);
      setIsZoomed(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  return (
    <section className="py-16 md:py-20 bg-[#0E1A22] border-b border-[#3C3F45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-3xl font-cardo text-[#F3F0E8]">
            IP3 in Action
          </h2>
          <p className="text-xs sm:text-sm text-[#AEB0AE]">
            Capturing our policy dialogues, stakeholder roundtables, capacity labs, and community field engagements.
          </p>
        </div>

        {/* 4-column Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {GALLERY_PHOTOS.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => openLightbox(index)}
              className="relative group rounded-xl overflow-hidden shadow-xs hover:shadow-xl aspect-[3/2] cursor-pointer bg-neutral-900"
            >
              <img
                src={photo.thumbnail}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <div className="flex justify-end">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium line-clamp-2 leading-snug">
                    {photo.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-neutral-950/95 backdrop-blur-lg flex flex-col justify-between p-4 sm:p-6"
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between text-white z-10">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-neutral-400">
                  {lightboxIndex + 1} / {GALLERY_PHOTOS.length}
                </span>
                <span className="hidden sm:inline-block text-xs text-neutral-300 border-l border-neutral-700 pl-3">
                  {GALLERY_PHOTOS[lightboxIndex].title}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
                  title="Toggle Zoom"
                >
                  {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                </button>
                <button
                  onClick={closeLightbox}
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-red-600 text-neutral-200 hover:text-white transition-colors"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Image Stage */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              <button
                onClick={prevPhoto}
                className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-neutral-900/80 hover:bg-[#0654c4] text-white transition-all shadow-lg cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{
                  opacity: 1,
                  scale: isZoomed ? 1.35 : 1,
                }}
                transition={{ duration: 0.25 }}
                src={GALLERY_PHOTOS[lightboxIndex].src}
                alt={GALLERY_PHOTOS[lightboxIndex].title}
                className={`max-h-[75vh] max-w-[90vw] object-contain rounded-lg shadow-2xl transition-transform duration-300 ${
                  isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />

              <button
                onClick={nextPhoto}
                className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-neutral-900/80 hover:bg-[#0654c4] text-white transition-all shadow-lg cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Filmstrip Thumbnails */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 z-10">
              {GALLERY_PHOTOS.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setLightboxIndex(idx);
                    setIsZoomed(false);
                  }}
                  className={`relative rounded-md overflow-hidden w-14 h-10 shrink-0 border-2 transition-all ${
                    idx === lightboxIndex
                      ? 'border-[#0654c4] scale-105 opacity-100 ring-2 ring-blue-400/50'
                      : 'border-transparent opacity-40 hover:opacity-80'
                  }`}
                >
                  <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
