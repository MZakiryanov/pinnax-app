// src/components/personal/PersonalPage.tsx
import React from 'react';
import { COLORS, TEXT_STYLES, COMPONENT_STYLES } from '@/theme';
import PersonalLayout from './Layout/PersonalLayout';
import { useNavigation } from '@/context/NavigationContext';

// Импорт компонентов секций
import DashboardSection from './sections/DashboardSection';
import WhatsAppSection from './sections/WhatsAppSection';
import FacebookSection from './sections/FacebookSection';
import TelegramSection from './sections/TelegramSection';
import InstagramSection from './sections/InstagramSection';
import OrdersSection from './sections/OrdersSection';
import ClientsSection from './sections/ClientsSection/ClientsSection';
import AnalyticsSection from './sections/AnalyticsSection';
import BroadcastsSection from './sections/BroadcastsSection';
import SettingsSection from './sections/SettingsSection';

// Типы для вкладок
export interface TabProps {
  id: string;
  label: string;
  component: React.ComponentType;
}

const PersonalPage: React.FC = () => {
  const { currentSection } = useNavigation();

  // Определение всех секций и их компонентов
  const sections: Record<string, React.ComponentType> = {
    dashboard: DashboardSection,
    whatsapp: WhatsAppSection,
    messenger: FacebookSection,
    telegram: TelegramSection,
    instagram: InstagramSection,
    orders: OrdersSection,
    clients: ClientsSection,
    analytics: AnalyticsSection,
    broadcasts: BroadcastsSection,
    settings: SettingsSection
  };

  // Рендер текущей секции
  const renderSection = () => {
    const SectionComponent = sections[currentSection] || DashboardSection;
    return (
      <div className={COMPONENT_STYLES.card.base}>
        <SectionComponent />
      </div>
    );
  };

  return (
    <PersonalLayout>
      <div className={`min-h-screen bg-${COLORS.background}`}>
        <main className={TEXT_STYLES.body}>
          {renderSection()}
        </main>
      </div>
    </PersonalLayout>
  );
};

export default PersonalPage;