// src/components/personal/sections/ClientsSection/components/ClientCard/ClientInfo.tsx
import React from 'react';
import { Client } from '../../types';
import { COLORS } from '@/theme/colors';
import { TEXT_STYLES } from '@/theme/typography';

export interface ClientInfoProps {
  client: Client;
  onDiscountChange: (value: number) => void;
  discount: number;
}

const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <label className={`block ${TEXT_STYLES.small} text-[${COLORS.text}]`}>{label}</label>
    <div className={`mt-1 ${TEXT_STYLES.body}`}>{value}</div>
  </div>
);

export const ClientInfo: React.FC<ClientInfoProps> = ({
  client,
  onDiscountChange,
  discount
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Левая колонка */}
        <div className="space-y-4">
          <InfoItem label="Клиент" value={client.name} />
          <InfoItem label="Телефон" value={client.phone} />
          <InfoItem label="Email" value={client.email || '—'} />
          <InfoItem label="Канал" value={client.channel} />
          <div>
            <label className={`block ${TEXT_STYLES.small} text-[${COLORS.text}]`}>
              Скидка (%)
            </label>
            <input
              type="number"
              min="0"
              max="99"
              value={discount}
              onChange={(e) => onDiscountChange(parseInt(e.target.value) || 0)}
              className={`mt-1 block w-20 rounded-md border border-[${COLORS.secondary}] p-2 focus:ring-2 focus:ring-[${COLORS.primary}] focus:border-transparent transition duration-200`}
            />
          </div>
        </div>

        {/* Правая колонка */}
        <div className="space-y-4">
          <InfoItem label="Заказов" value={client.ordersCount.toString()} />
          <InfoItem label="Средний чек" value={client.averageCheck} />
          <InfoItem label="Сумма" value={client.totalAmount} />
          <InfoItem label="Периодичность" value={`${client.orderFrequency} дней`} />
          <InfoItem 
            label="Последний заказ" 
            value={client.lastOrder ? new Date(client.lastOrder).toLocaleDateString('ru-RU') : '—'} 
          />
        </div>
      </div>

      <AddressInfo client={client} />
      {client.comment && <CommentInfo comment={client.comment} />}
      <SettingsInfo client={client} />
    </div>
  );
};

const AddressInfo: React.FC<{ client: Client }> = ({ client }) => (
  <div className="pt-4 border-t border-[#A7ABAA]/20">
    <h4 className={`${TEXT_STYLES.small} text-[${COLORS.text}] mb-2`}>
      Адрес доставки
    </h4>
    <div className={TEXT_STYLES.body}>
      {`${client.street}, д. ${client.house}${client.entrance ? `, подъезд ${client.entrance}` : ''}${
        client.floor ? `, этаж ${client.floor}` : ''
      }${client.apartment ? `, кв. ${client.apartment}` : ''}`}
    </div>
  </div>
);

const CommentInfo: React.FC<{ comment: string }> = ({ comment }) => (
  <div className="pt-4 border-t border-[#A7ABAA]/20">
    <h4 className={`${TEXT_STYLES.small} text-[${COLORS.text}] mb-2`}>
      Комментарий
    </h4>
    <div className={TEXT_STYLES.body}>{comment}</div>
  </div>
);

const SettingsInfo: React.FC<{ client: Client }> = ({ client }) => (
  <div className="pt-4 border-t border-[#A7ABAA]/20">
    <h4 className={`${TEXT_STYLES.small} text-[${COLORS.text}] mb-2`}>
      Настройки
    </h4>
    <div className="space-y-2">
      <div className="flex items-center">
        <span className={TEXT_STYLES.body}>Рассылки:</span>
        <span className={`ml-2 ${TEXT_STYLES.small} text-[${COLORS.secondary}]`}>
          {client.noMailings ? 'Отключены' : 'Включены'}
        </span>
      </div>
      <div className="flex items-center">
        <span className={TEXT_STYLES.body}>Брошенные корзины:</span>
        <span className={`ml-2 ${TEXT_STYLES.small} text-[${COLORS.secondary}]`}>
          {client.abandonedCarts ? 'Есть' : 'Нет'}
        </span>
      </div>
    </div>
  </div>
);

export default ClientInfo;