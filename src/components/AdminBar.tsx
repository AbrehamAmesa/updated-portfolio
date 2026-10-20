
import React from 'react';
import {
  Shield,
  Eye,
  Edit3,
  Plus,
  Share2,
  LogOut,
} from 'lucide-react';
import { useExperience } from '../context/ExperienceContext';

interface AdminBarProps {
  onOpenAddModal: () => void;
  onOpenShareModal: () => void;
  onNavigateAdmin: () => void;
}

export const AdminBar: React.FC<AdminBarProps> = ({
  onOpenAddModal,
  onOpenShareModal,
}) => {
  const { isAdmin, viewMode, setViewMode, logoutAdmin } = useExperience();

  if (!isAdmin) return null;

  return (
    <div className="sticky top-0 z-50 w-full border-b border-orange-500/30 bg-[#12141a]/95 px-4 py-2 text-xs text-white shadow-xl backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        {/* Admin Status and Identity */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 rounded border border-orange-500/30 bg-orange-500/20 px-2 py-0.5 font-semibold text-orange-400">
            <Shield className="h-3.5 w-3.5" />
            <span>Admin Active</span>
          </div>

          <span className="hidden text-zinc-600 sm:inline">|</span>

          <span className="hidden text-zinc-300 sm:inline">
            Logged in as{' '}
            <strong className="text-white">Abreham Amesa</strong>
          </span>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center rounded-lg border border-zinc-800 bg-[#181b22] p-0.5">
          <button
            type="button"
            onClick={() => setViewMode('admin')}
            aria-pressed={viewMode === 'admin'}
            className={`flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1 font-medium transition-all ${
              viewMode === 'admin'
                ? 'bg-orange-600 font-bold text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Edit Mode</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('public-preview')}
            aria-pressed={viewMode === 'public-preview'}
            className={`flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1 font-medium transition-all ${
              viewMode === 'public-preview'
                ? 'bg-amber-400 font-bold text-zinc-950 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Public Preview</span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {viewMode === 'admin' && (
            <button
              type="button"
              onClick={onOpenAddModal}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-orange-600 px-3 py-1 font-bold text-white transition-colors hover:bg-orange-500"
              title="Add a new work experience"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Experience</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenShareModal}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-zinc-700 bg-[#1e222b] px-2.5 py-1 text-zinc-200 transition-colors hover:bg-[#282d39]"
            title="Share public link without edit controls"
          >
            <Share2 className="h-3.5 w-3.5 text-orange-400" />
            <span className="hidden sm:inline">Share Public Link</span>
          </button>

          <button
            type="button"
            onClick={logoutAdmin}
            className="cursor-pointer rounded p-1 text-zinc-400 transition-colors hover:bg-[#1e222b] hover:text-rose-400"
            title="Exit Admin Mode"
            aria-label="Exit Admin Mode"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Public Preview Notice */}
      {viewMode === 'public-preview' && (
        <div className="mt-1 flex flex-wrap items-center justify-center gap-2 border-t border-zinc-800 pt-2 text-center text-[11px] text-amber-300/90">
          <Eye className="h-3.5 w-3.5 shrink-0 text-amber-400" />

          <span>
            You are previewing how other visitors and recruiters see your
            portfolio. Edit tools are hidden.
          </span>

          <button
            type="button"
            onClick={() => setViewMode('admin')}
            className="ml-1 cursor-pointer font-semibold underline hover:text-white"
          >
            Switch back to Edit Mode
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminBar;
