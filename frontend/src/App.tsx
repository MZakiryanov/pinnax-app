import React from 'react';
import { NavigationProvider, useNavigation } from '@/context/NavigationContext';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/layout/Layout'; // Импортируем Layout

// Динамический импорт страниц
const HomePage = React.lazy(() => import('@/pages/HomePage'));
const PersonalPage = React.lazy(() => import('@/components/personal/PersonalPage'));

// Определение поддерживаемых языков
const SUPPORTED_LANGUAGES = ['en', 'ru'] as const;
type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

// Функция определения языка браузера
const getBrowserLanguage = (): SupportedLanguage => {
  const defaultLang = 'en' as SupportedLanguage;
  
  try {
    if (typeof localStorage !== 'undefined') {
      const browserLang = localStorage.getItem('i18nextLng') || defaultLang;
      return SUPPORTED_LANGUAGES.includes(browserLang as SupportedLanguage)
        ? (browserLang as SupportedLanguage)
        : defaultLang;
    }
  } catch {
    return defaultLang;
  }
  
  return defaultLang;
};

// Основной компонент содержимого приложения
const AppContent: React.FC = () => {
  const { currentPage } = useNavigation();
  
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {currentPage === 'personal' ? <PersonalPage /> : <HomePage />}
    </React.Suspense>
  );
};

// Корневой компонент приложения
const App: React.FC = () => {
  const { i18n } = useTranslation();

  // Определяем начальный язык при загрузке приложения
  React.useEffect(() => {
    const detectedLang = getBrowserLanguage();
    i18n.changeLanguage(detectedLang);
  }, [i18n]);

  return (
    <React.StrictMode>
      <NavigationProvider>
        <Layout>
          <AppContent />
        </Layout>
      </NavigationProvider>
    </React.StrictMode>
  );
};

export default App;