// src/components/personal/sections/ClientsSection/components/ClientCard/ClientChart.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { OrderByMonth } from '../../types';
import { COLORS } from '@/theme/colors';
import { TEXT_STYLES } from '@/theme/typography';

interface ClientChartProps {
  ordersByMonth: OrderByMonth[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`bg-white p-2 border border-[${COLORS.secondary}] rounded-lg shadow-sm`}>
        <p className={TEXT_STYLES.small}>{label}</p>
        <p className={`${TEXT_STYLES.small} font-medium text-[${COLORS.primary}]`}>
          {`${payload[0].value} заказов`}
        </p>
      </div>
    );
  }
  return null;
};

const ClientChart: React.FC<ClientChartProps> = ({ ordersByMonth }) => {
  return (
    <div>
      <h3 className={`${TEXT_STYLES.h3} mb-4`}>
        Распределение заказов за последний год
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ordersByMonth}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={COLORS.secondary}
              vertical={false}
            />
            <XAxis 
              dataKey="month" 
              tick={{ fill: COLORS.text }}
              axisLine={{ stroke: COLORS.secondary }}
              tickLine={{ stroke: COLORS.secondary }}
            />
            <YAxis 
              tick={{ fill: COLORS.text }}
              axisLine={{ stroke: COLORS.secondary }}
              tickLine={{ stroke: COLORS.secondary }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="orders" 
              fill={COLORS.primary}
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className={`mt-4 ${TEXT_STYLES.small} text-[${COLORS.secondary}] text-center`}>
        Количество заказов по месяцам
      </div>
    </div>
  );
};

export default ClientChart;