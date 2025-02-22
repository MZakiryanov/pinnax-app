import React, { useState } from 'react';
//import { Search, Phone, MoreVertical, Paperclip, Send } from 'lucide-react';
import { Search, Paperclip, Send } from 'lucide-react';

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
      <div className="w-full bg-white border-b border-[#A7ABAA]/20">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-[#245D33] rounded-full"></div>
            <span className="text-sm font-medium text-[#465357]">Telegram подключен</span>
          </div>
          <div className="flex space-x-8">
            <div>
              <div className="text-sm text-[#A7ABAA]">Конверсия в заказы</div>
              <div className="text-lg font-semibold text-[#465357]">32%</div>
            </div>
            <div>
              <div className="text-sm text-[#A7ABAA]">Среднее время ответа</div>
              <div className="text-lg font-semibold text-[#465357]">1.8 мин</div>
            </div>
            <div>
              <div className="text-sm text-[#A7ABAA]">Активные чаты</div>
              <div className="text-lg font-semibold text-[#465357]">18</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Список чатов */}
        <div className="w-80 border-r border-[#A7ABAA]/20 flex flex-col">
          <div className="p-4 border-b border-[#A7ABAA]/20">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск в Telegram..."
                className="w-full pl-10 pr-4 py-2 bg-[#EFF6EF] border border-[#A7ABAA]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#245D33]"
              />
              <Search className="w-5 h-5 text-[#A7ABAA] absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-4 border-b border-[#A7ABAA]/20 cursor-pointer hover:bg-[#EFF6EF] ${
                  selectedChat === chat.id ? 'bg-[#EFF6EF]' : ''
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
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#245D33] border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <div>
                        <h3 className="text-sm font-medium text-[#465357]">{chat.name}</h3>
                        <p className="text-xs text-[#A7ABAA]">{chat.username}</p>
                      </div>
                      <span className="text-xs text-[#A7ABAA]">{chat.timestamp}</span>
                    </div>
                    <p className="text-sm text-[#A7ABAA] truncate mt-1">{chat.lastMessage}</p>
                  </div>
                  {chat.unread && (
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#245D33] text-white text-xs font-medium">
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
              <div className="px-6 py-4 border-b border-[#A7ABAA]/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={chats.find(chat => chat.id === selectedChat)?.avatar}
                      alt=""
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-[#465357]">
                        {chats.find(chat => chat.id === selectedChat)?.name}
                      </div>
                      <div className="text-xs text-[#A7ABAA]">
                        {chats.find(chat => chat.id === selectedChat)?.username}
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
                        <img
                          src={chats.find(chat => chat.id === selectedChat)?.avatar}
                          alt=""
                          className="w-8 h-8 rounded-full mr-2"
                        />
                      )}
                      <div className={`max-w-[70%] rounded-lg py-2 px-4 ${
                        message.isSent 
                          ? 'bg-[#245D33] text-white' 
                          : 'bg-[#EFF6EF] text-[#465357]'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        <span className={`text-xs ${message.isSent ? 'text-white/80' : 'text-[#A7ABAA]'} mt-1`}>
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ввод сообщения */}
              <div className="p-4 border-t border-[#A7ABAA]/20">
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-[#EFF6EF] rounded-full">
                    <Paperclip className="w-5 h-5 text-[#A7ABAA]" />
                  </button>
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Написать сообщение..."
                    className="flex-1 bg-[#EFF6EF] border border-[#A7ABAA]/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#245D33]"
                  />
                  {messageText.trim() ? (
                    <button 
                      onClick={handleSendMessage}
                      className="p-2 bg-[#245D33] text-white rounded-full hover:bg-[#245D33]/90"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  ) : (
                    <button className="p-2 hover:bg-[#EFF6EF] rounded-full">
                      <Send className="w-5 h-5 text-[#A7ABAA]" />
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[#A7ABAA]">
              Выберите чат для просмотра
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TelegramSection;