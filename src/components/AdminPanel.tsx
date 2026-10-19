import React, { useState } from 'react';
import { 
  Briefcase, Plus, Edit3, Trash2, ArrowUp, ArrowDown, Eye, EyeOff, 
  ArrowLeft, Shield, LogOut, Share2, Layers, Key, Check, RotateCcw, 
  Sparkles, FileText, AlertCircle, ExternalLink, Lock
} from 'lucide-react';
import { useExperience } from '../context/ExperienceContext';
import { PROJECTS, Project, Experience } from '../data/portfolioData';

interface AdminPanelProps {
  onBackToPortfolio: () => void;
  onOpenAddExperience: () => void;
  onOpenEditExperience: (exp: Experience) => void;
  onOpenShareModal: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onBackToPortfolio,
  onOpenAddExperience,
  onOpenEditExperience,
  onOpenShareModal
}) => {
  const {
    experiences,
    isAdmin,
    loginAdmin,
    logoutAdmin,
    deleteExperience,
    moveExperience,
    toggleVisibility,
    resetToDefaults
  } = useExperience();

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'experiences' | 'projects' | 'system'>('experiences');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  // If not authenticated as Admin, show login screen at /admin
  if (!isAdmin) {
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setPinError(null);
      const res = await loginAdmin(pinInput.trim());
      if (!res.success) {
        setPinError(res.message || 'Invalid Admin Security PIN. Default PIN is abreham2026');
      }
    };

    return (
      <div className="min-h-screen bg-[#0f1115] text-zinc-100 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md bg-[#161920] border border-orange-500/30 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display text-white">Admin Management Portal</h1>
              <p className="text-xs text-zinc-400 mt-0.5">Path: <code className="text-orange-400 font-mono">/admin</code></p>
            </div>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed">
            Welcome, Abreham. Enter your Admin Security PIN to manage experiences, project listings, and public visibility.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                Admin Security PIN
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN (default: abreham2026)"
                className="w-full px-4 py-2.5 bg-[#1d212a] border border-zinc-800 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-orange-500"
                autoFocus
              />
              {pinError && <p className="text-xs text-rose-400 mt-1.5">{pinError}</p>}
            </div>

            <div className="flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => setPinInput('abreham2026')}
                className="text-orange-400 hover:text-orange-300 underline font-medium cursor-pointer"
              >
                Auto-fill default PIN (abreham2026)
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-lg transition-colors shadow-md shadow-orange-950/40 cursor-pointer text-sm"
            >
              Sign In to Admin Panel
            </button>
          </form>

          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs">
            <button
              onClick={onBackToPortfolio}
              className="text-zinc-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Portfolio</span>
            </button>
            <span className="text-zinc-600 font-mono">Siinqee Bank S.C.</span>
          </div>
        </div>
      </div>
    );
  }

  const publicCount = experiences.filter(e => e.isPublic !== false).length;
  const draftCount = experiences.filter(e => e.isPublic === false).length;

  return (
    <div className="min-h-screen bg-[#0f1115] text-zinc-100 flex flex-col font-sans">
      
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-[#161920]/95 backdrop-blur-md border-b border-zinc-800 py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToPortfolio}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1d212a] hover:bg-[#252a35] text-zinc-300 hover:text-white rounded-lg text-xs font-medium border border-zinc-800 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-orange-400" />
              <span>View Public Portfolio</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-orange-500/10 text-orange-400 text-xs font-bold border border-orange-500/30">
                Admin Panel
              </span>
              <span className="text-xs text-zinc-400 hidden sm:inline">
                Path: <code className="text-orange-300 font-mono">/admin</code>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenShareModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1d212a] hover:bg-[#252a35] text-zinc-200 text-xs font-medium rounded-lg border border-zinc-800 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-orange-400" />
              <span>Share Public Link</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 text-xs font-medium rounded-lg border border-rose-800/40 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Admin Dashboard Welcome & Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#161920] border border-zinc-800 space-y-1">
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Total Roles</div>
            <div className="text-2xl font-bold font-display text-white">{experiences.length}</div>
            <div className="text-[11px] text-zinc-500">In your career timeline</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#161920] border border-zinc-800 space-y-1">
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Public Roles</div>
            <div className="text-2xl font-bold font-display text-emerald-400">{publicCount}</div>
            <div className="text-[11px] text-zinc-500">Visible to external visitors</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#161920] border border-zinc-800 space-y-1">
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Draft / Hidden</div>
            <div className="text-2xl font-bold font-display text-amber-400">{draftCount}</div>
            <div className="text-[11px] text-zinc-500">Private to Admin only</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#161920] border border-zinc-800 space-y-1">
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Projects Showcased</div>
            <div className="text-2xl font-bold font-display text-orange-400">{PROJECTS.length}</div>
            <div className="text-[11px] text-zinc-500">Including Mini Apps & Banking</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
          <button
            onClick={() => setActiveTab('experiences')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'experiences'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-[#1d212a]'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Manage Work Experiences</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-[#1d212a]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>View Projects & Mini Apps</span>
          </button>

          <button
            onClick={() => setActiveTab('system')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'system'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-[#1d212a]'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Security & Data Settings</span>
          </button>
        </div>

        {/* TAB 1: WORK EXPERIENCES */}
        {activeTab === 'experiences' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold font-display text-white">Career Timeline Experience List</h2>
                <p className="text-xs text-zinc-400">
                  Add new roles, reorder sequence, edit details, or toggle public visibility.
                </p>
              </div>

              <button
                onClick={onOpenAddExperience}
                className="flex items-center gap-2 px-4 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-orange-950/40 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Work Experience</span>
              </button>
            </div>

            {/* List of Experiences */}
            <div className="space-y-3">
              {experiences.map((exp, idx) => {
                const isDraft = exp.isPublic === false;

                return (
                  <div
                    key={exp.id}
                    className={`p-5 rounded-2xl bg-[#161920] border transition-all ${
                      isDraft ? 'border-amber-500/30 bg-[#191717]' : 'border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-orange-400">
                          <span className="font-mono">{exp.period}</span>
                          <span className="text-zinc-600">·</span>
                          <span className="text-zinc-300 font-semibold">{exp.organization}</span>
                          <span className="text-zinc-600">·</span>
                          <span className="text-zinc-400">{exp.type}</span>
                          {exp.isCustom && (
                            <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 text-[10px] border border-orange-500/20">
                              Custom Added
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold font-display text-white">
                          {exp.title}
                        </h3>

                        <p className="text-xs text-zinc-400">
                          {exp.location}
                        </p>

                        <div className="pt-2 text-xs text-zinc-300">
                          <ul className="list-disc list-inside space-y-1 text-zinc-300">
                            {exp.achievements.slice(0, 2).map((ach, i) => (
                              <li key={i} className="line-clamp-1">{ach}</li>
                            ))}
                            {exp.achievements.length > 2 && (
                              <li className="text-zinc-500 text-[11px] list-none">
                                + {exp.achievements.length - 2} more bullet point(s)
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>

                      {/* Management Controls */}
                      <div className="flex flex-wrap items-center gap-2 self-start lg:self-center border-t lg:border-t-0 pt-3 lg:pt-0 border-zinc-800">
                        {/* Visibility Toggle */}
                        <button
                          type="button"
                          onClick={() => toggleVisibility(exp.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                            isDraft
                              ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30'
                          }`}
                        >
                          {isDraft ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5" />
                              <span>Draft (Hidden)</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5" />
                              <span>Public</span>
                            </>
                          )}
                        </button>

                        {/* Move Up */}
                        <button
                          type="button"
                          onClick={() => moveExperience(exp.id, 'up')}
                          disabled={idx === 0}
                          className="p-2 text-zinc-400 hover:text-white disabled:opacity-30 rounded-lg bg-[#1d212a] border border-zinc-800 hover:bg-[#252a35] cursor-pointer"
                          title="Move Earlier in Timeline"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>

                        {/* Move Down */}
                        <button
                          type="button"
                          onClick={() => moveExperience(exp.id, 'down')}
                          disabled={idx === experiences.length - 1}
                          className="p-2 text-zinc-400 hover:text-white disabled:opacity-30 rounded-lg bg-[#1d212a] border border-zinc-800 hover:bg-[#252a35] cursor-pointer"
                          title="Move Later in Timeline"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>

                        {/* Edit */}
                        <button
                          type="button"
                          onClick={() => onOpenEditExperience(exp)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1d212a] hover:bg-[#252a35] text-zinc-200 border border-zinc-800 hover:text-orange-400 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(exp.id)}
                          className="p-2 text-zinc-400 hover:text-rose-400 rounded-lg bg-[#1d212a] border border-zinc-800 hover:bg-rose-950/30 transition-colors cursor-pointer"
                          title="Delete Role"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* TAB 2: PROJECTS & MINI APPS */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold font-display text-white">All Showcase Projects & Mini Apps</h2>
              <p className="text-xs text-zinc-400">
                Review all registered projects, categorized with technical stacks and key highlights.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="p-5 rounded-2xl bg-[#161920] border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-orange-400">{proj.category}</span>
                    <span className="text-[11px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                      {proj.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-display text-white">{proj.title}</h3>
                  <p className="text-xs text-zinc-400 line-clamp-2">{proj.summary}</p>

                  <div className="pt-2 border-t border-zinc-800 flex flex-wrap gap-1.5 text-[11px] font-mono text-zinc-400">
                    {proj.techStack.map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-[#1d212a] border border-zinc-800 text-zinc-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SYSTEM & SECURITY */}
        {activeTab === 'system' && (
          <div className="space-y-6 max-w-3xl">
            <div className="p-6 rounded-2xl bg-[#161920] border border-zinc-800 space-y-4">
              <h2 className="text-base font-bold font-display text-white">Direct URL Navigation Paths</h2>
              <div className="space-y-2 text-xs text-zinc-300 leading-relaxed font-mono">
                <div className="p-3 rounded-lg bg-[#1d212a] border border-zinc-800">
                  <span className="text-zinc-500 block text-[11px] font-sans">Admin Portal URL:</span>
                  <span className="text-orange-400 font-bold">{window.location.origin}/admin</span>
                </div>
                <div className="p-3 rounded-lg bg-[#1d212a] border border-zinc-800">
                  <span className="text-zinc-500 block text-[11px] font-sans">Public Portfolio (what you share):</span>
                  <span className="text-emerald-400 font-bold">{window.location.origin}/</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#161920] border border-zinc-800 space-y-3">
              <h2 className="text-base font-bold font-display text-white">Admin Security PIN</h2>
              <p className="text-xs text-zinc-400">
                Your current active PIN is: <code className="text-orange-400 font-mono font-bold">abreham2026</code>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#161920] border border-rose-500/30 space-y-3">
              <h2 className="text-base font-bold font-display text-rose-400">Reset to Default Data</h2>
              <p className="text-xs text-zinc-400">
                If you ever want to revert all timeline experiences back to the default verified Siinqee Bank and WKU records:
              </p>
              {confirmReset ? (
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={async () => {
                      await resetToDefaults();
                      setConfirmReset(false);
                    }}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg cursor-pointer"
                  >
                    Confirm Reset
                  </button>
                  <button
                    onClick={() => setConfirmReset(false)}
                    className="px-4 py-2 text-xs text-zinc-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmReset(true)}
                  className="px-4 py-2 bg-[#1d212a] hover:bg-rose-950/40 text-rose-300 text-xs font-semibold rounded-lg border border-rose-900/40 cursor-pointer"
                >
                  Reset Timeline to Defaults
                </button>
              )}
            </div>
          </div>
        )}

      </main>

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={() => setConfirmDeleteId(null)}
        >
          <div
            className="w-full max-w-md bg-[#161920] border border-rose-500/40 rounded-2xl p-6 text-white shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-bold font-display text-white">Delete Work Experience?</h3>
            <p className="text-xs text-zinc-400">
              Are you sure you want to remove this position from your timeline?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deleteExperience(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg cursor-pointer"
              >
                Delete Role
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
