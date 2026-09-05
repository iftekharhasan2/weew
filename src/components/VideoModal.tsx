import React from 'react';
import { X, Film } from 'lucide-react';
import { SlideItem } from '../types';

interface VideoModalProps {
  slide: SlideItem;
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ slide, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity">
      <div className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">{slide.title}</h3>
              <p className="text-xs text-zinc-400 uppercase tracking-wider">{slide.name} video showcase</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
          <video
            controls
            autoPlay
            className="w-full h-full object-cover"
            src={slide.videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4"}
            poster={slide.bgImage}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-zinc-900 flex justify-between items-center text-sm text-zinc-400 border-t border-zinc-800">
          <p className="line-clamp-1">{slide.subtitle}</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-medium transition-colors"
          >
            Close Video
          </button>
        </div>
      </div>
    </div>
  );
};
