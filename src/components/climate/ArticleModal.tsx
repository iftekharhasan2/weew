import { X, Calendar, Clock, BookOpen, Share2, ArrowRight } from 'lucide-react';
import { MagazineArticle } from '../../data/climateData';

interface ArticleModalProps {
  article: MagazineArticle | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export default function ArticleModal({ article, onClose, onOpenContact }: ArticleModalProps) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#12202B] text-[#F3F0E8] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-[#3C3F45]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-64 sm:h-72 w-full bg-[#0E1A22] shrink-0">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12202B] via-[#0E1A22]/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0E1A22]/80 hover:bg-[#0E1A22] text-[#F3F0E8] flex items-center justify-center transition-colors cursor-pointer border border-[#3C3F45]"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on image */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex items-center gap-3 text-xs">
              <span className="px-2.5 py-1 rounded bg-[#EF715A] text-white font-semibold uppercase tracking-wider">
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-[#AEB0AE]">
                <Clock className="w-3.5 h-3.5 text-[#F59E0B]" /> {article.readTime}
              </span>
              <span className="flex items-center gap-1 text-[#AEB0AE]">
                <Calendar className="w-3.5 h-3.5 text-[#F59E0B]" /> {article.date}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-[#F3F0E8]">
              {article.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-sm sm:text-base text-[#AEB0AE] font-light leading-relaxed">
          <div className="p-4 rounded-xl bg-[#152735] border border-[#3C3F45] text-[#F3F0E8] font-normal text-sm">
            <strong className="text-[#EF715A]">Executive Summary:</strong> {article.summary}
          </div>

          <p>
            The transition toward resilient and regenerative systems requires bridging high-level multilateral environmental agreements (such as the Paris Agreement and Kunming-Montreal Global Biodiversity Framework) with pragmatic, localized implementation roadmaps.
          </p>

          <h3 className="font-serif text-xl font-bold text-[#F3F0E8] pt-2">
            Methodology and Technical Interventions
          </h3>
          <p>
            IP3 Consulting applies an integrated socio-economic modeling framework that pairs technical feasibility assessments with spatial vulnerability mapping. By quantifying material flows and climate risk probabilities, we assist governments and enterprise clients in de-risking capital investments.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
            <div className="p-4 rounded-lg bg-[#0E1A22] border border-[#3C3F45]">
              <div className="font-bold text-xs uppercase text-[#EF715A] mb-1">Key Outcome 1</div>
              <div className="text-xs text-[#AEB0AE]">
                Over 35% reduction in resource inefficiency through closed-loop recycling and decentralized recovery.
              </div>
            </div>
            <div className="p-4 rounded-lg bg-[#0E1A22] border border-[#3C3F45]">
              <div className="font-bold text-xs uppercase text-[#EF715A] mb-1">Key Outcome 2</div>
              <div className="text-xs text-[#AEB0AE]">
                Standardized ESG reporting compliant with ISSB and European Union CSRD directives.
              </div>
            </div>
          </div>

          <p>
            Institutions seeking to replicate or scale this framework can partner directly with the IP3 research and consulting teams to conduct tailored baseline evaluations.
          </p>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-[#0E1A22] border-t border-[#3C3F45] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#3C3F45] rounded-md text-xs text-[#AEB0AE] hover:text-[#F3F0E8] hover:bg-[#152735] font-medium cursor-pointer"
          >
            Close Article
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="px-5 py-2 bg-[#EF715A] hover:bg-[#E05E47] text-white rounded-md text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow transition-colors"
          >
            <span>Consult with Author Team</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
