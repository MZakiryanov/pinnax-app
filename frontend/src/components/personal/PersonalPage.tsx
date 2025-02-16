// src/components/personal/PersonalPage.tsx
import React from 'react';
import PersonalLayout from './Layout/PersonalLayout';
import { useNavigation } from '@/context/NavigationContext';
import DashboardSection from './sections/DashboardSection';
import WhatsAppSection from './sections/WhatsAppSection';
import FacebookSection from './sections/FacebookSection';
import TelegramSection from './sections/TelegramSection';
import InstagramSection from './sections/InstagramSection';
import OrdersSection from './sections/OrdersSection';
import ClientsSection from './sections/ClientsSection';
import AnalyticsSection from './sections/AnalyticsSection';
import BroadcastsSection from './sections/BroadcastsSection';
import SettingsSection from './sections/SettingsSection';

const PersonalPage: React.FC = () => {
  const { currentSection } = useNavigation();

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <DashboardSection />;
      case 'whatsapp':
        return <WhatsAppSection />;
      case 'messenger':
        return <FacebookSection />;
      case 'telegram':
        return <TelegramSection />;
      case 'instagram':
        return <InstagramSection />;
      case 'orders':
        return <OrdersSection />;
      case 'clients':
        return <ClientsSection />;
      case 'analytics':
        return <AnalyticsSection />;
      case 'broadcasts':
        return <BroadcastsSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <DashboardSection />;
    }
  };

  return (
    <PersonalLayout>
      {renderSection()}
    </PersonalLayout>
  );
};

export default PersonalPage;