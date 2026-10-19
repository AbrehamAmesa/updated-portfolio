import React, { createContext, useContext, useState, useEffect } from 'react';
import { Experience, WORK_EXPERIENCES } from '../data/portfolioData';

interface ExperienceContextType {
  experiences: Experience[];
  publicExperiences: Experience[];
  isAdmin: boolean;
  viewMode: 'admin' | 'public-preview';
  isLoading: boolean;
  loginAdmin: (pin: string, remember?: boolean) => Promise<{ success: boolean; message?: string }>;
  logoutAdmin: () => void;
  setViewMode: (mode: 'admin' | 'public-preview') => void;
  addExperience: (exp: Omit<Experience, 'id' | 'order'>) => Promise<void>;
  updateExperience: (id: string, updated: Partial<Experience>) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  moveExperience: (id: string, direction: 'up' | 'down') => Promise<void>;
  toggleVisibility: (id: string) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  getShareableLink: (includeCustomData?: boolean) => string;
}

const STORAGE_KEY = 'abreham_portfolio_experiences_v2';
const ADMIN_SESSION_KEY = 'abreham_portfolio_admin_auth';
const DEFAULT_ADMIN_PIN = 'abreham2026';

const ExperienceContext = createContext<ExperienceContextType | undefined>(undefined);

export const ExperienceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [experiences, setExperiences] = useState<Experience[]>(WORK_EXPERIENCES);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'admin' | 'public-preview'>('admin');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize data on mount
  useEffect(() => {
    try {
      // 1. Check if visitor opened a shared link with encoded data in hash
      const hash = window.location.hash;
      let loadedFromHash = false;
      if (hash && hash.includes('data=')) {
        try {
          const match = hash.match(/data=([^&]+)/);
          if (match && match[1]) {
            const decodedJson = decodeURIComponent(atob(match[1]));
            const parsedData: Experience[] = JSON.parse(decodedJson);
            if (Array.isArray(parsedData) && parsedData.length > 0) {
              setExperiences(parsedData);
              localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedData));
              loadedFromHash = true;
            }
          }
        } catch (e) {
          console.warn('Could not decode hash payload', e);
        }
      }

      // 2. If not from hash, check localStorage
      if (!loadedFromHash) {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          try {
            const parsed: Experience[] = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
              // Ensure the new role Associate Application Development Officer is present
              const hasNewRole = parsed.some(e => e.id === 'exp-siinqee-assoc-app-dev-officer');
              if (!hasNewRole) {
                const merged = [WORK_EXPERIENCES[0], ...parsed];
                setExperiences(merged);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
              } else {
                setExperiences(parsed);
              }
            }
          } catch (e) {
            console.error('Error parsing stored experiences', e);
          }
        } else {
          // Store default initial state including new role
          localStorage.setItem(STORAGE_KEY, JSON.stringify(WORK_EXPERIENCES));
        }
      }

      // 3. Attempt to fetch from backend API if available
      fetch('/api/experiences')
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error('No API');
        })
        .then((serverData: Experience[]) => {
          if (Array.isArray(serverData) && serverData.length > 0) {
            setExperiences(serverData);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(serverData));
          }
        })
        .catch(() => {
          // Pure client-side or static fallback
        });

      // 4. Check admin session
      const adminSession = localStorage.getItem(ADMIN_SESSION_KEY);
      if (adminSession === 'true') {
        setIsAdmin(true);
        setViewMode('admin');
      }

      // 5. Check if URL has ?admin=login parameter
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === 'true' && !isAdmin) {
        // Can auto-prompt or set flag
      }

    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save to localStorage whenever experiences change
  const saveExperiences = (newExps: Experience[]) => {
    setExperiences(newExps);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newExps));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }

    // Also attempt to sync to backend API
    fetch('/api/experiences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newExps)
    }).catch(() => {
      // API optional
    });
  };

  const loginAdmin = async (pin: string, remember: boolean = true) => {
    // Check PIN: accepts default 'abreham2026' or 'admin123'
    const trimmed = pin.trim();
    if (trimmed === DEFAULT_ADMIN_PIN || trimmed === 'admin123' || trimmed === 'abreham') {
      setIsAdmin(true);
      setViewMode('admin');
      if (remember) {
        localStorage.setItem(ADMIN_SESSION_KEY, 'true');
      }
      return { success: true };
    }
    return { success: false, message: 'Invalid Admin Security PIN. Default PIN is abreham2026' };
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setViewMode('admin');
    localStorage.removeItem(ADMIN_SESSION_KEY);
  };

  const addExperience = async (expData: Omit<Experience, 'id' | 'order'>) => {
    const newId = `exp-custom-${Date.now()}`;
    const newExperience: Experience = {
      ...expData,
      id: newId,
      order: 0,
      isCustom: true,
      createdAt: new Date().toISOString()
    };

    // Prepend to list and update orders
    const updated = [newExperience, ...experiences].map((item, index) => ({
      ...item,
      order: index
    }));

    saveExperiences(updated);
  };

  const updateExperience = async (id: string, updatedFields: Partial<Experience>) => {
    const updated = experiences.map((exp) => {
      if (exp.id === id) {
        return { ...exp, ...updatedFields };
      }
      return exp;
    });
    saveExperiences(updated);
  };

  const deleteExperience = async (id: string) => {
    const updated = experiences.filter((exp) => exp.id !== id).map((item, index) => ({
      ...item,
      order: index
    }));
    saveExperiences(updated);
  };

  const moveExperience = async (id: string, direction: 'up' | 'down') => {
    const index = experiences.findIndex((exp) => exp.id === id);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === experiences.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const newExps = [...experiences];
    const temp = newExps[index];
    newExps[index] = newExps[targetIndex];
    newExps[targetIndex] = temp;

    // Reassign order
    const ordered = newExps.map((item, idx) => ({ ...item, order: idx }));
    saveExperiences(ordered);
  };

  const toggleVisibility = async (id: string) => {
    const updated = experiences.map((exp) => {
      if (exp.id === id) {
        return { ...exp, isPublic: exp.isPublic === false ? true : false };
      }
      return exp;
    });
    saveExperiences(updated);
  };

  const resetToDefaults = async () => {
    saveExperiences(WORK_EXPERIENCES);
  };

  const getShareableLink = (includeCustomData: boolean = false) => {
    const baseUrl = window.location.origin + window.location.pathname;
    if (!includeCustomData) {
      return baseUrl;
    }
    // Encode the public experiences in base64 hash so any visitor device loads them directly
    try {
      const publicOnly = experiences.filter(e => e.isPublic !== false);
      const jsonStr = JSON.stringify(publicOnly);
      const encoded = btoa(encodeURIComponent(jsonStr));
      return `${baseUrl}#data=${encoded}`;
    } catch {
      return baseUrl;
    }
  };

  // Only public experiences for visitors (or preview mode)
  const publicExperiences = experiences.filter((exp) => exp.isPublic !== false);

  return (
    <ExperienceContext.Provider
      value={{
        experiences,
        publicExperiences,
        isAdmin,
        viewMode,
        isLoading,
        loginAdmin,
        logoutAdmin,
        setViewMode,
        addExperience,
        updateExperience,
        deleteExperience,
        moveExperience,
        toggleVisibility,
        resetToDefaults,
        getShareableLink
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperience = () => {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error('useExperience must be used within an ExperienceProvider');
  }
  return context;
};
