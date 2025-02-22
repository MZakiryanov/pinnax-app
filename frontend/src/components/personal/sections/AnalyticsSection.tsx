// src/components/personal/sections/AnalyticsSection/index.tsx
import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Download } from 'lucide-react';

const salesData = [
  { date: '2025-02-01', orders: 45, revenue: 450000 },
  { date: '2025-02-02', orders: 52, revenue: 520000 },
  { date: '2025-02-03', orders: 48, revenue: 480000 },
  { date: '2025-02-04', orders: 70, revenue: 700000 },
  { date: '2025-02-05', orders: 61, revenue: 610000 },
  { date: '2025-02-06', orders: 65, revenue: 650000 },
  { date: '2025-02-07', orders: 75, revenue: 750000 },
].map(item => ({
  ...item,
  date: new Date(item.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
  revenueFormatted: `${(item.revenue / 1000).toFixed(0)}K ₸`
}));

const clientRetentionData = [
  { month: 'Янв', newClients: 120, returnClients: 80 },
  { month: 'Фев', newClients: 140, returnClients: 95 },
  { month: 'Мар', newClients: 130, returnClients: 105 },
  { month: 'Апр', newClients: 150, returnClients: 120 },
  { month: 'Май', newClients: 160, returnClients: 140 },
];

const AnalyticsSection: React.FC = () => {
  const [dateRange, setDateRange] = useState('week');

  return (
    <div className="space-y-6">
      {/* Фильтры */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={() => setDateRange('week')}
              className={`px-4 py-2 rounded-lg ${
                dateRange === 'week'
                  ? 'bg-[#245D33]/10 text-[#245D33]'
                  : 'text-[#465357] hover:bg-[#EFF6EF]'
              }`}
            >
              Неделя
            </button>
            <button
              onClick={() => setDateRange('month')}
              className={`px-4 py-2 rounded-lg ${
                dateRange === 'month'
                  ? 'bg-[#245D33]/10 text-[#245D33]'
                  : 'text-[#465357] hover:bg-[#EFF6EF]'
              }`}
            >
              Месяц
            </button>
            <button
              onClick={() => setDateRange('quarter')}
              className={`px-4 py-2 rounded-lg ${
                dateRange === 'quarter'
                  ? 'bg-[#245D33]/10 text-[#245D33]'
                  : 'text-[#465357] hover:bg-[#EFF6EF]'
              }`}
            >
              Квартал
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="date"
                className="pl-10 pr-4 py-2 border border-[#A7ABAA] rounded-lg focus:ring-2 focus:ring-[#245D33] focus:border-transparent"
              />
              <Calendar className="w-5 h-5 text-[#A7ABAA] absolute left-3 top-2.5" />
            </div>
            <button className="flex items-center px-4 py-2 border border-[#A7ABAA] rounded-lg hover:bg-[#EFF6EF]">
              <Download className="w-5 h-5 mr-2 text-[#465357]" />
              Экспорт
            </button>
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-[#A7ABAA]">Выручка</h3>
          <p className="text-2xl font-semibold mt-2 text-[#465357]">4.16M ₸</p>
          <span className="text-sm text-[#245D33]">+12.5% с прошлого периода</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-[#A7ABAA]">Заказов</h3>
          <p className="text-2xl font-semibold mt-2 text-[#465357]">416</p>
          <span className="text-sm text-[#245D33]">+8.2% с прошлого периода</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-[#A7ABAA]">Средний чек</h3>
          <p className="text-2xl font-semibold mt-2 text-[#465357]">10,000 ₸</p>
          <span className="text-sm text-[#245D33]">+4.3% с прошлого периода</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-[#A7ABAA]">Новых клиентов</h3>
          <p className="text-2xl font-semibold mt-2 text-[#465357]">64</p>
          <span className="text-sm text-[#245D33]">+15.7% с прошлого периода</span>
        </div>
      </div>

      {/* График продаж */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium text-[#465357] mb-4">Динамика продаж</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke={`#A7ABAA`} />
              <XAxis dataKey="date" tick={{ fill: '#465357' }} />
              <YAxis yAxisId="left" tick={{ fill: '#465357' }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: '#465357' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #A7ABAA',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="orders"
                stroke="#245D33"
                name="Заказы"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#A7ABAA"
                name="Выручка"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* График удержания клиентов */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium text-[#465357] mb-4">Структура клиентской базы</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={clientRetentionData}>
              <CartesianGrid strokeDasharray="3 3" stroke={`#A7ABAA`} />
              <XAxis dataKey="month" tick={{ fill: '#465357' }} />
              <YAxis tick={{ fill: '#465357' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #A7ABAA',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="newClients" name="Новые клиенты" fill="#245D33" />
              <Bar dataKey="returnClients" name="Повторные клиенты" fill="#A7ABAA" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;