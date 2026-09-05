import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Sparkles } from 'lucide-react';

export const VideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    if (total > 0) {
      setProgress((current / total) * 100);
    }
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#0E1A22] text-[#F3F0E8] overflow-hidden relative border-b border-[#3C3F45]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[#EF715A]/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Dual Header Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-cardo text-[#F3F0E8] leading-tight">
                <span className="text-[#F3F0E8]">Choose IP3 Consulting— </span>
                <span className="text-[#EF715A]">where purpose meets transformation, </span>
              </h2>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-cardo text-[#AEB0AE]">
                and innovation drives impact
              </h3>
            </div>

            <p className="text-[#AEB0AE] text-sm sm:text-base leading-relaxed">
              Experience how our integrated policy studio weaves together economic intelligence, environmental science, and digital architectures to navigate complexity in real time.
            </p>

            <div className="flex items-center gap-4 pt-2 text-xs text-[#AEB0AE]">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#EF715A]" />
                <span>Climate Research</span>
              </div>
              <span>•</span>
              <div>Data &amp; AI Modeling</div>
              <span>•</span>
              <div>Applied Systems Practice</div>
            </div>
          </motion.div>

          {/* Interactive Video Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#3C3F45] bg-[#12202B] group">
              {/* HTML5 Video element with fallback ambient animation */}
              <video
                ref={videoRef}
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
                className="w-full h-64 sm:h-80 md:h-96 object-cover cursor-pointer"
                onClick={togglePlay}
                onTimeUpdate={handleTimeUpdate}
                playsInline
                loop
                muted={isMuted}
              />

              {/* Central Play/Pause Overlay */}
              {!isPlaying && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 bg-[#0E1A22]/50 backdrop-blur-xs flex items-center justify-center cursor-pointer group-hover:bg-[#0E1A22]/40 transition-all"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#EF715A] hover:bg-[#E05E47] text-[#F3F0E8] flex items-center justify-center shadow-2xl scale-95 group-hover:scale-105 transition-transform">
                    <Play className="w-8 h-8 fill-current translate-x-0.5" />
                  </div>
                </div>
              )}

              {/* Bottom Custom Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0E1A22] via-[#0E1A22]/80 to-transparent flex flex-col gap-2">
                {/* Progress bar */}
                <div className="w-full bg-[#3C3F45] h-1.5 rounded-full overflow-hidden cursor-pointer">
                  <div
                    className="bg-[#EF715A] h-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-[#AEB0AE]">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="p-1 hover:text-[#F3F0E8] transition-colors cursor-pointer"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="p-1 hover:text-[#F3F0E8] transition-colors cursor-pointer"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <span className="text-[11px] font-mono text-[#AEB0AE]">
                      Climate-Research-Data-Technology
                    </span>
                  </div>

                  <button
                    onClick={toggleFullscreen}
                    className="p-1 hover:text-[#F3F0E8] transition-colors cursor-pointer"
                    title="Fullscreen"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
