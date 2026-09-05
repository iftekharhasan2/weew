import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface PhoneMockupProps {
  customImage?: string;
}

const defaultConferenceImg = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200";

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  customImage = defaultConferenceImg,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt mechanics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <div
      className="relative flex items-center justify-center p-2 sm:p-4 perspective-1000 select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Rotatable phone chassis */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -9 }}
        animate={{ opacity: 1, y: 0, rotate: -9 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          rotateX: isHovered ? rotateX : '0deg',
          rotateY: isHovered ? rotateY : '0deg',
          transformStyle: 'preserve-3d',
        }}
        className="relative transform -rotate-[9deg] origin-bottom-center cursor-pointer transition-shadow duration-500"
      >
        {/* Drop shadow & ground glow */}
        <div className="absolute -inset-4 bg-[#081220]/90 blur-2xl rounded-[54px] transform translate-y-8 translate-x-4 -z-10" />
        <div className="absolute -inset-6 bg-[#ff7e67]/15 blur-3xl rounded-[60px] transform -z-20" />

        {/* Outer Phone Frame (Glossy White Porcelain Body matching reference) */}
        <div className="relative w-[240px] sm:w-[280px] md:w-[310px] h-[480px] sm:h-[550px] md:h-[600px] bg-gradient-to-b from-[#ffffff] via-[#f7f8fa] to-[#e6e8eb] p-[10px] sm:p-[12px] pb-[16px] sm:pb-[20px] rounded-[48px] sm:rounded-[54px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.7),inset_0_2px_4px_rgba(255,255,255,1)] flex flex-col items-center">
          
          {/* Subtle side button accents */}
          <div className="absolute -left-[5px] top-[110px] w-[3px] h-[36px] bg-[#d5d8dc] rounded-l-sm" />
          <div className="absolute -left-[5px] top-[160px] w-[3px] h-[52px] bg-[#d5d8dc] rounded-l-sm" />
          <div className="absolute -right-[5px] top-[140px] w-[3px] h-[64px] bg-[#d5d8dc] rounded-r-sm" />

          {/* Top Speaker / Camera Bar Area */}
          <div className="w-full flex justify-center items-center pt-1.5 pb-2.5 z-20">
            <div className="w-12 sm:w-14 h-1.5 bg-[#2d3748] rounded-full opacity-70" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#1a202c] ml-2 opacity-80" />
          </div>

          {/* Screen Inner Viewport */}
          <div className="relative w-full flex-1 rounded-[34px] sm:rounded-[40px] overflow-hidden bg-black shadow-[inset_0_0_8px_rgba(0,0,0,0.5)]">
            {/* Conference Room Image */}
            <img
              src={customImage}
              alt="Government & policy conference boardroom meeting"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-[50%_35%] transition-transform duration-700 ease-out"
              style={{
                transform: isHovered ? 'scale(1.06)' : 'scale(1)',
              }}
            />

            {/* Glossy Screen Reflection Diagonal Highlight */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30 bg-gradient-to-tr from-transparent via-white/25 to-transparent"
              style={{
                transform: 'skewX(-22deg) translateX(-15%)',
              }}
            />

            {/* Bottom Home Indicator Bar */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/70 rounded-full shadow-sm pointer-events-none" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
