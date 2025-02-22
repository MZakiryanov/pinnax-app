// src/components/layout/Footer.tsx
import React, { useState } from 'react';
import { THEME, COMPONENT_STYLES } from '@/theme';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

const Footer: React.FC = () => {
  const { i18n } = useTranslation();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const languages = [
    { code: 'ru', name: 'Русский' },
    { code: 'en', name: 'English' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsLanguageOpen(false);
  };

  return (
    <footer 
      className="bg-footer text-white"
      style={{ 
        backgroundColor: THEME.colors.footer, 
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="opacity-80">
            © 2025 PinnaX. Все права защищены.
          </div>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <div className="relative">
              <button 
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center opacity-80 hover:opacity-100"
              >
                {currentLanguage.name}
                <ChevronDown className="ml-2 w-4 h-4" />
              </button>
              {isLanguageOpen && (
                <div className={`
                  ${COMPONENT_STYLES.languageSelector.dropdown.base}
                  text-[#212122]
                `}>
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`
                        ${COMPONENT_STYLES.languageSelector.dropdown.item}
                        ${COMPONENT_STYLES.languageSelector.dropdown.hover}
                        ${currentLanguage.code === lang.code 
                          ? COMPONENT_STYLES.languageSelector.dropdown.active 
                          : ''}
                      `}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <a href="mailto:info@pinnax.kz" className="opacity-80 hover:opacity-100">
              info@pinnax.kz
            </a>
            <a href="tel:+77777777777" className="opacity-80 hover:opacity-100">
              +7 777 777 77 77
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;