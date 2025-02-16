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
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Неделя
            </button>
            <button
              onClick={() => setDateRange('month')}
              className={`px-4 py-2 rounded-lg ${
                dateRange === 'month'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Месяц
            </button>
            <button
              onClick={() => setDateRange('quarter')}
              className={`px-4 py-2 rounded-lg ${
                dateRange === 'quarter'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Квартал
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="date"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-5 h-5 mr-2" />
              Экспорт
            </button>
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Выручка</h3>
          <p className="text-2xl font-semibold mt-2">4.16M ₸</p>
          <span className="text-sm text-green-600">+12.5% с прошлого периода</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Заказов</h3>
          <p className="text-2xl font-semibold mt-2">416</p>
          <span className="text-sm text-green-600">+8.2% с прошлого периода</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Средний чек</h3>
          <p className="text-2xl font-semibold mt-2">10,000 ₸</p>
          <span className="text-sm text-green-600">+4.3% с прошлого периода</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Новых клиентов</h3>
          <p className="text-2xl font-semibold mt-2">64</p>
          <span className="text-sm text-green-600">+15.7% с прошлого периода</span>
        </div>
      </div>

      {/* График продаж */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium mb-4">Динамика продаж</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="orders"
                stroke="#3B82F6"
                name="Заказы"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                name="Выручка"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* График удержания клиентов */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium mb-4">Структура клиентской базы</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={clientRetentionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="newClients" name="Новые клиенты" fill="#3B82F6" />
              <Bar dataKey="returnClients" name="Повторные клиенты" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;