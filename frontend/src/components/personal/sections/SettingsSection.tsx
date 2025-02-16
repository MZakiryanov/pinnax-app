// src/components/personal/sections/SettingsSection.tsx
import React from 'react';
import { User, Lock, Bell } from 'lucide-react';

const SettingsSection: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Настройки</h2>
      </div>
      
      <div className="p-6">
        <div className="space-y-6">
          {/* Профиль */}
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">Профиль</h3>
              <p className="mt-1 text-sm text-gray-500">
                Управление личной информацией и настройками профиля
              </p>
              <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">
                Изменить
              </button>
            </div>
          </div>

          {/* Безопасность */}
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Lock className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">Безопасность</h3>
              <p className="mt-1 text-sm text-gray-500">
                Настройки безопасности и двухфакторной аутентификации
              </p>
              <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">
                Настроить
              </button>
            </div>
          </div>

          {/* Уведомления */}
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">Уведомления</h3>
              <p className="mt-1 text-sm text-gray-500">
                Настройка уведомлений по электронной почте и в WhatsApp
              </p>
              <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">
                Настроить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;