// src/components/personal/sections/BroadcastsSection/index.tsx
import React, { useState } from 'react';
import { Calendar, Clock, Users } from 'lucide-react';
import { COLORS, TEXT_STYLES, COMPONENT_STYLES } from '@/theme';

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

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTemplate(e.target.value);
  };

  return (
    <div className="space-y-6">
      {/* Создание рассылки */}
      <div className={COMPONENT_STYLES.card.base}>
        <div className={COMPONENT_STYLES.card.header}>
          <h2 className={TEXT_STYLES.h2}>Создание рассылки</h2>
        </div>
        
        <div className={COMPONENT_STYLES.card.body}>
          {/* Выбор шаблона */}
          <div className="mb-6">
            <label className={`block mb-2 ${TEXT_STYLES.body}`}>
              Шаблон сообщения
            </label>
            <select
              value={selectedTemplate}
              onChange={handleTemplateChange}
              className={COMPONENT_STYLES.input.base}
            >
              <option value="">Выберите шаблон</option>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>

          {/* Выбор аудитории */}
          <div className="mb-6">
            <label className={`block mb-2 ${TEXT_STYLES.body}`}>
              Аудитория
            </label>
            <select
              value={selectedAudience}
              onChange={(e) => setSelectedAudience(e.target.value)}
              className={COMPONENT_STYLES.input.base}
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
                  className={`mr-2 text-${COLORS.primary} focus:ring-${COLORS.primary}`}
                />
                <span className={TEXT_STYLES.body}>Отправить сейчас</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={isScheduled}
                  onChange={() => setIsScheduled(true)}
                  className={`mr-2 text-${COLORS.primary} focus:ring-${COLORS.primary}`}
                />
                <span className={TEXT_STYLES.body}>Запланировать</span>
              </label>
            </div>

            {isScheduled && (
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className={`block mb-2 ${TEXT_STYLES.body}`}>
                    Дата
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className={COMPONENT_STYLES.input.base}
                    />
                    <Calendar className={`w-5 h-5 text-${COLORS.secondary} absolute right-3 top-2.5 pointer-events-none`} />
                  </div>
                </div>
                <div className="flex-1">
                  <label className={`block mb-2 ${TEXT_STYLES.body}`}>
                    Время
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className={COMPONENT_STYLES.input.base}
                    />
                    <Clock className={`w-5 h-5 text-${COLORS.secondary} absolute right-3 top-2.5 pointer-events-none`} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <button className={COMPONENT_STYLES.button.primary}>
            {isScheduled ? 'Запланировать рассылку' : 'Начать рассылку'}
          </button>
        </div>
      </div>

      {/* Шаблоны сообщений */}
      <div className={COMPONENT_STYLES.card.base}>
        <div className={COMPONENT_STYLES.card.header}>
          <div className="flex justify-between items-center">
            <h2 className={TEXT_STYLES.h2}>Шаблоны сообщений</h2>
            <button className={`text-${COLORS.primary} hover:text-${COLORS.primary}/80`}>
              + Создать шаблон
            </button>
          </div>
        </div>
        
        <div className={COMPONENT_STYLES.card.body}>
          <div className="space-y-4">
            {templates.map(template => (
              <div key={template.id} className={`border border-${COLORS.secondary}/20 rounded-lg p-4`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className={TEXT_STYLES.body}>{template.name}</h3>
                  <span className={`${TEXT_STYLES.small} text-${COLORS.secondary}`}>
                    {template.createdAt}
                  </span>
                </div>
                <p className={`${TEXT_STYLES.small} text-${COLORS.text}`}>
                  {template.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Аудитории */}
      <div className={COMPONENT_STYLES.card.base}>
        <div className={COMPONENT_STYLES.card.header}>
          <div className="flex justify-between items-center">
            <h2 className={TEXT_STYLES.h2}>Аудитории</h2>
            <button className={`text-${COLORS.primary} hover:text-${COLORS.primary}/80`}>
              + Создать аудиторию
            </button>
          </div>
        </div>
        
        <div className={COMPONENT_STYLES.card.body}>
          <div className="space-y-4">
            {audiences.map(audience => (
              <div key={audience.id} className={`border border-${COLORS.secondary}/20 rounded-lg p-4`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className={TEXT_STYLES.body}>{audience.name}</h3>
                    <div className={`flex items-center ${TEXT_STYLES.small} text-${COLORS.secondary} mt-1`}>
                      <Users className="w-4 h-4 mr-1" />
                      {audience.estimatedReach} получателей
                    </div>
                  </div>
                  <button className={`text-${COLORS.primary} hover:text-${COLORS.primary}/80 ${TEXT_STYLES.small}`}>
                    Редактировать
                  </button>
                </div>
                <div className="mt-2">
                  <div className={`${TEXT_STYLES.small} text-${COLORS.text}`}>
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
    </div>
  );
};

export default BroadcastsSection;