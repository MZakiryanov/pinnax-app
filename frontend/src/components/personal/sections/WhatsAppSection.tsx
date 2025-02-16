// src/components/personal/sections/ChatsSection/index.tsx
import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread?: number;
}

const ChatsSection: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const chats: Chat[] = [
    { id: '1', name: 'Алия Сатпаева', lastMessage: 'Спасибо за заказ!', timestamp: '14:30', unread: 2 },
    { id: '2', name: 'Марат Алиев', lastMessage: 'Когда доставка?', timestamp: '13:45' },
    { id: '3', name: 'Айдар Касымов', lastMessage: 'Хорошо, договорились', timestamp: '12:20' },
  ];

  return (
    <div className="h-[calc(100vh-180px)] bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
      {/* Статистика чатов */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">WhatsApp подключен</span>
          </div>
          <div className="flex space-x-8">
            <div>
              <div className="text-sm text-gray-600">Конверсия в заказы</div>
              <div className="text-lg font-semibold">35%</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Среднее время ответа</div>
              <div className="text-lg font-semibold">2.5 мин</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Активные чаты</div>
              <div className="text-lg font-semibold">23</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Список чатов */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск чата..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  selectedChat === chat.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{chat.name}</div>
                    <div className="text-sm text-gray-500 mt-1">{chat.lastMessage}</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-xs text-gray-400">{chat.timestamp}</div>
                    {chat.unread && (
                      <div className="mt-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Область чата */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Заголовок чата */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="font-medium">
                  {chats.find(chat => chat.id === selectedChat)?.name}
                </div>
              </div>

              {/* Сообщения */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg py-2 px-4 max-w-[70%]">
                      <p className="text-sm">Здравствуйте! Подскажите, мой заказ уже в пути?</p>
                      <span className="text-xs text-gray-500 mt-1">14:25</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-blue-500 text-white rounded-lg py-2 px-4 max-w-[70%]">
                      <p className="text-sm">Да, заказ передан курьеру. Прибудет примерно через 30 минут.</p>
                      <span className="text-xs text-blue-100 mt-1">14:30</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Выберите чат для просмотра
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatsSection;