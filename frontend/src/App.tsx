// src/App.tsx
import React, { useState } from 'react';
import { 
  MessageCircle, 
  ShoppingCart, 
  BarChart 
} from 'lucide-react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import PersonalPage from './components/personal/PersonalPage';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface PriceOption {
  monthly: string;
  annual: string;
}

interface PriceCardProps {
  title: string;
  price: PriceOption;
  features: string[];
  featured?: boolean;
  isAnnual: boolean;
}

interface PriceToggleProps {
  isAnnual: boolean;
  onToggle: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-lg shadow-sm">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const PriceToggle: React.FC<PriceToggleProps> = ({ isAnnual, onToggle }) => (
  <div className="flex justify-center items-center space-x-4 mb-8">
    <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
      Месяц
    </span>
    <button
      onClick={onToggle}
      className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600"
    >
      <span className="sr-only">Toggle pricing period</span>
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
          isAnnual ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
    <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
      Год <span className="text-green-500 font-medium">(−20%)</span>
    </span>
  </div>
);

const PriceCard: React.FC<PriceCardProps> = ({ title, price, features, featured = false, isAnnual }) => {
  const displayPrice = isAnnual ? price.annual : price.monthly;
  
  return (
    <div className={`p-6 rounded-lg ${featured ? 'bg-blue-600 text-white ring-2 ring-blue-600' : 'bg-white'}`}>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold mb-2">{displayPrice}<span className="text-sm font-normal">/мес</span></p>
      {isAnnual && (
        <p className={`text-sm mb-6 ${featured ? 'text-blue-100' : 'text-gray-500'}`}>
          при оплате за год
        </p>
      )}
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <div className={`w-1.5 h-1.5 rounded-full mr-2 ${featured ? 'bg-white' : 'bg-blue-600'}`} />
            {feature}
          </li>
        ))}
      </ul>
      <button className={`w-full mt-6 px-4 py-2 rounded-lg ${
        featured 
          ? 'bg-white text-blue-600 hover:bg-gray-100' 
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}>
        Выбрать план
      </button>
    </div>
  );
};

const Header: React.FC = () => {
  const { navigateTo } = useNavigation();
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="text-xl font-bold text-blue-600">PinnaX</div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigateTo('personal')}
              className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              Войти
            </button>
            <button 
              onClick={() => navigateTo('personal')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const HomePage: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingPlans = [
    {
      title: "Базовый",
      price: {
        monthly: "15,000 ₸",
        annual: "12,000 ₸"
      },
      features: [
        "До 500 клиентов",
        "Автоответы",
        "Базовая аналитика"
      ]
    },
    {
      title: "Бизнес",
      price: {
        monthly: "35,000 ₸",
        annual: "28,000 ₸"
      },
      features: [
        "До 2000 клиентов",
        "Расширенная аналитика",
        "Программа лояльности"
      ],
      featured: true
    },
    {
      title: "Премиум",
      price: {
        monthly: "75,000 ₸",
        annual: "60,000 ₸"
      },
      features: [
        "Неограниченно клиентов",
        "Полная аналитика",
        "API интеграция"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      {/* Hero секция */}
      <div className="bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Автоматизируйте общение с клиентами в WhatsApp
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Принимайте заказы, отправляйте уведомления и управляйте всеми чатами в одном месте
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
              Попробовать бесплатно
            </button>
          </div>
        </div>
      </div>

      {/* Преимущества */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MessageCircle className="w-8 h-8 text-blue-600" />}
              title="Автоматические ответы"
              description="Мгновенные ответы на типовые вопросы клиентов"
            />
            <FeatureCard
              icon={<ShoppingCart className="w-8 h-8 text-blue-600" />}
              title="Управление заказами"
              description="Все заказы в одном интерфейсе с историей общения"
            />
            <FeatureCard
              icon={<BarChart className="w-8 h-8 text-blue-600" />}
              title="Аналитика"
              description="Отчеты по продажам и эффективности общения"
            />
          </div>
        </div>
      </div>

      {/* Тарифы */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-4">Тарифные планы</h2>
          <p className="text-center text-gray-600 mb-8">
            Выберите подходящий план для вашего бизнеса
          </p>
          
          <PriceToggle 
            isAnnual={isAnnual} 
            onToggle={() => setIsAnnual(!isAnnual)} 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <PriceCard
                key={index}
                title={plan.title}
                price={plan.price}
                features={plan.features}
                featured={plan.featured}
                isAnnual={isAnnual}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600">
              © 2025 PinnaX. Все права защищены.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="mailto:info@pinnax.kz" className="text-gray-600 hover:text-gray-900">
                info@pinnax.kz
              </a>
              <a href="tel:+77777777777" className="text-gray-600 hover:text-gray-900">
                +7 777 777 77 77
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { currentPage } = useNavigation();
  
  switch (currentPage) {
    case 'personal':
      return <PersonalPage />;
    default:
      return <HomePage />;
  }
};

const App: React.FC = () => {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
};

export default App;