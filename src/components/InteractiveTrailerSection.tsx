import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  RotateCcw, 
  Film, 
  Sparkles, 
  Clock, 
  Layers, 
  ChevronRight, 
  Subtitles, 
  Sliders, 
  Download, 
  Share2, 
  Info,
  CheckCircle2,
  Shield,
  BarChart3,
  Globe2,
  Cpu,
  Building2,
  FileText,
  Phone,
  Mail,
  Award,
  Leaf,
  RefreshCw,
  TreeDeciduous,
  ExternalLink
} from 'lucide-react';

interface TrailerChapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  timestamp: number; // in seconds
  duration: number; // in seconds
  theme: string;
  highlightMetric: { label: string; value: string };
  keyTakeaway: string;
  intelDossier: {
    heading: string;
    points: string[];
    governancePillar: string;
  };
  posterImage: string;
}

const TRAILER_CHAPTERS: TrailerChapter[] = [
  {
    id: 'ch-expert',
    number: '01',
    title: 'Economic Policy & Sustainability Transformation',
    subtitle: 'Keynote Feature: Mohammad Syful Hoque',
    timestamp: 0,
    duration: 25,
    theme: 'Expertise & Leadership',
    highlightMetric: { label: 'Global Projects Underpinned', value: '75+ Across WB, IFC, ADB, WTO' },
    keyTakeaway: 'Championing the forefront of climate solutions, ESG excellence, and circular economy principles for long-term sovereign value creation across 30+ multilateral bodies.',
    intelDossier: {
      heading: 'Syful Hoque Transformation Pillars',
      points: [
        '17 years of experience in economic policy & sustainability transformation in policy & practice.',
        '75+ high-impact projects for World Bank, IFC, ADB, SIDA, W.T.O., and the European Commission.',
        'Collaborations with 30+ international development organizations driving systemic outcomes.',
        'Translates rigorous economic theories and analytic models into non-technical clarity.'
      ],
      governancePillar: 'Economic Policy, ESG & Circular Economy'
    },
    posterImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'ch-1',
    number: '02',
    title: 'The Poly-Crisis Horizon',
    subtitle: 'Institutional Friction & Sovereign Vulnerability',
    timestamp: 25,
    duration: 25,
    theme: 'Diagnostic',
    highlightMetric: { label: 'Sovereign Debt Vulnerability', value: '68% of Low-Income States' },
    keyTakeaway: 'Fragmented bureaucracy and asymmetric data prevent ministries from executing multi-domain structural reform during concurrent systemic shocks.',
    intelDossier: {
      heading: 'Macro-Fiscal & Sovereign Risk Landscape',
      points: [
        'Concurrent climate, debt, and technological shocks outpace traditional policy cycles.',
        'Cabinet decision-makers face 6–18 month empirical lag during crises.',
        'Traditional consulting deliverables end in shelf-bound reports without execution capability.'
      ],
      governancePillar: 'Diagnostic Complexity & Vulnerability'
    },
    posterImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'ch-2',
    number: '03',
    title: 'Action-Research & Empirical Simulation',
    subtitle: 'Computational Policy Modeling & Live Stress-Testing',
    timestamp: 50,
    duration: 25,
    theme: 'Simulation',
    highlightMetric: { label: 'Policy Simulation Fidelity', value: '99.4% Multi-Agent Accuracy' },
    keyTakeaway: 'IP3 deploys stochastic macroeconomic models and econometric stress-tests before legislation or capital allocation is formalized.',
    intelDossier: {
      heading: 'Computational Governance Sandbox',
      points: [
        'Agent-based simulation of public tariffs, inflation shocks, and supply chains.',
        'Synthetic counterfactual testing across 50,000 algorithmic iterations.',
        'Rigorous institutional de-risking prior to sovereign commitment.'
      ],
      governancePillar: 'Empirical Evidence & Policy Sandbox'
    },
    posterImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'ch-3',
    number: '04',
    title: 'Capital Mobilization & Blended Rails',
    subtitle: 'Concessional Co-Investment & First-Loss De-Risking',
    timestamp: 75,
    duration: 25,
    theme: 'Capital',
    highlightMetric: { label: 'Private Capital Crowded In', value: '4.8x Concessional Ratio' },
    keyTakeaway: 'Structuring bankable sovereign infrastructure and blended green instruments that bridge multilateral grants with institutional balance sheets.',
    intelDossier: {
      heading: 'Blended Finance Architecture',
      points: [
        'Sovereign green & blue bond framework engineering with Article 6 compliance.',
        'First-loss guarantees and currency de-risking facilities.',
        'DFI and commercial syndication for sovereign priority infrastructure.'
      ],
      governancePillar: 'Capital Mobilization & Instrument Structuring'
    },
    posterImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'ch-4',
    number: '05',
    title: 'Cabinet Delivery Units & Command Mesh',
    subtitle: 'High-Velocity Execution Inside Presidential Units',
    timestamp: 100,
    duration: 25,
    theme: 'Execution',
    highlightMetric: { label: 'Delivery Unit Velocity', value: '3.4x Milestone Speed' },
    keyTakeaway: 'Embedding agile, data-empowered Presidential and Ministerial Delivery Units to break institutional silos and deliver tangible results within 100 days.',
    intelDossier: {
      heading: 'Executive Delivery Unit Protocols',
      points: [
        'Cross-ministerial performance dashboards with real-time KPI telemetry.',
        'Rapid bottleneck escalation directly to Prime Minister / Cabinet leadership.',
        'Digital public rails engineered with open-source sovereignty.'
      ],
      governancePillar: 'Delivery Units & Public Operations'
    },
    posterImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1600'
  }
];

