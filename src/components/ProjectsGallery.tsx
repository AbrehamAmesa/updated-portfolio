
import React, { useState, useMemo } from 'react';
import {
  Search,
  ListFilter,
  ArrowUpRight,
  Award,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';

import { PROJECTS, Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { getImageUrl } from '../utils/imageUtils';

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
    'Live Web Apps',
  ];

  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return PROJECTS.filter((project) => {
      const categoryMatch =
        selectedCategory === 'All Works' ||
        project.category === selectedCategory;

      if (!categoryMatch) return false;
      if (!query) return true;

      const titleMatch = project.title.toLowerCase().includes(query);
      const subtitleMatch = project.subtitle.toLowerCase().includes(query);
      const summaryMatch = project.summary.toLowerCase().includes(query);

      const techMatch = project.techStack.some((technology) =>
        technology.toLowerCase().includes(query)
      );

      const moduleMatch = project.modules.some((module) =>
        module.toLowerCase().includes(query)
      );

      return (
        titleMatch ||
        subtitleMatch ||
        summaryMatch ||
        techMatch ||
        moduleMatch
      );
    });
  }, [selectedCategory, searchQuery]);

  /**
   * Resolve local image paths for Vite production builds.
   * Supports existing paths saved in portfolioData or localStorage.
   */
  const resolveProjectImage = (imagePath?: string | null): string => {
    return getImageUrl(imagePath);
  };

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement>
  ) => {
    const image = event.currentTarget;
    image.style.display = 'none';

    const container = image.parentElement;

    if (container) {
      container.classList.add(
        'flex',
        'items-center',
        'justify-center',
        'bg-zinc-800'
      );

      // Display a fallback message if the image cannot be resolved.
      if (!container.querySelector('[data-image-fallback]')) {
        const fallback = document.createElement('div');

        fallback.dataset.imageFallback = 'true';
        fallback.className =
          'absolute inset-0 flex items-center justify-center p-4 text-center text-xs text-zinc-400';

        fallback.textContent = 'Project preview unavailable';

        container.appendChild(fallback);
      }
    }
  };

  return (
    <section
      id="gallery"
      className="border-t border-zinc-800 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-orange-400">
              Curated Portfolio &amp; Systems Architecture
            </div>

            <h2 className="font-display text-3xl font-bold tracking-tight text-white [text-wrap:balance] sm:text-4xl">
              Enterprise Design, Mini Apps &amp; Systems Gallery
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-zinc-400 sm:text-base">
              Production-tested banking solutions, Huawei Mobile Wallet Mini
              Apps, human capital platforms, automated legal workflows, and
              live web portals.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 self-start rounded-lg border border-zinc-800 bg-[#161920] p-1 md:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('bento')}
              className={`flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                viewMode === 'bento'
                  ? 'bg-orange-600 font-semibold text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Project Cards</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('compact')}
              className={`flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                viewMode === 'compact'
                  ? 'bg-orange-600 font-semibold text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ListFilter className="h-3.5 w-3.5" />
              <span>System Table</span>
            </button>
          </div>
        </div>

        {/* Mini Apps Experience Callout */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-orange-500/30 bg-[#161920] p-5 md:flex-row md:items-center">
          <div className="flex items-start gap-3.5">
            <div className="mt-0.5 shrink-0 rounded-xl border border-orange-500/20 bg-orange-500/10 p-2.5 text-orange-400">
              <Sparkles className="h-5 w-5" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">
                Enterprise Systems &amp; Application Engineering
              </h3>

              <p className="mt-1 max-w-3xl text-xs leading-relaxed text-zinc-400">
                Explore banking systems, workforce platforms, payment
                integrations, legal workflows, and production-oriented web
                applications.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="mb-8 flex flex-col items-stretch justify-between gap-4 lg:flex-row lg:items-center">
          {/* Category Tabs */}
          <div className="scrollbar-none flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0">
            {categories.map((category) => {
              const isActive = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`cursor-pointer whitespace-nowrap rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? 'border-orange-600 bg-orange-600 font-semibold text-white shadow-sm shadow-orange-950/40'
                      : 'border-zinc-800 bg-[#161920] text-zinc-400 hover:bg-[#1d212a] hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by tech, module, keyword..."
              aria-label="Search projects"
              className="w-full rounded-lg border border-zinc-800 bg-[#161920] py-2 pl-9 pr-14 text-xs text-zinc-200 placeholder-zinc-500 transition-colors focus:border-orange-500 focus:outline-none"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Project Count */}
        <div className="mb-4 text-xs text-zinc-500">
          Showing{' '}
          <span className="font-semibold text-zinc-300">
            {filteredProjects.length}
          </span>{' '}
          of {PROJECTS.length} projects
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="my-8 rounded-2xl border border-zinc-800 bg-[#161920] p-12 text-center">
            <SlidersHorizontal className="mx-auto mb-3 h-8 w-8 text-zinc-500" />

            <h3 className="text-base font-semibold text-zinc-300">
              No matching projects found
            </h3>

            <p className="mt-1 text-xs text-zinc-500">
              Try adjusting your search terms or selecting another category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All Works');
                setSearchQuery('');
              }}
              className="mt-4 cursor-pointer rounded-lg bg-[#1d212a] px-4 py-2 text-xs font-semibold text-orange-400 transition-colors hover:text-orange-300"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Project Cards View */}
        {viewMode === 'bento' && filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => {
              const isLarge =
                Boolean(project.featured) && (index === 0 || index === 1);

              const imageUrl = resolveProjectImage(project.image);

              return (
                <article
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${project.title} case study`}
                  className={`group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800 bg-[#161920] transition-all duration-300 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-950/20 ${
                    isLarge
                      ? 'md:col-span-2 lg:col-span-2'
                      : 'col-span-1'
                  }`}
                >
                  {/* Project Image */}
                  <div
                    className={`relative w-full overflow-hidden bg-zinc-900 ${
                      isLarge
                        ? 'aspect-[16/9] max-h-80'
                        : 'aspect-[16/10]'
                    }`}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={`${project.title} preview`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        onError={handleImageError}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-zinc-800 p-4 text-center text-xs text-zinc-400">
                        Project preview unavailable
                      </div>
                    )}

                    {/* Contrast Gradient */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#161920] via-transparent to-transparent opacity-90" />

                    {/* Award Ribbon */}
                    {project.certificateAward && (
                      <div className="absolute left-3 top-3 flex max-w-[80%] items-center gap-1.5 rounded border border-orange-500/40 bg-orange-500/20 px-2.5 py-1 text-[11px] font-medium text-orange-300 backdrop-blur-md">
                        <Award className="h-3.5 w-3.5 shrink-0 text-orange-400" />
                        <span className="truncate">
                          {project.certificateAward}
                        </span>
                      </div>
                    )}

                    {/* Project Status */}
                    <div className="absolute right-3 top-3 rounded border border-emerald-500/30 bg-zinc-950/80 px-2.5 py-1 text-[11px] font-semibold text-emerald-400 backdrop-blur-md">
                      {project.status}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      {/* Project Metadata */}
                      <div className="mb-2 flex flex-wrap items-center gap-1.5 text-xs font-medium text-orange-400">
                        <span>{project.category}</span>
                        <span className="text-zinc-600">·</span>
                        <span className="text-zinc-300">
                          {project.organization}
                        </span>
                        <span className="text-zinc-600">·</span>
                        <span className="text-zinc-400">{project.year}</span>
                      </div>

                      <h3 className="font-display text-xl font-bold tracking-tight text-white transition-colors group-hover:text-orange-300">
                        {project.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                        {project.summary}
                      </p>

                      {/* Key Modules */}
                      <div className="mt-4 border-t border-zinc-800 pt-3">
                        <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                          Key Modules
                        </div>

                        <ul className="grid grid-cols-1 gap-1.5 text-xs text-zinc-300 sm:grid-cols-2">
                          {project.modules
                            .slice(0, isLarge ? 4 : 2)
                            .map((module, moduleIndex) => (
                              <li
                                key={`${project.id}-module-${moduleIndex}`}
                                className="flex items-center gap-1.5 truncate"
                              >
                                <span className="font-bold text-orange-500">
                                  ›
                                </span>
                                <span className="truncate">{module}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="mt-6 flex items-center justify-between gap-3 border-t border-zinc-800 pt-4">
                      <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-zinc-400">
                        {project.techStack.slice(0, 3).map((technology, i) => (
                          <span
                            key={`${project.id}-tech-${i}`}
                            className="rounded border border-zinc-800 bg-[#1d212a] px-2 py-0.5 text-zinc-300"
                          >
                            {technology}
                          </span>
                        ))}

                        {project.techStack.length > 3 && (
                          <span className="px-1.5 py-0.5 text-zinc-500">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex shrink-0 items-center gap-1 text-xs font-semibold text-orange-400 transition-transform group-hover:translate-x-0.5">
                        <span>Case Study</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Compact System Table */}
        {viewMode === 'compact' && filteredProjects.length > 0 && (
          <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-[#161920]">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="border-b border-zinc-800 bg-[#1d212a] text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                <tr>
                  <th className="px-4 py-3.5">Project &amp; Subtitle</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Organization</th>
                  <th className="px-4 py-3.5">Tech Stack</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-800">
                {filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="cursor-pointer transition-colors hover:bg-[#1d212a]/60"
                  >
                    <td className="px-4 py-4">
                      <div className="font-display text-sm font-semibold text-white">
                        {project.title}
                      </div>

                      <div className="mt-0.5 line-clamp-1 text-xs text-zinc-400">
                        {project.subtitle}
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 font-medium text-orange-400">
                      {project.category}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-zinc-300">
                      {project.organization}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1 font-mono text-[11px]">
                        {project.techStack.slice(0, 3).join(', ')}
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4">
                      <span className="font-medium text-emerald-400">
                        {project.status}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-right">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-orange-300"
                      >
                        <span>Details</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
