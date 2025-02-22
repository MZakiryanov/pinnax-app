// src/components/personal/sections/ClientsSection/components/Filters/Filters.tsx
import React, { ChangeEvent } from 'react';
import { Calendar } from 'lucide-react';
import { ClientFilters } from '../../types';
import { statusOptions } from '../../utils/statusHelpers';
import { COLORS } from '@/theme/colors';
import { TEXT_STYLES } from '@/theme/typography';

interface FiltersProps {
  filters: ClientFilters;
  onChange: (filters: ClientFilters) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onChange }) => {
  const handleChange = (field: keyof ClientFilters, value: string) => {
    onChange({
      ...filters,
      [field]: value
    });
  };

  const inputClassName = `w-full px-3 py-2 border border-[${COLORS.secondary}] rounded-lg focus:ring-2 focus:ring-[${COLORS.primary}] focus:border-transparent transition duration-200`;
  const labelClassName = `block ${TEXT_STYLES.small} text-[${COLORS.text}]`;

  return (
    <div className={`mt-4 p-4 border rounded-lg bg-[${COLORS.background}] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`}>
      {/* Orders count */}
      <div className="space-y-2">
        <label className={labelClassName}>
          Количество заказов
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="От"
            className={inputClassName}
            value={filters.ordersFrom}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('ordersFrom', e.target.value)}
          />
          <input
            type="number"
            placeholder="До"
            className={inputClassName}
            value={filters.ordersTo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('ordersTo', e.target.value)}
          />
        </div>
      </div>

      {/* Order amount */}
      <div className="space-y-2">
        <label className={labelClassName}>
          Сумма заказов
        </label>
        <div className="flex flex-col gap-2">
          <div className="relative">
            <input
              type="number"
              placeholder="От"
              className={inputClassName}
              value={filters.amountFrom}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('amountFrom', e.target.value)}
            />
          </div>
          <div className="relative">
            <input
              type="number"
              placeholder="До"
              className={inputClassName}
              value={filters.amountTo}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('amountTo', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Client status */}
      <div className="space-y-2">
        <label className={labelClassName}>
          Статус клиента
        </label>
        <select
          value={filters.status}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange('status', e.target.value)}
          className={inputClassName}
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Last order date */}
      <div className="space-y-2">
        <label className={labelClassName}>
          Последний заказ
        </label>
        <div className="flex flex-col gap-2">
          <div className="relative">
            <input
              type="date"
              className={`${inputClassName} pl-10`}
              value={filters.lastOrderFrom}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('lastOrderFrom', e.target.value)}
            />
            <Calendar className={`w-5 h-5 text-[${COLORS.secondary}] absolute left-3 top-2.5`} />
          </div>
          <div className="relative">
            <input
              type="date"
              className={`${inputClassName} pl-10`}
              value={filters.lastOrderTo}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('lastOrderTo', e.target.value)}
            />
            <Calendar className={`w-5 h-5 text-[${COLORS.secondary}] absolute left-3 top-2.5`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;