// Sample high-quality video clips
const VIDEO_SOURCES = {
  expertKeynote: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  cinematic: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  techLoop: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
};

export const InteractiveTrailerSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.8);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(125); // 2:05 total
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);
  const [selectedLanguage, setSelectedLanguage] = useState<'EN' | 'FR' | 'AR'>('EN');
  const [activeIntelTab, setActiveIntelTab] = useState<'takeaway' | 'dossier' | 'metric'>('takeaway');
  const [activeMode, setActiveMode] = useState<'expert' | 'master' | 'methodology'>('expert');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);
  const [downloadBriefSuccess, setDownloadBriefSuccess] = useState<boolean>(false);
  const [activeOrbitalPillar, setActiveOrbitalPillar] = useState<number>(0);

  // Autoplay on mount and when mode or chapter changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay with sound might be blocked, ensure muted
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
            }
          });
      }
    }
  }, [activeMode]);

  const SUSTAINABILITY_PILLARS = [
    {
      id: 'climate-action',
      title: 'CLIMATE ACTION',
      icon: Leaf,
      color: '#2dd4bf',
      desc: 'Championing the forefront of climate solutions, adaptation pathways, and clean energy transition models.',
      badge: 'Article 6 & NDC Align'
    },
    {
      id: 'esg',
      title: 'ENVIRONMENTAL SOCIAL GOVERNANCE (ESG)',
      icon: Shield,
      color: '#38bdf8',
      desc: 'Rigorous ESG excellence, corporate disclosure, and sustainable taxonomy for global institutions.',
      badge: 'ESG Excellence'
    },
    {
      id: 'biodiversity',
      title: 'BIODIVERSITY CONSERVATION',
      icon: TreeDeciduous,
      color: '#2dd4bf',
      desc: 'Valuing natural capital, blue economy protection, and biodiversity credit instruments.',
      badge: 'Nature Capital'
    },
    {
      id: 'circular-economy',
      title: 'CIRCULAR ECONOMY',
      icon: RefreshCw,
      color: '#ff7e67',
      desc: 'Principles of closed-loop value creation, resource efficiency, and industrial symbiosis.',
      badge: 'Zero-Waste Model'
    }
  ];

  // Auto rotate active pillar every 4s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveOrbitalPillar((prev) => (prev + 1) % SUSTAINABILITY_PILLARS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Sync current time and detect chapter
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      setCurrentTime(current);
      
      // Calculate which chapter is active based on timestamp
      const chapterIdx = TRAILER_CHAPTERS.findIndex(
        (ch, idx) => 
          current >= ch.timestamp && 
          (idx === TRAILER_CHAPTERS.length - 1 || current < TRAILER_CHAPTERS[idx + 1].timestamp)
      );
      if (chapterIdx !== -1 && chapterIdx !== activeChapterIndex) {
        setActiveChapterIndex(chapterIdx);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleSelectChapter = (index: number) => {
    setActiveChapterIndex(index);
    const chapter = TRAILER_CHAPTERS[index];
    if (chapter && videoRef.current) {
      videoRef.current.currentTime = chapter.timestamp;
      setCurrentTime(chapter.timestamp);
      if (!isPlaying) {
        videoRef.current.play().then(() => setIsPlaying(true));
      }
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
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

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('Econpolicy&SusTransGroup@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard?.writeText('+88019174011329');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleDownloadBrief = () => {
    setDownloadBriefSuccess(true);
    setTimeout(() => setDownloadBriefSuccess(false), 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentChapter = TRAILER_CHAPTERS[activeChapterIndex] || TRAILER_CHAPTERS[0];

  return (
    <section 
      id="trailer" 
      className="w-full py-16 sm:py-20 lg:py-24 bg-[#050a12] text-slate-100 relative overflow-hidden"
    >
      {/* Background Ambience & Fine Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#F3F0E8 1px, transparent 1px), linear-gradient(90deg, #F3F0E8 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#ff7e67]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#38bdf8]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* ========================================================================= */}
        {/* INTERACTIVE VIDEO THEATER & CHAPTER DOSSIER */}
        {/* ========================================================================= */}
        <div>
          {/* Section Sub-Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-slate-800">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff7e67]/10 border border-[#ff7e67]/30 text-[#ff7e67] text-xs font-mono font-bold uppercase tracking-widest shadow-xs">
                <Film className="w-3.5 h-3.5" />
                <span>Cinematic Sovereign Briefing</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight font-serif">
                The IP3 Institutional <span className="text-[#ff7e67] italic">Trailer</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Explore our strategic film exploring sovereign complexity, empirical policy modeling, blended capital rails, and high-velocity ministerial execution.
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center gap-2 bg-[#081220] p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto">
              <button
                onClick={() => {
                  setActiveMode('expert');
                  handleSelectChapter(0);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-mono transition-all cursor-pointer ${
                  activeMode === 'expert'
                    ? 'bg-[#ff7e67] text-slate-900 font-bold shadow-md shadow-[#ff7e67]/20'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                Syful Hoque Keynote
              </button>
              <button
                onClick={() => setActiveMode('master')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-mono transition-all cursor-pointer ${
                  activeMode === 'master'
                    ? 'bg-[#ff7e67] text-slate-900 font-bold shadow-md shadow-[#ff7e67]/20'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                Master Cut (2:05)
              </button>
              <button
                onClick={() => setActiveMode('methodology')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-mono transition-all cursor-pointer ${
                  activeMode === 'methodology'
                    ? 'bg-[#ff7e67] text-slate-900 font-bold shadow-md shadow-[#ff7e67]/20'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                Methodology Focus
              </button>
            </div>
          </div>

          {/* Main Video Theater Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Main Player Canvas (Left 8 Columns) */}
            <div className="lg:col-span-8 space-y-4">
              <div 
                ref={containerRef}
                className="relative aspect-video rounded-3xl overflow-hidden bg-[#081220] border-2 border-slate-800 shadow-2xl shadow-black/80 group"
              >
                {/* HTML5 Video Element with Autoplay */}
                <video
                  ref={videoRef}
                  src={
                    activeMode === 'expert'
                      ? VIDEO_SOURCES.expertKeynote
                      : activeMode === 'master' 
                        ? VIDEO_SOURCES.cinematic 
                        : VIDEO_SOURCES.techLoop
                  }
                  poster={currentChapter.posterImage}
                  autoPlay
                  playsInline
                  muted={isMuted}
                  loop
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0;
                      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
                    }
                  }}
                  className="w-full h-full object-cover"
                />

                {/* Poster/Overlay when paused */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-[#081220]/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center z-10 animate-in fade-in duration-200">
                    <div className="relative mb-4">
                      <div className="absolute -inset-4 bg-[#ff7e67]/30 rounded-full blur-xl animate-pulse" />
                      <button
                        onClick={togglePlay}
                        className="relative w-20 h-20 rounded-full bg-[#ff7e67] hover:bg-[#e06a54] text-slate-900 flex items-center justify-center shadow-2xl transition-transform hover:scale-110 cursor-pointer"
                        aria-label="Resume video playback"
                      >
                        <Play className="w-8 h-8 fill-current ml-1" />
                      </button>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-slate-100 mb-1">
                      {currentChapter.title}
                    </h3>
                    <p className="text-xs text-slate-400 max-w-md font-mono">
                      Scene {currentChapter.number} // Click to Resume Playback
                    </p>
                  </div>
                )}

                {/* Active Scene Watermark / Chapter Tag */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-[#081220]/90 backdrop-blur-md border border-slate-800 text-[11px] font-mono font-bold text-[#ff7e67] flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-[#ff7e67] animate-ping" />
                    SCENE {currentChapter.number} // {currentChapter.title.toUpperCase()}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#081220]/80 backdrop-blur-md border border-slate-800 text-[10px] font-mono text-slate-400 hidden sm:inline">
                    {currentChapter.theme}
                  </span>
                </div>

                {/* Live In-Scene Intel Pin Overlay (Interactive) */}
                {isPlaying && (
                  <div className="absolute top-4 right-4 z-20 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="px-3 py-1.5 rounded-xl bg-[#081220]/95 backdrop-blur-md border border-[#ff7e67]/40 text-right shadow-xl">
                      <div className="text-[9px] font-mono text-[#ff7e67] uppercase tracking-wider font-bold">
                        {currentChapter.highlightMetric.label}
                      </div>
                      <div className="text-xs font-mono font-extrabold text-slate-100">
                        {currentChapter.highlightMetric.value}
                      </div>
                    </div>
                  </div>
                )}

                {/* Subtitles Overlay */}
                {showSubtitles && isPlaying && (
                  <div className="absolute bottom-16 left-4 right-4 text-center z-20 pointer-events-none">
                    <span className="inline-block px-4 py-1.5 rounded-xl bg-[#081220]/90 text-slate-100 text-xs sm:text-sm font-medium border border-slate-800 backdrop-blur-md shadow-2xl">
                      {selectedLanguage === 'EN' && currentChapter.keyTakeaway}
                      {selectedLanguage === 'FR' && `[FR] ${currentChapter.keyTakeaway}`}
                      {selectedLanguage === 'AR' && `[AR] ${currentChapter.keyTakeaway}`}
                    </span>
                  </div>
                )}

                {/* Video Player Bottom Controls Bar */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#081220] via-[#081220]/90 to-transparent p-4 z-30 transition-opacity duration-300">
                  
                  {/* Progress Bar & Chapter Markers */}
                  <div className="relative w-full h-2 bg-slate-800/80 rounded-full mb-3 cursor-pointer group/bar overflow-visible"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pos = (e.clientX - rect.left) / rect.width;
                      handleSeek(pos * duration);
                    }}
                  >
                    {/* Filled Progress */}
                    <div 
                      className="absolute top-0 left-0 h-full bg-[#ff7e67] rounded-full"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                    
                    {/* Chapter Marker Ticks */}
                    {TRAILER_CHAPTERS.map((ch, idx) => (
                      <button
                        key={ch.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectChapter(idx);
                        }}
                        className={`absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border border-[#081220] transition-transform hover:scale-150 cursor-pointer ${
                          activeChapterIndex === idx ? 'bg-slate-100 scale-125 ring-2 ring-[#ff7e67]' : 'bg-slate-400'
                        }`}
                        style={{ left: `${(ch.timestamp / duration) * 100}%` }}
                        title={`Jump to Scene ${ch.number}: ${ch.title}`}
                      />
                    ))}
                  </div>

                  {/* Control Buttons Row */}
                  <div className="flex items-center justify-between gap-3 text-xs font-mono">
                    
                    {/* Left Controls: Play/Pause, Replay, Time */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={togglePlay}
                        className="p-2 rounded-xl bg-[#050a12] hover:bg-[#ff7e67] hover:text-slate-900 text-slate-100 transition-colors cursor-pointer border border-slate-800"
                        title={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                      </button>

                      <button
                        onClick={() => handleSeek(0)}
                        className="p-2 rounded-xl bg-[#050a12] hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer border border-slate-800"
                        title="Restart Video"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>

                      {/* Mute & Audio Visualizer */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={toggleMute}
                          className="p-2 rounded-xl bg-[#050a12] hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer border border-slate-800"
                          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                        >
                          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#ff7e67]" /> : <Volume2 className="w-3.5 h-3.5 text-slate-100" />}
                        </button>

                        {!isMuted && isPlaying && (
                          <div className="flex items-center gap-0.5 h-4 px-1">
                            <span className="w-1 bg-[#ff7e67] h-3 animate-pulse" />
                            <span className="w-1 bg-[#ff7e67] h-4 animate-bounce" />
                            <span className="w-1 bg-[#ff7e67] h-2 animate-pulse" />
                          </div>
                        )}
                      </div>

                      <div className="text-[11px] text-slate-400 font-mono">
                        <span className="text-slate-100 font-bold">{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
                      </div>
                    </div>

                    {/* Right Controls: Speed, Subtitles, Lang, Fullscreen */}
                    <div className="flex items-center gap-2">
                      
                      {/* Speed Selector */}
                      <div className="flex items-center bg-[#050a12] rounded-xl border border-slate-800 p-0.5">
                        {[1, 1.25, 1.5].map((spd) => (
                          <button
                            key={spd}
                            onClick={() => handleSpeedChange(spd)}
                            className={`px-2 py-1 rounded-lg text-[10px] font-mono transition-colors cursor-pointer ${
                              playbackSpeed === spd ? 'bg-[#ff7e67] text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-100'
                            }`}
                          >
                            {spd}x
                          </button>
                        ))}
                      </div>

                      {/* Subtitle Toggle */}
                      <button
                        onClick={() => setShowSubtitles(!showSubtitles)}
                        className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                          showSubtitles 
                            ? 'bg-[#ff7e67]/20 border-[#ff7e67] text-[#ff7e67]' 
                            : 'bg-[#050a12] border-slate-800 text-slate-400'
                        }`}
                        title="Toggle Captions"
                      >
                        <Subtitles className="w-3.5 h-3.5" />
                      </button>

                      {/* Language Switch */}
                      {showSubtitles && (
                        <select
                          value={selectedLanguage}
                          onChange={(e) => setSelectedLanguage(e.target.value as any)}
                          className="bg-[#050a12] border border-slate-800 rounded-xl text-[10px] text-slate-100 px-2 py-1.5 focus:outline-none cursor-pointer"
                        >
                          <option value="EN">EN</option>
                          <option value="FR">FR</option>
                          <option value="AR">AR</option>
                        </select>
                      )}

                      {/* Fullscreen Button */}
                      <button
                        onClick={toggleFullscreen}
                        className="p-2 rounded-xl bg-[#050a12] hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer border border-slate-800"
                        title="Toggle Fullscreen"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

                </div>
              </div>

              {/* Quick Scene Select Bar below Video */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                {TRAILER_CHAPTERS.map((ch, idx) => (
                  <button
                    key={ch.id}
                    onClick={() => handleSelectChapter(idx)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      activeChapterIndex === idx
                        ? 'bg-[#081220] border-[#ff7e67] shadow-md shadow-[#ff7e67]/10 ring-1 ring-[#ff7e67]'
                        : 'bg-[#050a12] border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-bold text-[#ff7e67]">
                        SCENE {ch.number}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400">
                        {formatTime(ch.timestamp)}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-100 line-clamp-1">
                      {ch.title}
                    </h4>
                    <span className="text-[9px] text-slate-400 mt-1 font-mono uppercase truncate">
                      {ch.theme}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Dynamic Scene Dossier & Takeaways (4 Columns) */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* Active Scene Card */}
              <div className="p-5 sm:p-6 rounded-3xl bg-[#081220] border border-slate-800 shadow-xl space-y-5">
                
                {/* Scene Header */}
                <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="h-0.5 w-4 bg-[#ff7e67]" />
                      <span className="text-[10px] font-bold uppercase font-mono tracking-widest text-[#ff7e67]">
                        Active Scene Analysis
                      </span>
                    </div>
                    <h3 className="text-lg font-bold font-serif text-slate-100">
                      {currentChapter.title}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {currentChapter.subtitle}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-[#ff7e67]/10 border border-[#ff7e67]/30 flex items-center justify-center text-[#ff7e67] shrink-0 font-mono font-bold text-sm">
                    {currentChapter.number}
                  </div>
                </div>

                {/* Navigation Tabs for Dossier */}
                <div className="flex items-center gap-1.5 bg-[#050a12] p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setActiveIntelTab('takeaway')}
                    className={`flex-1 py-1.5 text-center text-[11px] font-mono font-bold rounded-lg transition-all cursor-pointer ${
                      activeIntelTab === 'takeaway'
                        ? 'bg-[#ff7e67] text-slate-900'
                        : 'text-slate-400 hover:text-slate-100'
                    }`}
                  >
                    Core Thesis
                  </button>
                  <button
                    onClick={() => setActiveIntelTab('dossier')}
                    className={`flex-1 py-1.5 text-center text-[11px] font-mono font-bold rounded-lg transition-all cursor-pointer ${
                      activeIntelTab === 'dossier'
                        ? 'bg-[#ff7e67] text-slate-900'
                        : 'text-slate-400 hover:text-slate-100'
                    }`}
                  >
                    Technical Intel
                  </button>
                  <button
                    onClick={() => setActiveIntelTab('metric')}
                    className={`flex-1 py-1.5 text-center text-[11px] font-mono font-bold rounded-lg transition-all cursor-pointer ${
                      activeIntelTab === 'metric'
                        ? 'bg-[#ff7e67] text-slate-900'
                        : 'text-slate-400 hover:text-slate-100'
                    }`}
                  >
                    Sovereign KPI
                  </button>
                </div>

                {/* Tab 1: Core Thesis */}
                {activeIntelTab === 'takeaway' && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="p-3.5 rounded-xl bg-[#050a12] border border-slate-800 text-xs text-slate-100 leading-relaxed italic">
                      "{currentChapter.keyTakeaway}"
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                      <Shield className="w-3.5 h-3.5 text-[#ff7e67]" />
                      <span>Focus Area: {currentChapter.intelDossier.governancePillar}</span>
                    </div>
                  </div>
                )}

                {/* Tab 2: Technical Intel */}
                {activeIntelTab === 'dossier' && (
                  <div className="space-y-2.5 animate-in fade-in duration-200">
                    <h5 className="text-xs font-bold font-mono text-[#ff7e67] uppercase tracking-wider">
                      {currentChapter.intelDossier.heading}
                    </h5>
                    <ul className="space-y-2">
                      {currentChapter.intelDossier.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-400 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#ff7e67] shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tab 3: Sovereign KPI */}
                {activeIntelTab === 'metric' && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="p-4 rounded-2xl bg-[#050a12] border border-[#ff7e67]/40 text-center space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                        {currentChapter.highlightMetric.label}
                      </span>
                      <div className="text-2xl font-extrabold font-mono text-[#ff7e67]">
                        {currentChapter.highlightMetric.value}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 text-center">
                      Empirically audited across sovereign and multilateral deployment records.
                    </p>
                  </div>
                )}

                {/* Action Buttons: Brief Download & Direct Contact */}
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <button
                    onClick={handleDownloadBrief}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#ff7e67] hover:bg-[#e06a54] text-slate-900 font-bold font-mono text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-[#ff7e67]/20 cursor-pointer"
                  >
                    {downloadBriefSuccess ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Sovereign Brief Downloaded!</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Download Scene Briefing Dossier (PDF)</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleShare}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#050a12] hover:bg-slate-800 text-slate-400 hover:text-slate-100 border border-slate-800 font-mono text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5 text-[#ff7e67]" />
                      <span>{copiedLink ? 'Link Copied!' : 'Share Trailer'}</span>
                    </button>

                    <a
                      href="mailto:Econpolicy&SusTransGroup@gmail.com"
                      className="flex-1 py-2 px-3 rounded-xl bg-[#050a12] hover:bg-slate-800 text-slate-100 border border-slate-800 font-mono text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
                    >
                      <span>Direct Advisory</span>
                      <ChevronRight className="w-3 h-3 text-[#ff7e67]" />
                    </a>
                  </div>
                </div>

              </div>

              {/* Direct Reach Out Card */}
              <div className="p-4 rounded-2xl bg-[#050a12] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-slate-100 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#ff7e67]" />
                    <span>Direct WhatsApp & Call</span>
                  </span>
                  <a 
                    href="https://wa.me/88019174011329" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[10px] font-mono text-[#ff7e67] hover:underline flex items-center gap-0.5"
                  >
                    Open WA <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="text-xs font-mono text-slate-400 truncate">
                  +88019174011329
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  Econpolicy&SusTransGroup@gmail.com
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
