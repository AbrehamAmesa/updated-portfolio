/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ExperienceProvider, useExperience } from './context/ExperienceContext';
import { AdminBar } from './components/AdminBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsGallery } from './components/ProjectsGallery';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { CredentialsSection } from './components/CredentialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import  ResumeModal from './components/ResumeModal';
import { ExperienceFormModal } from './components/ExperienceFormModal';
import { SharePortfolioModal } from './components/SharePortfolioModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminPanel } from './components/AdminPanel';
import { Experience } from './data/portfolioData';

function PortfolioApp() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAddExperienceOpen, setIsAddExperienceOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [experienceToEdit, setExperienceToEdit] = useState<Experience | null>(null);

  // Direct Route Management: supports /admin, #admin, and ?admin=true
  const [currentRoute, setCurrentRoute] = useState<'portfolio' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (path === '/admin' || path.startsWith('/admin') || hash === '#admin' || search.includes('admin=true')) {
        return 'admin';
      }
    }
    return 'portfolio';
  });

  const { isAdmin } = useExperience();

  // Listen to browser forward/backward navigation and hash change
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (path === '/admin' || path.startsWith('/admin') || hash === '#admin' || search.includes('admin=true')) {
        setCurrentRoute('admin');
      } else {
        setCurrentRoute('portfolio');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Keyboard shortcut: Alt + Shift + A to open Admin Login or go to /admin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isAdmin) {
          navigateToAdmin();
        } else {
          setIsAdminLoginOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdmin]);

  const navigateToAdmin = () => {
    setCurrentRoute('admin');
    try {
      window.history.pushState(null, '', '/admin');
    } catch {
      window.location.hash = '#admin';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPortfolio = () => {
    setCurrentRoute('portfolio');
    try {
      window.history.pushState(null, '', '/');
    } catch {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEdit = (exp: Experience) => {
    setExperienceToEdit(exp);
    setIsAddExperienceOpen(true);
  };

  const handleCloseExperienceModal = () => {
    setIsAddExperienceOpen(false);
    setExperienceToEdit(null);
  };

  // If user navigated to /admin or requested Admin Panel
  if (currentRoute === 'admin') {
    return (
      <div className="min-h-screen bg-[#0f1115] text-zinc-100 flex flex-col font-sans selection:bg-orange-600/30 selection:text-orange-200">
        <AdminPanel
          onBackToPortfolio={navigateToPortfolio}
          onOpenAddExperience={() => {
            setExperienceToEdit(null);
            setIsAddExperienceOpen(true);
          }}
          onOpenEditExperience={handleOpenEdit}
          onOpenShareModal={() => setIsShareModalOpen(true)}
        />

        {/* Modals available inside Admin view */}
        <ExperienceFormModal
          isOpen={isAddExperienceOpen}
          onClose={handleCloseExperienceModal}
          experienceToEdit={experienceToEdit}
        />

        <SharePortfolioModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
        />
      </div>
    );
  }

  // Public / Main Portfolio View
  return (
    <div className="min-h-screen bg-[#0f1115] text-zinc-100 flex flex-col font-sans selection:bg-orange-600/30 selection:text-orange-200">
      
      {/* Top Admin Quick Bar (Only visible when logged in as Admin) */}
      <AdminBar
        onOpenAddModal={() => {
          setExperienceToEdit(null);
          setIsAddExperienceOpen(true);
        }}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        onNavigateAdmin={navigateToAdmin}
      />

      {/* Navigation bar following 3-zone contract with Admin Panel access */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onNavigateAdmin={navigateToAdmin}
      />

      {/* Main page content */}
      <main className="flex-1">
        {/* Split Hero with Editorial Typographic Impact and Proof Adjacency */}
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* Interactive Gallery with Category Filtering, Mini Apps Experience & Search */}
        <ProjectsGallery />

        {/* Professional Work Experience Timeline with Admin Add/Edit/Reorder & Public View */}
        <ExperienceTimeline
          onOpenAddModal={() => {
            setExperienceToEdit(null);
            setIsAddExperienceOpen(true);
          }}
          onOpenEditModal={handleOpenEdit}
        />

        {/* Verifiable Credentials, Honors & Recommendations */}
        <CredentialsSection />

        {/* Interactive Contact Form with Validation & Direct Links */}
        <ContactSection />
      </main>

      {/* Footer with Discreet Admin Portal Lock Access & Path Notice */}
      <Footer
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onNavigateAdmin={navigateToAdmin}
      />

      {/* Modals */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onNavigateAdmin={navigateToAdmin}
      />

      <ExperienceFormModal
        isOpen={isAddExperienceOpen}
        onClose={handleCloseExperienceModal}
        experienceToEdit={experienceToEdit}
      />

      <SharePortfolioModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <ExperienceProvider>
      <PortfolioApp />
    </ExperienceProvider>
  );
}
