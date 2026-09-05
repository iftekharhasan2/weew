import React from 'react';
import { motion } from 'motion/react';

interface GlowBackdropProps {
  mousePos?: { x: number; y: number };
}

export const GlowBackdrop: React.FC<GlowBackdropProps> = ({ mousePos = { x: 0, y: 0 } }) => {
  // Gentle parallax offset
  const offsetX = mousePos.x * 12;
  const offsetY = mousePos.y * 12;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Base deep background */}
      <div className="absolute inset-0 bg-[#050a12]" />

      {/* Top subtle ambient warmth */}
      <motion.div
        animate={{
          x: offsetX * 0.5,
          y: offsetY * 0.5,
        }}
        transition={{
          x: { duration: 0.8, ease: 'easeOut' },
          y: { duration: 0.8, ease: 'easeOut' },
        }}
        className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-40 blur-[130px]"
        style={{
          background: 'radial-gradient(circle, rgba(255, 126, 103, 0.12) 0%, rgba(8, 18, 32, 0.4) 60%, transparent 80%)',
        }}
      />

      {/* Bottom subtle slate accent */}
      <motion.div
        animate={{
          x: -offsetX * 0.4,
          y: -offsetY * 0.4,
        }}
        transition={{
          x: { duration: 0.8, ease: 'easeOut' },
          y: { duration: 0.8, ease: 'easeOut' },
        }}
        className="absolute bottom-[-10%] right-[15%] w-[450px] h-[450px] rounded-full pointer-events-none opacity-30 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(45, 212, 191, 0.08) 0%, rgba(8, 18, 32, 0.3) 60%, transparent 80%)',
        }}
      />

      {/* Architectural subtle grid pattern for structural grounding */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Subtle atmospheric vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,10,18,0.8)_100%)] pointer-events-none" />
    </div>
  );
};

