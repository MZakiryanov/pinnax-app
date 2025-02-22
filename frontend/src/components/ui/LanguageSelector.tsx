// src/components/ui/LanguageSelector.tsx
import React, { useState, useCallback } from 'react';
import { Languages } from 'lucide-react';

const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: 'ENG' },
  { code: 'ru', name: 'Русский', flag: 'RU' }
] as const;

type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]['code'];

const getCurrentLanguage = (): SupportedLanguage => {
  try {
    const saved = localStorage.getItem('i18nextLng');
    return (saved && SUPPORTED_LANGUAGES.some(lang => lang.code === saved))
      ? saved as SupportedLanguage
      : 'en';
  } catch {
    return 'en';
  }
};

const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(getCurrentLanguage);

  const handleLanguageChange = useCallback((langCode: SupportedLanguage) => {
    try {
      setCurrentLang(langCode);
      localStorage.setItem('i18nextLng', langCode);
      // Безопасно перезагружаем страницу
      if (typeof location !== 'undefined') {
        location.reload();
      }
    } catch (error) {
      console.error('Failed to change language:', error);
    }
    setIsOpen(false);
  }, []);

  const currentLanguage = SUPPORTED_LANGUAGES.find(lang => lang.code === currentLang);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded hover:bg-gray-100 flex items-center gap-2"
        aria-label="Change language"
      >
        <Languages className="w-5 h-5" />
        <span>{currentLanguage?.flag}</span>
      </button>
      
      {isOpen && (
        <>
          <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
            {SUPPORTED_LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left px-4 py-2 hover:bg-[#EFF6EF] flex items-center gap-2 ${
                  lang.code === currentLang ? 'bg-[#EFF6EF]' : ''
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
          
          <div 
            className="fixed inset-0 z-0" 
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </div>
  );
};

export default LanguageSelector;