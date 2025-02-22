// src/components/personal/Layout/PersonalLayout.tsx
import React from 'react';
import { useNavigation } from '@/context/NavigationContext';
import Logo from '@/components/common/Logo';
import { COLORS } from '@/theme/colors';
import { TEXT_STYLES } from '@/theme/typography';
import { 
  LayoutDashboard, 
  ShoppingCart,
  Users, 
  BarChart2,
  Send,
  Settings,
  LogOut 
} from 'lucide-react';

type Section = 
  | 'dashboard' 
  | 'whatsapp'
  | 'messenger'
  | 'telegram'
  | 'instagram'
  | 'orders' 
  | 'clients' 
  | 'analytics' 
  | 'broadcasts' 
  | 'settings';

interface MenuGroup {
  title: string;
  items: {
    id: Section;
    label: string;
    icon: React.FC<{ className?: string }>;
  }[];
}

// SVG иконки для мессенджеров
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.072.043.419-.101.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 7.082c1.602 0 1.792.006 2.425.035 1.627.074 2.385.845 2.46 2.459.028.633.034.822.034 2.424s-.006 1.792-.034 2.424c-.075 1.613-.832 2.386-2.46 2.46-.633.028-.822.035-2.425.035-1.602 0-1.792-.006-2.424-.035-1.63-.075-2.385-.849-2.46-2.46-.028-.632-.035-.822-.035-2.424s.007-1.792.035-2.424c.074-1.615.832-2.386 2.46-2.46.632-.029.822-.034 2.424-.034z"/>
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const MessengerIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.14.26.39.24.63l-.1 1.85c-.04.71.73 1.2 1.35.85l2.06-1.17c.18-.1.39-.14.59-.09.93.27 1.91.41 2.92.41 5.64 0 10-4.13 10-9.7C22 6.13 17.64 2 12 2z"/>
  </svg>
);

const PersonalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentSection, setCurrentSection, navigateTo } = useNavigation();

  const menuGroups: MenuGroup[] = [
    {
      title: "Чаты",
      items: [
        { id: 'whatsapp', label: 'WhatsApp', icon: WhatsAppIcon },
        { id: 'instagram', label: 'Instagram', icon: InstagramIcon },
        { id: 'telegram', label: 'Telegram', icon: TelegramIcon },
        { id: 'messenger', label: 'Messenger', icon: MessengerIcon },
      ]
    },
    {
      title: "Управление",
      items: [
        { id: 'dashboard', label: 'Дашборд', icon: LayoutDashboard },
        { id: 'orders', label: 'Заказы', icon: ShoppingCart },
        { id: 'clients', label: 'Клиенты', icon: Users },
        { id: 'broadcasts', label: 'Рассылки', icon: Send },
      ]
    },
    {
      title: "Дополнительно",
      items: [
        { id: 'analytics', label: 'Аналитика', icon: BarChart2 },
      ]
    },
    {
      title: "Система",
      items: [
        { id: 'settings', label: 'Настройки', icon: Settings },
      ]
    }
  ];

  const handleLogout = () => {
    navigateTo('home');
  };

  return (
    <div className={`min-h-screen bg-[${COLORS.background}]`}>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Logo className="h-8" />
            <button 
              onClick={handleLogout}
              className={`flex items-center text-[${COLORS.text}] hover:text-[${COLORS.primary}]`}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Выйти
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 shrink-0">
            <nav className="space-y-8">
              {menuGroups.map((group, index) => (
                <div key={index} className="space-y-2">
                  <h3 className={`px-4 ${TEXT_STYLES.tiny} uppercase tracking-wider text-[${COLORS.secondary}]`}>
                    {group.title}
                  </h3>
                  <div className="space-y-1">
                    {group.items.map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => setCurrentSection(id)}
                        className={`w-full flex items-center px-4 py-2 ${TEXT_STYLES.body} rounded-lg ${
                          currentSection === id
                            ? `bg-[${COLORS.primary}]/10 text-[${COLORS.primary}]`
                            : `text-[${COLORS.text}] hover:bg-[${COLORS.background}]`
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalLayout;