// src/components/layout/Header.tsx
import React from 'react';
import '../../Styles/layout/Header.module.css';

const Header: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="text-xl font-bold text-blue-600">PinnaX</div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50">
              Войти
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;