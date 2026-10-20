
import React, { useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Award,
  Layers,
  Code,
  ImageOff,
} from 'lucide-react';

import { Project } from '../data/portfolioData';
import { getImageUrl } from '../utils/imageUtils';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
}) => {
  const imageUrl = project ? getImageUrl(project.image) : '';

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/85 p-3 backdrop-blur-md sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative my-auto max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-zinc-800 bg-[#161920] text-zinc-100 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 cursor-pointer rounded-full border border-zinc-700 bg-zinc-950/90 p-2.5 text-zinc-300 shadow-lg transition-colors hover:bg-zinc-800 hover:text-white"
          aria-label="Close project details"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Project hero image */}
        <div className="relative aspect-video w-full overflow-hidden border-b border-zinc-800 bg-zinc-900 sm:aspect-[21/9]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${project.title} preview`}
              loading="eager"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
                const fallback =
                  event.currentTarget.parentElement?.querySelector(
                    '[data-project-image-fallback]'
                  );

                fallback?.classList.remove('hidden');
              }}
            />
          ) : null}

          {/* Visible when the image is missing or fails to load */}
          <div
            data-project-image-fallback
            className={`absolute inset-0 flex flex-col items-center justify-center gap-3 bg-zinc-900 text-zinc-400 ${
              imageUrl ? 'hidden' : ''
            }`}
          >
            <ImageOff className="h-10 w-10 text-zinc-600" />
            <span className="text-sm">Project image unavailable</span>
          </div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#161920] via-[#161920]/40 to-transparent" />

          <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6">
            <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-medium text-orange-400">
              <span>{project.category}</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-300">
                {project.organization}
              </span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400">{project.year}</span>
              <span className="text-zinc-600">·</span>
              <span className="font-semibold text-emerald-400">
                {project.status}
              </span>
            </div>

            <h2
              id="project-modal-title"
              className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              {project.title}
            </h2>

            <p className="mt-1 text-sm text-zinc-300">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Modal content */}
        <div className="space-y-8 p-6 sm:p-8">
          {/* Recognition */}
          {project.certificateAward && (
            <div className="flex items-start gap-3 rounded-xl border border-orange-500/30 bg-orange-500/10 p-4">
              <Award className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" />

              <div>
                <h3 className="text-xs font-semibold text-orange-300">
                  Official Recognition: {project.certificateAward}
                </h3>

                <p className="mt-1 text-xs text-orange-200/80">
                  Recognition associated with this project.
                </p>
              </div>
            </div>
          )}

          {/* Overview */}
          <section>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              System Overview &amp; Problem Solved
            </h3>

            <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
              {project.description}
            </p>
          </section>

          {/* Modules */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <Layers className="h-4 w-4 text-orange-400" />

              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Core Architectural Modules Built
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {project.modules.map((module, index) => (
                <div
                  key={`${project.id}-module-${index}`}
                  className="flex items-start gap-2.5 rounded-lg border border-zinc-800 bg-[#1d212a] p-3 text-xs text-zinc-200"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{module}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Engineering highlights */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <Code className="h-4 w-4 text-orange-400" />

              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Key Engineering &amp; UI Decisions
              </h3>
            </div>

            <ul className="space-y-2.5 text-xs text-zinc-300 sm:text-sm">
              {project.architecturalHighlights.map(
                (highlight, index) => (
                  <li
                    key={`${project.id}-highlight-${index}`}
                    className="flex items-start gap-2.5"
                  >
                    <span className="font-bold text-orange-500">›</span>
                    <span>{highlight}</span>
                  </li>
                )
              )}
            </ul>
          </section>

          {/* Technologies */}
          <section className="flex flex-wrap items-start justify-between gap-4 border-t border-zinc-800 pt-5">
            <div className="space-y-2">
              <span className="text-xs font-medium text-zinc-400">
                Technologies Deployed
              </span>

              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {project.techStack.map((technology, index) => (
                  <span
                    key={`${project.id}-technology-${index}`}
                    className="rounded border border-zinc-800 bg-[#1d212a] px-2.5 py-1 text-zinc-200"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Optional live project link */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-500"
            >
              Visit Live Project
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
