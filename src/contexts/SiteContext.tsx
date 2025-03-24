
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types pour les données du site
export interface Project {
  id: number;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  date: string;
  author: string;
  category: string;
  description: string;
  image: string;
  location?: string;
  participants?: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  time: string;
  capacity: string;
  description: string;
  image: string;
  category: 'atelier' | 'exposition' | 'performance' | 'autre';
  registrations?: number;
}

export interface Page {
  id: number;
  title: string;
  slug: string;
  lastModified: string;
  author: string;
  content?: string;
}

export interface MediaItem {
  id: number;
  type: 'image' | 'document';
  name: string;
  url: string;
  size: string;
  date: string;
  thumbnail?: string;
}

export interface SiteSettings {
  phone: string;
  email: string;
  address: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

// Data structure
interface SiteData {
  projects: Project[];
  events: Event[];
  pages: Page[];
  media: MediaItem[];
  settings: SiteSettings;
}

// Context with actions
interface SiteContextType {
  data: SiteData;
  // Projects actions
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: number) => void;
  // Events actions
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (id: number) => void;
  // Pages actions
  updatePage: (page: Page) => void;
  addPage: (page: Omit<Page, 'id'>) => void;
  deletePage: (id: number) => void;
  // Media actions
  addMedia: (media: Omit<MediaItem, 'id'>) => void;
  deleteMedia: (id: number) => void;
  // Settings actions
  updateSettings: (settings: Partial<SiteSettings>) => void;
}

// Initial data
import { projectsData } from '@/data/projects';
import { eventsData } from '@/data/events';
import { pagesData } from '@/data/pages';
import { mediaData } from '@/data/media';

const initialSettings: SiteSettings = {
  phone: '+33 (0)1 23 45 67 89',
  email: 'contact@bazaart.org',
  address: '123 Avenue des Arts, 75001 Paris, France',
  socialLinks: {
    facebook: 'https://facebook.com/bazaart',
    instagram: 'https://instagram.com/bazaart',
    twitter: 'https://twitter.com/bazaart',
    linkedin: 'https://linkedin.com/company/bazaart',
  }
};

// Create context with default undefined
const SiteContext = createContext<SiteContextType | undefined>(undefined);

// Provider component
export const SiteProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<SiteData>({
    projects: projectsData,
    events: eventsData,
    pages: pagesData,
    media: mediaData,
    settings: initialSettings
  });

  // Projects CRUD
  const addProject = (project: Omit<Project, 'id'>) => {
    setData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        { ...project, id: Math.max(0, ...prev.projects.map(p => p.id)) + 1 }
      ]
    }));
  };

  const updateProject = (project: Project) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === project.id ? project : p)
    }));
  };

  const deleteProject = (id: number) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  // Events CRUD
  const addEvent = (event: Omit<Event, 'id'>) => {
    setData(prev => ({
      ...prev,
      events: [
        ...prev.events,
        { ...event, id: Math.max(0, ...prev.events.map(e => e.id)) + 1 }
      ]
    }));
  };

  const updateEvent = (event: Event) => {
    setData(prev => ({
      ...prev,
      events: prev.events.map(e => e.id === event.id ? event : e)
    }));
  };

  const deleteEvent = (id: number) => {
    setData(prev => ({
      ...prev,
      events: prev.events.filter(e => e.id !== id)
    }));
  };

  // Pages CRUD
  const addPage = (page: Omit<Page, 'id'>) => {
    setData(prev => ({
      ...prev,
      pages: [
        ...prev.pages,
        { ...page, id: Math.max(0, ...prev.pages.map(p => p.id)) + 1 }
      ]
    }));
  };

  const updatePage = (page: Page) => {
    setData(prev => ({
      ...prev,
      pages: prev.pages.map(p => p.id === page.id ? page : p)
    }));
  };

  const deletePage = (id: number) => {
    setData(prev => ({
      ...prev,
      pages: prev.pages.filter(p => p.id !== id)
    }));
  };

  // Media CRUD
  const addMedia = (media: Omit<MediaItem, 'id'>) => {
    setData(prev => ({
      ...prev,
      media: [
        ...prev.media,
        { ...media, id: Math.max(0, ...prev.media.map(m => m.id)) + 1 }
      ]
    }));
  };

  const deleteMedia = (id: number) => {
    setData(prev => ({
      ...prev,
      media: prev.media.filter(m => m.id !== id)
    }));
  };

  // Settings update
  const updateSettings = (settings: Partial<SiteSettings>) => {
    setData(prev => ({
      ...prev,
      settings: { ...prev.settings, ...settings }
    }));
  };

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('bazaart-site-data', JSON.stringify(data));
  }, [data]);

  // Load from localStorage on first render
  useEffect(() => {
    const savedData = localStorage.getItem('bazaart-site-data');
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error parsing saved data:', error);
      }
    }
  }, []);

  const contextValue: SiteContextType = {
    data,
    addProject,
    updateProject,
    deleteProject,
    addEvent,
    updateEvent,
    deleteEvent,
    updatePage,
    addPage,
    deletePage,
    addMedia,
    deleteMedia,
    updateSettings
  };

  return (
    <SiteContext.Provider value={contextValue}>
      {children}
    </SiteContext.Provider>
  );
};

// Hook to use the site context
export const useSite = () => {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
