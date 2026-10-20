import React, { useMemo, useState } from 'react';
import {
  Search,
  ListFilter,
  ArrowUpRight,
  Award,
  SlidersHorizontal,
  Sparkles,
  Grid2X2,
  List,
  X,
  ImageOff,
} from 'lucide-react';

import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';
import { getImageUrl } from '../utils/imageUtils';
import ProjectModal from './ProjectModal';

type ViewMode = 'grid' | 'list';

const CATEGORIES = [
  'All',
  'Enterprise Systems',
  'Web Applications',
  'Mobile Applications',
  'Mini Apps & SuperApp',
  'Other',
] as const;

const ProjectsGallery: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] =
    useState<(typeof CATEGORIES)[number]>('All');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return PROJECTS.filter((project) => {
      const matchesCategory =
        activeCategory === 'All' || project.category === activeCategory;

      const searchableText = [
        project.title,
        project.description,
        project.category,
        ...(project.technologies ?? []),
        ...(project.features ?? []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const matchesSearch = !query || searchableText.includes(query);
      const matchesFeatured = !featuredOnly || Boolean(project.featured);

      return matchesCategory && matchesSearch && matchesFeatured;
    });
  }, [searchQuery, activeCategory, featuredOnly]);

  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setFeaturedOnly(false);
  };

  const handleImageError = (projectId: string) => {
    setImageErrors((previous) => ({
      ...previous,
      [projectId]: true,
    }));
  };

  const getStatusClass = (status?: string) => {
    switch (status) {
      case 'Live Web':
        return 'bg-emerald-100 text-emerald-800 ring-emerald-200';
      case 'Enterprise Deployed':
        return 'bg-blue-100 text-blue-800 ring-blue-200';
      case 'Adopted by Faculty':
        return 'bg-violet-100 text-violet-800 ring-violet-200';
      case 'In Production':
        return 'bg-amber-100 text-amber-900 ring-amber-200';
      default:
        return 'bg-gray-100 text-gray-700 ring-gray-200';
    }
  };

  const renderProjectImage = (
    project: Project,
    className: string,
  ) => {
    const imageUrl = getImageUrl(project.image);
    const hasError = imageErrors[project.id] || !imageUrl;

    return (
      <div className={`relative overflow-hidden ${className}`}>
        {!hasError ? (
          <img
            src={imageUrl}
            alt={`${project.title} project preview`}
            loading="lazy"
            onError={() => handleImageError(project.id)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full min-h-40 w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
            <ImageOff size={34} strokeWidth={1.5} />
            <span className="px-4 text-center text-xs">
              Project preview unavailable
            </span>
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />

        {project.featured && (
          <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm backdrop-blur">
            <Sparkles size={13} className="text-amber-500" />
            Featured
          </div>
        )}
      </div>
    );
  };

  const renderTechnologyBadges = (
    technologies: string[] | undefined,
    compact = false,
  ) => {
    const items = technologies ?? [];
    const visibleItems = compact ? items.slice(0, 3) : items.slice(0, 5);
    const remaining = items.length - visibleItems.length;

    return (
      <div className="flex flex-wrap gap-2">
        {visibleItems.map((technology) => (
          <span
            key={technology}
            className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600"
          >
            {technology}
          </span>
        ))}

        {remaining > 0 && (
          <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500">
            +{remaining}
          </span>
        )}
      </div>
    );
  };

  const renderGridCard = (project: Project) => (
    <article
      key={project.id}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#6c8939]/40 hover:shadow-xl"
      onClick={() => setSelectedProject(project)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setSelectedProject(project);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View ${project.title} project details`}
    >
      {renderProjectImage(project, 'aspect-[16/10] w-full bg-gray-100')}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#6c8939]/10 px-3 py-1 text-xs font-semibold text-[#526b2a]">
            {project.category}
          </span>

          {project.status && (
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${getStatusClass(
                project.status,
              )}`}
            >
              {project.status}
            </span>
          )}
        </div>

        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-[#526b2a]">
            {project.title}
          </h3>

          <ArrowUpRight
            size={19}
            className="mt-0.5 shrink-0 text-gray-400 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#6c8939]"
          />
        </div>

        <p className="mb-5 line-clamp-3 flex-1 text-sm leading-6 text-gray-600">
          {project.description}
        </p>

        {renderTechnologyBadges(project.technologies, true)}

        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="text-xs font-medium text-gray-500">
            View project details
          </span>
          <span className="text-sm font-semibold text-[#526b2a]">
            Explore <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </article>
  );

  const renderListCard = (project: Project) => (
    <article
      key={project.id}
      className="group grid cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:border-[#6c8939]/40 hover:shadow-lg md:grid-cols-[260px_1fr]"
      onClick={() => setSelectedProject(project)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setSelectedProject(project);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View ${project.title} project details`}
    >
      {renderProjectImage(
        project,
        'aspect-[16/10] w-full bg-gray-100 md:aspect-auto md:min-h-56',
      )}

      <div className="flex min-w-0 flex-col p-5 md:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#6c8939]/10 px-3 py-1 text-xs font-semibold text-[#526b2a]">
            {project.category}
          </span>

          {project.status && (
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${getStatusClass(
                project.status,
              )}`}
            >
              {project.status}
            </span>
          )}

          {project.featured && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700">
              <Sparkles size={13} />
              Featured
            </span>
          )}
        </div>

        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-[#526b2a]">
            {project.title}
          </h3>
          <ArrowUpRight
            size={20}
            className="shrink-0 text-gray-400 transition-colors group-hover:text-[#6c8939]"
          />
        </div>

        <p className="mb-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {project.description}
        </p>

        <div className="mt-auto">
          {renderTechnologyBadges(project.technologies)}
        </div>

        <div className="mt-5 flex justify-end border-t border-gray-100 pt-4">
          <span className="text-sm font-semibold text-[#526b2a]">
            View details <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </article>
  );

  return (
    <section id="projects" className="relative bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#6c8939]/20 bg-[#6c8939]/10 px-4 py-2 text-sm font-semibold text-[#526b2a]">
            <Award size={16} />
            Selected Work
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Projects & <span className="text-[#6c8939]">Solutions</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            A collection of applications, enterprise systems, and digital
            solutions I have worked on to solve real-world problems.
          </p>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-[#FBAF1F]" />
        </div>

        {/* Search and controls */}
        <div className="mb-7 rounded-2xl border border-gray-200 bg-gray-50/80 p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search
                size={19}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search projects, technologies..."
                aria-label="Search projects"
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-10 text-sm text-gray-800 outline-none transition focus:border-[#6c8939] focus:ring-4 focus:ring-[#6c8939]/10"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setFeaturedOnly((previous) => !previous)}
                aria-pressed={featuredOnly}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  featuredOnly
                    ? 'border-[#6c8939] bg-[#6c8939] text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-[#6c8939]/50'
                }`}
              >
                <Sparkles size={16} />
                Featured
              </button>

              <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white p-1">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                  aria-pressed={viewMode === 'grid'}
                  className={`rounded-lg p-2.5 transition ${
                    viewMode === 'grid'
                      ? 'bg-[#6c8939]/10 text-[#526b2a]'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <Grid2X2 size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                  aria-pressed={viewMode === 'list'}
                  className={`rounded-lg p-2.5 transition ${
                    viewMode === 'list'
                      ? 'bg-[#6c8939]/10 text-[#526b2a]'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Category filters */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="mr-1 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              <SlidersHorizontal size={14} />
              Category
            </span>

            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                    isActive
                      ? 'border-[#6c8939] bg-[#6c8939] text-white shadow-sm'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-[#6c8939]/50 hover:text-[#526b2a]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results summary */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-600">
            Showing{' '}
            <span className="font-bold text-gray-900">
              {filteredProjects.length}
            </span>{' '}
            {filteredProjects.length === 1 ? 'project' : 'projects'}
          </p>

          {(searchQuery || activeCategory !== 'All' || featuredOnly) && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#526b2a] hover:text-[#6c8939]"
            >
              <X size={15} />
              Clear filters
            </button>
          )}
        </div>

        {/* Projects */}
        {filteredProjects.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map(renderGridCard)}
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {filteredProjects.map(renderListCard)}
            </div>
          )
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
              <ListFilter size={25} />
            </div>

            <h3 className="text-lg font-bold text-gray-900">
              No projects found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Try another search term or choose a different category to find
              the project you are looking for.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-xl bg-[#6c8939] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#526b2a]"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Bottom note */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#6c8939]/15 bg-[#6c8939]/5 p-6 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="font-bold text-gray-900">
              Have a project in mind?
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Let&apos;s discuss how technology can help solve your problem.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#6c8939] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#526b2a]"
          >
            Let&apos;s Connect
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>

      {/* Project details modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default ProjectsGallery;
