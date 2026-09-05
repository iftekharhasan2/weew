import { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, CheckCircle2 } from 'lucide-react';

interface VideoModalProps {
  videoId: string | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export default function VideoModal({ videoId, onClose, onOpenContact }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  if (!videoId) return null;

  const getVideoTitle = (id: string) => {
    switch (id) {
      case 'video-1':
        return 'Climate Risk Impact & Sustainable Underwriting';
      case 'video-2':
        return 'Circular Economy & Waste-to-Resource Blueprint';
      case 'sustainable-future':
        return 'Driving Responsible Growth for a Sustainable and Equitable Future';
      case 'approach-video':
        return 'IP3 Holistic Transformation Approach';
      default:
        return 'IP3 Insights Documentary';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#12202B] rounded-2xl shadow-2xl overflow-hidden border border-[#3C3F45] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#3C3F45] bg-[#0E1A22] text-[#F3F0E8]">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#EF715A] font-bold">
              IP3 Multimedia Briefing
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F3F0E8] leading-tight">
              {getVideoTitle(videoId)}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#152735] hover:bg-[#3C3F45] text-[#F3F0E8] flex items-center justify-center transition-colors cursor-pointer border border-[#3C3F45]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Simulation / High-End Player */}
        <div className="relative aspect-video w-full bg-[#0E1A22] flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80"
            alt="Video Preview"
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isPlaying ? 'opacity-85' : 'opacity-40'
            }`}
          />

          {/* Overlaid Animated Visual HUD */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Center Play/Pause Indicator */}
          {!isPlaying && (
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute w-20 h-20 rounded-full bg-[#EF715A] hover:bg-[#E05E47] text-white flex items-center justify-center shadow-2xl border-2 border-white/80 transition-transform hover:scale-110 cursor-pointer"
            >
              <Play className="w-8 h-8 fill-white ml-1" />
            </button>
          )}

          {/* Lower On-screen Subtitles */}
          <div className="absolute bottom-16 left-6 right-6 text-center pointer-events-none">
            <span className="bg-[#0E1A22]/90 border border-[#3C3F45] px-4 py-1.5 rounded text-xs sm:text-sm text-[#F3F0E8] font-light backdrop-blur-xs">
              “Embedding regenerative metrics directly into macroeconomic governance frameworks...”
            </span>
          </div>

          {/* Bottom Player Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0E1A22] to-transparent p-4 flex flex-col gap-2">
            {/* Progress line */}
            <div className="w-full h-1.5 bg-[#3C3F45] rounded-full overflow-hidden cursor-pointer">
              <div className="w-3/5 h-full bg-[#EF715A] rounded-full" />
            </div>

            <div className="flex items-center justify-between text-[#F3F0E8] text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-[#EF715A] transition-colors p-1 cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-[#EF715A] transition-colors p-1 cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="text-[11px] text-[#AEB0AE]">03:42 / 06:15</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] px-2 py-0.5 rounded bg-[#152735] border border-[#3C3F45] text-[#F59E0B] font-semibold">
                  1080p HD
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer / Consultation trigger */}
        <div className="p-4 sm:p-5 bg-[#0E1A22] border-t border-[#3C3F45] flex flex-wrap items-center justify-between gap-3 text-[#F3F0E8]">
          <div className="text-xs text-[#AEB0AE] font-light">
            Want customized macroeconomic or corporate briefings for your leadership team?
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="px-4 py-2 bg-[#EF715A] hover:bg-[#E05E47] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow cursor-pointer"
          >
            Request Private Briefing
          </button>
        </div>
      </div>
    </div>
  );
}
