// src/components/layout/Navbar.tsx
import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useTranslation } from 'react-i18next';
import Logo from '../common/Logo';
import LanguageSelector from '../ui/LanguageSelector';

const Navbar: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { t } = useTranslation();
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Logo className="h-8" />
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <button 
              onClick={() => navigateTo('personal')}
              className="text-[#465357] hover:text-[#245D33] px-4 py-2 rounded-lg hover:bg-[#EFF6EF]"
            >
              {t('navbar.login')}
            </button>
            <button 
              onClick={() => navigateTo('personal')}
              className="bg-[#245D33] text-white px-4 py-2 rounded-lg hover:bg-[#1A442D]"
            >
              {t('navbar.register')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;