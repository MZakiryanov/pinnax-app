import React, { useState } from 'react';
import { 
  MessageCircle, 
  ShoppingCart, 
  BarChart 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../utils/i18n';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface PriceCardProps {
  title: string;
  price: {
    monthly: string;
    annual: string;
  };
  features: string[];
  featured?: boolean;
  isAnnual: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-lg shadow-sm">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-[#A7ABAA]">{description}</p>
  </div>
);

const PriceCard: React.FC<PriceCardProps> = ({ 
  title, 
  price, 
  features, 
  featured = false, 
  isAnnual 
}) => {
  const { t } = useTranslation();
  
  const displayPrice = isAnnual ? price.annual : price.monthly;
  
  return (
    <div className={`p-6 rounded-lg ${featured ? 'bg-[#245D33] text-white ring-2 ring-[#245D33]' : 'bg-white'}`}>
      <h3 className="text-xl font-semibold mb-2 text-[#465357]">{title}</h3>
      <p className="text-3xl font-bold mb-2 text-[#465357]">{displayPrice}<span className="text-sm font-normal">/мес</span></p>
      {isAnnual && (
        <p className={`text-sm mb-6 ${featured ? 'text-[#EFF6EF]' : 'text-[#A7ABAA]'}`}>
          {t('pricing.annualPayment')}
        </p>
      )}
      <ul className="space-y-3">
        {features.map((feature: string, index: number) => (
          <li key={index} className="flex items-center text-[#465357]">
            <div className={`w-1.5 h-1.5 rounded-full mr-2 ${featured ? 'bg-white' : 'bg-[#245D33]'}`} />
            {feature}
          </li>
        ))}
      </ul>
      <button className={`mt-4 w-full p-3 rounded-lg ${
        featured 
          ? 'bg-white text-[#245D33] ring-2 ring-[#245D33]' 
          : 'bg-[#245D33] text-white'
      }`}>
        {t('pricing.selectPlan')}
      </button>
    </div>
  );
};

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingPlans = [
    {
      title: t('pricing.plans.basic.title'),
      price: {
        monthly: "15,000 ₸",
        annual: "12,000 ₸"
      },
      features: [
        t('pricing.plans.basic.features.1'),
        t('pricing.plans.basic.features.2'),
        t('pricing.plans.basic.features.3')
      ],
      featured: false
    },
    {
      title: t('pricing.plans.business.title'),
      price: {
        monthly: "35,000 ₸",
        annual: "28,000 ₸"
      },
      features: [
        t('pricing.plans.business.features.1'),
        t('pricing.plans.business.features.2'),
        t('pricing.plans.business.features.3')
      ],
      featured: true
    },
    {
      title: t('pricing.plans.premium.title'),
      price: {
        monthly: "75,000 ₸",
        annual: "60,000 ₸"
      },
      features: [
        t('pricing.plans.premium.features.1'),
        t('pricing.plans.premium.features.2'),
        t('pricing.plans.premium.features.3')
      ],
      featured: false
    }
  ];

  const PriceToggle = () => (
    <div className="flex justify-center items-center space-x-4 mb-8">
      <span className={`text-sm font-medium ${!isAnnual ? 'text-[#465357]' : 'text-[#A7ABAA]'}`}>
        {t('pricing.monthly')}
      </span>
      <button
        onClick={() => setIsAnnual(!isAnnual)}
        className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#245D33]"
      >
        <span className="sr-only">{t('pricing.togglePeriod')}</span>
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
            isAnnual ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <span className={`text-sm font-medium ${isAnnual ? 'text-[#465357]' : 'text-[#A7ABAA]'}`}>
        {t('pricing.annual')} <span className="text-[#245D33] font-medium">{t('pricing.discount')}</span>
      </span>
    </div>
  );

  return (
    <div>
      {/* Hero секция */}
      <div className="bg-gradient-to-b from-[#EFF6EF] to-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-[#465357] mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-lg text-[#A7ABAA] mb-8">
              {t('hero.description')}
            </p>
            <button className="bg-[#245D33] text-white px-8 py-3 rounded-lg hover:bg-[#1A442D]">
              {t('hero.cta')}
            </button>
          </div>
        </div>
      </div>

      {/* Преимущества */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MessageCircle className="w-8 h-8 text-[#245D33]" />}
              title={t('features.autoReply.title')}
              description={t('features.autoReply.description')}
            />
            <FeatureCard
              icon={<ShoppingCart className="w-8 h-8 text-[#245D33]" />}
              title={t('features.orderManagement.title')}
              description={t('features.orderManagement.description')}
            />
            <FeatureCard
              icon={<BarChart className="w-8 h-8 text-[#245D33]" />}
              title={t('features.analytics.title')}
              description={t('features.analytics.description')}
            />
          </div>
        </div>
      </div>

      {/* Тарифы */}
      <div className="bg-[#EFF6EF] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-4 text-[#465357]">
            {t('pricing.title')}
          </h2>
          <p className="text-center text-[#A7ABAA] mb-8">
            {t('pricing.subtitle')}
          </p>
          
          <PriceToggle />

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
    </div>
  );
};

export default HomePage;