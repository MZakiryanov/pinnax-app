// src/components/layout/Layout.tsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { COLORS } from '@/theme/colors';
import { useNavigation } from '@/context/NavigationContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentPage } = useNavigation();

  return (
    <div className={`min-h-screen bg-[${COLORS.background}] flex flex-col`}>
      {currentPage === 'home' && <Header />}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;