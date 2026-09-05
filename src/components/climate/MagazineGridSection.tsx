import { ArrowUpRight, BookOpen, Clock, Calendar } from 'lucide-react';
import { MAGAZINE_ARTICLES, MagazineArticle } from '../../data/climateData';

interface MagazineGridSectionProps {
  onSelectArticle: (article: MagazineArticle) => void;
}

export default function MagazineGridSection({ onSelectArticle }: MagazineGridSectionProps) {
  const [featured, ...rest] = MAGAZINE_ARTICLES;

  return (
    <section className="py-16 sm:py-20 bg-[#0E1A22] border-b border-[#3C3F45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F3F0E8] font-normal">
              Climate Action &amp; Sustainability Research
            </h2>
          </div>
          <div className="text-xs text-[#AEB0AE] max-w-sm">
            Featured analysis on municipal infrastructure, renewable biomass, and industrial waste circularity.
          </div>
        </div>

        {/* Magazine Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Hero Card (Large Feature) */}
          <div
            onClick={() => onSelectArticle(featured)}
            className="lg:col-span-6 group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-[#12202B] border border-[#3C3F45] hover:border-[#EF715A]/60 cursor-pointer min-h-[380px] lg:min-h-[460px] flex flex-col justify-end"
          >
            <img
              src={featured.imageUrl}
              alt={featured.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-65 group-hover:opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A22]/95 via-[#0E1A22]/40 to-transparent" />
            
            <div className="relative z-10 p-6 sm:p-8 text-white space-y-3">
              <div className="flex items-center gap-3 text-xs">
                <span className="text-[#F59E0B] font-semibold uppercase tracking-wider">
                  {featured.category}
                </span>
                <span className="flex items-center gap-1 text-[#AEB0AE]">
                  <Clock className="w-3.5 h-3.5" /> {featured.readTime}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-[#F3F0E8] group-hover:text-[#EF715A] transition-colors">
                {featured.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#AEB0AE] line-clamp-2 font-light leading-relaxed">
                {featured.summary}
              </p>

              <div className="pt-2 flex items-center text-xs font-semibold text-[#EF715A] gap-1 group-hover:translate-x-1 transition-transform">
                <span>Read Full Case Study</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* 4 Secondary Grid Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rest.map((art) => (
              <div
                key={art.id}
                onClick={() => onSelectArticle(art)}
                className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-[#12202B] cursor-pointer h-52 sm:h-56 flex flex-col justify-end border border-[#3C3F45] hover:border-[#EF715A]/60"
              >
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-65 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A22]/95 via-[#0E1A22]/40 to-transparent" />

                <div className="relative z-10 p-4 text-white space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#F59E0B] font-semibold">
                      {art.category}
                    </span>
                    <span className="text-[#AEB0AE] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {art.readTime}
                    </span>
                  </div>

                  <h4 className="font-serif text-sm sm:text-base font-bold leading-snug text-[#F3F0E8] group-hover:text-[#EF715A] transition-colors line-clamp-2">
                    {art.title}
                  </h4>

                  <p className="text-[11px] text-[#AEB0AE] line-clamp-1 font-light">
                    {art.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
