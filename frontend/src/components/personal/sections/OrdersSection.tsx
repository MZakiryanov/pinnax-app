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
      case 'delivered': return 'bg-[#245D33]/20 text-[#245D33]';
      case 'processing': return 'bg-[#A7ABAA]/20 text-[#465357]';
      case 'pending': return 'bg-[#245D33]/10 text-[#245D33]';
      case 'cancelled': return 'bg-[#FF4444]/20 text-[#FF4444]';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'delivered': return 'Доставлен';
      case 'processing': return 'В обработке';
      case 'pending': return 'Ожидание';
      case 'cancelled': return 'Отменен';
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
      <div className="bg-[#EFF6EF] rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative flex-1 w-full md:max-w-md">
            <input
              type="text"
              placeholder="Поиск заказа..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#A7ABAA] rounded-lg focus:ring-2 focus:ring-[#245D33] focus:border-transparent"
            />
            <Search className="w-5 h-5 text-[#A7ABAA] absolute left-3 top-2.5" />
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as Order['status'] | 'all')}
                className="pl-4 pr-10 py-2 border border-[#A7ABAA] rounded-lg appearance-none focus:ring-2 focus:ring-[#245D33] focus:border-transparent"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Filter className="w-5 h-5 text-[#A7ABAA] absolute right-3 top-2.5 pointer-events-none" />
            </div>
            <button className="flex items-center px-4 py-2 border border-[#A7ABAA] rounded-lg hover:bg-[#EFF6EF] text-[#465357]">
              <Download className="w-5 h-5 mr-2" />
              Экспорт
            </button>
            <button className="flex items-center px-4 py-2 bg-[#245D33] text-white rounded-lg hover:bg-[#245D33]/90 transition-colors duration-200">
              <Plus className="w-5 h-5 mr-2" />
              Новый заказ
            </button>
          </div>
        </div>
      </div>

      {/* Таблица заказов */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#EFF6EF]">
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A7ABAA] uppercase">Номер</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A7ABAA] uppercase">Клиент</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A7ABAA] uppercase">Товары</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A7ABAA] uppercase">Сумма</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A7ABAA] uppercase">Статус</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A7ABAA] uppercase">Дата</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#A7ABAA]/10">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#EFF6EF]">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#245D33]">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#465357]">{order.client}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#465357]">{order.products.join(', ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#465357]">{order.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#465357]">{order.date}</td>
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