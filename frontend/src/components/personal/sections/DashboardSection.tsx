// src/components/personal/sections/DashboardSection/index.tsx
import React from 'react';
import { Search, Plus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, positive = true }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <div className="mt-2 flex items-baseline">
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      <p className={`ml-2 text-sm font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
        {change}
      </p>
    </div>
  </div>
);

const DashboardSection: React.FC = () => {
  return (
    <div>
      {/* Верхняя панель с поиском и кнопкой */}
      <div className="flex justify-between items-center mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Поиск..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          Новый заказ
        </button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Заказы" value="156" change="+12.5%" />
        <StatCard title="Активные чаты" value="23" change="+18.2%" />
        <StatCard title="Клиенты" value="1,205" change="+5.4%" />
        <StatCard title="Выручка" value="2.4M ₸" change="-4.3%" positive={false} />
      </div>

      {/* Таблица последних заказов */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Последние заказы</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Клиент</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Сумма</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Дата</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { id: '#1234', client: 'Алия Сатпаева', amount: '45,000 ₸', status: 'Оплачен', date: '14.02.2025' },
                { id: '#1233', client: 'Марат Алиев', amount: '32,000 ₸', status: 'В обработке', date: '14.02.2025' },
                { id: '#1232', client: 'Айдар Касымов', amount: '78,000 ₸', status: 'Доставлен', date: '13.02.2025' }
              ].map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'Оплачен' ? 'bg-green-100 text-green-800' :
                      order.status === 'В обработке' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;