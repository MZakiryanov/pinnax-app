// src/components/personal/sections/ClientsSection/components/ClientCard/ClientOrders.tsx
import React from 'react';
import { Order } from '../../types';
import { COLORS } from '@/theme/colors';
import { TEXT_STYLES } from '@/theme/typography';

interface ClientOrdersProps {
  orders: Order[];
}

const ClientOrders: React.FC<ClientOrdersProps> = ({ orders }) => {
  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order.id} className="bg-white border rounded-lg overflow-hidden">
          {/* Заголовок заказа */}
          <div className={`px-6 py-4 border-b border-[#A7ABAA]/20 bg-[${COLORS.background}]`}>
            <div className="flex justify-between items-center">
              <div className={TEXT_STYLES.small}>
                Заказ #{order.id}
              </div>
              <div className={`${TEXT_STYLES.small} text-[${COLORS.secondary}]`}>
                {new Date(order.date).toLocaleString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>

          {/* Содержимое заказа */}
          <div className="p-6">
            <table className="min-w-full divide-y divide-[#A7ABAA]/20">
              <thead>
                <tr>
                  <th className={`px-6 py-3 text-left ${TEXT_STYLES.tiny} text-[${COLORS.secondary}] uppercase tracking-wider`}>
                    ID
                  </th>
                  <th className={`px-6 py-3 text-left ${TEXT_STYLES.tiny} text-[${COLORS.secondary}] uppercase tracking-wider`}>
                    Наименование
                  </th>
                  <th className={`px-6 py-3 text-left ${TEXT_STYLES.tiny} text-[${COLORS.secondary}] uppercase tracking-wider`}>
                    Количество
                  </th>
                  <th className={`px-6 py-3 text-left ${TEXT_STYLES.tiny} text-[${COLORS.secondary}] uppercase tracking-wider`}>
                    Цена
                  </th>
                  <th className={`px-6 py-3 text-left ${TEXT_STYLES.tiny} text-[${COLORS.secondary}] uppercase tracking-wider`}>
                    Сумма
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#A7ABAA]/20">
                {order.items.map((item) => (
                  <tr key={item.id} className={`hover:bg-[${COLORS.background}]`}>
                    <td className={`px-6 py-4 ${TEXT_STYLES.small} text-[${COLORS.text}]`}>
                      {item.id}
                    </td>
                    <td className={`px-6 py-4 ${TEXT_STYLES.small} text-[${COLORS.text}]`}>
                      {item.name}
                    </td>
                    <td className={`px-6 py-4 ${TEXT_STYLES.small} text-[${COLORS.text}]`}>
                      {item.quantity}
                    </td>
                    <td className={`px-6 py-4 ${TEXT_STYLES.small} text-[${COLORS.text}]`}>
                      {item.price}
                    </td>
                    <td className={`px-6 py-4 ${TEXT_STYLES.small} text-[${COLORS.text}]`}>
                      {item.total}
                    </td>
                  </tr>
                ))}
                {/* Итоговая строка */}
                <tr className={`bg-[${COLORS.background}]`}>
                  <td 
                    colSpan={4} 
                    className={`px-6 py-4 ${TEXT_STYLES.small} text-[${COLORS.text}] text-right font-medium`}
                  >
                    Итого:
                  </td>
                  <td className={`px-6 py-4 ${TEXT_STYLES.small} text-[${COLORS.text}] font-medium`}>
                    {order.total}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {orders.length === 0 && (
        <div className={`text-center py-8 text-[${COLORS.secondary}]`}>
          У клиента пока нет заказов
        </div>
      )}

      {orders.length > 0 && (
        <div className={`mt-4 ${TEXT_STYLES.small} text-[${COLORS.secondary}] text-right`}>
          Всего заказов: {orders.length}
        </div>
      )}
    </div>
  );
};

export default ClientOrders;