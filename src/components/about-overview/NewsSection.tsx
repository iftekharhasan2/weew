import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MessageSquare, ArrowRight, Loader2, BookOpen } from 'lucide-react';
import { NEWS_POSTS } from '../../data/aboutOverviewData';
import { NewsPost } from '../../types/aboutOverviewTypes';

interface NewsSectionProps {
  onSelectPost: (post: NewsPost) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ onSelectPost }) => {
  const [activeCategory, setActiveCategory] = useState<string>('*');
  const [visibleCount, setVisibleCount] = useState<number>(3);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const categories = [
    { key: '*', label: 'All Post' },
    { key: 'bookkeeping', label: 'Bookkeeping' },
    { key: 'blog', label: 'blog' },
    { key: 'education', label: 'Education' },
    { key: 'insights', label: 'Insights' },
    { key: 'climate-action', label: 'Climate Action' },
  ];

  const filteredPosts = useMemo(() => {
    if (activeCategory === '*') {
      return NEWS_POSTS;
    }
    return NEWS_POSTS.filter((post) =>
      post.categories.includes(activeCategory)
    );
  }, [activeCategory]);

  const displayedPosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 3);
      setIsLoadingMore(false);
    }, 600);
  };

  const handleCategoryChange = (catKey: string) => {
    setActiveCategory(catKey);
    setVisibleCount(3);
  };

  return (
    <section className="py-16 md:py-24 bg-[#0E1A22] border-b border-[#3C3F45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-cardo text-[#F3F0E8] leading-tight">
            Latest Posts &amp; News
          </h2>
          <p className="text-[#AEB0AE] text-sm sm:text-base">
            Insights, translational research findings, and policy briefings from IP3 thought leaders across climate finance, digital governance, and institutional reform.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => handleCategoryChange(cat.key)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#EF715A] text-[#F3F0E8] shadow-md ring-2 ring-[#EF715A]/30 font-semibold'
                    : 'bg-[#12202B] text-[#AEB0AE] hover:text-[#F3F0E8] border border-[#3C3F45] hover:border-[#EF715A]/50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Posts Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {displayedPosts.map((post) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-[#12202B] rounded-2xl overflow-hidden border border-[#3C3F45] shadow-lg hover:shadow-2xl hover:border-[#EF715A]/60 hover:bg-[#152735] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Optional Image */}
                  {post.imageUrl && (
                    <div className="relative h-48 sm:h-52 overflow-hidden bg-[#152735]">
                      <img
                        src={post.imageUrl}
                        alt={post.imageAlt || post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                        {post.categories.map((c) => (
                          <span
                            key={c}
                            className="text-[10px] uppercase font-mono tracking-wider bg-[#0E1A22]/90 border border-[#3C3F45] text-[#EF715A] px-2.5 py-0.5 rounded font-semibold"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-6 sm:p-7 space-y-4">
                    {!post.imageUrl && (
                      <div className="flex flex-wrap gap-1">
                        {post.categories.map((c) => (
                          <span
                            key={c}
                            className="text-[10px] uppercase font-mono tracking-wider bg-[#152735] text-[#EF715A] border border-[#3C3F45] px-2.5 py-0.5 rounded font-medium"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    )}

                    <h3
                      onClick={() => onSelectPost(post)}
                      className="text-lg sm:text-xl font-cardo font-semibold text-[#F3F0E8] group-hover:text-[#EF715A] transition-colors leading-snug cursor-pointer line-clamp-3"
                    >
                      {post.title}
                    </h3>

                    {/* Metadata line: Date / Comments */}
                    <div className="flex items-center gap-3 text-xs text-[#AEB0AE] pt-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#AEB0AE]" />
                        <span>{post.date}</span>
                      </div>
                      <span>/</span>
                      <div className="flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-[#AEB0AE]" />
                        <span>
                          {post.commentsCount === 0
                            ? 'No Comments'
                            : `${post.commentsCount} Comments`}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#AEB0AE] leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-7 pt-0">
                  <button
                    onClick={() => onSelectPost(post)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#EF715A] hover:text-[#E05E47] uppercase tracking-wider group-hover:translate-x-1 transition-transform cursor-pointer"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button & Pagination Controls */}
        <div className="mt-12 text-center">
          {hasMore ? (
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="px-8 py-3 bg-[#12202B] hover:bg-[#152735] text-[#F3F0E8] text-sm font-semibold rounded-full border border-[#3C3F45] shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#EF715A]" />
                  <span>Loading Posts...</span>
                </>
              ) : (
                <span>Load More</span>
              )}
            </button>
          ) : (
            <p className="text-xs text-[#5A6267] font-mono tracking-wider uppercase">
              End of Content.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
