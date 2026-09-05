import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  RotateCcw, 
  Film, 
  Sparkles, 
  Building2, 
  Globe2, 
  TrendingUp, 
  X, 
  Layers, 
  ExternalLink,
  ChevronRight,
  Clock,
  Radio,
  Minimize2,
  Tv
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface TrailerScene {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  startTime: number; // in seconds
  endTime: number;
  badge: string;
  narration: string;
  subtitles: {
    EN: string;
    FR: string;
    BN: string;
  };
  metrics: {
    label: string;
    value: string;
  };
  keyPillars: string[];
  themeColor: string;
  bgGradient: string;
}

const TRAILER_SCENES: TrailerScene[] = [
  {
    id: 'scene-1',
    number: '01',
    title: 'Institute Identity & Digital Horizon',
    subtitle: 'IP3 Consulting — Institute for Public Policy and Practice',
    startTime: 0,
    endTime: 6,
    badge: 'Opening Identity',
    narration: 'In an era of rapid digital and technological transformation...',
    subtitles: {
      EN: 'In an era of rapid digital and technological transformation.',
      FR: 'Dans une ère de transformation numérique et technologique rapide.',
      BN: 'দ্রুত ডিজিটাল এবং প্রযুক্তিগত রূপান্তরের এই যুগে।'
    },
    metrics: {
      label: 'Institutional Reach',
      value: 'Global & Regional'
    },
    keyPillars: [
      'Institute for Public Policy and Practice',
      'Operating at the intersection of policy and practice',
      'Official Portal: www.ip3-bd.org'
    ],
    themeColor: '#ff7e67',
    bgGradient: 'from-[#050a12] via-[#081220] to-[#0f172a]'
  },
  {
    id: 'scene-2',
    number: '02',
    title: 'Redefining Sovereign Possibilities',
    subtitle: 'Beyond Advice — True Transformation Partners',
    startTime: 6,
    endTime: 13,
    badge: 'Strategic Imperative',
    narration: 'Governments and Organizations need more than just advice — they need partners who redefine possibilities.',
    subtitles: {
      EN: 'Governments and Organizations need more than just advice — they need partners who redefine possibilities.',
      FR: 'Les gouvernements et les organisations ont besoin de plus que de simples conseils — ils ont besoin de partenaires qui redéfinissent les possibles.',
      BN: 'সরকার ও সংস্থাগুলোর শুধুমাত্র পরামর্শের চেয়ে বেশি প্রয়োজন — এমন সহযোগী যারা সম্ভাবনার নতুন দিগন্ত উন্মোচন করে।'
    },
    metrics: {
      label: 'Partner Engagement',
      value: 'End-to-End Delivery'
    },
    keyPillars: [
      'Overcoming traditional bureaucratic inertia',
      'Real-time data telemetry & executive decision support',
      'Bridging macroeconomic strategy with frontline execution'
    ],
    themeColor: '#38bdf8',
    bgGradient: 'from-[#050a12] via-[#0c1e33] to-[#081220]'
  },
  {
    id: 'scene-3',
    number: '03',
    title: 'Driving Uncommon Growth',
    subtitle: 'Transformative, Sustainable, Equitable & Resilient',
    startTime: 13,
    endTime: 31,
    badge: 'Growth Quad-Vector',
    narration: 'Driving uncommon growth. Growth that is transformative, sustainable, equitable, and resilient.',
    subtitles: {
      EN: 'Driving uncommon growth: Transformative, Sustainable, Equitable, and Resilient.',
      FR: 'Stimuler une croissance hors du commun : transformatrice, durable, équitable et résiliente.',
      BN: 'অসাধারণ প্রবৃদ্ধি অর্জন: যা রূপান্তরমূলক, টেকসই, সমতাভিত্তিক এবং সহনশীল।'
    },
    metrics: {
      label: 'Growth Dimensions',
      value: '4 Core Attributes'
    },
    keyPillars: [
      'Transformative: Multi-domain structural modernization',
      'Sustainable: Green taxonomy & ESG longevity',
      'Equitable: Inclusive socio-economic distribution',
      'Resilient: Shock-tested against macroeconomic volatility'
    ],
    themeColor: '#2dd4bf',
    bgGradient: 'from-[#041d1a] via-[#081220] to-[#0f172a]'
  },
  {
    id: 'scene-4',
    number: '04',
    title: '100+ Global Economists & Thinkers',
    subtitle: 'Strategic Smarts of a World-Class Consultancy',
    startTime: 31,
    endTime: 43,
    badge: 'Talent & Smarts',
    narration: 'At IP3 Consulting, with strategic smarts of a consultancy, our 100+ people — economists and innovative thinkers from diverse disciplines around the world have been empowering GROWTH.',
    subtitles: {
      EN: 'Our 100+ people — economists and innovative thinkers from diverse disciplines around the world.',
      FR: 'Nos plus de 100 experts — économistes et penseurs innovants de diverses disciplines à travers le monde.',
      BN: 'আমাদের ১০০+ বিশেষজ্ঞ — অর্থনীতিবিদ এবং উদ্ভাবনী চিন্তাবিদগণ বিশ্বজুড়ে প্রবৃদ্ধি ত্বরান্বিত করছেন।'
    },
    metrics: {
      label: 'Global Thinkers',
      value: '100+ Specialists'
    },
    keyPillars: [
      'Multi-disciplinary economists & sector specialists',
      'Deep localized knowledge backed by global best practices',
      'Collaborations with multilateral organizations (WB, IFC, ADB, WTO)'
    ],
    themeColor: '#fbbf24',
    bgGradient: 'from-[#1c1507] via-[#081220] to-[#050a12]'
  },
  {
    id: 'scene-5',
    number: '05',
    title: '4 Core Pillars of Impact',
    subtitle: 'Data-Driven, Research-Led, Fit-for-Purpose & Tailored',
    startTime: 43,
    endTime: 53,
    badge: 'Execution Architecture',
    narration: 'Empowering growth through data-driven insights, research-led policy suggestions, fit-for-purpose digital technology, tailored impact solutions.',
    subtitles: {
      EN: 'Through data-driven insights, research-led policy suggestions, fit-for-purpose digital technology, tailored impact solutions.',
      FR: 'Grâce à des analyses basées sur les données, des propositions politiques axées sur la recherche, des technologies numériques adaptées et des solutions d’impact sur mesure.',
      BN: 'উপাত্ত-ভিত্তিক অন্তর্দৃষ্টি, গবেষণা-চালিত নীতি প্রস্তাবনা, উপযোগী ডিজিটাল প্রযুক্তি এবং সুনির্দিষ্ট প্রভাব সমাধান।'
    },
    metrics: {
      label: 'Operational Frameworks',
      value: '4 Core Engines'
    },
    keyPillars: [
      'Data-Driven Insights: Econometric models & CAPI analytics',
      'Research-Led Policy: Action-research & evidence-based reforms',
      'Fit-for-Purpose Digital Tech: Scalable sovereign digital public rails',
      'Tailored Impact Solutions: Context-specific institutional roadmaps'
    ],
    themeColor: '#a855f7',
    bgGradient: 'from-[#170e2b] via-[#081220] to-[#050a12]'
  },
  {
    id: 'scene-6',
    number: '06',
    title: 'Technology-Led Focus Arenas',
    subtitle: 'Green Economies, Educational Innovation & Future-Ready Governance',
    startTime: 53,
    endTime: 61,
    badge: 'Strategic Arenas',
    narration: 'Our focus is enabling technology-led transformation for Green Economies, Educational Innovation, Future-Ready Governance.',
    subtitles: {
      EN: 'Our Focus: Enabling technology-led transformation for Green Economies, Educational Innovation, Future-Ready Governance.',
      FR: 'Notre priorité : faciliter la transformation technologique pour les économies vertes, l’innovation éducative et la gouvernance d’avenir.',
      BN: 'আমাদের লক্ষ্য: সবুজ অর্থনীতি, শিক্ষাগত উদ্ভাবন এবং ভবিষ্যত-প্রস্তুত সুশাসনের জন্য প্রযুক্তি-নেতৃত্বাধীন রূপান্তর।'
    },
    metrics: {
      label: 'Strategic Focus Areas',
      value: '3 Core Arenas'
    },
    keyPillars: [
      'Green Economies: Climate action, ESG, and circular industrial models',
      'Educational Innovation: Digital learning rails, blended models & TVET',
      'Future-Ready Governance: E-governance, institutional reform & data trust'
    ],
    themeColor: '#2dd4bf',
    bgGradient: 'from-[#051c19] via-[#081220] to-[#050a12]'
  },
  {
    id: 'scene-7',
    number: '07',
    title: 'Collaborate for Impact',
    subtitle: 'Global Network • Local Knowledge • Measurable Outcomes',
    startTime: 61,
    endTime: 64,
    badge: 'Call to Action',
    narration: 'Collaborate for impact. With a global network of experts and localized knowledge, we are here to deliver solutions that make a difference. Let’s connect: info@ip3-bd.org',
    subtitles: {
      EN: 'Collaborate for impact. Let’s connect: info@ip3-bd.org | www.ip3-bd.org',
      FR: 'Collaborer pour l’impact. Contactez-nous : info@ip3-bd.org',
      BN: 'প্রভাব সৃষ্টির জন্য একসাথে কাজ করি। যোগাযোগ করুন: info@ip3-bd.org'
    },
    metrics: {
      label: 'Direct Contact',
      value: 'info@ip3-bd.org'
    },
    keyPillars: [
      'Direct Advisory Contact: info@ip3-bd.org',
      'Institutional Hub: Gulshan-2, Dhaka, Bangladesh',
      'Global Advisory Network & Multilateral Partnerships'
    ],
    themeColor: '#ff7e67',
    bgGradient: 'from-[#081220] via-[#1a0f0d] to-[#050a12]'
  }
];

