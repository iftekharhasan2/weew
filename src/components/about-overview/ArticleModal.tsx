import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, User, MessageSquare, Share2, Tag, BookOpen } from 'lucide-react';
import { NewsPost } from '../../types/aboutOverviewTypes';

interface ArticleModalProps {
  post: NewsPost | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-neutral-950/75 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl bg-[#12202B] border border-[#3C3F45] text-[#F3F0E8] rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        >
          {/* Modal Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#3C3F45] bg-[#0E1A22]">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#EF715A]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#EF715A]">
                IP3 Policy Briefing
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#AEB0AE] hover:text-[#F3F0E8] hover:bg-[#152735] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {post.imageUrl && (
              <div className="rounded-xl overflow-hidden h-60 sm:h-72 bg-[#152735] border border-[#3C3F45]">
                <img
                  src={post.imageUrl}
                  alt={post.imageAlt || post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {post.categories.map((c) => (
                  <span
                    key={c}
                    className="text-[11px] font-mono uppercase bg-[#152735] text-[#EF715A] border border-[#3C3F45] px-2.5 py-0.5 rounded font-medium"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <h2 className="text-2xl sm:text-3xl font-cardo font-bold text-[#F3F0E8] leading-tight">
                {post.title}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#AEB0AE] pt-1 pb-4 border-b border-[#3C3F45]">
                <div className="flex items-center gap-1.5 font-medium text-[#F3F0E8]">
                  <User className="w-3.5 h-3.5 text-[#EF715A]" />
                  <span>{post.author}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#AEB0AE]" />
                  <span>{post.date}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#AEB0AE]" />
                  <span>{post.commentsCount} Comments</span>
                </div>
              </div>
            </div>

            {/* Content text */}
            <div className="text-[#AEB0AE] text-sm sm:text-base leading-relaxed space-y-4 font-sans whitespace-pre-line">
              <p>{post.excerpt}</p>
              <p>{post.content}</p>
            </div>

            {/* Key Policy Takeaways Box */}
            <div className="p-5 bg-[#152735] rounded-xl border border-[#3C3F45] space-y-2">
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#EF715A]">
                Strategic Policy Takeaway
              </h4>
              <p className="text-xs sm:text-sm text-[#F3F0E8]">
                Systemic outcomes require participatory co-implementation and alignment between regulatory disclosure standards and institutional capital allocation.
              </p>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 border-t border-[#3C3F45] bg-[#0E1A22] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[#AEB0AE]">
              <Share2 className="w-3.5 h-3.5" />
              <span>Share this policy briefing</span>
            </div>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#EF715A] hover:bg-[#E05E47] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
