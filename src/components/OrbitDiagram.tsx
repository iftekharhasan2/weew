import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ActorNode, OrbitRing } from '../types';
import { soundEngine } from './AudioEffects';

interface OrbitDiagramProps {
  actors: ActorNode[];
  rings: OrbitRing[];
  selectedActor: ActorNode | null;
  onSelectActor: (actor: ActorNode | null) => void;
  isRotating?: boolean;
  showOrbitRings?: boolean;
  convenePulse: boolean;
  onTriggerConvene: () => void;
}

export const OrbitDiagram: React.FC<OrbitDiagramProps> = ({
  actors,
  rings,
  selectedActor,
  onSelectActor,
  isRotating = true,
  showOrbitRings = false,
  convenePulse,
  onTriggerConvene,
}) => {
  const [hoveredActorId, setHoveredActorId] = useState<string | null>(null);

  // Dynamic animated actor positions around center (300, 300)
  const [dynamicActors, setDynamicActors] = useState<ActorNode[]>(actors);

  const rotationOffsetRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());
  const animFrameIdRef = useRef<number | null>(null);

  // 60fps orbital physics animation loop around central IP3 orb
  useEffect(() => {
    const updatePositions = (time: number) => {
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      // Rotate continuously around IP3 unless hovering/inspecting an actor
      if (isRotating && !hoveredActorId) {
        // Base orbit speed: smooth continuous motion
        const angularVelocity = (Math.PI * 2) / 36;
        rotationOffsetRef.current += angularVelocity * delta;
      }

      const globalOffset = rotationOffsetRef.current;

      const updated = actors.map((actor) => {
        const currentAngle = actor.baseAngle + globalOffset;
        const radius = actor.baseRadius;

        const x = 300 + radius * Math.cos(currentAngle);
        const y = 300 + radius * Math.sin(currentAngle);

        return {
          ...actor,
          x,
          y,
        };
      });

      setDynamicActors(updated);
      animFrameIdRef.current = requestAnimationFrame(updatePositions);
    };

    animFrameIdRef.current = requestAnimationFrame(updatePositions);
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [actors, isRotating, hoveredActorId]);

  const activeActor = selectedActor || dynamicActors.find(a => a.id === hoveredActorId) || null;

  const handleActorHover = (actor: ActorNode) => {
    setHoveredActorId(actor.id);
    soundEngine.playHoverTone(actor.ring === 'inner' ? 520 : actor.ring === 'middle' ? 440 : 360);
  };

  const handleActorLeave = () => {
    setHoveredActorId(null);
  };

  const handleActorClick = (actor: ActorNode) => {
    if (selectedActor?.id === actor.id) {
      onSelectActor(null);
    } else {
      onSelectActor(actor);
      soundEngine.playHoverTone(600);
    }
  };

  const handleCenterClick = () => {
    onTriggerConvene();
    soundEngine.playPulseChord();
  };

  return (
    <div className="relative w-full max-w-[620px] aspect-square mx-auto select-none flex items-center justify-center">
      {/* Ambient background aura glow */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-full opacity-40 blur-3xl transition-opacity duration-700"
        style={{
          background: activeActor 
            ? `radial-gradient(circle at center, ${activeActor.glowColor} 0%, transparent 60%)` 
            : 'radial-gradient(circle at center, rgba(45, 212, 191, 0.15) 0%, transparent 65%)'
        }}
      />

      {/* SVG Canvas for Concentric Rings & Dynamic Connection Beams */}
      <svg
        viewBox="0 0 600 600"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          {/* Radial gradient for central IP3 orb */}
          <radialGradient id="centerOrbGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#152735" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#081220" stopOpacity="0.95" />
            <stop offset="95%" stopColor="#050a12" stopOpacity="0.98" />
          </radialGradient>

          {/* Glowing stroke filters */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Connection Line Gradients */}
          {dynamicActors.map((actor) => (
            <linearGradient
              key={`grad-${actor.id}`}
              id={`line-grad-${actor.id}`}
              x1="300"
              y1="300"
              x2={actor.x}
              y2={actor.y}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#ff7e67" stopOpacity="0.9" />
              <stop offset="70%" stopColor={actor.accentColor} stopOpacity="0.7" />
              <stop offset="100%" stopColor={actor.accentColor} stopOpacity="0.1" />
            </linearGradient>
          ))}
        </defs>

        {/* 1. Optional Orbit Rings (Invisible / Clean Orbit Mode by default) */}
        {showOrbitRings && rings.map((ring) => (
          <circle
            key={ring.id}
            cx="300"
            cy="300"
            r={ring.radius}
            fill="none"
            stroke="#334155"
            strokeWidth="1.2"
            strokeDasharray={ring.dashArray}
            opacity={ring.opacity}
            className="transition-all duration-500"
          />
        ))}

        {/* 2. Connection Beams to Active Actor or during Convene Pulse */}
        {dynamicActors.map((actor) => {
          const isTargetActive = activeActor?.id === actor.id || convenePulse;
          if (!isTargetActive) return null;

          return (
            <g key={`connection-${actor.id}`}>
              {/* Soft glow underlay */}
              <line
                x1="300"
                y1="300"
                x2={actor.x}
                y2={actor.y}
                stroke={actor.accentColor}
                strokeWidth="3.5"
                strokeOpacity="0.3"
                filter="url(#glow)"
              />
              {/* Crisp beam */}
              <motion.line
                x1="300"
                y1="300"
                x2={actor.x}
                y2={actor.y}
                stroke={`url(#line-grad-${actor.id})`}
                strokeWidth="1.5"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
              {/* Traveling light particle */}
              <motion.circle
                r="3"
                fill="#f8fafc"
                filter="url(#glow)"
                initial={{ cx: 300, cy: 300, opacity: 0 }}
                animate={{
                  cx: [300, actor.x],
                  cy: [300, actor.y],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </g>
          );
        })}

        {/* 3. Outer faint pulse waves on convene */}
        {convenePulse && (
          <>
            <motion.circle
              cx="300"
              cy="300"
              r="60"
              fill="none"
              stroke="#ff7e67"
              strokeWidth="2"
              initial={{ r: 60, opacity: 0.8 }}
              animate={{ r: 280, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.circle
              cx="300"
              cy="300"
              r="60"
              fill="none"
              stroke="#2dd4bf"
              strokeWidth="1.5"
              initial={{ r: 60, opacity: 0.8 }}
              animate={{ r: 280, opacity: 0 }}
              transition={{ duration: 1.5, delay: 0.4, repeat: Infinity, ease: 'easeOut' }}
            />
          </>
        )}
      </svg>

      {/* 4. Central IP³ Orb Component */}
      <div
        id="center-orb-container"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
        onClick={handleCenterClick}
        title="Click to trigger convening alignment"
      >
        <div className="relative w-[124px] h-[124px] sm:w-[136px] sm:h-[136px] rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
          {/* Subtle Ambient Halo */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#ff7e67]/20 via-[#2dd4bf]/20 to-transparent blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Central Sphere */}
          <div className="relative w-full h-full rounded-full border border-[#ff7e67]/40 bg-gradient-to-b from-[#0b1728] via-[#081220] to-[#050a12] shadow-[0_0_35px_-5px_rgba(255,126,103,0.3),inset_0_0_24px_rgba(45,212,191,0.15)] flex items-center justify-center transition-all duration-500 group-hover:border-[#ff7e67]/70 group-hover:shadow-[0_0_45px_0px_rgba(255,126,103,0.45),inset_0_0_30px_rgba(45,212,191,0.25)]">
            
            {/* Soft inner radial gradient lighting */}
            <div className="absolute inset-2 rounded-full bg-[radial-gradient(circle_at_45%_35%,rgba(255,126,103,0.25)_0%,rgba(45,212,191,0.1)_45%,transparent_75%)] pointer-events-none" />

            {/* IP³ Text */}
            <div className="relative z-10 font-serif text-2xl sm:text-[28px] font-normal text-slate-100 tracking-wide flex items-baseline drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              <span className="font-bold">IP</span>
              <sup className="text-sm sm:text-base ml-0.5 font-light text-[#ff7e67]">3</sup>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Actor Pills Superimposed at Exact Coordinates */}
      <div className="absolute inset-0 pointer-events-none">
        {dynamicActors.map((actor) => {
          const isSelected = selectedActor?.id === actor.id;
          const isHovered = hoveredActorId === actor.id;
          const isActive = isSelected || isHovered;

          // Convert (x, y) on 600x600 plane to percentages
          const leftPercent = (actor.x / 600) * 100;
          const topPercent = (actor.y / 600) * 100;

          return (
            <div
              key={actor.id}
              id={`actor-pill-${actor.id}`}
              style={{
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-30"
              onMouseEnter={() => handleActorHover(actor)}
              onMouseLeave={handleActorLeave}
              onClick={() => handleActorClick(actor)}
            >
              <button
                type="button"
                className={`group relative flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-xs sm:text-[13px] font-medium tracking-wide whitespace-nowrap transition-all duration-300 backdrop-blur-md cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#ff7e67] ${
                  isActive
                    ? 'bg-[#0b1728] text-slate-100 scale-105 shadow-lg'
                    : 'bg-[#081220]/90 text-slate-400 hover:text-slate-200 hover:scale-[1.03]'
                }`}
                style={{
                  border: `1px solid ${isActive ? actor.accentColor : actor.borderColor || '#1e293b'}`,
                  boxShadow: isActive
                    ? `0 0 16px -2px ${actor.glowColor}`
                    : undefined,
                }}
              >
                {/* Active Indicator Dot */}
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? 'scale-125' : 'opacity-60 group-hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: actor.accentColor,
                    boxShadow: isActive ? `0 0 8px ${actor.accentColor}` : 'none',
                  }}
                />

                {/* Actor Name */}
                <span className="font-normal text-slate-200 group-hover:text-white transition-colors">
                  {actor.name}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
