// src/components/personal/sections/ClientsSection/components/StatusSettings/StatusSettings.tsx
import React, { ChangeEvent } from 'react';
import { X } from 'lucide-react';
import { useClientStatus } from '../../hooks/useClientStatus';
import { StatusSettings as StatusSettingsType, ClientStats } from '../../types';
import { displayErrorNotification } from '../../utils/error-handlers';
import { COLORS } from '@/theme/colors';
import { TEXT_STYLES } from '@/theme/typography';

interface StatusSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settings: StatusSettingsType;
  onSettingsChange: (settings: StatusSettingsType) => void;
  stats: ClientStats;
  onSave: () => void;
  autoCalculationRequirements: {
    MIN_REGULAR_CLIENTS: number;
    MIN_LOYAL_CLIENTS: number;
  };
}

const StatusSettings: React.FC<StatusSettingsProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
  stats,
  onSave,
  autoCalculationRequirements
}) => {
  const {
    loading,
    error,
    handleError,
    updateStatusSettings
  } = useClientStatus([]);

  const handleSettingsUpdate = async (newSettings: Partial<StatusSettingsType>) => {
    try {
      await updateStatusSettings(newSettings);
      onSettingsChange(newSettings as StatusSettingsType);
      displayErrorNotification({
        code: 'SUCCESS',
        message: 'Настройки успешно обновлены'
      });
    } catch (error: any) {
      handleError(error);
      displayErrorNotification(error);
    }
  };

  const handleAutoCalculationChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSettingsUpdate({ useAutoCalculation: e.target.checked });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    const value = parseInt(e.target.value) || 0;
    handleSettingsUpdate({
      manual: { ...settings.manual, [field]: value }
    });
  };

  if (!isOpen) return null;

  const isAutoCalculationAvailable = 
    stats.regular >= autoCalculationRequirements.MIN_REGULAR_CLIENTS && 
    stats.loyal >= autoCalculationRequirements.MIN_LOYAL_CLIENTS;

  const isDisabled = !!error;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#245D33]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl m-4">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#A7ABAA]/20 flex justify-between items-center">
          <h2 className={TEXT_STYLES.h2}>Настройка статусов клиентов</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-[#A7ABAA] hover:text-[#465357]" />
          </button>
        </div>

        {/* Error Message if exists */}
        {error && (
          <div className="p-4 bg-red-50 border-b border-[#A7ABAA]/20">
            <p className="text-sm text-red-600">
              Ошибка загрузки настроек. Пожалуйста, закройте окно настроек и попробуйте позже.
            </p>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Auto Calculation Toggle */}
          <div className="mb-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.useAutoCalculation}
                onChange={handleAutoCalculationChange}
                disabled={!isAutoCalculationAvailable || isDisabled}
                className={`w-4 h-4 text-[${COLORS.primary}] border-[${COLORS.secondary}] rounded focus:ring-[${COLORS.primary}]`}
              />
              <span className={TEXT_STYLES.body}>
                Использовать автоматический расчет
              </span>
            </label>
            {!isAutoCalculationAvailable && (
              <p className={`mt-2 text-sm text-[${COLORS.secondary}]`}>
                Для включения автоматического расчета необходимо минимум {' '}
                {autoCalculationRequirements.MIN_REGULAR_CLIENTS} постоянных и {' '}
                {autoCalculationRequirements.MIN_LOYAL_CLIENTS} лояльных клиентов
              </p>
            )}
          </div>

          {/* Manual Settings */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Мин. заказов (постоянный)"
              value={settings.manual.ordersX}
              onChange={(e) => handleInputChange(e, 'ordersX')}
              disabled={settings.useAutoCalculation || isDisabled}
            />
            <InputField
              label="Макс. заказов (постоянный)"
              value={settings.manual.ordersY}
              onChange={(e) => handleInputChange(e, 'ordersY')}
              disabled={settings.useAutoCalculation || isDisabled}
            />
            <InputField
              label="Мин. заказов (лояльный)"
              value={settings.manual.ordersZ}
              onChange={(e) => handleInputChange(e, 'ordersZ')}
              disabled={settings.useAutoCalculation || isDisabled}
            />
            <InputField
              label="Интервал (дни)"
              value={settings.manual.intervalA}
              onChange={(e) => handleInputChange(e, 'intervalA')}
              disabled={settings.useAutoCalculation || isDisabled}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#A7ABAA]/20 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className={`px-4 py-2 ${isDisabled ? 'w-full bg-[#245D33] text-white' : 'border border-[#A7ABAA]'} rounded-lg hover:${isDisabled ? 'opacity-90' : 'bg-[#EFF6EF]'}`}
          >
            {isDisabled ? 'Закрыть' : 'Отмена'}
          </button>
          {!isDisabled && (
            <button
              onClick={onSave}
              className={`px-4 py-2 bg-[${COLORS.primary}] text-white rounded-lg hover:opacity-90`}
            >
              Сохранить
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, disabled }) => (
  <div>
    <label className={`block text-sm text-[${COLORS.text}] mb-1`}>
      {label}
    </label>
    <input
      type="number"
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full px-3 py-2 border border-[${COLORS.secondary}] rounded-lg ${
        disabled ? 'bg-[#EFF6EF] cursor-not-allowed' : ''
      }`}
    />
  </div>
);

export default StatusSettings;