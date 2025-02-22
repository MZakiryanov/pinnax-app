// src/components/layout/Header.tsx
import React from 'react';
import { COLORS } from '@/theme/colors';
import { TEXT_STYLES } from '@/theme/typography';
import { COMPONENT_STYLES } from '@/theme/components';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@/context/NavigationContext';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { navigateTo } = useNavigation();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className={`${TEXT_STYLES.h2} text-[${COLORS.primary}]`}>
              PinnaX
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigateTo('personal')}
              className={`${COMPONENT_STYLES.button.base} text-[${COLORS.text}] hover:text-[${COLORS.primary}] hover:bg-[${COLORS.background}]`}
            >
              {t('navbar.login')}
            </button>
            <button 
              onClick={() => navigateTo('personal')}
              className={`${COMPONENT_STYLES.button.primary}`}
            >
              {t('navbar.register')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;