// src/components/personal/sections/OrdersSection/index.tsx
import React, { useState, useMemo } from 'react';
import { Search, Plus, Filter, Download } from 'lucide-react';

interface Order {
  id: string;
  client: string;
  products: string[];
  amount: string;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  date: string;
}

const OrdersSection: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<Order['status'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const orders: Order[] = [
    {
      id: '#1234',
      client: 'Алия Сатпаева',
      products: ['Товар 1', 'Товар 2'],
      amount: '45,000 ₸',
      status: 'delivered',
      date: '14.02.2025'
    },
    {
      id: '#1233',
      client: 'Марат Алиев',
      products: ['Товар 3'],
      amount: '32,000 ₸',
      status: 'processing',
      date: '14.02.2025'
    },
    {
      id: '#1232',
      client: 'Айдар Касымов',
      products: ['Товар 4'],
      amount: '78,000 ₸',
      status: 'pending',
      date: '13.02.2025'
    }
  ];

  const filteredOrders = useMemo(() => {
    return orders.filter(order => 
      (filterStatus === 'all' || order.status === filterStatus) &&
      (searchQuery === '' || 
        order.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [orders, filterStatus, searchQuery]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
    }
  };

  const statusOptions: Array<{value: Order['status'] | 'all', label: string}> = [
    { value: 'all', label: 'Все статусы' },
    { value: 'pending', label: 'Ожидание' },
    { value: 'processing', label: 'В обработке' },
    { value: 'delivered', label: 'Доставлен' },
    { value: 'cancelled', label: 'Отменен' }
  ];

  return (
    <div>
      {/* Верхняя панель */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 mr-4">
          <input
            type="text"
            placeholder="Поиск заказа..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex space-x-2">
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as Order['status'] | 'all')}
              className="px-4 py-2 border border-gray-300 rounded-lg appearance-none"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Filter className="w-5 h-5 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-5 h-5 mr-2" />
            Экспорт
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-5 h-5 mr-2" />
            Новый заказ
          </button>
        </div>
      </div>

      {/* Таблица заказов */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Номер</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Клиент</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Товары</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Сумма</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Дата</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="p-3 text-sm text-gray-500">{order.client}</td>
                  <td className="p-3 text-sm text-gray-500">{order.products.join(', ')}</td>
                  <td className="p-3 text-sm text-gray-500">{order.amount}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status === 'delivered' ? 'Доставлен' :
                       order.status === 'processing' ? 'В обработке' :
                       order.status === 'pending' ? 'Ожидание' : 'Отменен'}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-500">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersSection;