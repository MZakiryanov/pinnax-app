// src/components/personal/sections/TelegramSection.tsx
import React, { useState } from 'react';
import { Search, Phone, MoreVertical, Paperclip, Send } from 'lucide-react';

interface Chat {
  id: string;
  name: string;
  username?: string;
  lastMessage: string;
  timestamp: string;
  unread?: number;
  avatar: string;
  isOnline: boolean;
}

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isSent: boolean;
}

const TelegramSection: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');

  const chats: Chat[] = [
    {
      id: '1',
      name: 'Алия Сатпаева',
      username: '@aliya_s',
      lastMessage: 'Добрый день! Хотела уточнить...',
      timestamp: '14:30',
      unread: 1,
      avatar: '/api/placeholder/40/40',
      isOnline: true
    },
    {
      id: '2',
      name: 'Марат Алиев',
      username: '@marat_a',
      lastMessage: 'Заказ получил, спасибо!',
      timestamp: '13:45',
      avatar: '/api/placeholder/40/40',
      isOnline: false
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      text: 'Здравствуйте, хотел уточнить по поводу доставки.',
      timestamp: '14:25',
      isSent: false
    },
    {
      id: '2',
      text: 'Здравствуйте! Да, конечно. Доставка осуществляется ежедневно с 10:00 до 22:00.',
      timestamp: '14:30',
      isSent: true
    }
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Здесь будет логика отправки сообщения
      setMessageText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && messageText.trim()) {
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-180px)] bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
      {/* Статистика */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">Telegram подключен</span>
          </div>
          <div className="flex space-x-8">
            <div>
              <div className="text-sm text-gray-600">Конверсия в заказы</div>
              <div className="text-lg font-semibold">32%</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Среднее время ответа</div>
              <div className="text-lg font-semibold">1.8 мин</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Активные чаты</div>
              <div className="text-lg font-semibold">18</div>
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
                placeholder="Поиск в Telegram..."
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
                      <div>
                        <h3 className="text-sm font-medium truncate">{chat.name}</h3>
                        {chat.username && (
                          <p className="text-xs text-gray-500">{chat.username}</p>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{chat.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate mt-1">{chat.lastMessage}</p>
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
                      <div className="text-xs text-gray-500">
                        {chats.find(chat => chat.id === selectedChat)?.username}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <Phone className="w-5 h-5 text-gray-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Сообщения */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}>
                      {!message.isSent && (
                        <img
                          src={chats.find(chat => chat.id === selectedChat)?.avatar}
                          alt=""
                          className="w-8 h-8 rounded-full mr-2"
                        />
                      )}
                      <div className={`max-w-[70%] rounded-lg py-2 px-4 ${
                        message.isSent 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        <span className={`text-xs ${message.isSent ? 'text-blue-100' : 'text-gray-500'} mt-1`}>
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ввод сообщения */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Paperclip className="w-5 h-5 text-gray-500" />
                  </button>
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Написать сообщение..."
                    className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {messageText.trim() ? (
                    <button 
                      onClick={handleSendMessage}
                      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  ) : (
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <Send className="w-5 h-5 text-gray-500" />
                    </button>
                  )}
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

export default TelegramSection;