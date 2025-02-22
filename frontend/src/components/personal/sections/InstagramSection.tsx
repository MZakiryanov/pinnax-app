// src/components/personal/sections/InstagramSection.tsx
import React, { useState } from 'react';
import { Search, Heart, Image, Smile, Send } from 'lucide-react';

interface Chat {
  id: string;
  name: string;
  username: string;
  lastMessage: string;
  timestamp: string;
  unread?: number;
  avatar: string;
  isVerified?: boolean;
}

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isSent: boolean;
}

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ value, onChange, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
        <Image className="w-6 h-6 text-gray-500" />
      </button>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        placeholder="Написать сообщение..."
        className="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
        <Smile className="w-6 h-6 text-gray-500" />
      </button>
      {value.trim() ? (
        <button 
          type="submit"
          className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:opacity-90"
        >
          <Send className="w-5 h-5" />
        </button>
      ) : (
        <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
          <Heart className="w-6 h-6 text-gray-500" />
        </button>
      )}
    </form>
  );
};

const InstagramSection: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');

  const chats: Chat[] = [
    {
      id: '1',
      name: 'Алия Сатпаева',
      username: 'aliya.satpaeva',
      lastMessage: 'Отличное качество! 👍',
      timestamp: '14:30',
      unread: 2,
      avatar: '/api/placeholder/40/40',
      isVerified: true
    },
    {
      id: '2',
      name: 'Марат Алиев',
      username: 'marat.aliev',
      lastMessage: 'Когда будет доставка?',
      timestamp: '13:45',
      avatar: '/api/placeholder/40/40'
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      text: 'Здравствуйте! Можно узнать стоимость?',
      timestamp: '14:25',
      isSent: false
    },
    {
      id: '2',
      text: 'Добрый день! Конечно, стоимость составляет 15,000 ₸',
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

  return (
    <div className="h-[calc(100vh-180px)] bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
      {/* Статистика */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">Instagram подключен</span>
          </div>
          <div className="flex space-x-8">
            <div>
              <div className="text-sm text-gray-600">Конверсия в заказы</div>
              <div className="text-lg font-semibold">41%</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Среднее время ответа</div>
              <div className="text-lg font-semibold">2.5 мин</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Активные чаты</div>
              <div className="text-lg font-semibold">25</div>
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
                placeholder="Поиск в Instagram..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                  selectedChat === chat.id ? 'bg-pink-50' : ''
                }`}
              >
                <div className="flex space-x-3">
                  <div className="relative">
                    <div className="rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
                      <img
                        src={chat.avatar}
                        alt={chat.name}
                        className="w-10 h-10 rounded-full border-2 border-white"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <div className="flex items-center">
                        <span className="text-sm font-medium">@{chat.username}</span>
                        {chat.isVerified && (
                          <svg className="w-4 h-4 ml-1 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                          </svg>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{chat.timestamp}</span>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm text-gray-900">{chat.name}</p>
                      <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                    </div>
                  </div>
                  {chat.unread && (
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-medium">
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
                    <div className="rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
                      <img
                        src={chats.find(chat => chat.id === selectedChat)?.avatar}
                        alt=""
                        className="w-8 h-8 rounded-full border-2 border-white"
                      />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium">@{chats.find(chat => chat.id === selectedChat)?.username}</span>
                        {chats.find(chat => chat.id === selectedChat)?.isVerified && (
                          <svg className="w-4 h-4 ml-1 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                          </svg>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {chats.find(chat => chat.id === selectedChat)?.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Сообщения */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}>
                      {!message.isSent && (
                        <div className="rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 h-8 mr-2">
                          <img
                            src={chats.find(chat => chat.id === selectedChat)?.avatar}
                            alt=""
                            className="w-7 h-7 rounded-full border-2 border-white"
                          />
                        </div>
                      )}
                      <div className={`max-w-[70%] rounded-2xl py-2 px-4 ${
                        message.isSent 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                          : 'bg-gray-100'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        <span className={`text-xs ${message.isSent ? 'text-purple-100' : 'text-gray-500'} mt-1`}>
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ввод сообщения */}
              <div className="p-4 border-t border-gray-200">
                <MessageInput 
                  value={messageText}
                  onChange={setMessageText}
                  onSubmit={handleSendMessage}
                />
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

export default InstagramSection;