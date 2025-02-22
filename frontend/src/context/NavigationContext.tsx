// src/context/NavigationContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { COLORS, TEXT_STYLES } from '@/theme';

// Declare global window type
declare global {
  interface Window {
    fs: {
      readFile: (filepath: string, options?: { encoding?: string }) => Promise<Uint8Array | string>;
    };
  }
}

// App sections
export type Section = 
  | 'dashboard' 
  | 'whatsapp'
  | 'messenger'
  | 'telegram'
  | 'instagram'
  | 'orders' 
  | 'clients' 
  | 'analytics' 
  | 'broadcasts' 
  | 'settings';

// App pages
export type Page = 'home' | 'personal';

// Section groups
export type SectionGroup = 'chats' | 'management' | 'additional' | 'system';

// Section metadata
export interface SectionInfo {
  id: Section;
  title: string;
  icon: string;
  group: SectionGroup;
  description?: string;
}

// Group metadata
export interface GroupInfo {
  id: SectionGroup;
  title: string;
  order: number;
  description?: string;
}

// Navigation context type
interface NavigationContextType {
  currentPage: Page;
  currentSection: Section;
  navigateTo: (page: Page) => void;
  setCurrentSection: (section: Section) => void;
  getSectionStyle: (sectionId: Section) => string;
  getGroupSections: (groupId: SectionGroup) => SectionInfo[];
  isGroupActive: (groupId: SectionGroup) => boolean;
  getGroupStyle: (groupId: SectionGroup) => string;
}

// Theme-aware section styles
export const sectionStyles = {
  active: `bg-${COLORS.primary}/10 text-${COLORS.primary}`,
  inactive: `text-${COLORS.text} hover:bg-${COLORS.background}`,
  icon: `w-5 h-5 mr-3`,
  text: TEXT_STYLES.body,
  wrapper: `w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200`,
  group: {
    title: `px-4 text-sm font-semibold text-${COLORS.secondary} uppercase tracking-wider`,
    wrapper: 'space-y-1',
    active: `border-l-2 border-${COLORS.primary}`,
    inactive: 'border-l-2 border-transparent'
  }
};

// Groups configuration
export const groups: Record<SectionGroup, GroupInfo> = {
  chats: {
    id: 'chats',
    title: 'Чаты',
    order: 1,
    description: 'Управление чатами в различных мессенджерах'
  },
  management: {
    id: 'management',
    title: 'Управление',
    order: 2,
    description: 'Основные инструменты управления'
  },
  additional: {
    id: 'additional',
    title: 'Дополнительно',
    order: 3,
    description: 'Дополнительные функции и аналитика'
  },
  system: {
    id: 'system',
    title: 'Система',
    order: 4,
    description: 'Системные настройки и конфигурация'
  }
};

// Section configuration with theme integration
export const sections: Record<Section, SectionInfo> = {
  dashboard: {
    id: 'dashboard',
    title: 'Дашборд',
    icon: 'LayoutDashboard',
    group: 'management',
    description: 'Обзор основных показателей'
  },
  whatsapp: {
    id: 'whatsapp',
    title: 'WhatsApp',
    icon: 'WhatsApp',
    group: 'chats',
    description: 'Управление WhatsApp сообщениями'
  },
  messenger: {
    id: 'messenger',
    title: 'Messenger',
    icon: 'Messenger',
    group: 'chats',
    description: 'Управление Facebook Messenger'
  },
  telegram: {
    id: 'telegram',
    title: 'Telegram',
    icon: 'Telegram',
    group: 'chats',
    description: 'Управление Telegram сообщениями'
  },
  instagram: {
    id: 'instagram',
    title: 'Instagram',
    icon: 'Instagram',
    group: 'chats',
    description: 'Управление Instagram Direct'
  },
  orders: {
    id: 'orders',
    title: 'Заказы',
    icon: 'ShoppingCart',
    group: 'management',
    description: 'Управление заказами'
  },
  clients: {
    id: 'clients',
    title: 'Клиенты',
    icon: 'Users',
    group: 'management',
    description: 'База клиентов и история'
  },
  analytics: {
    id: 'analytics',
    title: 'Аналитика',
    icon: 'BarChart2',
    group: 'additional',
    description: 'Статистика и отчеты'
  },
  broadcasts: {
    id: 'broadcasts',
    title: 'Рассылки',
    icon: 'Send',
    group: 'management',
    description: 'Управление рассылками'
  },
  settings: {
    id: 'settings',
    title: 'Настройки',
    icon: 'Settings',
    group: 'system',
    description: 'Системные настройки'
  }
};

// Create context with theme-aware default values
const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentSection, setCurrentSection] = useState<Section>('dashboard');

  const basename = '/pinnax-app';

  // Handle initial page state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace(basename, '');
      if (path.includes('personal')) {
        setCurrentPage('personal');
      }
    }
  }, []);

  // Navigation handler
  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      if (page === 'home') {
        window.history.pushState({}, '', `${basename}/`);
      } else {
        window.history.pushState({}, '', `${basename}/personal`);
      }
    }
  };

  // Get section-specific styles
  const getSectionStyle = (sectionId: Section): string => {
    return currentSection === sectionId
      ? sectionStyles.active
      : sectionStyles.inactive;
  };

  // Get sections for a specific group
  const getGroupSections = (groupId: SectionGroup): SectionInfo[] => {
    return Object.values(sections)
      .filter(section => section.group === groupId)
      .sort((a, b) => a.title.localeCompare(b.title));
  };

  // Check if group has active section
  const isGroupActive = (groupId: SectionGroup): boolean => {
    return sections[currentSection].group === groupId;
  };

  // Get group-specific styles
  const getGroupStyle = (groupId: SectionGroup): string => {
    return isGroupActive(groupId)
      ? sectionStyles.group.active
      : sectionStyles.group.inactive;
  };

  // Handle browser navigation
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = () => {
      const path = window.location.pathname.replace(basename, '');
      if (path.includes('personal')) {
        setCurrentPage('personal');
      } else {
        setCurrentPage('home');
        setCurrentSection('dashboard');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Context value with theme-aware styles
  const contextValue: NavigationContextType = {
    currentPage,
    currentSection,
    navigateTo,
    setCurrentSection,
    getSectionStyle,
    getGroupSections,
    isGroupActive,
    getGroupStyle
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
};

// Custom hook with theme integration
export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};