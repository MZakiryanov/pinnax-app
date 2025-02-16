// src/components/layout/Layout.tsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from '../../Styles/layout/Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.container}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;