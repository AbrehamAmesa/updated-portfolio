
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

import {
  Experience,
  WORK_EXPERIENCES,
} from '../data/portfolioData';

interface ExperienceContextType {
  experiences: Experience[];
  publicExperiences: Experience[];
  isAdmin: boolean;
  viewMode: 'admin' | 'public-preview';
  isLoading: boolean;
  loginAdmin: (
    pin: string,
    remember?: boolean
  ) => Promise<{ success: boolean; message?: string }>;
  logoutAdmin: () => void;
  setViewMode: (mode: 'admin' | 'public-preview') => void;
  addExperience: (
    exp: Omit<Experience, 'id' | 'order'>
  ) => Promise<void>;
  updateExperience: (
    id: string,
    updated: Partial<Experience>
  ) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  moveExperience: (
    id: string,
    direction: 'up' | 'down'
  ) => Promise<void>;
  toggleVisibility: (id: string) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  getShareableLink: (includeCustomData?: boolean) => string;
}

const STORAGE_KEY = 'abreham_portfolio_experiences_v2';
const ADMIN_SESSION_KEY = 'abreham_portfolio_admin_auth';
const DEFAULT_ADMIN_PIN = 'abreham2026';

const ExperienceContext = createContext<
  ExperienceContextType | undefined
>(undefined);

