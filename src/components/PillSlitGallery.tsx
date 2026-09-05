import React, { useState } from 'react';
import { motion } from 'motion/react';

interface PillSlitGalleryProps {
  customImage?: string;
}

interface SlitConfig {
  id: number;
  width: number;
  height: number;
  topOffset: number;
  leftPos: number;
}

const defaultMeetingImg = "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=1200";

export const PillSlitGallery: React.FC<PillSlitGalleryProps> = ({
  customImage = defaultMeetingImg,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Overall virtual canvas dimensions for continuous slice alignment
  const canvasWidth = 380;
  const canvasHeight = 350;

  // Configuration for the 4 staggered pill slits matching the design reference
  const slits: SlitConfig[] = [
    { id: 0, width: 64, height: 280, topOffset: 55, leftPos: 0 },
    { id: 1, width: 70, height: 330, topOffset: 10, leftPos: 80 },
    { id: 2, width: 72, height: 345, topOffset: 0, leftPos: 168 },
    { id: 3, width: 68, height: 295, topOffset: 35, leftPos: 256 },
  ];

  return (
    <div className="relative flex items-center justify-center p-4 select-none">
      {/* Tilted frame container */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -12 }}
        animate={{ opacity: 1, y: 0, rotate: -12 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ rotate: -10, scale: 1.02 }}
        className="relative transform -rotate-[12deg] origin-center cursor-pointer transition-transform duration-500"
        style={{
          width: `${canvasWidth + 20}px`,
          height: `${canvasHeight + 20}px`,
        }}
      >
        {/* Render the 4 capsule slits */}
        {slits.map((slit, idx) => {
          const isHovered = hoveredIndex === idx;

          return (
            <motion.div
              key={slit.id}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                y: isHovered ? -10 : 0,
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="absolute rounded-[100px] overflow-hidden border-[6px] md:border-[7px] border-[#F5F2EC] shadow-[0_18px_40px_rgba(0,0,0,0.7)] bg-[#F5F2EC]"
              style={{
                width: `${slit.width}px`,
                height: `${slit.height}px`,
                top: `${slit.topOffset}px`,
                left: `${slit.leftPos}px`,
              }}
            >
              {/* Aligned continuous image mapped precisely across all capsules */}
              <div
                className="relative overflow-hidden w-full h-full bg-[#FAF8F5]"
                style={{
                  clipPath: 'content-box',
                }}
              >
                <img
                  src={customImage}
                  alt="Policy advisory consultation meeting"
                  referrerPolicy="no-referrer"
                  className="absolute max-w-none object-cover transition-transform duration-700 ease-out"
                  style={{
                    width: `${canvasWidth + 80}px`,
                    height: `${canvasHeight + 60}px`,
                    left: `-${slit.leftPos + 20}px`,
                    top: `-${slit.topOffset + 15}px`,
                    transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                    filter: isHovered ? 'contrast(1.06) brightness(1.03)' : 'contrast(1.02)',
                  }}
                />

                {/* Subtle glass gloss highlight overlay across each pill */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-white/25 pointer-events-none" />

                {/* Edge inner shadow for realism and depth */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_10px_rgba(0,0,0,0.25)] pointer-events-none" />
              </div>
            </motion.div>
          );
        })}

        {/* Ambient subtle glow beneath capsules */}
        <div className="absolute -inset-6 bg-[#ff7e67]/15 blur-3xl rounded-full -z-10 pointer-events-none" />
      </motion.div>
    </div>
  );
};
