import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Award, BookOpen, Mail, X, Sparkles } from 'lucide-react';
import { TEAM_MEMBERS } from '../../data/aboutOverviewData';
import { TeamMember } from '../../types/aboutOverviewTypes';

interface PeopleSectionProps {
  onOpenTeamModal: (member: TeamMember) => void;
}

export const PeopleSection: React.FC<PeopleSectionProps> = ({ onOpenTeamModal }) => {
  return (
    <section id="people" className="py-20 md:py-28 bg-[#0E1A22] text-[#F3F0E8] relative overflow-hidden scroll-mt-24 border-b border-[#3C3F45]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#EF715A]/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="relative text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 0.05, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-7xl font-cardo uppercase font-bold text-[#AEB0AE] absolute left-0 right-0 -top-10 select-none pointer-events-none tracking-wider"
          >
            global and in-house
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative z-10 space-y-3"
          >
            <span className="text-xs font-semibold tracking-widest text-[#EF715A] uppercase bg-[#12202B] border border-[#3C3F45] px-3.5 py-1 rounded-md inline-block">
              Multidisciplinary Network
            </span>
            <h2 className="text-3xl sm:text-5xl font-cardo text-[#F3F0E8] tracking-tight uppercase">
              ip3 people
            </h2>
            <p className="text-[#AEB0AE] text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              A dynamic network of economists and thinkers from a range of disciplines who understand the intricate balance between prosperity and the planet.
            </p>
          </motion.div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => onOpenTeamModal(member)}
              className="bg-[#12202B] rounded-2xl overflow-hidden border border-[#3C3F45] hover:border-[#EF715A]/60 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-[#152735]">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12202B] via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[11px] font-mono uppercase text-[#EF715A] font-semibold tracking-wider block">
                      {member.affiliation}
                    </span>
                    <h3 className="text-lg font-cardo font-bold text-[#F3F0E8] leading-tight">
                      {member.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <p className="text-xs text-[#EF715A] font-medium">{member.role}</p>
                  <p className="text-xs text-[#AEB0AE] line-clamp-2 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-0">
                <div className="flex flex-wrap gap-1 mb-4">
                  {member.expertise.slice(0, 2).map((exp) => (
                    <span
                      key={exp}
                      className="text-[10px] bg-[#152735] text-[#AEB0AE] border border-[#3C3F45] px-2 py-0.5 rounded"
                    >
                      {exp}
                    </span>
                  ))}
                </div>

                <span className="text-xs font-semibold text-[#EF715A] group-hover:text-[#E05E47] inline-flex items-center gap-1">
                  <span>View Full Profile</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Central Action Button */}
        <div className="text-center">
          <button
            onClick={() => onOpenTeamModal(TEAM_MEMBERS[0])}
            className="px-8 py-3.5 bg-[#EF715A] hover:bg-[#E05E47] text-[#F3F0E8] text-sm font-semibold rounded-md shadow-lg hover:shadow-[#EF715A]/20 transition-all inline-flex items-center gap-2.5 cursor-pointer uppercase tracking-wider group"
          >
            <span>IP3 People</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
