import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { PROJECTS } from '../data/policyData';
import type { ProjectItem } from '../data/policyData';
import {
  SlidersHorizontal,
  Search,
  Building,
  Globe,
  X,
  ExternalLink,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';

export interface ProjectsSectionProps {
  embedded?: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ embedded = false }) => {
  const { data } = useCMS();
  const projectList = (data.projects && data.projects.length > 0 ? data.projects : PROJECTS) as ProjectItem[];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const projectsPerPage = 6;

  // Reset pagination when category, search, or project list changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, projectList.length]);

  const categories = [
    { id: 'all', label: 'All Engagements' },
    { id: 'education', label: 'Education Reform' },
    { id: 'climate', label: 'Climate Action & ESG' },
    { id: 'governance', label: 'Digital Governance' },
    { id: 'feasibility', label: 'Firm Surveys' },
  ];

  const filteredProjects = projectList.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch =
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.partner.toLowerCase().includes(query) ||
      p.location.toLowerCase().includes(query) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(query)));

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const displayedProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  return (
    <section
      id="projects"
      className={`relative w-full ${
        embedded
          ? 'pt-8 pb-4 bg-transparent border-t border-slate-800/80'
          : 'pt-4 sm:pt-6 pb-24 bg-[#050a12] border-t-0'
      } overflow-hidden`}
    >
      {/* Background ambient lighting matching translation framework */}
      {!embedded && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#ff7e67]/5 rounded-full blur-[140px] pointer-events-none" />
      )}

      <div className={`${embedded ? 'w-full' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'} space-y-8 relative z-10`}>
        {/* Section Header */}
        <div className={`${embedded ? 'text-left max-w-4xl' : 'text-center max-w-3xl mx-auto'} space-y-3`}>
          <div>
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#ff7e67] uppercase">
              PROVEN ACTION RESEARCH PORTFOLIO
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
            Recent Engagements &amp; Impact Projects
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Through a diverse portfolio of engagements with global development partners and national ministries, IP3 Experts have built a reputation for meaningful policy outcomes.
          </p>
        </div>

        {/* Content Filter & Search Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 sm:p-4 bg-[#081220]/90 rounded-2xl border border-slate-800/80 shadow-xl">
          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <div className="flex items-center gap-1.5 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#ff7e67] mr-1 hidden sm:inline-block shrink-0" />
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                const count =
                  cat.id === 'all'
                    ? projectList.length
                    : projectList.filter((p) => p.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-[#ff7e67] text-[#050a12] font-bold shadow-md shadow-[#ff7e67]/30 scale-[1.02]'
                        : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? 'bg-[#050a12]/30 text-[#050a12]' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Input Box */}
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-8 pr-8 py-1.5 bg-slate-900/90 border border-slate-800 focus:border-[#ff7e67] rounded-xl text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid or Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-[#081220]/80 rounded-3xl border border-slate-800/80 p-8">
            <p className="text-slate-400 text-sm">No engagements match the current filter or search criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#ff7e67] hover:bg-[#e06a54] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedProjects.map((project) => (
              <div
                key={project.id}
                className="bg-[#081220]/75 hover:bg-[#0b1626] rounded-3xl border border-slate-800/80 flex flex-col overflow-hidden group shadow-lg hover:border-[#ff7e67]/50 transition-all duration-300"
              >
                {/* Image Banner */}
                <div className="relative h-44 overflow-hidden bg-[#081220]">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050a12] via-transparent to-transparent opacity-80" />

                  {/* Partner Badge */}
                  <div className="absolute top-3 left-3 bg-[#081220]/95 backdrop-blur-md px-2.5 py-1 rounded-xl text-[10px] font-bold text-[#ff7e67] border border-[#ff7e67]/30 flex items-center gap-1.5 shadow-sm">
                    <Building className="w-3 h-3 text-[#ff7e67]" />
                    <span>{project.partnerLogoText || project.partner}</span>
                  </div>

                  <div className="absolute bottom-3 right-3 text-[10px] font-semibold text-slate-400 bg-[#081220]/90 px-2 py-0.5 rounded-md border border-slate-800 shadow-xs">
                    {project.year}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#ff7e67]">
                      {project.categoryLabel}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-100 group-hover:text-[#ff7e67] transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed font-light">
                      {project.description}
                    </p>
                  </div>

                  {/* Scope Button */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full mt-2 py-2 px-3 rounded-xl bg-slate-800/90 text-slate-100 hover:bg-slate-700 border border-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>View Project Scope & Details</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* See More Projects / Pagination Bar */}
        {totalPages > 1 && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 bg-[#081220]/80 rounded-3xl border border-slate-800/80 shadow-sm">
            <div className="text-xs text-slate-400 font-medium">
              Showing projects <span className="font-bold text-slate-100">{(currentPage - 1) * projectsPerPage + 1}</span> - <span className="font-bold text-slate-100">{Math.min(currentPage * projectsPerPage, filteredProjects.length)}</span> of <span className="font-bold text-slate-100">{filteredProjects.length}</span> (Page {currentPage} of {totalPages})
            </div>

            <div className="flex items-center gap-2.5">
              {/* Page Numbers */}
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-[#ff7e67] text-white shadow-md shadow-[#ff7e67]/20 scale-105'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700'
                    }`}
                    title={`Go to Page ${pageNum}`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              {/* See More Projects Button */}
              {currentPage < totalPages ? (
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="px-4 py-2 bg-[#ff7e67] hover:bg-[#e06a54] text-white font-extrabold text-xs rounded-2xl shadow-md shadow-[#ff7e67]/20 transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
                >
                  <span>See More Projects (Page {currentPage + 1})</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setCurrentPage(1)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer border border-slate-700"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#ff7e67]" />
                  <span>Back to Page 1</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050a12]/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#081220] rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-colors cursor-pointer border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 pr-8">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#ff7e67]/10 text-[#ff7e67] border border-[#ff7e67]/30">
                {selectedProject.categoryLabel}
              </span>
              <h3 className="text-2xl font-extrabold text-slate-100">
                {selectedProject.title}
              </h3>
              <p className="text-xs text-[#ff7e67] font-semibold flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-[#ff7e67]" />
                <span>Partner: {selectedProject.partner}</span>
                <span>•</span>
                <Globe className="w-3.5 h-3.5 text-[#ff7e67]" />
                <span>{selectedProject.location}</span>
              </p>
            </div>

            <div className="h-52 rounded-2xl overflow-hidden border border-slate-800">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                className="w-full h-full object-cover opacity-80"
              />
            </div>

            <div className="space-y-4 text-xs text-slate-400 leading-relaxed">
              <p className="text-sm text-slate-100">{selectedProject.description}</p>

              {selectedProject.detailedScope && (
                <div className="p-4 rounded-2xl bg-[#050a12] border border-slate-800 space-y-1">
                  <h4 className="font-bold text-[#ff7e67] text-xs">Detailed Scope of Work</h4>
                  <p className="text-slate-400 text-xs">{selectedProject.detailedScope}</p>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-[#050a12] border border-slate-800 space-y-1">
                <h4 className="font-bold text-[#ff7e67] text-xs">Strategic Impact & Outcome</h4>
                <p className="text-slate-400 text-xs">{selectedProject.keyOutcome}</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {selectedProject.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-400 border border-slate-700 text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-700 border border-slate-700 text-xs font-semibold cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
