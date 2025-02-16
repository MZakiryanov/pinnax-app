// src/components/personal/sections/ClientsSection.tsx
import React, { useState } from 'react';
import { Search, Plus, Download } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  phone: string;
  ordersCount: number;
  totalSpent: string;
  lastOrder: string;
  status: 'active' | 'inactive';
}

const ClientsSection: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const clients: Client[] = [
    {
      id: '#1234',
      name: 'Алия Сатпаева',
      phone: '+7 777 123 45 67',
      ordersCount: 12,
      totalSpent: '245,000 ₸',
      lastOrder: '14.02.2025',
      status: 'active'
    },
    {
      id: '#1235',
      name: 'Марат Алиев',
      phone: '+7 777 234 56 78',
      ordersCount: 5,
      totalSpent: '87,000 ₸',
      lastOrder: '13.02.2025',
      status: 'active'
    },
    {
      id: '#1236',
      name: 'Айдар Касымов',
      phone: '+7 777 345 67 89',
      ordersCount: 3,
      totalSpent: '54,000 ₸',
      lastOrder: '10.02.2025',
      status: 'inactive'
    }
  ];

  const filteredClients = clients.filter(client => 
    (filterStatus === 'all' || client.status === filterStatus) &&
    (searchQuery === '' || 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery))
  );

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Верхняя панель */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Клиенты</h2>
          <div className="flex space-x-2">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-5 h-5 mr-2" />
              Экспорт
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-5 h-5 mr-2" />
              Добавить клиента
            </button>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по имени или телефону..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Все клиенты</option>
            <option value="active">Активные</option>
            <option value="inactive">Неактивные</option>
          </select>
        </div>
      </div>

      {/* Таблица клиентов */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Клиент</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Телефон</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Заказов</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Сумма покупок</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Последний заказ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredClients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {client.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {client.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.ordersCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.totalSpent}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.lastOrder}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    client.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {client.status === 'active' ? 'Активный' : 'Неактивный'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientsSection;