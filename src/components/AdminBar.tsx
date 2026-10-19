import React from 'react';
import { Shield, Eye, Edit3, Plus, Share2, LogOut, Settings } from 'lucide-react';
import { useExperience } from '../context/ExperienceContext';

interface AdminBarProps {
  onOpenAddModal: () => void;
  onOpenShareModal: () => void;
  onNavigateAdmin: () => void;
}

export const AdminBar: React.FC<AdminBarProps> = ({ onOpenAddModal, onOpenShareModal, onNavigateAdmin }) => {
  const { isAdmin, viewMode, setViewMode, logoutAdmin } = useExperience();

  if (!isAdmin) return null;

  return (
    <div className="sticky top-0 z-50 w-full bg-[#12141a]/95 border-b border-orange-500/30 backdrop-blur-md text-xs py-2 px-4 shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Admin Status & Identity */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 font-semibold border border-orange-500/30">
            <Shield className="w-3.5 h-3.5 text-orange-400" />
            <span>Admin Active</span>
          </div>
          <span className="hidden sm:inline text-zinc-600">|</span>
          <span className="hidden sm:inline text-zinc-300">
            Logged in as <strong className="text-white">Abreham Amesa</strong>
          </span>
        </div>

        {/* Center: Mode Switcher */}
        <div className="flex items-center bg-[#181b22] border border-zinc-800 p-0.5 rounded-lg">
          <button
            onClick={() => setViewMode('admin')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
              viewMode === 'admin'
                ? 'bg-orange-600 text-white font-bold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Mode</span>
          </button>

          <button
            onClick={() => setViewMode('public-preview')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
              viewMode === 'public-preview'
                ? 'bg-amber-400 text-zinc-950 font-bold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Public Preview</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateAdmin}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1e222b] hover:bg-[#282d39] text-orange-300 border border-orange-500/30 rounded-md transition-colors cursor-pointer"
            title="Open Full Admin Dashboard (/admin)"
          >
            <Settings className="w-3.5 h-3.5 text-orange-400" />
            <span>Admin Dashboard (/admin)</span>
          </button>

          {viewMode === 'admin' && (
            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-md transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Experience</span>
            </button>
          )}

          <button
            onClick={onOpenShareModal}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1e222b] hover:bg-[#282d39] text-zinc-200 border border-zinc-700 rounded-md transition-colors cursor-pointer"
            title="Share Public Link without Edit controls"
          >
            <Share2 className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden sm:inline">Share Public Link</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="p-1 text-zinc-400 hover:text-rose-400 hover:bg-[#1e222b] rounded transition-colors cursor-pointer"
            title="Exit Admin Mode"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Notice if in Preview Mode */}
      {viewMode === 'public-preview' && (
        <div className="mt-1 pt-1 border-t border-zinc-800 text-[11px] text-amber-300/90 text-center flex items-center justify-center gap-2">
          <Eye className="w-3.5 h-3.5 text-amber-400" />
          <span>You are previewing how other visitors and recruiters see your portfolio. Edit tools are hidden.</span>
          <button
            onClick={() => setViewMode('admin')}
            className="underline font-semibold hover:text-white ml-1 cursor-pointer"
          >
            Switch back to Edit Mode
          </button>
        </div>
      )}
    </div>
  );
};
