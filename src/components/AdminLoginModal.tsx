import React, { useState } from 'react';
import { X, Lock, KeyRound, Eye, EyeOff, ShieldAlert, ArrowRight } from 'lucide-react';
import { useExperience } from '../context/ExperienceContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateAdmin?: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onNavigateAdmin }) => {
  const { loginAdmin } = useExperience();
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) {
      setError('Please enter your Admin PIN');
      return;
    }

    setIsLoading(true);
    setError(null);

    const result = await loginAdmin(pin.trim(), remember);
    setIsLoading(false);

    if (result.success) {
      setPin('');
      onClose();
      if (onNavigateAdmin) {
        onNavigateAdmin();
      }
    } else {
      setError(result.message || 'Invalid PIN. Default PIN is abreham2026');
    }
  };

  const handleQuickFill = () => {
    setPin('abreham2026');
    setError(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#161920] border border-orange-500/30 rounded-2xl shadow-2xl text-zinc-100 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-white">
              Admin Access Portal
            </h2>
            <p className="text-xs text-zinc-400">
              Direct Path: <code className="text-orange-400 font-mono">/admin</code>
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
              Admin Security PIN
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type={showPin ? 'text' : 'password'}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(null);
                }}
                placeholder="Enter PIN (e.g. abreham2026)"
                className="w-full pl-10 pr-10 py-2.5 bg-[#1d212a] border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 font-mono"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            
            {error && (
              <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-2">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Quick Helper Button */}
          <div className="flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={handleQuickFill}
              className="text-orange-400 hover:text-orange-300 underline font-medium cursor-pointer"
            >
              Fill Default PIN (abreham2026)
            </button>
            
            <label className="flex items-center gap-1.5 text-zinc-400 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="rounded border-zinc-700 bg-zinc-900 text-orange-500 focus:ring-0"
              />
              <span>Keep logged in</span>
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-lg transition-all shadow-md shadow-orange-950/40 active:scale-[0.99] disabled:opacity-50 cursor-pointer text-sm"
            >
              <Lock className="w-4 h-4" />
              <span>{isLoading ? 'Verifying...' : 'Unlock Admin Controls'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-zinc-800 text-[11px] text-zinc-500 leading-relaxed text-center">
          You can also navigate directly to <code className="text-orange-400 font-mono">/admin</code> in your browser address bar anytime to access the full management dashboard.
        </div>
      </div>
    </div>
  );
};
