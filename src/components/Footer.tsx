import React from 'react';
import { ArrowUp, Github, Linkedin, Lock, Shield, Settings } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useExperience } from '../context/ExperienceContext';

interface FooterProps {
  onOpenResume: () => void;
  onOpenAdminLogin: () => void;
  onNavigateAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume, onOpenAdminLogin, onNavigateAdmin }) => {
  const { isAdmin, logoutAdmin, viewMode, setViewMode } = useExperience();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-800 bg-[#0c0e12] py-12 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Title */}
          <div className="text-center md:text-left">
            <a 
              href="#hero" 
              className="text-base font-bold font-display text-white hover:text-orange-400 transition-colors"
            >
              {PERSONAL_INFO.name}
            </a>
            <p className="text-xs text-zinc-500 mt-1">
              {PERSONAL_INFO.currentRole} · Addis Ababa, Ethiopia
            </p>
          </div>

          {/* Quick Links without payment demo */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-zinc-400">
            <a href="#gallery" className="hover:text-white transition-colors">Projects & Mini Apps</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#credentials" className="hover:text-white transition-colors">Honors & Certifications</a>
            <button onClick={onOpenResume} className="hover:text-orange-400 transition-colors cursor-pointer">
              Curriculum Vitae
            </button>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            
            {/* Direct Admin Panel Path Link */}
            {/* <button
              onClick={isAdmin ? onNavigateAdmin : onOpenAdminLogin}
              className="text-orange-400 hover:text-orange-300 font-semibold transition-colors cursor-pointer flex items-center gap-1"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Panel (/admin)</span>
            </button> */}
          </div>

          {/* Social Icons & Back to top */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-white hover:bg-[#1d212a] rounded-lg transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-orange-400 hover:bg-[#1d212a] rounded-lg transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 text-zinc-400 hover:text-white hover:bg-[#1d212a] rounded-lg transition-colors cursor-pointer ml-2"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-zinc-800/80 text-center text-[11px] text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Abreham Amesa Bedada. All rights reserved.
          </div>

          {/* Admin Status & Route Notice */}
          <div className="flex items-center gap-3">
            {isAdmin ? (
              <div className="flex items-center gap-2 text-orange-400">
                <span className="flex items-center gap-1 font-semibold">
                  <Shield className="w-3 h-3 text-orange-400" />
                  <span>Admin Session Active</span>
                </span>
                <span className="text-zinc-700">·</span>
                <button
                  onClick={onNavigateAdmin}
                  className="hover:text-white underline cursor-pointer"
                >
                  Open Admin Dashboard (/admin)
                </button>
                <span className="text-zinc-700">·</span>
                <button
                  onClick={logoutAdmin}
                  className="hover:text-rose-400 underline cursor-pointer"
                >
                  Exit Admin
                </button>
              </div>
            ) : (
              <button>
      
              </button>
            )}
          </div>

          <div>
            Built with React, TypeScript & Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
};