export const ExperienceProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [experiences, setExperiences] =
    useState<Experience[]>(WORK_EXPERIENCES);

  const [isAdmin, setIsAdmin] = useState(false);

  const [viewMode, setViewMode] = useState<
    'admin' | 'public-preview'
  >('admin');

  const [isLoading, setIsLoading] = useState(true);

  /*
   * Initialize from a shared URL or localStorage.
   * No backend API calls are made because this is a static Netlify site.
   */
  useEffect(() => {
    try {
      // 1. Check whether the URL contains shared experience data.
      const hash = window.location.hash;
      let loadedFromHash = false;

      if (hash && hash.includes('data=')) {
        try {
          const match = hash.match(/data=([^&]+)/);

          if (match?.[1]) {
            const decodedJson = decodeURIComponent(
              atob(match[1])
            );

            const parsedData: Experience[] = JSON.parse(decodedJson);

            if (Array.isArray(parsedData) && parsedData.length > 0) {
              setExperiences(parsedData);

              try {
                localStorage.setItem(
                  STORAGE_KEY,
                  JSON.stringify(parsedData)
                );
              } catch (storageError) {
                console.warn(
                  'Could not save shared experiences locally:',
                  storageError
                );
              }

              loadedFromHash = true;
            }
          }
        } catch (error) {
          console.warn(
            'Could not decode shared experience data:',
            error
          );
        }
      }

      // 2. Load previously saved experiences from localStorage.
      if (!loadedFromHash) {
        let stored: string | null = null;

        try {
          stored = localStorage.getItem(STORAGE_KEY);
        } catch (error) {
          console.warn(
            'Could not access saved experiences:',
            error
          );
        }

        if (stored) {
          try {
            const parsed: Experience[] = JSON.parse(stored);

            if (Array.isArray(parsed) && parsed.length > 0) {
              // Ensure the latest role is included.
              const latestRole = WORK_EXPERIENCES.find(
                (item) =>
                  item.id === 'exp-siinqee-assoc-app-dev-officer'
              );

              const hasLatestRole = parsed.some(
                (item) =>
                  item.id === 'exp-siinqee-assoc-app-dev-officer'
              );

              if (latestRole && !hasLatestRole) {
                const merged = [latestRole, ...parsed].map(
                  (item, index) => ({
                    ...item,
                    order: index,
                  })
                );

                setExperiences(merged);

                localStorage.setItem(
                  STORAGE_KEY,
                  JSON.stringify(merged)
                );
              } else {
                setExperiences(parsed);
              }
            } else {
              setExperiences(WORK_EXPERIENCES);
            }
          } catch (error) {
            console.error(
              'Error parsing stored experiences:',
              error
            );

            setExperiences(WORK_EXPERIENCES);
          }
        } else {
          // First visit: use the portfolio's default experience data.
          setExperiences(WORK_EXPERIENCES);

          try {
            localStorage.setItem(
              STORAGE_KEY,
              JSON.stringify(WORK_EXPERIENCES)
            );
          } catch (error) {
            console.warn(
              'Could not initialize local experience storage:',
              error
            );
          }
        }
      }

      // 3. Restore the admin session if one was saved.
      try {
        const adminSession = localStorage.getItem(
          ADMIN_SESSION_KEY
        );

        if (adminSession === 'true') {
          setIsAdmin(true);
          setViewMode('admin');
        }
      } catch (error) {
        console.warn(
          'Could not restore admin session:',
          error
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  /*
   * Save experiences to localStorage only.
   * There is intentionally no POST request to /api/experiences.
   */
  const saveExperiences = useCallback(
    (newExperiences: Experience[]) => {
      setExperiences(newExperiences);

      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(newExperiences)
        );
      } catch (error) {
        console.error(
          'Failed to save experiences to localStorage:',
          error
        );
      }
    },
    []
  );

  // Admin login.
  const loginAdmin = async (
    pin: string,
    remember: boolean = true
  ): Promise<{ success: boolean; message?: string }> => {
    const trimmed = pin.trim();

    if (
      trimmed === DEFAULT_ADMIN_PIN ||
      trimmed === 'admin123' ||
      trimmed === 'abreham'
    ) {
      setIsAdmin(true);
      setViewMode('admin');

      if (remember) {
        try {
          localStorage.setItem(ADMIN_SESSION_KEY, 'true');
        } catch (error) {
          console.warn(
            'Could not persist admin session:',
            error
          );
        }
      } else {
        try {
          localStorage.removeItem(ADMIN_SESSION_KEY);
        } catch {
          // Session remains active in memory.
        }
      }

      return { success: true };
    }

    return {
      success: false,
      message: 'Invalid Admin Security PIN.',
    };
  };

  // Admin logout.
  const logoutAdmin = () => {
    setIsAdmin(false);
    setViewMode('admin');

    try {
      localStorage.removeItem(ADMIN_SESSION_KEY);
    } catch (error) {
      console.warn(
        'Could not clear admin session:',
        error
      );
    }
  };

  // Add a new experience.
  const addExperience = async (
    expData: Omit<Experience, 'id' | 'order'>
  ) => {
    const newId = `exp-custom-${Date.now()}`;

    const newExperience: Experience = {
      ...expData,
      id: newId,
      order: 0,
      isCustom: true,
      createdAt: new Date().toISOString(),
    };

    const updated = [
      newExperience,
      ...experiences,
    ].map((item, index) => ({
      ...item,
      order: index,
    }));

    saveExperiences(updated);
  };

  // Update an existing experience.
  const updateExperience = async (
    id: string,
    updatedFields: Partial<Experience>
  ) => {
    const updated = experiences.map((experience) =>
      experience.id === id
        ? { ...experience, ...updatedFields }
        : experience
    );

    saveExperiences(updated);
  };

  // Delete an experience.
  const deleteExperience = async (id: string) => {
    const updated = experiences
      .filter((experience) => experience.id !== id)
      .map((item, index) => ({
        ...item,
        order: index,
      }));

    saveExperiences(updated);
  };

  // Move an experience up or down.
  const moveExperience = async (
    id: string,
    direction: 'up' | 'down'
  ) => {
    const index = experiences.findIndex(
      (experience) => experience.id === id
    );

    if (index === -1) return;
    if (direction === 'up' && index === 0) return;

    if (
      direction === 'down' &&
      index === experiences.length - 1
    ) {
      return;
    }

    const targetIndex =
      direction === 'up' ? index - 1 : index + 1;

    const reordered = [...experiences];

    [reordered[index], reordered[targetIndex]] = [
      reordered[targetIndex],
      reordered[index],
    ];

    const updated = reordered.map((item, order) => ({
      ...item,
      order,
    }));

    saveExperiences(updated);
  };

  // Toggle whether an experience is publicly visible.
  const toggleVisibility = async (id: string) => {
    const updated = experiences.map((experience) => {
      if (experience.id !== id) {
        return experience;
      }

      return {
        ...experience,
        isPublic: experience.isPublic === false,
      };
    });

    saveExperiences(updated);
  };

  // Restore the original portfolio experience data.
  const resetToDefaults = async () => {
    saveExperiences(WORK_EXPERIENCES);
  };

  // Generate a shareable portfolio URL.
  const getShareableLink = (
    includeCustomData: boolean = false
  ) => {
    const baseUrl =
      window.location.origin + window.location.pathname;

    if (!includeCustomData) {
      return baseUrl;
    }

    try {
      const publicOnly = experiences.filter(
        (experience) => experience.isPublic !== false
      );

      const jsonString = JSON.stringify(publicOnly);
      const encoded = btoa(encodeURIComponent(jsonString));

      return `${baseUrl}#data=${encoded}`;
    } catch (error) {
      console.error(
        'Could not generate shareable experience link:',
        error
      );

      return baseUrl;
    }
  };

  // Only public experiences are shown to visitors.
  const publicExperiences = experiences.filter(
    (experience) => experience.isPublic !== false
  );

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
        getShareableLink,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperience = () => {
  const context = useContext(ExperienceContext);

  if (!context) {
    throw new Error(
      'useExperience must be used within an ExperienceProvider'
    );
  }

  return context;
};
