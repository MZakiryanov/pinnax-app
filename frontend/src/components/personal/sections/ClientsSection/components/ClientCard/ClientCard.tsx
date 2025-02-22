// src/components/personal/sections/ClientsSection/components/ClientCard/ClientCard.tsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Client } from '../../types';
import { COLORS } from '@/theme/colors';
import { TEXT_STYLES } from '@/theme/typography';
import ClientInfo from './ClientInfo';
import ClientChart from './ClientChart';
import ClientProducts from './ClientProducts';
import ClientOrders from './ClientOrders';

interface ClientCardProps {
  client: Client;
  onClose: () => void;
  onSave: (clientId: string, discount: number) => void;
}

type TabType = 'general' | 'products' | 'orders';

const ClientCard: React.FC<ClientCardProps> = ({ client, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [discount, setDiscount] = useState(client.discount);
  const [isDiscountChanged, setIsDiscountChanged] = useState(false);

  const handleDiscountChange = (value: number) => {
    setDiscount(value);
    setIsDiscountChanged(true);
  };

  const handleSave = () => {
    onSave(client.id, discount);
    setIsDiscountChanged(false);
  };

  const tabs: { id: TabType; label: string }[] = [
    { id: 'general', label: 'Общая' },
    { id: 'products', label: 'Товары' },
    { id: 'orders', label: 'Заказы' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[70vh] flex flex-col">
        {/* Заголовок */}
        <div className="px-6 py-4 border-b border-[#A7ABAA]/20 flex justify-between items-center">
          <h2 className={`${TEXT_STYLES.h2} text-center w-full`}>
            Карточка клиента #{client.id}
          </h2>
          <button
            onClick={onClose}
            className={`text-[${COLORS.secondary}] hover:text-[${COLORS.text}] transition-colors duration-200`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Вкладки */}
        <div className="px-6 py-2 border-b border-[#A7ABAA]/20">
          <div className="flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 ${TEXT_STYLES.small} rounded-lg transition-colors duration-200 ${
                  activeTab === tab.id
                    ? `bg-[${COLORS.primary}]/10 text-[${COLORS.primary}]`
                    : `text-[${COLORS.text}] hover:bg-[${COLORS.background}]`
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Контент */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <ClientInfo
                client={client}
                onDiscountChange={handleDiscountChange}
                discount={discount}
              />
              <ClientChart ordersByMonth={client.ordersByMonth} />
            </div>
          )}

          {activeTab === 'products' && (
            <ClientProducts products={client.products} />
          )}

          {activeTab === 'orders' && (
            <ClientOrders orders={client.orders} />
          )}
        </div>

        {/* Кнопки действий */}
        <div className="px-6 py-4 border-t border-[#A7ABAA]/20 flex justify-end space-x-4">
          {isDiscountChanged && (
            <button
              onClick={handleSave}
              className={`px-4 py-2 bg-[${COLORS.primary}] text-white rounded-lg hover:opacity-90 transition-opacity duration-200`}
            >
              Сохранить
            </button>
          )}
          <button
            onClick={onClose}
            className={`px-4 py-2 border border-[${COLORS.secondary}] rounded-lg hover:bg-[${COLORS.background}] transition-colors duration-200`}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;