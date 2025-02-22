// src/theme/ThemeProvider.tsx
import React from 'react';
import { COLORS } from './colors';
import { TEXT_STYLES } from './typography';
import { COMPONENT_STYLES } from './components';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#EFF6EF] text-[#465357]">
      {children}
    </div>
  );
};

export { COLORS, TEXT_STYLES, COMPONENT_STYLES };