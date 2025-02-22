// src/components/personal/sections/ClientsSection/components/Table/Pagination.tsx
import React from 'react';
import { COLORS } from '@/theme/colors';
import { TEXT_STYLES } from '@/theme/typography';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  startIndex,
  endIndex,
  onPageChange,
  onPageSizeChange,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const buttonBaseClass = `inline-flex items-center border border-[${COLORS.secondary}] px-2 py-2 
    text-[${COLORS.text}] transition-colors duration-200 disabled:opacity-50`;

  const pageButtonClass = (isActive: boolean) => `
    relative inline-flex items-center px-4 py-2 text-sm ${
      isActive
        ? `z-10 bg-[${COLORS.primary}] text-white focus-visible:outline-[${COLORS.primary}]`
        : `text-[${COLORS.text}] hover:bg-[${COLORS.background}] border border-[${COLORS.secondary}]`
    }
  `;

  return (
    <div className="flex items-center justify-between border-t border-[#A7ABAA]/20 bg-white px-4 py-3">
      {/* Мобильная версия */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${buttonBaseClass} rounded-md hover:bg-[${COLORS.background}]`}
        >
          Предыдущая
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${buttonBaseClass} rounded-md hover:bg-[${COLORS.background}]`}
        >
          Следующая
        </button>
      </div>

      {/* Десктопная версия */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        {/* Информация о количестве элементов */}
        <div>
          <p className={TEXT_STYLES.small}>
            Показано <span className="font-medium">{startIndex + 1}</span>-
            <span className="font-medium">{Math.min(endIndex, totalItems)}</span> из{' '}
            <span className="font-medium">{totalItems}</span> клиентов
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Выбор количества элементов на странице */}
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className={`rounded-md border border-[${COLORS.secondary}] px-2 py-1 ${TEXT_STYLES.small} 
              text-[${COLORS.text}] focus:ring-2 focus:ring-[${COLORS.primary}] focus:border-transparent
              transition duration-200`}
          >
            <option value={5}>5 на странице</option>
            <option value={10}>10 на странице</option>
            <option value={20}>20 на странице</option>
            <option value={50}>50 на странице</option>
          </select>

          {/* Кнопки страниц */}
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
            {/* Кнопка "Предыдущая" */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`${buttonBaseClass} rounded-l-md`}
            >
              <span className="sr-only">Предыдущая</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Номера страниц */}
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => onPageChange(number)}
                className={pageButtonClass(number === currentPage)}
              >
                {number}
              </button>
            ))}

            {/* Кнопка "Следующая" */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`${buttonBaseClass} rounded-r-md`}
            >
              <span className="sr-only">Следующая</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;