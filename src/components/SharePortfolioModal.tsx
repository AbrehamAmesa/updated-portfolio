import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, ShieldCheck, Eye, Share2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useExperience } from '../context/ExperienceContext';

interface SharePortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SharePortfolioModal: React.FC<SharePortfolioModalProps> = ({ isOpen, onClose }) => {
  const { getShareableLink, publicExperiences } = useExperience();
  const [copiedClean, setCopiedClean] = useState(false);
  const [copiedSync, setCopiedSync] = useState(false);

  if (!isOpen) return null;

  const cleanUrl = getShareableLink(false);
  const syncUrl = getShareableLink(true);

  const handleCopyClean = () => {
    navigator.clipboard.writeText(cleanUrl);
    setCopiedClean(true);
    setTimeout(() => setCopiedClean(false), 2200);
  };

  const handleCopySync = () => {
    navigator.clipboard.writeText(syncUrl);
    setCopiedSync(true);
    setTimeout(() => setCopiedSync(false), 2200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#161920] border border-orange-500/30 rounded-2xl shadow-2xl text-zinc-100 my-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display text-white">
                Share Public Portfolio
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Share with recruiters, hiring managers, and clients — strictly read-only
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-[#1d212a] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Assurance Banner */}
        <div className="p-4 rounded-xl bg-[#1d212a] border border-orange-500/20 mb-6 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
          <div className="text-xs text-zinc-300 leading-relaxed">
            <p className="font-semibold text-white">
              Public Recipient Protection Guarantee
            </p>
            <p className="text-zinc-400 mt-1">
              External visitors opening these links will see a curated portfolio showcasing your <span className="text-orange-400 font-semibold">{publicExperiences.length} public experiences</span> and project case studies. Edit buttons, admin bars, and private draft entries are completely invisible to them.
            </p>
          </div>
        </div>

        {/* Share Link Options */}
        <div className="space-y-4">
          
          {/* Option 1: Standard Clean Link */}
          <div className="p-4 rounded-xl bg-[#12141a] border border-zinc-800 hover:border-zinc-700 transition-colors space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-200">
                1. Standard Clean URL (Recommended for Resumes & LinkedIn)
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">Direct Root</span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Direct link to your portfolio. Shows all saved public positions.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                readOnly
                value={cleanUrl}
                className="flex-1 px-3 py-2 bg-[#1d212a] border border-zinc-800 rounded-lg text-xs font-mono text-zinc-300 select-all focus:outline-none"
              />
              <button
                type="button"
                onClick={handleCopyClean}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 shadow-sm"
              >
                {copiedClean ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Option 2: Instant Data-Synced Link */}
          <div className="p-4 rounded-xl bg-[#12141a] border border-zinc-800 hover:border-zinc-700 transition-colors space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>2. Portable Encoded Snapshot Link</span>
              </span>
              <span className="text-[11px] text-orange-400 font-mono">100% Guaranteed</span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Encodes your latest added experiences directly into the URL hash so anyone across any browser immediately sees your custom additions even without shared database storage.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                readOnly
                value={syncUrl}
                className="flex-1 px-3 py-2 bg-[#1d212a] border border-zinc-800 rounded-lg text-xs font-mono text-zinc-400 select-all focus:outline-none truncate"
              />
              <button
                type="button"
                onClick={handleCopySync}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#1d212a] hover:bg-[#252a35] text-orange-400 border border-orange-500/30 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
              >
                {copiedSync ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Encoded</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Live Preview Button */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
          <div className="text-xs text-zinc-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Ready to share anytime</span>
          </div>

          <a
            href={cleanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-orange-400 hover:text-white bg-[#1d212a] hover:bg-orange-600/20 border border-orange-500/30 rounded-lg transition-colors"
          >
            <span>Open in New Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
