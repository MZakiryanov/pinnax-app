// src/components/personal/sections/FacebookSection/index.tsx
import React, { useState } from 'react';
import { Search, Phone, Video, Info } from 'lucide-react';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread?: number;
  avatar: string;
  isOnline: boolean;
}

const FacebookSection: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const chats: Chat[] = [
    {
      id: '1',
      name: 'Алия Сатпаева',
      lastMessage: 'Здравствуйте, подскажите пожалуйста...',
      timestamp: '14:30',
      unread: 2,
      avatar: '/api/placeholder/40/40',
      isOnline: true
    },
    {
      id: '2',
      name: 'Марат Алиев',
      lastMessage: 'Спасибо за информацию!',
      timestamp: '13:45',
      avatar: '/api/placeholder/40/40',
      isOnline: false
    }
  ];

  return (
    <div className="h-[calc(100vh-180px)] bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
      {/* Статистика */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">Facebook подключен</span>
          </div>
          <div className="flex space-x-8">
            <div>
              <div className="text-sm text-gray-600">Конверсия в заказы</div>
              <div className="text-lg font-semibold">28%</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Среднее время ответа</div>
              <div className="text-lg font-semibold">3.2 мин</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Активные чаты</div>
              <div className="text-lg font-semibold">15</div>
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
                placeholder="Поиск в Facebook..."
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
                <div className="flex space-x-3">
                  <div className="relative">
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="w-10 h-10 rounded-full"
                    />
                    {chat.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-medium truncate">{chat.name}</h3>
                      <span className="text-xs text-gray-500">{chat.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread && (
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                        {chat.unread}
                      </span>
                    </div>
                  )}
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={chats.find(chat => chat.id === selectedChat)?.avatar}
                      alt=""
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div className="font-medium">
                        {chats.find(chat => chat.id === selectedChat)?.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {chats.find(chat => chat.id === selectedChat)?.isOnline ? 
                          'Онлайн' : 'Был(а) недавно'}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <Phone className="w-5 h-5 text-gray-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <Video className="w-5 h-5 text-gray-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <Info className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Сообщения */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className="flex space-x-2">
                      <img
                        src={chats.find(chat => chat.id === selectedChat)?.avatar}
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="bg-gray-100 rounded-lg py-2 px-4 max-w-[70%]">
                        <p className="text-sm">Здравствуйте, можно узнать стоимость доставки?</p>
                        <span className="text-xs text-gray-500 mt-1">14:25</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-blue-500 text-white rounded-lg py-2 px-4 max-w-[70%]">
                      <p className="text-sm">Здравствуйте! Доставка бесплатная при заказе от 5000 ₸</p>
                      <span className="text-xs text-blue-100 mt-1">14:30</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ввод сообщения */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Введите сообщение..."
                    className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Отправить
                  </button>
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

export default FacebookSection;