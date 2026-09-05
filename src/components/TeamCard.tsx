import React, { useState } from 'react';
import { Linkedin, Twitter, Facebook, Globe, Mail, RotateCw, GraduationCap } from 'lucide-react';
import { TeamMember } from '../types';

interface TeamCardProps {
  member: TeamMember;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="perspective-1000 w-full h-[360px] sm:h-[370px] cursor-pointer"
      onClick={handleFlip}
      id={`team-card-${member.id}`}
    >
      <div 
        className={`relative w-full h-full duration-700 preserve-3d transition-transform ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* ==================== FRONT SIDE (PHOTO VIEW) ==================== */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden bg-[#081220] border border-slate-800 shadow-md hover:shadow-xl hover:border-[#ff7e67]/60 flex flex-col group transition-all font-sans">
          {/* Photo Container */}
          <div className="relative w-full h-[290px] sm:h-[300px] overflow-hidden bg-[#050a12]">
            <img
              src={member.image}
              alt={member.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105 opacity-90"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#081220] via-transparent to-transparent opacity-85" />
            
            {/* Division Tag */}
            <span className="absolute top-2.5 left-2.5 text-[8px] tracking-widest uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-[#050a12]/90 text-[#ff7e67] border border-[#ff7e67]/40 backdrop-blur-md shadow-xs truncate max-w-[85%]">
              {member.division}
            </span>

            {/* Hover Flip Action Cue */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#050a12]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[1px]">
              <div className="flex items-center gap-1.5 bg-[#081220]/95 hover:bg-[#ff7e67] hover:text-slate-950 text-slate-100 text-[11px] font-semibold py-1.5 px-3 rounded-full border border-slate-700 shadow-xl transition-all">
                <RotateCw className="w-3 h-3 text-[#ff7e67] group-hover:text-slate-950" />
                <span>View Dossier</span>
              </div>
            </div>
          </div>

          {/* Bottom Info Bar */}
          <div className="h-[70px] bg-[#081220] border-t border-slate-800/80 px-3 py-1.5 flex flex-col justify-center">
            <h3 className="font-serif text-xs sm:text-sm font-bold text-slate-100 truncate group-hover:text-[#ff7e67] transition-colors duration-200">
              {member.name}
            </h3>
            <p className="text-[10px] text-slate-400 font-medium truncate leading-tight mt-0.5">
              {member.role}
            </p>
          </div>
        </div>

        {/* ==================== BACK SIDE (DETAILS DOSSIER) ==================== */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden bg-[#081220] border border-[#ff7e67]/60 shadow-2xl flex flex-col p-4 text-slate-100 justify-between select-none font-sans">
          
          {/* Scrollable Back Content */}
          <div className="space-y-2 flex-1 overflow-y-auto pr-1 no-scrollbar">
            <div>
              <span className="text-[8px] tracking-widest uppercase font-mono font-bold text-[#ff7e67] block mb-0.5">
                {member.division.toUpperCase()} // DOSSIER
              </span>
              
              <h3 className="font-serif text-sm font-extrabold text-[#ff7e67] leading-tight truncate">
                {member.name}
              </h3>
              
              <p className="text-[10px] font-bold text-slate-200 mt-0.5 truncate">
                {member.role}
              </p>
            </div>

            <p className="text-[10px] text-slate-400 leading-relaxed font-normal italic line-clamp-3">
              "{member.bio}"
            </p>

            {/* Expertise Pills */}
            <div className="space-y-1 pt-1.5 border-t border-slate-800">
              <span className="text-[8px] uppercase tracking-wider font-mono font-bold text-slate-400 block">
                Selected Focus
              </span>
              <div className="flex flex-wrap gap-1">
                {member.expertise.slice(0, 3).map((tag, i) => (
                  <span 
                    key={i} 
                    className="text-[8px] px-1.5 py-0.5 rounded bg-[#050a12] text-slate-300 font-mono font-medium border border-slate-800 truncate max-w-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            {member.education && member.education.length > 0 && (
              <div className="space-y-0.5 pt-1.5 border-t border-slate-800">
                <span className="text-[8px] uppercase tracking-wider font-mono font-bold text-slate-400 block flex items-center gap-1">
                  <GraduationCap className="w-2.5 h-2.5 text-[#ff7e67]" />
                  Education
                </span>
                <p className="text-[9px] text-slate-400 font-normal leading-tight line-clamp-2">
                  {member.education[0]}
                </p>
              </div>
            )}
          </div>

          {/* Social Links Footer */}
          <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-800 shrink-0">
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              {member.socials.linkedin && (
                <a 
                  href={member.socials.linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-[#ff7e67] hover:text-[#ff6547] transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              )}
              {member.socials.twitter && (
                <a 
                  href={member.socials.twitter} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-[#ff7e67] hover:text-[#ff6547] transition-colors"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
              )}
              {member.socials.email && (
                <a 
                  href={`mailto:${member.socials.email}`} 
                  className="text-[#ff7e67] hover:text-[#ff6547] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <span className="text-[8px] font-mono font-bold text-slate-500">
              PHOTO //
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
