import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, Award, Layers, Code } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#161920] border border-zinc-800 rounded-2xl shadow-2xl text-zinc-100 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-zinc-950/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 transition-colors shadow-lg cursor-pointer"
          aria-label="Close modal (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero image banner */}
        <div className="relative aspect-video sm:aspect-[21/9] w-full overflow-hidden bg-zinc-950 border-b border-zinc-800">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161920] via-[#161920]/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            {/* Unboxed metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-orange-400 mb-2">
              <span>{project.category}</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-300">{project.organization}</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400">{project.year}</span>
              <span className="text-zinc-600">·</span>
              <span className="text-emerald-400 font-semibold">{project.status}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm text-zinc-300 mt-1">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Recognition Banner if available */}
          {project.certificateAward && (
            <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-start gap-3">
              <Award className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-orange-300">
                  Official Recognition: {project.certificateAward}
                </h4>
                <p className="text-xs text-orange-200/80 mt-0.5">
                  Verified institutional credential honoring technical delivery and system architectural excellence.
                </p>
              </div>
            </div>
          )}

          {/* Description & Overview */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              System Overview & Problem Solved
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Core Modules Breakdown */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-orange-400" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Core Architectural Modules Built
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.modules.map((module, i) => (
                <div 
                  key={i} 
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-[#1d212a] border border-zinc-800 text-xs text-zinc-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{module}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Architectural Highlights */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Code className="w-4 h-4 text-orange-400" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Key Engineering & UI Decisions
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-300">
              {project.architecturalHighlights.map((highlight, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-orange-500 font-bold">›</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Strip */}
          <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs text-zinc-400 font-medium">Technologies Deployed</span>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="px-2.5 py-1 rounded bg-[#1d212a] border border-zinc-800 text-zinc-200">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          
          </div>

        </div>

      </div>
    </div>
  );
};
