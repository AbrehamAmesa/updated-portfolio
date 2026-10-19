import React, { useState, useMemo } from 'react';
import { Search, LayoutGrid, ListFilter, ArrowUpRight, Award, SlidersHorizontal, Sparkles } from 'lucide-react';
import { PROJECTS, Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';

export const ProjectsGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Works');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'bento' | 'compact'>('bento');

  const categories = [
    'All Works',
    'Enterprise Banking',
    'HR & Workforce',
    'Fintech & Payments',
    'Workflow & Legal',
    'Live Web Apps'
  ];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((proj) => {
      const categoryMatch = selectedCategory === 'All Works' || proj.category === selectedCategory;
      
      const q = searchQuery.toLowerCase().trim();
      if (!q) return categoryMatch;

      const titleMatch = proj.title.toLowerCase().includes(q);
      const subtitleMatch = proj.subtitle.toLowerCase().includes(q);
      const summaryMatch = proj.summary.toLowerCase().includes(q);
      const techMatch = proj.techStack.some((t) => t.toLowerCase().includes(q));
      const moduleMatch = proj.modules.some((m) => m.toLowerCase().includes(q));

      return categoryMatch && (titleMatch || subtitleMatch || summaryMatch || techMatch || moduleMatch);
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="gallery" className="py-16 sm:py-24 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-orange-400 mb-2">
              Curated Portfolio & Systems Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight [text-wrap:balance]">
              Enterprise Design, Mini Apps & Systems Gallery
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl">
              Production-tested banking solutions, Huawei Mobile Wallet Mini Apps, human capital platforms, automated legal workflows, and live web portals.
            </p>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-1 p-1 bg-[#161920] border border-zinc-800 rounded-lg self-start md:self-auto">
            {/* <button
              onClick={() => setViewMode('bento')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                viewMode === 'bento'
                  ? 'bg-orange-600 text-white shadow-sm font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              {/* <span>Bento Grid</span> */}
            {/* </button> */} 
            <button
              onClick={() => setViewMode('compact')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                viewMode === 'compact'
                  ? 'bg-orange-600 text-white shadow-sm font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>System Table</span>
            </button>
          </div>
        </div>

        {/* Mini Apps Experience Architecture Callout */}
        <div className="mb-8 p-5 rounded-2xl bg-[#161920] border border-orange-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            {/* <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-bold font-display text-white">
                  Mini Apps & SuperApp Embedded Engineering Experience
                </h3>
                <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 text-[10px] font-semibold uppercase tracking-wider border border-orange-500/30">
                  Production Architectures
                </span>
              </div>
              <p className="text-xs text-zinc-300 mt-1 max-w-3xl leading-relaxed">
                Extensive hands-on experience building lightweight, sandboxed micro-applications for mobile wallet runtimes (Huawei SuperApp Mobile Wallet) and messaging platforms. Features instant host-bridge authorization, asynchronous bill discovery, sub-second launch times, and zero-app-store update cycles without running separate interactive client demos.
              </p>
            </div> */}
          </div>

          {/* <button
            onClick={() => setSelectedCategory('Mini Apps & SuperApp')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'Mini Apps & SuperApp'
                ? 'bg-orange-600 text-white'
                : 'bg-[#1d212a] text-orange-400 hover:text-white hover:bg-orange-600/30 border border-orange-500/30'
            }`}
          >
            Filter Mini Apps ({PROJECTS.filter(p => p.category === 'Mini Apps & SuperApp').length})
          </button> */}
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-orange-600 text-white font-semibold shadow-sm shadow-orange-950/40'
                      : 'bg-[#161920] text-zinc-400 hover:text-white hover:bg-[#1d212a] border border-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech, module, keyword..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#161920] border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-[#161920] border border-zinc-800 my-8">
            <SlidersHorizontal className="w-8 h-8 text-zinc-500 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-zinc-300">No matching projects found</h3>
            <p className="text-xs text-zinc-500 mt-1">
              Try adjusting your search terms or selecting another category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All Works');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-orange-400 hover:text-orange-300 bg-[#1d212a] rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bento Grid View */}
        {viewMode === 'bento' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => {
              const isLarge = project.featured && (idx === 0 || idx === 1);
              return (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`group relative flex flex-col justify-between rounded-2xl bg-[#161920] border border-zinc-800 hover:border-orange-500/50 transition-all duration-300 overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-orange-950/20 ${
                    isLarge ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                  }`}
                >
                  {/* Image Container with Fallback */}
                  <div className={`relative w-full overflow-hidden bg-zinc-900 ${isLarge ? 'aspect-[16/9] max-h-80' : 'aspect-[16/10]'}`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.classList.add('flex', 'items-center', 'justify-center', 'bg-zinc-800');
                        }
                      }}
                    />
                    
                    {/* Contrast Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161920] via-transparent to-transparent opacity-90" />

                    {/* Recognition Ribbon if awarded */}
                    {project.certificateAward && (
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-orange-500/20 border border-orange-500/40 text-[11px] font-medium text-orange-300 backdrop-blur-md">
                        <Award className="w-3.5 h-3.5 text-orange-400" />
                        <span className="truncate max-w-[200px]">{project.certificateAward}</span>
                      </div>
                    )}

                    {/* Status badge top right */}
                    <div className="absolute top-3 right-3 text-[11px] font-semibold text-emerald-400 bg-zinc-950/80 px-2.5 py-1 rounded border border-emerald-500/30 backdrop-blur-md">
                      {project.status}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Zero-Pill Unboxed Metadata */}
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-orange-400 mb-2 font-medium">
                        <span>{project.category}</span>
                        <span className="text-zinc-600">·</span>
                        <span className="text-zinc-300">{project.organization}</span>
                        <span className="text-zinc-600">·</span>
                        <span className="text-zinc-400">{project.year}</span>
                      </div>

                      <h3 className="text-xl font-bold font-display text-white tracking-tight group-hover:text-orange-300 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-zinc-300 mt-2 line-clamp-2 leading-relaxed">
                        {project.summary}
                      </p>

                      {/* Highlighted Modules */}
                      <div className="mt-4 pt-3 border-t border-zinc-800">
                        <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 mb-2">
                          Key Modules
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-zinc-300">
                          {project.modules.slice(0, isLarge ? 4 : 2).map((mod, i) => (
                            <li key={i} className="flex items-center gap-1.5 truncate">
                              <span className="text-orange-500 font-bold">›</span>
                              <span className="truncate">{mod}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Card Footer: Tech Stack & CTA */}
                    <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5 text-[11px] text-zinc-400 font-mono">
                        {project.techStack.slice(0, 3).map((tech, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-[#1d212a] border border-zinc-800 text-zinc-300">
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="px-1.5 py-0.5 text-zinc-500">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-0.5 transition-transform">
                        <span>Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Compact Table View */}
        {viewMode === 'compact' && (
          <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-[#161920]">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-[#1d212a] text-zinc-400 uppercase tracking-wider border-b border-zinc-800 font-semibold text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Project & Subtitle</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Organization</th>
                  <th className="py-3.5 px-4">Tech Stack</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="hover:bg-[#1d212a]/60 transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-4">
                      <div className="font-semibold text-white text-sm font-display">{project.title}</div>
                      <div className="text-zinc-400 text-xs mt-0.5 line-clamp-1">{project.subtitle}</div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-orange-400 font-medium">
                      {project.category}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-zinc-300">
                      {project.organization}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1 font-mono text-[11px]">
                        {project.techStack.slice(0, 3).join(', ')}
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="text-emerald-400 font-medium">
                        {project.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-orange-300"
                      >
                        <span>Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* Case study modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
