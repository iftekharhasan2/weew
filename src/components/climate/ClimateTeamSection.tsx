import { Linkedin, Twitter, Facebook, Mail, Users } from 'lucide-react';
import { TEAM_MEMBERS, TeamMember } from '../../data/climateData';

interface TeamSectionProps {
  onContactMember?: (member: TeamMember) => void;
}

export default function TeamSection({ onContactMember }: TeamSectionProps) {
  return (
    <section id="team" className="py-16 sm:py-20 bg-[#0E1A22] border-b border-[#3C3F45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F3F0E8]">
            Our ESG Team
          </h2>
          <p className="text-[#AEB0AE] text-sm sm:text-base mt-3 font-light max-w-xl mx-auto">
            Let&apos;s meet our ESG team members who are professional and have rich experiences.
          </p>
          <div className="w-12 h-0.5 bg-[#EF715A] mx-auto mt-4" />
        </div>

        {/* 3 Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="bg-[#12202B] rounded-2xl p-6 sm:p-8 border border-[#3C3F45] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center group hover:border-[#EF715A]/60"
            >
              {/* Avatar circle */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-5 border-4 border-[#3C3F45] shadow-md group-hover:scale-105 transition-transform duration-300 bg-[#0E1A22]">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name & Role */}
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F3F0E8]">
                {member.name}
              </h3>
              <div className="text-xs uppercase tracking-widest text-[#F59E0B] font-semibold mt-1 mb-3">
                {member.role}
              </div>

              {/* Bio */}
              <p className="text-xs text-[#AEB0AE] font-light leading-relaxed mb-6 max-w-xs">
                {member.bio}
              </p>

              {/* Social Profiles */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#3C3F45] w-full justify-center">
                <a
                  href={member.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-[#152735] text-[#F3F0E8] hover:bg-[#EF715A] hover:text-white flex items-center justify-center transition-colors"
                  aria-label={`${member.name} Facebook`}
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={member.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-[#152735] text-[#F3F0E8] hover:bg-[#EF715A] hover:text-white flex items-center justify-center transition-colors"
                  aria-label={`${member.name} Twitter`}
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-[#152735] text-[#F3F0E8] hover:bg-[#EF715A] hover:text-white flex items-center justify-center transition-colors"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
