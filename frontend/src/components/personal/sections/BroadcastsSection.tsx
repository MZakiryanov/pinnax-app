// src/components/personal/sections/BroadcastsSection/index.tsx
import React, { useState } from 'react';
import { Calendar, Clock, Users } from 'lucide-react';

interface MessageTemplate {
  id: string;
  name: string;
  content: string;
  createdAt: string;
}

interface Audience {
  id: string;
  name: string;
  filters: {
    orderCount?: number;
    lastOrderDays?: number;
    totalSpent?: number;
  };
  estimatedReach: number;
}

const BroadcastsSection: React.FC = () => {
  const [isScheduled, setIsScheduled] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [selectedAudience, setSelectedAudience] = useState<string>('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  const templates: MessageTemplate[] = [
    {
      id: '1',
      name: 'Скидка 20%',
      content: 'Специально для вас скидка 20% на все меню до конца недели!',
      createdAt: '12.02.2025'
    },
    {
      id: '2',
      name: 'Новое меню',
      content: 'Мы обновили наше меню! Попробуйте новые блюда со скидкой 15%',
      createdAt: '13.02.2025'
    }
  ];

  const audiences: Audience[] = [
    {
      id: '1',
      name: 'Активные клиенты',
      filters: { orderCount: 3, lastOrderDays: 30 },
      estimatedReach: 250
    },
    {
      id: '2',
      name: 'VIP клиенты',
      filters: { totalSpent: 100000 },
      estimatedReach: 50
    }
  ];

  return (
    <div className="space-y-6">
      {/* Создание рассылки */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Создание рассылки</h2>
        
        {/* Выбор шаблона */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Шаблон сообщения
          </label>
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Выберите шаблон</option>
            {templates.map(template => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>

        {/* Выбор аудитории */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Аудитория
          </label>
          <select
            value={selectedAudience}
            onChange={(e) => setSelectedAudience(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Выберите аудиторию</option>
            {audiences.map(audience => (
              <option key={audience.id} value={audience.id}>
                {audience.name} ({audience.estimatedReach} получателей)
              </option>
            ))}
          </select>
        </div>

        {/* Выбор времени отправки */}
        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={!isScheduled}
                onChange={() => setIsScheduled(false)}
                className="mr-2"
              />
              <span className="text-sm">Отправить сейчас</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={isScheduled}
                onChange={() => setIsScheduled(true)}
                className="mr-2"
              />
              <span className="text-sm">Запланировать</span>
            </label>
          </div>

          {isScheduled && (
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Дата
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                  />
                  <Calendar className="w-5 h-5 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Время
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                  />
                  <Clock className="w-5 h-5 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {isScheduled ? 'Запланировать рассылку' : 'Начать рассылку'}
        </button>
      </div>

      {/* Шаблоны сообщений */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Шаблоны сообщений</h2>
          <button className="text-blue-600 hover:text-blue-700">
            + Создать шаблон
          </button>
        </div>
        
        <div className="space-y-4">
          {templates.map(template => (
            <div key={template.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{template.name}</h3>
                <span className="text-sm text-gray-500">{template.createdAt}</span>
              </div>
              <p className="text-gray-600 text-sm">{template.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Аудитории */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Аудитории</h2>
          <button className="text-blue-600 hover:text-blue-700">
            + Создать аудиторию
          </button>
        </div>
        
        <div className="space-y-4">
          {audiences.map(audience => (
            <div key={audience.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{audience.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Users className="w-4 h-4 mr-1" />
                    {audience.estimatedReach} получателей
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm">
                  Редактировать
                </button>
              </div>
              <div className="mt-2">
                <div className="text-sm text-gray-600">
                  Фильтры:
                  {audience.filters.orderCount && (
                    <span className="ml-2">Мин. заказов: {audience.filters.orderCount}</span>
                  )}
                  {audience.filters.lastOrderDays && (
                    <span className="ml-2">Последний заказ: {audience.filters.lastOrderDays} дней</span>
                  )}
                  {audience.filters.totalSpent && (
                    <span className="ml-2">Мин. сумма покупок: {audience.filters.totalSpent.toLocaleString()} ₸</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BroadcastsSection;