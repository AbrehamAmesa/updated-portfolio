import React, { useState } from 'react';
import { GraduationCap, Building2, CheckCircle2, Award, Plus, Edit3, Trash2, ArrowUp, ArrowDown, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { EDUCATION, Experience } from '../data/portfolioData';
import { useExperience } from '../context/ExperienceContext';

interface ExperienceTimelineProps {
  onOpenAddModal: () => void;
  onOpenEditModal: (exp: Experience) => void;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  onOpenAddModal,
  onOpenEditModal
}) => {
  const {
    experiences,
    publicExperiences,
    isAdmin,
    viewMode,
    deleteExperience,
    moveExperience,
    toggleVisibility
  } = useExperience();

  const [experienceToDelete, setExperienceToDelete] = useState<Experience | null>(null);

  // In admin edit mode, show all experiences. In public view/preview, show only public.
  const isEditing = isAdmin && viewMode === 'admin';
  const displayedExperiences = isEditing ? experiences : publicExperiences;

  const handleDeleteConfirm = async () => {
    if (experienceToDelete) {
      await deleteExperience(experienceToDelete.id);
      setExperienceToDelete(null);
    }
  };

  return (
    <section id="experience" className="py-16 sm:py-24 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-400 mb-2">
              <span>Career Trajectory & Track Record</span>
              {isEditing && (
                <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 font-mono text-[10px] border border-orange-500/30">
                  Admin Edit Enabled
                </span>
              )}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight [text-wrap:balance]">
              Professional Work Experience
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2">
              {isEditing
                ? 'Manage your professional experience timeline. Add new roles, update descriptions, reorder positions, or toggle public visibility.'
                : 'Rapid career progression within Siinqee Bank S.C., advancing from Bank Trainee to Associate Software Engineer-I and now Associate Application Development Officer through exceptional technical delivery.'}
            </p>
          </div>

          {/* Admin "+ Add New Experience" Action in Header */}
          {isEditing && (
            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-orange-950/40 active:scale-[0.98] cursor-pointer self-start md:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Experience</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Experience Column (Left 8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Admin Add Experience Banner card if editing */}
            {isEditing && (
              <div 
                onClick={onOpenAddModal}
                className="group p-5 rounded-2xl border-2 border-dashed border-orange-500/40 hover:border-orange-400 bg-orange-950/10 hover:bg-orange-950/20 transition-all flex items-center justify-between cursor-pointer mb-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-display text-white group-hover:text-orange-300 transition-colors">
                      + Add a New Work Role / Achievement
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Add promotion, new engineering role, or freelance contract
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                  Add Role →
                </span>
              </div>
            )}

            {/* Timeline Tree */}
            <div className="relative border-l-2 border-zinc-800 ml-4 pl-6 space-y-10">
              {displayedExperiences.map((exp, idx) => {
                const isDraft = exp.isPublic === false;

                return (
                  <div key={exp.id || idx} className="relative group">
                    {/* Timeline indicator node */}
                    <div className={`absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full transition-transform ${
                      isDraft 
                        ? 'bg-amber-950 border-2 border-amber-400' 
                        : 'bg-zinc-900 border-2 border-orange-500 group-hover:scale-125'
                    }`} />

                    <div className={`rounded-2xl p-6 sm:p-7 transition-all ${
                      isDraft
                        ? 'bg-[#181615] border border-amber-500/30'
                        : 'bg-[#161920] border border-zinc-800 hover:border-zinc-700'
                    }`}>
                      
                      {/* Top Bar: Metadata & Admin Action Tools */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        {/* Unboxed Metadata */}
                        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-orange-400">
                          <span className="font-mono">{exp.period}</span>
                          <span className="text-zinc-600">·</span>
                          <span className="text-zinc-300 font-semibold">{exp.organization}</span>
                          <span className="text-zinc-600">·</span>
                          <span className="text-zinc-400">{exp.type}</span>
                        </div>

                        {/* Admin Inline Action Toolbar */}
                        {isEditing && (
                          <div className="flex items-center gap-1.5 bg-[#1d212a] border border-zinc-800 p-1 rounded-lg">
                            {/* Visibility status & toggle */}
                            <button
                              type="button"
                              onClick={() => toggleVisibility(exp.id)}
                              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                                isDraft
                                  ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                                  : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                              }`}
                              title={isDraft ? 'Currently hidden from visitors. Click to make public.' : 'Visible to public. Click to hide.'}
                            >
                              {isDraft ? (
                                <>
                                  <EyeOff className="w-3 h-3" />
                                  <span>Draft (Hidden)</span>
                                </>
                              ) : (
                                <>
                                  <Eye className="w-3 h-3" />
                                  <span>Public</span>
                                </>
                              )}
                            </button>

                            {/* Move Up */}
                            <button
                              type="button"
                              onClick={() => moveExperience(exp.id, 'up')}
                              disabled={idx === 0}
                              className="p-1 text-zinc-400 hover:text-white disabled:opacity-30 rounded hover:bg-[#252a35] cursor-pointer"
                              title="Move position earlier"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>

                            {/* Move Down */}
                            <button
                              type="button"
                              onClick={() => moveExperience(exp.id, 'down')}
                              disabled={idx === displayedExperiences.length - 1}
                              className="p-1 text-zinc-400 hover:text-white disabled:opacity-30 rounded hover:bg-[#252a35] cursor-pointer"
                              title="Move position later"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>

                            {/* Edit */}
                            <button
                              type="button"
                              onClick={() => onOpenEditModal(exp)}
                              className="p-1 text-zinc-400 hover:text-orange-400 rounded hover:bg-[#252a35] transition-colors cursor-pointer"
                              title="Edit this experience"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => setExperienceToDelete(exp)}
                              className="p-1 text-zinc-400 hover:text-rose-400 rounded hover:bg-[#252a35] transition-colors cursor-pointer"
                              title="Delete this experience"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Job Title */}
                      <div className="flex items-center gap-2 mt-1">
                        <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                          {exp.title}
                        </h3>
                        {exp.isCustom && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/30">
                            Custom Added
                          </span>
                        )}
                      </div>
                      
                      {/* Location */}
                      <p className="text-xs text-zinc-400 mt-1 mb-4 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{exp.location}</span>
                      </p>

                      {/* Achievements */}
                      <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                        {exp.achievements.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Education & Academic Rigor (Right 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Education Card */}
            <div className="bg-[#161920] border border-zinc-800 rounded-2xl p-6 sm:p-7 space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-orange-950/60 border border-orange-500/30 text-orange-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-white">Academic Degree</h3>
                  <p className="text-xs text-zinc-400">{EDUCATION.institution}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800 space-y-3">

                <div className="pt-2">
                  <div className="text-xs font-semibold text-zinc-300 mb-2">Key Highlights</div>
                  <ul className="space-y-2 text-xs text-zinc-400">
                    {EDUCATION.keyActivities.map((act, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-orange-500 font-bold">›</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

            {/* Verification Guarantee */}
            <div className="p-5 rounded-2xl bg-[#161920] border border-zinc-800 text-xs text-zinc-400 space-y-2">
              <div className="flex items-center gap-2 text-zinc-200 font-semibold">
                <Award className="w-4 h-4 text-orange-400" />
                <span>Verified Experience Credentials</span>
              </div>
              <p className="leading-relaxed">
                Experience verified by formal certificate from Siinqee Bank S.C., Huawei Global Training Center Overseas Certification, and Wolkite University Registrar.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {experienceToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={() => setExperienceToDelete(null)}
        >
          <div
            className="w-full max-w-md bg-[#161920] border border-rose-500/40 rounded-2xl p-6 text-white shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-rose-400">
              <div className="p-2.5 rounded-xl bg-rose-500/20">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold font-display text-white">Delete Experience?</h3>
                <p className="text-xs text-zinc-400">This action will remove this role from your portfolio timeline</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#1d212a] border border-zinc-800 text-xs space-y-1">
              <div className="font-semibold text-white">{experienceToDelete.title}</div>
              <div className="text-zinc-400">{experienceToDelete.organization} · {experienceToDelete.period}</div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setExperienceToDelete(null)}
                className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors cursor-pointer"
              >
                Delete Role
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
