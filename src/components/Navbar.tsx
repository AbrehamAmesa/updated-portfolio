
import React, { useState } from 'react';
import {
  Menu,
  X,
  FileText,
  ArrowUpRight,
} from 'lucide-react';

import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenAdminLogin: () => void;
  onNavigateAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenResume,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Projects & Mini Apps', href: '#gallery' },
    { label: 'Work Experience', href: '#experience' },
    { label: 'Credentials & Honors', href: '#credentials' },
    { label: 'Contact', href: '#contact' },
  ];

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-[#0f1115]/90 backdrop-blur-md transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">

          {/* Brand */}
          <a
            href="#hero"
            className="font-display text-lg font-bold tracking-tight text-white transition-colors hover:text-orange-400 sm:text-xl"
          >
            {PERSONAL_INFO.shortName}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 text-sm font-medium text-zinc-300 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap transition-colors hover:text-orange-400"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 sm:flex">
            <button
              type="button"
              onClick={onOpenResume}
              className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg border border-zinc-800 bg-[#1a1d24] px-3.5 py-2 text-xs font-semibold text-zinc-200 transition-colors hover:bg-[#232731] hover:text-white"
            >
              <FileText className="h-3.5 w-3.5 text-orange-400" />
              <span>Resume &amp; Summary</span>
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-orange-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-orange-950/40 transition-colors hover:bg-orange-500"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Mobile Actions — no Admin Lock Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={onOpenResume}
              className="cursor-pointer p-2 text-zinc-300 transition-colors hover:text-white"
              title="View Resume"
              aria-label="View Resume"
            >
              <FileText className="h-4 w-4 text-orange-400" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((previous) => !previous)}
              className="cursor-pointer p-2 text-zinc-400 transition-colors hover:text-white focus:outline-none"
              aria-label={
                mobileMenuOpen
                  ? 'Close Navigation Menu'
                  : 'Open Navigation Menu'
              }
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="space-y-3 border-b border-zinc-800 bg-[#161920] px-4 pb-6 pt-3 md:hidden">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobileMenu}
                className="rounded-md px-3 py-2 text-sm font-medium text-zinc-200 transition-colors hover:bg-[#1d212a] hover:text-orange-400"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2 border-t border-zinc-800 pt-3">
            <button
              type="button"
              onClick={() => {
                closeMobileMenu();
                onOpenResume();
              }}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-[#1d212a] px-4 py-2.5 text-xs font-semibold text-zinc-200 transition-colors hover:border-orange-500/30 hover:text-white"
            >
              <FileText className="h-4 w-4 text-orange-400" />
              <span>View Resume &amp; Credentials</span>
            </button>

            <a
              href="#contact"
              onClick={closeMobileMenu}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-orange-600 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-orange-500"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
