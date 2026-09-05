import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, BookOpen, Mail, CheckCircle2, Globe2 } from 'lucide-react';
import { TeamMember } from '../../types/aboutOverviewTypes';

interface TeamModalProps {
  member: TeamMember | null;
  onClose: () => void;
  onContact: () => void;
}

export const TeamModal: React.FC<TeamModalProps> = ({ member, onClose, onContact }) => {
  if (!member) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#12202B] border border-[#3C3F45] text-[#F3F0E8] rounded-2xl shadow-2xl overflow-hidden my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#0E1A22]/80 hover:bg-[#0E1A22] text-[#F3F0E8] border border-[#3C3F45] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-12">
            {/* Left Photo & Affiliation */}
            <div className="sm:col-span-5 relative bg-[#152735]">
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-full h-64 sm:h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12202B] via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-4 left-4 right-4 text-[#F3F0E8]">
                <span className="text-xs font-mono uppercase tracking-wider text-[#EF715A]">
                  {member.affiliation}
                </span>
                <h4 className="text-xl font-cardo font-bold leading-tight">{member.name}</h4>
              </div>
            </div>

            {/* Right Details */}
            <div className="sm:col-span-7 p-6 sm:p-8 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#EF715A] bg-[#152735] border border-[#3C3F45] px-2.5 py-1 rounded">
                    {member.role}
                  </span>
                  <p className="text-[#AEB0AE] text-sm sm:text-base leading-relaxed mt-3">
                    {member.bio}
                  </p>
                </div>

                <div className="space-y-2">
                  <h5 className="text-xs uppercase font-bold tracking-wider text-[#AEB0AE]">
                    Core Specializations &amp; Advisory Focus
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {member.expertise.map((exp) => (
                      <span
                        key={exp}
                        className="text-xs bg-[#152735] text-[#F3F0E8] px-2.5 py-1 rounded-md border border-[#3C3F45]"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#3C3F45] flex items-center justify-between">
                <button
                  onClick={() => {
                    onClose();
                    onContact();
                  }}
                  className="px-5 py-2 bg-[#EF715A] hover:bg-[#E05E47] text-white text-xs font-semibold rounded-lg shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Connect with Advisor</span>
                </button>
                <span className="text-xs text-[#5A6267] font-mono">IP3 Fellow</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
