import React from 'react';
import { X, Film } from 'lucide-react';

interface TrailerModalProps {
  title: string;
  youtubeId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({ title, youtubeId, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#081220]/85 backdrop-blur-md transition-opacity">
      <div className="relative w-full max-w-4xl bg-[#081220] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#081220]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#ff7e67]/10 text-[#ff7e67] border border-[#ff7e67]/30">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 font-serif">{title}</h3>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Official Strategic Trailer</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer border border-slate-800"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video bg-[#050a12] flex items-center justify-center">
          {youtubeId ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
              title={`${title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              controls
              autoPlay
              className="w-full h-full object-cover"
              src="https://www.w3schools.com/html/mov_bbb.mp4"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#081220] flex justify-between items-center text-sm text-slate-400 border-t border-slate-800">
          <p className="text-xs text-slate-400">IP3 Consulting Strategic Media Production</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl text-xs font-bold transition-colors cursor-pointer border border-slate-700"
          >
            Close Trailer
          </button>
        </div>
      </div>
    </div>
  );
};
