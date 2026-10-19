import React, { useState } from 'react';
import { Menu, X, FileText, ArrowUpRight, Shield, Lock, Settings } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useExperience } from '../context/ExperienceContext';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenAdminLogin: () => void;
  onNavigateAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenAdminLogin, onNavigateAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAdmin, viewMode, setViewMode } = useExperience();

  const navLinks = [
    { label: 'Projects & Mini Apps', href: '#gallery' },
    { label: 'Work Experience', href: '#experience' },
    { label: 'Credentials & Honors', href: '#credentials' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0f1115]/90 border-b border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Wordmark */}
          <a 
            href="#hero" 
            className="text-lg sm:text-xl font-bold tracking-tight text-white hover:text-orange-400 transition-colors font-display"
          >
            {PERSONAL_INFO.shortName}
          </a>

          {/* Clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-orange-400 transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Zone */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Dedicated Admin Portal access button */}
            {/* <button
              onClick={isAdmin ? onNavigateAdmin : onOpenAdminLogin}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                isAdmin
                  ? 'bg-orange-600/20 text-orange-400 border-orange-500/40 hover:bg-orange-600/30'
                  : 'bg-[#181b22] text-zinc-400 border-zinc-800 hover:text-orange-300 hover:border-zinc-700'
              }`}
              title={isAdmin ? 'Open Admin Panel (/admin)' : 'Sign In to Admin Panel'}
            >
              {isAdmin ? <Settings className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              <span>Admin Panel</span>
            </button> */}

            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-zinc-200 bg-[#1a1d24] hover:bg-[#232731] hover:text-white border border-zinc-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-orange-400" />
              <span>Resume & Summary</span>
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors whitespace-nowrap shadow-sm shadow-orange-950/40"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={isAdmin ? onNavigateAdmin : onOpenAdminLogin}
              className="p-2 text-zinc-300 hover:text-orange-400"
              title="Admin Panel"
            >
              <Lock className="w-4 h-4 text-orange-400" />
            </button>
            <button
              onClick={onOpenResume}
              className="p-2 text-zinc-300 hover:text-white"
              title="View Resume"
            >
              <FileText className="w-4 h-4 text-zinc-400" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-[#161920] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-zinc-200 hover:text-orange-400 hover:bg-[#1d212a] rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
            {/* <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (isAdmin) onNavigateAdmin();
                else onOpenAdminLogin();
              }}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-xs font-semibold text-orange-300 bg-[#1d212a] border border-orange-500/30 rounded-lg"
            >
              <Lock className="w-4 h-4 text-orange-400" />
              <span>Admin Panel (/admin)</span>
            </button> */}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-xs font-semibold text-zinc-200 bg-[#1d212a] border border-zinc-800 rounded-lg"
            >
              <FileText className="w-4 h-4 text-orange-400" />
              <span>View Resume & Credentials</span>
            </button>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 w-full px-4 py-2.5 text-xs font-semibold text-white bg-orange-600 rounded-lg"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
