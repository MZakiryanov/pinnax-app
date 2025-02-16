// src/components/layout/Footer.tsx
import React from 'react';
import styles from '../../Styles/layout/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <div className={styles.footerCopyright}>
            © 2025 PinnaX. Все права защищены.
          </div>
          <div className={styles.footerContacts}>
            <a href="mailto:info@pinnax.kz" className={styles.footerLink}>
              info@pinnax.kz
            </a>
            <a href="tel:+77777777777" className={styles.footerLink}>
              +7 777 777 77 77
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;