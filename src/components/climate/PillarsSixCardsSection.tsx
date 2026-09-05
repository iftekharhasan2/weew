import { SIX_PILLARS } from '../../data/climateData';

interface PillarsSixCardsProps {
  onSelectPillar?: (title: string) => void;
}

export default function PillarsSixCardsSection({ onSelectPillar }: PillarsSixCardsProps) {
  return (
    <section className="py-16 sm:py-20 bg-[#0E1A22] border-b border-[#3C3F45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F3F0E8] font-normal">
            Strategic Pathways to a Regenerative Economy
          </h2>
          <div className="w-12 h-0.5 bg-[#EF715A] mx-auto mt-3" />
        </div>

        {/* 6 Cards Grid (3 columns x 2 rows) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SIX_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              onClick={() => onSelectPillar && onSelectPillar(pillar.title)}
              className="bg-[#12202B] rounded-xl p-5 border border-[#3C3F45] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row gap-4 items-center group cursor-pointer hover:border-[#EF715A]/60"
            >
              {/* Thumbnail Image */}
              <div className="w-full sm:w-28 h-28 shrink-0 rounded-lg overflow-hidden bg-[#0E1A22] border border-[#3C3F45]">
                <img
                  src={pillar.imageUrl}
                  alt={pillar.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
              </div>

              {/* Text content */}
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="font-serif text-lg font-bold text-[#F3F0E8] leading-snug group-hover:text-[#EF715A] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#F59E0B] font-medium leading-relaxed">
                  {pillar.subtitle}
                </p>
                <p className="text-[11px] text-[#AEB0AE] font-light line-clamp-2">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