export const Ip3TrailerSection: React.FC = () => {
  const { data } = useCMS();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(64);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.85);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'EN' | 'FR' | 'BN'>('EN');

  // Read active video URL from CMS movie configuration
  const customVideoUrl = data.movie?.videoUrl || '';
  const totalDuration = videoDuration || 64;

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Listen for hash changes or click on #trailer
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#trailer') {
        setIsModalOpen(true);
      }
    };
    window.addEventListener('hashchange', handleHash);
    if (window.location.hash === '#trailer') {
      setIsModalOpen(true);
    }
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // When modal opens, auto start playing and handle body scroll lock
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    } else {
      document.body.style.overflow = '';
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  // Active scene calculation based on currentTime
  const currentSceneIndex = TRAILER_SCENES.findIndex(
    (scene, idx) => 
      currentTime >= scene.startTime && 
      (idx === TRAILER_SCENES.length - 1 || currentTime < TRAILER_SCENES[idx + 1].startTime)
  );
  const currentScene = TRAILER_SCENES[currentSceneIndex >= 0 ? currentSceneIndex : 0];

  // Sync playback speed to video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  // Sync mute and volume
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.volume = volume;
    }
  }, [isMuted, volume]);

  // Simulation timer when in pop-up without external MP4 or during interactive demo
  useEffect(() => {
    if (isModalOpen && (!videoLoaded || !customVideoUrl)) {
      const interval = setInterval(() => {
        if (isPlaying) {
          setCurrentTime((prev) => {
            const next = prev + 0.25 * playbackSpeed;
            if (next >= totalDuration) return 0;
            return next;
          });
        }
      }, 250);
      return () => clearInterval(interval);
    }
  }, [isModalOpen, isPlaying, playbackSpeed, totalDuration, videoLoaded, customVideoUrl]);

  const togglePlay = () => {
    if (videoRef.current && customVideoUrl) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  const handleSeek = (time: number) => {
    const clampedTime = Math.max(0, Math.min(totalDuration, time));
    setCurrentTime(clampedTime);
    if (videoRef.current) {
      videoRef.current.currentTime = clampedTime;
    }
  };

  const handleJumpToScene = (sceneIndex: number) => {
    const scene = TRAILER_SCENES[sceneIndex];
    if (scene) {
      handleSeek(scene.startTime);
      if (!isPlaying) {
        setIsPlaying(true);
        videoRef.current?.play().catch(() => {});
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  return (
    <>
      {/* Anchor for in-page linking or navigation */}
      <div id="trailer" className="relative -top-24 opacity-0 pointer-events-none" />

      {/* ========================================================================= */}
      {/* FLOATING POP-UP LAUNCHER BUTTON (MINIMIZED BY DEFAULT) */}
      {/* ========================================================================= */}
      <aside 
        aria-label="Institutional Film Launcher"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group"
      >
        {/* Floating Mini Action Pill Button */}
        <motion.button
          type="button"
          onClick={() => setIsModalOpen(true)}
          initial={{ scale: 0.9, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative flex items-center gap-2.5 pl-3 pr-4 py-2.5 rounded-full bg-[#081220]/95 text-slate-100 border border-[#ff7e67]/60 hover:border-[#ff7e67] shadow-xl shadow-black/60 backdrop-blur-md cursor-pointer transition-all duration-200 group/btn ring-1 ring-[#ff7e67]/20"
          title="Click to open IP3 Institutional Trailer video"
        >
          {/* Subtle Ambient Pulse Ring */}
          <span className="absolute inset-0 rounded-full bg-[#ff7e67]/20 animate-ping opacity-30 pointer-events-none" />

          {/* Glowing Play Icon Circle */}
          <div className="w-7 h-7 rounded-full bg-[#ff7e67] text-white flex items-center justify-center shadow-md group-hover/btn:bg-[#e06a54] transition-colors shrink-0">
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          </div>

          {/* Label + Duration */}
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-xs font-bold tracking-tight text-slate-100 group-hover/btn:text-[#ff7e67] transition-colors whitespace-nowrap">
                Watch Film
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#ff7e67]/15 text-[#ff7e67] font-semibold leading-none">
                1:04
              </span>
            </div>
            <span className="text-[10px] text-slate-400 leading-tight tracking-normal whitespace-nowrap mt-0.5">
              IP3 Institutional Trailer
            </span>
          </div>

          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-slate-100 group-hover/btn:translate-x-0.5 transition-all ml-0.5" />
        </motion.button>
      </aside>

      {/* ========================================================================= */}
      {/* POP-UP MODAL CINEMA PLAYER (DISMISSIBLE / FULL CONTROLS) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div 
            role="dialog"
            aria-modal="true"
            aria-label="IP3 Institutional Film Pop-up Player"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 overflow-y-auto"
          >
            
            {/* Backdrop Dismiss Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog Content Container */}
            <motion.div
              ref={containerRef}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              className="relative w-full max-w-5xl rounded-2xl sm:rounded-3xl bg-[#050a12] border-2 border-slate-800 shadow-2xl shadow-black/95 overflow-hidden z-10 flex flex-col my-auto select-none ring-1 ring-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Modal Top Header Bar */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#081220] border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#ff7e67]/10 text-[#ff7e67] flex items-center justify-center">
                    <Film className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-100 flex items-center gap-2">
                      <span>IP3 Institutional Film</span>
                      <span className="text-[10px] font-mono text-[#ff7e67] bg-[#ff7e67]/10 px-2 py-0.5 rounded border border-[#ff7e67]/20">
                        {currentScene.badge}
                      </span>
                    </h4>
                  </div>
                </div>

                {/* Right Header Options (Subtitles Lang & Minimize/Close) */}
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Language Selector */}
                  <div className="flex items-center bg-[#050a12] rounded-lg p-0.5 border border-slate-800 text-[10px] font-mono">
                    {(['EN', 'FR', 'BN'] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setSelectedLanguage(lang)}
                        className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                          selectedLanguage === lang 
                            ? 'bg-[#ff7e67] text-white font-bold' 
                            : 'text-slate-400 hover:text-slate-100'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>

                  {/* Minimize / Close Modal Button */}
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="p-1.5 sm:p-2 rounded-xl bg-[#050a12] hover:bg-[#ff7e67] text-slate-400 hover:text-white border border-slate-800 hover:border-[#ff7e67] transition-all cursor-pointer shadow-md flex items-center gap-1 text-xs"
                    title="Minimize / Close (Esc)"
                  >
                    <Minimize2 className="w-4 h-4" />
                    <span className="hidden sm:inline text-[11px] font-medium pr-1">Minimize</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="p-1.5 sm:p-2 rounded-xl bg-[#050a12] hover:bg-red-500 text-slate-400 hover:text-white border border-slate-800 hover:border-red-500 transition-all cursor-pointer shadow-md"
                    title="Close (Esc)"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Cinema Viewport (16:9 Aspect Ratio) */}
              <div className="relative aspect-video w-full bg-black overflow-hidden flex flex-col justify-between">
                
                {/* REAL VIDEO ELEMENT LAYER */}
                <video
                  ref={videoRef}
                  playsInline
                  autoPlay
                  muted={isMuted}
                  loop
                  src={customVideoUrl || undefined}
                  onLoadedMetadata={(e) => {
                    setVideoLoaded(true);
                    const dur = e.currentTarget.duration;
                    if (dur && !isNaN(dur) && isFinite(dur)) {
                      setVideoDuration(dur);
                    }
                  }}
                  onTimeUpdate={(e) => {
                    setCurrentTime(e.currentTarget.currentTime);
                  }}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0;
                      videoRef.current.play().catch(() => {});
                    }
                    setCurrentTime(0);
                    setIsPlaying(true);
                  }}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-10 ${
                    customVideoUrl ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  Your browser does not support the video tag.
                </video>

                {/* Animated Motion Canvas (Backdrop or Simulation Mode) */}
                <div className={`absolute inset-0 bg-gradient-to-br ${currentScene.bgGradient} transition-opacity duration-500 overflow-hidden ${
                  !customVideoUrl ? 'opacity-100' : 'opacity-25 pointer-events-none'
                }`}>
                  <div 
                    className="absolute -top-1/4 -right-1/4 w-[130%] h-[130%] rounded-full border border-white/5 opacity-40 transition-transform duration-1000"
                    style={{ transform: `rotate(${currentTime * 12}deg)` }}
                  />
                  <div 
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                      backgroundImage: `linear-gradient(to right, #F3F0E8 1px, transparent 1px), linear-gradient(to bottom, #F3F0E8 1px, transparent 1px)`,
                      backgroundSize: '48px 48px'
                    }}
                  />
                </div>

                {/* Dynamic Cinematic Motion Scene Graphics (When no video file is provided) */}
                {!customVideoUrl && (
                  <div className="relative z-20 px-6 sm:px-12 flex-1 flex flex-col justify-center items-center text-center max-w-2xl mx-auto pb-12 pointer-events-none">
                    
                    {/* SCENE 1 */}
                    {currentScene.id === 'scene-1' && (
                      <div className="space-y-3 animate-in fade-in zoom-in-95 duration-500">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#081220]/90 border border-[#ff7e67]/40 text-[#ff7e67] text-xs font-mono font-bold uppercase tracking-widest">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Institute for Public Policy and Practice</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight text-slate-100">
                          IP3 CONSULTING
                        </h1>
                        <div className="w-20 h-1 bg-[#ff7e67] mx-auto rounded-full" />
                        <p className="text-xs sm:text-sm text-slate-400 font-mono tracking-wider">
                          www.ip3-bd.org
                        </p>
                      </div>
                    )}

                    {/* SCENE 2 */}
                    {currentScene.id === 'scene-2' && (
                      <div className="space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-500">
                        <div className="p-2.5 rounded-2xl bg-[#38bdf8]/20 border border-[#38bdf8]/40 text-[#38bdf8] inline-flex items-center gap-2">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-100 font-serif leading-tight">
                          Governments & Organizations
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-lg">
                          Need more than just advice — they need partners who <span className="text-[#38bdf8] font-bold">redefine possibilities</span>.
                        </p>
                      </div>
                    )}

                    {/* SCENE 3 */}
                    {currentScene.id === 'scene-3' && (
                      <div className="space-y-3 animate-in fade-in duration-500">
                        <div className="flex items-center justify-center gap-2 text-[#2dd4bf]">
                          <TrendingUp className="w-6 h-6 animate-bounce" />
                          <span className="text-xs font-mono font-bold tracking-widest uppercase">Velocity Matrix</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100">
                          Driving <span className="text-[#2dd4bf] underline decoration-[#2dd4bf]/50 underline-offset-8">Uncommon Growth ↑</span>
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] font-mono">
                          <span className="p-2 rounded-xl bg-[#081220]/90 border border-[#2dd4bf]/40 text-slate-100 font-bold">
                            Transformative
                          </span>
                          <span className="p-2 rounded-xl bg-[#081220]/90 border border-[#2dd4bf]/40 text-slate-100 font-bold">
                            Sustainable
                          </span>
                          <span className="p-2 rounded-xl bg-[#081220]/90 border border-[#2dd4bf]/40 text-slate-100 font-bold">
                            Equitable
                          </span>
                          <span className="p-2 rounded-xl bg-[#081220]/90 border border-[#2dd4bf]/40 text-slate-100 font-bold">
                            Resilient
                          </span>
                        </div>
                      </div>
                    )}

                    {/* SCENE 4 */}
                    {currentScene.id === 'scene-4' && (
                      <div className="space-y-3 animate-in fade-in duration-500">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fbbf24]/20 border border-[#fbbf24]/40 text-[#fbbf24] text-xs font-mono font-bold">
                          <Globe2 className="w-3.5 h-3.5" />
                          <span>Strategic Consultancy Smarts</span>
                        </div>
                        <div className="text-4xl sm:text-5xl font-black font-mono text-slate-100">
                          <span className="text-[#fbbf24]">100+</span> People
                        </div>
                        <p className="text-xs sm:text-sm text-slate-400 max-w-md">
                          Economists and innovative thinkers from diverse disciplines around the world empowering growth.
                        </p>
                      </div>
                    )}

                    {/* SCENE 5 */}
                    {currentScene.id === 'scene-5' && (
                      <div className="space-y-3 animate-in fade-in duration-500 w-full max-w-lg">
                        <div className="text-xs font-mono text-[#a855f7] uppercase font-bold tracking-wider">
                          Empowering Growth Through
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-left">
                          <div className="p-2 rounded-xl bg-[#081220]/90 border border-[#a855f7]/40 text-xs font-mono font-bold text-slate-100">
                            Data-Driven Insights
                          </div>
                          <div className="p-2 rounded-xl bg-[#081220]/90 border border-[#a855f7]/40 text-xs font-mono font-bold text-slate-100">
                            Research-Led Policy
                          </div>
                          <div className="p-2 rounded-xl bg-[#081220]/90 border border-[#a855f7]/40 text-xs font-mono font-bold text-slate-100">
                            Fit-for-Purpose Tech
                          </div>
                          <div className="p-2 rounded-xl bg-[#081220]/90 border border-[#a855f7]/40 text-xs font-mono font-bold text-slate-100">
                            Tailored Solutions
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SCENE 6 */}
                    {currentScene.id === 'scene-6' && (
                      <div className="space-y-3 animate-in fade-in duration-500 w-full max-w-lg">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2dd4bf]/20 border border-[#2dd4bf]/40 text-[#2dd4bf] text-xs font-mono font-bold uppercase tracking-wider">
                          <span>Our Transformation Focus</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="p-2.5 rounded-2xl bg-[#081220]/90 border border-[#2dd4bf]/40 text-[11px] font-bold text-slate-100">
                            Green Economies
                          </div>
                          <div className="p-2.5 rounded-2xl bg-[#081220]/90 border border-[#38bdf8]/40 text-[11px] font-bold text-slate-100">
                            Education Reform
                          </div>
                          <div className="p-2.5 rounded-2xl bg-[#081220]/90 border border-[#ff7e67]/40 text-[11px] font-bold text-slate-100">
                            Future Governance
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SCENE 7 */}
                    {currentScene.id === 'scene-7' && (
                      <div className="space-y-3 animate-in fade-in zoom-in-95 duration-500">
                        <div className="p-2 rounded-full bg-[#ff7e67]/20 border border-[#ff7e67]/40 text-[#ff7e67] inline-flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 font-serif">
                          Collaborate for Impact
                        </h2>
                        <p className="text-xs text-slate-400 max-w-md">
                          Global network of experts and localized knowledge delivering solutions that make a difference.
                        </p>
                      </div>
                    )}

                  </div>
                )}

                {/* Subtitle Banner Overlay */}
                <div className="absolute bottom-16 left-4 right-4 z-20 flex justify-center pointer-events-none">
                  <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10 text-center max-w-2xl">
                    <p className="text-xs sm:text-sm text-white font-medium">
                      {currentScene.subtitles[selectedLanguage]}
                    </p>
                  </div>
                </div>

                {/* YouTube-Style Bottom Overlay Control Bar */}
                <div className="absolute bottom-0 left-0 right-0 z-30 pt-12 pb-2 px-3 sm:px-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent pointer-events-auto flex flex-col justify-end transition-opacity duration-300">
                  
                  {/* Scrubber Timeline Bar */}
                  <div 
                    className="group/scrub relative w-full h-3 flex items-center cursor-pointer select-none"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pos = (e.clientX - rect.left) / rect.width;
                      handleSeek(pos * totalDuration);
                    }}
                  >
                    {/* Background Rail */}
                    <div className="relative w-full h-1 group-hover/scrub:h-1.5 bg-white/25 rounded-full transition-all duration-150">
                      {/* Progress Line */}
                      <div 
                        className="absolute top-0 left-0 h-full bg-[#ff7e67] rounded-full"
                        style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                      >
                        {/* Red Scrubber Head Knob */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#ff7e67] rounded-full scale-0 group-hover/scrub:scale-100 transition-transform duration-100 shadow-md ring-2 ring-white/50" />
                      </div>
                    </div>

                    {/* Chapter Marker Ticks */}
                    {TRAILER_SCENES.map((scene, idx) => (
                      <button
                        key={scene.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleJumpToScene(idx);
                        }}
                        className={`absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full border border-black/40 transition-transform hover:scale-150 cursor-pointer ${
                          currentSceneIndex === idx ? 'bg-[#ff7e67] scale-125' : 'bg-white/40'
                        }`}
                        style={{ left: `${(scene.startTime / totalDuration) * 100}%` }}
                        title={`Scene ${scene.number}: ${scene.title}`}
                      />
                    ))}
                  </div>

                  {/* YouTube Bottom Controls Row */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    
                    {/* Left Controls: Play/Pause, Replay, Volume Slider, Timestamp */}
                    <div className="flex items-center gap-1 sm:gap-2 text-white">
                      {/* Play / Pause */}
                      <button
                        onClick={togglePlay}
                        className="p-1.5 sm:p-2 rounded-full hover:bg-white/15 text-white transition-colors cursor-pointer"
                        title={isPlaying ? 'Pause (k)' : 'Play (k)'}
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5 fill-current" />
                        ) : (
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        )}
                      </button>

                      {/* Replay */}
                      <button
                        onClick={() => handleSeek(0)}
                        className="p-1.5 sm:p-2 rounded-full hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
                        title="Replay from start"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>

                      {/* Volume Slider Group */}
                      <div className="flex items-center">
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className="p-1.5 sm:p-2 rounded-full hover:bg-white/15 text-white/90 hover:text-white transition-colors cursor-pointer"
                          title={isMuted ? 'Unmute (m)' : 'Mute (m)'}
                        >
                          {isMuted || volume === 0 ? (
                            <VolumeX className="w-5 h-5" />
                          ) : (
                            <Volume2 className="w-5 h-5" />
                          )}
                        </button>
                        
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={isMuted ? 0 : volume}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setVolume(val);
                            if (val > 0 && isMuted) {
                              setIsMuted(false);
                            }
                            if (videoRef.current) {
                              videoRef.current.volume = val;
                              videoRef.current.muted = val === 0;
                            }
                          }}
                          className="w-16 sm:w-20 accent-[#ff7e67] h-1 bg-white/30 rounded-lg cursor-pointer ml-1"
                        />
                      </div>

                      {/* Timestamp */}
                      <div className="text-[11px] sm:text-xs text-white/90 font-sans tracking-normal pl-1 select-none">
                        <span className="font-medium">{formatTime(currentTime)}</span>
                        <span className="text-white/50 mx-1">/</span>
                        <span className="text-white/60">{formatTime(totalDuration)}</span>
                      </div>
                    </div>

                    {/* Right Controls: Playback Speed, Fullscreen */}
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-0.5 border border-white/10">
                        {[1, 1.25, 1.5].map((spd) => (
                          <button
                            key={spd}
                            onClick={() => setPlaybackSpeed(spd)}
                            className={`px-1.5 sm:px-2 py-0.5 rounded text-[10px] font-sans transition-colors cursor-pointer ${
                              playbackSpeed === spd 
                                ? 'bg-[#ff7e67] text-white font-bold' 
                                : 'text-white/70 hover:text-white'
                            }`}
                          >
                            {spd}x
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={toggleFullscreen}
                        className="p-1.5 sm:p-2 rounded-full hover:bg-white/15 text-white/90 hover:text-white transition-colors cursor-pointer"
                        title="Fullscreen (f)"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </div>

              </div>

              {/* Bottom Quick Scene Selection Strip */}
              <div className="p-3 sm:p-4 bg-[#081220] border-t border-slate-800 overflow-x-auto flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 shrink-0 mr-1 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-[#ff7e67]" />
                  <span>Scenes:</span>
                </span>
                {TRAILER_SCENES.map((scene, idx) => (
                  <button
                    key={scene.id}
                    onClick={() => handleJumpToScene(idx)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                      currentSceneIndex === idx 
                        ? 'bg-[#ff7e67] text-white font-bold shadow-md shadow-[#ff7e67]/30'
                        : 'bg-[#050a12] text-slate-400 hover:text-slate-100 border border-slate-800'
                    }`}
                  >
                    <span>{scene.number}</span>
                    <span className="hidden sm:inline text-[11px] truncate max-w-[120px]">{scene.badge}</span>
                  </button>
                ))}
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Ip3TrailerSection;
