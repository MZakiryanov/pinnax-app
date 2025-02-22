// src/components/personal/sections/SettingsSection.tsx
import React from 'react';
import { User, Lock, Bell } from 'lucide-react';

const SettingsSection: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-[#A7ABAA]/20">
        <h2 className="text-lg font-medium text-[#465357]">Настройки</h2>
      </div>
      
      <div className="p-6">
        <div className="space-y-6">
          {/* Профиль */}
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-[#245D33]/10 rounded-lg">
              <User className="w-6 h-6 text-[#245D33]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-[#465357]">Профиль</h3>
              <p className="mt-1 text-sm text-[#A7ABAA]">
                Управление личной информацией и настройками профиля
              </p>
              <button className="mt-2 text-sm text-[#245D33] hover:text-[#245D33]/80 transition-colors duration-200">
                Изменить
              </button>
            </div>
          </div>

          {/* Безопасность */}
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-[#245D33]/10 rounded-lg">
              <Lock className="w-6 h-6 text-[#245D33]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-[#465357]">Безопасность</h3>
              <p className="mt-1 text-sm text-[#A7ABAA]">
                Настройки безопасности и двухфакторной аутентификации
              </p>
              <button className="mt-2 text-sm text-[#245D33] hover:text-[#245D33]/80 transition-colors duration-200">
                Настроить
              </button>
            </div>
          </div>

          {/* Уведомления */}
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-[#245D33]/10 rounded-lg">
              <Bell className="w-6 h-6 text-[#245D33]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-[#465357]">Уведомления</h3>
              <p className="mt-1 text-sm text-[#A7ABAA]">
                Настройка уведомлений по электронной почте и в WhatsApp
              </p>
              <button className="mt-2 text-sm text-[#245D33] hover:text-[#245D33]/80 transition-colors duration-200">
                Настроить
              </button>
            </div>
          </div>

          {/* Разделитель для дополнительных настроек */}
          <div className="border-t border-[#A7ABAA]/20 pt-6">
            <button className="px-4 py-2 bg-[#245D33] text-white rounded-lg hover:bg-[#245D33]/90 transition-colors duration-200 w-full md:w-auto">
              Сохранить изменения
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;