// src/context/NavigationContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

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

interface NavigationContextType {
  currentPage: 'home' | 'personal';
  currentSection: Section;
  navigateTo: (page: 'home' | 'personal') => void;
  setCurrentSection: (section: Section) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<'home' | 'personal'>('home');
  const [currentSection, setCurrentSection] = useState<Section>('dashboard');

  // Определяем базовый путь для GitHub Pages
  const basename = '/pinnax-app';

  // При инициализации проверяем URL
  useEffect(() => {
    const path = window.location.pathname.replace(basename, '');
    if (path.includes('personal')) {
      setCurrentPage('personal');
    }
  }, []);

  const navigateTo = (page: 'home' | 'personal') => {
    setCurrentPage(page);
    if (page === 'home') {
      window.history.pushState({}, '', `${basename}/`);
    } else {
      window.history.pushState({}, '', `${basename}/personal`);
    }
  };

  // Обрабатываем навигацию браузера (кнопки вперед/назад)
  useEffect(() => {
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

  return (
    <NavigationContext.Provider value={{ 
      currentPage, 
      currentSection, 
      navigateTo, 
      setCurrentSection 
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};