// src/components/personal/sections/ClientsSection/components/StatusSettings/Statistics.tsx
import React from 'react';
import { ClientStats } from '../../types';
import { getStatusColor, getStatusText } from '../../utils/statusHelpers';
import { COLORS } from '@/theme/colors';
import { TEXT_STYLES } from '@/theme/typography';

interface StatisticsProps {
  stats: ClientStats;
  total: number;
}

const Statistics: React.FC<StatisticsProps> = ({ stats, total }) => {
  // Создаем массив статусов для отображения
  const statuses = [
    { key: 'cold' as const, count: stats.cold },
    { key: 'new' as const, count: stats.new },
    { key: 'regular' as const, count: stats.regular },
    { key: 'loyal' as const, count: stats.loyal },
    { key: 'lost' as const, count: stats.lost },
  ];

  // Функция для расчета процента
  const calculatePercentage = (count: number): number => {
    return total > 0 ? Math.round((count / total) * 100) : 0;
  };

  return (
    <div className={`bg-[${COLORS.primary}]/10 p-4 rounded-lg`}>
      <h3 className={`${TEXT_STYLES.small} text-[${COLORS.primary}] mb-4`}>
        Статистика по статусам клиентов
      </h3>
      
      <div className="space-y-4">
        {statuses.map(({ key, count }) => {
          const percentage = calculatePercentage(count);
          return (
            <div key={key} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className={`${TEXT_STYLES.small} text-[${COLORS.text}]`}>
                  {getStatusText(key)}
                </span>
                <span className={`${TEXT_STYLES.small} text-[${COLORS.text}]`}>
                  {count} ({percentage}%)
                </span>
              </div>
              <div className={`w-full h-2 bg-[${COLORS.secondary}]/20 rounded-full overflow-hidden`}>
                <div
                  className={`h-full rounded-full ${getStatusColor(key)}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className={`mt-6 pt-4 border-t border-[${COLORS.secondary}]/20`}>
        <div className="flex justify-between text-sm">
          <span className={`${TEXT_STYLES.small} text-[${COLORS.text}] font-medium`}>
            Всего клиентов
          </span>
          <span className={`${TEXT_STYLES.small} text-[${COLORS.primary}] font-medium`}>
            {total}
          </span>
        </div>
      </div>

      {/* Информация о доступности авторасчета */}
      {stats.regular < 20 || stats.loyal < 5 ? (
        <div className={`mt-4 p-3 bg-[${COLORS.secondary}]/10 rounded-lg`}>
          <p className={`${TEXT_STYLES.tiny} text-[${COLORS.text}]`}>
            Для включения автоматического расчета необходимо:
            {stats.regular < 20 && (
              <span className="block">
                • Ещё {20 - stats.regular} постоянных клиентов
              </span>
            )}
            {stats.loyal < 5 && (
              <span className="block">
                • Ещё {5 - stats.loyal} лояльных клиентов
              </span>
            )}
          </p>
        </div>
      ) : (
        <div className={`mt-4 p-3 bg-[${COLORS.primary}]/10 rounded-lg`}>
          <p className={`${TEXT_STYLES.tiny} text-[${COLORS.primary}]`}>
            Автоматический расчет статусов доступен
          </p>
        </div>
      )}
    </div>
  );
};

export default Statistics;