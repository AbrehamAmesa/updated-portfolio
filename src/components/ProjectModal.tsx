import React, { useEffect, useState } from 'react';
import {
  X,
  CheckCircle2,
  Award,
  Layers,
  Code,
  ImageOff,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
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
  const [imageFailed, setImageFailed] = useState(false);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [imageZoom, setImageZoom] = useState(1);

  const imageUrl = project ? getImageUrl(project.image) : '';

  useEffect(() => {
    setImageFailed(false);
    setImageViewerOpen(false);
    setImageZoom(1);
  }, [project?.id, project?.image]);

  // Keep the page behind the project modal from scrolling.
  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (imageViewerOpen) {
          setImageViewerOpen(false);
          setImageZoom(1);
        } else {
          onClose();
        }
      }

      if (imageViewerOpen) {
        if (event.key === '+' || event.key === '=') {
          setImageZoom((previous) =>
            Math.min(Number((previous + 0.25).toFixed(2)), 4),
          );
        }

        if (event.key === '-') {
          setImageZoom((previous) =>
            Math.max(Number((previous - 0.25).toFixed(2)), 0.5),
          );
        }

        if (event.key === '0') {
          setImageZoom(1);
        }
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, imageViewerOpen]);

  const openImageViewer = () => {
    if (!imageUrl || imageFailed) return;

    setImageZoom(1);
    setImageViewerOpen(true);
  };

  const closeImageViewer = () => {
    setImageViewerOpen(false);
    setImageZoom(1);
  };

  const zoomIn = () => {
    setImageZoom((previous) =>
      Math.min(Number((previous + 0.25).toFixed(2)), 4),
    );
  };

  const zoomOut = () => {
    setImageZoom((previous) =>
      Math.max(Number((previous - 0.25).toFixed(2)), 0.5),
    );
  };

  const resetZoom = () => {
    setImageZoom(1);
  };

  if (!project) return null;

  return (
    <>
      {/* Project Details Modal */}
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
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="absolute right-4 top-4 z-20 rounded-full border border-zinc-700 bg-zinc-950/90 p-2.5 text-zinc-300 shadow-lg transition-colors hover:bg-zinc-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Hero Image */}
          <div className="relative aspect-video w-full overflow-hidden border-b border-zinc-800 bg-zinc-900 sm:aspect-[21/9]">
            {imageUrl && !imageFailed ? (
              <>
                <img
                  src={imageUrl}
                  alt={`${project.title} preview`}
                  className="absolute inset-0 h-full w-full cursor-zoom-in object-cover object-top transition-opacity hover:opacity-90"
                  onError={() => setImageFailed(true)}
                  onClick={openImageViewer}
                  title="Click to zoom image"
                />

                {/* Open Full Image Viewer */}
                <button
                  type="button"
                  onClick={openImageViewer}
                  title="Zoom project image"
                  aria-label="Zoom project image"
                  className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-lg border border-white/20 bg-zinc-950/85 px-3 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur transition hover:border-orange-500 hover:bg-orange-600"
                >
                  <Maximize2 className="h-4 w-4" />
                  <span>Zoom Image</span>
                </button>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-zinc-900 text-zinc-400">
                <ImageOff className="h-10 w-10 text-zinc-600" />
                <span className="text-sm">Project image unavailable</span>
              </div>
            )}

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

            {/* System Overview */}
            <section>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                System Overview &amp; Problem Solved
              </h3>

              <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
                {project.description}
              </p>
            </section>

            {/* Core Modules */}
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

            {/* Engineering Highlights */}
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
                  ),
                )}
              </ul>
            </section>

            {/* Technology Stack */}
            <section className="border-t border-zinc-800 pt-5">
              <span className="text-xs font-medium text-zinc-400">
                Technologies Deployed
              </span>

              <div className="mt-2 flex flex-wrap gap-2 font-mono text-xs">
                {project.techStack.map((technology, index) => (
                  <span
                    key={`${project.id}-tech-${index}`}
                    className="rounded border border-zinc-800 bg-[#1d212a] px-2.5 py-1 text-zinc-200"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </section>

            {/* External Links */}
            {(project.liveUrl || project.githubUrl) && (
              <div className="flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-500"
                  >
                    Visit Live Project
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-200 transition-colors hover:bg-zinc-800"
                  >
                    View Source Code
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full-Screen Zoomable Image Viewer */}
      {imageViewerOpen && imageUrl && !imageFailed && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} image viewer`}
          onClick={closeImageViewer}
        >
          <div
            className="relative flex h-full max-h-[95vh] w-full max-w-7xl flex-col overflow-hidden rounded-xl border border-zinc-700 bg-[#111318] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Viewer Header */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-zinc-800 bg-[#161920] px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-white sm:text-base">
                  {project.title}
                </h3>

                <p className="mt-0.5 text-[11px] text-zinc-400 sm:text-xs">
                  Project Image · {Math.round(imageZoom * 100)}%
                </p>
              </div>

              <button
                type="button"
                onClick={closeImageViewer}
                aria-label="Close image viewer"
                title="Close image viewer (Esc)"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-300 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Image Area */}
            <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-auto bg-[#090a0d] p-3 sm:p-6">
              <img
                src={imageUrl}
                alt={`${project.title} enlarged preview`}
                draggable={false}
                className="max-h-full max-w-full select-none object-contain transition-transform duration-200 ease-out"
                style={{
                  transform: `scale(${imageZoom})`,
                  transformOrigin: 'center center',
                  cursor: imageZoom > 1 ? 'zoom-out' : 'zoom-in',
                }}
                onClick={() => {
                  if (imageZoom === 1) {
                    zoomIn();
                  } else {
                    resetZoom();
                  }
                }}
              />

              <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-zinc-700 bg-zinc-900/90 px-3 py-1.5 text-[10px] text-zinc-400 sm:text-xs">
                Click image to zoom · Press Esc to close
              </div>
            </div>

            {/* Zoom Toolbar */}
            <div className="flex shrink-0 flex-wrap items-center justify-center gap-2 border-t border-zinc-800 bg-[#161920] px-3 py-3 sm:justify-between sm:px-5">
              <span className="hidden text-xs text-zinc-500 sm:block">
                Image controls
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={zoomOut}
                  disabled={imageZoom <= 0.5}
                  title="Zoom out"
                  aria-label="Zoom out"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-white transition hover:border-orange-500/50 hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ZoomOut className="h-5 w-5" />
                </button>

                <span className="min-w-[66px] text-center font-mono text-sm font-semibold text-orange-400">
                  {Math.round(imageZoom * 100)}%
                </span>

                <button
                  type="button"
                  onClick={zoomIn}
                  disabled={imageZoom >= 4}
                  title="Zoom in"
                  aria-label="Zoom in"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-white transition hover:border-orange-500/50 hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ZoomIn className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={resetZoom}
                  title="Reset zoom to 100%"
                  aria-label="Reset zoom"
                  className="ml-1 flex h-10 items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-3 text-xs font-medium text-zinc-300 transition hover:border-orange-500/50 hover:text-white"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset</span>
                </button>
              </div>

              <button
                type="button"
                onClick={closeImageViewer}
                className="hidden rounded-lg bg-orange-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-500 sm:block"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectModal;
